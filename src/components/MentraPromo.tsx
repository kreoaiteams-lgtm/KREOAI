import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, Zap, Globe } from 'lucide-react';
import { KreonCardVisual } from './KreonCard';

const SAT = '"Satoshi", system-ui, sans-serif';
const NIMBUS = '"TAN-NIMBUS", serif';
const GLASS = '"Glassure", "Instrument Serif", serif';

const IS = 'Instrument Serif, serif';

// ─── Durations ────────────────────────────────────────────────────────────────
const DURATIONS = [
  3500,  // 0 KREO title
  4500,  // 1 What KREO does
  5000,  // 2 Brand Kit demo
  5000,  // 3 Identity cards demo
  3500,  // 4 MENTRA title
  4500,  // 5 What MENTRA does
  5000,  // 6 Research demo
  5000,  // 7 CTA
];
const TOTAL = DURATIONS.length;

// ─── Progress ─────────────────────────────────────────────────────────────────
const ProgressBar = ({ scene, progress }: { scene: number; progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-1 p-2.5">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden bg-black/10">
        {i < scene && <div className="h-full w-full bg-[#1B3FBF]/50" />}
        {i === scene && (
          <motion.div className="h-full bg-[#1B3FBF]"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
        {i > scene && <div className="h-full w-full bg-transparent" />}
      </div>
    ))}
  </div>
);

// ─── KREO scenes (white bg, minimal) ─────────────────────────────────────────

// S0 — KREO title
const S0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-5">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.6em] text-black/20">
        Build your imagination
      </p>
      <h1 style={{ fontFamily: NIMBUS }} className="text-[18vw] leading-none text-black tracking-tight">
        KREO
      </h1>
      <p style={{ fontFamily: SAT }} className="text-lg text-black/30 font-light">
        Prompt to production. Instantly.
      </p>
    </motion.div>
  </div>
);

// S1 — What KREO does (Promo4 TextSlide style)
const S1 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
      className="max-w-xl w-full space-y-8">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/50">What KREO does</p>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-black tracking-tighter leading-tight">
        Describe it.<br /><span className="text-[#1B3FBF]">See it live.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-base text-black/35 font-light leading-relaxed">
        Type a prompt. KREO manifests a full visual artifact — dashboard, landing page, pitch deck — in seconds. Edit any element live, apply your brand kit, export instantly.
      </p>
      <div className="space-y-3">
        {['Brand Kit — persists across every artifact', 'Live Edit — click any element, re-prompt just that', 'Export — ZIP, PPTX, Canva in one click'].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
            className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0">
              <Check size={9} className="text-white" />
            </div>
            <span style={{ fontFamily: SAT }} className="text-[12px] text-black/50">{t}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// S2 — Brand Kit demo (from Promo 4 S7)
const S2 = () => (
  <div className="fixed inset-0 bg-[#F8F9FF] flex flex-col items-center justify-center px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full max-w-md flex flex-col items-center gap-6">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">Brand Kit · Always Active</p>
      <div className="w-full rounded-3xl bg-white border border-black/5 shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: '#1B3FBF', fontFamily: SAT }}>K</div>
            <div>
              <p style={{ fontFamily: SAT }} className="text-[11px] font-black">Brand Kit Active</p>
              <p style={{ fontFamily: SAT }} className="text-[9px] text-black/30">Persists across all sessions</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span style={{ fontFamily: SAT }} className="text-[9px] text-green-600 font-black">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['#1B3FBF', '#0020C2', '#F0F4FF', '#000000'].map((c, i) => (
            <div key={i} className="aspect-square rounded-xl border border-black/5 shadow-sm" style={{ background: c }} />
          ))}
        </div>
        <div className="h-[1px] bg-black/5" />
        <p style={{ fontFamily: SAT }} className="text-[9px] text-black/25 font-black uppercase tracking-[0.4em] text-center">↓ Applied to every artifact</p>
        <div className="grid grid-cols-3 gap-2">
          {['Dashboard', 'Landing', 'Pitch', 'Form', 'Portfolio', 'Report'].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
              className="py-2.5 rounded-xl text-white text-center text-[9px] font-black uppercase tracking-wide"
              style={{ background: '#1B3FBF', fontFamily: SAT }}>{v}</motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// S3 — Identity cards demo (from Promo 4 S3)
const CARDS = [
  { interest: 'tech' as const, name: 'DHRUV G.', num: '0012' },
  { interest: 'design' as const, name: 'ANYA M.', num: '0047' },
  { interest: 'art' as const, name: 'PRIYA S.', num: '0133' },
];
const S3 = () => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setVisible(i); if (i >= CARDS.length) clearInterval(t); }, 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-[#F8F9FF] flex flex-col items-center justify-center px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
        <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">KREON Identity</p>
        <div className="relative flex items-end justify-center" style={{ width: 260, height: 320 }}>
          {CARDS.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={i < visible ? { opacity: 1, y: i * -10, x: i * 6, zIndex: i } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              className="absolute"
              style={{ transformOrigin: 'bottom center', transform: `scale(0.75) rotate(${-6 + i * 6}deg)` }}
            >
              <KreonCardVisual cardNumber={card.num} userName={card.name} interest={card.interest} bio="KREO resident." />
            </motion.div>
          ))}
        </div>
        <p style={{ fontFamily: SAT }} className="text-[10px] text-black/30 font-black uppercase tracking-[0.4em] text-center">
          Your identity. Persists forever.
        </p>
      </motion.div>
    </div>
  );
};

