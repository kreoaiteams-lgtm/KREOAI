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
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-white"
           >
             <h1 className="text-8xl text-black leading-none mb-4" style={{ fontFamily: '"TAN-Nimbus", serif' }}>KREO</h1>
             <div className="flex gap-2">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-2 h-2 rounded-full bg-black/40" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[#E63946]" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 rounded-full bg-black/40" />
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
            {/* KREO Badge / Branding (Only show when not running) */}
            <AnimatePresence>
              {!isRunning && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <h1 className="text-6xl text-black leading-none mb-1" style={{ fontFamily: '"TAN-Nimbus", serif' }}>KREO</h1>
                  <div className="relative inline-block mt-[-4px]">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">co-working</span>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute -bottom-1 left-0 h-[2px] bg-[#E63946]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="relative w-full max-w-3xl space-y-3">
              {/* Abstract elements above input bar */}
              <div className="flex items-center justify-between px-8 opacity-20">
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    {[1,1,1].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-1 h-1 rounded-full bg-black"
                      />
                    ))}
                  </div>
                  <div className="h-px w-12 bg-black" />
                  <span className="text-[7px] font-mono tracking-widest uppercase">Stream_Active</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[7px] font-mono tracking-widest uppercase">{isRunning ? 'Syncing...' : 'Ready'}</span>
                  <div className="h-px w-12 bg-black" />
                  <motion.div 
                    animate={isRunning ? { rotate: 360 } : {}}
                    transition={isRunning ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
                  >
                    <Crosshair size={8} />
                  </motion.div>
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStart();
                }}
                className="flex items-center rounded-[2rem] px-8 py-5 shadow-2xl transition-all border ring-1 gap-4 bg-white border-black/5 ring-black/[0.02] text-black relative z-10"
              >
                <div className="flex items-center gap-2 pr-4 border-r border-black/5">
                  <Globe size={20} className="text-black/20" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask KREO for deep research..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isRunning}
                  className="flex-1 bg-transparent text-xl outline-none font-sans text-black placeholder:text-black/20 font-light"
                />
                <button 
                  type="submit"
                  disabled={isRunning || !query.trim()}
                  className="p-3 bg-black text-white rounded-2xl shadow-xl hover:scale-105 transition-all disabled:opacity-20 flex items-center justify-center min-w-[50px]"
                >
                  {isRunning ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
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
                  {/* Neural Scan Animation */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-black/10 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="absolute inset-4 border border-black/5 rounded-full"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-24 h-24 rounded-full bg-black/[0.02] flex items-center justify-center"
                    >
                      <Zap className="text-[#1B3FBF] opacity-40" size={32} />
                    </motion.div>

                    {/* Orbiting Particles */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4 + i, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1B3FBF] shadow-[0_0_10px_#1B3FBF]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Status Text */}
                  <div className="text-center space-y-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/20">Agent Mission Protocol</span>
                      <AnimatePresence mode="wait">
                        <motion.h3 
                          key={activeStep?.id || 'loading'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-2xl font-serif italic text-black/80 max-w-md"
                        >
                          {activeStep?.content || "Orchestrating Task DNA..."}
                        </motion.h3>
                      </AnimatePresence>
                    </div>

                    <div className="w-64 h-1 bg-black/5 rounded-full mx-auto overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute inset-y-0 left-0 bg-[#1B3FBF]"
                      />
                      <motion.div 
                        animate={{ x: [-256, 256] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 opacity-30">
                       <span className="text-[8px] font-mono tracking-widest uppercase">Nodes: {steps.filter(s => s.status === 'done').length}/{steps.length}</span>
                       <div className="w-1 h-1 rounded-full bg-black/20" />
                       <span className="text-[8px] font-mono tracking-widest uppercase">{Math.round(progress)}% Complete</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Suggestions (Only show when not running) */}
            {!isRunning && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl pt-6">
                {[
                  "Market research on premium EV bikes in India 2025",
                  "Price comparison: MacBook Pro M4 vs Surface Pro 11",
                  "SWOT analysis of Indian quick-commerce sector",
                  "Latest savings rates of ICICI vs HDFC vs SBI"
                ].map((prompt, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setQuery(prompt); handleStart(prompt); }}
                    className="p-6 rounded-[1.8rem] border border-black/5 bg-white/50 hover:bg-white hover:border-black/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-[#1B3FBF]/10 group-hover:text-[#1B3FBF] transition-all">
                        <Globe size={14} />
                      </div>
                      <span className="text-xs font-serif italic text-black/40 group-hover:text-black/80">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoWorkPanel;
