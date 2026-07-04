import { calculateScore, getLevel } from "../services/scoringEngine.js";
import { generateRecommendation } from "../services/aiService.js";
import { compareToBenchmark } from "../services/benchmarkService.js";

export async function createAssessment(req, res) {
  try {
    const { age, height, weight, sport, speed, agility, endurance, balance, flexibility } = req.body;

    if ([speed, agility, endurance, balance, flexibility].some((v) => v == null)) {
      return res.status(400).json({ error: "All five metrics (speed, agility, endurance, balance, flexibility) are required." });
    }

    const metrics = {
      speed: Number(speed),
      agility: Number(agility),
      endurance: Number(endurance),
      balance: Number(balance),
      flexibility: Number(flexibility),
    };

    const score = calculateScore(metrics);
    const level = getLevel(score);
    const benchmark = compareToBenchmark(metrics, sport);
    const recommendation = await generateRecommendation(score, level, sport || "general", metrics);

    res.json({
      score,
      level,
      sport: sport || "general",
      recommendation,
      benchmark,
    });
  } catch (error) {
    console.error("Assessment error:", error.message);
    res.status(500).json({ error: "Failed to process assessment." });
  }
}
