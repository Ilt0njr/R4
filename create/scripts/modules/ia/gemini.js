import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBpNDPQoo6LboldCsF5RSmCJiwT08ASTeI"
const genAI = new GoogleGenerativeAI(API_KEY);


export default async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text
}