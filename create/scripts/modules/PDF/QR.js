export function getQR(info) {
  const img = document.createElement('img');
  const answers = info.answers.toString()
  img.src = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=" + answers
  return img
}

export function getAnswersForQR(exam) {
  const answers = []
  for (let i = 0; i < exam.length; i++) {
    for (let j = 0; j < exam[i].alternatives.length; j++) {
      if (exam[i].alternatives[j].bool) answers.push(j)
    }
  }
  return answers
}