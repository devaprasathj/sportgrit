import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import ProfileAssessment from "./pages/ProfileAssessment";
import Results from "./pages/Results";
import About from "./pages/About";

// New Assessment Flow Pages
import StartAssessment from "./pages/StartAssessment";
import VideoAssessment from "./pages/VideoAssessment";

// Placeholder for other routes
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen pt-28 pb-12 px-6 flex flex-col items-center justify-center bg-slate-900">
    <div className="max-w-xl w-full bg-slate-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-12 text-center shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-slate-400">This module is currently under development.</p>
    </div>
  </div>
);

// Protected Route Component
function ProtectedRoute({ element, user, loading }) {
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-cyan-400 animate-pulse">Loading...</div>
    </div>;
  }
  return user ? element : <Navigate to="/login" replace />;
}

function AppContent({ user, loading }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Layout hideNavbar={isAuthPage} user={user}>
      <Routes>
        {/* Redirect root to home if logged in, else to login */}
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } 
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home - Protected */}
        <Route 
          path="/home" 
          element={<ProtectedRoute element={<Home />} user={user} loading={loading} />} 
        />

        {/* Dashboard - Protected */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} user={user} loading={loading} />} 
        />

        {/* Assessment Modes - Protected */}
        <Route
          path="/start-assessment"
          element={<ProtectedRoute element={<StartAssessment />} user={user} loading={loading} />}
        />
        <Route
          path="/video-assessment"
          element={<ProtectedRoute element={<VideoAssessment />} user={user} loading={loading} />}
        />
        <Route
          path="/profile-assessment"
          element={<ProtectedRoute element={<ProfileAssessment />} user={user} loading={loading} />}
        />
        <Route 
          path="/assessment" 
          element={<ProtectedRoute element={<Assessment />} user={user} loading={loading} />} 
        />

        {/* Results - Protected */}
        <Route 
          path="/results" 
          element={<ProtectedRoute element={<Results />} user={user} loading={loading} />} 
        />

        {/* Results Sub-modules */}
        <Route path="/benchmark-comparison" element={<ProtectedRoute element={<PlaceholderPage title="Benchmark Comparison" />} user={user} loading={loading} />} />
        <Route path="/ai-recommendations" element={<ProtectedRoute element={<PlaceholderPage title="AI Recommendations" />} user={user} loading={loading} />} />
        <Route path="/report-download" element={<ProtectedRoute element={<PlaceholderPage title="Report Download" />} user={user} loading={loading} />} />

        {/* Dashboard Sub-modules */}
        <Route path="/progress-history" element={<ProtectedRoute element={<Dashboard />} user={user} loading={loading} />} />
        <Route path="/leaderboard" element={<ProtectedRoute element={<Dashboard />} user={user} loading={loading} />} />

        {/* About Module */}
        <Route path="/about" element={<ProtectedRoute element={<About />} user={user} loading={loading} />} />
        <Route path="/about/objective" element={<ProtectedRoute element={<About />} user={user} loading={loading} />} />
        <Route path="/about/features" element={<ProtectedRoute element={<About />} user={user} loading={loading} />} />
        <Route path="/about/contact" element={<ProtectedRoute element={<About />} user={user} loading={loading} />} />

      </Routes>
    </Layout>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setUser(null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <AppContent user={user} loading={loading} />
      </Router>
    </LanguageProvider>
  );
}

export default App;

