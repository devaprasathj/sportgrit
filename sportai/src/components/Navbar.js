import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Mail, Phone, ChevronDown, Home, ClipboardCheck, TrendingUp, Menu, X, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { auth, db } from "../Firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [userDetails, setUserDetails] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Track open navigation dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const navLinks = [
    { label: "Home", path: "/home", icon: Home },
    { 
      label: "Assessment", 
      icon: ClipboardCheck, 
      path: "/start-assessment",
      dropdownItems: [
        { label: "Start Assessment", path: "/start-assessment" },
        { label: "Video Assessment", path: "/video-assessment" },
        { label: "Profile Assessment", path: "/profile-assessment" }
      ]
    },
    { 
      label: "Results", 
      icon: TrendingUp,
      path: "/results",
      dropdownItems: [
        { label: "Performance Score", path: "/results", section: "score" },
        { label: "Benchmark Comparison", path: "/results", section: "benchmark" },
        { label: "AI Recommendations", path: "/results", section: "recommendations" },
        { label: "Report Download", path: "/results", section: "report" }
      ]
    },
    { 
      label: "Dashboard", 
      icon: TrendingUp,
      path: "/dashboard",
      dropdownItems: [
        { label: "Analytics", path: "/dashboard" },
        { label: "Progress History", path: "/progress-history" },
        { label: "Leaderboard", path: "/leaderboard" }
      ]
    },
    { 
      label: "About", 
      icon: HelpCircle,
      dropdownItems: [
        { label: "Objective", path: "/about/objective" },
        { label: "Workflow", path: "/about", section: "workflow" },
        { label: "Features", path: "/about/features" },
        { label: "AI Advantage", path: "/about", section: "why" },
        { label: "Contact", path: "/about/contact" }
      ]
    },
  ];

  // Fetch user details from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          } else {
            // Fallback to auth user data if Firestore doc doesn't exist
            setUserDetails({
              fullName: user.displayName || user.email,
              email: user.email,
              phone: "",
              gender: ""
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUserDetails({
            fullName: user.displayName || user.email,
            email: user.email,
          });
        }
      };
      
      fetchUserDetails();
    } else {
      setUserDetails(null);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setProfileDropdownOpen(false);
      setUserDetails(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userDetails?.fullName) {
      return userDetails.fullName
        .split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md shadow-2xl h-20 flex items-center justify-between px-8 z-50 border-b border-cyan-500/20"
    >
      {/* Left: Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <Logo size="sm" />
        <div className="hidden sm:flex flex-col">
          <h1 className="font-bold text-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            sportgrit
          </h1>
          <p className="text-xs text-cyan-400/60 font-mono">Assessment</p>
        </div>
      </motion.div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-2">
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = link.path ? location.pathname === link.path : false;
          const hasDropdown = !!link.dropdownItems;
          const isDropdownOpen = activeDropdown === index;
          
          return (
            <div 
              key={link.label} 
              className="relative"
              onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
              onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => link.path && navigate(link.path)}
                className={`
                  relative flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-[15px]
                  transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-400/50 shadow-lg shadow-blue-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700'
                  }
                `}
              >
                <span className="font-medium tracking-wide">{link.label}</span>
                {hasDropdown && (
                   <ChevronDown 
                     size={14} 
                     className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}
                   />
                )}
                
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[11px] left-2 right-2 h-[3px] bg-blue-500 rounded-t-full shadow-[0_-2px_10px_rgba(59,130,246,0.8)]"
                  />
                )}
              </motion.button>
              
              {/* Dropdown Menu */}
              {hasDropdown && (
                <AnimatePresence>
                  {isDropdownOpen && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       transition={{ duration: 0.2 }}
                       className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                     >
                       {link.dropdownItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path, { state: { section: item.section } });
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-300 text-sm font-medium hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all duration-200"
                          >
                            {item.label}
                          </button>
                       ))}
                     </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: User Actions + Language Switcher */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - More Visible */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/60"
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </motion.button>

        {/* Language Switcher - Visible on Mobile & Desktop */}
        <LanguageSwitcher />
        
        {/* User Profile & Logout - Hidden on Mobile, shown on Desktop */}
        <div className="hidden md:block">
          {user ? (
            <div className="relative">
            {/* User Profile Dropdown Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-400/50 hover:border-blue-300 hover:bg-blue-400/10 transition-all duration-300 bg-slate-800"
            >
              {/* Avatar Circle */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold shadow-lg">
                {getUserInitials()}
              </div>
            </motion.button>
            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50 backdrop-blur-xl"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-slate-900/50 via-cyan-900/20 to-slate-900/50 p-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold shadow-lg">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-cyan-100 font-bold">
                          {userDetails?.fullName || "User"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="p-4 space-y-3 border-b border-cyan-500/10">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-cyan-400" />
                      <div>
                        <p className="text-xs text-cyan-400/70">Email</p>
                        <p className="text-sm text-cyan-100 break-all">{user.email}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    {userDetails?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-cyan-400" />
                        <div>
                          <p className="text-xs text-cyan-400/70">Phone</p>
                          <p className="text-sm text-cyan-100">{userDetails.phone}</p>
                        </div>
                      </div>
                    )}

                    {/* Gender */}
                    {userDetails?.gender && (
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-cyan-400" />
                        <div>
                          <p className="text-xs text-cyan-400/70">Gender</p>
                          <p className="text-sm text-cyan-100 capitalize">{userDetails.gender}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Logout Button */}
                  <div className="p-3">
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "rgb(239, 68, 68, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 hover:border-red-400/50 text-red-300 hover:text-red-200 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut size={16} />
                      {loading ? "Logging out..." : t("nav.logout")}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Login Button
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg font-semibold text-cyan-300 border border-cyan-400/50 hover:border-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 text-sm"
          >
            {t("nav.login")}
          </motion.button>
        )}
        </div>
      </div>

      {/* Mobile Menu with Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Full-screen Dimmed Backdrop - More Transparent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="md:hidden fixed top-20 left-0 right-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-cyan-500/40 shadow-2xl overflow-hidden z-50"
            >
            <div className="px-6 py-8 space-y-4">
              {/* Mobile Nav Links */}
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = link.path ? location.pathname === link.path : false;
                const hasDropdown = !!link.dropdownItems;
                const isMobileDropOpen = activeMobileDropdown === index;
                
                return (
                  <div key={link.label} className="w-full">
                    <motion.button
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        if (hasDropdown) {
                          setActiveMobileDropdown(isMobileDropOpen ? null : index);
                        } else if (link.path) {
                          navigate(link.path);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-lg
                        transition-all duration-300 group relative overflow-hidden
                        ${isActive || isMobileDropOpen
                          ? 'bg-gradient-to-r from-blue-500/40 to-blue-600/40 text-blue-50 border border-blue-400/80 shadow-xl shadow-blue-500/40' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <Icon 
                          size={26} 
                          className={`
                            transition-all duration-300
                            ${isActive || isMobileDropOpen ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-400'}
                          `}
                          strokeWidth={2.5}
                        />
                        <span className="font-bold tracking-wide">{link.label}</span>
                      </div>
                      
                      {hasDropdown ? (
                         <ChevronDown size={22} className={`transition-transform duration-300 ${isMobileDropOpen ? 'rotate-180 text-blue-300' : 'text-slate-400 group-hover:text-blue-400'}`} />
                      ) : isActive && (
                        <motion.div
                          layoutId="mobileBadge"
                          className="ml-auto px-4 py-1.5 rounded-full bg-blue-500/50 text-blue-100 text-xs font-bold border border-blue-400/80"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Active
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Mobile Dropdown Menu Items */}
                    {hasDropdown && isMobileDropOpen && (
                       <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: "auto" }}
                         exit={{ opacity: 0, height: 0 }}
                         className="flex flex-col mt-2 ml-4 border-l border-blue-500/30 overflow-hidden"
                       >
                          {link.dropdownItems.map((item, idx) => (
                             <button
                               key={idx}
                               onClick={() => {
                                 navigate(item.path, { state: { section: item.section } });
                                 setMobileMenuOpen(false);
                               }}
                               className="text-left w-full pl-6 py-3 text-slate-300 font-medium hover:text-white hover:bg-blue-600/20 rounded-r-xl transition-all"
                             >
                               {item.label}
                             </button>
                          ))}
                       </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
