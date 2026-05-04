import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, Globe, Sparkles, ShieldCheck, Search, Activity, Cpu } from 'lucide-react';

// ─── Font Helpers ─────────────────────────────────────────────────────────────
const IS = 'Instrument Serif, serif';
const SAT = 'Satoshi, sans-serif';

// ─── Scene Durations ──────────────────────────────────────────────────────────
const SCENE_DURATION = [
  3000,  // 0  KREO Intro
  3500,  // 1  The Problem
  3500,  // 2  Introducing MENTRA
  4500,  // 3  Mentra Live Demo
  3500,  // 4  Synthesis
  4500,  // 5  Final CTA
];
const TOTAL = SCENE_DURATION.length;

// ─── Components ──────────────────────────────────────────────────────────────

const ProgressDots = ({ current, total, progress }: { current: number; total: number; progress: number }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="relative w-8 h-1 bg-black/10 rounded-full overflow-hidden">
        {i === current && (
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[#1B3FBF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        )}
        {i < current && <div className="absolute inset-0 bg-[#1B3FBF]/40" />}
      </div>
    ))}
  </div>
);

const MentraBadge = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
  >
    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
    <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-white uppercase tracking-[0.3em]">mentra_intelligence</span>
  </motion.div>
);

// ─── Scenes ──────────────────────────────────────────────────────────────────

const S0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
      <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.6em] text-[#1B3FBF]">The Architecture of Manifestation</p>
      <h1 style={{ fontFamily: IS }} className="text-7xl md:text-[10vw] italic text-black tracking-tighter leading-none">KREO.</h1>
      <p style={{ fontFamily: SAT }} className="text-lg text-black/30 font-light max-w-md mx-auto">Build your imagination. From prompt to production in seconds.</p>
    </motion.div>
  </div>
);

const S1 = () => (
  <div className="fixed inset-0 bg-[#F8F9FF] flex flex-col items-center justify-center px-8 text-center">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 max-w-2xl">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">The Friction</p>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black tracking-tighter leading-tight">
        Static AI is <span className="text-[#1B3FBF]">limiting.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-lg text-black/40 font-light">
        General LLMs lack live context. Research is manual. Synthesis is slow.
      </p>
      <div className="flex justify-center gap-4 opacity-30">
        {['No Live Data', 'No Competitive Analysis', 'No Real-world Context'].map(f => (
          <div key={f} style={{ fontFamily: SAT }} className="px-4 py-2 border border-black/10 rounded-xl text-[10px] font-black uppercase tracking-widest">{f}</div>
        ))}
      </div>
    </motion.div>
  </div>
);

const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 mentra-mesh overflow-hidden">
    <div className="absolute inset-0 bg-black/20" />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-8">
      <MentraBadge />
      <h1 style={{ fontFamily: IS }} className="text-7xl md:text-[12vw] italic text-white tracking-tighter leading-none brand-font">MENTRA.</h1>
      <p style={{ fontFamily: SAT }} className="text-xl text-white/60 font-light max-w-lg mx-auto">Introducing the high-fidelity intelligence portal. Deep research, synthesized instantly.</p>
    </motion.div>
  </div>
);

const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 mentra-mesh overflow-hidden">
    <div className="absolute inset-0 bg-black/40" />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl space-y-6">
      <div className="glass-card p-1 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
        <div className="bg-black/20 p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
             <div className="flex items-center gap-2">
                <Search size={14} className="text-white/40" />
                <span style={{ fontFamily: SAT }} className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active_Mission</span>
             </div>
             <div className="flex items-center gap-2">
                <span style={{ fontFamily: SAT }} className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Syncing...</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
             </div>
          </div>
          <div className="space-y-4">
             <h3 style={{ fontFamily: IS }} className="text-3xl italic text-white leading-tight">Compare premium EV bikes in India 2025.</h3>
             <div className="h-px bg-white/5 w-full" />
             <div className="flex gap-3">
                {['Live Search', 'Sarvam Synthesis', 'Jina Intelligence'].map((t, i) => (
                  <motion.div 
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-black text-white/40 uppercase tracking-widest"
                  >
                    {t}
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
      <p style={{ fontFamily: SAT }} className="text-center text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Autonomous research node powered by Mentra Intelligence</p>
    </motion.div>
  </div>
);

const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 mentra-mesh overflow-hidden">
    <div className="absolute inset-0 bg-black/40" />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-2xl text-center space-y-12">
       <div className="flex flex-col items-center space-y-4">
          <MentraBadge />
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white tracking-tighter leading-tight">
            Synthesis <span className="opacity-40">Complete.</span>
          </h2>
       </div>
       <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-8 border border-white/10 text-left space-y-4">
             <p style={{ fontFamily: SAT }} className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Ultraviolet UV F77</p>
             <div className="h-px bg-white/5" />
             <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-light">307km range. 150kmph top speed. Precision engineering.</p>
          </div>
          <div className="glass-card p-8 border border-white/10 text-left space-y-4">
             <p style={{ fontFamily: SAT }} className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Matter Aera</p>
             <div className="h-px bg-white/5" />
             <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-light">Manual gearbox. Liquid cooled motor. Tech-first soul.</p>
          </div>
       </div>
       <p style={{ fontFamily: SAT }} className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">Structured comparison ready for manifestation</p>
    </motion.div>
  </div>
);

const S5 = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <div className="absolute inset-0 mentra-mesh opacity-30" />
    <motion.div 
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
      className="space-y-12 max-w-2xl relative z-10"
    >
      <div className="space-y-4">
        <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">The Future of Research</p>
        <h1 style={{ fontFamily: IS }} className="text-7xl md:text-9xl italic text-white tracking-tighter leading-none">
          Stop searching.<br /><span className="text-[#1B3FBF]">Start uncovering.</span>
        </h1>
        <p style={{ fontFamily: SAT }} className="text-lg text-white/30 font-light leading-relaxed max-w-md mx-auto">
          KREO with MENTRA Intelligence. The ultimate duo for high-fidelity research and manifestation.
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
          Enter the Portal <ChevronRight size={14} />
        </a>
        <div className="flex items-center gap-4 opacity-20">
           <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-white uppercase tracking-widest">KREO_V4.2</span>
           <div className="w-1 h-1 rounded-full bg-white" />
           <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-white uppercase tracking-widest">MENTRA_CORE</span>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const SCENES = [S0, S1, S2, S3, S4, S5];

export default function MentraPromo() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;
    intervalRef.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(intervalRef.current);
        setScene(p => (p + 1) % TOTAL);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(intervalRef.current);
  }, [scene]);

  const SceneComp = SCENES[scene];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-white">
      {/* Progress */}
      <ProgressDots current={scene} total={TOTAL} progress={progress} />

      {/* Logo */}
      <div className="fixed top-8 left-12 z-[1000] flex items-center gap-3">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Zap size={11} className="text-white" />
        </div>
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">KREO</span>
      </div>

      {/* Scene counter */}
      <div className="fixed top-8 right-12 z-[1000]">
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-black/20 uppercase tracking-widest">{scene + 1} / {TOTAL}</span>
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full"
        >
          <SceneComp />
        </motion.div>
      </AnimatePresence>

      {/* Floating UI elements for atmospheric depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ repeat: Infinity, duration: 20 }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-[#1B3FBF] rounded-full blur-[100px]"
         />
         <motion.div 
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 40, 0],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ repeat: Infinity, duration: 25 }}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#1B3FBF] rounded-full blur-[120px]"
         />
      </div>
    </div>
  );
}
