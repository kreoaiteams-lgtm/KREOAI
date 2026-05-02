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

const CinematicBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#02040a] overflow-hidden">
    {/* Base Grainy Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#02040a] to-[#0a1128] opacity-80" />
    <div className="grain opacity-20" />
    
    {/* Atmospheric Cloud-like Glows */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#1B3FBF]/20 rounded-full blur-[150px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.1, 0.15, 0.1],
        x: [0, -50, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#00e5ff]/5 rounded-full blur-[150px]" 
    />

    {/* Vertical Streaks */}
    <div className="absolute inset-0 vertical-streaks opacity-[0.03]" />
    
    {/* Horizon Light */}
    <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#1B3FBF]/10 to-transparent blur-[100px] opacity-40" />
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
    <div className="flex flex-col min-h-screen bg-[#02040a] text-white overflow-hidden font-satoshi selection:bg-[#1B3FBF]/20">
      <CinematicBackground />
      
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center bg-[#02040a]"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl space-y-8 relative z-10"
            >
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-tight text-white">
                What shall we <span className="text-[#1B3FBF] font-normal not-italic">uncover</span> today?
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto" />
              <p className="text-[10px] text-white/30 font-bold tracking-[0.5em] uppercase leading-relaxed">
                KREO RESEARCH ENGINE V5.0
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
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center bg-[#02040a]"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 relative z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.8em] text-white/20 uppercase mb-4">Welcome to</span>
                <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-white brand-font leading-none uppercase">
                  Research Portal
                </h1>
                <div className="flex items-center gap-6 text-[#1B3FBF] tracking-[0.4em] text-[10px] font-bold uppercase mt-8">
                  <div className="w-12 h-px bg-[#1B3FBF]/20" />
                  POWERED BY KREO
                  <div className="w-12 h-px bg-[#1B3FBF]/20" />
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
        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-8 bg-[#02040a]/40 backdrop-blur-3xl border-b border-white/5">
          <div className="flex items-center gap-10">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#1B3FBF] group-hover:text-white group-hover:border-[#1B3FBF] transition-all">
                <ChevronLeft size={18} />
              </div>
              <span>Back</span>
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white brand-font leading-none uppercase">Research Portal</span>
              <span className="text-[8px] font-bold tracking-[0.4em] text-[#1B3FBF] uppercase mt-2">Intelligence Stream</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-12 text-center">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">Network</span>
                <span className="text-[10px] font-mono text-white/60">COBALT_LINK_SECURE</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#1B3FBF] animate-pulse ring-4 ring-[#1B3FBF]/10" />
            </div>
            <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1B3FBF] hover:text-white hover:border-[#1B3FBF] transition-all shadow-2xl">
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
                  <h3 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-white leading-tight">
                    Analyze the <span className="text-[#1B3FBF] font-normal not-italic uppercase brand-font">Unseen</span>
                  </h3>
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
            <div className="flex-1 overflow-y-auto p-10 md:p-20 lg:p-32 relative text-center">
              <div className="max-w-6xl mx-auto space-y-32 relative z-10">
                
                {/* Header & Reset */}
                <div className="flex flex-col items-center space-y-10 border-b border-white/5 pb-24">
                   <div className="space-y-8 flex flex-col items-center">
                     <button onClick={() => setData(null)} className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 hover:text-[#1B3FBF] transition-all flex items-center gap-4 group">
                       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#1B3FBF] group-hover:bg-[#1B3FBF] transition-all">
                         <ChevronLeft size={14} className="group-hover:text-white" />
                       </div>
                       New Research Mission
                     </button>
                     <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-white leading-[0.9] max-w-4xl text-center">
                       {query}
                     </h2>
                   </div>
                   <div className="px-10 py-4 rounded-full bg-[#1B3FBF]/10 border border-[#1B3FBF]/20 text-[11px] font-bold tracking-[0.4em] text-[#1B3FBF] uppercase">
                     Synthesis_Result_V5
                   </div>
                </div>

                {/* SIDE BY SIDE COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative items-stretch">
                  {/* Option A */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Alpha Subject</span>
                       <h3 className="text-7xl font-bold tracking-tighter text-white brand-font uppercase">
                         {data.optionA.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 bg-white/5 backdrop-blur-3xl p-12 md:p-16 border border-white/5 shadow-2xl rounded-[3rem] flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-10 w-full">
                         {Object.entries(data.optionA.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-3 group">
                             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-[#1B3FBF] transition-colors">{label}</span>
                             <span className="text-3xl font-serif italic text-white/90">{value}</span>
                             <div className="h-[1px] w-12 bg-white/10 mt-2" />
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-12 space-y-8 w-full">
                         <div className="flex items-center justify-center gap-4">
                           <TrendingUp size={16} className="text-white/20" />
                           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Key Specs</span>
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

                  {/* VS Divider */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#1B3FBF]/10 backdrop-blur-3xl border border-[#1B3FBF]/20 shadow-2xl items-center justify-center z-10">
                    <span className="text-4xl font-serif italic text-white/10">vs</span>
                  </div>

                  {/* Option B */}
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex flex-col items-center space-y-12">
                    <div className="space-y-6 flex flex-col items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Beta Subject</span>
                       <h3 className="text-7xl font-bold tracking-tighter text-white brand-font uppercase">
                         {data.optionB.name}
                       </h3>
                    </div>
                    
                    <div className="w-full space-y-12 bg-white/5 backdrop-blur-3xl p-12 md:p-16 border border-white/5 shadow-2xl rounded-[3rem] flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-10 w-full">
                         {Object.entries(data.optionB.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-3 group">
                             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-[#1B3FBF] transition-colors">{label}</span>
                             <span className="text-3xl font-serif italic text-white/90">{value}</span>
                             <div className="h-[1px] w-12 bg-white/10 mt-2" />
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-12 space-y-8 w-full">
                         <div className="flex items-center justify-center gap-4">
                           <TrendingUp size={16} className="text-white/20" />
                           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Key Specs</span>
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

                {/* FINAL VERDICT */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full">
                   <div className="bg-[#1B3FBF]/5 backdrop-blur-3xl p-20 md:p-32 rounded-[5rem] relative overflow-hidden border border-[#1B3FBF]/20 shadow-2xl shadow-[#1B3FBF]/5">
                      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[#1B3FBF]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-16">
                        <div className="flex items-center gap-8">
                           <div className="px-8 py-3 rounded-full bg-[#1B3FBF]/10 border border-[#1B3FBF]/20 text-[11px] font-bold uppercase tracking-[0.6em] text-[#1B3FBF]">Final Synthesis</div>
                           <ShieldCheck size={28} className="text-[#1B3FBF]/40" />
                        </div>
                        
                        <h4 className="text-5xl md:text-8xl font-serif italic tracking-tight leading-[0.95] text-white max-w-6xl mx-auto">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-12 flex flex-col items-center gap-8">
                          <span className="text-[11px] font-bold uppercase tracking-[1em] text-white/20">Synthesized Recommendation</span>
                          <div className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1B3FBF] brand-font uppercase">
                            {data.winner === 'A' ? data.optionA.name : data.winner === 'B' ? data.optionB.name : 'Neutral Horizon'}
                          </div>
                          <div className="w-24 h-px bg-[#1B3FBF]/20 mt-6" />
                        </div>
                      </div>
                   </div>
                </motion.div>

                {/* Footer Readouts */}
                <div className="flex flex-wrap justify-center gap-20 py-32 opacity-20 border-t border-white/5">
                   <div className="flex items-center gap-4 text-white">
                     <Cpu size={18} /> <span className="text-[10px] font-bold tracking-[0.4em] uppercase">COBALT_SYNTH_V5</span>
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
