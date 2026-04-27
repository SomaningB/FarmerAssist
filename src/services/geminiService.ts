import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface DiseaseAnalysis {
  diseaseName: string;
  confidence: number;
  description: string;
  treatment: string[];
  preventiveTips: string[];
}

export interface RiskAnalysis {
  score: number;
  level: 'Low' | 'Moderate' | 'High' | 'Critical';
  factors: {
    weather: string;
    disease: string;
    soil: string;
  };
  recommendations: string[];
}

export const geminiService = {
  async analyzeCropDisease(base64Image: string): Promise<DiseaseAnalysis> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            text: `Analyze this image of a plant leaf for any diseases.
            Provide response in JSON format strictly following this schema:
            {
              "diseaseName": string,
              "confidence": number (0-100),
              "description": string,
              "treatment": string[],
              "preventiveTips": string[]
            }
            If the plant is healthy, indicate "Healthy" as the diseaseName.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
            preventiveTips: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    try {
      const data = JSON.parse(response.text || '{}');
      return data as DiseaseAnalysis;
    } catch (e) {
      console.error("AI Response Parsing Error:", e);
      throw new Error("Failed to clarify AI results. Please try again.");
    }
  },

  async calculateRiskScore(context: { weather: string, cropType: string, location: string }): Promise<RiskAnalysis> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a comprehensive agricultural risk assessment for a ${context.cropType} farm in ${context.location}.
      Current weather conditions: ${context.weather}.
      
      Provide a JSON response strictly following this schema:
      {
        "score": number (0-100),
        "level": "Low" | "Moderate" | "High" | "Critical",
        "factors": {
          "weather": string summary,
          "disease": string summary,
          "soil": string summary
        },
        "recommendations": string[]
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            level: { type: Type.STRING },
            factors: {
              type: Type.OBJECT,
              properties: {
                weather: { type: Type.STRING },
                disease: { type: Type.STRING },
                soil: { type: Type.STRING }
              }
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    try {
      const data = JSON.parse(response.text || '{}');
      return data as RiskAnalysis;
    } catch (e) {
      console.error("AI Risk Assessment Error:", e);
      throw new Error("Risk assessment failed.");
    }
  }
};
