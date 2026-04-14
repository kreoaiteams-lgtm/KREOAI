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
          {/* KREO letters — one by one (Minimal) */}
          <div className="flex items-end gap-1 md:gap-3 relative z-10">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0.2, rotate: -20, y: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                transition={{
                  delay: i * 0.12,
                  type: "spring",
                  stiffness: 450,
                  damping: 15,
                }}
                className="text-[10vw] font-bold text-[#1B3FBF] leading-none tracking-tighter select-none"
                style={{ fontFamily: TAN, display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

