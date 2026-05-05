import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [3500, 5000, 5500, 5500, 5000, 5500, 4500];
const TOTAL = DURATIONS.length;

const SAT = '"Satoshi", system-ui, sans-serif';
const IS  = '"Instrument Serif", Georgia, serif';

// ─── Confetti dots for the celebration scenes ─────────────────────────────────
const Confetti = () => {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['#ffffff', '#ffb3c6', '#ff8fab', '#fb6f92', '#ffe5ec'][i % 5],
    size: 6 + Math.random() * 10,
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
      <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/20">
        {i < scene && <div className="h-full w-full bg-white/60" />}
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

// ─── Base Background ──────────────────────────────────────────────────────────
const PinkBg = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#ff7eb3] to-[#ff758c]" />
);

// ─── Scene 0: Big Birthday opener ────────────────────────────────────────────
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="relative z-20 space-y-6">
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="text-7xl">🎉✨🎁</motion.div>
      <h1 style={{ fontFamily: IS }}
        className="text-[15vw] md:text-[12vw] leading-none text-white tracking-tight drop-shadow-2xl">
        Happy<br />Birthday
      </h1>
      <motion.h2 style={{ fontFamily: IS }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-[10vw] md:text-[8vw] leading-none text-white/80 italic tracking-wide">
        Diksha 💖
      </motion.h2>
    </motion.div>
  </div>
);

// ─── Scene 1: "good day" ─────────────────────────────────────────────────────
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }} className="relative z-10 max-w-2xl space-y-8">
      <div className="text-6xl space-x-4">🌸 🌟 🍀</div>
      <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">A message for you</p>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-tight drop-shadow-lg">
        Hope you have a really <span className="text-yellow-300">good day</span> and an even better year ahead.
      </h2>
    </motion.div>
  </div>
);

// ─── Scene 2: "annoying sometimes" ───────────────────────────────────────────
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="max-w-2xl w-full flex flex-col items-center gap-8 relative z-10">
      <div className="text-7xl">🙄 💅 🦋</div>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-tight drop-shadow-lg">
        You might be <span className="text-yellow-300">annoying sometimes</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-white/80 font-light">
        but it wouldn't be the same without you around. 🫶
      </p>
    </motion.div>
  </div>
);

// ─── Scene 3: scolding scene ─────────────────────────────────────────────────
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120 }} className="relative z-10 max-w-2xl space-y-8">
      <motion.div className="text-7xl"
        animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 2 }}>😤 🤦‍♂️ 🤷‍♂️</motion.div>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-tight drop-shadow-lg">
        All those times I got scolded for things I <span className="underline decoration-wavy decoration-white/60">didn't even do</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-white/80 font-light">
        Full credit goes to you. 😄
      </p>
    </motion.div>
  </div>
);

// ─── Scene 4: "papa ki pari" ─────────────────────────────────────────────────
const S4 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <Confetti />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
      className="max-w-2xl w-full flex flex-col items-center gap-8 relative z-10">
      <div className="text-7xl">👸 ✨ 🧚‍♀️</div>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-tight drop-shadow-lg">
        But since you're <span className="bg-white/20 px-4 py-2 rounded-full inline-block mt-2">papa ki pari</span>…
      </h2>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-white/80 font-light">
        you always manage to get away with it anyway 🙃
      </p>
    </motion.div>
  </div>
);

// ─── Scene 5: "take care" ────────────────────────────────────────────────────
const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150 }} className="relative z-10 max-w-2xl space-y-8">
      <div className="text-7xl">💖 🌷 💫</div>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-tight drop-shadow-lg">
        Take care, enjoy your day <span className="text-yellow-300">properly.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-xl md:text-2xl text-white/80 font-light">
        You deserve every bit of it. 🌟
      </p>
    </motion.div>
  </div>
);

// ─── Scene 6: Final – save me some cake ──────────────────────────────────────
const S6 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="max-w-2xl w-full flex flex-col items-center gap-12 relative z-20">
      <h2 style={{ fontFamily: IS }} className="text-6xl md:text-8xl italic text-white leading-tight drop-shadow-xl">
        Don't forget to save me some cake 🍰
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4">
        <p style={{ fontFamily: SAT }} className="text-white/80 text-lg font-light">with love 🎀</p>
        <div className="flex items-center gap-4 justify-center text-5xl">
          {['🎂','🎈','✨','🎊','💛'].map((e, i) => (
            <motion.span key={i}
              animate={{ y: [0, -12, 0] }}
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
      className="relative w-full h-screen overflow-hidden select-none bg-pink-100"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} />

      {/* Tap to advance hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
        <p style={{ fontFamily: SAT }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
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


