import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Zap, Globe, Search, Activity, Cpu } from 'lucide-react';
import { KreonCardVisual } from './KreonCard';

// ─── Font tokens ───────────────────────────────────────────────────────────────
const NIMBUS  = '"TAN-NIMBUS", serif';
const GLASS   = '"Glassure", "Instrument Serif", serif';
const SAT     = '"Satoshi", system-ui, sans-serif';
const IS      = 'Instrument Serif, serif';

// ─── Scene durations ──────────────────────────────────────────────────────────
const DURATIONS = [3000, 4500, 4500, 4500, 3000, 4500, 4500, 5000];
const TOTAL = DURATIONS.length;

// ─── Progress Strip ───────────────────────────────────────────────────────────
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

// ─── Shared Components ────────────────────────────────────────────────────────

const MeshBg = () => (
  <div className="absolute inset-0" style={{
    background: '#06030A',
    backgroundImage: [
      'radial-gradient(circle at 15% 85%, #FF007A30 0%, transparent 45%)',
      'radial-gradient(circle at 85% 10%, #8A2BE240 0%, transparent 45%)',
      'radial-gradient(circle at 50% 50%, #C7158520 0%, transparent 60%)',
      'radial-gradient(circle at 80% 90%, #FF450030 0%, transparent 40%)',
    ].join(', ')
  }} />
);

// ─── KREO Scenes (Minimal White) ──────────────────────────────────────────────

const S0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
      <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.6em] text-black/20">The Manifestation Engine</p>
      <h1 style={{ fontFamily: NIMBUS }} className="text-[18vw] leading-none text-black tracking-[-0.02em]">KREO</h1>
    </motion.div>
  </div>
);

const S1 = () => {
  const cards = [
    { interest: 'tech' as const, name: 'DHRUV G.', num: '0012' },
    { interest: 'design' as const, name: 'ANYA M.', num: '0047' },
    { interest: 'art' as const, name: 'PRIYA S.', num: '0133' },
  ];
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
           <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">01 / Identity</p>
           <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-black tracking-tighter">Your presence <span className="text-[#1B3FBF]">persists.</span></h2>
        </div>
        <div className="relative flex items-end justify-center h-64 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: i * -10, x: i * 8, rotate: -6 + i * 6 }}
              transition={{ delay: 0.3 + i * 0.2, type: 'spring' }}
              className="absolute"
              style={{ transformOrigin: 'bottom center', transform: 'scale(0.7)' }}
            >
              <KreonCardVisual cardNumber={card.num} userName={card.name} interest={card.interest} bio="KREO resident." />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const S2 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full flex flex-col items-center gap-10">
      <div className="text-center space-y-4">
         <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">02 / Brand Kit</p>
         <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-black tracking-tighter">Automatic <span className="text-[#1B3FBF]">DNA.</span></h2>
      </div>
      <div className="w-full rounded-[2.5rem] bg-white border border-black/5 shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#1B3FBF] text-white flex items-center justify-center font-bold">K</div>
             <span style={{ fontFamily: SAT }} className="text-xs font-bold uppercase tracking-widest opacity-40">Active_Kit</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
             <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-green-600 uppercase tracking-widest">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['#1B3FBF', '#0020C2', '#F6F9FC', '#000000'].map(c => (
            <div key={c} className="aspect-square rounded-xl border border-black/5" style={{ background: c }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Landing', 'Manifesto'].map(t => (
            <div key={t} style={{ fontFamily: SAT }} className="py-3 rounded-xl bg-[#1B3FBF] text-white text-[9px] font-black uppercase tracking-widest text-center">{t}</div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

const S3 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full flex flex-col items-center gap-10 text-center">
       <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">03 / Live Edit</p>
       <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-black tracking-tighter leading-tight">
          Click any element.<br /><span className="text-[#1B3FBF]">Change your reality.</span>
       </h2>
       <div className="w-full p-6 rounded-3xl bg-black/[0.02] border border-black/5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm flex items-center gap-2">
                <Zap size={14} className="text-[#1B3FBF]" />
                <span style={{ fontFamily: SAT }} className="text-xs font-bold">"Make this bold"</span>
             </div>
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                <Cpu size={16} className="text-black/20" />
             </motion.div>
          </div>
          <p style={{ fontFamily: SAT }} className="text-[9px] font-bold text-black/20 uppercase tracking-[0.3em]">Orchestrating local mutation...</p>
       </div>
    </motion.div>
  </div>
);

// ─── MENTRA Scenes (Editorial Dark) ───────────────────────────────────────────

const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <MeshBg />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative z-10 space-y-4">
      <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Deep Intelligence Portal</p>
      <h1 style={{ fontFamily: GLASS }} className="text-[16vw] leading-none text-white tracking-widest">MENTRA</h1>
    </motion.div>
  </div>
);

const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <MeshBg />
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-xl w-full flex flex-col items-center gap-10">
      <div className="text-center space-y-4">
         <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">04 / Research</p>
         <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-white tracking-tighter">Autonomous <span className="text-white/40">knowledge.</span></h2>
      </div>
      <div className="w-full rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
           <div className="flex items-center gap-3">
              <Globe size={16} className="text-white/40" />
              <span style={{ fontFamily: SAT }} className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live_Mission</span>
           </div>
           <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
        </div>
        <div className="space-y-3">
          {['Fetching web context', 'Analyzing 8 sources', 'Synthesizing verdict'].map((t, i) => (
            <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }} className="flex items-center gap-3">
              <Check size={12} className="text-white/40" />
              <span style={{ fontFamily: SAT }} className="text-xs text-white/60 font-light">{t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

const S6 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <MeshBg />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-10">
       <div className="text-center space-y-4">
          <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">05 / Synthesis</p>
          <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-white tracking-tighter leading-tight">Verdict Rendered.</h2>
       </div>
       <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4">
             <p style={{ fontFamily: SAT }} className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Option A</p>
             <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-light italic">"Premium engineering. High entry price. Unmatched range."</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4">
             <p style={{ fontFamily: SAT }} className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Option B</p>
             <p style={{ fontFamily: SAT }} className="text-xs text-white/60 font-light italic">"Value centric. Minimal design. Urban optimized."</p>
          </div>
       </div>
    </motion.div>
  </div>
);

const S7 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-30"><MeshBg /></div>
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 space-y-12">
      <div className="space-y-2">
         <h1 style={{ fontFamily: NIMBUS }} className="text-[12vw] leading-none text-white tracking-tight">KREO</h1>
         <h1 style={{ fontFamily: GLASS }} className="text-[10vw] leading-none text-white/40 tracking-widest">MENTRA</h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
          Enter Portal <ChevronRight size={14} />
        </a>
        <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-white/20 uppercase tracking-widest">kreoai.vercel.app</span>
      </div>
    </motion.div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const SCENES = [S0, S1, S2, S3, S4, S5, S6, S7];

export default function MentraPromo() {
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
      if (elapsed >= dur) { advance(); }
    }, 50);
    return () => clearInterval(ref.current);
  }, [scene]);

  const isDark = scene >= 4;

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-white transition-colors duration-1000" onClick={advance}>
      <ProgressStrip scene={scene} progress={progress} isDark={isDark} />
      
      {/* Branding */}
      <div className="fixed top-8 left-12 z-[1000] flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black'}`}>
          <Zap size={11} className="text-white" />
        </div>
        <span style={{ fontFamily: SAT }} className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>KREO</span>
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
          <SceneComp />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SceneComp = ({ scene }: { scene: number }) => {
  const Scene = SCENES[scene];
  return <Scene />;
};
