import axios from "axios";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const PRIMARY_MODEL = "google/gemini-2.5-flash";
const FALLBACK_MODEL = "deepseek/deepseek-r1";

export async function generateChatResponse(userMessage) {
  const systemPrompt =
    "You are SportGrit AI Assistant, a helpful sports talent assessment coach. Provide concise, motivating, and informative responses about sports training, fitness, and athlete development.";

  const payload = {
    model: PRIMARY_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    timeout: 30000,
  };

  try {
    const response = await axios.post(OPENROUTER_ENDPOINT, payload, config);
    return response.data.choices[0].message.content;
  } catch (primaryError) {
    console.warn("Primary model failed, trying fallback:", primaryError.message);

    try {
      payload.model = FALLBACK_MODEL;
      const fallbackResponse = await axios.post(OPENROUTER_ENDPOINT, payload, config);
      return fallbackResponse.data.choices[0].message.content;
    } catch (fallbackError) {
      console.error("Fallback model also failed:", fallbackError.message);
      throw new Error("AI service unavailable. Please try again later.");
    }
  }
}

export async function generateRecommendation(score, level, sport, metrics) {
  const prompt = `Athlete Assessment Summary:
- Sport: ${sport}
- Score: ${score}/100
- Level: ${level}
- Speed: ${metrics.speed}/100, Agility: ${metrics.agility}/100
- Endurance: ${metrics.endurance}/100, Balance: ${metrics.balance}/100
- Flexibility: ${metrics.flexibility}/100

Provide a brief, actionable training recommendation (2-3 sentences) focusing on areas that need the most improvement.`;

  try {
    return await generateChatResponse(prompt);
  } catch {
    return `Focus on consistent training tailored for ${sport}. Keep tracking your progress across all five metrics to level up.`;
  }
}
