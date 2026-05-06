import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Globe, Presentation, Cpu, Zap, BarChart3, LineChart, ChevronRight, Search, Sparkles, Fingerprint, MessageSquare } from 'lucide-react';

// ─── Constants & Fonts ───────────────────────────────────────────────────────
const SAT    = '"Satoshi", system-ui, sans-serif';
const IS     = '"Instrument Serif", Georgia, serif';
const NIMBUS = '"TAN-NIMBUS", serif';
const GLASS  = '"glassure", serif';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [5000, 7000, 7000, 7000, 7000, 7000, 6000];
const TOTAL = DURATIONS.length;

// ─── Utility Components ──────────────────────────────────────────────────────
const KreoText = () => <span style={{ fontFamily: NIMBUS }} className="text-[#1B3FBF]">KREO</span>;
const KreoTextWhite = () => <span style={{ fontFamily: NIMBUS }} className="text-white">KREO</span>;
const MentraText = () => <span style={{ fontFamily: GLASS, fontStyle: 'italic' }} className="text-[#a78bfa]">Mentra</span>;
const KreonText = () => <span style={{ fontFamily: NIMBUS }} className="text-indigo-400">KREON</span>;

const ProgressStrip = ({ scene, progress, isDark }: { scene: number; progress: number; isDark: boolean }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-2 p-4">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className={`flex-1 h-[3px] rounded-full overflow-hidden backdrop-blur-md ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
        {i < scene && <div className={`h-full w-full ${isDark ? 'bg-white/70' : 'bg-black/70'}`} />}
        {i === scene && (
          <motion.div
            className={`h-full ${isDark ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
      </div>
    ))}
  </div>
);

const GridBg = ({ isDark }: { isDark?: boolean }) => (
  <div className={`absolute inset-0 ${isDark ? 'bg-[#06030A]' : 'bg-[#fafafa]'}`}>
    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] ${isDark ? 'opacity-20' : 'opacity-100'}`} />
    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

// ─── Typing Command Bar Component ────────────────────────────────────────────
const CommandBar = ({ prompt, isActive, isDark = false, icon: Icon = Search }: { prompt: string; isActive: boolean; isDark?: boolean; icon?: any }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setIsTypingComplete(false);
      return;
    }
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= prompt.length) {
          setDisplayedText(prompt.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [prompt, isActive]);

  return (
    <motion.div
      initial={{ scale: 1.1, y: 100, opacity: 0 }}
      animate={{ 
        scale: isTypingComplete ? 0.85 : 1.1, 
        y: isTypingComplete ? -140 : 0,
        opacity: 1
      }}
      transition={{ type: 'spring', stiffness: 70, damping: 20 }}
      className={`relative z-50 flex items-center gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl border shadow-2xl backdrop-blur-2xl w-[90%] max-w-3xl mx-auto
        ${isDark 
          ? (isTypingComplete ? 'bg-white/5 border-white/10' : 'bg-black/80 border-white/20') 
          : (isTypingComplete ? 'bg-white/40 border-white/20' : 'bg-white/90 border-black/10')}
      `}
    >
      <Icon className={isTypingComplete ? (isDark ? "text-white/30" : "text-black/30") : "text-[#1B3FBF]"} size={28} />
      <div className="flex-1">
        <p style={{ fontFamily: SAT }} className={`text-xl md:text-3xl font-medium tracking-tight ${isDark ? 'text-white' : 'text-black'} ${isTypingComplete && 'opacity-70'}`}>
          {displayedText}
          {!isTypingComplete && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>}
        </p>
      </div>
      {isTypingComplete && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1B3FBF]/20 to-purple-500/20 blur-xl -z-10" />
      )}
    </motion.div>
  );
};

// ─── Scenes ──────────────────────────────────────────────────────────────────

