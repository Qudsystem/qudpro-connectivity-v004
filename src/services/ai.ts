import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  private primaryModel: any;
  private secondaryModel: any;
  
  constructor() {
    // Initialize with the API key
    const apiKey = "AIzaSyBIn3fBkcPLhya9JsOUReb4m9-xXqC8YME";
    
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      this.primaryModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      // Use the same key for secondary as fallback
      this.secondaryModel = genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      // Try primary API first
      if (this.primaryModel) {
        const result = await this.primaryModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
      }
      
      // Fallback to secondary API
      if (this.secondaryModel) {
        const result = await this.secondaryModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
      }
      
      throw new Error("No API keys configured");
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      // Try primary API first
      if (this.primaryModel) {
        const result = await this.primaryModel.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            topK: 32,
            topP: 1,
            maxOutputTokens: 2048,
          },
        });
        return result.response.text();
      }
      
      // Fallback to secondary API
      if (this.secondaryModel) {
        const result = await this.secondaryModel.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            topK: 32,
            topP: 1,
            maxOutputTokens: 2048,
          },
        });
        return result.response.text();
      }
      
      throw new Error("No API keys configured");
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }
}

export const aiService = new AIService();