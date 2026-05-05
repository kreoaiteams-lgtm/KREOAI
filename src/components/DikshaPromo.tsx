import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [3500, 5000, 5500, 5500, 5000, 5500, 4500];
const TOTAL = DURATIONS.length;

const SAT = '"Satoshi", system-ui, sans-serif';
const IS  = '"Instrument Serif", Georgia, serif';

// ─── Confetti dots for the celebration scenes ─────────────────────────────────
const Confetti = () => {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['#FF6B9D','#FFD93D','#6BCB77','#4D96FF','#FF6348','#C77DFF'][i % 6],
    size: 6 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {dots.map(d => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{ left: `${d.x}%`, width: d.size, height: d.size, background: d.color, top: -20 }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360] }}
          transition={{ duration: 3 + Math.random() * 3, delay: d.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

// ─── Progress bar strip ───────────────────────────────────────────────────────
const ProgressStrip = ({ scene, progress }: { scene: number; progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-1 p-3">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden bg-black/10">
        {i < scene && <div className="h-full w-full bg-black/30" />}
        {i === scene && (
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        )}
      </div>
    ))}
  </div>
);

// ─── Scene 0: Big Birthday opener ────────────────────────────────────────────
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #FF6348 100%)' }}>
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="relative z-20 space-y-6">
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="text-7xl">🎉</motion.div>
      <h1 style={{ fontFamily: IS }}
        className="text-[15vw] md:text-[12vw] leading-none text-white tracking-tight drop-shadow-2xl">
        Happy<br />Birthday
      </h1>
      <motion.h2 style={{ fontFamily: IS }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-[10vw] md:text-[8vw] leading-none text-white/80 italic tracking-wide">
        Diksha ✨
      </motion.h2>
    </motion.div>
  </div>
);

// ─── Scene 1: Grumpy cow + "might be annoying" ───────────────────────────────
const S1 = () => (
  <div className="fixed inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #4D96FF 0%, #a78bfa 100%)' }}>
    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }} className="relative z-10">
      <div className="w-52 h-52 md:w-72 md:h-72 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/30">
        <img src="/bday-34.jpeg" alt="grumpy animal" className="w-full h-full object-cover" />
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
      className="max-w-sm text-center md:text-left space-y-5 relative z-10">
      <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">A message for you</p>
      <h2 style={{ fontFamily: IS }} className="text-4xl md:text-5xl italic text-white leading-tight">
        Hope you have a really <span className="text-yellow-300">good day</span> and an even better year ahead.
      </h2>
    </motion.div>
  </div>
);

// ─── Scene 2: Otter on phone + "annoying sometimes" ──────────────────────────
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #6BCB77 0%, #4D96FF 100%)' }}>
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="max-w-lg w-full flex flex-col items-center gap-8 relative z-10 text-center">
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/40">
        <img src="/bday-35.jpeg" alt="cute animal" className="w-full h-full object-cover" />
      </div>
      <h2 style={{ fontFamily: IS }} className="text-4xl md:text-5xl italic text-white leading-tight">
        You might be <span className="text-yellow-300">annoying sometimes</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-lg text-white/70 font-light">
        but it wouldn't be the same without you around. 🫶
      </p>
    </motion.div>
  </div>
);

// ─── Scene 3: Shocked capybara + scolding scene ───────────────────────────────
const S3 = () => (
  <div className="fixed inset-0 flex flex-col md:flex-row-reverse items-center justify-center gap-8 px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #FFD93D 0%, #FF6348 100%)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 12 }} className="relative z-10">
      <div className="w-52 h-52 md:w-64 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/30">
        <img src="/bday-36.jpeg" alt="shocked animal" className="w-full h-full object-cover" />
      </div>
      {/* shock emoji floating */}
      <motion.div className="absolute -top-4 -right-4 text-4xl"
        animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 2 }}>😤</motion.div>
    </motion.div>
    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 }}
      className="max-w-xs text-center md:text-right space-y-5 relative z-10">
      <h2 style={{ fontFamily: IS }} className="text-4xl md:text-5xl italic text-white leading-tight">
        All those times I got scolded for things I <span className="underline decoration-wavy decoration-white/60">didn't even do</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-base text-white/80 font-light">
        Full credit goes to you. 😄
      </p>
    </motion.div>
  </div>
);

// ─── Scene 4: Dog smiling + "papa ki pari" ───────────────────────────────────
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #C77DFF 0%, #FF6B9D 100%)' }}>
    <Confetti />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
      className="max-w-lg w-full flex flex-col items-center gap-8 relative z-10 text-center">
      <div className="w-48 h-64 md:w-56 md:h-72 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/40">
        <img src="/bday-37.jpeg" alt="cute dog" className="w-full h-full object-cover" />
      </div>
      <h2 style={{ fontFamily: IS }} className="text-4xl md:text-5xl italic text-white leading-tight">
        But since you're <span className="bg-white/20 px-3 py-1 rounded-full">papa ki pari</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-lg text-white/80 font-light">
        you always manage to get away with it anyway 🙃
      </p>
    </motion.div>
  </div>
);

// ─── Scene 5: Another animal + "take care" ───────────────────────────────────
const S5 = () => (
  <div className="fixed inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #4D96FF 0%, #6BCB77 100%)' }}>
    <motion.div initial={{ opacity: 0, rotate: -15, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150 }} className="relative z-10">
      <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/40">
        <img src="/bday-38.jpeg" alt="cute animal" className="w-full h-full object-cover" />
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-sm text-center md:text-left space-y-5 relative z-10">
      <h2 style={{ fontFamily: IS }} className="text-4xl md:text-5xl italic text-white leading-tight">
        Take care, enjoy your day <span className="text-yellow-300">properly.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-lg text-white/80 font-light">
        You deserve every bit of it. 🌟
      </p>
    </motion.div>
  </div>
);

// ─── Scene 6: Final – save me some cake ──────────────────────────────────────
const S6 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 40%, #FF6348 100%)' }}>
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="max-w-lg w-full flex flex-col items-center gap-8 relative z-20">
      <div className="w-48 h-60 md:w-56 md:h-72 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/40">
        <img src="/bday-39.jpeg" alt="cute animal" className="w-full h-full object-cover" />
      </div>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-white leading-tight drop-shadow-lg">
        Don't forget to save me some cake 🍰
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3">
        <p style={{ fontFamily: SAT }} className="text-white/70 text-sm font-light">with love 🎀</p>
        <div className="flex items-center gap-3 justify-center">
          {['🎂','🎈','✨','🎊','💛'].map((e, i) => (
            <motion.span key={i} className="text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}>
              {e}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
);

// ─── Scene registry ───────────────────────────────────────────────────────────
const SCENES = [S0, S1, S2, S3, S4, S5, S6];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DikshaPromo() {
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
      className="relative w-full h-screen overflow-hidden select-none"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} />

      {/* Tap to advance hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
        <p style={{ fontFamily: SAT }}
          className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">
          tap to advance
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
