import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const { t } = useLanguage();
  const [showObjective, setShowObjective] = useState(false);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    { icon: "🤖", title: "AI Assessment", description: "Advanced machine learning models analyze sports performance directly from your video." },
    { icon: "🎥", title: "Video Analysis", description: "Real-time pose estimation and movement tracking from standard smartphone cameras." },
    { icon: "📊", title: "Dashboard", description: "Comprehensive analytics and performance tracking over time for continuous improvement." },
    { icon: "🎯", title: "Scoring Engine", description: "Proprietary algorithms for accurate talent scoring and benchmarking against national standards." },
  ];

  const steps = [
    { number: "01", title: "Upload Video", desc: "Submit your gameplay or training footage directly from your phone." },
    { number: "02", title: "AI Processing", desc: "Our models analyze your biomechanical movements and techniques." },
    { number: "03", title: "Scoring", desc: "Get benchmarked against standardized metrics for your specific sport." },
    { number: "04", title: "Analytics", desc: "Receive detailed feedback and personalized action improvement plans." },
  ];

  const stats = [
    { label: "Assessments Made", value: "10,000+" },
    { label: "Athletes Tracked", value: "5,000+" },
    { label: "Sports Supported", value: "5+" },
  ];

  const sports = [
    { name: "Football", icon: "⚽" },
    { name: "Cricket", icon: "🏏" },
    { name: "Athletics", icon: "🏃" },
    { name: "Basketball", icon: "🏀" },
    { name: "Volleyball", icon: "🏐" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse delay-1000" />

      {/* 1. Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-12"
      >
        <motion.div variants={heroVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
          SportGrit AI Platform
        </motion.div>
        
        <motion.h1
          variants={heroVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-500 mb-6 max-w-4xl"
        >
          {t("hero.title") || "Elevate Your Game with AI Analysis"}
        </motion.h1>

        <motion.p
          variants={heroVariants}
          className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
        >
          {t("hero.subtitle") || "The ultimate AI-driven sports assessment platform for talent discovery, biometric video analysis, and professional performance benchmarking."}
        </motion.p>

        <motion.div variants={heroVariants} className="flex flex-wrap items-center justify-center gap-4">
          <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
            Get Started Free
          </button>
          <button className="px-8 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95">
            View Live Demo
          </button>
        </motion.div>
      </motion.section>

      {/* 2. Core Features Cards */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={fadeUp}
           className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Core Capabilities</h2>
          <p className="text-slate-400">Powered by state-of-the-art computer vision and ML models.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:bg-slate-800/80 hover:border-blue-500/50 transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 origin-bottom-left filter drop-shadow hover:drop-shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-900/30 to-slate-900/80 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Four simple steps to professional-grade athletic insights.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0" />
            
            {steps.map((step, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: idx * 0.15, duration: 0.5 }}
                 className="relative z-10 flex flex-col items-center text-center group"
               >
                 <div className="w-24 h-24 rounded-full bg-[#020617] border-2 border-slate-700 group-hover:border-blue-500 group-hover:scale-105 flex items-center justify-center mb-6 shadow-xl transition-all duration-300 relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                   <span className="text-3xl font-black text-slate-500 group-hover:text-blue-400 transition-colors duration-300">{step.number}</span>
                 </div>
                 <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                 <p className="text-slate-400 text-sm max-w-[220px] leading-relaxed">{step.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Performance Analytics Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-4 text-blue-400 font-extrabold mb-4 text-2xl sm:text-3xl uppercase tracking-wider">
                <span className="w-8 h-[3px] bg-blue-500"></span> Analytics Engine
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">Detailed Performance<br/>Metrics & Visualization</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Dive deep into your athletic metrics. Our system computes composite scores across multiple physical domain dimensions to give you a true 360-degree view of your capabilities.
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]">✓</div>
                <p className="text-slate-300 font-medium">Frame-by-frame precision modeling</p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]">✓</div>
                <p className="text-slate-300 font-medium">Full Biomechanical movement tracking</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Circular Progress (Visual mock) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full grid grid-cols-2 gap-4 sm:gap-6"
          >
            {[
              { label: "Speed", value: "85%", stroke: "42" },
              { label: "Agility", value: "92%", stroke: "23" },
              { label: "Endurance", value: "78%", stroke: "62" },
              { label: "Overall", value: "88%", stroke: "34" },
            ].map((metric, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800/80 p-6 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center aspect-square shadow-xl backdrop-blur-md"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
                   <svg className="w-full h-full transform -rotate-90 filter drop-shadow-md" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" className="stroke-slate-800" strokeWidth="8" fill="none" />
                     <motion.circle 
                       initial={{ strokeDashoffset: 283 }}
                       whileInView={{ strokeDashoffset: metric.stroke }}
                       transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                       viewport={{ once: true }}
                       cx="50" cy="50" r="45" className="stroke-blue-500" strokeWidth="8" fill="none" strokeDasharray="283" strokeLinecap="round" 
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-lg sm:text-2xl font-black text-white">{metric.value}</span>
                   </div>
                </div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs sm:text-sm">{metric.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Benchmark Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={fadeUp}
           className="bg-gradient-to-br from-slate-900 via-[#0a1122] to-slate-800 p-8 sm:p-12 lg:p-16 rounded-[2rem] border border-slate-700/60 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold mb-2 text-sm uppercase tracking-wider">
               Benchmarking
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Standardized Comparisons</h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Contextualize your results by comparing them against national and international standard benchmarks established for your specific sport and age cohort.
              </p>
              
              <div className="space-y-8">
                <div>
                   <div className="flex justify-between items-end mb-3">
                     <span className="text-white font-medium">Your Current Score</span>
                     <span className="text-blue-400 font-black text-xl">88<span className="text-sm font-normal text-slate-400">/100</span></span>
                   </div>
                   <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                     <motion.div 
                       initial={{ width: 0 }} 
                       whileInView={{ width: "88%" }} 
                       viewport={{ once: true }} 
                       transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} 
                       className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                     />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between items-end mb-3">
                     <span className="text-slate-400 font-medium">National Average Cohort</span>
                     <span className="text-slate-400 font-bold text-lg">72<span className="text-sm font-normal text-slate-500">/100</span></span>
                   </div>
                   <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                     <motion.div 
                       initial={{ width: 0 }} 
                       whileInView={{ width: "72%" }} 
                       viewport={{ once: true }} 
                       transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} 
                       className="h-full bg-slate-600 rounded-full" 
                     />
                   </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full flex justify-center lg:justify-end">
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 className="p-10 w-full sm:w-auto bg-[#020617]/60 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-md text-center relative overflow-hidden"
               >
                 <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                 <p className="text-slate-400 font-medium tracking-wide uppercase text-sm mb-4">Your Ranking</p>
                 <p className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 drop-shadow-sm">Top 12%</p>
                 <p className="text-blue-400 font-semibold">in Regional U-18 Category</p>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. AI Recommendations & 7. Supported Sports */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* 6. AI Recommendations */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUp}
             className="space-y-8"
          >
            <div>
               <div className="inline-flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                 Insights
               </div>
               <h2 className="text-3xl font-bold text-white mb-4">Personalized AI Action Plans</h2>
               <p className="text-slate-400 leading-relaxed">Generated improvement suggestions tailored automatically to your unique biomechanical movement signature.</p>
            </div>
            
            <ul className="space-y-4">
              {[
                { title: "Acceleration Phase", text: "Increase initial knee drive during sprinting start.", tag: "Speed" },
                { title: "Center of Gravity", text: "Maintain lower posture on lateral directional changes.", tag: "Agility" },
                { title: "Kinetic Linking", text: "Extend arm follow-through for better upper-body force transfer.", tag: "Power" }
              ].map((rec, i) => (
                 <motion.li 
                    whileHover={{ scale: 1.02 }}
                    key={i} 
                    className="flex flex-col sm:flex-row gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 items-start hover:border-blue-500/30 transition-colors"
                 >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center mt-1 text-blue-400 shadow-inner">
                      ✦
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-white font-semibold">{rec.title}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-md bg-slate-800 text-slate-300 border border-slate-700">{rec.tag}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{rec.text}</p>
                    </div>
                 </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 7. Supported Sports */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="bg-slate-900/30 rounded-3xl p-8 border border-slate-800/50 flex flex-col"
          >
            <div className="mb-8">
               <h2 className="text-3xl font-bold text-white mb-4">Supported Disciplines</h2>
               <p className="text-slate-400">Our CV models are robustly trained and mapped specifically for these popular continuous domains.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr flex-1">
              {sports.map((sport, idx) => (
                 <motion.div 
                   key={idx} 
                   whileHover={{ y: -5, backgroundColor: "rgba(30,41,59,0.8)" }}
                   className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 shadow-md cursor-default text-center"
                 >
                   <span className="text-4xl filter drop-shadow-md">{sport.icon}</span>
                   <span className="text-slate-300 font-bold tracking-wide text-sm">{sport.name}</span>
                 </motion.div>
              ))}
              <div className="p-4 bg-slate-900/40 border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 opacity-60">
                 <span className="text-2xl">➕</span>
                 <span className="text-slate-500 font-medium text-xs uppercase tracking-wider text-center">More models<br/>training</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Statistics Counter */}
      <section className="py-20 border-y border-slate-800/80 bg-slate-900/20 shadow-inner mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {stats.map((stat, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                 className="pt-6 md:pt-0"
               >
                 <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-300 mb-3 drop-shadow-sm">{stat.value}</div>
                 <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Project Impact Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeUp}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-400 font-semibold tracking-wider uppercase text-xs mb-6">Mission & Impact</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">Democratizing Talent Discovery<br/>For The Next Generation</h2>
          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl mx-auto text-justify sm:text-center">
            SportGrit was built to bridge the systemic gap between grassroots talent and elite opportunities. By making professional-grade videographic assessment accessible via standard smartphones, we ensure that young athletes anywhere can be discovered, benchmarked, and scouted based purely on performance metrics, independent of their geographical location or economic standing.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6 min-h-[120px]">
            <motion.button 
               onClick={() => setShowObjective(!showObjective)}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
            >
              {showObjective ? "Hide Primary Objective" : "View Core Objective"}
            </motion.button>

            <AnimatePresence>
              {showObjective && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl max-w-2xl text-left"
                >
                  <p className="text-slate-300 font-medium leading-relaxed">
                    <span className="text-blue-400 font-bold block mb-2">Our Goal:</span> 
                    To create an accessible, scalable, and highly accurate AI system that analyzes continuous sports movements. We aim to integrate advanced computer vision algorithms to evaluate form, provide standardized athletic scoring, and offer personalized feedback—ultimately serving as a powerful tool for coaches, scouts, and players.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* 10. Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
            <div className="col-span-2 md:col-span-5 border-b border-slate-800 pb-10 md:border-0 md:pb-0">
              <div className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-sm shadow-[0_0_15px_rgba(37,99,235,0.6)] font-bold">SG</div>
                 SportGrit AI
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Next-generation sports assessment and continuous biomechanical analytics engine. Proudly built for the Smart India Hackathon.
              </p>
              <div className="flex gap-4">
                 <a href="https://www.facebook.com/share/1C5EMVKEQ1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md">
                   {/* Facebook Icon */}
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                 </a>
                 <a href="https://www.linkedin.com/in/devaprasath-j-1a1482297" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md">
                   {/* LinkedIn Icon */}
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 </a>
                 <a href="https://github.com/devaprasathj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md">
                   {/* GitHub Icon */}
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                 </a>
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
               <h4 className="text-white font-bold mb-5 tracking-wide">Platform</h4>
               <ul className="space-y-3 text-sm text-slate-400 font-medium">
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">AI Assessment</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Core Analytics</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Scoring Engine</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Dashboard Demo</a></li>
               </ul>
            </div>
            
            <div className="md:col-span-2">
               <h4 className="text-white font-bold mb-5 tracking-wide">Project Details</h4>
               <ul className="space-y-3 text-sm text-slate-400 font-medium">
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Methodology</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Meet The Team</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Contact Us</a></li>
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Tech Stack</a></li>
               </ul>
            </div>

            <div className="md:col-span-2">
               <h4 className="text-white font-bold mb-5 tracking-wide">Legal & Links</h4>
               <ul className="space-y-3 text-sm text-slate-400 font-medium">
                 <li><a href="#" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
                 <li><a href="https://github.com/your-repo" className="hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all group">
                   <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                   Source Code
                 </a></li>
               </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-medium">
             <p>&copy; 2024 SportGrit AI Platform. All rights reserved.</p>
             <p className="flex items-center gap-2">Built with <span className="text-red-500">❤️</span> by JD's team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
