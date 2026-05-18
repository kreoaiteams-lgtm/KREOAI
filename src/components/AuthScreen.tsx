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

          {/* Right Column: Stunning Mockup Dashboard Components (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 hidden lg:flex flex-col space-y-6"
          >
            {/* Mock Component 1: Bento Analytics Sparkline Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-44">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Studio Engine Feed</span>
                  <h3 className="text-md font-serif italic text-white/90">Project Manifestation Density</h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                  +18.4% Peak
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white tracking-tight">4,096 <span className="text-xs font-normal text-white/40">Tokens</span></p>
                  <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Standard Limit</p>
                </div>
                {/* SVG Mock Sparkline Chart */}
                <svg className="w-32 h-10 text-emerald-400" viewBox="0 0 100 30" fill="none">
                  <path d="M0 25 C10 20, 20 28, 30 15 C40 2, 50 18, 60 10 C70 2, 80 12, 90 2 C95 1, 100 5, 100 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M0 25 C10 20, 20 28, 30 15 C40 2, 50 18, 60 10 C70 2, 80 12, 90 2 C95 1, 100 5, 100 5 L100 30 L0 30 Z" fill="url(#sparkline-grad)" opacity="0.1" />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Mock Component 2: Bento CoWork Agent Task Card & User Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left card: CoWork Active status */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-44">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">CoWork Active</span>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-mono text-white/80 leading-relaxed truncate">
                    &gt; Refactored css variables...
                  </p>
                  <p className="text-xs font-mono text-white/50 leading-relaxed truncate">
                    &gt; Manifested 4 dynamic charts.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-white/30">
                  <span>Engine Steps: 12/12</span>
                  <span>1.2s latency</span>
                </div>
              </div>

              {/* Right card: Active Referrals progress card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-44">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Referral Level</span>
                    <h4 className="font-serif italic text-white/90">Gold Visionary</h4>
                  </div>
                  <Award className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-yellow-400" />
                  </div>
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-white/30">
                    <span>Silver</span>
                    <span>Gold (3/4)</span>
                  </div>
                </div>
                <p className="text-[9px] font-light text-white/50 leading-tight">
                  Next perk: Unlimited CoWork steps & Custom branding themes.
                </p>
              </div>
            </div>

            {/* Mock Component 3: Live Manifesto feed */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl p-6 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white/90">Interactive Bento Dashboard.html</p>
                  <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Generated via Sarvam-105b</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20" />
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