// Scene 0: Introduction
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <GridBg />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }} className="relative z-20 space-y-8 max-w-3xl">
      <h1 style={{ fontFamily: IS }} className="text-7xl md:text-[11vw] leading-[0.9] text-black tracking-tight drop-shadow-xl">
        The OS for <br/><span className="text-black/30 italic">ideas.</span>
      </h1>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-black/60 font-light leading-relaxed">
        From login to launch. Experience the <KreoText /> journey.
      </p>
    </motion.div>
  </div>
);

// Scene 1: The Interview (Login/Onboarding)
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Who are you, and what are you building?" isActive={true} isDark={true} icon={MessageSquare} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.5, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
             <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-white/80">Neural Initialization</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-lg">
            The <br/>Interview.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            There are no sign-up forms. <KreoTextWhite /> learns your intent through a conversational onboarding protocol.
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="w-full bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl p-6 space-y-6 backdrop-blur-2xl">
            {/* Mock Chat UI */}
            <div className="flex flex-col gap-4">
              <div className="self-start bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p style={{ fontFamily: SAT }} className="text-sm text-white/80">I am Kreo. What is the primary objective of your ecosystem?</p>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="self-end bg-[#1B3FBF] p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-lg">
                <p style={{ fontFamily: SAT }} className="text-sm text-white">I want to build a platform for digital architects.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5 }} className="self-start bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm max-w-[80%] flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 2: Kreon Identity
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Minting your neural identity card..." isActive={true} isDark={true} icon={Fingerprint} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.5, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
            <Fingerprint size={14} className="text-indigo-400" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Access Granted</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Your <br/><KreonText /> Card.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            Your identity is manifested as a dynamic glass card. You are now a resident of the neural workspace.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center perspective-[1000px]">
          {/* Mock Kreon Card */}
          <motion.div 
            animate={{ rotateY: [-10, 10, -10], rotateX: [5, -5, 5] }} 
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-64 h-96 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
            <div className="relative z-10 flex justify-between items-start">
               <Fingerprint className="text-white/40 w-8 h-8" />
               <span style={{ fontFamily: SAT }} className="text-[10px] uppercase tracking-widest text-white/40 font-bold border border-white/10 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="relative z-10">
               <p style={{ fontFamily: SAT }} className="text-[10px] text-white/50 uppercase tracking-[0.4em] mb-2">Resident</p>
               <h3 style={{ fontFamily: IS }} className="text-6xl text-white drop-shadow-lg leading-none">019</h3>
               <p style={{ fontFamily: SAT }} className="text-xs font-mono text-indigo-300 mt-4 bg-indigo-500/10 px-3 py-1.5 rounded-lg inline-block border border-indigo-500/20">ID: 0xKREO_A9F2</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 3: Deep Research (Mentra)
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Analyze market constraints for architect tools." isActive={true} isDark={true} icon={Globe} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
            <Globe size={14} className="text-purple-400" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-purple-200">Neural Search</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Context <br/>by <MentraText />.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            Crawling the live web to anchor your app in reality. No hallucinations, just hard data.
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="w-full bg-black/80 backdrop-blur-3xl rounded-3xl border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.1)] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                 <span style={{ fontFamily: SAT }} className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">Mentra_Terminal</span>
               </div>
               <Sparkles className="text-purple-400/50 w-4 h-4" />
            </div>
            <div className="space-y-4 pt-2">
              <p style={{ fontFamily: SAT }} className="text-xs text-white/50 font-mono">&gt; Spawning 5 parallel agents...</p>
              <p style={{ fontFamily: SAT }} className="text-xs text-white/50 font-mono">&gt; Analyzing 12 primary sources...</p>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 mt-4">
                <p style={{ fontFamily: SAT }} className="text-sm text-purple-100 italic">
                  "Architects require tools with zero-latency 3D rendering and collaborative capabilities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 4: Instant Apps
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={false} />
    <CommandBar prompt="Generate an architect collaboration dashboard." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 backdrop-blur-md">
            <Layout size={14} className="text-[#1B3FBF]" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-black/80">UI Synthesis</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black leading-[1.1] tracking-tight drop-shadow-sm">
            Instant <br/>Interface.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-black/60 font-light leading-relaxed">
            <KreoText /> writes the React, styles with Tailwind, and renders the application live based on Mentra's research.
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl">
            <div className="h-10 border-b border-black/5 flex items-center px-4 gap-2 bg-black/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 h-full">
              <div className="col-span-2 bg-blue-50/50 rounded-xl border border-blue-100 p-4 flex flex-col justify-between">
                <span style={{ fontFamily: SAT }} className="text-xs font-bold text-blue-900">Active Blueprint</span>
                <span style={{ fontFamily: IS }} className="text-4xl text-blue-600">Project Zenith</span>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-4">
                <BarChart3 className="text-gray-300 w-full h-full" />
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-4">
                <LineChart className="text-gray-300 w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 5: Presentations
