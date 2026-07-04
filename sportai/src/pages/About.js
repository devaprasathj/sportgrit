import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  ChevronDown, Target, Cpu, BarChart3, Zap, 
  Workflow, CheckCircle2, Video, UserCircle, 
  LineChart, Trophy, Mail, Github, MessageSquare, 
  Users, HelpCircle, ShieldCheck, Send, Loader2
} from "lucide-react";

const AccordionItem = ({ id, title, icon: Icon, isOpen, onClick, children }) => (
  <div className={`bg-[#0f172a]/80 backdrop-blur-xl border rounded-3xl mb-4 overflow-hidden shadow-2xl transition-all duration-500 ${isOpen ? 'border-blue-500/50 shadow-blue-500/10' : 'border-slate-800 hover:border-slate-700'}`}>
    <button 
      onClick={() => onClick(id)}
      className="w-full flex items-center justify-between p-6 text-left group"
    >
      <div className="flex items-center gap-5">
        <div className={`p-3 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-900 text-slate-500 border border-slate-800 group-hover:border-slate-700'}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className={`text-xl font-black tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{title}</h3>
          {!isOpen && <p className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase mt-1">Click to expand</p>}
        </div>
      </div>
      <motion.div 
        animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }} 
        className={`${isOpen ? 'text-blue-400' : 'text-slate-600'}`}
      >
        <ChevronDown size={24} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: "auto", opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="p-8 border-t border-slate-800/50 bg-slate-900/20">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
  >
    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
      <Icon size={20} />
    </div>
    <h4 className="text-white font-bold mb-2">{title}</h4>
    <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
  </motion.div>
);

