import createObjectiveQuestion from "../add.js"
export default function addQuestionToExam(question) {
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