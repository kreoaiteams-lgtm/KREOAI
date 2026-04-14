import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import animationData from "./Hello (apple).json";

const TAN = "'TAN-NIMBUS', sans-serif";
const SATOSHI = "'Satoshi', sans-serif";

/**
 * SplashScreen
 * 
 * Minimal, playful, emotional.
 */
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"lottie" | "reveal" | "exit">("lottie");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1500); 
    const t2 = setTimeout(() => setPhase("exit"), 3000); 
    const t3 = setTimeout(onComplete, 3800); 
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#1B3FBF] overflow-hidden"
        >
          {/* Confetti particles on reveal */}
          {phase === "reveal" && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(32)].map((_, i) => {
                const colors = ['#facc15', '#fff', '#ec4899', '#22c55e', '#c084fc', '#f97316'];
                const s = Math.random() * 0.6 + 0.3;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0], 
                      y: Math.random() * 500 + 100, 
                      x: (Math.random() - 0.5) * 200, 
                      scale: s, 
                      rotate: Math.random() * 360 
                    }}
                    transition={{ duration: 2.5, delay: Math.random() * 0.4, ease: 'easeOut' }}
                    style={{ 
                      position: 'absolute', 
                      left: Math.random() * 100 + '%', 
                      top: '-5%', 
                      width: 8, 
                      height: 8, 
                      borderRadius: i % 2 === 0 ? '50%' : 2, 
                      background: colors[i % colors.length] 
                    }}
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
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[480px] h-[480px] relative z-10"
          >
            <Lottie animationData={animationData} loop={false} className="w-full h-full" />
          </motion.div>

          {/* KREO reveal */}
          <motion.div
            className="absolute flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[18vw] font-bold text-white leading-none tracking-tighter mix-blend-overlay" style={{ fontFamily: TAN }}>KREO</span>
            <span className="text-[9px] font-black tracking-[0.7em] uppercase text-white/30 mt-3" style={{ fontFamily: SATOSHI }}>Studio Engaged</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
