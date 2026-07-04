import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function VideoRecorder() {
  const { t } = useLanguage();
  const [processing, setProcessing] = useState(false);

  const simulateProcessing = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div className="bg-slate-800/60 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-cyan-100 font-semibold text-sm">
          {t("assessment.videoTab")}
        </h3>
        {processing && (
          <span className="text-xs text-cyan-300">
            {t("assessment.processing")}
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateProcessing}
          className="py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold"
        >
          {t("assessment.record")}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateProcessing}
          className="py-3 rounded-xl border border-cyan-400/40 text-cyan-200 text-sm font-semibold"
        >
          {t("assessment.upload")}
        </motion.button>
      </div>

      {processing && (
        <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-full w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500"
          />
        </div>
      )}
    </div>
  );
}
