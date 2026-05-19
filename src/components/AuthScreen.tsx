import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Eye, EyeOff } from "lucide-react";
import SplashScreen from "./SplashScreen";

const VisualIllustration = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth - 0.5) * 35;
      const y = (e.clientY / clientHeight - 0.5) * 35;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[360px] md:h-full min-h-[380px] md:min-h-0 bg-[#eef1f6] rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 select-none">
      {/* Dynamic light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#d5e0ee] via-[#f3f6fa] to-[#e6edf5]" />
      
      {/* 3D Shapes Group with Parallax */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Shape 1: Deep Blue Glossy Sphere */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[12%] w-36 h-36 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.4),10px_20px_40px_rgba(37,99,235,0.25)]"
        />

        {/* Shape 2: Golden Yellow Striped Sphere */}
        <motion.div 
          animate={{ y: [0, 8, 0], rotate: [0, 360] }}
          transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 45, repeat: Infinity, ease: "linear" } }}
          className="absolute left-[8%] top-[10%] w-32 h-32 rounded-full overflow-hidden shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.35),10px_15px_35px_rgba(217,119,6,0.2)]"
          style={{
            background: "repeating-linear-gradient(45deg, #d97706, #d97706 14px, #fbbf24 14px, #fbbf24 28px)"
          }}
        />

        {/* Shape 3: Soft Purple Torus/Blob */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[5%] bottom-[15%] w-24 h-28 rounded-full bg-gradient-to-br from-purple-300 via-purple-500 to-indigo-700 shadow-[inset_-8px_-8px_25px_rgba(0,0,0,0.35),5px_15px_30px_rgba(109,40,217,0.2)]"
        />

        {/* Shape 4: Soft Golden Blob */}
        <motion.div 
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute left-[12%] bottom-[12%] w-24 h-28 rounded-[40%_60%_70%_30%_/_50%_45%_55%_50%] bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 shadow-[inset_-6px_-6px_20px_rgba(0,0,0,0.35),5px_15px_25px_rgba(217,119,6,0.25)]"
        />

        {/* Shape 5: Blue Pyramid/Cone */}
        <motion.div 
          animate={{ y: [0, 8, 0], rotate: [12, 22, 12] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[35%] bottom-[5%] w-16 h-20 shadow-[10px_15px_30px_rgba(30,58,138,0.2)]"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
          }}
        />

        {/* Shape 6: Cute Purple Monster Flower (Centerpiece) */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 4, -4, 0]
          }}
          transition={{ 
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.06 }}
          className="relative z-10 w-48 h-48 flex items-center justify-center filter drop-shadow-[15px_25px_30px_rgba(107,33,168,0.3)] cursor-pointer"
        >
          {/* Custom SVG Flower Ridges */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_50s_linear_infinite]">
            <defs>
              <radialGradient id="flowerGrad" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="40%" stopColor="#8b5cf6" />
                <stop offset="85%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#4c1d95" />
              </radialGradient>
            </defs>
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={i}
                d="M 100 100 C 65 15, 135 15, 100 100"
                fill="url(#flowerGrad)"
                transform={`rotate(${i * 22.5} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="52" fill="url(#flowerGrad)" />
          </svg>

          {/* Cute Face */}
          <div className="relative z-20 flex flex-col items-center justify-center space-y-2.5 mt-2">
            <div className="flex gap-4">
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                className="w-3.5 h-6 bg-slate-950 rounded-full origin-center"
              />
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.1 }}
                className="w-3.5 h-6 bg-slate-950 rounded-full origin-center"
              />
            </div>
            <div className="w-4 h-4 bg-slate-950 rounded-full" />
          </div>
        </motion.div>

        {/* Shape 7: Glass Bubbles */}
        {[
          { top: "8%", left: "42%", size: 30 },
          { top: "58%", left: "12%", size: 24 },
          { bottom: "22%", right: "22%", size: 40 }
        ].map((bubble, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -15, 0],
              x: [0, 8, 0]
            }}
            transition={{ 
              duration: 4.5 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.4
            }}
            className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-[1.5px] shadow-[inset_1px_1px_6px_rgba(255,255,255,0.4),2px_4px_10px_rgba(0,0,0,0.05)]"
            style={{
              top: bubble.top,
              left: bubble.left,
              bottom: bubble.bottom,
              right: bubble.right,
              width: bubble.size,
              height: bubble.size
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

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

      <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#e5e5e5] py-12 px-4 md:px-6 relative">
        
        {/* Top Header pill exactly like 'alexkyr.com' banner */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-200/50 hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-white text-[9px] font-black uppercase overflow-hidden">
            <span className="scale-125">👤</span>
          </div>
          <span className="text-[11px] font-bold text-slate-700 tracking-wide font-sans">kreo-ai.vercel.app</span>
        </motion.div>

        {/* Master Light-Themed Unified Container Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-4xl bg-white rounded-[3rem] p-6 md:p-8 shadow-2xl shadow-slate-300/40 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[580px] border border-slate-100 relative"
        >
          {/* Left Column: Stunning, Quirky CSS 3D Illustration Panel */}
          <VisualIllustration />

          {/* Right Column: Clean, Elegant, High-Contrast Light-Themed Login Form */}
          <div className="p-4 md:p-8 flex flex-col justify-between h-full min-h-[460px] md:min-h-0 space-y-8">
            
            {/* Logo / Header block */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold select-none text-xs">
                <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-[11px]">
                  💻
                </div>
                <span className="font-sans font-black tracking-wider text-[11px] uppercase">KREO</span>
              </div>

              {/* Title / Welcome back */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-sans">
                  {isSignUp ? "Join Studio!" : "Welcome Back!"}
                </h2>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1.5">
                  Enter Your Details Below
                </p>
              </div>
            </div>

            {/* Inputs & Form Area */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1.5"
                  >
                    <label className="text-[9px] uppercase font-black tracking-wider text-slate-400 block">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Alex Kyr"
                        disabled={loading}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent border-b border-slate-200 focus:border-slate-900 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-colors duration-300"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-wider text-slate-400 block">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="hello.alex@gmail.com"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 focus:border-slate-900 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-wider text-slate-400 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Studio Security Key"
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 focus:border-slate-900 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-colors duration-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Extra checkmark details */}
              <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium select-none">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 accent-slate-900" 
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:text-slate-700 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Primary Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm py-4 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-slate-900/10 disabled:opacity-50"
                >
                  {loading ? (
                    <Cpu className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      {isSignUp ? "Sign Up" : "Log in"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleGitHub}
                  className="w-full rounded-full bg-[#f4f4f4] hover:bg-[#eaeaea] text-slate-700 font-bold text-xs py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 border border-slate-100 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg className="h-4.5 w-4.5 fill-current text-slate-800" aria-hidden="true" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Log in with GitHub Dev Key
                </button>
              </div>
            </form>

            {/* Bottom Toggle switch */}
            <p className="text-center text-xs text-slate-400 select-none font-medium">
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
