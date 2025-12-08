import { GoogleGenAI } from "@google/genai";
import { BidState } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate errors, though we handle missing keys in UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getPPCStrategyAdvice = async (data: BidState): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please provide a valid API Key to use AI features.");
  }

  const prompt = `
    Act as an expert Amazon PPC Manager for the Indian Market (Amazon.in).
    Analyze the following bid configuration:
    - Base Bid: ₹${data.baseBid}
    - Top of Search Adjustment: ${data.tosPercentage}%
    - Product Pages Adjustment: ${data.ppPercentage}%

    Provide a concise, 3-bullet point strategic assessment. 
    Focus on the relationship between the base bid and the multipliers. 
    Are these aggressive? Conservative? 
    What specific metric (ACOS, CVR, CTR) should the user watch most closely given this setup?
    Keep it under 100 words total.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Error fetching AI insight:", error);
    throw error;
  }
};