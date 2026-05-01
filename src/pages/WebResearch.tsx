import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Globe, Sparkles, ShieldCheck, Crosshair, Cpu, Radio, Zap, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';
import CloudBackground from '../components/CloudBackground';

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
  const [isSplitView, setIsSplitView] = useState(true);
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
    <div className="flex flex-col min-h-screen bg-white text-black overflow-hidden font-satoshi selection:bg-[#1B3FBF]/10">
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <h2 className="text-6xl md:text-7xl font-light tracking-tighter leading-tight italic font-serif">
                What shall we <span className="text-[#1B3FBF]">uncover</span> today?
              </h2>
              <p className="text-lg text-black/40 font-light tracking-wide leading-relaxed">
                Enter a complex query. KREO will orchestrate a multi-step research mission across the live web to synthesize your manifest.
              </p>
            </motion.div>
          </motion.div>
        )}

        {splashPhase === 'phase2' && (
          <motion.div 
            key="splash2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] font-satoshi">Welcome</span>
                <span className="text-4xl md:text-5xl font-serif italic font-light opacity-30">to</span>
              </div>
              <h1 
                className="text-5xl md:text-7xl font-bold text-[#E63946] tracking-tighter" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Research Portal
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: splashPhase === 'complete' ? 1 : 0 }}
        className="flex flex-col min-h-screen relative"
      >
        {!data && <CloudBackground speed={0.2} />}

        {!data && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '30px 30px, 150px 150px, 150px 150px'
            }} 
          />
        )}

        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-white/40 backdrop-blur-2xl border-b border-black/[0.03]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-black transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ChevronLeft size={14} />
              </div>
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-black/10" />
            <div className="flex items-center gap-3">
              <span 
                className="text-lg font-bold tracking-tighter text-black" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Research Portal
              </span>
              <div className="px-2 py-0.5 rounded-full bg-[#E63946]/10 text-[#E63946] text-[7px] font-black uppercase tracking-widest">
                Live
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-4 opacity-40">
              <span className="text-[9px] font-mono tracking-tighter">TRUTH_PROTOCOL_ENABLED</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <button className="p-2.5 rounded-full bg-black text-white hover:scale-105 transition-all shadow-xl shadow-black/20">
              <Share2 size={14} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-16">
          {!data ? (
            <section className="min-h-[calc(100vh-4rem)] relative w-full flex flex-col items-center justify-center py-12 px-6">
              
              {/* ABSTRACT ANIMATED ELEMENTS */}
              <div className="absolute top-20 left-12 bottom-20 w-32 hidden lg:flex flex-col gap-16 justify-center">
                <div className="flex gap-1.5 h-8">
                  {Array.from({length: 8}).map((_, i) => (
                    <motion.div key={i} animate={{ height: [4, 24, 4], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }} className="w-1 bg-[#1B3FBF]" />
                  ))}
                </div>
              </div>

              <div className="w-full max-w-4xl relative">
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

              <div className="mt-12 flex items-center gap-8 opacity-10">
                <Crosshair size={12} />
                <div className="w-8 h-px bg-black" />
                <Zap size={12} />
                <div className="w-8 h-px bg-black" />
                <Globe size={12} />
              </div>
            </section>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8faff] p-8 md:p-12 lg:p-20">
              <div className="max-w-7xl mx-auto space-y-20">
                
                {/* Header & Reset */}
                <div className="flex justify-between items-end border-b border-black/5 pb-12">
                   <div className="space-y-4">
                     <button onClick={() => setData(null)} className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-[#1B3FBF] transition-all flex items-center gap-2">
                       <ChevronLeft size={14} /> New Research Mission
                     </button>
                     <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight text-black leading-tight max-w-2xl">
                       {query}
                     </h2>
                   </div>
                   <div className="text-right">
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 block mb-2">Protocol Result</span>
                     <div className="px-6 py-2 rounded-full border border-black/5 bg-white text-xs font-bold tracking-widest text-black/60">
                       CRAWL_COMPLETE_V4
                     </div>
                   </div>
                </div>

                {/* SIDE BY SIDE COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 relative">
                  {/* Option A */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-12">
                    <div className="space-y-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Option Alpha</span>
                       <h3 className="text-6xl font-bold tracking-tighter text-black" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                         {data.optionA.name}
                       </h3>
                    </div>
                    
                    <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-black/[0.02] border border-black/[0.02]">
                       <div className="grid grid-cols-1 gap-6">
                         {Object.entries(data.optionA.specs).map(([label, value]) => (
                           <div key={label} className="flex justify-between items-end border-b border-black/[0.03] pb-4">
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">{label}</span>
                             <span className="text-lg font-medium text-black/80">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-6 space-y-4">
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Core Strengths</span>
                         <div className="space-y-2">
                           {data.optionA.pros.map((pro, i) => (
                             <div key={i} className="flex items-center gap-3 text-sm text-black/60 font-light italic">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" /> {pro}
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* Option B */}
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-12">
                    <div className="space-y-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Option Beta</span>
                       <h3 className="text-6xl font-bold tracking-tighter text-black" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                         {data.optionB.name}
                       </h3>
                    </div>
                    
                    <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-black/[0.02] border border-black/[0.02]">
                       <div className="grid grid-cols-1 gap-6">
                         {Object.entries(data.optionB.specs).map(([label, value]) => (
                           <div key={label} className="flex justify-between items-end border-b border-black/[0.03] pb-4">
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">{label}</span>
                             <span className="text-lg font-medium text-black/80">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-6 space-y-4">
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Core Strengths</span>
                         <div className="space-y-2">
                           {data.optionB.pros.map((pro, i) => (
                             <div key={i} className="flex items-center gap-3 text-sm text-black/60 font-light italic">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" /> {pro}
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* Center VS Element */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white border border-black/5 shadow-xl items-center justify-center z-10">
                    <span className="text-2xl font-serif italic text-black/20">vs</span>
                  </div>
                </div>

                {/* FINAL VERDICT */}
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="w-full">
                   <div className="bg-[#1B3FBF] text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl shadow-blue-900/20">
                      {/* Decorative Flare */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="px-4 py-1 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-[0.4em] backdrop-blur-md">Final Synthesis</div>
                           <TrendingUp size={20} className="text-white/40" />
                        </div>
                        
                        <h4 className="text-4xl md:text-6xl font-serif italic tracking-tight leading-tight max-w-4xl">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-8 flex flex-col items-center gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Winner Identified</span>
                          <div className="text-3xl font-bold tracking-widest text-[#E63946]">
                            {data.winner === 'A' ? data.optionA.name : data.winner === 'B' ? data.optionB.name : 'Neutral Horizon'}
                          </div>
                          <Sparkles className="text-white animate-pulse mt-2" size={24} />
                        </div>
                      </div>
                   </div>
                </motion.div>

                {/* Footer Readouts */}
                <div className="flex flex-wrap justify-center gap-12 py-20 opacity-20 border-t border-black/5">
                   <div className="flex items-center gap-3">
                     <Cpu size={14} /> <span className="text-[9px] font-mono tracking-widest uppercase">SYSC_V4.0</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Radio size={14} /> <span className="text-[9px] font-mono tracking-widest uppercase">UP_LINK_7</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <AlertCircle size={14} /> <span className="text-[9px] font-mono tracking-widest uppercase">NO_HALLUCINATION_GUARD_ON</span>
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
