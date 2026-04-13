
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Layout, BarChart, Users, Sparkles, BrainCircuit, Play, Globe, Code, Box, Palette } from 'lucide-react';

/**
 * CampaignPage: "Build with KREO" 
 * 
 * Sequence:
 * 1. Possibilities Pile ("What you can do with KREO")
 * 2. High-Performance Identity Reveal
 * 3. Elevated Dense Hero (Premium Curation)
 */

const EXAMPLES = [
  "Scientific Diagrams", "Market Reports", "Logic Workflows", "Financial Models", 
  "Landing Pages", "Pitch Decks", "System Architecture", "Global Strategies",
  "SaaS Dashboards", "Brand Toolkits", "Creative Scripts", "Course Curriculum"
];

const PossibilitiesScene = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  const positions = useMemo(() => {
    return EXAMPLES.map(() => ({
      x: (Math.random() * 60) - 30, 
      y: (Math.random() * 50) - 25, 
      rotate: (Math.random() * 30) - 15 
    }));
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= EXAMPLES.length) {
        clearInterval(interval);
      }
    }, 200); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="text-center relative z-[100] mt-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.8em] uppercase mb-4">Neural Possibilities</p>
        <h1 className="text-5xl md:text-7xl font-serif italic text-black tracking-tighter leading-none">What you can do with KREO</h1>
      </div>
      
      <div className="relative flex-1 w-full flex items-center justify-center">
         {EXAMPLES.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 150 }}
              animate={{ 
                opacity: i < visibleCount ? 1 : 0, 
                scale: i < visibleCount ? 1 : 0.5, 
                x: `${positions[i].x}vw`,
                y: `${positions[i].y}vh`,
                rotate: positions[i].rotate,
                zIndex: i 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute p-6 md:p-10 rounded-[2.5rem] border border-[#1B3FBF]/10 shadow-2xl flex items-center justify-center min-w-[300px] bg-[#1B3FBF]"
            >
              <span className="text-white font-serif italic text-xl md:text-2xl tracking-tighter leading-none">{text}</span>
            </motion.div>
         ))}
      </div>
    </div>
  );
};

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'pile' | 'reveal' | 'hero'>('pile');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('reveal'), 4500);
    const t2 = setTimeout(() => setStage('hero'), 8500);
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-hidden relative">
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[#fcfdff]" />
         <div className="absolute -top-[20%] -left-[10%] w-[100vmax] h-[100vmax] bg-[#1B3FBF]/5 blur-[150px] rounded-full animate-drift-slow" />
         <div className="absolute -bottom-[20%] -right-[10%] w-[80vmax] h-[80vmax] bg-[#4F75FF]/5 blur-[120px] rounded-full animate-drift-slower" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: Possibilities Pile */}
        {stage === 'pile' && (
           <motion.div key="pile" exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} transition={{ duration: 1 }}>
              <PossibilitiesScene />
           </motion.div>
        )}

        {/* STAGE 2: High-Performance Identity Reveal */}
        {stage === 'reveal' && (
           <motion.div 
             key="reveal"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
           >
              <div className="relative flex items-center justify-center">
                <motion.span
                   initial={{ x: 0, scale: 1.5, opacity: 0 }}
                   animate={{ x: -120, scale: 1, opacity: 1 }}
                   transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                   className="text-[15vw] font-bold text-[#1B3FBF] tracking-tighter drop-shadow-2xl"
                   style={{ fontFamily: "'TAN-NIMBUS', 'Satoshi', sans-serif" }}
                >
                  K
                </motion.span>
                <div className="overflow-hidden flex items-center justify-center">
                   <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      transition={{ delay: 1.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[15vw] font-bold text-[#1B3FBF] tracking-tighter whitespace-nowrap block ml-[-100px]"
                      style={{ fontFamily: "'TAN-NIMBUS', 'Satoshi', sans-serif" }}
                   >
                      REO
                   </motion.span>
                </div>
                
                {/* Neural Pulse */}
                <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                   transition={{ delay: 1.8, duration: 1.5 }}
                   className="absolute inset-0 border-2 border-[#1B3FBF] rounded-full"
                />
              </div>
           </motion.div>
        )}

        {/* STAGE 3: Elevated Dense Hero */}
        {stage === 'hero' && (
           <motion.div 
             key="hero"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-20 min-h-screen w-full flex flex-col pt-32 px-12 pb-12"
           >
              {/* Header Navigation */}
              <nav className="fixed top-0 left-0 right-0 z-[100] px-12 py-12 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-12">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#1B3FBF] shadow-[0_0_15px_rgba(27,63,191,0.5)]" />
                      <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black">Network Alpha</span>
                   </div>
                   <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.5em] text-black/20 italic">Studio Manifestation / Series 01</span>
                </div>
                <div className="pointer-events-auto flex items-center gap-8">
                   <button onClick={() => navigate('/')} className="text-[11px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">Documentation</button>
                   <button 
                     onClick={() => navigate('/')}
                     className="px-8 py-3 bg-[#1B3FBF] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-[#1B3FBF]/20"
                   >
                     Enter Manifest
                   </button>
                </div>
              </nav>

              <div className="flex-1 flex flex-col md:flex-row items-center gap-24 relative">
                 
                 {/* Left Architectural Typography */}
                 <div className="flex-1 space-y-4 relative">
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                         <span className="h-[2px] w-12 bg-[#1B3FBF]" />
                         <span className="text-[#1B3FBF] text-[11px] font-black uppercase tracking-[0.6em]">Campaign Premiere</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-serif italic text-black/40 tracking-tight leading-none mb-2 lowercase">
                         orchestrate your
                      </h2>
                      <div className="relative">
                         <h1 className="text-[10vw] md:text-[15vw] font-bold text-black tracking-tighter leading-[0.8] relative z-10"
                             style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                            Build <br/>
                            <span className="text-[#1B3FBF]">with</span> <br/>
                            Kreo
                         </h1>
                         {/* Playful Floating Labels Layered in Text */}
                         <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-1/4 -right-12 px-6 py-3 bg-white border border-black/5 shadow-xl rounded-2xl rotate-12 z-20">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">v3.Neural_Core</span>
                         </motion.div>
                      </div>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="text-2xl md:text-4xl font-serif italic text-black/20 max-w-xl pt-12 leading-[1.1]"
                    >
                       Where logic meets high-fidelity aesthetics. The premiere interface for the modern architect.
                    </motion.p>
                 </div>

                 {/* Right: The High-Fidelity Artifact Pile (Density) */}
                 <div className="relative w-full max-w-2xl h-[700px] flex items-center justify-center">
                    
                    {/* Layered Cards representing Density */}
                    {[
                      { icon: <Globe />, title: "Market Manifest", x: -80, y: -160, r: -6, color: 'bg-black text-white' },
                      { icon: <Code />, title: "Logic Bridge", x: 120, y: -100, r: 12, color: 'bg-white text-[#1B3FBF]' },
                      { icon: <Box />, title: "3D Vault", x: -140, y: 140, r: -12, color: 'bg-[#1B3FBF] text-white' },
                      { icon: <Palette />, title: "Brand Identity", x: 100, y: 180, r: 6, color: 'bg-yellow-400 text-black' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: item.x, y: item.y, rotate: item.r }}
                        transition={{ delay: 1.8 + (i * 0.2), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute p-8 shadow-2xl rounded-[2.5rem] flex flex-col gap-6 ring-1 ring-black/[0.03] ${item.color} min-w-[240px]`}
                      >
                         <div className="flex justify-between items-center">
                            <div className="w-10 h-10 rounded-xl bg-current opacity-20 flex items-center justify-center" />
                            <div className="flex gap-1">
                               {[...Array(3)].map((_, j) => <div key={j} className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />)}
                            </div>
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-3">
                               <span className="opacity-60">{item.icon}</span>
                               <span className="text-[11px] font-black uppercase tracking-widest">{item.title}</span>
                            </div>
                            <div className="h-1 w-20 bg-current opacity-10 rounded-full" />
                         </div>
                      </motion.div>
                    ))}

                    {/* Massive Floating Text Background */}
                    <span className="absolute text-[35vw] font-black text-black/[0.015] pointer-events-none -bottom-1/4 -right-1/4 tracking-tighter mix-blend-multiply">SERIES</span>

                    {/* Enter Button (Magnetic Influence) */}
                    <motion.button 
                      onClick={() => navigate('/')}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 2.6, type: "spring", stiffness: 100 }}
                      className="group relative w-56 h-56 rounded-full bg-[#1B3FBF] text-white flex items-center justify-center shadow-[0_0_120px_rgba(27,63,191,0.4)] hover:scale-105 transition-all outline-none"
                    >
                       <div className="absolute inset-2 border border-white/30 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                       <div className="absolute inset-4 border border-white/10 rounded-full" />
                       <div className="relative z-10 flex flex-col items-center gap-3 overflow-hidden">
                          <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                             <Play size={28} fill="white" />
                          </motion.div>
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] mt-1">Deploy.</span>
                       </div>
                       
                       {/* Floating Decorative Rings */}
                       <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full border border-black/5 flex items-center justify-center text-black/10">
                          <Zap size={20} />
                       </div>
                    </motion.button>
                 </div>

              </div>

              {/* Advanced Footer Context */}
              <footer className="mt-auto flex justify-between items-end border-t border-black/[0.04] pt-12">
                 <div className="flex gap-20">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Campaign Metrics</p>
                       <div className="flex items-center gap-6">
                          <div className="text-center">
                             <div className="text-xl font-bold tracking-tighter">105B</div>
                             <div className="text-[8px] font-black uppercase text-black/20 tracking-widest text-[#1B3FBF]">Neural Core</div>
                          </div>
                          <div className="w-[1px] h-6 bg-black/5" />
                          <div className="text-center">
                             <div className="text-xl font-bold tracking-tighter">0.02s</div>
                             <div className="text-[8px] font-black uppercase text-black/20 tracking-widest">Latency</div>
                          </div>
                       </div>
                    </div>
                    <div className="hidden lg:block space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 italic">Global Sync Status</p>
                       <div className="flex gap-2">
                          {[...Array(8)].map((_, i) => <motion.div key={i} animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} className="w-6 h-1 bg-[#1B3FBF] rounded-full" />)}
                       </div>
                    </div>
                 </div>
                 
                 <div className="text-right space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-black mb-2 opacity-10">Established 2024</p>
                    <div className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.2em] text-black/30 max-w-[30ch]">
                       A Series Premiere by the Kreo Studio Team. <br/> Unbound by traditional constraints.
                    </div>
                 </div>
              </footer>

           </motion.div>
        )}

      </AnimatePresence>

      {/* Campaign Mesh Texture Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] grayscale">
        <svg width="100%" height="100%">
          <pattern id="premium-grid" width="80" height="80" patternUnits="userSpaceOnUse">
             <circle cx="40" cy="40" r="1" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#premium-grid)" />
        </svg>
      </div>

    </div>
  );
};

export default CampaignPage;
