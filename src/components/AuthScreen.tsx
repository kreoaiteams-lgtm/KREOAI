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

      {/* Injecting Local TAN-NIMBUS font-face cleanly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'TAN NIMBUS';
          src: url('/TAN-Nimbus/TAN-NIMBUS.woff2') format('woff2'),
               url('/TAN-Nimbus/TAN-NIMBUS.woff') format('woff'),
               url('/TAN-Nimbus/TAN-NIMBUS.ttf') format('truetype'),
               url('/TAN-Nimbus/TAN-NIMBUS.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      ` }} />

      {/* Screen Container with scattered 3D shapes background image */}
      <div 
        className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#fbfbfc]"
        style={{
          backgroundImage: "url('/ChatGPT Image May 18, 2026, 04_26_23 PM.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Cozy Unified Flex Layout to reduce empty gap in the center */}
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 px-4">
          
          {/* Left Column: Kreo tan nimbus title & welcome back text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left select-none lg:pr-6 lg:-translate-y-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 
                className="text-8xl md:text-[9.5rem] font-normal leading-none tracking-tight text-[#0047ff]"
                style={{ fontFamily: "'TAN NIMBUS', 'Calistoga', serif" }}
              >
                KREO
              </h1>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-6 font-sans uppercase">
                WELCOME BACK
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-semibold mt-2 max-w-xs font-sans uppercase">
                LET'S CREATE SOMETHING AMAZING TODAY.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Floating login card positioned closely */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100/85 flex flex-col justify-center items-stretch min-h-[520px]"
            >
              {/* Header block */}
              <div className="text-center mb-8 font-sans">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {isSignUp ? "Create your workspace" : "Welcome to Kreo"}
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">
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
                          className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500/80 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
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
                      className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500/80 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
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
                      className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500/80 focus:bg-white focus:ring-2 focus:ring-blue-500/5 transition-all duration-200"
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

              {/* Social Sign-In (Google & GitHub) */}
              <div className="flex gap-3 font-sans">
                {/* Google Button */}
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-200"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.114 3.018-1 4.02l3.07 2.38c1.8-1.66 2.98-4.11 2.98-7.25z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.07-2.38c-.9.6-2.04.97-3.32.97-2.55 0-4.72-1.73-5.49-4.05H1.05v2.47C3.03 21.93 7.27 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.51 15.63c-.2-.6-.31-1.24-.31-1.9s.11-1.3.31-1.9V9.36H1.05C.38 10.71 0 12.31 0 14s.38 3.29 1.05 4.64l5.46-4.01z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.03 2.07 1.05 6.09l5.46 4.26c.77-2.32 2.94-4.6 5.49-4.6z"
                    />
                  </svg>
                  Google
                </button>

                {/* GitHub Button */}
                <button
                  type="button"
                  onClick={handleGitHub}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-200"
                >
                  <svg className="h-4 w-4 fill-current text-slate-900" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Bottom Switch Link */}
              <p className="text-center text-xs text-slate-400 select-none font-medium mt-8 font-sans">
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
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
