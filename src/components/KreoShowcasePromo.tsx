import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Globe, Presentation, Cpu, Zap, BarChart3, LineChart, ChevronRight, Search, Sparkles, Palette } from 'lucide-react';

// ─── Constants & Fonts ───────────────────────────────────────────────────────
const SAT    = '"Satoshi", system-ui, sans-serif';
const IS     = '"Instrument Serif", Georgia, serif';
const NIMBUS = '"TAN-NIMBUS", serif';
const GLASS  = '"glassure", serif';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
// Total 7 scenes. We give them 7-8 seconds each so the typing animation has time.
const DURATIONS = [5000, 7000, 7000, 7000, 7000, 7000, 6000];
const TOTAL = DURATIONS.length;

// ─── Utility Components ──────────────────────────────────────────────────────
const KreoText = () => <span style={{ fontFamily: NIMBUS }} className="text-[#1B3FBF]">KREO</span>;
const MentraText = () => <span style={{ fontFamily: GLASS, fontStyle: 'italic' }} className="text-[#a78bfa]">Mentra</span>;

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
const CommandBar = ({ prompt, isActive }: { prompt: string; isActive: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setIsTypingComplete(false);
      return;
    }
    let i = 0;
    // Delay start slightly
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= prompt.length) {
          setDisplayedText(prompt.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 40); // typing speed
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [prompt, isActive]);

  return (
    <motion.div
      initial={{ scale: 1.1, y: 100, opacity: 0 }}
      animate={{ 
        scale: isTypingComplete ? 0.85 : 1.1, 
        y: isTypingComplete ? -120 : 0,
        opacity: 1
      }}
      transition={{ type: 'spring', stiffness: 70, damping: 20 }}
      className={`relative z-50 flex items-center gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl border shadow-2xl backdrop-blur-2xl w-[90%] max-w-3xl mx-auto
        ${isTypingComplete ? 'bg-white/10 border-white/20' : 'bg-white/80 border-black/10'}`}
    >
      <Search className={isTypingComplete ? "text-white/50" : "text-[#1B3FBF]"} size={28} />
      <div className="flex-1">
        <p style={{ fontFamily: SAT }} className={`text-xl md:text-3xl font-medium tracking-tight ${isTypingComplete ? 'text-white/80' : 'text-black'}`}>
          {displayedText}
          {!isTypingComplete && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>}
        </p>
      </div>
      {isTypingComplete && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10" />
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
      <h1 style={{ fontFamily: IS }} className="text-7xl md:text-9xl leading-[0.9] text-black tracking-tight drop-shadow-xl">
        The OS for <br/><span className="text-black/30 italic">ideas.</span>
      </h1>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-black/60 font-light leading-relaxed">
        Watch how <KreoText /> turns a single thought into a complete ecosystem.
      </p>
    </motion.div>
  </div>
);

// Scene 1: Instant Apps
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Build a dark mode SaaS dashboard with revenue charts." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <Layout size={14} className="text-[#1B3FBF]" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-white/80">Application Synthesis</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Instant <br/>Interface.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            <KreoText /> writes the React, styles with Tailwind, and renders live. Zero configuration required.
          </p>
        </div>
        <div className="flex-1">
          <div className="w-full aspect-[4/3] bg-[#0a0a0a] rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl">
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 h-full">
              <div className="col-span-2 bg-blue-900/20 rounded-2xl border border-blue-500/30 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                <span style={{ fontFamily: SAT }} className="text-xs font-bold text-blue-400">Total Revenue</span>
                <span style={{ fontFamily: IS }} className="text-5xl text-white mt-2">$124,500</span>
              </div>
              <div className="bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-6">
                <BarChart3 className="text-white/30 w-full h-full" />
              </div>
              <div className="bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-6">
                <LineChart className="text-white/30 w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 2: Deep Research
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Research our top 3 competitors and synthesize trends." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 3.0, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row-reverse gap-8">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
            <Globe size={14} className="text-purple-400" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-purple-200">Neural Search</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-lg">
            Deep Context <br/>with <MentraText />.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            Crawling the live web to anchor your app in reality. No hallucinations, just hard data.
          </p>
        </div>
        <div className="flex-1">
          <div className="w-full bg-black/80 backdrop-blur-3xl rounded-3xl border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.1)] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                 <span style={{ fontFamily: SAT }} className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">Mentra_Sync</span>
               </div>
               <Sparkles className="text-purple-400/50 w-4 h-4" />
            </div>
            <div className="space-y-4 pt-2">
              <p style={{ fontFamily: SAT }} className="text-xs text-white/50 font-mono">&gt; Spawning 5 parallel agents...</p>
              <p style={{ fontFamily: SAT }} className="text-xs text-white/50 font-mono">&gt; Analyzing competitor pricing models...</p>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 mt-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <p style={{ fontFamily: SAT }} className="text-sm text-purple-100 italic relative z-10">
                  "Market consensus indicates a 40% shift towards usage-based billing in Q3."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 3: Visual Identity
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={false} />
    <CommandBar prompt="Design a premium brand kit with typography." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 backdrop-blur-md">
            <Palette size={14} className="text-pink-500" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-black/80">Aesthetic Engine</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black leading-[1.1] tracking-tight drop-shadow-sm">
            Visual <br/>Identity.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-black/60 font-light leading-relaxed">
            <KreoText /> establishes your design system, choosing color palettes and typefaces that evoke the right emotion.
          </p>
        </div>
        <div className="flex-1">
          <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col gap-6">
             <div className="flex gap-4 h-1/2">
                <div className="flex-1 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl shadow-inner flex items-end p-4">
                  <span style={{ fontFamily: SAT }} className="text-white/80 text-xs font-mono">#EC4899</span>
                </div>
                <div className="flex-1 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-inner flex items-end p-4">
                  <span style={{ fontFamily: SAT }} className="text-white/50 text-xs font-mono">#312E81</span>
                </div>
             </div>
             <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col justify-center">
                <span style={{ fontFamily: SAT }} className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Primary Typeface</span>
                <span style={{ fontFamily: NIMBUS }} className="text-4xl text-black">TAN-NIMBUS</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 4: Presentations
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={false} />
    <CommandBar prompt="Turn this context into a 10-slide pitch deck." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
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
          {/* Stacked Cards */}
          <div className="absolute w-[110%] aspect-video bg-white rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center justify-center p-8 z-30">
            <h3 style={{ fontFamily: IS }} className="text-5xl text-black">Q3 Strategy</h3>
            <p style={{ fontFamily: SAT }} className="text-sm text-black/40 mt-4 uppercase tracking-[0.2em]">The Path Forward</p>
          </div>
          <motion.div className="absolute w-[100%] aspect-video bg-gray-100 rounded-2xl shadow-lg border border-black/5 z-20 rotate-3 translate-x-4 translate-y-4" />
          <motion.div className="absolute w-[90%] aspect-video bg-gray-200 rounded-2xl shadow-md border border-black/5 z-10 rotate-6 translate-x-8 translate-y-8" />
        </div>
      </div>
    </motion.div>
  </div>
);

// Scene 5: Kreon Cards
const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <GridBg isDark={true} />
    <CommandBar prompt="Manifest my Kreon Identity Card." isActive={true} />
    
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }} 
      animate={{ opacity: 1, y: 40, scale: 1 }} 
      transition={{ delay: 2.8, type: 'spring', stiffness: 80 }}
      className="absolute z-10 w-[90%] max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <Cpu size={14} className="text-blue-400" />
            <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Neural Signature</span>
          </div>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight drop-shadow-sm">
            Kreon <br/>Identity.
          </h2>
          <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
            Forge your neural signature. Your unique Kreon Card grants access to the ecosystem and persists your creations.
          </p>
        </div>
        <div className="flex-1 w-full relative h-[350px] flex items-center justify-center">
          {/* Fake Kreon Card */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-[260px] h-[380px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-[0_20px_60px_rgba(27,63,191,0.4)] flex flex-col p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#1B3FBF]/50 to-transparent blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl -z-10 rounded-full" />
            
            <div className="flex justify-between items-start">
              <span style={{ fontFamily: NIMBUS }} className="text-white text-2xl tracking-widest">KREON</span>
              <span style={{ fontFamily: SAT }} className="text-white/40 font-mono text-[10px]">NO. 0042</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-inner relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20" />
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                   <Cpu className="text-white/80 w-8 h-8" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pb-2">
              <p style={{ fontFamily: SAT }} className="text-[9px] uppercase tracking-[0.3em] text-white/50">Authorized Resident</p>
              <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#1B3FBF]" />
                <div className="w-1/3 h-full bg-blue-400" />
                <div className="w-1/3 h-full bg-indigo-300" />
              </div>
            </div>
          </motion.div>
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
          One prompt. Infinite possibilities with <KreoText />.
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
          Enter Portal <ChevronRight size={16} />
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
  const isDark = scene === 1 || scene === 2 || scene === 5 || scene === 6;

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
