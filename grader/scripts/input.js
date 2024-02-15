window.addEventListener('load', (() => {
  document.getElementById("start-video").addEventListener("click", getVideo)
}))

let step = "QR"
const beep = 'data:audio/mpeg;base64,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s86JWtsaNatr1KUp03VOm+ZyVFaLTMFpggLH3OoLHwrevR1upt6u7LKueWQ8LzN7rImDCIIFfVY6H8yhXtXm2BcFwKXMXNJQKBwSUwYkTgoCKSAGIEWkQ4yqxTyf/kXcJz8ZZz7G+2/qZ61njv8buWUEPlZpYkqiKhRAZ+WH+G6ShmZGdRqpRO1uufUi+atQrPS2tRk8hpugUVGYQ3wRAUjJJZRGxXrdauc17rNHqdkWnWUGXjyRQTF8A6EJSMTq2OOymqLVm2OMynTvvRJfSWYCyVOmkdAXI3MFORc9Z7OydzPetUzatns6C1CJh9jdjRQkINhFMhZAAHki7ZreekNY13iLIOlwkgDQCwDAEAYKA3AY3CZAbKmIgYgw7gYU//uSxBUAF84HPJT7AANeuqfTMWABwJiJFpIlhyyuSFZpUb1J1Ha0qaVzao9Y9I4bBoTYt45gTB8BjNAWAECcPnIuqfd3qNq1V6aWjttNX01EMLcplkQuDUH45BIH03USPt+v3zzK+t3QE2p0jMWeAcBYCQDCCGidT7VI1atXV+gba6QwtBjMBwAjI0tJlOlu7r1t+jrs2qmJGMwaJomAswBQAJu6XorWs6QAAAAAAEBKmsMCWN/vw3SH1Vt7MChrBcYYH+QGJ8MYG1dFgGBoPoGN4gtQGIwIwGDkD4BwEwMbAmQMBoJAMCoAjExQC6sXILQMoKmKSD5h3J8c80KhEx+JogRWKQrb5BQMBoJQME4fA2ALmxxhf4AQCoGBwCYEgAjLEG/TZGmmZmyi8bVf5bMiSBMAoGB4AQ8jNk+komhCYORE+k0lV/1p1Gq3LIn4nQGga1F5FFFReJomR1f/NC+bn5f5xIfy8KEEERmv1o1mJdKQ53//Ny8YIP///8nlokxBTUUzLjk3VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7ksQQg8AAAaQcAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='


const getVideo = () => navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" },
  audio: false
}).then(stream => {
  window.localStream = stream;
  const video = document.getElementById("input-video")
  const box = document.getElementById("video-box")
  box.style.display = "flex"
  video.srcObject = stream
  video.play()
  openCV()

})

const stopVideo = () => {
  localStream.getTracks().forEach(track => track.stop())
  const video = document.getElementById("input-video")
  const box = document.getElementById("video-box")
  box.style.display = "none"
  video.srcObject = null
  open = false
  restart()
}

const restart = () => {
  const label = document.getElementById("video-top-info")
  const result = document.getElementById("result")
  step = "QR"
  label.innerHTML = "<b>Para corrigir:</b> <br>Escaneie o código <b> QR </b> no topo da prova. </p>"
  result.innerHTML = ""
}

const getFinalResult = (answers, gab, n) => {
  const a = ["A", "B", "C", "D", "E"]
  let corrects = 0
  for (let i = 0; i < n; i++) {
    const correct = a[gab[i]]
    if (answers[i].length == 1 && answers[i][0] == correct) corrects += 1
  }
  return corrects
}


const openCV = () => {
  const FPS = 24
  const video = document.getElementById("input-video")
  const label = document.getElementById("video-top-info")
  const result = document.getElementById("result")
  const { width, height } = video
  const src = new cv.Mat(height, width, cv.CV_8UC4);
  const cap = new cv.VideoCapture(video);
  const QRdet = new cv.QRCodeDetector()
  const audio = new Audio(beep)


  let QRContent = ""
  const processVideo = () => {
    const begin = Date.now()
    cap.read(src);


    if (step == "QR") {
      const data = QRdet.detectAndDecode(src)
      if (data) {
        step = "SCAN"
        QRContent = data
        label.innerHTML = "<b>Para corrigir:</b><br>Agora escaneie o gabarito da prova"
        audio.play()

      }
    }

    if (step == "SCAN") {
      const rect = getRectGab(src)
      if (rect) {
        const correctAnswers = QRContent.split(",")
        const n = correctAnswers.length
        const answers = getAnswers(rect, n)
        const finalResult = getFinalResult(answers, correctAnswers, n)
        result.innerHTML = `Resultado: <b>${finalResult}<b> `
        audio.play()
      }
    }


    const delay = 1000 / FPS - (Date.now() - begin)
    setTimeout(processVideo, delay)
  }


  setTimeout(processVideo, 0)
}