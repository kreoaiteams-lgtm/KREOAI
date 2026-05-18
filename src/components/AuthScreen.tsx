import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Cpu, Zap, Activity, ChevronRight, Award } from "lucide-react";
import SplashScreen from "./SplashScreen";

const CYCLE_WORDS = [
  "PPT PRESENTATIONS",
  "EXCEL SHEETS",
  "BENTO DASHBOARDS",
  "LANDING PAGES",
  "CAMPAIGN CHARTS",
  "NEURAL WEBSITES",
  "COWORK PROTOCOLS"
];

const AuthScreen = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [cycleIndex, setCycleIndex] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Only show splash once per session
    const hasSeenSplash = sessionStorage.getItem("kreo_login_splash_seen");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && window.location.pathname === '/login') {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSplashComplete = () => {
    sessionStorage.setItem("kreo_login_splash_seen", "true");
    setShowSplash(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    
    try {
      if (isSignUp) {
        if (!fullName) throw new Error("Full name is required for registration");
        const { error } = await supabase.auth.signUp({ 
          email, 
          password, 
          options: {
            data: {
              full_name: fullName
            }
          }
        });
        if (error) throw error;
        toast.success("Account created! Welcome to KREO.");
        navigate("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back to KREO!");
        navigate("/onboarding");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "GitHub login failed");
    }
  };

  return (
    <>
      {/* Global Splash Screen Playback */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0020C2] via-[#1B3FBF] to-[#0a184e]">
        {/* Shifting radial glowing lights to give vibrant and energetic backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400/25 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[130px]" />
          
          {/* Futuristic grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none" 
            style={{ 
              backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)", 
              backgroundSize: "40px 40px" 
            }} 
          />
        </div>

        {/* Main Split-Screen Workspace */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean, Bright, Crisp Glassmorphic Authorization Card (6 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            {/* Title / Branding */}
            <div className="flex flex-col items-start">
              <h1 
                className="text-6xl text-white tracking-tighter cursor-default font-bold uppercase select-none leading-none" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                KREO
              </h1>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mt-3 select-none flex flex-wrap items-center gap-x-2 gap-y-1 min-h-[1.5rem]">
                <span>BUILD ANYTHING:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cycleIndex}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="text-yellow-400 font-extrabold tracking-[0.3em] inline-block"
                  >
                    {CYCLE_WORDS[cycleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Bright Glassmorphic Card Container */}
            <div className="w-full bg-white border border-white/40 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative overflow-hidden text-slate-800">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h2 className="text-xl font-serif italic text-[#0020C2] font-semibold">
                    {isSignUp ? "Register Curator" : "Curator Access"}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#0020C2] text-[9px] font-black uppercase tracking-wider">
                    <Shield className="w-3 h-3 text-yellow-500" /> Active
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {isSignUp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative"
                      >
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          disabled={loading}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#0020C2] focus:ring-1 focus:ring-[#0020C2]/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Account Email"
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#0020C2] focus:ring-1 focus:ring-[#0020C2]/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder={t.auth_password || "Studio Security Key"}
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#0020C2] focus:ring-1 focus:ring-[#0020C2]/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#0020C2] text-white hover:bg-[#0020C2]/90 font-semibold text-sm py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#0020C2]/10 disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <Cpu className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        {isSignUp ? t.auth_signup || "Join Studio" : t.auth_signin || "Authorize Profile"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[9px] font-black uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <button
                  onClick={handleGitHub}
                  className="w-full rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 py-3.5 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 fill-current text-slate-800" aria-hidden="true" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Sign in with GitHub Dev Key
                </button>

                <p className="text-center text-[11px] text-slate-400 pt-1 select-none font-medium">
                  {isSignUp ? t.auth_already_have || "Already registered?" : t.auth_dont_have || "New to the Studio?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[#0020C2] font-semibold underline underline-offset-4 hover:text-[#0020C2]/85 transition-colors"
                  >
                    {isSignUp ? t.auth_signin || "Sign In" : t.auth_signup || "Create Profile"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium "What you can do" Bubble Showcase (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 hidden lg:flex flex-col justify-center items-center"
          >
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl flex flex-col justify-between items-center text-center space-y-10 min-h-[500px]">
              {/* Header Badge */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-[0.3em]">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  What you can build
                </div>
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tighter"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic" }}
                >
                  What you can do<br />
                  with <span className="text-yellow-400">KREO.</span>
                </h2>
              </div>

              {/* Bubbles / Capsules Grid */}
              <div className="flex flex-wrap justify-center gap-3.5 max-w-lg">
                {[
                  { name: "Pitch Decks" },
                  { name: "SaaS Dashboards" },
                  { name: "Landing Pages" },
                  { name: "Brand Toolkits" },
                  { name: "Flowcharts" },
                  { name: "Study Visuals" },
                  { name: "Financial Reports" },
                  { name: "Mobile App UIs" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/85 hover:text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm cursor-default flex items-center gap-2 select-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse" />
                    {item.name}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Caption */}
              <div className="space-y-2">
                <div className="h-[1px] w-12 bg-white/20 mx-auto" />
                <p 
                  className="text-white/30 text-[9px] uppercase tracking-[0.4em]"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  And so much more.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
