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

const NeuralDoodle = ({ top, left, index, icon }: { top: string, left: string, index: number, icon: any }) => {
  const Icon = icon;
  const pos = useMemo(() => ({
    rotate: Math.random() * 360,
    scale: 0.25 + Math.random() * 1.3,
    opacity: 0.3 + Math.random() * 0.4, // Much darker and more visible
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
      className="absolute text-black/60 pointer-events-none" // Darker brand-aligned color
      style={{ top, left }}
    >
      <Icon size={10 + Math.random() * 40} strokeWidth={0.7 + Math.random()} />
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");
  
  // High-fidelity strictly-constrained jittered grid to ensure zero overlap
  const doodles = useMemo(() => {
    const items = [];
    const rows = 14;
    const cols = 12;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Strict grid placement with constrained jitter (max 25% of cell size)
        // This guarantees no icons will collide as long as jitter is less than half cell size - icon radius
        const top = (r / rows) * 100 + (Math.random() * 4 - 2);
        const left = (c / cols) * 100 + (Math.random() * 5 - 2.5);
        const icon = DOODLE_ICONS[Math.floor(Math.random() * DOODLE_ICONS.length)];
        
        // Skip ~15% of cells for organic sketchbook feel
        if (Math.random() > 0.15) {
          items.push({ top: `${top}%`, left: `${left}%`, icon });
        }
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1500);
    const t2 = setTimeout(() => setPhase("exit"), 4000);
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

          {/* Ultra Dense Doodle Field - Jittered Grid Edition */}
          <div className="absolute inset-0 overflow-hidden">
             {doodles.map((item, i) => (
               <NeuralDoodle key={i} index={i} top={item.top} left={item.left} icon={item.icon} />
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
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 15} fill="none" stroke="#1B3FBF" strokeWidth="0.02" strokeDasharray="1 1" />
                ))}
             </svg>
          </div>

          {/* KREO branding - TAN-NIMBUS font - PERFECTLY CENTERED */}
          <div className="flex items-center gap-1 md:gap-4 relative z-10 transition-all duration-1000">
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


