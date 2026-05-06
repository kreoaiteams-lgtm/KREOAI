import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Globe, Presentation, Cpu, Zap, ChevronRight, BarChart3, LineChart } from 'lucide-react';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [4000, 5000, 5000, 5000, 5000];
const TOTAL = DURATIONS.length;

const SAT = '"Satoshi", system-ui, sans-serif';
const IS  = '"Instrument Serif", Georgia, serif';

// ─── Progress bar strip ───────────────────────────────────────────────────────
const ProgressStrip = ({ scene, progress, isDark }: { scene: number; progress: number; isDark: boolean }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-1 p-3">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className={`flex-1 h-[2px] rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
        {i < scene && <div className={`h-full w-full ${isDark ? 'bg-white/40' : 'bg-black/40'}`} />}
        {i === scene && (
          <motion.div
            className={`h-full ${isDark ? 'bg-white' : 'bg-black'}`}
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
  <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-20' : 'opacity-100'}`} />
  </div>
);

// ─── Scene 0: Introduction ───────────────────────────────────────────────────
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-[#fafafa]">
    <GridBg />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }} className="relative z-20 max-w-2xl space-y-6">
      <div className="mx-auto w-16 h-16 bg-[#1B3FBF] rounded-2xl flex items-center justify-center shadow-2xl mb-8">
        <Zap className="text-white w-8 h-8" />
      </div>
      <h1 style={{ fontFamily: IS }}
        className="text-[12vw] md:text-[8vw] leading-none text-black tracking-tight">
        What can <span className="text-[#1B3FBF]">Kreo</span> do?
      </h1>
      <p style={{ fontFamily: SAT }} className="text-lg md:text-xl text-black/60 font-light max-w-lg mx-auto">
        A single neural engine capable of manifesting everything from raw data to full applications.
      </p>
    </motion.div>
  </div>
);

