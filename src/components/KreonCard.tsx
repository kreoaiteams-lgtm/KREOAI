import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Link, Check, Twitter } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
  interest?: KreonInterest;
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

type KreonInterest = 'design' | 'tech' | 'architecture' | 'product' | 'art' | 'sports' | 'music' | 'news';

export const KreonCardVisual = React.forwardRef<
  HTMLDivElement,
  { userEmail?: string; cardNumber: string; interest?: KreonInterest }
>(({ userEmail, cardNumber, interest = 'tech' }, ref) => {
  const displayName = userEmail
    ? userEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase()
    : 'KREO RESIDENT';

  const themes: Record<KreonInterest, { bg: string, text: string, color: string, graphic: React.ReactNode }> = {
    design: {
      bg: '#c084fc', text: 'Design & Visuals', color: 'black',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <circle cx="50" cy="50" r="40" fill="white" />
          <path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black" />
          <circle cx="30" cy="40" r="6" fill="black" />
          <circle cx="45" cy="25" r="6" fill="black" />
        </svg>
      )
    },
    tech: {
      bg: '#3b82f6', text: 'Engineering', color: 'white',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <rect x="15" y="25" width="70" height="50" rx="8" fill="white" />
          <path d="M 30 40 L 45 50 L 30 60" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="55" y1="60" x2="70" y2="60" stroke="black" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )
    },
    architecture: {
      bg: '#22c55e', text: 'Architecture Spaces', color: 'black',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <polygon points="50,20 20,80 80,80" fill="white" />
          <polygon points="50,20 50,80 80,80" fill="black" />
          <circle cx="50" cy="50" r="10" fill="#22c55e" />
        </svg>
      )
    },
    product: {
      bg: '#f97316', text: 'Product Strategy', color: 'black',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <rect x="20" y="20" width="25" height="60" rx="4" fill="black" />
          <rect x="55" y="40" width="25" height="40" rx="4" fill="white" />
          <circle cx="67.5" cy="20" r="8" fill="white" />
        </svg>
      )
    },
    art: {
      bg: '#ec4899', text: 'Art & Culture', color: 'white',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <path d="M30 70 A 30 30 0 0 1 70 30 L 70 70 Z" fill="white" />
          <circle cx="45" cy="55" r="5" fill="#ec4899" />
          <circle cx="60" cy="45" r="5" fill="#ec4899" />
        </svg>
      )
    },
    sports: {
      bg: '#14b8a6', text: 'Sports & Active', color: 'white',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="8" />
          <path d="M20 50 C 40 30 60 30 80 50" fill="none" stroke="black" strokeWidth="6" />
          <path d="M50 20 C 30 40 30 60 50 80" fill="none" stroke="black" strokeWidth="6" />
        </svg>
      )
    },
    music: {
      bg: '#8b5cf6', text: 'Music & Audio', color: 'white',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <rect x="30" y="20" width="40" height="60" rx="20" fill="none" stroke="white" strokeWidth="8" />
          <circle cx="30" cy="80" r="10" fill="black" />
          <circle cx="70" cy="80" r="10" fill="black" />
          <line x1="30" y1="20" x2="30" y2="80" stroke="white" strokeWidth="8" />
          <line x1="70" y1="20" x2="70" y2="80" stroke="white" strokeWidth="8" />
        </svg>
      )
    },
    news: {
      bg: '#eab308', text: 'News & Insight', color: 'black',
      graphic: (
        <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
          <rect x="20" y="20" width="60" height="60" rx="4" fill="white" />
          <line x1="30" y1="35" x2="70" y2="35" stroke="black" strokeWidth="6" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="6" />
          <line x1="30" y1="65" x2="50" y2="65" stroke="black" strokeWidth="6" />
        </svg>
      )
    }
  };

  const currentTheme = themes[interest];

  return (
    <div
      ref={ref}
      style={{
        width: '340px',
        height: '480px',
        backgroundColor: currentTheme.bg,
        borderRadius: '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 40px 100px ${currentTheme.bg}60, inset 0 2px 4px rgba(255,255,255,0.3)`,
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top Header ── */}
      <div style={{ padding: '28px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ padding: '6px 12px', background: currentTheme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', borderRadius: '20px', color: currentTheme.color, fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {currentTheme.text}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: currentTheme.color }}>
          <span style={{ fontSize: '12px', fontWeight: 900, opacity: 0.7 }}>#</span>
          <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.05em' }}>{cardNumber}</span>
        </div>
      </div>

      {/* ── Graphic ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 0,
      }}>
        <div style={{ width: '180px', height: '180px' }}>
          {currentTheme.graphic}
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div style={{
        padding: '0 28px 28px',
        color: currentTheme.color,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        <h1 style={{
          fontSize: '64px', fontWeight: 900,
          fontFamily: "'TAN-NIMBUS', sans-serif",
          letterSpacing: '-0.02em', lineHeight: 1,
          marginBottom: '8px',
        }}>
          KREO
        </h1>
        <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>
          Resident Architect
        </p>
        <p style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>
          {displayName}
        </p>
      </div>

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 20
      }}/>
    </div>
  );
});
KreonCardVisual.displayName = 'KreonCardVisual';

/* ─────────────────────────────────────────────── */

const KreonCard: React.FC<KreonCardProps> = ({ userEmail, interest }) => {
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

  const [[rotateX, rotateY], setRotation] = useState([0, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Scale down the rotation multiplier for a subtle 3D effect
    const newRotateX = ((y - centerY) / centerY) * -20;  
    const newRotateY = ((x - centerX) / centerX) * 20;
    
    setRotation([newRotateX, newRotateY]);
  };

  const handleMouseLeave = () => {
    setRotation([0, 0]);
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: '20px' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        style={{ perspective: 1000 }}
      >
        <KreonCardVisual ref={cardRef} userEmail={userEmail} cardNumber={cardNumber} interest={interest} />
      </motion.div>

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
