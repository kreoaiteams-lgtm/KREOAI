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
    scale: 0.3 + Math.random() * 1.5,
    opacity: 0.05 + Math.random() * 0.15,
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
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 5
      }}
      className="absolute text-white pointer-events-none"
      style={{ top, left }}
    >
      <Icon size={15 + Math.random() * 50} strokeWidth={0.5} />
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");
  
  const doodles = useMemo(() => {
    const items = [];
    const rows = 12;
    const cols = 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const top = (r / rows) * 100 + (Math.random() * 6 - 3);
        const left = (c / cols) * 100 + (Math.random() * 6 - 3);
        const icon = DOODLE_ICONS[Math.floor(Math.random() * DOODLE_ICONS.length)];
        if (Math.random() > 0.2) {
          items.push({ top: `${top}%`, left: `${left}%`, icon });
        }
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1200);
    const t2 = setTimeout(() => setPhase("exit"), 3000);
    const t3 = setTimeout(onComplete, 3800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-[#1B3FBF] overflow-hidden"
        >
          {/* Neural Cloud Field */}
          <div className="absolute inset-0 overflow-hidden">
             {doodles.map((item, i) => (
               <NeuralDoodle key={i} index={i} top={item.top} left={item.left} icon={item.icon} />
             ))}
          </div>

          {/* Minimalist Centered KREO */}
          <div className="flex items-center gap-1 md:gap-4 relative z-10">
            {LETTERS.map((letter, i) => (
               <motion.span
                 key={i}
                 initial={{ y: 20, opacity: 0, scale: 0.9 }}
                 animate={{ y: 0, opacity: 1, scale: 1 }}
                 transition={{ 
                   delay: i * 0.1, 
                   duration: 0.8,
                   ease: [0.16, 1, 0.3, 1]
                 }}
                 className="text-[18vw] font-bold text-white leading-none tracking-tighter cursor-default drop-shadow-2xl"
                 style={{ fontFamily: TAN }}
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


