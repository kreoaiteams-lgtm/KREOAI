import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Globe, Zap, Search, Activity } from 'lucide-react';

// ─── Font tokens ───────────────────────────────────────────────────────────────
const NIMBUS  = '"TAN-NIMBUS", serif';
const GLASS   = '"Glassure", "Instrument Serif", serif';
const SAT     = '"Satoshi", system-ui, sans-serif';

// ─── Scene durations ──────────────────────────────────────────────────────────
const DURATIONS = [4000, 4500, 5000, 5000, 4500, 5000];
const TOTAL = DURATIONS.length;

// ─── Progress strip ───────────────────────────────────────────────────────────
const ProgressStrip = ({ scene, progress }: { scene: number; progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-1 p-3">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/10">
        {i < scene && <div className="h-full w-full bg-white/50" />}
        {i === scene && (
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
      </div>
    ))}
  </div>
);

// ─── Shared label ────────────────────────────────────────────────────────────
const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p
    style={{ fontFamily: SAT }}
    className={`text-[9px] font-black uppercase tracking-[0.6em] ${light ? 'text-white/30' : 'text-black/25'}`}
  >
    {children}
  </p>
);

// ─── Scene 0 — KREO cold open ─────────────────────────────────────────────────
const S0 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#060606] flex items-center justify-center overflow-hidden">
      {/* ambient light */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 80%, #1B3FBF18 0%, transparent 70%)'
      }} />

      <AnimatePresence mode="wait">
        {phase < 2 ? (
          <motion.p
            key="eyebrow"
            style={{ fontFamily: SAT }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20"
          >
            The Architecture of Manifestation
          </motion.p>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6"
          >
            <h1 style={{ fontFamily: NIMBUS }}
              className="text-[18vw] leading-none text-white tracking-[-0.02em]"
            >
              KREO
            </h1>
            <p style={{ fontFamily: GLASS }}
              className="text-2xl md:text-3xl italic text-white/30 tracking-wide"
            >
              build your imagination.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Scene 1 — The friction ───────────────────────────────────────────────────
const S1 = () => (
  <div className="fixed inset-0 bg-white flex items-center justify-center px-12">
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl w-full space-y-10"
    >
      <Label>The Friction</Label>

      <h2 style={{ fontFamily: NIMBUS }}
        className="text-5xl md:text-7xl text-black leading-tight"
      >
        STATIC AI<br />
        <span className="text-black/15">IS BLIND.</span>
      </h2>

      <div className="space-y-4">
        {[
          'No live data. Research is manual.',
          'No competitive synthesis.',
          'No structured intelligence output.',
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="flex items-center gap-4"
          >
            <div className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
            <p style={{ fontFamily: SAT }} className="text-lg text-black/40 font-light">{t}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] border border-black/8"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-black/30 uppercase tracking-widest">Until now.</span>
      </motion.div>
    </motion.div>
  </div>
);

// ─── Scene 2 — MENTRA reveal ──────────────────────────────────────────────────
const S2 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{
      background: '#06030A'
    }}>
      {/* mesh gradient */}
      <div className="absolute inset-0" style={{
        backgroundImage: [
          'radial-gradient(circle at 15% 85%, #FF007A55 0%, transparent 45%)',
          'radial-gradient(circle at 85% 10%, #8A2BE260 0%, transparent 45%)',
          'radial-gradient(circle at 50% 50%, #C7158530 0%, transparent 60%)',
          'radial-gradient(circle at 80% 90%, #FF450040 0%, transparent 40%)',
        ].join(', ')
      }} />

      <div className="relative z-10 text-center space-y-6 px-8">
        <motion.p
          style={{ fontFamily: SAT }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black uppercase tracking-[0.8em] text-white/25"
        >
          Introducing
        </motion.p>

        <motion.h1
          style={{ fontFamily: NIMBUS }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[20vw] leading-none text-white tracking-[-0.01em]"
        >
          MENTRA
        </motion.h1>

        <AnimatePresence>
          {phase === 1 && (
            <motion.p
              style={{ fontFamily: GLASS }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl italic text-white/40 tracking-wide"
            >
              deep research. instant synthesis.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Scene 3 — Live research demo ────────────────────────────────────────────
const S3 = () => {
  const steps = [
    { label: 'Web Intelligence', status: 'done', icon: Globe },
    { label: 'Sarvam Neural Synthesis', status: 'done', icon: Zap },
    { label: 'Jina Context Engine', status: 'running', icon: Activity },
    { label: 'Manifest Generation', status: 'pending', icon: Search },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: '#06030A' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: [
          'radial-gradient(circle at 10% 90%, #FF007A40 0%, transparent 50%)',
          'radial-gradient(circle at 90% 5%, #8A2BE250 0%, transparent 50%)',
        ].join(', ')
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl px-8 space-y-6"
      >
        {/* Terminal window */}
        <div
          className="rounded-[2rem] overflow-hidden border border-white/8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(32px)',
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
            </div>
            <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-widest text-white/20">
              mentra_mission.active
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
            </div>
          </div>

          {/* Query */}
          <div className="px-8 py-6 border-b border-white/5">
            <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Mission Query</p>
            <h3 style={{ fontFamily: GLASS }} className="text-2xl italic text-white/80 leading-snug">
              Compare premium EV bikes in India 2025.
            </h3>
          </div>

          {/* Steps */}
          <div className="px-8 py-6 space-y-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all ${
                    step.status === 'done'
                      ? 'border-white/8 bg-white/[0.03]'
                      : step.status === 'running'
                      ? 'border-pink-400/30 bg-pink-400/5'
                      : 'border-white/3 opacity-30'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    step.status === 'done' ? 'bg-white/8' : step.status === 'running' ? 'bg-pink-400/20' : 'bg-white/3'
                  }`}>
                    <Icon size={13} className={
                      step.status === 'done' ? 'text-white/40' : step.status === 'running' ? 'text-pink-400' : 'text-white/10'
                    } />
                  </div>
                  <span style={{ fontFamily: SAT }} className={`text-[11px] font-black flex-1 ${
                    step.status === 'done' ? 'text-white/40' : step.status === 'running' ? 'text-white/80' : 'text-white/15'
                  }`}>
                    {step.label}
                  </span>
                  {step.status === 'done' && (
                    <span style={{ fontFamily: SAT }} className="text-[8px] font-black text-white/20 uppercase tracking-widest">✓</span>
                  )}
                  {step.status === 'running' && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }}
                      className="text-[8px] font-black text-pink-400" style={{ fontFamily: SAT }}
                    >
                      LIVE
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <p style={{ fontFamily: SAT }} className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
          Autonomous intelligence. Zero effort.
        </p>
      </motion.div>
    </div>
  );
};

// ─── Scene 4 — Synthesis output ───────────────────────────────────────────────
const S4 = () => (
  <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: '#06030A' }}>
    <div className="absolute inset-0" style={{
      backgroundImage: [
        'radial-gradient(circle at 5% 80%, #FF450045 0%, transparent 50%)',
        'radial-gradient(circle at 95% 20%, #8A2BE255 0%, transparent 50%)',
      ].join(', ')
    }} />

    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-2xl px-8 space-y-8"
    >
      <div className="text-center space-y-2">
        <Label light>Synthesis Complete</Label>
        <h2 style={{ fontFamily: NIMBUS }} className="text-5xl text-white">
          VERDICT RENDERED.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            name: 'ULTRAVIOLETTE F77',
            specs: ['307km range', '150 kmph', '₹3.8L'],
            verdict: 'Performance King'
          },
          {
            name: 'MATTER AERA',
            specs: ['150km range', 'Gearbox motor', '₹1.44L'],
            verdict: 'Value Champion'
          },
        ].map((opt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="p-6 rounded-[1.5rem] space-y-4 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}
          >
            <p style={{ fontFamily: NIMBUS }} className="text-sm text-white/70 leading-tight">{opt.name}</p>
            <div className="space-y-1.5">
              {opt.specs.map(s => (
                <p key={s} style={{ fontFamily: SAT }} className="text-[11px] text-white/40 font-light">{s}</p>
              ))}
            </div>
            <div className="pt-2 border-t border-white/5">
              <span style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-widest text-pink-400">{opt.verdict}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="p-6 rounded-[1.5rem] border border-white/8 text-center"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <p style={{ fontFamily: GLASS }} className="text-lg italic text-white/50">
          "For pure performance and range — Ultraviolette is undisputed."
        </p>
      </motion.div>
    </motion.div>
  </div>
);

// ─── Scene 5 — CTA ────────────────────────────────────────────────────────────
const S5 = () => (
  <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: '#06030A' }}>
    {/* Radiant mesh */}
    <div className="absolute inset-0" style={{
      backgroundImage: [
        'radial-gradient(circle at 20% 80%, #FF007A50 0%, transparent 50%)',
        'radial-gradient(circle at 80% 20%, #8A2BE265 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, #FF450025 0%, transparent 60%)',
      ].join(', ')
    }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 text-center px-8 space-y-12 max-w-2xl"
    >
      <div className="space-y-6">
        <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.8em] text-white/25">
          KREO + MENTRA
        </p>

        <h1 style={{ fontFamily: NIMBUS }}
          className="text-[14vw] leading-none text-white tracking-[-0.01em]"
        >
          UNCOVER.
        </h1>

        <p style={{ fontFamily: GLASS }}
          className="text-xl md:text-2xl italic text-white/40 tracking-wide"
        >
          stop searching. start knowing.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.a
          href="/webresearch"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{ fontFamily: SAT }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_60px_rgba(255,255,255,0.1)]"
        >
          Enter MENTRA <ChevronRight size={14} />
        </motion.a>

        <div style={{ fontFamily: SAT }} className="flex items-center gap-3 text-[9px] font-black text-white/15 uppercase tracking-widest">
          <span>kreoai.vercel.app</span>
          <div className="w-1 h-1 rounded-full bg-white/15" />
          <span>v4.2</span>
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
  const ref = useRef<any>(null);

  useEffect(() => {
    const dur = DURATIONS[scene];
    let elapsed = 0;
    const tick = 50;
    ref.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / dur) * 100);
      if (elapsed >= dur) {
        clearInterval(ref.current);
        setScene(p => (p + 1) % TOTAL);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(ref.current);
  }, [scene]);

  const SceneComp = SCENES[scene];

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      onClick={() => {
        clearInterval(ref.current);
        setScene(p => (p + 1) % TOTAL);
        setProgress(0);
      }}
    >
      <ProgressStrip scene={scene} progress={progress} />

      {/* Logo */}
      <div className="fixed top-8 left-8 z-[9999] flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
          <Zap size={12} className="text-white/60" />
        </div>
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30">KREO</span>
      </div>

      {/* Scene count */}
      <div className="fixed top-[2.3rem] right-8 z-[9999]">
        <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-white/15 uppercase tracking-widest">
          {scene + 1} / {TOTAL}
        </span>
      </div>

      {/* Tap to skip hint */}
      <div className="fixed bottom-8 right-8 z-[9999]">
        <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-white/15 uppercase tracking-[0.4em]">
          tap to advance
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full"
        >
          <SceneComp />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
