import "./modules/import/main.js"
import "./modules/PDF/main.js"
import createObjectiveQuestion from "./modules/add.js"

const addObjectiveQuestion = () => {
  createObjectiveQuestion()
  document.getElementById("addQuestionDialog").close()
}




document.getElementById("addObjectiveQuestion").addEventListener("click", () => addObjectiveQuestion())





document.getElementById("openAddQuestionDialog").addEventListener("click", () => document.getElementById("addQuestionDialog").showModal())
document.getElementById("closeAddQuestionDialog").addEventListener("click", () => document.getElementById("addQuestionDialog").close())
