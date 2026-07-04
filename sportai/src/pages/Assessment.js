import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import VideoRecorder from "../components/VideoRecorder";
import SportChatBot from "../components/SportChatBot";

const defaultMetrics = {
  speed: "",
  endurance: "",
  strength: "",
  agility: "",
};

export default function Assessment() {
  const { t } = useLanguage();
  const [mode, setMode] = useState("video");
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [score, setScore] = useState(null);

  const isProfile = mode === "profile";

  const computedScore = useMemo(() => {
    const values = Object.values(metrics)
      .map((value) => Number(value))
      .filter((value) => !Number.isNaN(value) && value > 0);
    if (!values.length) return null;
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    return Math.round(avg);
  }, [metrics]);

  const handleChange = (key, value) => {
    setMetrics((prev) => ({ ...prev, [key]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setScore(computedScore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-cyan-100 mb-2">
            {t("assessment.title")}
          </h1>
          <p className="text-cyan-200/70">
            {t("assessment.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setMode("video")}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              !isProfile
                ? "bg-cyan-500 text-white border-cyan-400"
                : "border-cyan-400/30 text-cyan-200"
            }`}
          >
            {t("assessment.videoTab")}
          </button>
          <button
            onClick={() => setMode("profile")}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              isProfile
                ? "bg-cyan-500 text-white border-cyan-400"
                : "border-cyan-400/30 text-cyan-200"
            }`}
          >
            {t("assessment.profileTab")}
          </button>
        </div>

        {!isProfile && <VideoRecorder />}

        {isProfile && (
          <motion.form
            onSubmit={handleProfileSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/60 border border-cyan-500/20 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-cyan-100 font-semibold text-sm">
              {t("assessment.metrics")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="number"
                placeholder="Speed (0-100)"
                value={metrics.speed}
                onChange={(e) => handleChange("speed", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/70 border border-cyan-500/20 rounded-lg text-cyan-100"
              />
              <input
                type="number"
                placeholder="Endurance (0-100)"
                value={metrics.endurance}
                onChange={(e) => handleChange("endurance", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/70 border border-cyan-500/20 rounded-lg text-cyan-100"
              />
              <input
                type="number"
                placeholder="Strength (0-100)"
                value={metrics.strength}
                onChange={(e) => handleChange("strength", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/70 border border-cyan-500/20 rounded-lg text-cyan-100"
              />
              <input
                type="number"
                placeholder="Agility (0-100)"
                value={metrics.agility}
                onChange={(e) => handleChange("agility", e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/70 border border-cyan-500/20 rounded-lg text-cyan-100"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
            >
              {t("assessment.submit")}
            </button>

            {score !== null && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 text-cyan-100">
                <p className="text-xs text-cyan-300/80 mb-1">Calculated Score</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            )}
          </motion.form>
        )}
      </div>

      {/* Chatbot only on Assessment page */}
      <SportChatBot />
    </div>
  );
}
