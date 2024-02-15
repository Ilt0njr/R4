import { getInfoFromHTML } from './modules/getInfoFromHTML.js'
import { createPDF } from './modules/createPDF.js'
import { validate } from './modules/validate.js'
import { getQR, getAnswersForQR } from './modules/QR.js'
import { createObjectiveQuestion } from "./modules/add.js"
import { shuffleExam } from "./modules/shuffle.js"
const { jsPDF } = window.jspdf;

const getPDF = () => {
  if (validate()) {
    const teacherName = prompt(`Qual nome completo do professor(a)?`)
    const nOfExams = parseInt(prompt(`Quantas provas diferentes devem ser geradas?`))
    let exam = getInfoFromHTML()

    let doc = new jsPDF();
    for (let i = 0; i < nOfExams; i++) {
      shuffleExam(exam)
      const QR = getQR({ answers: getAnswersForQR(exam) })
      createPDF(doc, exam, QR, teacherName)
    }
    doc.save(`prova - ${teacherName}.pdf`)

  }

}

const addObjectiveQuestion = () => {
  createObjectiveQuestion()
  document.getElementById("addQuestionDialog").close()
}

const search = () => {
  const value = document.getElementById("dialog-import-search").value.toLowerCase()
  const ul = document.getElementById("importQuestionDialog-renderList")
  const liList = ul.getElementsByTagName("li")
  
  for (let i = 0; i < liList.length; i++) {
    if(liList[i].innerHTML.toLowerCase().includes(value)) liList[i].style.display = "list-item"
    else liList[i].style.display = "none"
  }

}





import openImportDialog from "./modules/import.js"
document.getElementById("openImportQuestionDialog").addEventListener("click", () => openImportDialog())
document.getElementById("closeImportQuestionDialog").addEventListener("click", () => document.getElementById("importQuestionDialog").close())

document.getElementById("dialog-import-search").addEventListener("keyup", () => search())

document.getElementById("addObjectiveQuestion").addEventListener("click", () => addObjectiveQuestion())
document.getElementById("getPDF").addEventListener("click", () => getPDF())