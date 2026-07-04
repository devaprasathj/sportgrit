import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Trophy, Activity, Target, Zap, ChevronRight, ChevronDown,
  TrendingUp, TrendingDown, Award, Flame, 
  BarChart2, Calendar, Search, Filter, 
  Star, Rocket, ShieldCheck, Milestone,
  UserCircle, Video, LineChartIcon
} from "lucide-react";
import CountUp from "react-countup";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';

const progressData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 78 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 86 },
];

const radarData = [
  { subject: 'Speed', self: 85, average: 65, fullMark: 100 },
  { subject: 'Agility', self: 78, average: 70, fullMark: 100 },
  { subject: 'Endurance', self: 90, average: 75, fullMark: 100 },
  { subject: 'Balance', self: 75, average: 80, fullMark: 100 },
  { subject: 'Flexibility', self: 70, average: 60, fullMark: 100 },
];

const athletes = [
  { rank: 1, name: "Liam Anderson", sport: "Athletics", score: 98, streak: 45, assessments: 124, percentile: "Top 1%", badges: ["Elite", "Fast Improver"], trend: "up" },
  { rank: 2, name: "Sarah Chen", sport: "Basketball", score: 96, streak: 32, assessments: 98, percentile: "Top 2%", badges: ["Consistency"], trend: "up" },
  { rank: 3, name: "Marcus Rodriguez", sport: "Football", score: 94, streak: 15, assessments: 76, percentile: "Top 5%", badges: ["Top Performer"], trend: "down" },
  { rank: 12, name: "David Kim", sport: "Athletics", score: 86, streak: 7, assessments: 42, percentile: "Top 10%", badges: ["Fast Improver"], trend: "up", isUser: true },
  { rank: 13, name: "Emma Wilson", sport: "Volleyball", score: 85, streak: 12, assessments: 38, percentile: "Top 12%", badges: [], trend: "up" },
];

