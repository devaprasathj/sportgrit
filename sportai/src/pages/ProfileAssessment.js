import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Activity, Target, CheckCircle, FileText, Download, BarChart2 } from "lucide-react";
import SportChatBot from "../components/SportChatBot";

export default function ProfileAssessment() {
	const navigate = useNavigate();
	
	const defaultMetrics = {
		age: "",
		height: "",
		weight: "",
		experience: "",
		sportType: "",
		sprintTime: "",
		jumpHeight: "",
		endurance: "",
	};

	const [metrics, setMetrics] = useState(defaultMetrics);
	const [assessmentStep, setAssessmentStep] = useState('form'); // 'form', 'processing', 'report'
	const [processingPhase, setProcessingPhase] = useState(0);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMetrics((prev) => ({ ...prev, [name]: value }));
	};

	const handleProfileSubmit = (e) => {
		e.preventDefault();
		setAssessmentStep('processing');
	};

	useEffect(() => {
		if (assessmentStep === 'processing') {
			const phases = [
				{ time: 0, phase: 0 },
				{ time: 1000, phase: 1 },
				{ time: 2000, phase: 2 },
				{ time: 3000, phase: 3 },
				{ time: 4000, phase: 4 } // Move to report
			];

			phases.forEach(({ time, phase }) => {
				setTimeout(() => {
					if (phase === 4) setAssessmentStep('report');
					else setProcessingPhase(phase);
				}, time);
			});
		}
	}, [assessmentStep]);

	const renderProcessingScreen = () => {
		const phases = [
			"Profile Analysis",
			"Benchmark Matching",
			"Score Calculation",
			"Recommendation Generation"
		];

		return (
			<div className="py-16 flex flex-col items-center justify-center">
				<div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
				
				<div className="w-full max-w-sm space-y-4">
					{phases.map((phase, idx) => (
						<div key={idx} className="flex items-center gap-4">
							<div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300
								${processingPhase > idx ? 'bg-violet-500 border-violet-500' : 
								  processingPhase === idx ? 'border-violet-400 bg-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 
								  'border-slate-700 bg-transparent'}`}
							>
								{processingPhase > idx && <CheckCircle size={14} className="text-white" />}
							</div>
							<span className={`text-lg font-medium transition-colors duration-300
								${processingPhase >= idx ? 'text-white' : 'text-slate-500'}`}>
								{phase}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderReportPreview = () => (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-slate-50 rounded-xl overflow-hidden shadow-2xl relative"
		>
			<div className="bg-violet-900 border-b border-violet-800 p-6 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FileText className="text-violet-300" size={28} />
					<h2 className="text-2xl font-bold text-white">AI Assessment Report</h2>
				</div>
				<div className="text-violet-200 text-sm font-medium bg-violet-800 px-4 py-1.5 rounded-full">
					CONFIDENTIAL
				</div>
			</div>

			<div className="p-8 text-slate-800 space-y-8">
				{/* Top Stats */}
				<div className="grid grid-cols-2 gap-6 pb-8 border-b border-slate-200">
					<div>
						<p className="text-slate-500 font-semibold mb-1 uppercase tracking-wider text-xs">Overall Score</p>
						<p className="text-5xl font-extrabold text-violet-700">84<span className="text-2xl text-slate-400">/100</span></p>
					</div>
					<div>
						<p className="text-slate-500 font-semibold mb-1 uppercase tracking-wider text-xs">Athlete Level</p>
						<p className="text-3xl font-bold text-slate-800">{metrics.experience ? metrics.experience.charAt(0).toUpperCase() + metrics.experience.slice(1) : 'Advanced'}</p>
					</div>
				</div>

				{/* Breakdown */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-6">
						<div>
							<h4 className="flex items-center gap-2 font-bold text-emerald-600 mb-3"><CheckCircle size={18} /> Strengths</h4>
							<ul className="list-disc list-inside text-slate-600 ml-4 space-y-1">
								<li>Explosive leg power (Jump Height)</li>
								<li>Above average sprint acceleration</li>
							</ul>
						</div>
						<div>
							<h4 className="flex items-center gap-2 font-bold text-rose-600 mb-3"><Target size={18} /> Weaknesses</h4>
							<ul className="list-disc list-inside text-slate-600 ml-4 space-y-1">
								<li>Cardiovascular endurance baseline</li>
								<li>Lactic functional threshold</li>
							</ul>
						</div>
					</div>

					<div className="bg-slate-100 rounded-xl p-5 border border-slate-200">
						<h4 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Benchmark Matching</h4>
						<p className="text-slate-600 text-sm leading-relaxed">
							Based on your metrics, you place in the <strong className="text-violet-700">Top 18%</strong> of {metrics.sportType || 'athletes'} within your age demographic. Your explosive power aligns with collegiate-level profiles, though endurance scores track closer to recreational percentiles.
						</p>
					</div>
				</div>

				{/* Recommendations */}
				<div className="bg-violet-50 rounded-xl p-6 border border-violet-100">
					<h4 className="font-bold text-violet-900 mb-3 border-b border-violet-200 pb-2">Primary AI Recommendations</h4>
					<ul className="list-none space-y-3">
						<li className="flex gap-3 text-slate-700">
							<span className="font-bold text-violet-500">1.</span> 
							Integrate High-Intensity Interval Training (HIIT) 2x weekly to elevate endurance base.
						</li>
						<li className="flex gap-3 text-slate-700">
							<span className="font-bold text-violet-500">2.</span> 
							Maintain current plyometric routine to preserve jump height advantage.
						</li>
					</ul>
				</div>
			</div>

			<div className="bg-slate-100 border-t border-slate-200 p-6 flex flex-col sm:flex-row gap-4 justify-end">
				<button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
					<Download size={18} /> Download Report
				</button>
				<button 
					onClick={() => navigate('/dashboard')}
					className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-md hover:shadow-lg"
				>
					<BarChart2 size={18} /> View Detailed Analytics
				</button>
			</div>
		</motion.div>
	);

	return (
		<motion.div 
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			className="min-h-screen pt-28 pb-12 px-6 flex flex-col items-center bg-slate-900"
		>
			<div className="max-w-4xl w-full">
				<div className="flex items-center mb-8 gap-4">
					<button onClick={() => navigate('/start-assessment')} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full border border-slate-700">
						<ChevronLeft size={24} />
					</button>
					<div>
						<h1 className="text-3xl font-bold text-white">Profile Assessment</h1>
						<p className="text-slate-400 mt-1">Enter your physical metrics to generate an AI benchmark score.</p>
					</div>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-violet-500/20 p-8 shadow-xl">
					{assessmentStep === 'form' && (
						<form onSubmit={handleProfileSubmit} className="space-y-8">
							{/* Basic Info Section */}
							<div>
								<h3 className="text-xl font-bold text-violet-300 mb-4 flex items-center gap-2">
									<UserIcon /> Basic Information
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
										<input required type="number" name="age" value={metrics.age} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 24" />
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Height (cm)</label>
										<input required type="number" name="height" value={metrics.height} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 180" />
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Weight (kg)</label>
										<input required type="number" name="weight" value={metrics.weight} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 75" />
									</div>
								</div>
							</div>

							{/* Athletic Profile Section */}
							<div>
								<h3 className="text-xl font-bold text-violet-300 mb-4 flex items-center gap-2 mt-2">
									<Target size={20} /> Athletic Profile
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Primary Sport</label>
										<select required name="sportType" value={metrics.sportType} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors">
											<option value="">Select a sport...</option>
											<option value="cricket">Cricket</option>
											<option value="football">Football</option>
											<option value="tennis">Tennis</option>
											<option value="basketball">Basketball</option>
											<option value="athletics">Athletics (Track & Field)</option>
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
										<select required name="experience" value={metrics.experience} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors">
											<option value="">Select level...</option>
											<option value="beginner">Beginner (0-2 years)</option>
											<option value="intermediate">Intermediate (2-5 years)</option>
											<option value="advanced">Advanced (5-10 years)</option>
											<option value="professional">Professional (10+ years)</option>
										</select>
									</div>
								</div>
							</div>

							<div className="my-6 border-b border-slate-700/50" />

							{/* Performance Metrics Section */}
							<div>
								<h3 className="text-xl font-bold text-violet-300 mb-4 flex items-center gap-2">
									<Activity size={20} /> Performance Metrics
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Sprint Time (100m, sec)</label>
										<input required type="number" step="0.01" name="sprintTime" value={metrics.sprintTime} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 12.5" />
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Vertical Jump (cm)</label>
										<input required type="number" name="jumpHeight" value={metrics.jumpHeight} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 60" />
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">Endurance Score (1-10)</label>
										<input required type="number" min="1" max="10" name="endurance" value={metrics.endurance} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 8" />
									</div>
								</div>
							</div>

							<div className="flex justify-end pt-8">
								<button 
									type="submit"
									className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-violet-500/25 text-lg w-full md:w-auto"
								>
									Generate AI Report <FileText size={20} />
								</button>
							</div>
						</form>
					)}
					
					{assessmentStep === 'processing' && renderProcessingScreen()}
					{assessmentStep === 'report' && renderReportPreview()}
				</div>
			</div>
			
			<SportChatBot />
		</motion.div>
	);
}

// Inline User Icon
function UserIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	)
}
