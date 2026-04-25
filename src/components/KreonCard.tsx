import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Link, Check, Twitter } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
  userName?: string;
  cardNumber?: string;
  interest?: KreonInterest;
  bio?: string;
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
  { userEmail?: string; userName?: string; cardNumber: string; interest?: KreonInterest; bio?: string; isFlipped?: boolean }
>(({ userEmail, userName, cardNumber, interest = 'tech', bio, isFlipped = false }, ref) => {
  const displayName = userName 
    ? userName.toUpperCase() 
    : userEmail
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
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* ── FRONT SIDE ── */}
      <div 
        style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          backgroundColor: currentTheme.bg, borderRadius: '32px',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: `0 40px 100px ${currentTheme.bg}60`,
        }}
      >
        <div style={{ padding: '28px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ padding: '6px 12px', background: currentTheme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', borderRadius: '20px', color: currentTheme.color, fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {currentTheme.text}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: currentTheme.color }}>
            <span style={{ fontSize: '12px', fontWeight: 900, opacity: 0.7 }}>#</span>
            <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.05em' }}>{cardNumber}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
          <div style={{ width: '180px', height: '180px' }}>{currentTheme.graphic}</div>
        </div>

        <div style={{ padding: '0 28px 28px', color: currentTheme.color, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 900, fontFamily: "'TAN-NIMBUS', sans-serif", letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '8px' }}>KREO</h1>
          <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>Resident Architect</p>
          <p style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>{displayName}</p>
        </div>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay', pointerEvents: 'none' }}/>
      </div>

      {/* ── BACK SIDE ── */}
      <div 
        style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          backgroundColor: currentTheme.bg, borderRadius: '32px',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          transform: 'rotateY(180deg)', border: `1px solid ${currentTheme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
          padding: '40px', color: currentTheme.color
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
           <div style={{ color: currentTheme.color, fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '12px', opacity: 0.6 }}>
             ABOUT
           </div>
           <div style={{ fontSize: '24px', fontWeight: 300, fontFamily: "'Satoshi', sans-serif", fontStyle: 'italic', lineHeight: 1.6, opacity: 0.9, letterSpacing: '0.02em' }}>
             "{bio || 'Loading...'}"
           </div>
        </div>
        
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${currentTheme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`, paddingTop: '20px' }}>
           <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: currentTheme.color, opacity: 0.4, marginBottom: '10px' }}> Details </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                 <span style={{ opacity: 0.4 }}>STATUS</span>
                 <span style={{ fontWeight: 800 }}>VERIFIED</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                 <span style={{ opacity: 0.4 }}>LEVEL</span>
                 <span style={{ fontWeight: 800 }}>BEYOND LIMIT</span>
              </div>
           </div>
        </div>
        
        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay', pointerEvents: 'none' }}/>
      </div>
    </div>
  );
});
KreonCardVisual.displayName = 'KreonCardVisual';

/* ─────────────────────────────────────────────── */

const KreonCard: React.FC<KreonCardProps> = ({ userEmail, userName, interest, bio, cardNumber: externalCardNumber }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fallback to internal generator if no external number provided
  const [fallbackNumber] = useState(() => getCardNumber(userEmail));
  const cardNumber = externalCardNumber || fallbackNumber;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/build`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const captureCard = async (): Promise<HTMLCanvasElement | null> => {
    if (!cardRef.current) return null;
    try {
      setIsExporting(true);
      // Wait for React to render the forced 'Front' state
      await new Promise(res => setTimeout(res, 100));

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
    finally {
      setIsExporting(false);
    }
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
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((y - centerY) / centerY) * -15;  
    const newRotateY = ((x - centerX) / centerX) * 15;
    setRotation([newRotateX, newRotateY]);
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: '30px' }}>
      <div className="relative">
        <div style={{ perspective: '1200px' }}>
          <motion.div
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotation([0, 0])}
            animate={{ rotateX, rotateY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ cursor: 'pointer' }}
          >
            <KreonCardVisual 
              ref={cardRef} 
              userEmail={userEmail} 
              userName={userName} 
              cardNumber={cardNumber} 
              interest={interest} 
              bio={bio} 
              isFlipped={isExporting ? false : isFlipped} 
            />
          </motion.div>
        </div>

        {/* Floating Flip Arrow */}
        <AnimatePresence>
          {!isFlipped && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute -right-32 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#1B3FBF]"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </motion.div>
              <div className="whitespace-nowrap">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]">Flip to View</p>
                <p className="text-[9px] font-medium text-black/30 uppercase tracking-[0.2em] mt-1">Profile View</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 w-[340px]">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
            onClick={handleCopyLink}
            className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all ${
              copied ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-white text-black border border-black/5 shadow-xl shadow-black/5'
            }`}
            style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em' }}
          >
            {copied ? <Check size={14} /> : <Link size={14} />}
            {copied ? "Link Copied" : "Copy Registry Link"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={isCapturing}
            className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-xl shadow-black/20"
          >
            {isCapturing ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Download size={18} />
            )}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleNativeShare}
          className="w-full h-14 rounded-2xl bg-[#1B3FBF] text-white flex items-center justify-center gap-3 shadow-xl shadow-[#1B3FBF]/20"
          style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em' }}
        >
          <Share2 size={14} />
          Share to Socials
        </motion.button>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Click card to reveal profile</p>
        <div className="w-1 h-1 rounded-full bg-[#1B3FBF] animate-ping" />
      </div>
    </div>
  );
};

export default KreonCard;
