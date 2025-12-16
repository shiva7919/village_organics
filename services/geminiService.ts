import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set safely.

let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const getGeminiResponse = async (prompt: string, context?: string): Promise<string> => {
  if (!aiClient) {
    return "I'm sorry, my AI brain isn't connected right now (Missing API Key).";
  }

  try {
    const fullPrompt = `
      You are "Verdie", a helpful, friendly AI assistant for Village Organics.
      Your goal is to promote organic living, health, and sustainable farming.
      Context: ${context || 'General inquiry about organic products.'}
      User Question: ${prompt}
      
      Keep your answer concise (under 100 words unless asked for a recipe), warm, and scientifically accurate but accessible.
      If asked for a recipe, provide a simple, healthy one using organic ingredients.
    `;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "I couldn't think of an answer right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! I'm having trouble connecting to the organic knowledge base.";
  }
};
