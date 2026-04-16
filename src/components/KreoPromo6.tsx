import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TAN: React.CSSProperties = { fontFamily: "'TAN-NIMBUS', sans-serif" };

// ─── SCENE DURATIONS ────────────────────────────────────────────────────────
const SCENE_DURATION = [
  6000,  // 0: "You wake up with an idea."
  5500,  // 1: "Stop waiting for the right moment."
  5000,  // 2: KREO Splash
  7500,  // 3: Studio — typing
  8000,  // 4: PPT result
  7500,  // 5: Dashboard result
  7000,  // 6: Brand toolkit
  5500,  // 7: "Not just a tool."
  5500,  // 8: "Your creative home."
  5500,  // 9: KREON reveal
  5000,  // 10: "Your card. Your number."
  13000, // 11: Card circle — one by one
  10000, // 12: Card worlds — full screen takeover
  5500,  // 13: Possibilities
  6500,  // 14: Finale
];
const TOTAL_SCENES = SCENE_DURATION.length;

// ─── CARD THEMES ─────────────────────────────────────────────────────────────
const CARD_THEMES = [
  {
    id: 'tech', bg: '#3b82f6', text: 'Engineering', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <rect x="15" y="25" width="70" height="50" rx="8" fill="white"/>
        <path d="M 30 40 L 45 50 L 30 60" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="55" y1="60" x2="70" y2="60" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'design', bg: '#c084fc', text: 'Design & Visuals', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
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
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <path d="M30 70 A 30 30 0 0 1 70 30 L 70 70 Z" fill="white"/>
        <circle cx="45" cy="55" r="5" fill="#ec4899"/>
        <circle cx="60" cy="45" r="5" fill="#ec4899"/>
      </svg>
    )
  },
  {
    id: 'product', bg: '#f97316', text: 'Product Strategy', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <rect x="20" y="20" width="25" height="60" rx="4" fill="black"/>
        <rect x="55" y="40" width="25" height="40" rx="4" fill="white"/>
        <circle cx="67.5" cy="20" r="8" fill="white"/>
      </svg>
    )
  },
  {
    id: 'music', bg: '#8b5cf6', text: 'Music & Audio', color: 'white',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
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
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="8"/>
        <path d="M20 50 C 40 30 60 30 80 50" fill="none" stroke="black" strokeWidth="6"/>
        <path d="M50 20 C 30 40 30 60 50 80" fill="none" stroke="black" strokeWidth="6"/>
      </svg>
    )
  },
  {
    id: 'architecture', bg: '#22c55e', text: 'Architecture', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <polygon points="50,20 20,80 80,80" fill="white"/>
        <polygon points="50,20 50,80 80,80" fill="black"/>
        <circle cx="50" cy="50" r="10" fill="#22c55e"/>
      </svg>
    )
  },
  {
    id: 'news', bg: '#eab308', text: 'News & Insight', color: 'black',
    graphic: (
      <svg viewBox="0 0 100 100" style={{ opacity: 0.9, mixBlendMode: 'overlay' as const }}>
        <rect x="20" y="20" width="60" height="60" rx="4" fill="white"/>
        <line x1="30" y1="35" x2="70" y2="35" stroke="black" strokeWidth="6"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="6"/>
        <line x1="30" y1="65" x2="50" y2="65" stroke="black" strokeWidth="6"/>
      </svg>
    )
  },
];

