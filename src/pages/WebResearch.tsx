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

const MentraNotification = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="mentra-notification px-6 py-3 rounded-2xl flex items-center gap-4 text-white group"
  >
    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{label}</span>
  </motion.div>
);

export default function WebResearch() {
  const navigate = useNavigate();
  const [data, setData] = useState<ComparisonData | null>(null);
  const [query, setQuery] = useState("");
  const [splashPhase, setSplashPhase] = useState<'phase1' | 'phase2' | 'complete'>('phase1');

  useEffect(() => {
    const p1 = setTimeout(() => setSplashPhase('phase2'), 2000);
    const p2 = setTimeout(() => setSplashPhase('complete'), 4000);
    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen mentra-mesh text-white overflow-hidden font-satoshi selection:bg-white/10">
      <div className="grain" />
      
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] text-center"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white">
              What shall we <span className="brand-font not-italic">uncover?</span>
            </h2>
          </motion.div>
        )}

        {splashPhase === 'phase2' && (
          <motion.div 
            key="splash2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] text-center"
          >
            <h1 className="text-7xl md:text-[10rem] font-normal tracking-[-0.04em] text-white brand-font leading-none">
              MENTRA
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: splashPhase === 'complete' ? 1 : 0 }}
        className="flex flex-col min-h-screen relative z-10"
      >
        {/* Minimal Header */}
        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-black/10 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-xl font-normal tracking-tight text-white brand-font leading-none pt-1">MENTRA</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
            <button className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all">
              <Share2 size={16} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col pt-20 relative">
          {!data ? (
            <section className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full max-w-3xl space-y-12 mb-12">
                <h3 className="text-5xl md:text-8xl font-normal tracking-[-0.04em] text-white brand-font">
                  MENTRA
                </h3>
                
                <CoWorkPanel
                   onManifestGenerated={(manifestData, p) => {
                     try {
                       const parsed = typeof manifestData === 'string' ? JSON.parse(manifestData) : manifestData;
                       setData(parsed);
                       setQuery(p);
                     } catch (e) {
                       console.error("Failed to parse data", e);
                     }
                   }}
                   onClose={() => navigate('/')}
                />
              </div>
            </section>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20 text-center">
              <div className="max-w-5xl mx-auto space-y-24">
                
                <div className="flex flex-col items-center space-y-8 border-b border-white/5 pb-16">
                  <button onClick={() => setData(null)} className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all">
                    New Intelligence Mission
                  </button>
                  <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white leading-tight max-w-3xl mx-auto">
                    {query}
                  </h2>
                </div>

                {/* COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-stretch">
                  {/* Option A */}
                  <div className="flex flex-col items-center space-y-8">
                    <h3 className="text-5xl font-normal tracking-[-0.04em] text-white brand-font uppercase">
                      {data.optionA.name}
                    </h3>
                    
                    <div className="w-full space-y-10 glass-card p-10 md:p-12 flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-8 w-full">
                         {Object.entries(data.optionA.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-1">
                             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{label}</span>
                             <span className="text-2xl font-serif italic text-white/90">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-8 border-t border-white/5 w-full space-y-4">
                         {data.optionA.pros.map((pro, i) => (
                           <span key={i} className="block text-sm text-white/50 font-light">{pro}</span>
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full glass border border-white/10 items-center justify-center z-10">
                    <span className="text-2xl font-serif italic text-white/10">vs</span>
                  </div>

                  {/* Option B */}
                  <div className="flex flex-col items-center space-y-8">
                    <h3 className="text-5xl font-normal tracking-[-0.04em] text-white brand-font uppercase">
                      {data.optionB.name}
                    </h3>
                    
                    <div className="w-full space-y-10 glass-card p-10 md:p-12 flex flex-col items-center">
                       <div className="grid grid-cols-1 gap-8 w-full">
                         {Object.entries(data.optionB.specs).map(([label, value]) => (
                           <div key={label} className="flex flex-col items-center gap-1">
                             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{label}</span>
                             <span className="text-2xl font-serif italic text-white/90">{value}</span>
                           </div>
                         ))}
                       </div>
                       
                       <div className="pt-8 border-t border-white/5 w-full space-y-4">
                         {data.optionB.pros.map((pro, i) => (
                           <span key={i} className="block text-sm text-white/50 font-light">{pro}</span>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                {/* VERDICT */}
                <div className="w-full">
                   <div className="glass-card p-12 md:p-24 rounded-[3rem] relative overflow-hidden border border-white/10">
                      <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Analysis Conclusion</span>
                        
                        <h4 className="text-4xl md:text-6xl font-serif italic tracking-tight leading-tight text-white max-w-4xl mx-auto">
                          {data.verdict}
                        </h4>
                        
                        <div className="pt-8 flex flex-col items-center gap-4">
                          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Primary Recommendation</span>
                          <div className="text-4xl md:text-5xl font-normal tracking-[-0.04em] text-white brand-font uppercase">
                            {data.winner === 'A' ? data.optionA.name : data.winner === 'B' ? data.optionB.name : 'Neutral'}
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                <footer className="py-16 opacity-10 flex justify-center gap-12 text-[9px] font-bold tracking-[0.3em] uppercase">
                   <span>Secure_Manifest</span>
                   <span>Synthesis_V4.2</span>
                </footer>
              </div>
            </div>
          )}

          {/* Bottom Right Notification Stack */}
          <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-3">
             <MentraNotification label="mentra_active" delay={1.5} />
             <MentraNotification label="neural_link_established" delay={1.8} />
             <MentraNotification label="truth_protocol_engaged" delay={2.1} />
          </div>
        </main>
      </motion.div>
    </div>
  );
}
