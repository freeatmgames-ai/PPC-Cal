import { GoogleGenAI } from "@google/genai";
import { BidState } from "../types";

export const getPPCStrategyAdvice = async (data: BidState): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as an expert Amazon PPC Manager for the Indian Market (Amazon.in).
    Analyze the following bid configuration:
    - Base Bid: ₹${data.baseBid}
    - Top of Search Adjustment: ${data.tosPercentage}%
    - Product Pages Adjustment: ${data.ppPercentage}%
    - Estimated Clicks (per placement): ${data.estimatedClicks}
    - Target Sales: ₹${data.targetSales}

    Provide a concise, 3-bullet point strategic assessment. 
    Focus on the relationship between the base bid and the multipliers. 
    Calculate if the target sales are realistic given the estimated spend.
    Are these aggressive? Conservative? 
    What specific metric (ACOS, CVR, CTR) should the user watch most closely given this setup?
    Keep it under 100 words total.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Error fetching AI insight:", error);
    throw error;
  }
};