import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── TAN-NIMBUS FONT STYLE ───────────────────────────────────────────────────
const TAN: React.CSSProperties = { fontFamily: "'TAN-NIMBUS', sans-serif" };

// ─── SCENE DURATIONS ────────────────────────────────────────────────────────
const SCENE_DURATION = [
  6000,  // 0: Opening hook
  5000,  // 1: "You have ideas"
  5500,  // 2: KREO Splash
  7500,  // 3: The Studio — typing prompt
  8000,  // 4: Manifest — PPT
  7500,  // 5: Manifest — Dashboard
  7000,  // 6: Manifest — Brand Toolkit
  6000,  // 7: "More than a tool"
  5500,  // 8: KREON intro text
  11000, // 9: Cards in circle reveal
  7000,  // 10: Single card closeup
  6000,  // 11: Possibilities flood
  7000,  // 12: Finale
];
const TOTAL_SCENES = SCENE_DURATION.length;

// ─── REAL CARD THEMES (from KreonCard.tsx) ──────────────────────────────────
const CARD_THEMES = [
  {
    id: 'tech', bg: '#3b82f6', text: 'Engineering', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <rect x="15" y="25" width="70" height="50" rx="8" fill="white"/>
        <path d="M 30 40 L 45 50 L 30 60" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="55" y1="60" x2="70" y2="60" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'design', bg: '#c084fc', text: 'Design & Visuals', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <circle cx="50" cy="50" r="40" fill="white"/>
        <path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black"/>
        <circle cx="30" cy="40" r="6" fill="black"/>
        <circle cx="45" cy="25" r="6" fill="black"/>
      </svg>
    )
  },
  {
    id: 'art', bg: '#ec4899', text: 'Art & Culture', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <path d="M30 70 A 30 30 0 0 1 70 30 L 70 70 Z" fill="white"/>
        <circle cx="45" cy="55" r="5" fill="#ec4899"/>
        <circle cx="60" cy="45" r="5" fill="#ec4899"/>
      </svg>
    )
  },
  {
    id: 'product', bg: '#f97316', text: 'Product Strategy', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <rect x="20" y="20" width="25" height="60" rx="4" fill="black"/>
        <rect x="55" y="40" width="25" height="40" rx="4" fill="white"/>
        <circle cx="67.5" cy="20" r="8" fill="white"/>
      </svg>
    )
  },
  {
    id: 'music', bg: '#8b5cf6', text: 'Music & Audio', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <rect x="30" y="20" width="40" height="60" rx="20" fill="none" stroke="white" strokeWidth="8"/>
        <circle cx="30" cy="80" r="10" fill="black"/>
        <circle cx="70" cy="80" r="10" fill="black"/>
        <line x1="30" y1="20" x2="30" y2="80" stroke="white" strokeWidth="8"/>
        <line x1="70" y1="20" x2="70" y2="80" stroke="white" strokeWidth="8"/>
      </svg>
    )
  },
  {
    id: 'sports', bg: '#14b8a6', text: 'Sports & Active', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="8"/>
        <path d="M20 50 C 40 30 60 30 80 50" fill="none" stroke="black" strokeWidth="6"/>
        <path d="M50 20 C 30 40 30 60 50 80" fill="none" stroke="black" strokeWidth="6"/>
      </svg>
    )
  },
  {
    id: 'architecture', bg: '#22c55e', text: 'Architecture', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <polygon points="50,20 20,80 80,80" fill="white"/>
        <polygon points="50,20 50,80 80,80" fill="black"/>
        <circle cx="50" cy="50" r="10" fill="#22c55e"/>
      </svg>
    )
  },
  {
    id: 'news', bg: '#eab308', text: 'News & Insight', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" className="opacity-90 mix-blend-overlay">
        <rect x="20" y="20" width="60" height="60" rx="4" fill="white"/>
        <line x1="30" y1="35" x2="70" y2="35" stroke="black" strokeWidth="6"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="6"/>
        <line x1="30" y1="65" x2="50" y2="65" stroke="black" strokeWidth="6"/>
      </svg>
    )
  },
];

