import getGeminiResponse from "./gemini.js"
import addQuestionToExam from "../import/addQuestionToExam.js"

const _SAMPLE = `
{
  text: "Textos da Questão",
  command: "Comando Da Questão",
  alternatives: [As 5 alternativas],
  answer: "Letra correta da questão"
}
`

const checkReturn = (question) => {
  const A = ["A", "B", "C", "D", "E"]
  if (question.alternatives.length == 5 && A.includes(question.answer)) return true
  return false
}


const generateIaQuestion = async () => {
  const spin = document.getElementById("ia-spin")
  const info = document.getElementById("ia-spin-info")

  const userPrompt = document.getElementById("generate-ia-question-input").value
  const instructions = `
    Gere uma questão, modelo ENEM, 5 alternativas, e retorne ela como um JSON da seguinte forma:
    ${_SAMPLE}
    
    Outras informações: "${userPrompt}"
    `

  try {
    for (let i = 0; i < 10; i++) {
      spin.style.display = "block"
      info.innerHTML = `Tentativa ${i + 1}...`
      const response = await getGeminiResponse(instructions)
      const question = JSON.parse(response.replace("json", ''))
      if (checkReturn(question)) {
        addQuestionToExam(question)
        document.getElementById("generateIAQuestionDialog").close()
        spin.style.display = "none"
        info.innerHTML = ``
        return
      }
    }
  }

  catch (e) {
    console.log(e)
  }
}

document.getElementById("generate-ia-question").addEventListener("click", () => generateIaQuestion())
document.getElementById("openGenerateIAQuestionDialog").addEventListener("click", () => document.getElementById("generateIAQuestionDialog").showModal())
document.getElementById("closeGenerateIAQuestionDialog").addEventListener("click", () => document.getElementById("generateIAQuestionDialog").close())