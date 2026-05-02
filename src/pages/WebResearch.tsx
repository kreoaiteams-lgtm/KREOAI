import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Globe, Sparkles, ShieldCheck, Crosshair, Cpu, Radio, Zap, CheckCircle2, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';

interface ComparisonData {
  optionA: { name: string; specs: Record<string, string>; pros: string[] };
  optionB: { name: string; specs: Record<string, string>; pros: string[] };
  verdict: string;
  winner: string;
}

const VibrantBackground = () => (
  <div className="fixed inset-0 z-0 mentra-theme">
    <div className="grain opacity-20" />
    
    {/* Additional Animated Glows for Depth */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 90, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#8A2BE2]/30 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2],
        rotate: [0, -90, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#FF4500]/20 rounded-full blur-[120px]" 
    />
  </div>
);

export default function WebResearch() {
  const navigate = useNavigate();
  const [data, setData] = useState<ComparisonData | null>(null);
  const [query, setQuery] = useState("");
  const [splashPhase, setSplashPhase] = useState<'phase1' | 'phase2' | 'complete'>('phase1');

  useEffect(() => {
    const p1 = setTimeout(() => setSplashPhase('phase2'), 3000);
    const p2 = setTimeout(() => setSplashPhase('complete'), 5500);
    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#1B3FBF] text-white overflow-hidden font-satoshi selection:bg-white/20">
      <VibrantBackground />
      
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center bg-[#1B3FBF]"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl space-y-8 relative z-10"
            >
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-tight text-white">
                What shall we <span className="text-white font-normal not-italic brand-font">uncover</span> today?
              </h2>
              <div className="w-12 h-px bg-white/40 mx-auto" />
              <p className="text-[10px] text-white/50 font-bold tracking-[0.5em] uppercase leading-relaxed">
                MENTRA INTELLIGENCE V4.2
              </p>
            </motion.div>
          </motion.div>
        )}

        {splashPhase === 'phase2' && (
          <motion.div 
            key="splash2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center bg-[#1B3FBF]"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-8xl md:text-[14rem] font-normal tracking-[-0.04em] text-white brand-font leading-none">
                  MENTRA
                </h1>
                <div className="flex items-center gap-6 text-white/40 tracking-[0.6em] text-[10px] font-bold uppercase mt-8">
                  <div className="w-12 h-px bg-white/20" />
                  BY KREO
                  <div className="w-12 h-px bg-white/20" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: splashPhase === 'complete' ? 1 : 0 }}
        className="flex flex-col min-h-screen relative z-10"
      >
        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-8 bg-black/10 backdrop-blur-3xl border-b border-white/5">
          <div className="flex items-center gap-10">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronLeft size={18} />
              </div>
              <span>Home</span>
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-normal tracking-tight text-white brand-font leading-none">MENTRA</span>
              <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase mt-2">Intelligence Stream</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-12 text-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">Protocol</span>
                <span className="text-[10px] font-mono text-white/80">SYNTH_V4.2</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            </div>
            <button className="w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-32">
          {!data ? (
            <section className="min-h-[calc(100vh-8rem)] relative w-full flex flex-col items-center justify-center py-24 px-10 text-center">
              
              <div className="w-full max-w-4xl relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20">
                  <div className="w-16 h-px bg-white" />
                  <Sparkles size={16} />
                  <div className="w-16 h-px bg-white" />
                </div>

                <div className="space-y-12 mb-16">
                  <h3 className="text-4xl md:text-7xl font-normal tracking-[-0.04em] text-white brand-font leading-none">
                    MENTRA
                  </h3>
                  <p className="text-sm text-white/40 font-medium tracking-[0.4em] uppercase">
                    Uncover the hidden patterns
                  </p>
                </div>

                <CoWorkPanel
                   onManifestGenerated={(manifestData, p) => {
                     try {
                       const parsed = typeof manifestData === 'string' ? JSON.parse(manifestData) : manifestData;
                       setData(parsed);
                       setQuery(p);
                     } catch (e) {
                       console.error("Failed to parse manifestation data", e);
                     }
                   }}
                   onClose={() => navigate('/')}
                />
              </div>

              <div className="mt-24 flex flex-col items-center gap-8 opacity-20">
                <div className="flex items-center gap-16">
                  <Crosshair size={14} />
                  <Zap size={14} />
                  <Globe size={14} />
                </div>
              </div>
            </section>
          ) : (
            <div className="flex-1 overflow-y-auto p-10 md:p-20 lg:p-32 relative text-center">
              <div className="max-w-6xl mx-auto space-y-32 relative z-10">
                
                {/* Header & Reset */}
                <div className="flex flex-col items-center space-y-10 border-b border-white/10 pb-24">
                   <div className="space-y-8 flex flex-col items-center">
                     <button onClick={() => setData(null)} className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-all flex items-center gap-4 group">
                       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <ChevronLeft size={14} />
                       </div>
                       New Intelligence Mission
                     </button>
                     <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-white leading-[0.9] max-w-4xl text-center">
                       {query}
                     </h2>
                   </div>
                   <div className="px-10 py-4 rounded-full glass border border-white/20 text-[11px] font-bold tracking-[0.4em] text-white uppercase">
                     MENTRA_SYNTH_RESULT
                   </div>
                </div>

                {/* SIDE BY SIDE COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative items-stretch">
                  {/* Option A */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/30">Subject Alpha</span>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-white brand-font">
                         {data.optionA.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 glass-card p-12 md:p-16 border border-white/10 shadow-2xl flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-10 w-full">
                         {Object.entries(data.optionA.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-3 group">
                             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">{label}</span>
                             <span className="text-3xl font-serif italic text-white/90">{value}</span>
                             <div className="h-[1px] w-12 bg-white/10 mt-2" />
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-12 space-y-8 w-full">
                         <div className="flex items-center justify-center gap-4">
                           <TrendingUp size={16} className="text-white/20" />
                           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Prime Attributes</span>
                         </div>
                         <div className="space-y-5">
                           {data.optionA.pros.map((pro, i) => (
                             <div key={i} className="flex flex-col items-center gap-3">
                               <span className="text-lg text-white/70 font-light leading-relaxed text-center">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* VS Divider */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full glass border border-white/20 shadow-2xl items-center justify-center z-10">
                    <span className="text-4xl font-serif italic text-white/20">vs</span>
                  </div>

                  {/* Option B */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/30">Subject Beta</span>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-white brand-font">
                         {data.optionB.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 glass-card p-12 md:p-16 border border-white/10 shadow-2xl flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-10 w-full">
                         {Object.entries(data.optionB.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-3 group">
                             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">{label}</span>
                             <span className="text-3xl font-serif italic text-white/90">{value}</span>
                             <div className="h-[1px] w-12 bg-white/10 mt-2" />
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-12 space-y-8 w-full">
                         <div className="flex items-center justify-center gap-4">
                           <TrendingUp size={16} className="text-white/20" />
                           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Prime Attributes</span>
                         </div>
                         <div className="space-y-5">
                           {data.optionB.pros.map((pro, i) => (
                             <div key={i} className="flex flex-col items-center gap-3">
                               <span className="text-lg text-white/70 font-light leading-relaxed text-center">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>
                </div>

                {/* FINAL VERDICT */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full">
                   <div className="glass-card p-20 md:p-32 rounded-[5rem] relative overflow-hidden border border-white/20 shadow-2xl">
                      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-white/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-16">
                        <div className="flex items-center gap-8">
                           <div className="px-8 py-3 rounded-full glass border border-white/20 text-[11px] font-bold uppercase tracking-[0.6em] text-white/60">Neural Synthesis</div>
                           <ShieldCheck size={28} className="text-white/20" />
                        </div>
                        
                        <h4 className="text-5xl md:text-8xl font-serif italic tracking-tight leading-[0.95] text-white max-w-6xl mx-auto">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-12 flex flex-col items-center gap-8">
                          <span className="text-[11px] font-bold uppercase tracking-[1em] text-white/30">Synthesized Recommendation</span>
                          <div className="text-5xl md:text-7xl font-normal tracking-[-0.04em] text-white brand-font">
                            {data.winner === 'A' ? data.optionA.name : data.winner === 'B' ? data.optionB.name : 'Neutral Horizon'}
                          </div>
                          <div className="w-24 h-px bg-white/20 mt-6" />
                        </div>
                      </div>
                   </div>
                </motion.div>

                {/* Footer Readouts */}
                <div className="flex flex-wrap justify-center gap-20 py-32 opacity-20 border-t border-white/5">
                   <div className="flex items-center gap-4 text-white">
                     <Cpu size={18} /> <span className="text-[10px] font-bold tracking-[0.4em] uppercase">MENTRA_X7_SYNTH</span>
                   </div>
                   <div className="flex items-center gap-4 text-white">
                     <Radio size={18} /> <span className="text-[10px] font-bold tracking-[0.4em] uppercase">LINK_SECURE</span>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </motion.div>
    </div>
  );
}
