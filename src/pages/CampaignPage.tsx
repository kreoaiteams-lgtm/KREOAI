
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Play, Globe, Database, Smartphone, Layout, ArrowRight, Sparkles, Activity, ShieldCheck, UserPlus } from 'lucide-react';
import KreonCard from '../components/KreonCard';

/**
 * CampaignPage: "The Manifestation Machine"
 * 
 * Aesthetic: Connected Geometric
 * Section 1: Hero
 * Section 2: KREON Citizenship
 */

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={scrollContainerRef} className="h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-y-auto overflow-x-hidden relative custom-scrollbar snap-y snap-mandatory">
      
      {/* Premium Texture & Noise */}
      <div className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.04] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: Identity Pop */}
        {stage === 'reveal' && (
           <motion.div 
             key="reveal"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 0.9, y: -20 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
           >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="text-[18vw] font-bold text-[#1B3FBF] tracking-tighter"
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                KREO
              </motion.div>
           </motion.div>
        )}

        {/* STAGE 2: The Manifestation Machine Hero */}
        {stage === 'hero' && (
           <div className="relative z-20 w-full">
              
              {/* SECTION: HERO (Snap Section) */}
              <section className="h-screen w-full flex flex-col items-center justify-center snap-start relative">
                 {/* Floating Geometric Elements */}
                 <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full opacity-10">
                       <motion.path 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
                          d="M 200 300 Q 400 150 600 300" 
                          fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" 
                       />
                       <motion.path 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
                          d="M 800 500 Q 1000 650 1200 500" 
                          fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" 
                       />
                    </svg>
                    <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-yellow-400 mix-blend-multiply" />
                    <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-[25%] right-[10%] w-32 h-16 rounded-full bg-emerald-400 rotate-12 mix-blend-multiply" />
                 </div>

                 {/* Main Content Hub */}
                 <div className="relative z-10 flex flex-col items-center gap-16 max-w-7xl px-12">
                    <div className="relative group cursor-default">
                       <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center">
                          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1B3FBF] mb-12">Neural Identity // Series 01</span>
                          <div className="flex flex-col items-center relative">
                             <h2 className="text-6xl md:text-[5vw] font-bold text-black tracking-tighter leading-none mb-[-2vw] z-10">Build <span className="font-serif italic font-light text-black/20">with</span></h2>
                             <h1 className="text-9xl md:text-[18vw] font-bold text-[#1B3FBF] tracking-tighter leading-none relative" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                               KREO
                               <motion.div onMouseEnter={() => setIsHovered('sync')} onMouseLeave={() => setIsHovered(null)} animate={{ scale: isHovered === 'sync' ? 1.2 : 1 }} className="absolute -top-12 -left-20 px-8 py-4 bg-black text-white rounded-full flex items-center gap-4 shadow-2xl cursor-pointer pointer-events-auto">
                                  <Globe size={16} /> <span className="text-[9px] font-black uppercase tracking-widest leading-none">Global Sync</span>
                               </motion.div>
                               <motion.div onMouseEnter={() => setIsHovered('neural')} onMouseLeave={() => setIsHovered(null)} animate={{ scale: isHovered === 'neural' ? 1.2 : 1 }} className="absolute -bottom-8 -right-16 px-8 py-4 bg-white border border-black/5 text-[#1B3FBF] rounded-full flex items-center gap-4 shadow-2xl cursor-pointer pointer-events-auto">
                                  <span className="text-[9px] font-black uppercase tracking-widest leading-none">Neural Core v3</span> <Zap size={16} className="fill-yellow-400 text-yellow-500" />
                               </motion.div>
                             </h1>
                          </div>
                       </motion.div>
                    </div>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xl md:text-2xl font-medium text-black/30 max-w-2xl text-center leading-relaxed">
                      The highest quality manifest engine for the modern architect. <br/> One prompt to establish high-fidelity reality.
                    </motion.p>
                 </div>

                 {/* Scroll Indicator */}
                 <div className="absolute bottom-12 flex flex-col items-center gap-4 text-black/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Become a KREON</span>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-[1px] h-12 bg-current" />
                 </div>
              </section>

              {/* SECTION: CITIZENSHIP (Snap Section) */}
              <section className="h-screen w-full flex flex-col items-center justify-center snap-start relative bg-[#fcfdff] overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
                 
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-24 max-w-7xl px-12">
                    <div className="flex-1 space-y-10">
                       <div className="space-y-4">
                          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1B3FBF]/5 rounded-full border border-[#1B3FBF]/10">
                             <ShieldCheck size={14} className="text-[#1B3FBF]" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Resident Protocol</span>
                          </div>
                          <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tighter leading-none" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                             Become <br/> a KREON.
                          </h2>
                          <p className="text-xl md:text-2xl font-medium text-black/40 max-w-md leading-snug pt-4">
                             Once you join the studio, you manifest more than just artifacts. You become part of the KREON lineage.
                          </p>
                       </div>

                       <div className="flex flex-col gap-6 pt-10">
                          <motion.button 
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="w-fit px-12 py-6 bg-[#1B3FBF] text-white rounded-full flex items-center gap-4 shadow-2xl shadow-[#1B3FBF]/20"
                          >
                             <UserPlus size={20} />
                             <span className="text-xs font-black uppercase tracking-[0.4em]">Join the Registry</span>
                          </motion.button>
                          <p className="text-[10px] font-medium text-black/20 uppercase tracking-[0.2em]">Verified Orchestration Required</p>
                       </div>
                    </div>

                    <div className="flex-1 relative">
                       <div className="absolute -inset-20 bg-[#1B3FBF]/5 blur-[120px] rounded-full pointer-events-none" />
                       <KreonCard />
                    </div>
                 </div>
                 
                 {/* Ghosted Subtitle */}
                 <span className="absolute bottom-0 left-12 text-[20vw] font-black text-black/[0.02] pointer-events-none tracking-tighter">LINEAGE</span>
              </section>

           </div>
        )}

      </AnimatePresence>

      {/* Background Dot Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%"><pattern id="dot-grid" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1.5" fill="black" /></pattern><rect width="100%" height="100%" fill="url(#dot-grid)" /></svg>
      </div>

    </div>
  );
};

export default CampaignPage;
