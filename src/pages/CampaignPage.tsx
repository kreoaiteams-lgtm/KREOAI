import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, UserPlus, ArrowDown } from 'lucide-react';
import KreonCard from '../components/KreonCard';

/**
 * CampaignPage — "Build with KREO"
 *
 * 3 snap sections:
 *  1. White hero        — KREO wordmark + "Build with"
 *  2. Pure black        — KREON certificate fills the screen (card + share)
 *  3. Black details     — perks, CTA, join registry
 */
const floatingItems = [
  { label: 'Generate Wireframes', left: 20, top: 30, color: 'bg-blue-100/80 text-blue-700', initialX: window.innerWidth * 0.2, initialY: window.innerHeight * 0.3 },
  { label: 'Export to Code', left: 70, top: 20, color: 'bg-indigo-100/80 text-indigo-700', initialX: window.innerWidth * 0.7, initialY: window.innerHeight * 0.2 },
  { label: 'UI Prototyping', left: 50, top: 60, color: 'bg-green-100/80 text-green-700', initialX: window.innerWidth * 0.5, initialY: window.innerHeight * 0.6 },
  { label: 'Live Collaboration', left: 15, top: 70, color: 'bg-orange-100/80 text-orange-700', initialX: window.innerWidth * 0.15, initialY: window.innerHeight * 0.7 },
  { label: 'Component Library', left: 80, top: 70, color: 'bg-rose-100/80 text-rose-700', initialX: window.innerWidth * 0.8, initialY: window.innerHeight * 0.7 },
];

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-screen overflow-y-auto overflow-x-hidden relative"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Noise */}
      <div
        className="fixed inset-0 z-[900] pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay' }}
      />

      <AnimatePresence mode="wait">

        {/* ─── REVEAL: identity pop ─── */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.93, y: -24 }}
            transition={{ exit: { duration: 0.45 } }}
            className="fixed inset-0 z-[800] flex items-center justify-center bg-white"
          >
            <motion.span
              initial={{ scale: 0.45, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 9, stiffness: 150 }}
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              className="text-[16vw] font-bold text-[#1B3FBF] tracking-tighter select-none"
            >
              KREO
            </motion.span>
          </motion.div>
        )}

        {stage === 'hero' && (
          <div>

            {/* ══════════════════════════════════════════
                SCREEN 1 — "WHAT YOU CAN DO WITH KREO" (REPEL LOGIC)
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg width="100%" height="100%">
                  <pattern id="dg1" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="black" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dg1)" />
                </svg>
              </div>

              <div className="relative z-20 text-center pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF] mb-4 block">
                  Capability Engine
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none mb-4">
                  What you can do with <br />
                  <span className="text-[#1B3FBF]" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>KREO</span>
                </h1>
                <p className="text-sm font-medium text-black/40">Move your mouse to interact</p>
              </div>

              {/* Floating repulsion items */}
              {floatingItems.map((item, i) => {
                // Calculate distance from mouse
                const dx = mousePos.x - item.initialX;
                const dy = mousePos.y - item.initialY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 250;
                
                let ox = 0;
                let oy = 0;
                
                if (distance < repelRadius && distance > 0) {
                  const force = (repelRadius - distance) / repelRadius;
                  ox = -(dx / distance) * force * 100;
                  oy = -(dy / distance) * force * 100;
                }

                return (
                  <motion.div
                    key={i}
                    animate={{ x: ox, y: oy }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ position: 'absolute', left: `${item.left}%`, top: `${item.top}%` }}
                    className={`px-5 py-3 rounded-full text-xs font-bold shadow-lg border border-white/50 backdrop-blur-md cursor-default select-none ${item.color}`}
                  >
                    {item.label}
                  </motion.div>
                );
              })}

              <div className="absolute bottom-8 flex flex-col items-center gap-2 text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Scroll down</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={13} />
                </motion.div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SCREEN 2 — "BUILD YOUR IMAGINATION." (WHITE + GRAPHICS)
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-[#f8f9fa] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Grain */}
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.04]"
                   style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

              <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center">
                
                {/* Smaller top text */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative mb-2">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight leading-[1]">
                    Build your
                    <br />
                    imagination.
                  </h2>
                  
                  {/* Graphics added around text */}
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute -top-12 -left-16 opacity-80 mix-blend-multiply">
                    <svg width="60" height="60" viewBox="0 0 60 60"><path d="M 30 10 L 32 28 L 50 30 L 32 32 L 30 50 L 28 32 L 10 30 L 28 28 Z" fill="#facc15" /></svg>
                  </motion.div>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -bottom-8 -right-12 opacity-80 mix-blend-multiply">
                    <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#3b82f6" /></svg>
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute top-1/2 -right-24 opacity-80 mix-blend-multiply">
                    <svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" rx="6" fill="#f97316" transform="rotate(15 25 25)"/></svg>
                  </motion.div>
                </motion.div>

                {/* BIGGER "with KREO" */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 flex flex-col items-center justify-center relative z-10">
                  <span className="text-sm font-bold uppercase tracking-[0.4em] text-black/30 mb-2">with</span>
                  <span className="text-7xl sm:text-[130px] font-bold text-[#1B3FBF] tracking-tighter leading-none" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                    KREO
                  </span>
                </motion.div>

                {/* CTA merged into this screen */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-14 flex flex-col items-center gap-3">
                  <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-black text-white rounded-full flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#1B3FBF] transition-colors"
                  >
                    <UserPlus size={16} /> Enter the Studio
                  </motion.button>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/40">Open for Registry</p>
                  </div>
                </motion.div>

              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-8 w-full flex justify-center text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">View Identity Protocol</span>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SCREEN 3 — BLACK KREON CERTIFICATE
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start', background: '#020208' }}
              className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-20" />

              {/* Side vertical accent lines */}
              <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Section heading */}
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="relative z-10 text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-8"
              >
                Your Permanent Identity
              </motion.p>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.1 }}
                className="relative z-10"
              >
                <KreonCard />
              </motion.div>
              
            </section>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignPage;
