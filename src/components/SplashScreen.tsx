import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 4000);
    const t2 = setTimeout(onComplete, 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#fdfcf8] selection:bg-none"
        >
           {/* Background Texture Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook.png')" }} />

           {/* The Dense Blueprint Illustration */}
           <motion.div 
             initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
             animate={{ scale: 1, opacity: 1, rotate: 0 }}
             transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full h-full flex items-center justify-center p-8 md:p-24 overflow-hidden"
           >
              <div className="relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center">
                <img 
                  src="/blueprint_splash.png" 
                  alt="KREO Neural Blueprint"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                />
              </div>
              
              {/* Orchestration Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 bg-[#1B3FBF] pointer-events-none mix-blend-overlay"
              />
           </motion.div>

           {/* Loading Progress Line at Bottom */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-black/5 overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 4, ease: "easeInOut" }}
               className="h-full bg-[#1B3FBF]"
             />
           </div>

           {/* Cinematic Tagline */}
           <motion.p 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 2 }}
             className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[1em] text-black/20"
           >
             Neural Orchestration
           </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