// ─── Scene 1: Instant Applications (Demo) ────────────────────────────────────
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden bg-white">
    <GridBg />
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90 }} className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5">
          <Layout size={14} className="text-[#1B3FBF]" />
          <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest">01 / Generation</span>
        </div>
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black leading-[1.1] tracking-tight">
          Instant <br/><span className="text-[#1B3FBF]">Applications.</span>
        </h2>
        <p style={{ fontFamily: SAT }} className="text-lg text-black/60 font-light leading-relaxed">
          Describe a dashboard, a SaaS tool, or a landing page. Kreo writes the React, styles it with Tailwind, and renders it live instantly.
        </p>
      </div>
      <div className="flex-1 w-full relative">
        {/* Fake Dashboard Demo UI */}
        <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden flex flex-col">
          <div className="h-10 border-b border-black/5 flex items-center px-4 gap-2 bg-black/[0.02]">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="p-6 grid grid-cols-2 gap-4 h-full">
            <div className="col-span-2 bg-blue-50/50 rounded-xl border border-blue-100 p-4 flex flex-col justify-between">
              <span style={{ fontFamily: SAT }} className="text-xs font-bold text-blue-900">Total Revenue</span>
              <span style={{ fontFamily: IS }} className="text-4xl text-blue-600">$124,500</span>
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
              <BarChart3 className="text-gray-300 w-12 h-12" />
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
              <LineChart className="text-gray-300 w-12 h-12" />
            </div>
          </div>
        </div>
        {/* Prompt popup */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="absolute -bottom-6 -left-6 bg-white border border-black/10 shadow-xl rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <Zap className="text-white w-4 h-4" />
          </div>
          <p style={{ fontFamily: SAT }} className="text-xs font-medium text-black">"Generate an analytics dashboard"</p>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 2: Deep Research (Mentra) ─────────────────────────────────────────
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden bg-[#06030A]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1B3FBF20_0%,transparent_60%)]" />
    <GridBg isDark={true} />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 90 }} className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
          <Globe size={14} className="text-white/60" />
          <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest text-white/60">02 / Mentra</span>
        </div>
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          Autonomous <br/><span className="text-white/40">Research.</span>
        </h2>
        <p style={{ fontFamily: SAT }} className="text-lg text-white/60 font-light leading-relaxed">
          Mentra crawls the live web, synthesizes dozens of sources, and renders complex verdicts instantly without hallucination.
        </p>
      </div>
      <div className="flex-1 w-full">
        <div className="w-full bg-black rounded-3xl border border-white/10 shadow-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span style={{ fontFamily: SAT }} className="text-[10px] font-mono text-white/40 uppercase">Terminal_Sync</span>
          </div>
          <div className="space-y-3 pt-2">
            <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-mono">> Scanning 12 sources for query...</p>
            <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-mono">> Cross-referencing data points...</p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
              <p style={{ fontFamily: SAT }} className="text-sm text-white/90 italic">"The consensus indicates a 40% efficiency gain in Q3."</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 3: Presentations ──────────────────────────────────────────────────
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden bg-[#fafafa]">
    <GridBg />
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90 }} className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5">
          <Presentation size={14} className="text-[#1B3FBF]" />
          <span style={{ fontFamily: SAT }} className="text-[10px] font-bold uppercase tracking-widest">03 / Pitch Decks</span>
        </div>
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black leading-[1.1] tracking-tight">
          Cinematic <br/><span className="text-[#1B3FBF]">Presentations.</span>
        </h2>
        <p style={{ fontFamily: SAT }} className="text-lg text-black/60 font-light leading-relaxed">
          Need a pitch deck? Kreo generates multi-slide HTML presentations with editorial typography, ready to export and share.
        </p>
      </div>
      <div className="flex-1 w-full relative">
        {/* Fake Slide Deck */}
        <div className="w-full aspect-video bg-white rounded-xl shadow-xl overflow-hidden border border-black/5 flex flex-col items-center justify-center text-center p-8 relative">
          <div className="absolute top-4 left-4 right-4 flex justify-between">
             <span style={{ fontFamily: SAT }} className="text-[8px] font-bold uppercase tracking-widest text-black/40">Slide 1 / 12</span>
             <span style={{ fontFamily: SAT }} className="text-[8px] font-bold uppercase tracking-widest text-black/40">Kreo Inc.</span>
          </div>
          <h3 style={{ fontFamily: IS }} className="text-4xl text-black">Q3 Strategy</h3>
          <p style={{ fontFamily: SAT }} className="text-sm text-black/40 mt-2">The path to orchestration.</p>
        </div>
        <motion.div className="absolute -right-4 top-1/2 -translate-y-1/2 w-full aspect-video bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-black/5 -z-10 rotate-3 scale-95" />
        <motion.div className="absolute -right-8 top-1/2 -translate-y-1/2 w-full aspect-video bg-white/20 backdrop-blur-sm rounded-xl shadow-md border border-black/5 -z-20 rotate-6 scale-90" />
      </div>
    </motion.div>
  </div>
);

// ─── Scene 4: Call to action ─────────────────────────────────────────────────
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff15_0%,transparent_60%)]" />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }} className="relative z-20 space-y-10">
      <div className="space-y-4">
        <h1 style={{ fontFamily: IS }}
          className="text-[12vw] md:text-[8vw] leading-[0.9] italic text-white tracking-tighter">
          Ready to <span className="text-white/40">create?</span>
        </h1>
        <p style={{ fontFamily: SAT }} className="text-lg md:text-xl text-white/50 font-light max-w-md mx-auto">
          Start manifesting your ideas instantly.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          Enter Kreo <ChevronRight size={14} />
        </a>
      </div>
    </motion.div>
  </div>
);

// ─── Scene registry ───────────────────────────────────────────────────────────
const SCENES = [S0, S1, S2, S3, S4];

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
  const isDark = scene === 2 || scene === 4;

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none cursor-pointer transition-colors duration-1000"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} isDark={isDark} />

      {/* Top Left Branding */}
      <div className="fixed top-8 left-8 z-[1000] flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
          <Cpu size={11} className={isDark ? 'text-white' : 'text-black'} />
        </div>
        <span style={{ fontFamily: SAT }} className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>KREO OS</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
