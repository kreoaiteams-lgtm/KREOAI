import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, Loader2, Globe, FileText, Layout, X, Info, Crosshair, Zap, Cpu, Radio, ShieldCheck } from "lucide-react";
import { runCoWorkAgent, CoWorkStep } from "@/lib/ai";

interface CoWorkPanelProps {
  onManifestGenerated: (code: string, prompt: string) => void;
  onClose: () => void;
}

const CoWorkPanel = ({ onManifestGenerated, onClose }: CoWorkPanelProps) => {
  const [query, setQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<CoWorkStep[]>([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleStart = async (overrideQuery?: string) => {
    const targetQuery = overrideQuery || query;
    if (!targetQuery.trim()) return;
    setIsRunning(true);
    setSteps([]); // Reset steps for new run
    try {
      const finalManifest = await runCoWorkAgent(targetQuery, (updatedSteps) => {
        setSteps(updatedSteps);
      });
      if (finalManifest) {
        onManifestGenerated(finalManifest, targetQuery);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const activeStep = steps.find(s => s.status === 'running') || steps.filter(s => s.status === 'done').pop();
  const progress = steps.length > 0 ? (steps.filter(s => s.status === 'done').length / steps.length) * 100 : 0;

  return (
    <div className="w-full h-full max-w-5xl mx-auto p-8 relative flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {showSplash ? (
            <motion.div 
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/90 rounded-[3rem] overflow-hidden"
              style={{
                backgroundImage: `url("/mentra-bg.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <h1 className="text-9xl md:text-[12rem] text-white leading-none mb-4 brand-font relative z-10">MENTRA</h1>
              <div className="flex gap-2 relative z-10">
                 <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-2 h-2 rounded-full bg-white/20" />
                 <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 rounded-full bg-white/40" />
                 <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            {/* Branding - Bigger Mentra */}
            <AnimatePresence>
                  <h1 className="text-8xl md:text-9xl text-white leading-none mb-1 brand-font">MENTRA</h1>
            </AnimatePresence>

            {/* Input Area */}
            <div className="relative w-full max-w-3xl space-y-3">
              <div className="flex items-center justify-between px-8 opacity-20">
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    {[1,1,1].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-1 h-1 rounded-full bg-white"
                      />
                    ))}
                  </div>
                  <div className="h-px w-12 bg-white" />
                  <span className="text-[7px] font-mono tracking-widest uppercase text-white">Stream_Active</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[7px] font-mono tracking-widest uppercase text-white">{isRunning ? 'Syncing...' : 'Ready'}</span>
                  <div className="h-px w-12 bg-white" />
                  <motion.div 
                    animate={isRunning ? { rotate: 360 } : {}}
                    transition={isRunning ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
                  >
                    <Crosshair size={8} className="text-white" />
                  </motion.div>
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStart();
                }}
                className="flex items-center rounded-[2.5rem] px-10 py-6 transition-all gap-4 glass-card border border-white/10 shadow-2xl relative z-10"
              >
                <div className="flex items-center gap-2 pr-4 border-r border-white/5">
                  <Globe size={24} className="text-white/40" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask MENTRA for deep research..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isRunning}
                  className="flex-1 bg-transparent text-xl md:text-2xl outline-none font-sans text-white placeholder:text-white/20 font-bold"
                />
                <button 
                  type="submit"
                  disabled={isRunning || !query.trim()}
                  className="p-4 bg-white text-black rounded-[1.5rem] shadow-xl hover:scale-105 transition-all disabled:opacity-20 flex items-center justify-center min-w-[60px]"
                >
                  {isRunning ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                </button>
              </form>
            </div>

            {/* CINEMATIC LOADING STATE */}
            <AnimatePresence>
              {isRunning && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-full max-w-2xl flex flex-col items-center py-12 space-y-12"
                >
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-white/10 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="absolute inset-4 border border-white/5 rounded-full"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-24 h-24 rounded-full bg-white/[0.02] flex items-center justify-center"
                    >
                      <Zap className="text-white opacity-40" size={32} />
                    </motion.div>

                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4 + i, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Analysis Mission Protocol</span>
                      <AnimatePresence mode="wait">
                        <motion.h3 
                          key={activeStep?.id || 'loading'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-2xl font-serif italic text-white/80 max-w-md"
                        >
                          {activeStep?.content || "Orchestrating Task DNA..."}
                        </motion.h3>
                      </AnimatePresence>
                    </div>

                    <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute inset-y-0 left-0 bg-white"
                      />
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 opacity-30">
                       <span className="text-[8px] font-mono tracking-widest uppercase text-white">Nodes: {steps.filter(s => s.status === 'done').length}/{steps.length}</span>
                       <div className="w-1 h-1 rounded-full bg-white/20" />
                       <span className="text-[8px] font-mono tracking-widest uppercase text-white">{Math.round(progress)}% Complete</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Suggestions Removed as requested */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoWorkPanel;
