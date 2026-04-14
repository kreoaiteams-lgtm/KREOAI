import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from './Hello (apple).json';

/* ─────────────────────────────────────────────────────────────────
   KREO PROMO 5 — "Build your imagination."
   Fonts: Satoshi (body/UI), Instrument Sans (headlines), TAN-NIMBUS (KREO/KREON only)
   
   SCENE ARC:
   0 — Splash        "Hello KREO" Lottie + confetti reveal
   1 — Campaign      "Build your imagination." — big, lush, minimal
   2 — Feeling       Emotional resonance — the 4AM wall
   3 — Resolution    "Only one canvas." — KREO as the answer
   4 — KREON         What is a KREON? — identity + soul
   5 — Your Card     Pick your discipline — stacked card fanout
   6 — Finale        CTA
─────────────────────────────────────────────────────────────────── */

const SATOSHI = "'Satoshi', sans-serif";
const INSTRUMENT = "'Instrument Sans', sans-serif";
const TAN = "'TAN-NIMBUS', sans-serif";

const SCENE_DURATION = [3800, 6000, 7000, 5500, 7000, 6000, 5000];
const TOTAL_SCENES = SCENE_DURATION.length;

/* ─── Shared: tiny floating blob ─── */
const Blob = ({ color, size, x, y, delay = 0, shape = 'circle' }: {
  color: string; size: number; x: string; y: string; delay?: number; shape?: 'circle' | 'square' | 'star' | 'triangle';
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{ delay, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 1 }}
  >
    {shape === 'circle' && (
      <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />
    )}
    {shape === 'square' && (
      <div style={{ width: size, height: size, borderRadius: size * 0.2, background: color, transform: 'rotate(15deg)' }} />
    )}
    {shape === 'star' && (
      <svg width={size} height={size} viewBox="0 0 60 60">
        <path d="M30 4L34 22L52 26L34 30L30 48L26 30L8 26L26 22Z" fill={color} />
      </svg>
    )}
    {shape === 'triangle' && (
      <svg width={size} height={size} viewBox="0 0 60 60">
        <polygon points="30,6 56,54 4,54" fill={color} />
      </svg>
    )}
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────────
   SCENE 0: Splash — "Hello KREO" Lottie
─────────────────────────────────────────────────────────────────── */
const SceneSplash = () => {
  const [phase, setPhase] = useState<'lottie' | 'reveal' | 'out'>('lottie');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1600);
    const t2 = setTimeout(() => setPhase('out'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1B3FBF] overflow-hidden">
      {/* Confetti particles on reveal */}
      {phase !== 'lottie' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(32)].map((_, i) => {
            const colors = ['#facc15', '#fff', '#ec4899', '#22c55e', '#c084fc', '#f97316'];
            const s = Math.random() * 0.6 + 0.3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], y: Math.random() * 500 + 100, x: (Math.random() - 0.5) * 200, scale: s, rotate: Math.random() * 360 }}
                transition={{ duration: 2.5, delay: Math.random() * 0.4, ease: 'easeOut' }}
                style={{ position: 'absolute', left: Math.random() * 100 + '%', top: '-5%', width: 8, height: 8, borderRadius: i % 2 === 0 ? '50%' : 2, background: colors[i % colors.length] }}
              />
            );
          })}
        </div>
      )}

      {/* Lottie */}
      <motion.div
        style={{ filter: 'brightness(0) invert(1)' }}
        animate={{ 
          scale: phase === 'reveal' ? 0.55 : 1,
          y: phase === 'reveal' ? -80 : 0,
          opacity: phase === 'out' ? 0 : 1,
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-[480px] h-[480px] relative z-10"
      >
        <Lottie animationData={animationData} loop={false} className="w-full h-full" />
      </motion.div>

      {/* KREO reveal */}
      <motion.div
        className="absolute flex flex-col items-center"
        animate={{ opacity: phase === 'reveal' || phase === 'out' ? 1 : 0, y: phase === 'reveal' || phase === 'out' ? 0 : 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[18vw] font-bold text-white leading-none tracking-tighter" style={{ fontFamily: TAN }}>KREO</span>
        <span className="text-[9px] font-black tracking-[0.7em] uppercase text-white/30 mt-3" style={{ fontFamily: SATOSHI }}>Studio Engaged</span>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE 1: Campaign — "Build your imagination."
─────────────────────────────────────────────────────────────────── */
const Scene1 = () => (
  <div className="fixed inset-0 bg-[#f5f5f3] flex flex-col items-center justify-center overflow-hidden">
    {/* Playful blobs */}
    <Blob color="#3b82f6" size={56} x="7%" y="12%" shape="circle" delay={0} />
    <Blob color="#f97316" size={42} x="84%" y="9%" shape="square" delay={0.3} />
    <Blob color="#c084fc" size={36} x="5%" y="74%" shape="triangle" delay={0.5} />
    <Blob color="#facc15" size={52} x="86%" y="68%" shape="star" delay={0.2} />
    <Blob color="#22c55e" size={30} x="48%" y="88%" shape="circle" delay={0.7} />
    <Blob color="#ec4899" size={26} x="20%" y="18%" shape="square" delay={0.4} />
    <Blob color="#14b8a6" size={34} x="76%" y="34%" shape="circle" delay={0.6} />

    <div className="relative z-10 text-center px-6 flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-6"
        style={{ fontFamily: SATOSHI }}
      >
        KREO Campaign 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[11vw] sm:text-[8vw] font-black text-black tracking-tighter leading-[0.9] mb-3"
        style={{ fontFamily: INSTRUMENT }}
      >
        Build your
      </motion.h1>
      
      <motion.h1
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[11vw] sm:text-[8vw] font-black tracking-tighter leading-[0.9] text-[#1B3FBF]"
        style={{ fontFamily: TAN }}
      >
        imagination.
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 h-px w-32 bg-black/15 origin-left"
      />

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="mt-5 text-base text-black/40 font-medium max-w-sm leading-relaxed"
        style={{ fontFamily: SATOSHI }}
      >
        The neural engine that turns your ideas into reality — in seconds.
      </motion.p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   SCENE 2: Feeling — Emotional resonance
─────────────────────────────────────────────────────────────────── */
const FEELINGS = [
  { label: 'The pitch is tomorrow.', sub: 'The deck doesn\'t exist yet.', color: '#3b82f6', shape: 'circle' as const },
  { label: 'The idea is there.', sub: 'The visuals aren\'t.', color: '#c084fc', shape: 'square' as const },
  { label: 'The exam is at 9 AM.', sub: 'You can\'t read anymore.', color: '#f97316', shape: 'triangle' as const },
  { label: 'They need to understand.', sub: 'Words aren\'t enough.', color: '#22c55e', shape: 'circle' as const },
];

const Scene2 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Background large soft blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1B3FBF]/5 blur-[100px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#f97316]/8 blur-[80px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-center text-[10px] font-black tracking-[0.5em] uppercase text-[#1B3FBF] mb-6"
          style={{ fontFamily: SATOSHI }}
        >
          We all know this feeling
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-4xl md:text-6xl font-black text-black tracking-tighter leading-tight mb-12"
          style={{ fontFamily: INSTRUMENT }}
        >
          The wall you hit<br/>at the worst time.
        </motion.h2>

        <div className="grid grid-cols-2 gap-4">
          {FEELINGS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={show ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[22px] p-7 relative overflow-hidden"
              style={{ background: f.color }}
            >
              <div className="absolute -bottom-4 -right-4 opacity-20">
                <Blob color="white" size={80} x="0" y="0" shape={f.shape} delay={i * 0.2} />
              </div>
              <p className="text-white font-black text-lg leading-tight mb-2" style={{ fontFamily: INSTRUMENT }}>{f.label}</p>
              <p className="text-white/65 font-medium text-sm" style={{ fontFamily: SATOSHI }}>{f.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE 3: Resolution — "Only one canvas."
─────────────────────────────────────────────────────────────────── */
const Scene3 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#1B3FBF]/5 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="text-center max-w-2xl relative z-10"
          >
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-black/20 mb-8" style={{ fontFamily: SATOSHI }}>
              So many problems
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none" style={{ fontFamily: INSTRUMENT }}>
              but only one
              <br />
              <motion.span
                className="text-[#1B3FBF]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
                style={{ fontFamily: TAN }}
              >
                solution.
              </motion.span>
            </h2>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-center max-w-3xl relative z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20vw] sm:text-[14vw] leading-none font-bold tracking-tighter text-[#1B3FBF] mb-6"
              style={{ fontFamily: TAN }}
            >
              KREO
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl font-medium text-black/50 leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: SATOSHI }}
            >
              A neural canvas engine. Any idea, any format —
              <br />
              produced in seconds, not hours.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE 4: What is a KREON? — Identity reveal
─────────────────────────────────────────────────────────────────── */
const Scene4 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center px-8 overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-white/5 blur-[100px]" />
        <Blob color="rgba(250,204,21,0.2)" size={60} x="10%" y="10%" shape="star" delay={0} />
        <Blob color="rgba(255,255,255,0.08)" size={44} x="82%" y="76%" shape="square" delay={0.3} />
        <Blob color="rgba(192,132,252,0.15)" size={38} x="78%" y="12%" shape="circle" delay={0.5} />
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="q"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            <p className="text-white/30 text-[10px] font-black tracking-[0.5em] uppercase mb-8" style={{ fontFamily: SATOSHI }}>
              Identity Protocol
            </p>
            <h2 className="text-[18vw] sm:text-[13vw] font-bold text-white leading-none tracking-tighter" style={{ fontFamily: TAN }}>
              KREON
            </h2>
            <p className="text-white/40 text-lg mt-6 font-medium" style={{ fontFamily: SATOSHI }}>
              What exactly is one?
            </p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="ans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12"
          >
            {/* Card */}
            <motion.div
              initial={{ x: -40, opacity: 0, rotate: -4 }} animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 rounded-[28px] relative overflow-hidden"
              style={{ width: 240, height: 340, background: '#c084fc', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}
            >
              <div className="p-5 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/50" style={{ fontFamily: SATOSHI }}>Design & Visuals</span>
                <span className="text-sm font-black text-black/60" style={{ fontFamily: SATOSHI }}>#1247</span>
              </div>
              <div className="flex items-center justify-center py-6">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <circle cx="50" cy="50" r="40" fill="white" opacity="0.9" />
                  <path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black" />
                  <circle cx="30" cy="40" r="6" fill="black" />
                </svg>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="text-5xl font-bold leading-none tracking-tighter text-black" style={{ fontFamily: TAN }}>KREO</div>
                <p className="text-[8px] font-black uppercase tracking-widest text-black/50 mt-1" style={{ fontFamily: SATOSHI }}>Resident Architect</p>
                <p className="text-base font-black text-black uppercase tracking-tight mt-0.5" style={{ fontFamily: INSTRUMENT }}>Your Name</p>
              </div>
            </motion.div>

            {/* Explanation */}
            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}
              className="flex-1 text-white"
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-8"
                  style={{ fontFamily: INSTRUMENT }}>
                Not a username.<br />
                Your permanent identity<br />
                in the KREO ecosystem.
              </h3>
              <div className="space-y-5">
                {[
                  { dot: '#facc15', text: 'Every artifact you create is permanently tied to your KREON number.' },
                  { dot: '#c084fc', text: 'Your card reflects your creative discipline — it\'s designed to be shared.' },
                  { dot: '#22c55e', text: 'Claiming your KREON grants permanent access to the studio engine.' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot }} />
                    <p className="text-white/65 font-medium text-sm leading-relaxed" style={{ fontFamily: SATOSHI }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE 5: Your Card — Stacked discipline fanout
─────────────────────────────────────────────────────────────────── */
const DISCIPLINES = [
  { label: 'Design', bg: '#c084fc', tc: 'black', graphic: <svg viewBox="0 0 100 100" width="80" height="80"><circle cx="50" cy="50" r="40" fill="white" opacity="0.9"/><path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black"/></svg> },
  { label: 'Engineering', bg: '#3b82f6', tc: 'white', graphic: <svg viewBox="0 0 100 100" width="80" height="80"><rect x="15" y="28" width="70" height="46" rx="8" fill="white"/><path d="M30 42 L45 51 L30 60" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round"/><line x1="55" y1="60" x2="70" y2="60" stroke="black" strokeWidth="6" strokeLinecap="round"/></svg> },
  { label: 'Architecture', bg: '#22c55e', tc: 'black', graphic: <svg viewBox="0 0 100 100" width="80" height="80"><polygon points="50,18 20,82 80,82" fill="white"/><polygon points="50,18 50,82 80,82" fill="black"/></svg> },
  { label: 'Art', bg: '#ec4899', tc: 'white', graphic: <svg viewBox="0 0 100 100" width="80" height="80"><path d="M30 70 A30 30 0 0 1 70 30 L70 70 Z" fill="white" opacity="0.9"/><circle cx="55" cy="40" r="6" fill="#ec4899"/></svg> },
  { label: 'Music', bg: '#8b5cf6', tc: 'white', graphic: <svg viewBox="0 0 100 100" width="80" height="80"><rect x="28" y="18" width="44" height="64" rx="22" fill="none" stroke="white" strokeWidth="8"/><circle cx="28" cy="82" r="10" fill="black"/><circle cx="72" cy="82" r="10" fill="black"/></svg> },
];

const Scene5 = () => {
  const [active, setActive] = useState(2);

  return (
    <div className="fixed inset-0 bg-[#f5f5f3] flex flex-col items-center justify-center px-6 overflow-hidden">
      <Blob color="#facc1550" size={64} x="3%" y="6%" shape="star" delay={0} />
      <Blob color="#3b82f640" size={48} x="88%" y="80%" shape="square" delay={0.4} />
      <Blob color="#ec489930" size={40} x="86%" y="5%" shape="circle" delay={0.6} />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[10px] font-black tracking-[0.5em] uppercase text-[#1B3FBF] mb-3"
          style={{ fontFamily: SATOSHI }}>
          Your Identity
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-black tracking-tighter mb-8"
          style={{ fontFamily: INSTRUMENT }}>
          Every KREON is different.
        </motion.h2>

        {/* Pill selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DISCIPLINES.map((d, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{
                background: active === i ? d.bg : '#fff',
                color: active === i ? d.tc : '#000',
                border: `1px solid ${active === i ? d.bg : 'rgba(0,0,0,0.1)'}`,
                boxShadow: active === i ? `0 4px 16px ${d.bg}50` : 'none',
                fontFamily: SATOSHI,
              }}
              className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300"
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Stacked card fanout */}
        <div className="relative flex items-center justify-center" style={{ height: 340 }}>
          {DISCIPLINES.map((card, i) => {
            const dist = i - active;
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                animate={{
                  x: dist * 50,
                  scale: isActive ? 1 : 0.86 - Math.abs(dist) * 0.03,
                  rotate: dist * 6,
                  zIndex: isActive ? 20 : 10 - Math.abs(dist),
                  opacity: Math.abs(dist) > 2 ? 0 : 1 - Math.abs(dist) * 0.15,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                style={{ position: 'absolute', cursor: 'pointer' }}
                onClick={() => setActive(i)}
              >
                <div
                  className="rounded-[26px] relative overflow-hidden"
                  style={{
                    width: 210, height: 300,
                    background: card.bg,
                    boxShadow: isActive ? `0 28px 70px ${card.bg}60` : '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest"
                          style={{ color: card.tc === 'white' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)', fontFamily: SATOSHI }}>
                      {card.label}
                    </span>
                    <span className="text-sm font-black"
                          style={{ color: card.tc === 'white' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)', fontFamily: SATOSHI }}>
                      #1247
                    </span>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    {card.graphic}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="text-4xl font-bold leading-none tracking-tighter"
                         style={{ fontFamily: TAN, color: card.tc === 'white' ? '#fff' : '#000' }}>
                      KREO
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest mt-0.5"
                       style={{ color: card.tc === 'white' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', fontFamily: SATOSHI }}>
                      Resident Architect
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE 6: Finale — CTA
─────────────────────────────────────────────────────────────────── */
const Scene6 = () => {
  const [typed, setTyped] = useState('');
  const target = 'KREO';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(target.slice(0, i + 1));
      i++;
      if (i >= target.length) clearInterval(t);
    }, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#1B3FBF]/4 blur-[120px]" />
        <Blob color="#c084fc40" size={160} x="-3%" y="-3%" shape="circle" delay={0} />
        <Blob color="#22c55e30" size={100} x="83%" y="74%" shape="circle" delay={0.3} />
        <Blob color="#facc1550" size={50} x="80%" y="8%" shape="star" delay={0.5} />
        <Blob color="#3b82f630" size={38} x="6%" y="78%" shape="square" delay={0.7} />
      </div>

      <div className="relative z-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[10px] font-black tracking-[0.5em] uppercase text-[#1B3FBF] mb-4"
          style={{ fontFamily: SATOSHI }}>
          Build with
        </motion.p>

        <h1
          className="font-bold tracking-tighter leading-none text-[#1B3FBF] mb-5"
          style={{ fontFamily: TAN, fontSize: 'clamp(80px, 18vw, 220px)' }}
        >
          {typed}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block bg-[#1B3FBF] align-middle ml-3"
            style={{ width: 5, height: '0.82em', borderRadius: 2, verticalAlign: 'middle' }}
          />
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="text-base text-black/40 font-medium mb-10 max-w-sm mx-auto leading-relaxed"
          style={{ fontFamily: SATOSHI }}>
          Claim your KREON identity.<br />Enter the studio.
        </motion.p>

        <motion.a
          href="/build"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="inline-block px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#1B3FBF] transition-colors"
          style={{ fontFamily: SATOSHI }}
        >
          Join the Registry →
        </motion.a>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}
          className="mt-6 text-[10px] font-black tracking-[0.5em] uppercase text-black/15"
          style={{ fontFamily: SATOSHI }}>
          kreo-ai.vercel.app
        </motion.p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ORCHESTRATOR
─────────────────────────────────────────────────────────────────── */
export default function KreoPromo5() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;
    timer.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(timer.current);
        setScene(prev => (prev + 1) % TOTAL_SCENES);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(timer.current);
  }, [scene]);

  const SCENE_LABELS = ['Hello', 'Campaign', 'The Feeling', 'Resolution', 'Identity', 'Your Card', 'Enter'];
  const scenes = [<SceneSplash />, <Scene1 />, <Scene2 />, <Scene3 />, <Scene4 />, <Scene5 />, <Scene6 />];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[900] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay' }} />

      {/* Chapter label — top left */}
      <motion.div key={scene} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        className="fixed top-7 left-9 z-[6000] select-none"
        style={{ fontFamily: SATOSHI }}
      >
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/25">
          {String(scene + 1).padStart(2, '0')} / {SCENE_LABELS[scene]}
        </span>
      </motion.div>

      {/* Nav dots — top right */}
      <div className="fixed top-7 right-9 z-[6000] flex items-center gap-1.5">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button key={i}
            onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-400 ${i === scene ? 'w-7 h-1.5 bg-black' : 'w-1.5 h-1.5 bg-black/15 hover:bg-black/30'}`}
          />
        ))}
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-[6000] bg-black/8">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
