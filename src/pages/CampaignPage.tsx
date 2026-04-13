
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Layout, BarChart, Users, Sparkles, BrainCircuit, Play, Globe, Code, Box, Palette, Search, Mail, Smartphone, Database } from 'lucide-react';

/**
 * CampaignPage: "Build with KREO" 
 * 
 * Re-Architected for:
 * 1. Immediate Identity Pop
 * 2. Ultra-Airy Center-Aligned Hero
 * 3. Smaller, Distant, Playful Fragments (Solar System Style)
 */

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2500); // Quick transition
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX - innerWidth / 2) / 20,
      y: (clientY - innerHeight / 2) / 20,
    });
  };

  // Smaller, more distant fragment data
  const fragmentData = [
    { icon: <Globe size={14} />, title: "SYNC", x: -450, y: -220, r: -8, color: 'bg-black text-white' },
    { icon: <Database size={14} />, title: "NEURAL", x: 480, y: -250, r: 12, color: 'bg-white text-[#1B3FBF] border border-black/5' },
    { icon: <Layout size={14} />, title: "ENGINE", x: -500, y: 150, r: -15, color: 'bg-[#1B3FBF] text-white' },
    { icon: <BarChart size={14} />, title: "METRIC", x: 460, y: 200, r: 10, color: 'bg-yellow-400 text-black' },
    { icon: <Smartphone size={14} />, title: "CORE", x: -100, y: -380, r: 0, color: 'bg-white text-black border border-black/5 shadow-sm' },
    { icon: <Zap size={14} />, title: "ZAP", x: 150, y: 380, r: 0, color: 'bg-emerald-400 text-white' }
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-hidden relative"
    >
      
      {/* Premium Texture & Noise */}
      <div className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Atmospheric BG */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[#fdfdff]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmax] h-[80vmax] bg-[#1B3FBF]/[0.03] blur-[150px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: Identity Pop-Out (Immediate Start) */}
        {stage === 'reveal' && (
           <motion.div 
             key="reveal"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             transition={{ duration: 0.8 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
           >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="text-[15vw] font-bold text-[#1B3FBF] tracking-tighter"
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                KREO
              </motion.div>
           </motion.div>
        )}

        {/* STAGE 2: Ultra-Airy Centered Hero */}
        {stage === 'hero' && (
           <motion.div 
             key="hero"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-20 h-screen w-full flex flex-col items-center justify-center text-center px-12"
           >
              {/* Header Navigation */}
              <nav className="fixed top-0 left-0 right-0 z-[100] px-16 py-12 flex items-center justify-between">
                <div className="text-2xl font-bold text-black tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>KREO</div>
                <div className="flex items-center gap-12">
                   <button onClick={() => navigate('/')} className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors">Enter Studio</button>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/10">v3.0 Series 01</span>
                </div>
              </nav>

              {/* Centered Main Core */}
              <div className="relative z-10 space-y-12 max-w-5xl">
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                 >
                    <div className="flex items-center justify-center gap-4">
                       <span className="h-[1px] w-8 bg-black/10" />
                       <span className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.8em]">Manifestation Series</span>
                       <span className="h-[1px] w-8 bg-black/10" />
                    </div>
                    
                    <h1 className="text-7xl md:text-[11vw] font-bold text-black tracking-tighter leading-[0.9] relative"
                        style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                       Build <br/>
                       <span className="text-[#1B3FBF] italic font-serif font-light text-6xl md:text-[7vw]">with</span> Kreo
                    </h1>
                    
                    <p className="text-lg md:text-2xl font-serif italic text-black/20 pt-4 leading-tight max-w-xl mx-auto">
                       High-fidelity architectures established from the center of your imagination. 
                    </p>
                 </motion.div>

                 {/* Center Play Hub */}
                 <div className="relative h-40 flex items-center justify-center pt-4">
                    <motion.button 
                      onClick={() => navigate('/')}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", damping: 15 }}
                      className="group relative w-40 h-40 rounded-full bg-black text-white flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all z-[100]"
                    >
                       <div className="absolute inset-0 bg-[#1B3FBF] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
                       <div className="relative z-10 flex flex-col items-center gap-2">
                          <Play size={20} fill="white" />
                          <span className="text-[9px] font-black uppercase tracking-[0.6em] mt-1">Deploy</span>
                       </div>
                    </motion.button>
                    
                    {/* Decorative Rings around the center button */}
                    <div className="absolute w-[500px] h-[500px] border border-black/[0.03] rounded-full pointer-events-none" />
                    <div className="absolute w-[800px] h-[800px] border border-black/[0.02] rounded-full pointer-events-none" />
                 </div>
              </div>

              {/* Playful Solar-System Fragments (Smaller & Distant) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {fragmentData.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        x: item.x + (mousePos.x * (i + 1) * 0.2), 
                        y: item.y + (mousePos.y * (i + 1) * 0.2), 
                        rotate: item.r 
                      }}
                      whileHover={{ scale: 1.3, zIndex: 110, rotate: 0 }}
                      transition={{ 
                        delay: 1 + (i * 0.05), 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1],
                        scale: { type: "spring", stiffness: 400, damping: 20 }
                      }}
                      className={`absolute pointer-events-auto p-4 md:p-6 shadow-xl rounded-[2rem] border border-black/[0.02] flex items-center gap-4 cursor-pointer transition-shadow hover:shadow-black/5 ${item.color} z-10`}
                    >
                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-current opacity-10`}>
                          {item.icon}
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-widest leading-none">{item.title}</span>
                    </motion.div>
                 ))}
              </div>

              {/* Ghosted Subtitles */}
              <span className="absolute text-[30vw] font-black text-black/[0.01] pointer-events-none top-0 -left-10 tracking-tighter">STUDIO</span>
              <span className="absolute text-[30vw] font-black text-[#1B3FBF]/[0.01] pointer-events-none bottom-0 -right-10 tracking-tighter italic font-serif">ALPHA</span>

              {/* Minimalist Footer */}
              <footer className="fixed bottom-0 left-0 right-0 z-[100] px-16 py-12 flex justify-between items-end">
                 <div className="space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black">Established 2024</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">Neural Design Institute</p>
                 </div>
              </footer>

           </motion.div>
        )}

      </AnimatePresence>

      {/* Campaign Mesh Texture Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-multiply">
        <svg width="100%" height="100%">
          <pattern id="series-mesh" width="80" height="80" patternUnits="userSpaceOnUse">
             <circle cx="40" cy="40" r="1.5" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#series-mesh)" />
        </svg>
      </div>

    </div>
  );
};

export default CampaignPage;
