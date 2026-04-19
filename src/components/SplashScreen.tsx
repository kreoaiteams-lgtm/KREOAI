import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Presentation, Code2, Smile, Activity, BrainCircuit, Sparkles, 
  LayoutGrid, Zap, Rocket, Lightbulb, Monitor, Laptop, 
  FileText, MessageSquare, Star, Globe, Cpu, MousePointer2
} from "lucide-react";

const TAN = "'TAN-NIMBUS', sans-serif";
const LETTERS = ['K', 'R', 'E', 'O'];

const DOODLE_ICONS = [
  Presentation, Code2, Smile, Activity, BrainCircuit, Sparkles, 
  LayoutGrid, Zap, Rocket, Lightbulb, Monitor, Laptop, 
  FileText, MessageSquare, Star, Globe, Cpu, MousePointer2
];

const NeuralDoodle = ({ index }: { index: number }) => {
  const Icon = useMemo(() => DOODLE_ICONS[Math.floor(Math.random() * DOODLE_ICONS.length)], []);
  const pos = useMemo(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.3
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: pos.opacity, 
        scale: pos.scale,
        rotate: pos.rotate + (index % 2 === 0 ? 10 : -10)
      }}
      transition={{ 
        delay: Math.random() * 1.5, 
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 5
      }}
      className="absolute text-[#1B3FBF] pointer-events-none"
      style={{ top: pos.top, left: pos.left }}
    >
      <Icon size={20 + Math.random() * 40} strokeWidth={1} />
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");
  
  // Generate 80 randomized doodle elements for that "dense" look
  const doodles = useMemo(() => Array.from({ length: 80 }), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1500);
    const t2 = setTimeout(() => setPhase("exit"), 3200);
    const t3 = setTimeout(onComplete, 4000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook.png')" }} />

          {/* Programmatic Neural Scatter - Dense Doodle Field */}
          <div className="absolute inset-0 overflow-hidden">
             {doodles.map((_, i) => (
               <NeuralDoodle key={i} index={i} />
             ))}
             
             {/* Abstract Sketch Lines (Code-based) */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ duration: 2 }}
                  d="M10,10 L90,90 M90,10 L10,90" 
                  stroke="#1B3FBF" strokeWidth="0.1" 
                />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#1B3FBF" strokeWidth="0.05" strokeDasharray="1 2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1B3FBF" strokeWidth="0.05" strokeDasharray="2 4" />
             </svg>
          </div>

          {/* KREO branding - TAN-NIMBUS font */}
          <div className="flex items-center gap-1 md:gap-4 relative z-10">
            {LETTERS.map((letter, i) => (
               <motion.span
                 key={i}
                 initial={{ y: 40, opacity: 0, rotate: -20, scale: 0.5 }}
                 animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                 transition={{ 
                   delay: i * 0.1, 
                   type: "spring", 
                   stiffness: 300, 
                   damping: 12 
                 }}
                 className="text-[14vw] font-bold text-black leading-none tracking-tighter cursor-default"
                 style={{ fontFamily: TAN }}
               >
                 {letter}
               </motion.span>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-48 h-[1px] bg-black/5 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3, ease: "linear" }}
                 className="h-full bg-[#1B3FBF]"
               />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[9px] font-black uppercase tracking-[0.8em] text-black/20"
            >
              Establishing Neural Link
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

