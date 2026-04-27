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
    <div className="w-full max-w-5xl mx-auto p-8 space-y-12 animate-in fade-in duration-1000">
      {/* KREO Badge / Branding */}
      <div className="flex flex-col items-center text-center space-y-2">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-0 text-center"
        >
          <h1 className="text-6xl font-serif italic tracking-tighter text-[#D2B48C] leading-none mb-1">KREO</h1>
          <div className="relative inline-block mt-[-4px]">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">co-working</span>
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
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-black/5 to-black/5 rounded-[3rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-black/5 p-2 flex items-center shadow-2xl shadow-black/5">
          <input 
            type="text" 
            placeholder="Describe your research mission... (e.g. Compare iPhone 16 vs S25 Ultra prices in India)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            disabled={isRunning}
            className="flex-1 bg-transparent px-8 py-5 text-lg outline-none font-serif italic placeholder:text-black/20"
          />
          <button 
            onClick={handleStart}
            disabled={isRunning || !query.trim()}
            className="p-4 bg-black text-white rounded-full hover:scale-110 active:scale-95 transition-all disabled:opacity-20"
          >
            {isRunning ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
          </button>
        </div>
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
    </div>
  );
};

export default CoWorkPanel;