// ─── MINI CARD (used in circle scene) ───────────────────────────────────────
const MiniCard = ({ theme, name, num, delay, visible }: { theme: typeof CARD_THEMES[0]; name: string; num: string; delay: number; visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 40 }}
    animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, y: visible ? 0 : 40 }}
    transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    style={{
      width: '160px',
      height: '220px',
      backgroundColor: theme.bg,
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 20px 60px ${theme.bg}60`,
      flexShrink: 0,
    }}
  >
    {/* Top bar */}
    <div style={{ padding: '12px 14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{
        padding: '3px 8px',
        background: theme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
        borderRadius: '20px',
        color: theme.color,
        fontSize: '7px',
        fontWeight: 800,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
      }}>
        {theme.text}
      </div>
      <span style={{ fontSize: '10px', fontWeight: 900, color: theme.color, opacity: 0.7 }}>#{num}</span>
    </div>
    {/* Graphic */}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80px', height: '80px' }}>{theme.graphic}</div>
    </div>
    {/* Bottom */}
    <div style={{ padding: '0 14px 14px', color: theme.color }}>
      <h1 style={{ fontSize: '28px', fontWeight: 900, ...TAN, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '4px' }}>KREO</h1>
      <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.15em', opacity: 0.6, lineHeight: 1.2 }}>Resident</p>
      <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.04em', lineHeight: 1.2 }}>{name}</p>
    </div>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
  </motion.div>
);

// ─── FULL CARD (used in closeup scene) ──────────────────────────────────────
const FullCard = ({ theme, name, num }: { theme: typeof CARD_THEMES[0]; name: string; num: string }) => (
  <div style={{
    width: '300px', height: '420px',
    backgroundColor: theme.bg, borderRadius: '32px',
    overflow: 'hidden', display: 'flex', flexDirection: 'column',
    boxShadow: `0 60px 120px ${theme.bg}70`,
    position: 'relative',
  }}>
    <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
      <div style={{
        padding: '5px 10px',
        background: theme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
        borderRadius: '20px', color: theme.color,
        fontSize: '9px', fontWeight: 800,
        textTransform: 'uppercase' as const, letterSpacing: '0.1em',
      }}>
        {theme.text}
      </div>
      <span style={{ fontSize: '16px', fontWeight: 900, color: theme.color, opacity: 0.8 }}>#{num}</span>
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '140px', height: '140px' }}>{theme.graphic}</div>
    </div>
    <div style={{ padding: '0 24px 24px', color: theme.color, zIndex: 10 }}>
      <h1 style={{ fontSize: '52px', fontWeight: 900, ...TAN, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>KREO</h1>
      <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.2em', opacity: 0.5 }}>Resident Architect</p>
      <p style={{ fontSize: '17px', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.05em', lineHeight: 1.2 }}>{name}</p>
    </div>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
  </div>
);

// ─── SCENE 0: Opening Hook ───────────────────────────────────────────────────
const Scene0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10 overflow-hidden">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-[2px] w-32 bg-[#1B3FBF] mb-12 origin-left"
    />
    {['You wake up with an idea.', 'But no time to build it.', 'Until now.'].map((line, i) => (
      <motion.h1
        key={i}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif italic tracking-tighter leading-tight ${i === 2 ? 'text-[#1B3FBF]' : 'text-black'}`}
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        {line}
      </motion.h1>
    ))}
  </div>
);

// ─── SCENE 1: "You have ideas" ───────────────────────────────────────────────
const Scene1 = () => (
  <div className="fixed inset-0 bg-[#1B3FBF] flex flex-col items-center justify-center text-center px-12 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${(i * 4.2) % 100}%`, top: `${(i * 7.3) % 100}%`, width: `${(i % 4) + 1}px`, height: `${(i % 4) + 1}px` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: (i * 0.3) % 2 }}
        />
      ))}
    </div>
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-white font-serif italic tracking-tighter leading-tight"
      style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
    >
      Stop waiting for <br />
      <span className="not-italic font-light opacity-60">the right moment.</span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="text-white/60 text-xl font-light mt-8 max-w-lg leading-relaxed"
    >
      Everything you've been imagining — a dashboard, a pitch, a plan — can exist in seconds.
    </motion.p>
  </div>
);

// ─── SCENE 2: KREO Splash ────────────────────────────────────────────────────
const Scene2 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1000); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.6 }}
          style={{ width: `${(i + 1) * 18}vw`, height: `${(i + 1) * 18}vw` }}
        />
      ))}
      <div className="text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...TAN, fontSize: 'clamp(6rem, 18vw, 18rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 0 150px rgba(255,255,255,0.2)' }}
        >
          KREO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
          transition={{ delay: 0.8 }}
          className="text-white/40 text-lg font-light mt-4 tracking-widest"
        >
          Your AI Studio
        </motion.p>
      </div>
    </div>
  );
};

