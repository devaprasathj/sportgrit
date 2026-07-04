import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown, Trophy, Activity, Target, Download, CheckCircle, BarChart2, Zap } from "lucide-react";

// CountUp Component
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <>{count}</>;
};

// Typewriter Component
const Typewriter = ({ text, delay = 30 }) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setCurrentText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return <span>{currentText}</span>;
};

// ProgressBar Component
const ProgressBar = ({ label, value, color }) => (
  <div className="w-full">
    <div className="flex justify-between text-[10px] mb-2 font-black tracking-[0.2em] uppercase">
      <span className="text-slate-500">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`h-full ${color}`}
      ></motion.div>
    </div>
  </div>
);

// Accordion Item Component
const AccordionItem = ({ title, icon: Icon, isOpen, onClick, children }) => (
  <div className={`bg-slate-800/40 border rounded-xl mb-4 overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 ${isOpen ? 'border-blue-500/50' : 'border-slate-700/50 hover:border-slate-600'}`}>
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left bg-slate-800/60 hover:bg-slate-700/60 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-lg transition-colors ${isOpen ? 'bg-blue-600/30 text-blue-400' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
          <Icon size={22} />
        </div>
        <h3 className={`text-xl font-bold tracking-wide transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={`transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-500'}`}>
        <ChevronDown size={20} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: "auto", opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6 border-t border-slate-700/30 bg-slate-900/30">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Results() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSection, setOpenSection] = useState("score"); // 'score', 'benchmark', 'recommendations', 'report'

  // Update open section if passed through navigation state
  useEffect(() => {
    if (location.state?.section) {
      setOpenSection(location.state.section);
      // Optional: scroll to the accordion
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }, [location.state]);

  const scoreValue = 86;
  const circumference = 2 * Math.PI * 46; // r=46
  const strokeDashoffset = circumference - (scoreValue / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-950 px-6 pt-28 pb-16 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Completion Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3 px-6 rounded-full w-fit mx-auto shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <CheckCircle size={20} className="animate-pulse" />
          <span className="font-bold tracking-wide text-sm uppercase">Assessment Completed Successfully</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Your AI Performance Insights</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We've analyzed your mechanics and benchmarked your scores. Explore the details below to unlock your next level of performance.
          </p>
        </motion.div>

        {/* Accordion container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          
          {/* Section 1: Performance Score */}
          <AccordionItem 
            title="Performance Score" 
            icon={Trophy} 
            isOpen={openSection === 'score'} 
            onClick={() => setOpenSection(openSection === 'score' ? null : 'score')}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              {/* Circular Badge */}
              <div className="relative flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="46" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                  <motion.circle 
                    cx="96" cy="96" r="46" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: openSection === 'score' ? strokeDashoffset : circumference }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Score</span>
                  <span className="text-5xl font-black text-white"><CountUp end={scoreValue} /></span>
                </div>
              </div>

              {/* Status Info */}
              <div className="text-center md:text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={openSection === 'score' ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1, type: "spring" }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest inline-block mb-4 shadow-lg shadow-blue-500/30"
                >
                  Elite Level
                </motion.div>
                <h4 className="text-2xl font-bold text-slate-200 mb-2">Exceptional Form Identified</h4>
                <p className="text-slate-400 max-w-sm">
                  Your biometric markers heavily align with professional standards. Minor optimizations can push you into the top 5% percentile.
                </p>
              </div>
            </div>
          </AccordionItem>

          {/* Section 2: Benchmark Comparison */}
          <AccordionItem 
            title="Benchmark Comparison" 
            icon={BarChart2} 
            isOpen={openSection === 'benchmark'} 
            onClick={() => setOpenSection(openSection === 'benchmark' ? null : 'benchmark')}
          >
            <div className="mb-6 text-center">
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
                Compare your core attributes side-by-side against standard regional averages to visualize your athletic progression.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch mt-4">
              {/* Left Side: Average */}
              <div className="flex flex-col space-y-8 bg-[#0a1122] p-10 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="text-center border-b border-slate-800/80 pb-8">
                  <h4 className="text-xl font-black text-slate-500 tracking-[0.25em] uppercase">Average Athlete</h4>
                </div>
                <div className="flex-grow space-y-10 py-6">
                  <ProgressBar label="Speed" value={55} color="bg-slate-700" />
                  <ProgressBar label="Endurance" value={60} color="bg-slate-700" />
                  <ProgressBar label="Strength" value={65} color="bg-slate-700" />
                  <ProgressBar label="Agility" value={58} color="bg-slate-700" />
                </div>
              </div>
              
              {/* Right Side: My Progression */}
              <div className="flex flex-col space-y-8 bg-[#0a1122] p-10 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
                <div className="text-center border-b border-blue-500/30 pb-8 relative z-10">
                  <h4 className="text-xl font-black text-blue-400 tracking-[0.25em] uppercase">My Progression</h4>
                </div>
                <div className="relative z-10 flex-grow space-y-10 py-6">
                  <ProgressBar label="Speed" value={88} color="bg-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
                  <ProgressBar label="Endurance" value={72} color="bg-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
                  <ProgressBar label="Strength" value={85} color="bg-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
                  <ProgressBar label="Agility" value={78} color="bg-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
            </div>
          </AccordionItem>

          {/* Section 3: AI Recommendations */}
          <AccordionItem 
            title="AI Recommendations" 
            icon={Zap} 
            isOpen={openSection === 'recommendations'} 
            onClick={() => setOpenSection(openSection === 'recommendations' ? null : 'recommendations')}
          >
            <div className="bg-slate-900 border border-slate-700/70 rounded-lg p-6 font-mono text-sm leading-loose text-cyan-400 shadow-inner">
              <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-2">sportgrit-ai-core v2.4.1</span>
              </div>
              
              {openSection === 'recommendations' && (
                <div className="whitespace-pre-wrap">
                  <Typewriter 
                    text={`> INITIALIZING DIAGNOSTIC REVIEW...\n> ANALYZING BIOMECHANICS...\n\n[STRENGTH] High kinetic chain transfer during acceleration phase.\n[STRENGTH] Rotational core stability exceeds 85th percentile.\n[WEAKNESS] Lactic threshold plateau detected at minute 42.\n\nRECOMMENDED PROTOCOL:\n1. Integrate VO2 Max interval training (2x/week).\n2. Adopt eccentric loading drills to improve deceleration control.\n3. Increase dorsiflexion flexibility to avoid lower limb strain.\n\n> END OF REPORT`}
                  />
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1 translate-y-1"
                  />
                </div>
              )}
            </div>
          </AccordionItem>

          {/* Section 4: Report Download */}
          <AccordionItem 
            title="Download Report" 
            icon={Download} 
            isOpen={openSection === 'report'} 
            onClick={() => setOpenSection(openSection === 'report' ? null : 'report')}
          >
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-3xl rounded-full pointer-events-none"></div>

              <div className="mb-6 md:mb-0 relative z-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Target className="text-blue-400" size={28} />
                  <h4 className="text-2xl font-bold text-white">Assessment Complete</h4>
                </div>
                <p className="text-slate-400 text-sm max-w-sm">
                  Your comprehensive PDF report includes detailed scoring, frame-by-frame analysis, and personalized drills.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto relative z-10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Export PDF Report
                </motion.button>
                <motion.button 
                  onClick={() => navigate('/dashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Activity size={18} /> View Analytics Dashboard
                </motion.button>
              </div>
            </div>
          </AccordionItem>

        </motion.div>
      </div>
    </div>
  );
}
