export function getDashboard(req, res) {
  try {
    const dashboardData = {
      overallScore: 82,
      rank: 14,
      assessments: 5,
      progress: [
        { date: "2026-01-01", score: 65 },
        { date: "2026-02-01", score: 72 },
        { date: "2026-03-01", score: 78 },
        { date: "2026-04-01", score: 82 },
      ],
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ error: "Failed to fetch dashboard data." });
  }
}