// ─── SCENE 3: The Studio ─────────────────────────────────────────────────────
const PROMPT = "Create a cinematic pitch deck for a climate-tech startup Series A...";
const Scene3 = () => {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setTyped(PROMPT.slice(0, i + 1)); i++; if (i >= PROMPT.length) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-0 left-0 right-0 h-14 border-b border-black/5 flex items-center px-8 justify-between">
        <span style={{ ...TAN, fontSize: '1.4rem', color: '#1B3FBF' }}>KREO</span>
        <div className="flex gap-2">
          {['History', 'Pricing', 'Account'].map((item) => (
            <span key={item} className="text-black/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-black/5">{item}</span>
          ))}
        </div>
      </motion.div>
      <div className="w-full max-w-2xl space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h1 className="font-serif italic text-black tracking-tighter leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            One line.<br /><span className="text-[#1B3FBF]">Anything you need.</span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 bg-white border border-black/10 rounded-[2rem] px-7 py-5 shadow-2xl shadow-black/5"
        >
          <div className="w-8 h-8 bg-[#1B3FBF] rounded-xl flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div className="flex-1 text-lg text-black/40 font-light font-serif italic">
            {typed}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-0.5 inline-block w-[2px] h-[1em] bg-[#1B3FBF] align-middle" />
          </div>
          <div className="w-10 h-10 bg-[#1B3FBF] rounded-xl flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── SCENE 4: PPT Result ─────────────────────────────────────────────────────
const Scene4 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-6 gap-6">
    <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-[#1B3FBF] font-serif italic text-3xl tracking-tight">Your pitch deck, ready.</motion.h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl h-[460px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      <div className="w-1/5 bg-[#f8f9ff] border-r border-black/5 p-6 flex flex-col gap-3">
        <div className="h-3 w-16 bg-black/10 rounded-full mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-14 rounded-xl border p-2.5 space-y-1.5 ${i === 0 ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'}`}>
            <div className="h-1.5 w-2/3 bg-black/20 rounded-full" />
            <div className="h-1.5 w-1/2 bg-black/10 rounded-full" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-14 flex flex-col justify-between relative">
        <div className="absolute top-10 right-10 text-black/10 text-xs font-black uppercase tracking-widest">KREO / GENERATED LIVE</div>
        <div className="space-y-6">
          <motion.h2 initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="font-serif italic text-black leading-none tracking-tighter" style={{ fontSize: '3.5rem' }}>
            The Climate <br />Opportunity
          </motion.h2>
          <motion.div initial={{ width: 0 }} animate={{ width: '160px' }} transition={{ delay: 0.8, duration: 1 }} className="h-1.5 bg-[#1B3FBF]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-black/40 text-lg font-light max-w-lg leading-relaxed">
            Global climate-tech investments surpassed $1.1T in 2025, driven by policy shifts across 64 nations.
          </motion.p>
        </div>
        <div className="flex gap-4 items-end">
          {[60, 80, 50, 90, 70].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}px` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              className="w-10 rounded-t-xl" style={{ background: i === 3 ? '#1B3FBF' : '#1B3FBF20' }} />
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── SCENE 5: Dashboard Result ───────────────────────────────────────────────
const Scene5 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-6 gap-6">
    <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-[#1B3FBF] font-serif italic text-3xl tracking-tight">Your dashboard, built in seconds.</motion.h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl h-[460px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      <div className="w-56 bg-black p-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1B3FBF]" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">Insights</span>
        </div>
        {['Overview', 'Revenue', 'Users', 'Campaigns'].map((item, i) => (
          <div key={item} className={`text-sm py-2 px-3 rounded-xl ${i === 0 ? 'bg-[#1B3FBF] text-white' : 'text-white/30'}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 p-10 space-y-7 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif italic text-black">Revenue Overview</h3>
          <div className="flex items-center gap-2 text-green-500 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live</div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[{ label: 'MRR', value: '$48,200', up: true }, { label: 'Users', value: '12,841', up: true }, { label: 'Churn', value: '1.2%', up: false }].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="bg-[#f8f9ff] rounded-2xl p-5 space-y-2">
              <div className="text-black/20 text-xs font-black uppercase tracking-widest">{kpi.label}</div>
              <div className="text-3xl font-light text-black tracking-tighter">{kpi.value}</div>
              <div className={`text-xs font-bold ${kpi.up ? 'text-green-500' : 'text-red-400'}`}>{kpi.up ? '↑ +8.4%' : '↓ -0.3%'}</div>
            </motion.div>
          ))}
        </div>
        <div className="h-24 flex items-end gap-2">
          {[40, 55, 35, 70, 60, 85, 75, 90, 65, 95, 80, 100].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              className="flex-1 rounded-t-lg bg-[#1B3FBF]/10 relative overflow-hidden">
              <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }} className="absolute bottom-0 left-0 right-0 bg-[#1B3FBF]" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── SCENE 6: Brand Toolkit ──────────────────────────────────────────────────
