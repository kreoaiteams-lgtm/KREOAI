import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Link, Check } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
}

const KreonCard: React.FC<KreonCardProps> = ({ userEmail }) => {
  const [copied, setCopied] = useState(false);

  const displayName = userEmail
    ? userEmail.split('@')[0].toUpperCase()
    : 'RESIDENT_01';

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + '/build');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 18, stiffness: 160 }}
      className="relative w-[340px] h-[520px] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
    >
      {/* ── Pure Black Base ── */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* ── Abstract Gradient Blobs ── */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#1B3FBF] blur-[90px] opacity-50 z-0" />
      <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-violet-600 blur-[80px] opacity-40 z-0" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-emerald-500 blur-[60px] opacity-20 z-0" />

      {/* ── Grain Texture ── */}
      <div
        className="absolute inset-0 z-10 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* ── Glassmorphic Inner Card ── */}
      <div className="absolute inset-5 z-20 rounded-[2.4rem] bg-white/[0.04] backdrop-blur-3xl border border-white/[0.08] flex flex-col">

        {/* Top: Badge */}
        <div className="flex justify-between items-center px-8 pt-8">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Series 01</p>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 mt-0.5">Build with KREO</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Active</span>
          </div>
        </div>

        {/* Center: KREO Identity */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8">
          {/* Glow halo */}
          <div className="absolute w-40 h-40 rounded-full bg-[#1B3FBF]/30 blur-[60px] pointer-events-none" />

          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative text-[72px] font-bold text-white tracking-[0.15em] leading-none drop-shadow-lg"
            style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
          >
            KREO
          </motion.h1>

          {/* ── The single beautiful divider line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-48 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-2"
          />

          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40">
            N — {displayName}
          </p>
        </div>

        {/* Bottom: user line + share */}
        <div className="px-8 pb-8 space-y-5">
          <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 mb-0.5">Neural Registered</p>
            <p className="text-[12px] font-mono text-white/70 truncate">{userEmail || 'guest@kreo.build'}</p>
          </div>

          {/* ── Beautiful share row ── */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-lg"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                    <Check size={12} /> Copied
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                    <Link size={12} /> Share Link
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=I'm+now+a+KREON.+Build+with+KREO+→+${window.location.origin}/build`, '_blank')}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Twitter size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "I'm a KREON", text: "Build with KREO →", url: window.location.origin + '/build' });
                }
              }}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Share2 size={14} />
            </motion.button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default KreonCard;
