import { createObjectiveQuestion } from "./add.js"

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

const add = (question) => {
  document.getElementById("importQuestionDialog").close()
  document.getElementById("addQuestionDialog").close()
  const A = ["A", "B", "C", "D", "E"]
  const id = createObjectiveQuestion()
  const form = document.getElementById(id)
  const answer = A.indexOf(question.answer)
  document.getElementById(`c${id}`).value = question.command.replace(/\n/g, "")

  for (let j = 0; j < question.alternatives.length; j++) {
    form.getElementsByClassName("AddAlternative")[0].click()
    const alt = document.getElementById(`${id}-alt${j}`)
    alt.value = question.alternatives[j]
    alt.style.height = (alt.scrollHeight) + "px";
  }

  form.getElementsByClassName("AddText")[0].click()
  const text = document.getElementById(`${id}-text1`)
  text.value = question.text.replace(/\n/g, "")
  text.style.height = (text.scrollHeight) + "px";
  document.querySelector(`input[name="${id}"][value="${answer}"]`).checked = true

}


const render = async () => {
  const renderList = document.getElementById("importQuestionDialog-renderList")
  const response = await fetch("../../../data/ENEM.json")

  const json = await response.json()
  const questions = json.data

  for (let i = 0; i < questions.length; i++) {
    if (!questions[i]) return
    const preview = document.createElement("li")
    preview.style = "list-style: none"
    const chips = questions[i].tags.map(e => `<span class="chip">${e.toUpperCase()}</span>`)
    const body = _PREVIEW_TEMPLATE.replace("$COMMAND", questions[i].command).replace("$CHIPS", chips)
    preview.innerHTML = body
    preview.getElementsByClassName("text-button")[0].addEventListener("click", () => add(questions[i]))
    renderList.appendChild(preview)
  }
}




export default function openImportDialog() {
  document.getElementById("importQuestionDialog").showModal()
  render()
}