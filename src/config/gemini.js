// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Tumhari API key
const genAI = new GoogleGenerativeAI("AIzaSyCcewd-f7BS6w2zSljdhwABI373vnvq__Q");

export async function runGemini(prompt) {
  // Model select karo
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Prompt bhejo
  const result = await model.generateContent(prompt);

  // Console me response print karo
  console.log("Gemini Response:", result.response.text());

  return  result.response.text();
}

export default runGemini;
