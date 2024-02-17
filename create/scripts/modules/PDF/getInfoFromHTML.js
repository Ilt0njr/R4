const getTexts = (form) => {
  const txts = form.getElementsByClassName("text-text")
  const imgs = form.getElementsByClassName("image-text")
  const nTexts = txts.length + imgs.length
  const id = form.id
  const texts = []
  for (let j = 0; j < nTexts; j++) {
    const txtID = `${id}-text${j + 1}`
    const txt = document.getElementById(txtID)
    if (txt.className == "text-text") {
      texts.push({ content: txt.value, type: "text" })
    } else if (txt.className == "image-text") {
      texts.push({ content: txt, type: "image" })
    }
  }
  return texts
}

const getAlternatives = (form) => {
  const alts = form.getElementsByClassName("alt")
  const id = form.id
  const ans = document.querySelector(`input[name="${id}"]:checked`).value
  const alternatives = []

  for (let j = 0; j < alts.length; j++) {
    const bool = j == ans ? true : false
    alternatives.push({
      content: document.getElementById(`${id}-alt${j}`).value,
      bool
    })
  }
  return alternatives
}

const getQuestion = (form) => {
  const id = form.id
  const command = document.getElementById(`c${id}`).value
  return {
    command,
    texts: getTexts(form),
    alternatives: getAlternatives(form),
  }
}

export default function getInfoFromHTML() {
  const forms = document.forms
  const exam = []
  for (let i = 0; i < forms.length; i++) {
    exam.push(getQuestion(forms[i]))
  }
  return exam
}