// ─── CARD COMPONENT (real design) ────────────────────────────────────────────
const KreonCardReal = ({
  theme, name, num, width = 260, height = 360
}: {
  theme: typeof CARD_THEMES[0]; name: string; num: string; width?: number; height?: number;
}) => {
  const gSize = Math.round(width * 0.55);
  const kreoSize = Math.round(width * 0.2);
  const nameSize = Math.round(width * 0.065);

  return (
    <div style={{
      width, height,
      backgroundColor: theme.bg,
      borderRadius: Math.round(width * 0.12),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 ${Math.round(height * 0.12)}px ${Math.round(height * 0.28)}px ${theme.bg}70`,
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Top row */}
      <div style={{ padding: `${Math.round(width * 0.08)}px ${Math.round(width * 0.08)}px 0`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{
          padding: `${Math.round(width * 0.02)}px ${Math.round(width * 0.05)}px`,
          background: theme.color === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
          borderRadius: 40, color: theme.color,
          fontSize: Math.round(width * 0.04), fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {theme.text}
        </div>
        <span style={{ fontSize: Math.round(width * 0.065), fontWeight: 900, color: theme.color, opacity: 0.8 }}>#{num}</span>
      </div>

      {/* Graphic */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: gSize, height: gSize }}>{theme.graphic}</div>
      </div>

      {/* Bottom */}
      <div style={{ padding: `0 ${Math.round(width * 0.08)}px ${Math.round(width * 0.08)}px`, color: theme.color, zIndex: 10 }}>
        <div style={{ fontSize: kreoSize, fontWeight: 900, ...TAN, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: Math.round(width * 0.03) }}>KREO</div>
        <div style={{ fontSize: Math.round(width * 0.038), fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: 4 }}>Resident</div>
        <div style={{ fontSize: nameSize, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>{name}</div>
      </div>

      {/* Grain */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENES
// ─────────────────────────────────────────────────────────────────────────────

const Scene0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    {['You wake up', 'with an idea.'].map((line, i) => (
      <motion.h1
        key={i}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-black font-serif italic tracking-tighter leading-none"
        style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
      >
        {line}
      </motion.h1>
    ))}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="h-1 bg-[#1B3FBF] mt-10 origin-left"
      style={{ width: 'clamp(80px, 15vw, 200px)' }}
    />
  </div>
);

const Scene1 = () => (
  <div className="fixed inset-0 bg-[#1B3FBF] flex flex-col items-center justify-center text-center px-10 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div key={i} className="absolute rounded-full bg-white/10"
        style={{ width: (i % 5 + 1) * 40, height: (i % 5 + 1) * 40, left: `${(i * 5.3) % 100}%`, top: `${(i * 7.1) % 100}%` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 3 + i % 4, delay: i * 0.4 }}
      />
    ))}
    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-white font-serif italic tracking-tighter leading-tight relative z-10"
      style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
    >
      Stop waiting<br />for the right moment.
    </motion.h1>
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="text-white/50 font-serif italic tracking-tighter relative z-10 mt-6"
      style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
    >
      The moment is now.
    </motion.h2>
  </div>
);

const Scene2 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 900); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full border border-white/10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.7 }}
          style={{ width: `${(i + 1) * 18}vw`, height: `${(i + 1) * 18}vw` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...TAN, fontSize: 'clamp(7rem, 20vw, 20rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 0 180px rgba(255,255,255,0.25)' }}
        >
          KREO
        </motion.div>
      </div>
    </div>
  );
};

const PROMPT = "Create a cinematic pitch deck for a climate-tech startup raising Series A...";
const Scene3 = () => {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setTyped(PROMPT.slice(0, i + 1)); i++; if (i >= PROMPT.length) clearInterval(t); }, 48);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-10 gap-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif italic text-black tracking-tighter text-center"
        style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05 }}
      >
        One line.<br /><span className="text-[#1B3FBF]">Anything.</span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-3xl flex items-center gap-4 bg-white border-2 border-black/8 rounded-[2rem] px-8 py-6 shadow-2xl shadow-black/5"
      >
        <div className="w-10 h-10 bg-[#1B3FBF] rounded-xl flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className="flex-1 font-serif italic text-black/40 leading-snug" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
          {typed}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-0.5 inline-block w-[2px] h-[1em] bg-[#1B3FBF] align-middle" />
        </div>
        <div className="w-12 h-12 bg-[#1B3FBF] rounded-xl flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </div>
      </motion.div>
    </div>
  );
};

const Scene4 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-8 gap-6">
    <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      className="text-[#1B3FBF] font-serif italic tracking-tighter text-center"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
      Your pitch deck, ready.
    </motion.h1>
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl" style={{ height: '420px' }}>
      <div className="w-[180px] bg-[#f8f9ff] border-r border-black/5 p-6 flex flex-col gap-3 shrink-0">
        <div className="h-3 w-16 bg-black/10 rounded-full mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-12 rounded-xl border p-2.5 space-y-1.5 ${i === 0 ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'}`}>
            <div className="h-1.5 w-2/3 bg-black/20 rounded-full" />
            <div className="h-1.5 w-1/2 bg-black/10 rounded-full" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-12 flex flex-col justify-between">
        <div className="space-y-5">
          <motion.h2 initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="font-serif italic text-black leading-none tracking-tighter" style={{ fontSize: '3.2rem' }}>
            The Climate<br />Opportunity
          </motion.h2>
          <motion.div initial={{ width: 0 }} animate={{ width: '140px' }} transition={{ delay: 0.8, duration: 1 }} className="h-1.5 bg-[#1B3FBF]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-black/40 font-light leading-relaxed" style={{ fontSize: '1.15rem', maxWidth: '420px' }}>
            Global climate-tech hit $1.1 trillion in 2025 — the opportunity of a generation.
          </motion.p>
        </div>
        <div className="flex gap-3 items-end">
          {[60, 80, 50, 90, 70, 85].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: 0.7 + i * 0.1, duration: 0.7 }}
              className="w-10 rounded-t-xl" style={{ background: i === 3 ? '#1B3FBF' : '#1B3FBF22' }} />
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

const Scene5 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-8 gap-6">
    <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      className="text-[#1B3FBF] font-serif italic tracking-tighter text-center"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
      Your dashboard, in seconds.
    </motion.h1>
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl" style={{ height: '420px' }}>
      <div className="w-52 bg-black p-7 flex flex-col gap-5 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#1B3FBF]" />
        {['Overview', 'Revenue', 'Users', 'Reports'].map((item, i) => (
          <div key={item} className={`text-sm font-medium py-2.5 px-3 rounded-xl ${i === 0 ? 'bg-[#1B3FBF] text-white' : 'text-white/25'}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 p-10 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-serif italic text-black tracking-tight" style={{ fontSize: '1.8rem' }}>Revenue Overview</h3>
          <div className="flex items-center gap-2 text-green-500 font-bold"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'MRR', value: '$48,200' }, { label: 'Users', value: '12,841' }, { label: 'ARR', value: '$580K' }].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
              className="bg-[#f8f9ff] rounded-2xl p-5 space-y-2">
              <div className="text-black/30 font-bold uppercase tracking-widest" style={{ fontSize: '0.8rem' }}>{kpi.label}</div>
              <div className="text-black font-light tracking-tighter" style={{ fontSize: '2rem' }}>{kpi.value}</div>
            </motion.div>
          ))}
        </div>
        <div className="h-20 flex items-end gap-2">
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

const Scene6 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-8 gap-6">
    <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      className="text-[#1B3FBF] font-serif italic tracking-tighter text-center"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
      Your brand, designed.
    </motion.h1>
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl" style={{ height: '380px' }}>
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-black/5 p-12 space-y-5">
        <motion.div initial={{ rotate: -15, scale: 0.7, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-36 h-36 bg-black rounded-[2.5rem] flex items-center justify-center shadow-2xl">
          <span className="text-white font-serif italic" style={{ fontSize: '5rem' }}>N</span>
        </motion.div>
        <div className="text-black font-black uppercase tracking-widest text-center" style={{ fontSize: '1.1rem' }}>Neura AI</div>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center space-y-8">
        <div className="space-y-3">
          <div className="text-black/40 font-bold uppercase tracking-widest" style={{ fontSize: '0.9rem' }}>Palette</div>
          <div className="flex gap-4">
            {['#000000', '#1B3FBF', '#FACC15', '#F8F9FF'].map((c, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="w-14 h-14 rounded-2xl border border-black/5 shadow-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-black/40 font-bold uppercase tracking-widest mb-2" style={{ fontSize: '0.9rem' }}>Typography</div>
          <div className="font-serif italic text-black tracking-tighter" style={{ fontSize: '2.8rem', lineHeight: 1 }}>Instrument</div>
          <div className="text-black/30 font-light" style={{ fontSize: '1.6rem' }}>Satoshi</div>
        </div>
      </div>
    </motion.div>
  </div>
);

const Scene7 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    {["KREO is not just a tool.", "It is something more."].map((line, i) => (
      <motion.h1 key={i}
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif italic tracking-tighter leading-tight ${i === 1 ? 'text-[#1B3FBF]' : 'text-black'}`}
        style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
        {line}
      </motion.h1>
    ))}
  </div>
);

const Scene8 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    {["It is your", "creative home."].map((line, i) => (
      <motion.h1 key={i}
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif italic tracking-tighter leading-tight ${i === 1 ? 'text-[#1B3FBF]' : 'text-black'}`}
        style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}>
        {line}
      </motion.h1>
    ))}
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
      className="text-black/25 font-serif italic tracking-tighter mt-8"
      style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}>
      Every creator deserves a place to belong.
    </motion.h2>
  </div>
);

const Scene9 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 700); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full border border-white/10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ repeat: Infinity, duration: 5 + i, delay: i * 0.7 }}
          style={{ width: `${(i + 1) * 20}vw`, height: `${(i + 1) * 20}vw` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...TAN, fontSize: 'clamp(6rem, 18vw, 18rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 0 160px rgba(255,255,255,0.2)' }}>
          KREON
        </motion.div>
      </div>
    </div>
  );
};

const Scene10 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    {["Your card.", "Your number.", "Your story."].map((line, i) => (
      <motion.h1 key={i}
        initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif italic tracking-tighter leading-tight"
        style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: i === 2 ? '#1B3FBF' : 'black' }}>
        {line}
      </motion.h1>
    ))}
  </div>
);

// ─── SCENE 11: CARDS IN CIRCLE — large, static circle, dramatic entrances ──
const CIRCLE_CARDS = [
  { theme: CARD_THEMES[0], name: 'ARJUN S.', num: '0001' },
  { theme: CARD_THEMES[1], name: 'SARA K.', num: '0042' },
  { theme: CARD_THEMES[2], name: 'MAYA L.', num: '0108' },
  { theme: CARD_THEMES[3], name: 'RAVI M.', num: '0247' },
  { theme: CARD_THEMES[4], name: 'PRIYA T.', num: '0389' },
  { theme: CARD_THEMES[5], name: 'ZEN O.', num: '0512' },
  { theme: CARD_THEMES[6], name: 'ALI H.', num: '0778' },
  { theme: CARD_THEMES[7], name: 'DHRUV G.', num: '1024' },
];

const Scene11 = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      c++;
      setVisibleCount(c);
      if (c >= 4) clearInterval(interval);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden px-10">
      {/* PERFECT CENTER KREON */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           style={{ ...TAN, fontSize: 'clamp(6rem, 16vw, 16rem)', color: '#1B3FBF', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 0 100px rgba(27,63,191,0.2)' }}
        >
          KREON
        </motion.div>
      </div>

      {/* Very Simple Horizontal Card Row */}
      <div className="relative z-10 flex items-center justify-center gap-6 w-full flex-wrap">
        {[CIRCLE_CARDS[0], CIRCLE_CARDS[1], CIRCLE_CARDS[2], CIRCLE_CARDS[3]].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: i < visibleCount ? 1 : 0, y: i < visibleCount ? 0 : 50, scale: i < visibleCount ? 1 : 0.9 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <KreonCardReal theme={card.theme} name={card.name} num={card.num} width={260} height={360} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── SCENE 12: CARD WORLDS — highly simplified ──────────────────────────────
const SHOWCASE_CARDS = [
  { theme: CARD_THEMES[0], name: 'ARJUN S.', num: '0001', word: 'Engineer.' },
  { theme: CARD_THEMES[1], name: 'SARA K.', num: '0042', word: 'Designer.' },
  { theme: CARD_THEMES[2], name: 'MAYA L.', num: '0108', word: 'Artist.' },
  { theme: CARD_THEMES[3], name: 'RAVI M.', num: '0247', word: 'Builder.' },
  { theme: CARD_THEMES[4], name: 'PRIYA T.', num: '0389', word: 'Creator.' },
];

const Scene12 = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % SHOWCASE_CARDS.length), 2000);
    return () => clearInterval(t);
  }, []);

  const current = SHOWCASE_CARDS[idx];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: current.theme.bg, transition: 'background-color 0.8s ease' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
           <motion.div 
              key={idx + "-text"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif italic text-white" style={{ fontSize: 'clamp(6rem, 18vw, 18rem)', lineHeight: 0.8, fontWeight: 900, whiteSpace: 'nowrap' }}
           >
              {current.word}
           </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx + '-card'}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <KreonCardReal
              theme={current.theme}
              name={current.name}
              num={current.num}
              width={340}
              height={480}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── SCENE 13: Possibilities ─────────────────────────────────────────────────
const PILE = [
  "Pitch Decks", "SaaS Dashboards", "Flowcharts", "Brand Kits", "Landing Pages",
  "Financial Models", "Storyboards", "API Docs", "System Architecture",
  "Mind Maps", "Style Guides", "Legal Briefs", "KREON Cards", "UI Mockups",
];

const Scene13 = () => {
  const [count, setCount] = useState(0);
  const positions = useMemo(() => PILE.map(() => ({ x: (Math.random() * 68) - 34, y: (Math.random() * 48) - 24, r: (Math.random() * 28) - 14 })), []);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c++; setCount(c); if (c >= PILE.length) clearInterval(t); }, 220);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute top-12 font-serif italic text-black tracking-tighter text-center z-[100] pointer-events-none"
        style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
        Build without limits.
      </motion.h1>
      <div className="relative flex-1 w-full flex items-center justify-center">
        {PILE.map((text, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: i < count ? 1 : 0, scale: i < count ? 1 : 0.5, x: `${positions[i].x}vw`, y: `${positions[i].y}vh`, rotate: positions[i].r, zIndex: i }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bg-[#1B3FBF] rounded-[2rem] flex items-center justify-center shadow-xl"
            style={{ minWidth: '220px', padding: '14px 28px' }}>
            <span className="text-white font-serif italic" style={{ fontSize: '1.25rem' }}>{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── SCENE 14: Finale ────────────────────────────────────────────────────────
const Scene14 = () => {
  const [text, setText] = useState('');
  const target = 'KREO';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setText(target.slice(0, i + 1)); i++; if (i >= target.length) clearInterval(t); }, 380);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center gap-8 overflow-hidden">
      <motion.div style={{ ...TAN, fontSize: 'clamp(9rem, 22vw, 20rem)', color: '#1B3FBF', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {text}
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ display: 'inline-block', width: '0.06em', height: '1em', backgroundColor: '#1B3FBF', verticalAlign: 'middle', marginLeft: 4 }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}
        className="font-serif italic text-[#1B3FBF]/40"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}>
        creoai.vercel.app
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

  const scenes = [
    <Scene0 />, <Scene1 />, <Scene2 />, <Scene3 />,
    <Scene4 />, <Scene5 />, <Scene6 />, <Scene7 />,
    <Scene8 />, <Scene9 />, <Scene10 />, <Scene11 />,
    <Scene12 />, <Scene13 />, <Scene14 />,
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Scene dots */}
      <div className="fixed top-8 right-10 z-[6000] flex items-center gap-1.5">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{ width: i === scene ? 24 : 8, height: 8, backgroundColor: i === scene ? '#1B3FBF' : 'rgba(0,0,0,0.1)' }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65 }} className="w-full h-full">
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 w-full bg-black/5" style={{ height: 3, zIndex: 6000 }}>
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
