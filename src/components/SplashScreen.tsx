import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Presentation, Code2, Smile, Activity, BrainCircuit, Sparkles, 
  LayoutGrid, Zap, Rocket, Lightbulb, Monitor, Laptop, 
  FileText, MessageSquare, Star, Globe, Cpu, MousePointer2,
  Database, Fingerprint, Layers, Shield, Command, Terminal,
  Workflow, Boxes, Pencil, Eraser, Heart, Glasses
} from "lucide-react";

const TAN = "'TAN-NIMBUS', sans-serif";
const LETTERS = ['K', 'R', 'E', 'O'];

const DOODLE_ICONS = [
  Presentation, Code2, Smile, Activity, BrainCircuit, Sparkles, 
  LayoutGrid, Zap, Rocket, Lightbulb, Monitor, Laptop, 
  FileText, MessageSquare, Star, Globe, Cpu, MousePointer2,
  Database, Fingerprint, Layers, Shield, Command, Terminal,
  Workflow, Boxes, Pencil, Eraser, Heart, Glasses
];

const NeuralDoodle = ({ index }: { index: number }) => {
  const Icon = useMemo(() => DOODLE_ICONS[Math.floor(Math.random() * DOODLE_ICONS.length)], []);
  const pos = useMemo(() => ({
    top: `${Math.random() * 110 - 5}%`, // Overflow slightly
    left: `${Math.random() * 110 - 5}%`,
    rotate: Math.random() * 360,
    scale: 0.3 + Math.random() * 1.4,
    opacity: 0.05 + Math.random() * 0.25,
    delay: Math.random() * 2
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: pos.opacity, 
        scale: pos.scale,
        rotate: pos.rotate + (index % 2 === 0 ? 15 : -15)
      }}
      transition={{ 
        delay: pos.delay, 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 4
      }}
      className="absolute text-[#1B3FBF] pointer-events-none"
      style={{ top: pos.top, left: pos.left }}
    >
      <Icon size={12 + Math.random() * 45} strokeWidth={0.8 + Math.random()} />
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");
  
  // High-density scatter - 250 doodles to "fill" the screen
  const doodles = useMemo(() => Array.from({ length: 250 }), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1500);
    const t2 = setTimeout(() => setPhase("exit"), 4000); // Longer hold to appreciate density
    const t3 = setTimeout(onComplete, 4800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.15, filter: "blur(15px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none grayscale" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook.png')" }} />

          {/* Programmatic Neural Scatter - Ultra Dense Doodle Field */}
          <div className="absolute inset-0 overflow-hidden">
             {doodles.map((_, i) => (
               <NeuralDoodle key={i} index={i} />
             ))}
             
             {/* Dynamic Blueprint Grid & Sketch Lines */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ duration: 3 }}
                  d="M0,0 L100,100 M100,0 L0,100 M50,0 V100 M0,50 H100" 
                  stroke="#1B3FBF" strokeWidth="0.05" 
                />
                {[...Array(10)].map((_, i) => (
                  <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 10} fill="none" stroke="#1B3FBF" strokeWidth="0.02" strokeDasharray="1 1" />
                ))}
             </svg>
          </div>

          {/* KREO branding - TAN-NIMBUS font */}
          <div className="flex items-center gap-1 md:gap-4 relative z-10 translate-y-[-20%]">
             <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-150" />
            {LETTERS.map((letter, i) => (
               <motion.span
                 key={i}
                 initial={{ y: 60, opacity: 0, rotate: -25, scale: 0.3 }}
                 animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                 transition={{ 
                   delay: i * 0.12, 
                   type: "spring", 
                   stiffness: 400, 
                   damping: 15 
                 }}
                 className="text-[16vw] font-bold text-black leading-none tracking-tighter cursor-default relative z-20"
                 style={{ fontFamily: TAN }}
               >
                 {letter}
               </motion.span>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
            <div className="w-64 h-[1px] bg-black/5 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3.5, ease: "easeInOut" }}
                 className="h-full bg-[#1B3FBF]"
               />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] font-black uppercase tracking-[1em] text-black/30 translate-x-[0.5em]">
                Neural Orchestration
              </p>
              <p className="text-[8px] font-serif italic text-black/10 tracking-widest mt-2">
                Assembling manifestations...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;


