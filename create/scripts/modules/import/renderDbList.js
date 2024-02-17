import addQuestionToExam from "./addQuestionToExam.js"

const _PREVIEW_TEMPLATE = `
<div class="import-preview-wrapper">
  <p>$COMMAND<p>
  <div class="import-preview-tags-wrapper">
      $CHIPS
    </div>
    
  <button class="text-button">
    Adicionar
    <span id="" class="material-symbols-outlined">add</span>
  </button>

</div>
`

export default async function renderDbList(){
  const renderList = document.getElementById("importQuestionDialog-renderList")
  const response = await fetch("https://ilt0njr.github.io/R4/data/ENEM.json")

  const json = await response.json()
  const questions = json.data

  for (let i = 0; i < questions.length; i++) {
    if (!questions[i]) return
    const preview = document.createElement("li")
    preview.style = "list-style: none"
    let chips = ""
    for (let j = 0; j < questions[i].tags.length; j++) {
      chips += `<a class="chip">${questions[i].tags[j].toUpperCase()}</a>`
    }

    const body = _PREVIEW_TEMPLATE.replace("$COMMAND", questions[i].command).replace("$CHIPS", chips)
    preview.innerHTML = body
    preview.getElementsByClassName("text-button")[0].addEventListener("click", () => addQuestionToExam(questions[i]))
    renderList.appendChild(preview)
  }
}