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
        background: '#0a0a0c', // Almost black titanium
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.5)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* ── Metallic / Frosted Texture ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.03) 100%)',
        pointerEvents: 'none'
      }}/>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.2,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }}/>

      {/* ── Minimalist Grid Lines ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }} viewBox="0 0 380 520">
        <line x1="40" y1="0" x2="40" y2="520" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="340" y1="0" x2="340" y2="520" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="0" y1="80" x2="380" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="0" y1="440" x2="380" y2="440" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Corner dots */}
        <circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="340" cy="80" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="40" cy="440" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="340" cy="440" r="2" fill="rgba(255,255,255,0.4)" />
      </svg>

      {/* ── The EMV Chip ── */}
      <div style={{
        position: 'absolute', top: '100px', left: '50px',
        width: '44px', height: '34px',
        background: 'linear-gradient(135deg, #d4af37 0%, #aa8529 50%, #f3e5ab 100%)',
        borderRadius: '6px',
        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '1px', padding: '2px'
      }}>
        {/* Faux chip contacts */}
        <div style={{ width: '13px', height: '10px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
        <div style={{ width: '10px', height: '10px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px', flex: 1 }} />
        <div style={{ width: '13px', height: '10px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
        <div style={{ width: '13px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
        <div style={{ width: '10px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px', flex: 1 }} />
        <div style={{ width: '13px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
        <div style={{ width: '13px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
        <div style={{ width: '10px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px', flex: 1 }} />
        <div style={{ width: '13px', height: '8px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '1px' }} />
      </div>

      {/* ── Contactless Icon ── */}
      <svg style={{ position: 'absolute', top: '105px', left: '110px', opacity: 0.6 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <path d="M 6 15 Q 10 12 6 9" />
        <path d="M 10 18 Q 16 12 10 6" />
        <path d="M 14 21 Q 22 12 14 3" />
      </svg>

      {/* ── Holographic Core KREO ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Glow halo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '280px', height: '100px', background: 'radial-gradient(ellipse at center, rgba(27,63,191,0.5) 0%, transparent 60%)', filter: 'blur(15px)'
        }}/>
        <h1 style={{
          fontSize: '94px', fontWeight: 700,
          fontFamily: "'TAN-NIMBUS', sans-serif",
          background: 'linear-gradient(to right, #e2e2e2 0%, #ffffff 50%, #909090 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: 1, position: 'relative', zIndex: 10,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))'
        }}>
          KREO
        </h1>
        <div style={{
          marginTop: '10px',
          width: '180px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), #1B3FBF, rgba(255,255,255,0.2), transparent)'
        }}/>
      </div>

      {/* ── Serial Number (Top Right) ── */}
      <div style={{
        position: 'absolute', top: '38px', right: '40px',
        display: 'flex', alignItems: 'baseline', gap: '4px',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 900, color: '#f3e5ab', letterSpacing: '0.1em' }}>№</span>
        <span style={{ fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums', opacity: 0.9 }}>
          {cardNumber}
        </span>
      </div>

      {/* ── Edition Label (Top Left) ── */}
      <div style={{ position: 'absolute', top: '42px', left: '40px' }}>
        <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
          Series 01 // Black
        </p>
      </div>

      {/* ── User Details & Security Feature ── */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '40px', right: '40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
            Authorized Signatory
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'white', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {displayName}
          </p>
        </div>

        {/* Neural Sync "Hologram" Box */}
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.3))',
          border: '1px solid rgba(16,185,129,0.5)',
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(16,185,129,0.3), inset 0 0 8px rgba(16,185,129,0.2)'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>

      {/* Embedded UV Text hidden logic */}
      <div style={{
        position: 'absolute', bottom: '110px', left: '40px',
        fontSize: '7px', fontWeight: 900, color: 'rgba(255,255,255,0.08)',
        letterSpacing: '0.6em', textTransform: 'uppercase', transform: 'rotate(-90deg)', transformOrigin: 'left bottom'
      }}>
        NEURAL ARCHITECTURE — ESTB. MMXXVI
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
