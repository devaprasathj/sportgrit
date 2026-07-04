import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  // Clear form data when component mounts
  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setGender("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  // Password Strength Logic
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      if (password.length >= 8) return "Strong";
      return "Medium";
    }
    return "Medium";
  };

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("register.errorPasswordMatch") || "Passwords do not match!");
      return;
    }

    if (!fullName || !email || !phone || !gender || !password) {
      setError(t("register.errorFillAll") || "Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        createdAt: new Date()
      });

      // Clear form on successful registration
      setFullName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      
      // Navigate to home on success - auth state change will be detected by App.js
      navigate("/home");
    } catch (err) {
      setLoading(false);
      // Handle Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError(t("register.errorEmailInUse") || "Email already registered. Please login or use another email.");
      } else if (err.code === "auth/weak-password") {
        setError(t("register.errorWeakPassword") || "Password is too weak. Use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError(t("register.errorInvalidEmail") || "Invalid email address.");
      } else {
        setError(err.message || t("register.errorGeneric") || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b2447] to-[#0f172a] flex items-center justify-center px-4 relative">
      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Heavy Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-25 z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 700], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5 + Math.random() * 1.2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "linear",
            }}
            className="absolute w-1 h-16 bg-gradient-to-b from-amber-200 to-orange-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-60px",
              transform: `skewX(${-20 + Math.random() * 10}deg)`,
            }}
          />
        ))}
      </div>

      {/* Sports Animation - Basketball */}
      <motion.div
        animate={{ 
          y: [0, -120, 0],
          x: [0, 40, 0],
          rotate: [0, 360, 720]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-20 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg opacity-15"
      />

      {/* Sports Animation - Jumping Figure */}
      <motion.div
        animate={{ 
          y: [0, -100, 0],
          x: [100, 200, 100],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-20 text-6xl opacity-10"
      >
        ⛹️
      </motion.div>

      {/* Sports Animation - Soccer Ball */}
      <motion.div
        animate={{ 
          x: [0, -200, 0],
          y: [0, -60, 0],
          rotate: [0, -360, -720]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-md opacity-12"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0f172a]/80 backdrop-blur-lg border border-cyan-500/20 rounded-2xl shadow-xl w-full max-w-md p-8 text-white"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          {t("register.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("register.fullName")}
            required
            className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("register.email")}
            required
            className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("register.phone") || "Phone Number"}
            pattern="[0-9]{10}"
            title={t("register.phonePatternTitle") || "Please enter a valid 10-digit phone number"}
            required
            className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
          />

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm text-cyan-100"
          >
            <option value="" disabled>
              {t("register.selectGender") || "Select Gender"}
            </option>
            <option value="male" className="bg-[#1e293b] text-cyan-100">{t("register.male") || "Male"}</option>
            <option value="female" className="bg-[#1e293b] text-cyan-100">{t("register.female") || "Female"}</option>
            <option value="other" className="bg-[#1e293b] text-cyan-100">{t("register.other") || "Other"}</option>
          </select>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder={t("register.password")}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-cyan-400 cursor-pointer hover:text-cyan-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength Bar */}
            {password && (
              <div className="mt-1">
                <div className="h-1.5 rounded bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      strength === "Weak"
                        ? "bg-red-500 w-1/3"
                        : strength === "Medium"
                        ? "bg-yellow-400 w-2/3"
                        : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>

                <p
                  className={`text-xs mt-1 ${
                    strength === "Weak"
                      ? "text-red-400"
                      : strength === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {t("register.strength")}: {strength === "Weak" ? (t("register.weak") || "Weak") : strength === "Medium" ? (t("register.medium") || "Medium") : (t("register.strong") || "Strong")}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
                placeholder={t("register.confirmPassword")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-cyan-400 cursor-pointer hover:text-cyan-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {confirmPassword.length > 0 && (
              <p
                className={`text-xs mt-1 ${
                  password === confirmPassword
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {password === confirmPassword
                  ? t("register.match")
                  : t("register.noMatch")}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg transition text-sm"
          >
            {loading ? t("register.loading") : t("register.submit")}
          </motion.button>

        </form>

        <p className="text-center text-sm mt-5 text-gray-400">
          {t("register.loginPrompt")}{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            {t("register.loginAction")}
          </span>
        </p>

      </motion.div>

    </div>
  );
}
