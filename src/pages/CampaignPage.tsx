import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, UserPlus, ArrowDown } from 'lucide-react';
import KreonCard, { KreonCardVisual } from '../components/KreonCard';

/**
 * CampaignPage — "Build with KREO"
 *
 * 3 snap sections:
 *  1. White hero  — KREO smaller, "Build with" text
 *  2. Pure black  — Full-screen KREON certificate (the card IS the section)
 *  3. Black       — Details, perks, CTA, share
 */

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-screen overflow-y-auto overflow-x-hidden relative snap-y snap-mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[1000] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <AnimatePresence mode="wait">

        {/* ─────── STAGE 1: Identity Pop ─────── */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.92, y: -30 }}
            transition={{ exit: { duration: 0.5 } }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 160 }}
              className="text-[18vw] font-bold text-[#1B3FBF] tracking-tighter select-none"
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
            >
              KREO
            </motion.span>
          </motion.div>
        )}

        {/* ─────── STAGE 2: 3-section journey ─────── */}
        {stage === 'hero' && (
          <div className="w-full">

            {/*═══════════════════════════════════════════
                  SECTION 1 — WHITE HERO
            ═══════════════════════════════════════════*/}
            <section
              className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white snap-start"
            >
              {/* Ambient shapes */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 6 }}
                  className="absolute top-[16%] left-[11%] w-16 h-16 rounded-full bg-yellow-400 mix-blend-multiply opacity-80" />
                <motion.div animate={{ x: [0, 16, 0] }} transition={{ repeat: Infinity, duration: 7 }}
                  className="absolute bottom-[20%] right-[8%] w-24 h-12 rounded-full bg-emerald-400 rotate-12 mix-blend-multiply opacity-60" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]">
                  <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }}
                    d="M 80 350 Q 350 100 650 350" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="8 12" />
                </svg>
              </div>

              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <svg width="100%" height="100%">
                  <pattern id="dg" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="1.5" fill="black" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dg)" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-12 px-8">
                {/* Eyebrow — sans only */}
                <motion.span
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1B3FBF]"
                >
                  Neural Identity // Series 01
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
                  className="flex flex-col items-center"
                >
                  {/* "Build with" — sans, no TAN */}
                  <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-none">
                    Build{' '}
                    <span className="font-light italic text-black/20">with</span>
                  </h2>

                  {/* "KREO" — only TAN-NIMBUS usage on this page */}
                  <div className="relative mt-4">
                    <h1
                      className="text-[13vw] font-bold text-[#1B3FBF] tracking-tighter leading-none"
                      style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
                    >
                      KREO
                    </h1>

                    {/* Pills */}
                    <motion.div
                      onMouseEnter={() => setIsHovered('sync')} onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'sync' ? 1.12 : 1, x: isHovered === 'sync' ? -6 : 0 }}
                      className="absolute -top-8 -left-20 px-6 py-3 bg-black text-white rounded-full flex items-center gap-3 shadow-2xl cursor-pointer pointer-events-auto"
                    >
                      <Globe size={13} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Global Sync</span>
                    </motion.div>

                    <motion.div
                      onMouseEnter={() => setIsHovered('neural')} onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'neural' ? 1.12 : 1 }}
                      className="absolute -bottom-4 -right-16 px-6 py-3 bg-white border border-black/5 text-[#1B3FBF] rounded-full flex items-center gap-3 shadow-2xl cursor-pointer pointer-events-auto"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest">Neural Core v3</span>
                      <Zap size={13} className="fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Sub-copy */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                  className="text-lg md:text-xl font-medium text-black/30 max-w-xl text-center leading-relaxed"
                >
                  The highest quality manifest engine for the modern architect.
                  <br />One prompt. High-fidelity reality.
                </motion.p>
              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-10 flex flex-col items-center gap-3 text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Scroll — Claim your identity</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={14} />
                </motion.div>
              </div>
            </section>


            {/*═══════════════════════════════════════════
                  SECTION 2 — BLACK KREON CERTIFICATE
            ═══════════════════════════════════════════*/}
            <section
              className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-start"
              style={{ background: '#000' }}
            >
              {/* Full-bleed abstract BG art */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Big blue halo */}
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(27,63,191,0.55) 0%, transparent 70%)' }} />
                {/* Violet halo */}
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)' }} />
                {/* Emerald accent */}
                <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)' }} />

                {/* Orbital rings */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 900" fill="none">
                  <ellipse cx="720" cy="450" rx="600" ry="380" stroke="white" strokeWidth="0.6" strokeDasharray="4 16" />
                  <ellipse cx="720" cy="450" rx="420" ry="260" stroke="white" strokeWidth="0.4" strokeDasharray="2 20" />
                  {/* Scattered dots */}
                  {[...Array(40)].map((_, i) => (
                    <circle key={i}
                      cx={(i * 113 + 80) % 1440}
                      cy={(i * 79 + 60) % 900}
                      r="1.2" fill="white" opacity="0.5"
                    />
                  ))}
                </svg>

                {/* Vertical subtle lines */}
                <div className="absolute inset-y-0 left-[10%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-y-0 right-[10%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              {/* The Card — centered, scaled large */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.1 }}
                  style={{ transform: 'scale(1.18)', transformOrigin: 'center' }}
                >
                  <KreonCard />
                </motion.div>
              </div>

              {/* Bottom scroll nudge */}
              <div className="absolute bottom-8 flex flex-col items-center gap-3 text-white/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Your privileges await</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={14} />
                </motion.div>
              </div>
            </section>


            {/*═══════════════════════════════════════════
                  SECTION 3 — BLACK DETAILS + CTA
            ═══════════════════════════════════════════*/}
            <section
              className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-start"
              style={{ background: '#050505' }}
            >
              {/* Subtle top border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Faint ambient glow */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(27,63,191,0.12) 0%, transparent 70%)' }} />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-24 max-w-6xl px-12 w-full">

                {/* Left: Identity manifest */}
                <div className="flex-1 space-y-10">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1B3FBF]/30 bg-[#1B3FBF]/10">
                      <ShieldCheck size={12} className="text-[#1B3FBF]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Resident Protocol</span>
                    </div>

                    {/* Sans — not TAN */}
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                      Become<br />a KREON.
                    </h2>

                    <p className="text-lg font-medium text-white/35 max-w-md leading-relaxed">
                      Once you join the studio, you manifest more than just artifacts.
                      You become part of a lineage of architects who build the future.
                    </p>
                  </div>

                  {/* Perks list */}
                  <div className="space-y-3">
                    {[
                      'Your numbered KREON ID — permanent, immutable',
                      'Access to the Neural Manifestation Engine',
                      'Shareable certificate for your social identity',
                      'Priority access to Series 02 + beyond',
                    ].map((perk, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-4 h-4 rounded-full border border-[#1B3FBF]/60 flex items-center justify-center mt-0.5 shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />
                        </div>
                        <p className="text-[13px] font-medium text-white/50">{perk}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-4 pt-4">
                    <motion.button
                      onClick={() => navigate('/')}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-fit px-10 py-5 bg-white text-black rounded-full flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-white/10"
                    >
                      <UserPlus size={16} /> Enter the Registry
                    </motion.button>
                    <p className="text-[10px] font-medium text-white/15 uppercase tracking-[0.2em]">
                      Verified residency · Series 01
                    </p>
                  </div>
                </div>

                {/* Right: compact card repeat */}
                <div className="flex-1 flex justify-center">
                  <div className="opacity-60 scale-90">
                    <KreonCard />
                  </div>
                </div>
              </div>

              {/* Ghosted watermark */}
              <span className="absolute bottom-0 right-8 text-[16vw] font-black text-white/[0.015] pointer-events-none tracking-tighter select-none">
                LINEAGE
              </span>
            </section>

          </div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default CampaignPage;
