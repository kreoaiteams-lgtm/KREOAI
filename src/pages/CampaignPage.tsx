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
                SECTION 1 — WHITE HERO
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <svg width="100%" height="100%">
                  <pattern id="dg" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="1.5" fill="black" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dg)" />
                </svg>
              </div>

              {/* Ambient shapes */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                  className="absolute top-[17%] left-[10%] w-14 h-14 rounded-full bg-yellow-400 mix-blend-multiply opacity-75"
                />
                <motion.div
                  animate={{ x: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                  className="absolute bottom-[18%] right-[8%] w-20 h-10 rounded-full bg-emerald-400 rotate-12 mix-blend-multiply opacity-55"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-10 px-6">
                {/* Eyebrow — pure sans, no TAN */}
                <motion.span
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1B3FBF]"
                >
                  Neural Identity // Series 01
                </motion.span>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}
                  className="flex flex-col items-center"
                >
                  {/* "Build with" — sans */}
                  <p className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-none">
                    Build{' '}
                    <span className="font-light italic text-black/20">with</span>
                  </p>

                  {/* KREO — TAN-NIMBUS only */}
                  <div className="relative mt-3">
                    <h1
                      style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
                      className="text-[12vw] font-bold text-[#1B3FBF] tracking-tighter leading-none"
                    >
                      KREO
                    </h1>

                    {/* Floating pills */}
                    <motion.div
                      onMouseEnter={() => setIsHovered('sync')}
                      onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'sync' ? 1.1 : 1 }}
                      className="absolute -top-7 -left-16 px-5 py-2.5 bg-black text-white rounded-full flex items-center gap-2.5 shadow-xl cursor-pointer pointer-events-auto"
                    >
                      <Globe size={12} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Global Sync</span>
                    </motion.div>

                    <motion.div
                      onMouseEnter={() => setIsHovered('neural')}
                      onMouseLeave={() => setIsHovered(null)}
                      animate={{ scale: isHovered === 'neural' ? 1.1 : 1 }}
                      className="absolute -bottom-4 -right-14 px-5 py-2.5 bg-white border border-black/5 text-[#1B3FBF] rounded-full flex items-center gap-2.5 shadow-xl cursor-pointer pointer-events-auto"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest">Neural Core v3</span>
                      <Zap size={12} className="fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Sub-copy */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                  className="text-lg font-medium text-black/30 max-w-lg text-center leading-relaxed"
                >
                  The highest quality manifest engine for the modern architect.
                  <br />One prompt. High-fidelity reality.
                </motion.p>
              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-8 flex flex-col items-center gap-2 text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Claim your identity</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={13} />
                </motion.div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SECTION 2 — BLACK KREON CERTIFICATE
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start', background: '#020208' }}
              className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background nebula art */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Blue top-right */}
                <div className="absolute -top-48 -right-48 w-[520px] h-[520px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(27,63,191,0.6) 0%, transparent 65%)' }} />
                {/* Violet bottom-left */}
                <div className="absolute -bottom-48 -left-48 w-[520px] h-[520px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.5) 0%, transparent 65%)' }} />
                {/* Emerald mid-right */}
                <div className="absolute top-[40%] right-[5%] w-64 h-64 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(4,120,87,0.2) 0%, transparent 70%)' }} />

                {/* Orbital rings */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.09]" viewBox="0 0 1440 900" fill="none">
                  <ellipse cx="720" cy="450" rx="650" ry="400" stroke="white" strokeWidth="0.6" strokeDasharray="3 16" />
                  <ellipse cx="720" cy="450" rx="420" ry="260" stroke="white" strokeWidth="0.35" strokeDasharray="2 22" />
                  {[...Array(36)].map((_, i) => (
                    <circle key={i}
                      cx={(i * 127 + 60) % 1440} cy={(i * 83 + 50) % 900}
                      r="1.1" fill="white" opacity="0.4" />
                  ))}
                </svg>

                {/* Side vertical accent lines */}
                <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              {/* Section heading */}
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="relative z-10 text-[9px] font-black uppercase tracking-[0.6em] text-white/25 mb-6"
              >
                Your KREON identity
              </motion.p>

              {/* Card — rendered at natural size, no forced scale */}
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 22, stiffness: 130, delay: 0.1 }}
                className="relative z-10"
              >
                <KreonCard />
              </motion.div>

              {/* Scroll nudge */}
              <div className="absolute bottom-7 flex flex-col items-center gap-2 text-white/15">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Your privileges</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={12} />
                </motion.div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SECTION 3 — BLACK DETAILS + CTA
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start', background: '#040406' }}
              className="relative h-screen w-full flex items-center justify-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Ambient glow */}
              <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(27,63,191,0.1) 0%, transparent 70%)' }} />

              <div className="relative z-10 max-w-5xl w-full px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                {/* Left: copy */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1B3FBF]/30 bg-[#1B3FBF]/8">
                      <ShieldCheck size={12} className="text-[#1B3FBF]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Resident Protocol</span>
                    </div>

                    {/* sans — never TAN on text blocks */}
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                      Become<br />a KREON.
                    </h2>

                    <p className="text-base font-medium text-white/35 max-w-sm leading-relaxed">
                      Once you join the studio, you manifest more than artifacts.
                      You earn a permanent numbered identity in the KREO lineage.
                    </p>
                  </div>

                  {/* Perks */}
                  <div className="space-y-3">
                    {[
                      'Permanent numbered KREON ID (#0001 → ∞)',
                      'Full access to the Neural Manifestation Engine',
                      'Shareable certificate for your social identity',
                      'Early access to Series 02 + all future drops',
                    ].map((perk, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 w-3.5 h-3.5 rounded-full border border-[#1B3FBF]/50 flex-shrink-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />
                        </div>
                        <p className="text-[13px] text-white/45 font-medium leading-snug">{perk}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-3 pt-2">
                    <motion.button
                      onClick={() => navigate('/')}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-fit px-10 py-4 bg-white text-black rounded-full flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.35em] shadow-2xl shadow-white/10"
                    >
                      <UserPlus size={15} /> Enter the Registry
                    </motion.button>
                    <p className="text-[9px] text-white/15 uppercase tracking-[0.25em] font-medium">
                      Verified residency · Series 01
                    </p>
                  </div>
                </div>

                {/* Right: stats */}
                <div className="space-y-6">
                  {[
                    { label: 'Resident architects', value: '1,247+', accent: '#1B3FBF' },
                    { label: 'Manifests created', value: '84K+', accent: '#6d28d9' },
                    { label: 'Series', value: '01 of ∞', accent: '#047857' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                      style={{ borderLeft: `2px solid ${stat.accent}40` }}
                    >
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25 mb-1.5">{stat.label}</p>
                      <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Ghost watermark */}
              <span className="absolute bottom-0 right-8 text-[14vw] font-black text-white/[0.018] pointer-events-none tracking-tighter select-none">
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
