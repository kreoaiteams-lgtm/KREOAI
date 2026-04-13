import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Link, Check, Twitter } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
  cardRef?: React.RefObject<HTMLDivElement>;
}

/** Deterministic card number from email string, or increment global counter */
function getCardNumber(email?: string): string {
  if (!email) {
    const stored = localStorage.getItem('kreo_card_number');
    if (stored) return stored;
    // Assign next number in sequence
    const next = parseInt(localStorage.getItem('kreo_global_counter') || '0');
    const padded = String(next).padStart(4, '0');
    localStorage.setItem('kreo_card_number', padded);
    localStorage.setItem('kreo_global_counter', String(next + 1));
    return padded;
  }
  // Hash email to consistent 4-digit number (0-9999)
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) >>> 0;
  }
  return String(hash % 10000).padStart(4, '0');
}

export const KreonCardVisual = React.forwardRef<HTMLDivElement, { userEmail?: string; cardNumber: string }>(
  ({ userEmail, cardNumber }, ref) => {
    const displayName = userEmail
      ? userEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase()
      : 'KREO RESIDENT';

    return (
      <div
        ref={ref}
        className="relative w-[420px] h-[600px] rounded-[2.8rem] overflow-hidden"
        style={{ background: '#000' }}
      >
        {/* ── Abstract Background Art ── */}

        {/* Large blue orb top-right */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(27,63,191,0.8) 0%, transparent 70%)' }} />

        {/* Violet orb bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)' }} />

        {/* Emerald accent mid */}
        <div className="absolute top-1/2 -right-10 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)' }} />

        {/* Abstract SVG lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 420 600" fill="none">
          <circle cx="210" cy="300" r="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="210" cy="300" r="150" stroke="white" strokeWidth="0.3" strokeDasharray="2 12" />
          <line x1="0" y1="300" x2="420" y2="300" stroke="white" strokeWidth="0.4" />
          <line x1="210" y1="0" x2="210" y2="600" stroke="white" strokeWidth="0.4" />
          {/* Corner marks */}
          <path d="M 20 20 L 20 50 M 20 20 L 50 20" stroke="white" strokeWidth="1.2" />
          <path d="M 400 20 L 400 50 M 400 20 L 370 20" stroke="white" strokeWidth="1.2" />
          <path d="M 20 580 L 20 550 M 20 580 L 50 580" stroke="white" strokeWidth="1.2" />
          <path d="M 400 580 L 400 550 M 400 580 L 370 580" stroke="white" strokeWidth="1.2" />
          {/* Scattered dots */}
          {[...Array(24)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 67 + 30) % 420}
              cy={(i * 97 + 50) % 600}
              r="1"
              fill="white"
              opacity="0.4"
            />
          ))}
        </svg>

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        {/* ── Card Number Badge (top-right) ── */}
        <div className="absolute top-7 right-7 z-30 flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">#</span>
          <span className="text-2xl font-black text-white/80 tracking-widest" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {cardNumber}
          </span>
        </div>

        {/* ── Inner Glassmorphic Panel ── */}
        <div className="absolute inset-8 z-20 rounded-[2rem] flex flex-col items-center justify-center gap-5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>

          {/* Top label */}
          <div className="absolute top-7 left-8">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25">Build with</p>
          </div>

          {/* KREO Wordmark */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 180 }}
            className="text-[88px] font-bold text-white tracking-widest leading-none"
            style={{ fontFamily: "'TAN-NIMBUS', sans-serif", textShadow: '0 0 80px rgba(27,63,191,0.6)' }}
          >
            KREO
          </motion.h1>

          {/* Single divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            className="w-52 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
          />

          {/* Name */}
          <div className="text-center space-y-1">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/35">Resident Architect</p>
            <p className="text-xl font-bold text-white/85 tracking-wider" style={{ fontFamily: 'inherit' }}>
              {displayName}
            </p>
          </div>

          {/* Bottom status line */}
          <div className="absolute bottom-7 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Neural Sync Active</span>
          </div>
        </div>
      </div>
    );
  }
);

KreonCardVisual.displayName = 'KreonCardVisual';

/* ─────────────────────────────────────────────────────────── */

const KreonCard: React.FC<KreonCardProps> = ({ userEmail }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cardNumber] = useState(() => getCardNumber(userEmail));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/build`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      // Dynamic import so it doesn't crash if not installed
      const html2canvas = (await import('html2canvas' as any).catch(() => null))?.default;
      if (!html2canvas) {
        // Fallback: just share link
        handleCopyLink();
        return;
      }
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `kreon-card-${cardNumber}.png`;
      a.click();
    } catch (e) {
      console.error('Capture failed', e);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      const html2canvas = (await import('html2canvas' as any).catch(() => null))?.default;
      if (html2canvas && navigator.share) {
        const canvas = await html2canvas(cardRef.current, { backgroundColor: '#000', scale: 2, useCORS: true, logging: false });
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `kreon-${cardNumber}.png`, { type: 'image/png' });
          try {
            await navigator.share({
              title: `I'm KREON #${cardNumber}`,
              text: `Just joined the KREO registry as resident #${cardNumber}. Build with KREO →`,
              url: `${window.location.origin}/build`,
              files: [file],
            });
          } catch {
            // If file share fails, share without file
            await navigator.share({ title: `KREON #${cardNumber}`, url: `${window.location.origin}/build` });
          }
        });
      } else {
        handleCopyLink();
      }
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* The Card */}
      <KreonCardVisual ref={cardRef} userEmail={userEmail} cardNumber={cardNumber} />

      {/* Share Row */}
      <div className="flex items-center gap-3 w-[420px]">
        {/* Copy Link */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.35em] shadow-lg shadow-white/10"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="c" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Check size={13} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="l" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Link size={13} /> Share Link
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Download Card */}
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleDownloadCard}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-all relative"
        >
          {isCapturing ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download size={16} />
          )}
        </motion.button>

        {/* Twitter */}
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.open(
            `https://twitter.com/intent/tweet?text=I%27m+KREON+%23${cardNumber}+%E2%80%94+just+joined+the+KREO+registry.+Build+with+KREO+%E2%86%92&url=${encodeURIComponent(window.location.origin + '/build')}`,
            '_blank'
          )}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-all"
        >
          <Twitter size={16} />
        </motion.button>

        {/* Native Share (includes image) */}
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleNativeShare}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-all"
        >
          <Share2 size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export default KreonCard;