const GlassCard = ({ children, className = "", title, icon: Icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group transition-shadow duration-500 hover:shadow-blue-500/5 ${className}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
          inset: 0,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      {title && (
        <div className="flex items-center gap-3 mb-6 relative z-10">
          {Icon && (
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase group-hover:text-slate-300 transition-colors">{title}</h3>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('progress-history')) return 'history';
    if (location.pathname.includes('leaderboard')) return 'leaderboard';
    return 'analytics';
  });

  useEffect(() => {
    if (location.pathname.includes('progress-history')) setActiveTab('history');
    else if (location.pathname.includes('leaderboard')) setActiveTab('leaderboard');
    else setActiveTab('analytics');
  }, [location.pathname]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("All Sports");
  const [timeframe, setTimeframe] = useState("Weekly"); // Weekly, Monthly
  const [showSportDropdown, setShowSportDropdown] = useState(false);

  const sportsList = ["All Sports", "Athletics", "Basketball", "Football", "Volleyball", "Cricket"];

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === "All Sports" || athlete.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-grow"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase border border-blue-500/20">Athlete Profile</span>
              <div className="flex items-center gap-1 text-slate-500 text-[10px] font-black tracking-widest uppercase">
                <Flame size={10} className="text-orange-500" /> 7 Day Streak
              </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">David Kim</h1>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
              {[
                { id: "analytics", label: "analytics", path: "/dashboard" },
                { id: "history", label: "history", path: "/progress-history" },
                { id: "leaderboard", label: "leaderboard", path: "/leaderboard" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    navigate(tab.path);
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${
                    activeTab === tab.id 
                      ? "bg-slate-800 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)] border border-blue-500/20" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 10px rgba(59, 130, 246, 0.2)", "0 0 20px rgba(59, 130, 246, 0.4)", "0 0 10px rgba(59, 130, 246, 0.2)"]
              }}
              transition={{
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              onClick={() => navigate("/start-assessment")}
              className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-black tracking-[0.15em] text-xs uppercase shadow-2xl flex items-center gap-3 border border-blue-400/50"
            >
              <Activity size={16} />
              New Assessment
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Overall Score & Radar */}
              <div className="lg:col-span-4 space-y-6">
                <GlassCard className="text-center py-10">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                      <motion.circle 
                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={440}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * 86) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-white"><CountUp end={86} /></span>
                      <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Overall</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                      <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">Peer Rank</p>
                      <p className="text-xl font-bold text-white">#12</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                      <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">Percentile</p>
                      <p className="text-xl font-bold text-blue-400">Top 10%</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard title="Metric Analysis" icon={Target}>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'black' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                          itemStyle={{ fontWeight: 'bold' }}
                        />
                        <Radar
                          name="You"
                          dataKey="self"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.5}
                        />
                        <Radar
                          name="Average"
                          dataKey="average"
                          stroke="#64748b"
                          fill="#64748b"
                          fillOpacity={0.2}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Detailed Metric Strips */}
                  <div className="mt-6 space-y-3">
                    {radarData.map((m) => (
                      <div key={m.subject} className="group/metric">
                        <div className="flex justify-between text-[10px] font-black tracking-widest uppercase mb-1.5">
                          <span className="text-slate-400 group-hover/metric:text-blue-400 transition-colors">{m.subject}</span>
                          <div className="flex gap-3">
                            <span className="text-blue-400">{m.self}%</span>
                            <span className="text-slate-600">Avg: {m.average}%</span>
                          </div>
                        </div>
                        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden flex border border-slate-800/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${m.self}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-blue-500 h-full relative z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Right Column: Progress Chart & Benchmarks */}
              <div className="lg:col-span-8 space-y-6">
                <GlassCard title="Performance Trend" icon={TrendingUp}>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#475569" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#475569" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 100]}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                          itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#3b82f6" 
                          strokeWidth={4}
                          dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#020617' }}
                          activeDot={{ r: 8, fill: '#60a5fa' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard title="Quick stats" icon={Activity}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <span className="text-xs font-bold text-slate-400">Improvement Rate</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <TrendingUp size={14} /> +12%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <span className="text-xs font-bold text-slate-400">Consistency Score</span>
                        <span className="text-blue-400 font-bold">94/100</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <span className="text-xs font-bold text-slate-400">Total Assessments</span>
                        <span className="text-white font-bold text-lg">42</span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard title="Active Achievements" icon={Award}>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400">
                        <Star size={12} /> <span className="text-[10px] font-black uppercase">Consistent</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        <Rocket size={12} /> <span className="text-[10px] font-black uppercase">Rapid Growth</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        <ShieldCheck size={12} /> <span className="text-[10px] font-black uppercase">Verified Elite</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                <GlassCard title="Quick Navigation" icon={Milestone}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <button onClick={() => navigate('/profile-assessment')} className="flex flex-col items-center justify-center p-4 bg-slate-900/50 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/50 rounded-xl transition-all group">
                      <UserCircle className="text-slate-400 group-hover:text-blue-400 mb-3" size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white text-center">Profile Assessment</span>
                    </button>
                    <button onClick={() => navigate('/assessment')} className="flex flex-col items-center justify-center p-4 bg-slate-900/50 hover:bg-emerald-600/20 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group">
                      <Video className="text-slate-400 group-hover:text-emerald-400 mb-3" size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white text-center">Video Assessment</span>
                    </button>
                    <button onClick={() => navigate('/results')} className="flex flex-col items-center justify-center p-4 bg-slate-900/50 hover:bg-purple-600/20 border border-slate-800 hover:border-purple-500/50 rounded-xl transition-all group">
                      <BarChart2 className="text-slate-400 group-hover:text-purple-400 mb-3" size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white text-center">Detailed Results</span>
                    </button>
                    <button onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center justify-center p-4 bg-slate-900/50 hover:bg-orange-600/20 border border-slate-800 hover:border-orange-500/50 rounded-xl transition-all group">
                      <Calendar className="text-slate-400 group-hover:text-orange-400 mb-3" size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white text-center">Progress History</span>
                    </button>
                    <button onClick={() => { setActiveTab('leaderboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center justify-center p-4 bg-slate-900/50 hover:bg-yellow-600/20 border border-slate-800 hover:border-yellow-500/50 rounded-xl transition-all group">
                      <Trophy className="text-slate-400 group-hover:text-yellow-400 mb-3" size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white text-center">Leaderboard</span>
                    </button>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <GlassCard title="Assessment Timeline" icon={Calendar}>
                <div className="space-y-8 py-4">
                  {[
                    { date: "June 12, 2024", score: 86, type: "Video Assessment", impact: "+4 pts" },
                    { date: "May 28, 2024", score: 82, type: "Profile Update", impact: "+2 pts" },
                    { date: "May 15, 2024", score: 80, type: "Video Assessment", impact: "-2 pts" },
                    { date: "April 30, 2024", score: 82, type: "Profile Update", impact: "+4 pts" },
                  ].map((entry, idx) => (
                    <div key={idx} className="flex gap-6 relative group">
                      {idx !== 3 && <div className="absolute left-[21px] top-10 bottom-[-32px] w-0.5 bg-slate-800 group-hover:bg-blue-500/30 transition-colors" />}
                      <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 relative z-10 group-hover:border-blue-500/50 transition-colors">
                        <Activity size={18} className="text-slate-500 group-hover:text-blue-400" />
                      </div>
                      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-slate-900/30 border border-slate-800/50 group-hover:border-blue-500/20 transition-all">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">{entry.date}</p>
                          <h4 className="text-lg font-bold text-white">{entry.type}</h4>
                        </div>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">Score</p>
                            <p className="text-xl font-bold text-blue-400">{entry.score}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-lg text-xs font-bold ${entry.impact.includes("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                            {entry.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Leaderboard Controls */}
              <div className="flex flex-col md:flex-row gap-4 relative z-50">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search athletes..." 
                    className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-200"
                  />
                </div>
                <div className="flex gap-2 relative">
                  {/* Sport Filter Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowSportDropdown(!showSportDropdown)}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-black tracking-widest uppercase text-slate-400 hover:text-white transition-colors min-w-[160px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Filter size={16} /> {sportFilter}
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${showSportDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showSportDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-[60] backdrop-blur-xl"
                        >
                          {sportsList.map(sport => (
                            <button
                              key={sport}
                              onClick={() => {
                                setSportFilter(sport);
                                setShowSportDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                sportFilter === sport ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sport}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Timeframe Toggle */}
                  <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 scale-90 sm:scale-100">
                    {["Weekly", "Monthly"].map(t => (
                      <button
                        key={t}
                        onClick={() => setTimeframe(t)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${
                          timeframe === t ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leaderboard Table (LeetCode style) */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-slate-800 bg-slate-900/30 font-black tracking-widest uppercase text-[10px] text-slate-500">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Athlete</div>
                  <div className="col-span-2">Score</div>
                  <div className="col-span-2 text-center">Streak</div>
                  <div className="col-span-2 text-center text-rose-500/80">Badges</div>
                  <div className="col-span-1 text-right">Trend</div>
                </div>
                
                <div className="divide-y divide-slate-800/50">
                  {filteredAthletes.length > 0 ? (
                    filteredAthletes.map((athlete, idx) => (
                      <motion.div 
                        key={athlete.name}
                        whileHover={{ scale: 1.005, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
                        className={`grid grid-cols-12 gap-4 px-8 py-6 items-center transition-all duration-300 cursor-pointer relative group ${athlete.isUser ? "bg-blue-600/10 border-l-4 border-blue-500" : ""}`}
                      >
                        <div className="col-span-1 font-black text-slate-500">
                          {athlete.rank <= 3 ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              athlete.rank === 1 ? "bg-yellow-500 text-yellow-900" :
                              athlete.rank === 2 ? "bg-slate-300 text-slate-900" :
                              "bg-orange-600 text-orange-100"
                            }`}>
                              {athlete.rank}
                            </div>
                          ) : `#${athlete.rank}`}
                        </div>
                        
                        <div className="col-span-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400">
                            {athlete.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm flex items-center gap-2">
                              {athlete.name}
                              {athlete.isUser && <span className="px-1.5 py-0.5 rounded-md bg-blue-500 text-[8px] uppercase tracking-tighter">You</span>}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase">{athlete.sport}</p>
                          </div>
                        </div>

                        <div className="col-span-2 font-black text-lg text-white">
                          {athlete.score}
                          <span className="ml-2 text-[10px] text-slate-500">{athlete.percentile}</span>
                        </div>

                        <div className="col-span-2 text-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 font-bold text-xs">
                            <Flame size={12} fill="currentColor" /> {athlete.streak}d
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex justify-center gap-1">
                            {athlete.badges.map(b => (
                              <div key={b} title={b} className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-blue-400">
                                {b === "Elite" ? <Award size={14} /> : b === "Consistency" ? <Flame size={14} /> : <Target size={14} />}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-span-1 text-right flex justify-end">
                          {athlete.trend === "up" ? (
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                              <TrendingUp size={16} />
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                              <TrendingDown size={16} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-20 text-center">
                      <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">No athletes found matching filters</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