// ─── MENTRA scenes (dark mesh bg) ─────────────────────────────────────────────

const MeshBg = ({ opacity = 'bg-black/30' }: { opacity?: string }) => (
  <>
    <div className="absolute inset-0" style={{
      background: '#06030A',
      backgroundImage: [
        'radial-gradient(circle at 15% 85%, #FF007A50 0%, transparent 45%)',
        'radial-gradient(circle at 85% 10%, #8A2BE260 0%, transparent 45%)',
        'radial-gradient(circle at 80% 90%, #FF450040 0%, transparent 40%)',
      ].join(', ')
    }} />
    <div className={`absolute inset-0 ${opacity}`} />
  </>
);

// S4 — MENTRA title
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <MeshBg />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
      className="relative z-10 space-y-5">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.6em] text-white/25">
        Intelligence Portal
      </p>
      <h1 style={{ fontFamily: GLASS }} className="text-[15vw] leading-none text-white tracking-wide">
        MENTRA
      </h1>
      <p style={{ fontFamily: SAT }} className="text-lg text-white/30 font-light">
        Deep research. Instant synthesis.
      </p>
    </motion.div>
  </div>
);

// S5 — What MENTRA does
const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
    <MeshBg opacity="bg-black/40" />
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
      className="relative z-10 max-w-xl w-full space-y-8">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25">What MENTRA does</p>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-white tracking-tighter leading-tight">
        Ask anything.<br /><span className="text-white/40">Get the truth.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-base text-white/35 font-light leading-relaxed">
        MENTRA scours the live web, synthesizes multiple sources, and delivers a structured, beautiful comparison — automatically. No tabs. No manual research.
      </p>
      <div className="space-y-3">
        {['Live web search via Jina Intelligence', 'Multi-source synthesis via Sarvam AI', 'Structured verdict rendered natively'].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
            className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Check size={9} className="text-white/60" />
            </div>
            <span style={{ fontFamily: SAT }} className="text-[12px] text-white/40">{t}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// S6 — Research terminal demo
const S6 = () => {
  const steps = [
    { label: 'Fetching live web data', done: true },
    { label: 'Synthesizing 8 sources', done: true },
    { label: 'Building comparison model', running: true },
    { label: 'Rendering verdict', pending: true },
  ];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden">
      <MeshBg opacity="bg-black/40" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md space-y-5">
        <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25 text-center">Live Mission · Active</p>
        <div className="rounded-3xl overflow-hidden border border-white/8 bg-white/[0.04] backdrop-blur-2xl">
          <div className="px-6 py-4 border-b border-white/5">
            <p style={{ fontFamily: IS }} className="text-xl italic text-white/70 leading-snug">
              Compare premium EV bikes in India 2025.
            </p>
          </div>
          <div className="px-6 py-5 space-y-3">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.18 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${step.running ? 'border-pink-500/30 bg-pink-500/5' : step.pending ? 'border-white/3 opacity-25' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${step.running ? 'bg-pink-400 animate-pulse' : step.done ? 'bg-white/30' : 'bg-white/10'}`} />
                <span style={{ fontFamily: SAT }} className={`text-[11px] font-black flex-1 ${step.running ? 'text-white/80' : step.done ? 'text-white/30' : 'text-white/15'}`}>
                  {step.label}
                </span>
                {step.done && <span style={{ fontFamily: SAT }} className="text-[8px] text-white/20 font-black">✓</span>}
                {step.running && (
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}
                    style={{ fontFamily: SAT }} className="text-[8px] font-black text-pink-400 uppercase tracking-widest">Live</motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// S7 — CTA
const S7 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <MeshBg opacity="bg-black/20" />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 space-y-10 max-w-xl">
      <div className="space-y-5">
        <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20">KREO + MENTRA</p>
        <div className="space-y-1">
          <h1 style={{ fontFamily: NIMBUS }} className="text-[13vw] leading-none text-white">KREO</h1>
          <h1 style={{ fontFamily: GLASS }} className="text-[11vw] leading-none text-white/50">MENTRA</h1>
        </div>
        <p style={{ fontFamily: SAT }} className="text-base text-white/30 font-light">Build it. Research it. Own it.</p>
      </div>
      <motion.a href="/" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        style={{ fontFamily: SAT }}
        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_60px_rgba(255,255,255,0.1)]">
        Enter KREO <ChevronRight size={14} />
      </motion.a>
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black text-white/15 uppercase tracking-widest">kreoai.vercel.app</p>
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
      if (elapsed >= dur) { clearInterval(ref.current); advance(); }
    }, 50);
    return () => clearInterval(ref.current);
  }, [scene]);

  const SceneComp = SCENES[scene];
  const isKreoScene = scene < 4;

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" onClick={advance}>
      {/* Progress — adapts colour per section */}
      <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-1 p-2.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`flex-1 h-[2px] rounded-full overflow-hidden ${isKreoScene ? 'bg-black/10' : 'bg-white/10'}`}>
            {i < scene && <div className={`h-full w-full ${isKreoScene ? 'bg-[#1B3FBF]/40' : 'bg-white/30'}`} />}
            {i === scene && (
              <motion.div className={`h-full ${isKreoScene ? 'bg-[#1B3FBF]' : 'bg-white'}`}
                initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: 'linear' }} />
            )}
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className="fixed top-7 left-8 z-[9999] flex items-center gap-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isKreoScene ? 'bg-black' : 'bg-white/10 border border-white/10'}`}>
          <Zap size={11} className={isKreoScene ? 'text-white' : 'text-white/60'} />
        </div>
        <span style={{ fontFamily: SAT }} className={`text-[9px] font-black uppercase tracking-[0.35em] ${isKreoScene ? 'text-black/30' : 'text-white/30'}`}>KREO</span>
      </div>

      {/* Counter */}
      <div className="fixed top-[1.9rem] right-8 z-[9999]">
        <span style={{ fontFamily: SAT }} className={`text-[9px] font-black uppercase tracking-widest ${isKreoScene ? 'text-black/15' : 'text-white/15'}`}>
          {scene + 1} / {TOTAL}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={scene}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} className="w-full h-full">
          <SceneComp />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