export default function About() {
  const location = useLocation();
  const [openSection, setOpenSection] = useState("objective");
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setFormStatus('success');
        setFeedback({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        console.error("Backend failed to send email.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setFormStatus('error');
    } finally {
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  useEffect(() => {
    const path = location.pathname;
    const state = location.state;

    if (state?.section) {
      setOpenSection(state.section);
    } else if (path.includes("objective")) {
      setOpenSection("objective");
    } else if (path.includes("features")) {
      setOpenSection("features");
    } else if (path.includes("contact")) {
      setOpenSection("contact");
    }
  }, [location]);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
            <HelpCircle size={12} /> Discover SportGrit
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Empowering Athletes with AI</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            SportGrit is a next-generation sports analytics platform designed to bridge the gap between effort and excellence using advanced AI.
          </p>
        </motion.div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          
          {/* Section 1: Objective */}
          <AccordionItem 
            id="objective" 
            title="Our Objective" 
            icon={Target} 
            isOpen={openSection === 'objective'} 
            onClick={toggleSection}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Talent Identification</h4>
                    <p className="text-slate-400 text-sm">Quantifying potential through data to find the next generation of sports stars.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">AI Assessment</h4>
                    <p className="text-slate-400 text-sm">Automated biomechanical analysis that works from any mobile camera.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <BarChart3 size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Sports Analytics</h4>
                    <p className="text-slate-400 text-sm">Professional grade metrics and insights for athletes at all levels.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
                <Zap size={48} className="text-blue-500 mb-4 animate-pulse" />
                <p className="text-slate-300 font-bold leading-relaxed">
                  "Our mission is to democratize elite-level sports training through accessible AI technology."
                </p>
              </div>
            </div>
          </AccordionItem>

          {/* Section 2: How It Works */}
          <AccordionItem 
            id="workflow" 
            title="How SportGrit Works" 
            icon={Workflow} 
            isOpen={openSection === 'workflow'} 
            onClick={toggleSection}
          >
            <div className="relative pt-8 pb-4">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: "01", label: "Assessment", icon: Video, color: "text-blue-400" },
                  { step: "02", label: "AI Analysis", icon: Cpu, color: "text-purple-400" },
                  { step: "03", label: "Scoring", icon: BarChart3, color: "text-emerald-400" },
                  { step: "04", label: "Dashboard", icon: Trophy, color: "text-orange-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center ${item.color} mb-4 shadow-xl`}>
                      <item.icon size={28} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">Step {item.step}</span>
                    <h4 className="text-white font-bold">{item.label}</h4>
                  </div>
                ))}
              </div>
            </div>
          </AccordionItem>

          {/* Section 3: Features */}
          <AccordionItem 
            id="features" 
            title="Platform Features" 
            icon={Zap} 
            isOpen={openSection === 'features'} 
            onClick={toggleSection}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard icon={Video} title="Video Assessment" desc="High-speed pose estimation from training footage." />
              <FeatureCard icon={UserCircle} title="Profile Assessment" desc="Metric-based fitness level tracking and history." />
              <FeatureCard icon={LineChart} title="Analytics" desc="Detailed performance trends and score breakdowns." />
              <FeatureCard icon={BarChart3} title="Benchmarks" desc="Regional and national standard comparisons." />
              <FeatureCard icon={Cpu} title="AI Recommendations" desc="Personalized drill suggestions from the AI engine." />
              <FeatureCard icon={Trophy} title="Leaderboard" desc="Compete with peers and climb the athletic ranks." />
            </div>
          </AccordionItem>

          {/* Section 4: Why AI Assessment? */}
          <AccordionItem 
            id="why" 
            title="Traditional vs AI" 
            icon={ShieldCheck} 
            isOpen={openSection === 'why'} 
            onClick={toggleSection}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8 text-center pb-4">
                <div className="relative">
                  <div className="text-sm font-black text-slate-500 tracking-[0.3em] uppercase mb-1">Traditional</div>
                  <div className="h-1 w-12 bg-slate-700 mx-auto rounded-full" />
                </div>
                <div className="relative">
                  <div className="text-sm font-black text-blue-400 tracking-[0.3em] uppercase mb-1 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">SportGrit AI</div>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </div>
              </div>
              
              {[
                { label: "Precision", traditional: "Subjective Observations", ai: "Biomechanical Motion Tracking", icon: Target },
                { label: "Feedback", traditional: "Delayed / General", ai: "Instant / Personalized AI Coaching", icon: Zap },
                { label: "Access", traditional: "Expensive Elite Camps", ai: "Accessible Smartphone Analytics", icon: Users },
                { label: "Data", traditional: "Manual Paper Records", ai: "Secure Cloud-Based History", icon: LineChart },
              ].map((row, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="grid grid-cols-2 gap-6 p-6 rounded-[2rem] border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Glowing background on hover/touch */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-blue-600/20" />
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(59,130,246,0.15)]" />
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                    <row.icon size={80} />
                  </div>
                  
                  <div className="space-y-2 relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest transition-colors group-hover:text-slate-400 font-mono">Traditional</span>
                    <p className="text-slate-400 text-base font-medium leading-tight transition-colors group-hover:text-slate-200">{row.traditional}</p>
                  </div>
                  
                  <div className="space-y-2 relative z-10 border-l border-slate-800/50 pl-6 transition-transform duration-300 group-hover:scale-[1.02]">
                    <span className="text-[10px] font-black text-blue-500/40 uppercase tracking-widest font-mono">SportGrit AI</span>
                    <p className="text-white text-lg font-black leading-tight group-hover:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0)] group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">
                      {row.ai}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AccordionItem>

          {/* Section 5: Contact */}
          <AccordionItem 
            id="contact" 
            title="Connect with Us" 
            icon={Mail} 
            isOpen={openSection === 'contact'} 
            onClick={toggleSection}
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Info Side */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4 opacity-50">Direct Contact</h4>
                  <div className="grid gap-3">
                    <a href="mailto:sportgritai@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Connect Directly</p>
                        <p className="text-white font-black text-lg">sportgritai@gmail.com</p>
                      </div>
                    </a>
                    <a href="https://github.com/sportgrit" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-black transition-all">
                        <Github size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Open Source</p>
                        <p className="text-white font-bold">Developer Hub</p>
                      </div>
                    </a>
                  </div>
                </div>

                
              </div>

              {/* Form Side */}
              <div className="relative">
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Name</label>
                      <input 
                        required
                        type="text" 
                        value={feedback.name}
                        onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Email</label>
                      <input 
                        required
                        type="email" 
                        value={feedback.email}
                        onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={feedback.message}
                      onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                      placeholder="How can we help you crush your goals?"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>
                  
                  <button 
                    disabled={formStatus === 'sending'}
                    type="submit"
                    className={`w-full relative group overflow-hidden py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                      formStatus === 'success' ? 'bg-emerald-500 text-white' : 
                      formStatus === 'error' ? 'bg-red-500 text-white' :
                      'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {formStatus === 'idle' && (
                        <>
                          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span>Send Feedback</span>
                        </>
                      )}
                      {formStatus === 'sending' && (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      )}
                      {formStatus === 'success' && (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Sent Successfully</span>
                        </>
                      )}
                      {formStatus === 'error' && (
                        <>
                          <span>Failed (Check Gmail Credentials)</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-[80px] pointer-events-none" />
              </div>
            </div>
          </AccordionItem>

        </div>
      </div>
    </div>
  );
}