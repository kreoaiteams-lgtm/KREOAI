
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, UserPlus } from 'lucide-react';
import KreonCard from '../components/KreonCard';

/**
 * CampaignPage — "Build with KREO"
 *
 * Typography rule:
 *   TAN-NIMBUS  →  only the word "KREO" in the hero h1 + the identity reveal
 *   Everything else  →  system sans (Inter / Satoshi)
 */

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-y-auto overflow-x-hidden relative snap-y snap-mandatory">

      {/* Noise */}
      <div
        className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <AnimatePresence mode="wait">

        {/* ─── STAGE 1: Identity Pop ─── */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
          >
            <motion.span
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 11, stiffness: 180 }}
              className="text-[18vw] font-bold text-[#1B3FBF] tracking-tighter"
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
            >
              KREO
            </motion.span>
          </motion.div>
        )}

        {/* ─── STAGE 2: Hero + Citizenship ─── */}
        {stage === 'hero' && (
          <div className="relative z-20 w-full">

            {/* ══ SECTION 1: HERO ══ */}
            <section className="h-screen w-full flex flex-col items-center justify-center snap-start relative overflow-hidden">

              {/* Ambient geometric shapes */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{ y: [0, -22, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute top-[18%] left-[12%] w-20 h-20 rounded-full bg-yellow-400 mix-blend-multiply opacity-70"
                />
                <motion.div
                  animate={{ x: [0, 18, 0] }}
                  transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
                  className="absolute bottom-[22%] right-[9%] w-28 h-14 rounded-full bg-emerald-400 rotate-12 mix-blend-multiply opacity-60"
                />
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                  <motion.path
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }}
                    d="M 150 320 Q 380 120 620 320"
                    fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="10 10"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.6 }}
                    d="M 820 460 Q 1020 620 1240 460"
                    fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="10 10"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-14 px-12">

                {/* Eyebrow label — sans, NOT TAN */}
                <motion.span
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1B3FBF]"
                >
                  Neural Identity // Series 01
                </motion.span>

                {/* Headline stack */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="flex flex-col items-center"
                >
                  {/* "Build with" — sans font */}
                  <h2 className="text-5xl md:text-[4.5vw] font-bold text-black tracking-tight leading-none mb-[-1.5vw] z-10">
                    Build{' '}
                    <span className="font-light italic text-black/25">with</span>
                  </h2>

                  {/* "KREO" — TAN-NIMBUS only for this one word */}
                  <div className="relative">
                    <h1
                      className="text-[22vw] font-bold text-[#1B3FBF] tracking-tighter leading-none mt-6"
                      style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
                    >
                      KREO
                    </h1>

                    {/* Floating pill: Global Sync */}
                    <motion.div
                      onMouseEnter={() => setIsHovered('sync')}
                      onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'sync' ? 1.15 : 1 }}
                      className="absolute -top-10 -left-24 px-7 py-3.5 bg-black text-white rounded-full flex items-center gap-3 shadow-2xl cursor-pointer pointer-events-auto"
                    >
                      <Globe size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Global Sync</span>
                    </motion.div>

                    {/* Floating pill: Neural Core */}
                    <motion.div
                      onMouseEnter={() => setIsHovered('neural')}
                      onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'neural' ? 1.15 : 1 }}
                      className="absolute -bottom-6 -right-20 px-7 py-3.5 bg-white border border-black/5 text-[#1B3FBF] rounded-full flex items-center gap-3 shadow-2xl cursor-pointer pointer-events-auto"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest">Neural Core v3</span>
                      <Zap size={14} className="fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Sub-copy — sans */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-xl md:text-2xl font-medium text-black/30 max-w-2xl text-center leading-relaxed"
                >
                  The highest quality manifest engine for the modern architect.
                  <br />
                  One prompt to establish high-fidelity reality.
                </motion.p>
              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-10 flex flex-col items-center gap-3 text-black/20">
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Become a KREON</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-[1px] h-10 bg-current"
                />
              </div>
            </section>

            {/* ══ SECTION 2: CITIZENSHIP ══ */}
            <section className="h-screen w-full flex flex-col items-center justify-center snap-start relative bg-[#fafbff] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-20 max-w-7xl px-12">

                {/* Left copy — all sans */}
                <div className="flex-1 space-y-10">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1B3FBF]/5 rounded-full border border-[#1B3FBF]/10">
                      <ShieldCheck size={13} className="text-[#1B3FBF]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Resident Protocol</span>
                    </div>

                    {/* "Become a KREON." — sans, NOT TAN */}
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-none">
                      Become<br />a KREON.
                    </h2>

                    <p className="text-xl font-medium text-black/40 max-w-md leading-snug">
                      Once you join the studio, you manifest more than just artifacts.
                      You become part of the KREON lineage.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <motion.button
                      onClick={() => navigate('/')}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-fit px-12 py-5 bg-[#1B3FBF] text-white rounded-full flex items-center gap-4 shadow-2xl shadow-[#1B3FBF]/25 font-black text-xs uppercase tracking-[0.4em]"
                    >
                      <UserPlus size={18} /> Join the Registry
                    </motion.button>
                    <p className="text-[10px] font-medium text-black/20 uppercase tracking-[0.2em]">
                      Verified Orchestration Required
                    </p>
                  </div>
                </div>

                {/* Right: KREON card */}
                <div className="flex-1 flex justify-center relative">
                  <div className="absolute -inset-20 bg-[#1B3FBF]/5 blur-[120px] rounded-full pointer-events-none" />
                  <KreonCard />
                </div>
              </div>

              {/* Ghost watermark */}
              <span className="absolute bottom-0 left-10 text-[20vw] font-black text-black/[0.02] pointer-events-none tracking-tighter select-none">
                LINEAGE
              </span>
            </section>

          </div>
        )}

      </AnimatePresence>

      {/* Dot-grid bg */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%">
          <pattern id="dot-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

    </div>
  );
};

export default CampaignPage;
