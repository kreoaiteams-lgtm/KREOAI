
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Layout, BarChart, Users, Sparkles, BrainCircuit, Play } from 'lucide-react';

/**
 * CampaignPage: "Build with KREO" 
 * 
 * Sequence:
 * 1. Scenario Pile (Promo4 Style)
 * 2. Identity Reveal (K -> REO)
 * 3. Dense & Beautiful Hero (TAN-NIMBUS)
 */

// --- SUB-COMPONENTS FROM PROMO 4 ---

const ScenarioCard = ({ text, subtext, index }: { text: string; subtext: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.95, rotate: (index % 2 === 0 ? -2 : 2) }}
    animate={{ 
      opacity: 1, 
      y: index * 10, 
      rotate: (index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0),
      scale: 1, 
      zIndex: index 
    }}
    exit={{ opacity: 0, y: -100, scale: 0.9, transition: { duration: 0.5 } }}
    transition={{ delay: index * 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="absolute w-full max-w-xl p-8 rounded-[2.5rem] border bg-[#1B3FBF] border-white/20 text-white shadow-2xl"
  >
    <div className="text-center space-y-2">
      <h2 className="text-xl md:text-2xl font-serif italic tracking-tight">{text}</h2>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{subtext}</p>
    </div>
  </motion.div>
);

const SCENARIOS = [
  { t: "Meeting in 2 hours. No deck.", s: "Neural Visualization" },
  { t: "FD @ 7.5% vs SIP @ 12%.", s: "Market Analysis" },
  { t: "Startup needs a landing page.", s: "Rapid Manifestation" },
  { t: "Physics project due at 9 AM.", s: "Logic Systems" },
  { t: "Client pitch at noon.", s: "Studio Presence" }
];

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'scenarios' | 'reveal' | 'hero'>('scenarios');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('reveal'), 4500); // Scene 0
    const t2 = setTimeout(() => setStage('hero'), 8500);   // Scene 1 (Reveal)
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-hidden relative">
      
      {/* Background Depth Layers */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[#f8f9ff]/50" />
         <div className="absolute -top-1/4 -left-1/4 w-[80vmax] h-[80vmax] bg-[#1B3FBF]/5 blur-[120px] rounded-full animate-drift-slow" />
         <div className="absolute -bottom-1/4 -right-1/4 w-[60vmax] h-[60vmax] bg-[#4F75FF]/5 blur-[120px] rounded-full animate-drift-slower" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: Scenario Pile (Promo4 Intro) */}
        {stage === 'scenarios' && (
           <motion.div 
             key="stage0"
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-white"
           >
             <div className="text-center mb-12 relative z-10">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.6em] uppercase mb-4 animate-pulse">Series Premiere</p>
                <h1 className="text-5xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight">We all face situations</h1>
             </div>
             <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center">
                {SCENARIOS.map((card, i) => (
                  <ScenarioCard key={i} index={i} text={card.t} subtext={card.s} />
                ))}
             </div>
           </motion.div>
        )}

        {/* STAGE 1: Identity Reveal (K -> REO) */}
        {stage === 'reveal' && (
           <motion.div 
             key="stage1"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
           >
              <div className="relative flex items-center justify-center">
                <motion.span
                   initial={{ x: 0, scale: 1.2 }}
                   animate={{ x: -100, scale: 1 }}
                   transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                   className="text-[12vw] font-bold text-[#1B3FBF] tracking-tighter"
                   style={{ fontFamily: "'TAN-NIMBUS', 'Satoshi', sans-serif" }}
                >
                  K
                </motion.span>
                <motion.span
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: -80 }}
                   transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                   className="text-[12vw] font-bold text-[#1B3FBF] tracking-tighter overflow-hidden whitespace-nowrap"
                   style={{ fontFamily: "'TAN-NIMBUS', 'Satoshi', sans-serif" }}
                >
                   REO
                </motion.span>
                
                {/* Visual Glitch / Sparkle on reveal */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ delay: 2, duration: 0.5 }}
                   className="absolute inset-0 bg-[#1B3FBF]/10 blur-xl rounded-full scale-150"
                />
              </div>
           </motion.div>
        )}

        {/* STAGE 2: Dense & Beautiful Hero (The Build) */}
        {stage === 'hero' && (
           <motion.div 
             key="stage2"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-20 min-h-screen w-full flex flex-col pt-32 px-12 pb-12"
           >
              {/* Header */}
              <nav className="fixed top-0 left-0 right-0 z-[100] px-12 py-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-10">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Active Node</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Manifestation v3.0</span>
                </div>
                <div className="pointer-events-auto">
                   <button 
                     onClick={() => navigate('/')}
                     className="px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10"
                   >
                     Launch Studio
                   </button>
                </div>
              </nav>

              {/* Main Dense Hero Section */}
              <div className="flex-1 flex flex-col md:flex-row items-center gap-20">
                 
                 {/* Left: Deep Typography */}
                 <div className="flex-1 space-y-2 relative">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] mb-4 block">Limited Series Launch</span>
                      <h2 className="text-4xl md:text-6xl font-serif italic text-black tracking-tight leading-none mb-4 lowercase">
                         start your current
                      </h2>
                      <h1 className="text-8xl md:text-[14vw] font-bold text-black tracking-tighter leading-[0.85] relative"
                          style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                         Build <br/>
                         <span className="text-[#1B3FBF]">with</span> <br/>
                         Kreo
                         
                         {/* Secondary Floating Text Layer */}
                         <motion.span 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5 }}
                            className="absolute -top-12 -right-12 text-[10px] font-black uppercase tracking-[0.8em] text-black/10 writing-vertical"
                          >
                           Imagination Established
                         </motion.span>
                      </h1>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="text-xl md:text-3xl font-serif italic text-black/30 max-w-xl pt-8 leading-tight"
                    >
                       A high-fidelity neural interface for creators who build with absolute conviction. The series defines the new standard.
                    </motion.p>
                 </div>

                 {/* Right: The Pile of Manifestations (Density) */}
                 <div className="relative w-full max-w-xl h-[600px] flex items-center justify-center">
                    
                    {/* Layered Decorative Elements */}
                    <div className="absolute inset-0 bg-[#1B3FBF]/5 rounded-[4rem] rotate-12 -z-10 blur-2xl" />
                    
                    {/* Floating Manifestations (Representing Density) */}
                    {[
                      { icon: <Layout />, title: "App Manifest", x: -40, y: -100, r: -4, d: 0 },
                      { icon: <BarChart />, title: "Data Bridge", x: 100, y: -40, r: 8, d: 0.2 },
                      { icon: <Users />, title: "Social Core", x: -80, y: 120, r: -8, d: 0.4 },
                      { icon: <BrainCircuit />, title: "Neural Link", x: 60, y: 160, r: 4, d: 0.6 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          x: item.x, 
                          y: item.y, 
                          rotate: item.r 
                        }}
                        transition={{ delay: 1.5 + item.d, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute p-6 bg-white border border-black/5 shadow-2xl rounded-[2rem] flex items-center gap-4 group hover:scale-110 transition-transform cursor-pointer"
                      >
                         <div className="w-12 h-12 bg-[#1B3FBF] rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                            {item.icon}
                         </div>
                         <div className="space-y-0.5 pr-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">{item.title}</span>
                            <div className="h-1.5 w-16 bg-black/5 rounded-full overflow-hidden">
                               <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }} className="w-full h-full bg-[#1B3FBF]/20" />
                            </div>
                         </div>
                      </motion.div>
                    ))}

                    {/* Massive Background Logo Ghost */}
                    <span className="absolute text-[30vw] font-black text-black/[0.02] pointer-events-none -bottom-20 -right-20 tracking-tighter">STUDIO</span>

                    {/* Interactive Start Trigger */}
                    <motion.button 
                      onClick={() => navigate('/')}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.2, type: "spring", damping: 12 }}
                      className="group relative w-48 h-48 rounded-full bg-black text-white flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.15)] hover:scale-105 transition-all outline-none"
                    >
                       <div className="absolute inset-2 border-2 border-white/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                       <div className="relative z-10 flex flex-col items-center gap-2">
                          <Play size={24} fill="white" />
                          <span className="text-[9px] font-black uppercase tracking-[0.5em] mt-2">Enter.</span>
                       </div>
                    </motion.button>
                 </div>

              </div>

              {/* Bottom Details Row */}
              <footer className="mt-auto flex flex-col md:flex-row justify-between items-end gap-10">
                 <div className="space-y-6">
                    <div className="flex gap-2">
                       {[...Array(5)].map((_, i) => <div key={i} className="w-8 h-1 bg-black/5 rounded-full" />)}
                    </div>
                    <div className="flex items-center gap-8">
                       <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">Serie 01 Premiere</span>
                       <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/20">Manifesting 24/7</span>
                    </div>
                 </div>
                 
                 <div className="text-right space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]">Studio Credits</div>
                    <p className="max-w-[18ch] text-[10px] font-medium leading-relaxed uppercase tracking-widest text-black/30">
                       Engineered for Absolute Conviction and Neural Clarity.
                    </p>
                 </div>
              </footer>

           </motion.div>
        )}

      </AnimatePresence>

      {/* Atmospheric Mesh Grid Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30">
        <svg width="100%" height="100%">
          <pattern id="campaign-grid" width="60" height="60" patternUnits="userSpaceOnUse">
             <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#campaign-grid)" />
        </svg>
      </div>

    </div>
  );
};

export default CampaignPage;
