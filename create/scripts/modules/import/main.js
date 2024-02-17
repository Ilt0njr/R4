import renderDbList from "./renderDbList.js"
import search from "./searchInDatabase.js"

function startImport() {
  document.getElementById("importQuestionDialog").showModal()
  renderDbList()
}

document.getElementById("openImportQuestionDialog").addEventListener("click", () => startImport())
document.getElementById("closeImportQuestionDialog").addEventListener("click", () => document.getElementById("importQuestionDialog").close())
document.getElementById("dialog-import-search").addEventListener("keyup", () => search())
