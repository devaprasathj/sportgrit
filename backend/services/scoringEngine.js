export function calculateScore({ speed, agility, endurance, balance, flexibility }) {
  const score =
    (speed * 0.30) +
    (agility * 0.25) +
    (endurance * 0.20) +
    (balance * 0.15) +
    (flexibility * 0.10);

  return Math.round(score * 100) / 100;
}

export function getLevel(score) {
  if (score >= 85) return "Advanced";
  if (score >= 70) return "Intermediate";
  if (score >= 50) return "Beginner";
  return "Needs Improvement";
}
