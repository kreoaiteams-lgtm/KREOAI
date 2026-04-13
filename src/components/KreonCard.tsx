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
        height: '520px',
        background: '#030308',
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(27,63,191,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* ── Abstract gradient nebula ── */}
      {/* Top-right blue */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,63,191,0.7) 0%, transparent 65%)',
        filter: 'blur(1px)',
      }}/>
      {/* Bottom-left violet */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '340px', height: '340px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.65) 0%, transparent 65%)',
      }}/>
      {/* Centre emerald */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,120,87,0.18) 0%, transparent 70%)',
      }}/>
      {/* Holographic streak */}
      <div style={{
        position: 'absolute', top: '0', left: '-50%',
        width: '200%', height: '60%',
        background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
        pointerEvents: 'none',
      }}/>

      {/* Abstract orbital SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 380 520">
        <circle cx="190" cy="260" r="190" stroke="white" strokeWidth="0.5" strokeDasharray="3 14" fill="none"/>
        <circle cx="190" cy="260" r="130" stroke="white" strokeWidth="0.3" strokeDasharray="2 18" fill="none"/>
        {/* Corner registration marks */}
        <path d="M 18 18 L 18 42 M 18 18 L 42 18" stroke="white" strokeWidth="1.2"/>
        <path d="M 362 18 L 362 42 M 362 18 L 338 18" stroke="white" strokeWidth="1.2"/>
        <path d="M 18 502 L 18 478 M 18 502 L 42 502" stroke="white" strokeWidth="1.2"/>
        <path d="M 362 502 L 362 478 M 362 502 L 338 502" stroke="white" strokeWidth="1.2"/>
        {/* Fine horizontal scan lines */}
        {[100, 200, 320].map((y, i) => (
          <line key={i} x1="16" y1={y} x2="364" y2={y} stroke="white" strokeWidth="0.25" opacity="0.4"/>
        ))}
        {/* Scattered dots */}
        {[...Array(18)].map((_, i) => (
          <circle key={i}
            cx={(i * 89 + 25) % 380} cy={(i * 67 + 40) % 520}
            r="1" fill="white" opacity="0.35"
          />
        ))}
      </svg>

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }}/>

      {/* ── Card number – top right ── */}
      <div style={{
        position: 'absolute', top: '22px', right: '22px',
        display: 'flex', alignItems: 'baseline', gap: '3px', zIndex: 30,
      }}>
        <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>#</span>
        <span style={{ fontSize: '22px', fontWeight: 900, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}>
          {cardNumber}
        </span>
      </div>

      {/* ── Series label – top left ── */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 30 }}>
        <p style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Build with
        </p>
      </div>

      {/* ── Glassmorphic inner panel ── */}
      <div style={{
        position: 'absolute', inset: '14px', zIndex: 20,
        borderRadius: '18px',
        background: 'rgba(255,255,255,0.035)',
        backdropFilter: 'blur(60px)',
        WebkitBackdropFilter: 'blur(60px)',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '0px',
        padding: '32px',
      }}>

        {/* KREO wordmark – TAN-NIMBUS only here */}
        <div style={{
          fontSize: '96px', fontWeight: 700,
          fontFamily: "'TAN-NIMBUS', sans-serif",
          color: 'white', letterSpacing: '0.12em',
          lineHeight: 1,
          textShadow: '0 0 80px rgba(27,63,191,0.8), 0 0 160px rgba(109,40,217,0.4)',
        }}>
          KREO
        </div>

        {/* Single gradient divider */}
        <div style={{
          width: '200px', height: '1px', margin: '22px 0 20px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(27,63,191,0.6), rgba(255,255,255,0.3), transparent)',
        }}/>

        {/* Role label */}
        <p style={{
          fontSize: '9px', fontWeight: 900, letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Resident Architect
        </p>

        {/* Display name */}
        <p style={{
          fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          {displayName}
        </p>

        {/* Bottom status */}
        <div style={{
          position: 'absolute', bottom: '24px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 8px rgba(16,185,129,0.8)',
            animation: 'pulse 2s infinite',
          }}/>
          <span style={{
            fontSize: '8px', fontWeight: 900, letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
          }}>
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
