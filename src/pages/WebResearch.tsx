import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Globe, Sparkles, ShieldCheck, Crosshair, Cpu, Radio, Zap, CheckCircle2, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';
import GradientOrb from '../components/mentra/GradientOrb';
import MouseFlare from '../components/mentra/MouseFlare';

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
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#2C2415] overflow-hidden font-satoshi selection:bg-[#B49E82]/20">
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
            className="fixed inset-0 z-[200] bg-[#FAF7F2] flex flex-col items-center justify-center p-8 text-center"
          >
            <GradientOrb className="opacity-40" />
            <motion.div 
              initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl space-y-8 relative z-10"
            >
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-tight text-[#2C2415]">
                What shall we <span className="text-[#8C7B62] font-normal not-italic">uncover</span> today?
              </h2>
              <div className="w-12 h-px bg-[#2C2415]/10 mx-auto" />
              <p className="text-sm text-[#8C7B62] font-medium tracking-[0.2em] uppercase leading-relaxed">
                KREO ORCHESTRATION PROTOCOL V4.2
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
            className="fixed inset-0 z-[200] bg-[#FAF7F2] flex flex-col items-center justify-center p-8 text-center"
          >
            <GradientOrb className="opacity-60" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-8xl md:text-[12rem] font-normal tracking-[-0.04em] text-[#2C2415] brand-font leading-none">
                  MENTRA
                </h1>
                <div className="flex items-center gap-4 text-[#8C7B62] tracking-[0.4em] text-[10px] font-bold uppercase mt-4">
                  <div className="w-8 h-px bg-[#8C7B62]/20" />
                  by KREO
                  <div className="w-8 h-px bg-[#8C7B62]/20" />
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
          <GradientOrb className="top-[-20%] left-[-10%] opacity-20 scale-150" />
          <GradientOrb className="bottom-[-20%] right-[-10%] opacity-20 scale-150 rotate-180" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-6 bg-[#FAF7F2]/60 backdrop-blur-3xl border-b border-[#2C2415]/5">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C7B62] hover:text-[#2C2415] transition-all"
            >
              <div className="w-10 h-10 rounded-full border border-[#2C2415]/5 flex items-center justify-center group-hover:bg-[#2C2415] group-hover:text-[#FAF7F2] transition-all">
                <ChevronLeft size={16} />
              </div>
              <span>Sanctuary</span>
            </button>
            <div className="h-6 w-px bg-[#2C2415]/10" />
            <div className="flex flex-col">
              <span className="text-xl font-normal tracking-tight text-[#2C2415] brand-font leading-none">MENTRA</span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-[#8C7B62] uppercase mt-1">Intelligence Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#8C7B62] uppercase">Neutral_Link</span>
                <span className="text-[10px] font-mono text-[#2C2415]">STABLE_4.2.0</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse" />
            </div>
            <button className="w-12 h-12 rounded-full glass border border-white flex items-center justify-center text-[#2C2415] hover:scale-110 transition-all shadow-xl shadow-amber-900/5">
              <Share2 size={16} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-24">
          {!data ? (
            <section className="min-h-[calc(100vh-6rem)] relative w-full flex flex-col items-center justify-center py-20 px-10">
              
              <div className="w-full max-w-4xl relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20">
                  <div className="w-12 h-px bg-[#2C2415]" />
                  <Sparkles size={14} />
                  <div className="w-12 h-px bg-[#2C2415]" />
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

              <div className="mt-20 flex flex-col items-center gap-6 opacity-20">
                <div className="flex items-center gap-12">
                  <Crosshair size={12} />
                  <Zap size={12} />
                  <Globe size={12} />
                </div>
                <span className="text-[8px] font-bold tracking-[0.5em] text-[#2C2415] uppercase">Synthesizing World Context</span>
              </div>
            </section>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#FAF7F2] p-10 md:p-16 lg:p-24 relative">
              <div className="max-w-7xl mx-auto space-y-24 relative z-10">
                
                {/* Header & Reset */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-[#2C2415]/5 pb-16">
                   <div className="space-y-6">
                     <button onClick={() => setData(null)} className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8C7B62] hover:text-[#2C2415] transition-all flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full border border-[#8C7B62]/20 flex items-center justify-center">
                         <ChevronLeft size={12} />
                       </div>
                       New Intelligence Mission
                     </button>
                     <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-[#2C2415] leading-[0.9] max-w-3xl">
                       {query}
                     </h2>
                   </div>
                   <div className="flex flex-col items-start md:items-end gap-3">
                     <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#8C7B62]">Mission_Archive</span>
                     <div className="px-8 py-3 rounded-full glass border border-white text-[10px] font-bold tracking-[0.2em] text-[#2C2415] shadow-lg shadow-amber-900/5 uppercase">
                       RES_MANIFEST_ALPHA
                     </div>
                   </div>
                </div>

                {/* SIDE BY SIDE COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative">
                  {/* Option A */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="space-y-12">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#B49E82] opacity-40" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8C7B62]">Subject Alpha</span>
                       </div>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-[#2C2415] brand-font">
                         {data.optionA.name}
                       </h3>
                    </div>
                    
                    <div className="space-y-10 glass-card p-12 md:p-16 border border-white/60 shadow-2xl shadow-amber-900/[0.03]">
                       <div className="grid grid-cols-1 gap-8">
                         {Object.entries(data.optionA.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col gap-2 group">
                             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8C7B62] group-hover:text-[#2C2415] transition-colors">{label}</span>
                             <div className="h-px w-full bg-[#2C2415]/5 relative overflow-hidden">
                                <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute inset-0 bg-[#B49E82]/20" />
                             </div>
                             <span className="text-2xl font-serif italic text-[#2C2415]">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-10 space-y-6">
                         <div className="flex items-center gap-3">
                           <TrendingUp size={14} className="text-[#8C7B62]" />
                           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8C7B62]">Prime Characteristics</span>
                         </div>
                         <div className="space-y-4">
                           {data.optionA.pros.map((pro, i) => (
                             <div key={i} className="flex items-start gap-4 group">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#B49E82] mt-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                               <span className="text-base text-[#2C2415]/70 font-light leading-relaxed">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* Option B */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="space-y-12">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#B49E82] opacity-40" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8C7B62]">Subject Beta</span>
                       </div>
                       <h3 className="text-7xl font-normal tracking-[-0.04em] text-[#2C2415] brand-font">
                         {data.optionB.name}
                       </h3>
                    </div>
                    
                    <div className="space-y-10 glass-card p-12 md:p-16 border border-white/60 shadow-2xl shadow-amber-900/[0.03]">
                       <div className="grid grid-cols-1 gap-8">
                         {Object.entries(data.optionB.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col gap-2 group">
                             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8C7B62] group-hover:text-[#2C2415] transition-colors">{label}</span>
                             <div className="h-px w-full bg-[#2C2415]/5 relative overflow-hidden">
                                <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.5, delay: 0.7 }} className="absolute inset-0 bg-[#B49E82]/20" />
                             </div>
                             <span className="text-2xl font-serif italic text-[#2C2415]">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-10 space-y-6">
                         <div className="flex items-center gap-3">
                           <TrendingUp size={14} className="text-[#8C7B62]" />
                           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8C7B62]">Prime Characteristics</span>
                         </div>
                         <div className="space-y-4">
                           {data.optionB.pros.map((pro, i) => (
                             <div key={i} className="flex items-start gap-4 group">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#B49E82] mt-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                               <span className="text-base text-[#2C2415]/70 font-light leading-relaxed">{pro}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* Center VS Element */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass border border-white shadow-2xl items-center justify-center z-10">
                    <span className="text-3xl font-serif italic text-[#8C7B62]">vs</span>
                  </div>
                </div>

                {/* FINAL VERDICT */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full">
                   <div className="glass-verdict p-16 md:p-24 rounded-[4rem] relative overflow-hidden border border-white shadow-2xl shadow-amber-900/10">
                      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#B49E82]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-amber-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                        <div className="flex items-center gap-6">
                           <div className="px-6 py-2 rounded-full glass border border-white text-[10px] font-bold uppercase tracking-[0.5em] text-[#8C7B62]">Neural Synthesis</div>
                           <ShieldCheck size={24} className="text-[#B49E82]/40" />
                        </div>
                        
                        <h4 className="text-5xl md:text-7xl font-serif italic tracking-tight leading-[1] text-[#2C2415] max-w-5xl">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-10 flex flex-col items-center gap-6">
                          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#8C7B62]">Prime Directive Identified</span>
                          <div className="text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#2C2415] brand-font">
                            {data.winner === 'A' ? data.optionA.name : data.winner === 'B' ? data.optionB.name : 'Neutral Horizon'}
                          </div>
                          <div className="w-12 h-px bg-[#B49E82]/30 mt-4" />
                        </div>
                      </div>
                   </div>
                </motion.div>

                {/* Footer Readouts */}
                <div className="flex flex-wrap justify-center gap-16 py-24 opacity-30 border-t border-[#2C2415]/5">
                   <div className="flex items-center gap-4 text-[#8C7B62]">
                     <Cpu size={16} /> <span className="text-[10px] font-bold tracking-[0.3em] uppercase">MENTRA_ENGINE_4.0</span>
                   </div>
                   <div className="flex items-center gap-4 text-[#8C7B62]">
                     <Radio size={16} /> <span className="text-[10px] font-bold tracking-[0.3em] uppercase">UPLINK_SECURE</span>
                   </div>
                   <div className="flex items-center gap-4 text-[#2C2415]">
                     <AlertCircle size={16} /> <span className="text-[10px] font-bold tracking-[0.3em] uppercase">TRUTH_GUARD_ACTIVE</span>
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
