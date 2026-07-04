import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  // Clear form data when component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
    setEmailFocus(false);
    setPasswordFocus(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Clear form on successful login
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setLoading(false);
      
      // Navigate to home on success - auth state change will be detected by App.js
      navigate("/home");
    } catch (err) {
      setLoading(false);
      // Handle Firebase errors
      if (err.code === "auth/user-not-found") {
        setError(t("login.errorUserNotFound") || "Email not found. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setError(t("login.errorWrongPassword") || "Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError(t("login.errorInvalidEmail") || "Invalid email address.");
      } else if (err.code === "auth/invalid-credential") {
        setError(t("login.errorInvalidCredential") || "Invalid email or password. Please try again.");
      } else {
        setError(err.message || t("login.errorDefault") || "Login failed. Please try again.");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 relative overflow-hidden">
      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.1) 25%, rgba(34, 211, 238, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.1) 75%, rgba(34, 211, 238, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.1) 25%, rgba(34, 211, 238, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.1) 75%, rgba(34, 211, 238, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -100, 0], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cyan-500 opacity-5 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 100, 0], rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"
      />

      {/* Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 600], opacity: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-amber-300 to-orange-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-50px",
            }}
          />
        ))}
      </div>

      {/* Sports Animation - Basketball Player Jumping in Rain */}
      <motion.div
        animate={{ 
          y: [0, -100, 0],
          x: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-10 text-6xl opacity-15"
      >
        🏀
      </motion.div>

      {/* Sports Animation - Tennis Player Hitting in Rain */}
      <motion.div
        animate={{ 
          x: [0, 150, 300, 150, 0],
          y: [0, -60, 0, -60, 0],
          rotate: [0, 45, 90, 45, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-20 text-5xl opacity-12"
      >
        🎾
      </motion.div>

      {/* Sports Animation - Soccer Player Kicking */}
      <motion.div
        animate={{ 
          x: [300, 150, 0],
          y: [0, -80, 0],
          rotate: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 text-6xl opacity-15"
      >
        ⚽
      </motion.div>

      {/* Sports Animation - Runner Sprinting in Rain */}
      <motion.div
        animate={{ 
          x: [-100, 100, 300, 100, -100],
          y: [0, -40, 0, -40, 0],
          scaleX: [-1, 1, 1, 1, -1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-20 text-5xl opacity-12"
      >
        🏃
      </motion.div>

      {/* Sports Animation - Swimmer Doing Backstroke */}
      <motion.div
        animate={{ 
          x: [0, 200, 400, 200, 0],
          y: [0, -30, 0, -30, 0],
          rotate: [0, 15, 30, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 text-5xl opacity-12"
      >
        🏊
      </motion.div>

      {/* Sports Animation - Cyclist Racing */}
      <motion.div
        animate={{ 
          x: [-200, 0, 200, 0, -200],
          y: [-20, 0, -20, 0, -20],
          rotate: [0, 10, 20, 10, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2/3 right-1/4 text-6xl opacity-13"
      >
        🚴
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl w-full max-w-md p-8 relative z-10"
      >
        {/* Logo Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-3"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <Logo size="lg" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-cyan-100 text-center mb-2"
        >
          {t("login.title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-center text-cyan-300/70 text-sm mb-6 font-light"
        >
          {t("login.subtitle")}
        </motion.p>

        <motion.form
          onSubmit={handleLogin}
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          autoComplete="on"
        >
          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">
              {t("login.email")}
            </label>
            <motion.div
              className={`relative transition-all duration-300 ${
                emailFocus ? "border-cyan-400" : "border-cyan-400/30"
              }`}
              animate={emailFocus ? { boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" } : {}}
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder={t("login.emailPlaceholder") || "you@example.com"}
                required
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-all duration-300 text-cyan-100 placeholder-cyan-600/50 text-sm"
              />
            </motion.div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">
              {t("login.password")}
            </label>
            <motion.div
              className={`relative transition-all duration-300 ${
                passwordFocus ? "border-cyan-400" : "border-cyan-400/30"
              }`}
              animate={passwordFocus ? { boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" } : {}}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                placeholder={t("login.passwordPlaceholder") || "••••••••"}
                required
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-all duration-300 text-cyan-100 placeholder-cyan-600/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-sm text-cyan-300 hover:text-cyan-100"
              >
                {showPassword ? t("login.hide") : t("login.show")}
              </button>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              variants={itemVariants}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Forgot Password */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end"
          >
            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors duration-300"
            >
              {t("login.forgot")}
            </motion.a>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
            >
              {loading ? (
                <motion.div className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚙️
                  </motion.span>
                  {t("login.loading")}
                </motion.div>
              ) : (
                t("login.submit")
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Register Link */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-5"
        >
          <p className="text-cyan-300/70 text-sm">
            {t("login.registerPrompt")}{" "}
            <motion.span
              whileHover={{ scale: 1.05, color: "#22d3ee" }}
              onClick={() => navigate("/register")}
              className="text-cyan-400 cursor-pointer hover:underline font-bold transition-colors duration-300"
            >
              {t("login.registerAction")}
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