const Scene6 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-6 gap-6">
    <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-[#1B3FBF] font-serif italic text-3xl tracking-tight">Your brand, designed for you.</motion.h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl h-[420px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-black/5 p-14 space-y-6">
        <motion.div initial={{ rotate: -12, scale: 0.7, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-40 h-40 bg-black rounded-[3rem] flex items-center justify-center shadow-2xl">
          <span className="text-white font-serif italic" style={{ fontSize: '5rem' }}>N</span>
        </motion.div>
        <div className="text-center">
          <p className="text-black text-base font-black uppercase tracking-widest">Neura AI</p>
          <p className="text-black/30 text-xs font-bold uppercase tracking-widest mt-1">Designed by KREO</p>
        </div>
      </div>
      <div className="w-1/2 p-14 flex flex-col justify-center space-y-8">
        <div className="space-y-3">
          <p className="text-black/30 text-xs font-black uppercase tracking-widest">Palette</p>
          <div className="flex gap-4">
            {['#000000', '#1B3FBF', '#FACC15', '#F8F9FF'].map((c, i) => (
              <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="w-12 h-12 rounded-2xl border border-black/5 shadow-inner" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-black/30 text-xs font-black uppercase tracking-widest">Typography</p>
          <h2 className="font-serif italic text-black tracking-tighter" style={{ fontSize: '3rem', lineHeight: 1 }}>Instrument</h2>
          <h2 className="font-light text-black/30 tracking-tight text-2xl">Satoshi / Inter</h2>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── SCENE 7: More than a tool ───────────────────────────────────────────────
const Scene7 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    {['KREO is not just a tool.', 'It is your creative home.'].map((line, i) => (
      <motion.h1
        key={i}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif italic tracking-tighter leading-tight ${i === 1 ? 'text-[#1B3FBF]' : 'text-black'}`}
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
      >
        {line}
      </motion.h1>
    ))}
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-black/30 text-lg font-light mt-10 max-w-lg leading-relaxed">
      Every person who joins KREO becomes something more. A Resident. A Dreamer. A Creator.
    </motion.p>
  </div>
);

// ─── SCENE 8: KREON Intro ────────────────────────────────────────────────────
const Scene8 = () => (
  <div className="fixed inset-0 bg-[#1B3FBF] flex flex-col items-center justify-center text-center px-10 overflow-hidden">
    {[...Array(4)].map((_, i) => (
      <motion.div key={i} className="absolute rounded-full border border-white/10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ repeat: Infinity, duration: 5 + i, delay: i * 0.8 }}
        style={{ width: `${(i + 1) * 22}vw`, height: `${(i + 1) * 22}vw` }}
      />
    ))}
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-sm font-light uppercase tracking-widest mb-8">
      Introducing
    </motion.p>
    <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...TAN, fontSize: 'clamp(5rem, 16vw, 14rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}
    >
      KREON
    </motion.h1>
    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
      className="text-white/60 text-xl font-light mt-8 max-w-lg leading-relaxed">
      Your identity inside KREO. Your card. Your story. Your number.
    </motion.p>
  </div>
);

// ─── SCENE 9: Cards in Circle ─────────────────────────────────────────────────
const CIRCLE_CARDS = [
  { theme: CARD_THEMES[0], name: 'ARJUN S.', num: '0001' },
  { theme: CARD_THEMES[1], name: 'SARA K.', num: '0042' },
  { theme: CARD_THEMES[2], name: 'MAYA L.', num: '0108' },
  { theme: CARD_THEMES[3], name: 'RAVI M.', num: '0247' },
  { theme: CARD_THEMES[4], name: 'PRIYA T.', num: '0389' },
  { theme: CARD_THEMES[5], name: 'ZEN O.', num: '0512' },
  { theme: CARD_THEMES[6], name: 'ALI H.', num: '0778' },
  { theme: CARD_THEMES[7], name: 'DHRUV G.', num: '0042' },
];

const Scene9 = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const total = CIRCLE_CARDS.length;
  const radius = 320; // px

  useEffect(() => {
    let c = 0;
    const t = setInterval(() => {
      c++;
      setVisibleCount(c);
      if (c >= total) clearInterval(t);
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Center label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute z-20 text-center pointer-events-none"
      >
        <h1 style={{ ...TAN, fontSize: '4rem', color: '#1B3FBF', letterSpacing: '-0.02em', lineHeight: 1 }}>KREON</h1>
        <p className="text-black/30 text-sm font-light mt-2">Every card is yours.</p>
      </motion.div>

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {CIRCLE_CARDS.map((card, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              {/* Counter-rotate so cards stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <MiniCard
                  theme={card.theme}
                  name={card.name}
                  num={card.num}
                  delay={i * 0.3}
                  visible={i < visibleCount}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// ─── SCENE 10: Single Card Closeup ──────────────────────────────────────────
const Scene10 = () => {
  const [cardIdx, setCardIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCardIdx(p => (p + 1) % CARD_THEMES.length), 1400);
    return () => clearInterval(t);
  }, []);

  const theme = CARD_THEMES[cardIdx];

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.bg, transition: 'background-color 0.8s ease' }}>
      {/* Background rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full border border-white/10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.6 }}
          style={{ width: `${(i + 1) * 30}vw`, height: `${(i + 1) * 30}vw` }}
        />
      ))}

      <div className="flex items-center gap-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={cardIdx}
            initial={{ opacity: 0, x: -60, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 60, rotateY: 20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '800px' }}
          >
            <FullCard theme={theme} name="YOUR NAME" num="000X" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={cardIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-xs"
          >
            <div style={{ color: theme.color === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.4em' }}>
              {theme.text}
            </div>
            <h2 style={{ color: theme.color === 'white' ? 'white' : 'black', fontSize: '2.5rem', fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Your card.<br />Your identity.
            </h2>
            <p style={{ color: theme.color === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Every KREON is unique. Colored by your passion. Numbered by your place in history.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── SCENE 11: Possibilities ─────────────────────────────────────────────────
const PILE = [
  "Pitch Decks", "SaaS Dashboards", "Flowcharts", "Brand Kits",
  "Landing Pages", "Financial Models", "Storyboards", "API Docs",
  "System Architecture", "Mind Maps", "Style Guides", "Legal Briefs",
  "Marketing Funnels", "Course Curriculum", "Portfolio Sites", "KREON Cards",
  "Audit Reports", "UI Mockups",
];

const Scene11 = () => {
  const [count, setCount] = useState(0);
  const positions = useMemo(() => PILE.map(() => ({ x: (Math.random() * 70) - 35, y: (Math.random() * 50) - 25, r: (Math.random() * 30) - 15 })), []);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c++; setCount(c); if (c >= PILE.length) clearInterval(t); }, 240);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-14 font-serif italic text-black tracking-tighter text-5xl md:text-6xl text-center z-[100] pointer-events-none">
        Build without limits.
      </motion.h1>
      <div className="relative flex-1 w-full flex items-center justify-center mt-10">
        {PILE.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: i < count ? 1 : 0, scale: i < count ? 1 : 0.5, x: `${positions[i].x}vw`, y: `${positions[i].y}vh`, rotate: positions[i].r, zIndex: i }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute min-w-[200px] px-7 py-4 bg-[#1B3FBF] rounded-[2rem] flex items-center justify-center shadow-xl"
          >
            <span className="text-white font-serif italic text-lg tracking-tight">{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── SCENE 12: Finale ────────────────────────────────────────────────────────
const Scene12 = () => {
  const [text, setText] = useState('');
  const target = 'KREO';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setText(target.slice(0, i + 1)); i++; if (i >= target.length) clearInterval(t); }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center gap-10 overflow-hidden">
      <div>
        <motion.h1 className="tracking-tighter leading-none" style={{ ...TAN, fontSize: 'clamp(8rem, 20vw, 18rem)', color: '#1B3FBF' }}>
          {text}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block bg-[#1B3FBF] align-middle" style={{ width: '0.06em', height: '1em' }} />
        </motion.h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="space-y-3">
        <p className="text-[#1B3FBF] text-lg font-light tracking-widest opacity-50">creoai.vercel.app</p>
        <p className="text-black/20 text-sm font-medium uppercase tracking-widest">Your Studio. Your KREON. Your World.</p>
      </motion.div>
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function KreoPromo6() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;
    intervalRef.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(intervalRef.current);
        if (scene < TOTAL_SCENES - 1) { setScene(p => p + 1); setProgress(0); }
      }
    }, tick);
    return () => clearInterval(intervalRef.current);
  }, [scene]);

  const scenes = [<Scene0 />, <Scene1 />, <Scene2 />, <Scene3 />, <Scene4 />, <Scene5 />, <Scene6 />, <Scene7 />, <Scene8 />, <Scene9 />, <Scene10 />, <Scene11 />, <Scene12 />];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Scene dots */}
      <div className="fixed top-8 right-10 z-[6000] flex items-center gap-1.5">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <div key={i} className={`rounded-full transition-all duration-500 ${i === scene ? 'w-6 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/10'}`} />
        ))}
      </div>
      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="w-full h-full">
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>
      {/* Progress */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] z-[6000] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
