import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && window.location.pathname === '/login') {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all credentials.");
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
        toast.success("Account created successfully!");
        navigate("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Access authorized.");
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
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden bg-[#020512]">
      {/* Living background: Dynamic floating neural orbs and animated ambient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#0020C2]/20 to-purple-600/10 blur-[150px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#0020C2]/15 to-indigo-900/20 blur-[160px] animate-pulse" style={{ animationDuration: "16s" }} />
        {/* Subtle grid mesh overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", 
            backgroundSize: "32px 32px" 
          }} 
        />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Animated Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#0020C2]/20 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <h1 
              className="text-7xl md:text-8xl text-white tracking-tighter cursor-default relative select-none" 
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
            >
              KREO
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mt-3 select-none">
            {t.hero_sub || "Describe anything. KREO manifests it."}
          </p>
        </motion.div>

        {/* Elegant Glassmorphic Login Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Inner Glow Border Accent */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />

          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h2 className="text-xl font-serif italic text-white/90">
                {isSignUp ? "Create Architect Profile" : "Curator Authorization"}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-wider">
                <Shield className="w-2.5 h-2.5 text-yellow-400" /> Secure
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      disabled={loading}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="Corporate Email Address"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#0020C2] focus:ring-1 focus:ring-[#0020C2]/20 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  placeholder={t.auth_password || "Secure Access Key"}
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#0020C2] focus:ring-1 focus:ring-[#0020C2]/20 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-sm py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <Cpu className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    {isSignUp ? t.auth_signup || "Initialize Profile" : t.auth_signin || "Authorize Portal"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-white/20 text-[9px] font-black uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button
              onClick={handleGitHub}
              className="w-full rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 py-3.5 text-xs font-semibold text-white/80 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 fill-current text-white/95" aria-hidden="true" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Continue with GitHub Developer Account
            </button>

            <p className="text-center text-[11px] text-white/40 pt-2 select-none">
              {isSignUp ? t.auth_already_have || "Already have a profile?" : t.auth_dont_have || "New to the Studio?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white/80 underline underline-offset-4 hover:text-white transition-colors"
              >
                {isSignUp ? t.auth_signin || "Sign In" : t.auth_signup || "Create Account"}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Minimalist studio status tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white select-none pointer-events-none"
        >
          <Sparkles className="w-3 h-3 text-yellow-400" />
          KREO Studio Engine v2.05
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;
