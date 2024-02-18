import getInfoFromHTML from './getInfoFromHTML.js'
import createPDF from './createPDF.js'
import check from './check.js'
import { getQR, getAnswersForQR } from './QR.js'
import shuffleExam from "./shuffle.js"
const { jsPDF } = window.jspdf;

function PDF() {
  
  if (check()) {
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
    
    saveAs
  }
}

document.getElementById("getPDF").addEventListener("click", () => PDF())