import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Link, Check, Twitter } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
}

function getCardNumber(email?: string): string {
  const stored = localStorage.getItem('kreo_card_number');
  if (stored) return stored;
  if (email) {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash * 31 + email.charCodeAt(i)) >>> 0;
    }
    const n = String(hash % 10000).padStart(4, '0');
    localStorage.setItem('kreo_card_number', n);
    return n;
  }
  const next = parseInt(localStorage.getItem('kreo_global_counter') || '1247');
  const padded = String(next).padStart(4, '0');
  localStorage.setItem('kreo_card_number', padded);
  localStorage.setItem('kreo_global_counter', String(next + 1));
  return padded;
}

/* ── The visual card (forwardRef so we can capture it) ── */
export const KreonCardVisual = React.forwardRef<
  HTMLDivElement,
  { userEmail?: string; cardNumber: string }
>(({ userEmail, cardNumber }, ref) => {
  const displayName = userEmail
    ? userEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase()
    : 'KREO RESIDENT';

  return (
    <div
      ref={ref}
      style={{
        width: '380px',
        height: '540px',
        background: '#040406',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.1)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* ── Breathtaking Nebula Background ── */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-15%',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,63,191,0.55) 0%, rgba(27,63,191,0.1) 40%, transparent 65%)',
        filter: 'blur(30px)',
      }}/>
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.45) 0%, rgba(109,40,217,0.1) 40%, transparent 65%)',
        filter: 'blur(30px)',
      }}/>
      <div style={{
        position: 'absolute', top: '40%', left: '40%',
        transform: 'translate(-50%, -50%)',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}/>

      {/* Grain / Noise over abstract background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }}/>

      {/* Subtle orbital rings matching the campaign page vibe */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 380 540">
        <circle cx="190" cy="270" r="220" stroke="white" strokeWidth="0.5" strokeDasharray="2 12" fill="none"/>
        <circle cx="190" cy="270" r="140" stroke="white" strokeWidth="0.5" strokeDasharray="1 8" fill="none"/>
      </svg>

      {/* ── Glassmorphic Inner Certificate Panel ── */}
      <div style={{
        position: 'absolute', inset: '16px', zIndex: 20,
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        
        {/* Number and Label */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Build with
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>#</span>
            <span style={{ fontSize: '20px', fontWeight: 900, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}>
              {cardNumber}
            </span>
          </div>
        </div>

        {/* Central Identity Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 24px' }}>
          
          <h1 style={{
             fontSize: '100px', fontWeight: 700,
             fontFamily: "'TAN-NIMBUS', sans-serif",
             color: 'white', letterSpacing: '0.08em',
             lineHeight: 1, textShadow: '0 10px 40px rgba(27,63,191,0.6)',
             marginBottom: '20px'
          }}>
            KREO
          </h1>

          <div style={{
             width: '100%', height: '1px', marginBottom: '24px',
             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent)'
          }}/>

          <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Resident Architect
          </p>
          <p style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.15em', color: 'white', textTransform: 'uppercase', textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {displayName}
          </p>

        </div>

        {/* Bottom Neural Status Indicator */}
        <div style={{ position: 'absolute', bottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px rgba(16,185,129,0.8)', animation: 'pulse 2s infinite' }}/>
          <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Neural Sync Active
          </span>
        </div>

      </div>
    </div>
  );
});
KreonCardVisual.displayName = 'KreonCardVisual';

/* ─────────────────────────────────────────────── */

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

  const captureCard = async (): Promise<HTMLCanvasElement | null> => {
    if (!cardRef.current) return null;
    try {
      const mod = await import('html2canvas').catch(() => null);
      const html2canvas = (mod as any)?.default ?? mod;
      if (!html2canvas) return null;
      return await html2canvas(cardRef.current, {
        backgroundColor: '#030308',
        scale: 2.5,
        useCORS: true,
        logging: false,
      });
    } catch { return null; }
  };

  const handleDownload = async () => {
    setIsCapturing(true);
    const canvas = await captureCard();
    if (canvas) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `kreon-${cardNumber}.png`;
      a.click();
    } else {
      handleCopyLink();
    }
    setIsCapturing(false);
  };

  const handleNativeShare = async () => {
    setIsCapturing(true);
    const canvas = await captureCard();
    if (canvas && navigator.share) {
      canvas.toBlob(async (blob) => {
        if (!blob) { await navigator.share({ url: `${window.location.origin}/build` }); setIsCapturing(false); return; }
        const file = new File([blob], `kreon-${cardNumber}.png`, { type: 'image/png' });
        try {
          await navigator.share({
            title: `I'm KREON #${cardNumber}`,
            text: `Just joined the KREO registry as resident #${cardNumber} →`,
            files: [file],
          });
        } catch {
          await navigator.share({ url: `${window.location.origin}/build` });
        }
        setIsCapturing(false);
      });
    } else {
      handleCopyLink();
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: '20px' }}>
      <KreonCardVisual ref={cardRef} userEmail={userEmail} cardNumber={cardNumber} />

      {/* Share actions */}
      <div style={{ display: 'flex', gap: '10px', width: '380px' }}>
        {/* Copy link – primary */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
          onClick={handleCopyLink}
          style={{
            flex: 1, height: '52px', borderRadius: '16px',
            background: copied ? 'rgba(16,185,129,0.15)' : '#fff',
            color: copied ? '#10b981' : '#000',
            border: copied ? '1px solid rgba(16,185,129,0.3)' : 'none',
            fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em',
            textTransform: 'uppercase', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.3s',
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="ok" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={13} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="cp" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link size={13} /> Share Link
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Download card */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.96 }}
          onClick={handleDownload}
          style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {isCapturing
            ? <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
            : <Download size={15} />
          }
        </motion.button>

        {/* Twitter */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.96 }}
          onClick={() => window.open(
            `https://twitter.com/intent/tweet?text=I%27m+KREON+%23${cardNumber}+%E2%80%94+Build+with+%23KREO+%E2%86%92&url=${encodeURIComponent(window.location.origin + '/build')}`,
            '_blank'
          )}
          style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Twitter size={15} />
        </motion.button>

        {/* Native share (with image) */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.96 }}
          onClick={handleNativeShare}
          style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'rgba(27,63,191,0.25)', border: '1px solid rgba(27,63,191,0.4)',
            color: '#a5b8ff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Share2 size={15} />
        </motion.button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
};

export default KreonCard;
