import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAN = "'TAN-NIMBUS', sans-serif";
const SATOSHI = "'Satoshi', sans-serif";

const LETTERS = ['K', 'R', 'E', 'O'];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");

  useEffect(() => {
    // type → hold after all letters appear (~1.2s)
    const t1 = setTimeout(() => setPhase("hold"), 1400);
    // hold → exit
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    // call parent
    const t3 = setTimeout(onComplete, 3500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Subtle grid in background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <svg width="100%" height="100%">
              <pattern id="sg" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="1.5" fill="#1B3FBF" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#sg)" />
            </svg>
          </div>

          {/* Floating decorative dashes */}
          {phase === "hold" && (
            <div className="absolute inset-0 pointer-events-none">
              {[
                { cx: '12%', cy: '20%', r: 0, deg: 0 },
                { cx: '85%', cy: '15%', r: 0, deg: 45 },
                { cx: '8%',  cy: '72%', r: 0, deg: -30 },
                { cx: '90%', cy: '75%', r: 0, deg: 20 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ position: 'absolute', left: pos.cx, top: pos.cy, transform: `rotate(${pos.deg}deg)` }}
                >
                  <svg width="60" height="16" viewBox="0 0 60 16" fill="none">
                    <path d="M2 8 L48 8" stroke="#1B3FBF" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="5 4"/>
                    <path d="M43 3 L50 8 L43 13" stroke="#1B3FBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </motion.div>
              ))}
            </div>
          )}

          {/* KREO letters — one by one */}
          <div className="flex items-end gap-1 md:gap-3 relative z-10">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 40, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: i * 0.18,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[22vw] font-bold text-[#1B3FBF] leading-none tracking-tighter select-none"
                style={{ fontFamily: TAN, display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline fades in after hold */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0, y: phase === 'hold' ? 0 : 10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[11px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]/40 mt-4 relative z-10"
            style={{ fontFamily: SATOSHI }}
          >
            Studio Engaged
          </motion.span>

          {/* Cursor blink under text during type phase */}
          {phase === 'type' && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-[3px] h-[14vw] bg-[#1B3FBF] rounded-full ml-2 relative z-10"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

