
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Layout, BarChart, Users, Sparkles, BrainCircuit, Play, Globe, Code, Box, Palette, Search, Mail, Smartphone, Database } from 'lucide-react';

/**
 * CampaignPage: "Build with KREO" 
 * 
 * Re-Architected for:
 * 1. Full-Screen Possibilities Pile
 * 2. Center-Focused Dense but Airy Hero
 * 3. Playful Radial Interactions
 */

const EXAMPLES = [
  "Scientific Diagrams", "Market Reports", "Logic Workflows", "Financial Models", 
  "Landing Pages", "Pitch Decks", "System Architecture", "Global Strategies",
  "SaaS Dashboards", "Brand Toolkits", "Creative Scripts", "Course Curriculum",
  "App Manifests", "Neural Links", "Data Bridges", "Social Cores", "3D Vaults",
  "Auth Flows", "API Docs", "Market Manifests", "Identity Systems"
];

const PossibilitiesScene = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  // Full-screen spreading positions
  const positions = useMemo(() => {
    return EXAMPLES.map(() => ({
      x: (Math.random() * 90) - 45, // Spreads across 90% of width
      y: (Math.random() * 80) - 40, // Spreads across 80% of height
      rotate: (Math.random() * 40) - 20 
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
    }, 150); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="text-center relative z-[100] mt-16">
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-[#1B3FBF] text-[10px] font-black tracking-[0.8em] uppercase mb-4"
        >
          Neural Possibilities
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl md:text-8xl font-serif italic text-black tracking-tighter leading-none"
        >
          What you can do with KREO
        </motion.h1>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         {EXAMPLES.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ 
                opacity: i < visibleCount ? 1 : 0, 
                scale: i < visibleCount ? 1 : 0, 
                x: `${positions[i].x}vw`,
                y: `${positions[i].y}vh`,
                rotate: positions[i].rotate,
                zIndex: i 
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute p-6 md:p-10 rounded-[2.5rem] border border-[#1B3FBF]/10 shadow-2xl flex items-center justify-center min-w-[280px] bg-[#1B3FBF]"
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
    const t2 = setTimeout(() => setStage('hero'), 8000); // Transitions at 8s
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  // UI Fragment definitions for the center-radial hero
  const fragmentData = [
    { icon: <Globe size={20} />, title: "Global Sync", x: -280, y: -180, r: -5, z: 10, color: 'bg-black text-white' },
    { icon: <Database size={20} />, title: "Neural DB", x: 300, y: -200, r: 8, z: 10, color: 'bg-white text-[#1B3FBF]' },
    { icon: <Layout size={20} />, title: "UI Engine", x: -350, y: 80, r: -12, z: 30, color: 'bg-[#1B3FBF] text-white' },
    { icon: <BarChart size={20} />, title: "Live Metrics", x: 320, y: 120, r: 5, z: 30, color: 'bg-yellow-400 text-black' },
    { icon: <Smartphone size={20} />, title: "Mobile Core", x: 0, y: -280, r: 0, z: 5, color: 'bg-white text-black border-black/10' },
    { icon: <Mail size={20} />, title: "Social Sync", x: 0, y: 280, r: 0, z: 40, color: 'bg-red-400 text-white' }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-hidden relative">
      
      {/* Premium Texture & Noise */}
      <div className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Atmospheric BG */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[#fcfdff]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] bg-[#1B3FBF]/5 blur-[200px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: Full-Screen Possibilities Pile */}
        {stage === 'pile' && (
           <motion.div key="pile" exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 1 }}>
              <PossibilitiesScene />
           </motion.div>
        )}

        {/* STAGE 2: Simple Identity Pop-Out */}
        {stage === 'reveal' && (
           <motion.div 
             key="reveal"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
           >
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="text-[18vw] font-bold text-[#1B3FBF] tracking-tighter"
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                KREO
              </motion.div>
           </motion.div>
        )}

        {/* STAGE 3: Centered Airy Hero with Playful Radial fragments */}
        {stage === 'hero' && (
           <motion.div 
             key="hero"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-20 h-screen w-full flex flex-col items-center justify-center text-center px-12"
           >
              {/* Airy Header */}
              <nav className="fixed top-0 left-0 right-0 z-[100] px-16 py-12 flex items-center justify-between pointer-events-auto">
                <div className="scale-125">
                   <div className="text-xl font-bold text-black tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>KREO</div>
                </div>
                <div className="flex items-center gap-12">
                   <button onClick={() => navigate('/')} className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Studio</button>
                   <button className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Series 01</button>
                </div>
              </nav>

              {/* Main Content: Focused Center */}
              <div className="relative z-10 space-y-8 max-w-4xl">
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                 >
                    <div className="flex items-center justify-center gap-4 mb-4">
                       <span className="h-[1px] w-12 bg-[#1B3FBF]/20" />
                       <span className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.8em]">Build with Conviction</span>
                       <span className="h-[1px] w-12 bg-[#1B3FBF]/20" />
                    </div>
                    <h1 className="text-7xl md:text-[12vw] font-bold text-black tracking-tighter leading-none"
                        style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                       Build <span className="text-[#1B3FBF] font-serif italic text-6xl md:text-[8vw] block md:inline-block md:translate-y-4">with</span> Kreo
                    </h1>
                    <p className="text-2xl md:text-3xl font-serif italic text-black/20 pt-8 leading-tight max-w-2xl mx-auto">
                       High-fidelity neural manifestation for creators. <br/> 
                       The series begins at the center of your imagination.
                    </p>
                 </motion.div>

                 {/* Center Play Hub */}
                 <div className="relative h-32 flex items-center justify-center pt-8">
                    <motion.button 
                      onClick={() => navigate('/')}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", damping: 12 }}
                      className="group relative w-44 h-44 rounded-full bg-black text-white flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all z-[25]"
                    >
                       <div className="absolute inset-0 bg-[#1B3FBF] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
                       <div className="relative z-10 flex flex-col items-center gap-2">
                          <Play size={24} fill="white" />
                          <span className="text-[9px] font-black uppercase tracking-[0.6em] mt-1">Enter</span>
                       </div>
                    </motion.button>
                 </div>
              </div>

              {/* Playful Radial Fragments (Scattered Around the Center Button) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {fragmentData.map((item, i) => (
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
                      whileHover={{ scale: 1.4, zIndex: 100, rotate: 0 }}
                      transition={{ 
                        delay: 1.2 + (i * 0.1), 
                        duration: 1, 
                        ease: [0.16, 1, 0.3, 1],
                        scale: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className={`absolute pointer-events-auto p-6 md:p-8 shadow-2xl rounded-[2.5rem] border border-black/5 flex flex-col gap-4 cursor-pointer transition-shadow hover:shadow-black/10 ${item.color}`}
                      style={{ zIndex: item.z }}
                    >
                       <div className="flex justify-between items-center gap-8">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-current opacity-20`}>
                             {item.icon}
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest">{item.title}</span>
                       </div>
                       <div className="h-1 w-12 bg-current opacity-10 rounded-full" />
                    </motion.div>
                 ))}
              </div>

              {/* Distant Ghosting Elements for Depth */}
              <span className="absolute text-[30vw] font-black text-black/[0.012] pointer-events-none rotate-90 -left-20 tracking-tighter mix-blend-multiply">SERIES</span>
              <span className="absolute text-[30vw] font-black text-[#1B3FBF]/[0.012] pointer-events-none -right-20 tracking-tighter mix-blend-multiply italic font-serif">ALPHA</span>

              {/* Minimal Footer Context */}
              <footer className="fixed bottom-0 left-0 right-0 z-50 px-16 py-12 flex justify-between items-end">
                 <div className="space-y-4">
                    <div className="flex gap-1.5 overflow-hidden">
                       {[...Array(6)].map((_, i) => <motion.div key={i} animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }} className="w-10 h-0.5 bg-black/5 rounded-full" />)}
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black">Manifest v3.0 // Series 01</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">Neural Design Institute</p>
                 </div>
              </footer>

           </motion.div>
        )}

      </AnimatePresence>

      {/* Campaign Grid Mesh Layer */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-multiply">
        <svg width="100%" height="100%">
          <pattern id="campaign-mesh" width="100" height="100" patternUnits="userSpaceOnUse">
             <circle cx="50" cy="50" r="1.5" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#campaign-mesh)" />
        </svg>
      </div>

    </div>
  );
};

export default CampaignPage;
