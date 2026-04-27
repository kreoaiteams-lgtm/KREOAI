import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, Loader2, Globe, FileText, Layout, X, Info } from "lucide-react";
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

  const handleStart = async () => {
    if (!query.trim()) return;
    setIsRunning(true);
    try {
      const finalManifest = await runCoWorkAgent(query, (updatedSteps) => {
        setSteps(updatedSteps);
      });
      if (finalManifest) {
        onManifestGenerated(finalManifest, query);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto p-8 relative flex flex-col items-center justify-center">
      <AnimatePresence>
        {showSplash ? (
           <motion.div 
             key="splash"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#fafafa]"
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
            className="w-full space-y-12"
          >
            {/* KREO Badge / Branding */}
            <div className="flex flex-col items-center text-center space-y-2">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-0 text-center"
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
            </div>

            {/* Input Area */}
            <div className="flex items-center rounded-[1.8rem] px-6 py-4 shadow-2xl transition-all border ring-1 gap-3 bg-white border-black/10 ring-black/5 text-black">
              <div className="flex items-center gap-2 pr-2 border-r leading-none border-black/10">
                <button type="button" className="p-2 text-black/40 hover:text-black">
                  <FileText size={20} />
                </button>
                <button type="button" className="p-2 text-black/40 hover:text-[#E63946]">
                  <Globe size={20} />
                </button>
              </div>
              <input 
                type="text" 
                placeholder="compare prices of m4 and surface 2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                disabled={isRunning}
                className="flex-1 bg-transparent text-lg outline-none font-sans text-black placeholder:text-black/30"
              />
              <button 
                onClick={handleStart}
                disabled={isRunning || !query.trim()}
                className="p-2.5 bg-[#0020C2] text-white rounded-2xl shadow-xl hover:scale-105 transition-all disabled:opacity-20"
              >
                {isRunning ? <Loader2 className="animate-spin" size={20} /> : <div className="p-1"><Search size={14} strokeWidth={3} /></div>}
              </button>
            </div>

      {/* Agent Log */}
      <AnimatePresence>
        {steps.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-[2rem] border transition-all duration-700 ${
                  step.status === 'running' ? 'bg-white border-[#E63946]/30 shadow-2xl scale-[1.02]' : 
                  step.status === 'done' ? 'bg-white border-green-100 shadow-sm' : 'bg-white/50 border-black/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {step.status === 'running' ? <Loader2 size={14} className="animate-spin text-[#E63946]" /> : 
                     step.status === 'done' ? <CheckCircle2 size={14} className="text-green-500" /> : 
                     <div className="w-2 h-2 rounded-full bg-black/10" />}
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Step 0{i + 1} / {step.type}</span>
                  </div>
                </div>
                <h4 className={`text-sm font-serif italic mb-3 ${step.status === 'running' ? 'text-black' : 'text-black/60'}`}>
                  {step.content}
                </h4>
                {step.results && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="mt-4 p-3 bg-black/[0.02] rounded-xl text-[10px] font-light leading-relaxed text-black/40 overflow-hidden line-clamp-4"
                   >
                     {step.results}
                   </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isRunning && steps.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-10">
          {[
            "Market research on premium EV bikes in India 2025",
            "Price comparison: MacBook Pro M4 vs Surface Pro 11",
            "SWOT analysis of Indian quick-commerce sector",
            "Latest savings rates of ICICI vs HDFC vs SBI"
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => { setQuery(prompt); }}
              className="p-6 rounded-[1.8rem] border border-black/5 bg-white/50 hover:bg-white hover:border-black/10 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-[#E63946]/10 group-hover:text-[#E63946] transition-all">
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
