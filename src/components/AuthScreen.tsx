import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import SplashScreen from "./SplashScreen";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLang();

  useEffect(() => {
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
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Screen Container with the scattered 3D shapes background image */}
      <div 
        className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#fbfbfc]"
        style={{
          backgroundImage: "url('/ChatGPT Image May 18, 2026, 04_26_23 PM.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        
        {/* Soft overlay to ensure great accessibility under different screens */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Floating Interactive Card exactly matching the mockup */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100/80 flex flex-col justify-center items-stretch min-h-[520px] relative z-10"
        >
          {/* Header block with Tan Nimbus lowercase logo font */}
          <div className="text-center mb-6">
            <h2 
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }} 
              className="text-5xl text-slate-900 tracking-tight text-center lowercase mb-2.5 select-none"
            >
              kreo
            </h2>
            <p className="text-xs text-slate-400 font-medium font-sans">
              {isSignUp ? "Sign up to begin building custom campaigns" : "Sign in to continue to your workspace"}
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5"
                >
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400">
                      <User className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      disabled={loading}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Email address</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-xs select-none">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 font-sans">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-[#0047ff] focus:ring-[#0047ff]/20 w-4 h-4 accent-[#0047ff]" 
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-[#0047ff] hover:text-blue-700 font-semibold transition-colors font-sans">
                Forgot password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#0047ff] text-white hover:bg-blue-700 font-semibold text-sm py-3.5 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-blue-500/10 disabled:opacity-50 font-sans"
              >
                {loading ? (
                  <Cpu className="w-4.5 h-4.5 animate-spin text-white" />
                ) : (
                  isSignUp ? "Sign up" : "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-[1px] bg-slate-100 flex-1" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans select-none">
              or continue with
            </span>
            <div className="h-[1px] bg-slate-100 flex-1" />
          </div>

          {/* Social Sign-In (GitHub Only) */}
          <div className="font-sans">
            <button
              type="button"
              onClick={handleGitHub}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition-all duration-200"
            >
              <svg className="h-4.5 w-4.5 fill-current text-slate-900" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Bottom Switch Link */}
          <p className="text-center text-xs text-slate-400 select-none font-medium mt-8">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#0047ff] font-bold hover:underline transition-all"
            >
              {isSignUp ? "Sign In" : "Sign up"}
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AuthScreen;
