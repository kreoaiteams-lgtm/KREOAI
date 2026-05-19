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
    scale: 0.4 + Math.random() * 1.2,
    opacity: 0.04 + Math.random() * 0.12,
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
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 4
      }}
      className="absolute text-slate-400 pointer-events-none"
      style={{ top, left }}
    >
      <Icon size={12 + Math.random() * 30} strokeWidth={0.5} />
    </motion.div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"type" | "hold" | "exit">("type");
  const [loadingPercent, setLoadingPercent] = useState(0);
  
  const doodles = useMemo(() => {
    const items = [];
    const rows = 10;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const top = (r / rows) * 100 + (Math.random() * 8 - 4);
        const left = (c / cols) * 100 + (Math.random() * 8 - 4);
        const icon = DOODLE_ICONS[Math.floor(Math.random() * DOODLE_ICONS.length)];
        if (Math.random() > 0.3) {
          items.push({ top: `${top}%`, left: `${left}%`, icon });
        }
      }
    }
    return items;
  }, []);

  useEffect(() => {
    // Smooth loader bar progression
    const interval = setInterval(() => {
      setLoadingPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + step);
      });
    }, 150);

    const t1 = setTimeout(() => setPhase("hold"), 1200);
    const t2 = setTimeout(() => setPhase("exit"), 3000);
    const t3 = setTimeout(onComplete, 3700);

    return () => {
      clearInterval(interval);
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-[#f4f6fa] overflow-hidden"
        >
          {/* Kinetic Ambient Glow behind letters */}
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] bg-blue-300/20 rounded-full blur-[80px] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 translate-x-[-40%] translate-y-[-60%] w-[250px] h-[250px] bg-purple-300/20 rounded-full blur-[90px] pointer-events-none z-0" />

          {/* Neural Cloud Icon Field */}
          <div className="absolute inset-0 overflow-hidden z-0">
             {doodles.map((item, i) => (
                <NeuralDoodle key={i} index={i} top={item.top} left={item.left} icon={item.icon} />
             ))}
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Minimalist Centered KREO Letters */}
            <div className="flex items-center gap-2 md:gap-5">
              {LETTERS.map((letter, i) => (
                 <motion.span
                   key={i}
                   initial={{ y: 35, opacity: 0, scale: 0.8 }}
                   animate={{ y: 0, opacity: 1, scale: 1 }}
                   transition={{ 
                     delay: i * 0.12, 
                     duration: 0.9,
                     ease: [0.16, 1, 0.3, 1]
                   }}
                   className="text-[17vw] font-bold text-slate-900 leading-none tracking-tighter cursor-default select-none drop-shadow-xl"
                   style={{ fontFamily: TAN }}
                 >
                   {letter}
                 </motion.span>
              ))}
            </div>

            {/* Premium Subtitle & Editorial Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center space-y-1 text-center"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                neural design engine
              </p>
              <p className="text-xs font-serif italic text-slate-400 tracking-wide">
                Architecting Visual Space...
              </p>
            </motion.div>
          </div>

          {/* Precision Loading Progress Bar at the bottom */}
          <div className="absolute bottom-16 left-1/2 translate-x-[-50%] w-48 space-y-2 z-10 flex flex-col items-center">
            <div className="h-[2px] w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300 relative shadow-inner">
              <motion.div 
                className="h-full bg-slate-800"
                initial={{ width: 0 }}
                animate={{ width: `${loadingPercent}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              Manifesting Studio {loadingPercent}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
