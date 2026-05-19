import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";
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

      <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#d9e4f6] via-[#f0f4fa] to-[#cfdff4] py-12 px-4 md:px-6 relative">
        
        {/* Master Light-Themed Unified Container Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl bg-white rounded-[3rem] p-4 md:p-6 shadow-2xl shadow-slate-400/30 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center min-h-[640px] border border-white/60 relative"
        >
          {/* Left Column: Stunning static illustration aligned to the left side */}
          <div className="relative w-full h-[360px] md:h-full min-h-[380px] md:min-h-0 bg-[#eef1f6] rounded-[2.5rem] overflow-hidden flex items-center justify-start select-none shadow-inner border border-slate-100">
            {/* KREO logo overlay in TAN-NIMBUS font shifted significantly down and scaled up */}

             <img 
              src="/chatgpt-image.png" 
              alt="Kreo Illustration" 
              className="w-full h-full object-cover" 
              style={{ transform: "scale(1.35)", transformOrigin: "25% 65%" }}
            />
          </div>

          {/* Right Column: High-Trust, Premium, Secure Login Form */}
          <div className="p-4 md:p-8 flex flex-col justify-between h-full min-h-[460px] md:min-h-0 space-y-8">
            
            {/* Logo / Header block */}
            <div className="space-y-6">

              {/* Title / Welcome back */}
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mt-2">
                  Please enter your details to continue
                </p>
              </div>
            </div>

            {/* Inputs & Form Area */}
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
                    <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block ml-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Alex Kyr"
                        disabled={loading}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl py-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 font-medium"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block ml-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="hello.alex@gmail.com"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl py-3.5 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block ml-1">Studio Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password..."
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Extra checkmark details */}
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold select-none pt-1 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4 accent-slate-900 cursor-pointer" 
                  />
                  <span className="group-hover:text-slate-800 transition-colors">Remember me</span>
                </label>
                <button type="button" className="hover:text-slate-900 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Primary Buttons */}
              <div className="space-y-4 pt-4 flex flex-col items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm py-4 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-xl shadow-slate-900/20 disabled:opacity-50"
                >
                  {loading ? (
                    <Cpu className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      {isSignUp ? "Create Secure Account" : "Access Studio"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <div className="relative w-full flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative bg-white px-4 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Or Continue With
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGitHub}
                  className="w-auto mx-auto px-6 py-3 rounded-2xl bg-[#f4f4f4] hover:bg-[#eaeaea] text-slate-700 font-bold text-xs flex items-center justify-center gap-2.5 transition-all duration-200 border border-slate-200 hover:border-slate-300 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg className="h-5 w-5 fill-current text-slate-800" aria-hidden="true" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub Developer
                </button>
              </div>
            </form>

            {/* Bottom Toggle switch */}
            <p className="text-center text-xs text-slate-500 select-none font-medium mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-slate-900 font-bold underline underline-offset-4 hover:text-slate-700 transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthScreen;
