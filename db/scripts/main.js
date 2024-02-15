const A = ["A", "B", "C", "D", "E"]
const getAlt = (c, i) => `
<div class="alt">
  <span>${A[i]})</span>
  <p>${i}</p>
</div>
`

const getQuestion = (question) => {
  let alts = ""
  for (let j = 0; j < question.alternatives.length; j++) {
    alts += getAlt(question.alternatives[j], j)
  }
  return `
    <div class="question">
    <a class="chip">${question.tags[0].toUpperCase()}</a>
      <p>
      <b>${question.tags[1].toUpperCase()}</b>
        ${question.text}
      </p>
      <p><b>${question.command}</b><p>
      <div class="alts-wrapper">
        ${alts}
      </div>
    
    </div>
    `
}


const render = async () => {
  const renderList = document.getElementById("renderList")
  const response = await fetch("../../data/ENEM.json")

  const json = await response.json()
  const questions = json.data

  for (let i = 0; i < questions.length; i++) {
    if (!questions[i]) return
    const preview = document.createElement("li")
    preview.style = "list-style: none"


    const body = getQuestion(questions[i])
    preview.innerHTML = body
    renderList.appendChild(preview)
  }
}

const search = () => {
  const value = document.getElementById("search-input").value.toLowerCase()
  const ul = document.getElementById("renderList")
  const liList = ul.getElementsByTagName("li")

  for (let i = 0; i < liList.length; i++) {
    if (liList[i].innerHTML.toLowerCase().includes(value)) liList[i].style.display = "list-item"
    else liList[i].style.display = "none"
  }
}

document.getElementById("search-input").addEventListener("keyup", () => search())





render()