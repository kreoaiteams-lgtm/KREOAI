import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENE_DURATION = [
  7000,  // 0: "No matter what, KREO is the solution"
  12000, // 1: "What you can do with KREO"
];
const TOTAL_SCENES = SCENE_DURATION.length;

const IS = { fontFamily: "'Instrument Serif', Georgia, serif" };
const SAT = { fontFamily: "'Satoshi', sans-serif" };

// ── SCENE 0 ───────────────────────────────────────────────────────────────────
const Scene0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-[#1B3FBF] text-[10px] font-bold uppercase tracking-[0.5em] mb-8"
      style={SAT}
    >
      Neural Design Engine
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-7xl lg:text-[7rem] text-black leading-tight tracking-tighter max-w-5xl"
      style={IS}
    >
      No matter <em className="text-[#1B3FBF]">what</em>,<br />
      KREO is the <em className="text-[#1B3FBF]">solution</em>.
    </motion.h1>

    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 h-px w-28 bg-[#1B3FBF] origin-left opacity-30"
    />
  </div>
);

// ── SCENE 1 ───────────────────────────────────────────────────────────────────
const THINGS = [
  "Pitch decks",
  "SaaS dashboards",
  "Landing pages",
  "Brand toolkits",
  "Flowcharts",
  "Study visuals",
  "Financial reports",
  "Mobile app UIs",
];

const Scene1 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-[#1B3FBF] text-[10px] font-bold uppercase tracking-[0.5em] mb-8"
      style={SAT}
    >
      What you can do
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-7xl lg:text-[6rem] text-black leading-tight tracking-tighter"
      style={IS}
    >
      What you can do<br />
      with <em className="text-[#1B3FBF]">KREO</em>.
    </motion.h1>

    <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl">
      {THINGS.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 py-3 rounded-full border border-black/10 text-black/60 text-sm"
          style={SAT}
        >
          {item}
        </motion.div>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="mt-10 text-black/20 text-[10px] uppercase tracking-[0.5em]"
      style={SAT}
    >
      And so much more.
    </motion.p>
  </div>
);

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Promo8() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    timer.current = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(timer.current);
        setScene(prev => (prev + 1) % TOTAL_SCENES);
        setProgress(0);
      }
    }, 50);
    return () => clearInterval(timer.current);
  }, [scene]);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-white">
      {/* Scene dots */}
      <div className="fixed top-10 right-12 z-[100] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-500 ${i === scene ? 'w-8 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>

      {/* Scenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          {scene === 0 && <Scene0 />}
          {scene === 1 && <Scene1 />}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] z-[100] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
