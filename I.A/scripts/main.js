import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBpNDPQoo6LboldCsF5RSmCJiwT08ASTeI"

const genAI = new GoogleGenerativeAI(API_KEY);


const getHtmlResult = (msg) => `
<li>
  <span class="profile-img material-symbols-outlined">robot</span>
  <p>${msg}</p>
</li>`

const writeHtmlResult = (html) => {
  const chatH = document.getElementById("chat-history")
  chatH.innerHTML += html
}


async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Gere uma questao modelo enem sobre primeira guerra mundial"
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  writeHtmlResult(getHtmlResult(text))
}

run();