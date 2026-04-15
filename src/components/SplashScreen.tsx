import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Presentation, Code2, Smile, Activity, BrainCircuit, Sparkles, LayoutGrid, Zap } from "lucide-react";

const TAN = "'TAN-NIMBUS', sans-serif";

const LETTERS = ['K', 'R', 'E', 'O'];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1400);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
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
          {/* Enhanced background graphics (Neural Blueprint Style) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] overflow-hidden">
            {/* Icons scatter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              <motion.div animate={{ y: [0, -40, 0], rotate: 10 }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-[8%] left-[12%] text-[#1B3FBF]">
                <Presentation size={90} />
              </motion.div>
              <motion.div animate={{ y: [0, 40, 0], rotate: -10 }} transition={{ repeat: Infinity, duration: 9 }} className="absolute bottom-[10%] right-[12%] text-[#1B3FBF]">
                <Code2 size={80} />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-[25%] right-[15%] text-[#1B3FBF]">
                <BrainCircuit size={64} />
              </motion.div>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} className="absolute top-1/2 left-[8%] -translate-y-1/2 text-[#1B3FBF]">
                <LayoutGrid size={56} />
              </motion.div>
              <motion.div animate={{ x: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute bottom-[20%] left-[18%] text-[#1B3FBF]">
                <Activity size={48} />
              </motion.div>
              <motion.div animate={{ scale: [1, 0.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-[15%] right-[25%] text-[#1B3FBF]">
                <Sparkles size={40} />
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }} className="absolute bottom-[25%] right-[22%] text-[#1B3FBF]">
                <Zap size={52} />
              </motion.div>
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-[40%] left-[25%] text-[#1B3FBF]">
                <Smile size={36} />
              </motion.div>
            </motion.div>

            {/* Geometric Sprinkles */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20%" cy="30%" r="2" fill="#1B3FBF" className="opacity-20" />
              <circle cx="80%" cy="70%" r="2" fill="#1B3FBF" className="opacity-20" />
              <circle cx="50%" cy="15%" r="3" fill="#1B3FBF" className="opacity-20" />
              <line x1="10%" y1="10%" x2="15%" y2="15%" stroke="#1B3FBF" strokeWidth="0.5" className="opacity-20" />
              <line x1="90%" y1="90%" x2="85%" y2="85%" stroke="#1B3FBF" strokeWidth="0.5" className="opacity-20" />
              <circle cx="50%" cy="50%" r="150" fill="none" stroke="#1B3FBF" strokeWidth="0.5" strokeDasharray="10 20" className="opacity-10" />
              <circle cx="50%" cy="50%" r="300" fill="none" stroke="#1B3FBF" strokeWidth="0.5" strokeDasharray="5 15" className="opacity-5" />
            </svg>
          </div>

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
