import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, Activity, FileVideo, ChevronRight, User } from 'lucide-react';

export default function StartAssessment() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-28 pb-12 px-6 flex flex-col items-center justify-center bg-slate-900"
    >
      <div className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-6">Choose Your Assessment Method</h1>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Select the assessment path that best suits your needs. Both methods provide actionable insights and performance tracking.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          {/* Video Assessment Tile */}
          <div className="bg-slate-800/80 p-8 rounded-xl border border-blue-500/30 flex-1 flex flex-col items-center relative overflow-hidden group hover:border-blue-400 transition-all cursor-pointer"
               onClick={() => navigate('/video-assessment')}>
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FileVideo className="text-blue-400 mb-6" size={48} />
            <h3 className="text-2xl text-white font-bold mb-4">Video Assessment</h3>
            <ul className="text-slate-300 text-sm text-left w-full space-y-2 mb-8">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Upload or record form</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> AI Pose Estimation</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Biomechanical Analysis</li>
            </ul>
            <button className="mt-auto w-full bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
              Select Video <ChevronRight size={18} />
            </button>
          </div>

          {/* Profile Assessment Tile */}
          <div className="bg-slate-800/80 p-8 rounded-xl border border-violet-500/30 flex-1 flex flex-col items-center relative overflow-hidden group hover:border-violet-400 transition-all cursor-pointer"
               onClick={() => navigate('/profile-assessment')}>
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <User className="text-violet-400 mb-6" size={48} />
            <h3 className="text-2xl text-white font-bold mb-4">Profile Assessment</h3>
            <ul className="text-slate-300 text-sm text-left w-full space-y-2 mb-8">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Manual metric logging</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Ideal if no video is available</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Direct score calculation</li>
            </ul>
            <button className="mt-auto w-full bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
              Select Profile <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}