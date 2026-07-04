export function getLeaderboard(req, res) {
  try {
    const leaderboard = [
      { rank: 1, name: "Athlete A", score: 95, streak: 12 },
      { rank: 2, name: "Athlete B", score: 91, streak: 8 },
      { rank: 3, name: "Athlete C", score: 88, streak: 5 },
      { rank: 4, name: "Athlete D", score: 84, streak: 3 },
      { rank: 5, name: "Athlete E", score: 80, streak: 1 },
    ];
    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error.message);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
}
