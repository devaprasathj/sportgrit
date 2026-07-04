import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <div className="relative bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 h-full hover:border-cyan-400/40 transition-all duration-300">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-lg font-bold text-cyan-100 mb-3">{title}</h3>
        <p className="text-sm text-cyan-200/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
