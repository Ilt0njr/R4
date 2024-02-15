const getRectGab = (src) => {
  const dst = new cv.Mat()
  const contourns = new cv.MatVector()
  const h = new cv.Mat()
  const main = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3))

  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(dst, dst, 65, 255, cv.THRESH_BINARY_INV)
  cv.morphologyEx(dst, dst, cv.MORPH_OPEN, main)
  cv.findContours(dst, contourns, h, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);


  const anchors = []
  for (let i = 0; i < contourns.size(); ++i) {
    const cnt = contourns.get(i)
    const area = cv.contourArea(cnt, false)
    const rect = cv.boundingRect(cnt)
    const peri = cv.arcLength(cnt, true)
    const circularity = 4 * 3.1415 * area / (peri * peri);

    if (area > 150) continue;
    if (cv.countNonZero(dst.roi(rect)) < 0.7 * area) continue
    if (circularity > 0.650) continue;
    if (cv.isContourConvex(cnt)) continue
    anchors.push(rect)
  }

  if (anchors.length == 4) {
    const xs = anchors.map(i => i.x)
    const ys = anchors.map(i => i.y)
    const hs = anchors.map(i => i.height).reduce((acc, i) => acc + i) / 4
    const ws = anchors.map(i => i.width).reduce((acc, i) => acc + i) / 4
    xs.sort()
    ys.sort()
    const x = xs[0] + ws
    const y = ys[0] + hs
    const w = xs[3] - x
    const h = ys[3] - y

    if (x >= 0 && y >= 0 && w >= 0 && h >= 0) return src.roi(new cv.Rect(x, y, w, h))
  }
  else return false
}


const getAnswers = (src, nQ) => {
  const { width, height } = src.size()
  const dst = new cv.Mat()
  const h = height / nQ
  const w = width / 5
  const qMSize = 0.1 * h * w
  const a = ["A", "B", "C", "D", "E"]
  const kernel = cv.Mat.ones(2, 2, cv.CV_8U);
  const anchor = new cv.Point(-1, -1);

  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(dst, dst, 65, 255, cv.THRESH_BINARY_INV)
  cv.erode(dst, dst, kernel, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

  const answers = {}
  for (let i = 0; i < nQ; i++) {
    answers[i] = []
    for (let j = 0; j < a.length; j++) {
      const rect = new cv.Rect(w * j, h * i, w, h)
      const roi = dst.roi(rect)
      const nonZeros = cv.countNonZero(roi)
      if (nonZeros > qMSize) answers[i].push(a[j])
    }
  }
  return answers
}
