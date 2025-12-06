"use server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function runAi(prompt: string) {
  const { text } = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return text;
}
