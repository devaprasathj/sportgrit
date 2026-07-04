const sportBenchmarks = {
  football: { speed: 80, agility: 75, endurance: 70, balance: 60, flexibility: 55 },
  basketball: { speed: 75, agility: 80, endurance: 65, balance: 70, flexibility: 60 },
  cricket: { speed: 60, agility: 65, endurance: 55, balance: 70, flexibility: 75 },
  swimming: { speed: 70, agility: 60, endurance: 85, balance: 75, flexibility: 80 },
  athletics: { speed: 85, agility: 70, endurance: 80, balance: 65, flexibility: 60 },
  tennis: { speed: 70, agility: 80, endurance: 65, balance: 75, flexibility: 70 },
  default: { speed: 65, agility: 65, endurance: 65, balance: 65, flexibility: 65 },
};

export function getBenchmark(sport) {
  const key = sport?.toLowerCase().trim();
  return sportBenchmarks[key] || sportBenchmarks.default;
}

export function compareToBenchmark(metrics, sport) {
  const benchmark = getBenchmark(sport);
  const comparison = {};

  for (const metric of ["speed", "agility", "endurance", "balance", "flexibility"]) {
    const diff = metrics[metric] - benchmark[metric];
    comparison[metric] = {
      athlete: metrics[metric],
      benchmark: benchmark[metric],
      gap: diff,
      status: diff >= 0 ? "ahead" : "behind",
    };
  }

  return comparison;
}
