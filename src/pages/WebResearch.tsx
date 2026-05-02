import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Globe, Sparkles, ShieldCheck, Crosshair, Cpu, Radio, Zap, CheckCircle2, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';
import { GradientOrb } from '../components/mentra/GradientOrb';
import { MouseFlare } from '../components/mentra/MouseFlare';

interface ComparisonData {
  optionA: { name: string; specs: Record<string, string>; pros: string[] };
  optionB: { name: string; specs: Record<string, string>; pros: string[] };
  verdict: string;
  winner: string;
}

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
    <div className="mentra-theme flex flex-col min-h-screen bg-[#050505] text-white overflow-hidden font-satoshi selection:bg-white/10">
      <div className="grain" />
      <MouseFlare />
      
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
          >
            <GradientOrb hue="sky" className="opacity-20 scale-150" blur={120} />
            <motion.div 
              initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl space-y-8 relative z-10"
            >
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-tight text-white">
                What shall we <span className="text-white/40 font-normal not-italic">uncover</span> today?
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto" />
              <p className="text-[10px] text-white/30 font-bold tracking-[0.5em] uppercase leading-relaxed">
                MENTRA_CORE_V4
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
            className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
          >
            <GradientOrb hue="lavender" className="opacity-30 scale-150" blur={120} />
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
                <div className="flex items-center gap-6 text-white/20 tracking-[0.6em] text-[10px] font-bold uppercase mt-8">
                  <div className="w-12 h-px bg-white/10" />
                  by KREO
                  <div className="w-12 h-px bg-white/10" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: splashPhase === 'complete' ? 1 : 0 }}
        className="flex flex-col min-h-screen relative"
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <GradientOrb hue="sky" className="top-[-30%] left-[-20%] opacity-10 scale-150" blur={150} />
          <GradientOrb hue="lavender" className="bottom-[-30%] right-[-20%] opacity-10 scale-150 rotate-180" blur={150} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-8 bg-[#050505]/40 backdrop-blur-3xl border-b border-white/5">
          <div className="flex items-center gap-10">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronLeft size={18} />
              </div>
              <span>Back</span>
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-normal tracking-tight text-white brand-font leading-none">MENTRA</span>
              <span className="text-[8px] font-bold tracking-[0.4em] text-white/20 uppercase mt-2">Intelligence Manifest</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-12 text-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">Core_Status</span>
                <span className="text-[10px] font-mono text-white/60">ACTIVE_X7</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 animate-pulse ring-4 ring-white/5" />
            </div>
            <button className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-32">
          {!data ? (
            <section className="min-h-[calc(100vh-8rem)] relative w-full flex flex-col items-center justify-center py-24 px-10 text-center">
              
              <div className="w-full max-w-4xl relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-10">
                  <div className="w-16 h-px bg-white" />
                  <Sparkles size={16} />
                  <div className="w-16 h-px bg-white" />
                </div>

                <div className="space-y-12 mb-16">
                  <h3 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-white/80 leading-tight">
                    Analyze the <span className="text-white">Unseen</span>
                  </h3>
                  <p className="text-sm text-white/30 font-medium tracking-[0.3em] uppercase">
                    Deep Intelligence Protocol Enabled
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

              <div className="mt-24 flex flex-col items-center gap-8 opacity-10">
                <div className="flex items-center gap-16">
                  <Crosshair size={14} />
                  <Zap size={14} />
                  <Globe size={14} />
                </div>
              </div>
            </section>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#050505] p-10 md:p-20 lg:p-32 relative text-center">
              <div className="max-w-6xl mx-auto space-y-32 relative z-10">
                
                {/* Header & Reset */}
                <div className="flex flex-col items-center space-y-10 border-b border-white/5 pb-24">
                   <div className="space-y-8 flex flex-col items-center">
                     <button onClick={() => setData(null)} className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 hover:text-white transition-all flex items-center gap-4 group">
                       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                         <ChevronLeft size={14} />
                       </div>
                       New Intelligence Mission
                     </button>
                     <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-white leading-[0.9] max-w-4xl text-center">
                       {query}
                     </h2>
                   </div>
                   <div className="px-10 py-4 rounded-full glass border border-white/10 text-[11px] font-bold tracking-[0.4em] text-white/60 uppercase">
                     Synthesis_Result_Alpha
                   </div>
                </div>

                {/* SIDE BY SIDE COMPARISON - CENTERED COLUMN ON SMALL, SIDE BY SIDE ON LARGE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative items-stretch">
                  {/* Option A */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Alpha Subject</span>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-white brand-font">
                         {data.optionA.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 glass-card p-12 md:p-16 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col items-center">
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
                               <span className="text-lg text-white/60 font-light leading-relaxed text-center">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* VS Divider for Large Screens */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full glass border border-white/10 shadow-2xl items-center justify-center z-10">
                    <span className="text-4xl font-serif italic text-white/10">vs</span>
                  </div>

                  {/* Option B */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Beta Subject</span>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-white brand-font">
                         {data.optionB.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 glass-card p-12 md:p-16 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col items-center">
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
                               <span className="text-lg text-white/60 font-light leading-relaxed text-center">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>
                </div>

                {/* FINAL VERDICT - CENTERED & DOMINANT */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full">
                   <div className="glass-verdict p-20 md:p-32 rounded-[5rem] relative overflow-hidden border border-white/10 shadow-[0_60px_150px_rgba(0,0,0,0.8)]">
                      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-white/5 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-16">
                        <div className="flex items-center gap-8">
                           <div className="px-8 py-3 rounded-full glass border border-white/20 text-[11px] font-bold uppercase tracking-[0.6em] text-white/40">Final Analysis</div>
                           <ShieldCheck size={28} className="text-white/10" />
                        </div>
                        
                        <h4 className="text-5xl md:text-8xl font-serif italic tracking-tight leading-[0.95] text-white max-w-6xl mx-auto">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-12 flex flex-col items-center gap-8">
                          <span className="text-[11px] font-bold uppercase tracking-[1em] text-white/20">Synthesized Recommendation</span>
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
                     <Cpu size={18} /> <span className="text-[10px] font-bold tracking-[0.4em] uppercase">MENTRA_SYNTH_X1</span>
                   </div>
                   <div className="flex items-center gap-4 text-white">
                     <Radio size={18} /> <span className="text-[10px] font-bold tracking-[0.4em] uppercase">DOWNLINK_SECURE</span>
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