const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={false} />
    <CommandBar prompt="Turn this concept into a 10-slide pitch deck." isActive={true} icon={Presentation} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 backdrop-blur-md">
            <Presentation size={14} className="text-blue-600" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-black/80">Slide Generation</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black leading-[1.1] tracking-tight drop-shadow-sm">
            Cinematic <br/>Presentations.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-black/60 font-light leading-relaxed">
            Ready to raise? <KreoText /> packages your application and research into editorial, export-ready slide decks.
          </p>
        </div>
        <div className="flex-1 w-full relative h-[300px] flex items-center justify-center">
          <div className="absolute w-[110%] aspect-video bg-white rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center justify-center p-8 z-30">
            <h3 style={{ fontFamily: IS }} className="text-5xl text-black">Project Zenith</h3>
            <p style={{ fontFamily: SAT }} className="text-sm text-black/40 mt-4 uppercase tracking-[0.2em]">The Future of Architecture</p>
          </div>
          <motion.div className="absolute w-[100%] aspect-video bg-gray-100 rounded-2xl shadow-lg border border-black/5 z-20 rotate-3 translate-x-4 translate-y-4" />
          <motion.div className="absolute w-[90%] aspect-video bg-gray-200 rounded-2xl shadow-md border border-black/5 z-10 rotate-6 translate-x-8 translate-y-8" />
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 6: Outro
const S6 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-[#06030A]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1B3FBF15_0%,transparent_60%)]" />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80 }} className="relative z-20 space-y-12">
      <div className="space-y-6">
        <h1 style={{ fontFamily: IS }}
          className="text-[12vw] md:text-[9vw] leading-[0.9] italic text-white tracking-tighter drop-shadow-2xl">
          Start <span className="text-white/40">building.</span>
        </h1>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-white/50 font-light max-w-lg mx-auto">
          One neural intent. Infinite possibilities.
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
          Enter <KreoText /> <ChevronRight size={16} />
        </a>
      </div>
    </motion.div>
  </div>
);

// ─── Scene registry ───────────────────────────────────────────────────────────
const SCENES = [S0, S1, S2, S3, S4, S5, S6];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function KreoShowcasePromo() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef<any>(null);

  const advance = () => {
    clearInterval(ref.current);
    setScene(p => (p + 1) % TOTAL);
    setProgress(0);
  };

  useEffect(() => {
    const dur = DURATIONS[scene];
    let elapsed = 0;
    ref.current = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / dur) * 100);
      if (elapsed >= dur) advance();
    }, 50);
    return () => clearInterval(ref.current);
  }, [scene]);

  const Scene = SCENES[scene];
  const isDark = scene === 1 || scene === 2 || scene === 3 || scene === 6;

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none transition-colors duration-1000 bg-[#fafafa]"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} isDark={isDark} />

      {/* Top Left Branding */}
      <div className="fixed top-8 left-8 z-[1000] flex items-center gap-3 pointer-events-none">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border ${isDark ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'}`}>
          <Cpu size={14} className={isDark ? 'text-white' : 'text-black'} />
        </div>
        <span style={{ fontFamily: SAT }} className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          <KreoText /> OS
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
