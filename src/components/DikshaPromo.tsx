import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Scene durations (ms) ────────────────────────────────────────────────────
const DURATIONS = [4000, 5000, 5500, 5500, 5000, 5500, 5000];
const TOTAL = DURATIONS.length;

const SAT = '"Satoshi", system-ui, sans-serif';
const IS  = '"Instrument Serif", Georgia, serif';

// ─── Confetti dots for the celebration scenes ─────────────────────────────────
const Confetti = () => {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2.5,
    color: ['#ffffff', '#ffb3c6', '#ff8fab', '#fb6f92', '#ffe5ec', '#FFF0F5'][i % 6],
    size: 4 + Math.random() * 12,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {dots.map(d => (
        <motion.div
          key={d.id}
          className="absolute rounded-full opacity-80"
          style={{ left: `${d.x}%`, width: d.size, height: d.size, background: d.color, top: -20, filter: 'blur(1px)' }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], x: [0, Math.random() * 50 - 25] }}
          transition={{ duration: 4 + Math.random() * 4, delay: d.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

// ─── Progress bar strip ───────────────────────────────────────────────────────
const ProgressStrip = ({ scene, progress }: { scene: number; progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] flex gap-2 p-4">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/20 backdrop-blur-md">
        {i < scene && <div className="h-full w-full bg-white/70" />}
        {i === scene && (
          <motion.div
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
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
  <div className="absolute inset-0 bg-gradient-to-br from-[#ff758c] to-[#ff7eb3]">
    <div className="absolute inset-0 bg-white/10 backdrop-blur-[100px]" />
    <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

// ─── Scene 0: Big Birthday opener ────────────────────────────────────────────
const S0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="relative z-20 space-y-8">
      <motion.div
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-7xl drop-shadow-2xl">🎉✨🎁</motion.div>
      <div className="space-y-2">
        <h1 style={{ fontFamily: IS }}
          className="text-[16vw] md:text-[13vw] leading-[0.8] italic text-white tracking-tighter drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
          Happy<br />Birthday
        </h1>
        <motion.h2 style={{ fontFamily: SAT }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-3xl md:text-5xl font-light text-white/90 tracking-[0.2em] uppercase pt-4">
          Diksha
        </motion.h2>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 1: "good day" ─────────────────────────────────────────────────────
const S1 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90 }} className="relative z-10 max-w-3xl space-y-10">
      <div className="text-7xl space-x-6 drop-shadow-xl">🌸 🌟 🍀</div>
      <div className="space-y-6 bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <p style={{ fontFamily: SAT }} className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60">A message for you</p>
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          I hope today is as beautiful as your heart, and the year ahead brings you <span className="text-yellow-200">everything you deserve.</span>
        </h2>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 2: "annoying sometimes" ───────────────────────────────────────────
const S2 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 90 }}
      className="max-w-3xl w-full flex flex-col items-center gap-10 relative z-10">
      <div className="text-8xl drop-shadow-xl">🙄 💅 🦋</div>
      <div className="space-y-6 bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          You drive me <span className="text-yellow-200">crazy sometimes</span>…
        </h2>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-white/80 font-light leading-relaxed">
          but honestly, my world would be so incredibly boring without you in it. 🫶
        </p>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 3: scolding scene ─────────────────────────────────────────────────
const S3 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }} className="relative z-10 max-w-3xl space-y-10">
      <motion.div className="text-8xl drop-shadow-xl"
        animate={{ y: [-6, 6, -6], rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 2.5 }}>😤 🤦‍♂️ 🤷‍♂️</motion.div>
      <div className="space-y-6 bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          All those times we got in trouble <span className="text-white/60 text-4xl whitespace-nowrap">(and I took the blame)</span>…
        </h2>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-white/80 font-light">
          I wouldn't trade those memories for anything. 😄
        </p>
      </div>
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
      className="max-w-3xl w-full flex flex-col items-center gap-10 relative z-10">
      <div className="text-8xl drop-shadow-xl">👸 ✨ 🧚‍♀️</div>
      <div className="space-y-8 bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          You'll always be our little <span className="bg-white/30 text-white px-5 py-2 rounded-full inline-block mt-3 shadow-inner">papa ki pari</span>…
        </h2>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-white/80 font-light leading-relaxed">
          getting away with murder because you're just that cute. 🙃
        </p>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 5: "take care" ────────────────────────────────────────────────────
const S5 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden text-center">
    <PinkBg />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120 }} className="relative z-10 max-w-3xl space-y-10">
      <div className="text-8xl drop-shadow-xl">💖 🌷 💫</div>
      <div className="space-y-6 bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <h2 style={{ fontFamily: IS }} className="text-5xl md:text-7xl italic text-white leading-[1.1] tracking-tight">
          Take care of yourself, and smile big today.
        </h2>
        <p style={{ fontFamily: SAT }} className="text-xl md:text-3xl text-white/80 font-light">
          Know how deeply you are loved. 🌟
        </p>
      </div>
    </motion.div>
  </div>
);

// ─── Scene 6: Final – save me some cake ──────────────────────────────────────
const S6 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <PinkBg />
    <Confetti />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="max-w-3xl w-full flex flex-col items-center gap-12 relative z-20">
      <h2 style={{ fontFamily: IS }} className="text-7xl md:text-9xl italic text-white leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        Now go cut that cake! 🍰
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-8 bg-white/10 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.1)] w-full">
        <p style={{ fontFamily: SAT }} className="text-white/80 text-xl md:text-2xl font-light tracking-wide">
          (and save the biggest slice for me)
        </p>
        <p style={{ fontFamily: IS }} className="text-white text-5xl md:text-6xl italic pt-2">Love you always! 🎀</p>
        <div className="flex items-center gap-6 justify-center text-6xl pt-6">
          {['🎂','🎈','✨','🎊','💛'].map((e, i) => (
            <motion.span key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}>
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
      className="relative w-full h-screen overflow-hidden select-none bg-pink-100 cursor-pointer"
      onClick={advance}
    >
      <ProgressStrip scene={scene} progress={progress} />

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
