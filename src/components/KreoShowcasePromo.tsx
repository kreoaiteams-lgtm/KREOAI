import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu, ArrowRight, User, Mail, Sparkles, Code2, Play } from 'lucide-react';

// ─── Constants & Fonts ───────────────────────────────────────────────────────
const SAT    = '"Satoshi", system-ui, sans-serif';
const IS     = '"Instrument Serif", Georgia, serif';
const NIMBUS = '"TAN-NIMBUS", serif';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [4000, 5000, 5000, 5000, 5000];
const TOTAL = DURATIONS.length;

const KreoText = () => <span style={{ fontFamily: NIMBUS }} className="text-[#1B3FBF]">KREO</span>;

// ─── Progress bar strip ───────────────────────────────────────────────────────
const ProgressStrip = ({ scene, progress }: { scene: number; progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-2 p-4">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-black/5 backdrop-blur-md">
        {i < scene && <div className="h-full w-full bg-black/20" />}
        {i === scene && (
          <motion.div
            className="h-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
      </div>
    ))}
  </div>
);

const GridBg = () => (
  <div className="absolute inset-0 bg-[#fafafa]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] to-transparent" />
  </div>
);

// ─── Scenes ──────────────────────────────────────────────────────────────────

// Scene 0: Intro
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <GridBg />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} className="relative z-20 space-y-6 max-w-2xl">
      <h1 style={{ fontFamily: IS }} className="text-6xl md:text-8xl leading-none text-black tracking-tight">
        The simplest way to build.
      </h1>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-black/60 font-light leading-relaxed">
        Let's walk through how you join <KreoText />.
      </p>
    </motion.div>
  </div>
);

// Scene 1: Login & Signup (Fixed Layout)
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden pt-12">
    <GridBg />
    <div className="relative z-20 flex flex-col items-center gap-10 w-full max-w-md">
      <div className="text-center">
        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: IS }} className="text-5xl md:text-6xl text-black">1. Connect</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: SAT }} className="text-lg text-black/50 mt-2">No passwords. Just pure access.</motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        className="w-full bg-white rounded-[2rem] border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-8 md:p-10 flex flex-col gap-8"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-[#1B3FBF]/10 rounded-2xl flex items-center justify-center mb-4">
            <Cpu className="text-[#1B3FBF] w-6 h-6" />
          </div>
          <h3 style={{ fontFamily: NIMBUS }} className="text-2xl text-black">Join KREO</h3>
          <p style={{ fontFamily: SAT }} className="text-sm text-black/50">Enter your email to receive a secure link.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 w-5 h-5" />
            <div className="w-full h-14 rounded-xl border border-black/10 bg-black/[0.02] flex items-center pl-12 pr-4 text-black/40 font-mono text-sm">
              hello@example.com
            </div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, repeat: Infinity, duration: 1 }}
              className="absolute left-[165px] top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1B3FBF]" 
            />
          </div>
          
          <motion.div 
            initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}
            className="w-full h-14 rounded-xl bg-[#1B3FBF] text-white flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-blue-800 transition-colors"
            style={{ fontFamily: SAT }}
          >
            Send Magic Link <ArrowRight w-4 h-4 />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
);

// Scene 2: Manifestation / Real App Cards
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden pt-12">
    <GridBg />
    <div className="relative z-20 flex flex-col items-center gap-10 w-full max-w-2xl">
      <div className="text-center">
        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: IS }} className="text-5xl md:text-6xl text-black">2. Manifest</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: SAT }} className="text-lg text-black/50 mt-2">Generate real artifacts instantly.</motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
        className="w-full flex flex-col gap-4"
      >
        {/* Real App Artifact Card 1 */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 style={{ fontFamily: SAT }} className="text-base font-bold text-black">SaaS Analytics Dashboard</h4>
                <p style={{ fontFamily: SAT }} className="text-xs text-black/50">React • Tailwind • Live</p>
              </div>
            </div>
            <span style={{ fontFamily: SAT }} className="text-xs font-medium text-black/40">Just now</span>
          </div>
          <div className="w-full h-24 bg-gray-50 rounded-xl border border-black/5 flex items-center justify-center relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
             <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-black/50 group-hover:text-blue-600 transition-colors">
                <Play className="w-4 h-4 ml-1" />
             </div>
          </div>
        </div>

        {/* Real App Artifact Card 2 */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="bg-white rounded-2xl border border-black/10 shadow-sm p-5 opacity-70">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 style={{ fontFamily: SAT }} className="text-base font-bold text-black">Competitor Research</h4>
                <p style={{ fontFamily: SAT }} className="text-xs text-black/50">Mentra OS • Data Synthesis</p>
              </div>
            </div>
            <span style={{ fontFamily: SAT }} className="text-xs font-medium text-black/40">2h ago</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

// Scene 3: The Card (Real Layout)
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden pt-12">
    <GridBg />
    <div className="relative z-20 flex flex-col items-center gap-10 w-full">
      <div className="text-center">
        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: IS }} className="text-5xl md:text-6xl text-black">3. Your Identity</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: SAT }} className="text-lg text-black/50 mt-2">Minting your Kreon card.</motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <div className="w-72 h-[420px] bg-black rounded-3xl shadow-2xl border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="space-y-2 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <Cpu className="text-white/40 w-6 h-6" />
              <span style={{ fontFamily: SAT }} className="text-[10px] uppercase tracking-widest border border-white/20 text-white/60 px-3 py-1 rounded-full font-bold">Active</span>
            </div>
            <p style={{ fontFamily: SAT }} className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Resident</p>
            <h3 style={{ fontFamily: IS }} className="text-7xl text-white leading-none">019</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-full h-px bg-white/20" />
            <div className="flex flex-col gap-1">
              <span style={{ fontFamily: SAT }} className="text-[10px] text-white/40 uppercase">Neural Hash</span>
              <span style={{ fontFamily: SAT }} className="text-sm font-mono text-white/80">0xKREO_A9F2</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// Scene 4: Outro
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden bg-white">
    <GridBg />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }} className="relative z-20 space-y-10">
      <div className="space-y-4">
        <h1 style={{ fontFamily: IS }}
          className="text-6xl md:text-8xl leading-[0.9] text-black tracking-tight">
          Welcome to <br/><KreoText />.
        </h1>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-black/50 font-light max-w-md mx-auto">
          Your workspace is ready.
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-10 py-4 bg-[#1B3FBF] text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl">
          Enter App <ChevronRight size={16} />
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

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none bg-[#fafafa] cursor-pointer"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} />

      <div className="fixed top-6 left-6 z-[1000] flex items-center gap-2 pointer-events-none">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-black border border-black/10">
          <Cpu size={14} className="text-white" />
        </div>
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
          <KreoText /> 
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
