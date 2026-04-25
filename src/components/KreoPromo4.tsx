import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KreonCardVisual } from './KreonCard';
import { Check, X, Zap, ChevronRight } from 'lucide-react';

// ─── Font Helpers ─────────────────────────────────────────────────────────────
const IS = 'Instrument Serif, serif';
const SAT = 'Satoshi, sans-serif';

// ─── Reusable centered text slide ────────────────────────────────────────────
const TextSlide = ({
  label, title, sub, badge
}: { label: string; title: React.ReactNode; sub: string; badge?: string }) => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl space-y-6"
    >
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/50">{label}</p>
      <h1 style={{ fontFamily: IS }} className="text-6xl md:text-7xl italic text-black tracking-tighter leading-none">
        {title}
      </h1>
      <p style={{ fontFamily: SAT }} className="text-lg text-black/35 font-light leading-relaxed max-w-xl mx-auto">{sub}</p>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3FBF]/8 border border-[#1B3FBF]/12">
          <div className="w-5 h-5 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0">
            <Check size={9} className="text-white" />
          </div>
          <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-[#1B3FBF] uppercase tracking-widest">{badge}</span>
        </div>
      )}
    </motion.div>
  </div>
);

// ─── Reusable centered demo container ────────────────────────────────────────
const DemoSlide = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-[#F8F9FF] flex flex-col items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl flex flex-col items-center gap-6"
    >
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">{label}</p>
      {children}
    </motion.div>
  </div>
);

// ─── Scene Durations ──────────────────────────────────────────────────────────
// 0:intro  1:claude-text  2:identity-text  3:identity-demo
// 4:style-text  5:style-demo  6:brand-text  7:brand-demo
// 8:liveedit-text  9:liveedit-demo  10:knobs-text  11:knobs-demo
// 12:export-text  13:export-demo  14:price  15:cta
const SCENE_DURATION = [
  4000,  // 0  Intro
  5500,  // 1  Claude problem
  3500,  // 2  Identity text
  5500,  // 3  Identity demo (cards)
  3500,  // 4  Style Mimic text
  5000,  // 5  Style Mimic demo
  3500,  // 6  Brand Kit text
  5000,  // 7  Brand Kit demo
  3500,  // 8  Live Edit text
  5000,  // 9  Live Edit demo
  3500,  // 10 Knobs text
  5500,  // 11 Knobs demo
  3500,  // 12 Export text
  5000,  // 13 Export demo
  6000,  // 14 Price
  6000,  // 15 CTA
];
const TOTAL = SCENE_DURATION.length;

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  { interest: 'tech' as const,         name: 'DHRUV G.',  num: '0012' },
  { interest: 'design' as const,       name: 'ANYA M.',   num: '0047' },
  { interest: 'product' as const,      name: 'RAJAN K.',  num: '0091' },
  { interest: 'art' as const,          name: 'PRIYA S.',  num: '0133' },
  { interest: 'music' as const,        name: 'ARJUN R.',  num: '0197' },
];

// ─── Individual scenes ────────────────────────────────────────────────────────

const S0 = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
      <AnimatePresence mode="wait">
        {step < 2 ? (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ fontFamily: SAT }} className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">A Visual Creator's Reality Check</p>
          </motion.div>
        ) : (
          <motion.div key="b" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-2xl">
            <h1 style={{ fontFamily: IS }} className="text-7xl md:text-[10vw] italic text-black tracking-tighter leading-none">Honestly?</h1>
            <p style={{ fontFamily: SAT }} className="text-lg text-black/30 font-light">Let's be real about this.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const S1 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-xl space-y-6 text-center"
    >
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">The Context</p>
      <h2 style={{ fontFamily: IS }} className="text-5xl md:text-6xl italic text-black tracking-tighter leading-tight">
        Claude is brilliant.<br /><span className="text-black/25">For general AI.</span>
      </h2>
      <p style={{ fontFamily: SAT }} className="text-base text-black/35 font-light leading-relaxed">
        It's one of the most impressive AI systems ever built. It also has zero features built for visual creators.
      </p>
      <div className="mt-4 space-y-3 text-left max-w-sm mx-auto">
        {['No identity system', 'No visual persistence', 'No live element editing', 'No export suite'].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <X size={10} className="text-red-400" />
            </div>
            <span style={{ fontFamily: SAT }} className="text-[12px] text-black/50 font-light">{t}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// Identity text
const S2 = () => (
  <TextSlide
    label="01 / Identity"
    title={<>KREO feels like a<br /><span className="text-[#1B3FBF]">community.</span></>}
    sub="KREONs, the card system, discipline-based onboarding. Claude has zero personality around users."
    badge="KREO WINS — Identity"
  />
);

// Identity demo
const S3 = () => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setVisible(i); if (i >= CARDS.length) clearInterval(t); }, 700);
    return () => clearInterval(t);
  }, []);
  return (
    <DemoSlide label="KREON Identity Cards">
      <div className="relative flex items-end justify-center" style={{ width: 280, height: 360 }}>
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={i < visible ? { opacity: 1, y: i * -12, x: i * 4, rotate: -8 + i * 4, zIndex: i } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            className="absolute"
            style={{ transformOrigin: 'bottom center', transform: `scale(0.75) rotate(${-8 + i * 4}deg)` }}
          >
            <KreonCardVisual cardNumber={card.num} userName={card.name} interest={card.interest} bio="Visual creator & KREON resident." />
          </motion.div>
        ))}
      </div>
      <p style={{ fontFamily: SAT }} className="text-[10px] text-black/30 font-black uppercase tracking-[0.4em] text-center">
        5 disciplines · 5 real identities · 0 concepts in Claude
      </p>
    </DemoSlide>
  );
};

// Style Mimic text
const S4 = () => (
  <TextSlide
    label="02 / Style Mimic"
    title={<>Paste a URL.<br /><span className="text-[#1B3FBF]">Get that aesthetic.</span></>}
    sub="Paste stripe.com, get that aesthetic — colors, spacing, components. Claude can't do this."
    badge="KREO WINS — Style Mimic"
  />
);

// Style Mimic demo
const S5 = () => (
  <DemoSlide label="Style Extraction Engine">
    <div className="w-full rounded-3xl bg-white border border-black/5 shadow-xl p-6 space-y-5">
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f0f4ff] border border-[#1B3FBF]/10">
        <div className="w-6 h-6 rounded-full bg-[#1B3FBF] flex items-center justify-center">
          <Zap size={10} className="text-white" />
        </div>
        <span style={{ fontFamily: SAT }} className="text-[11px] text-black/50 font-light flex-1">https://stripe.com</span>
        <span style={{ fontFamily: SAT }} className="text-[9px] text-[#1B3FBF] font-black uppercase tracking-widest bg-[#1B3FBF]/10 px-2 py-1 rounded-full">✓ Captured</span>
      </div>
      <div className="h-[1px] bg-black/5" />
      <div className="space-y-3">
        {[
          { k: 'Primary', v: '#6772E5', isColor: true },
          { k: 'Background', v: '#F6F9FC', isColor: true },
          { k: 'Dark', v: '#32325D', isColor: true },
          { k: 'Font', v: 'Inter', isColor: false },
          { k: 'Radius', v: '4px', isColor: false },
        ].map((row, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between"
          >
            <span style={{ fontFamily: SAT }} className="text-[10px] text-black/30 uppercase tracking-widest">{row.k}</span>
            <div className="flex items-center gap-2">
              {row.isColor && <div className="w-4 h-4 rounded" style={{ background: row.v }} />}
              <span style={{ fontFamily: SAT }} className="text-[11px] font-black text-black">{row.v}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="p-4 rounded-2xl text-white text-center text-[11px] font-black uppercase tracking-widest"
        style={{ background: '#6772E5', fontFamily: SAT }}
      >
        ⚡ Style Applied to Artifact
      </motion.div>
    </div>
  </DemoSlide>
);

// Brand Kit text
const S6 = () => (
  <TextSlide
    label="03 / Brand Kit"
    title={<>Your design system.<br /><span className="text-[#1B3FBF]">Persists forever.</span></>}
    sub="Colors, fonts, radius — saved once, injected automatically into every artifact. Claude forgets everything."
    badge="KREO WINS — Brand Kit"
  />
);

// Brand Kit demo
const S7 = () => (
  <DemoSlide label="Brand DNA · Always Active">
    <div className="w-full rounded-3xl bg-white border border-black/5 shadow-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: '#1B3FBF', fontFamily: SAT }}>K</div>
          <div>
            <p style={{ fontFamily: SAT }} className="text-[11px] font-black">Brand Kit Active</p>
            <p style={{ fontFamily: SAT }} className="text-[9px] text-black/30">Persists across all sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <span style={{ fontFamily: SAT }} className="text-[9px] text-green-600 font-black">LIVE</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['#1B3FBF', '#0020C2', '#F0F4FF', '#000000'].map((c, i) => (
          <div key={i} className="aspect-square rounded-xl border border-black/5 shadow-sm" style={{ background: c }} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Satoshi', '12px', 'Logo ✓'].map((v, i) => (
          <div key={i} style={{ fontFamily: SAT }} className="py-2 text-center rounded-xl text-[9px] font-black bg-black/[0.03] border border-black/5 text-black/40 uppercase tracking-wider">{v}</div>
        ))}
      </div>
      <div className="h-[1px] bg-black/5" />
      <p style={{ fontFamily: SAT }} className="text-[9px] text-black/25 font-black uppercase tracking-[0.4em] text-center">↓ Applied automatically to every artifact</p>
      <div className="grid grid-cols-3 gap-2">
        {['Dashboard', 'Landing', 'Pitch', 'Form', 'Portfolio', 'Report'].map((v, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
            className="py-2.5 rounded-xl text-white text-center text-[9px] font-black uppercase tracking-wide"
            style={{ background: '#1B3FBF', fontFamily: SAT }}>{v}</motion.div>
        ))}
      </div>
    </div>
  </DemoSlide>
);

// Live Edit text
const S8 = () => (
  <TextSlide
    label="04 / Live Edit"
    title={<>Click any element.<br /><span className="text-[#1B3FBF]">Re-prompt just that.</span></>}
    sub="Click any element in your manifest, describe the change. Only that piece updates. Claude regenerates everything every time."
    badge="KREO WINS — Live Edit"
  />
);

// Live Edit demo
const S9 = () => (
  <DemoSlide label="Neural Command · Element-Level Edit">
    <div className="w-full rounded-3xl bg-[#030318] p-6 space-y-4">
      <p style={{ fontFamily: SAT }} className="text-[9px] text-white/20 uppercase tracking-[0.5em]">Live Manifest — Edit Mode Active</p>
      <div className="space-y-2">
        {[
          { el: 'nav', label: 'Navigation Bar', active: false },
          { el: 'h1', label: 'Hero Title', active: true },
          { el: 'p', label: 'Body Copy', active: false },
          { el: 'button', label: 'CTA Button', active: false },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.active ? 'border-[#1B3FBF] bg-[#1B3FBF]/20' : 'border-white/5 bg-white/[0.03]'}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black ${item.active ? 'bg-[#1B3FBF] text-white' : 'bg-white/5 text-white/20'}`} style={{ fontFamily: SAT }}>{item.el}</div>
            <span style={{ fontFamily: SAT }} className={`text-[11px] font-black flex-1 ${item.active ? 'text-white' : 'text-white/25'}`}>{item.label}</span>
            {item.active && <span style={{ fontFamily: SAT }} className="text-[9px] text-[#1B3FBF] font-black bg-[#1B3FBF]/20 px-2 py-0.5 rounded-full">Selected ✓</span>}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="p-3 rounded-xl bg-[#1B3FBF]/10 border border-[#1B3FBF]/20 space-y-1"
      >
        <p style={{ fontFamily: SAT }} className="text-[10px] text-[#1B3FBF] font-light italic">"Make this bold and increase size to 5xl"</p>
        <p style={{ fontFamily: SAT }} className="text-[9px] text-[#1B3FBF]/40 font-black uppercase tracking-widest">⚡ Orchestrating Local Edit...</p>
      </motion.div>
    </div>
  </DemoSlide>
);

// Knobs text
const S10 = () => (
  <TextSlide
    label="05 / Knobs"
    title={<>Real-time controls.<br /><span className="text-[#1B3FBF]">Zero credits.</span></>}
    sub="Live sliders for brand color, radius, font size, dark mode — all instant, no regeneration, no credits consumed."
    badge="KREO WINS — Knobs"
  />
);

// Knobs demo
const S11 = () => {
  const colors = ['#1B3FBF', '#ec4899', '#f97316', '#22c55e', '#8b5cf6'];
  const [ci, setCi] = useState(0);
  const [radius, setRadius] = useState(12);
  useEffect(() => {
    const t = setInterval(() => {
      setCi(p => { const n = (p + 1) % colors.length; setRadius(4 + n * 6); return n; });
    }, 1200);
    return () => clearInterval(t);
  }, []);
  const color = colors[ci];
  return (
    <DemoSlide label="Aesthetic Engine · Live Override">
      <div className="w-full rounded-3xl bg-white border border-black/5 shadow-xl p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-black/40 uppercase tracking-widest">Brand Primary</span>
            <span style={{ fontFamily: SAT, color }} className="text-[10px] font-mono transition-all duration-700 font-black">{color}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-black/5 transition-all duration-700" style={{ background: color }} />
            <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: '60%', background: color }} />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: SAT }} className="text-[10px] font-black text-black/40 uppercase tracking-widest">Border Radius</span>
            <span style={{ fontFamily: SAT }} className="text-[10px] font-mono font-black text-black">{radius}px</span>
          </div>
          <div className="h-2 bg-black/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${radius * 2.5}%`, background: color }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="py-3 text-white text-center text-[10px] font-black uppercase tracking-widest transition-all duration-700"
            style={{ background: color, borderRadius: radius + 'px', fontFamily: SAT }}>Primary</div>
          <div className="py-3 text-center text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-700"
            style={{ color, borderColor: color, borderRadius: radius + 'px', fontFamily: SAT }}>Outline</div>
        </div>
        <p style={{ fontFamily: SAT }} className="text-center text-[9px] text-black/25 font-black uppercase tracking-widest">
          Changes apply instantly · No credits consumed
        </p>
      </div>
    </DemoSlide>
  );
};

// Export text
const S12 = () => (
  <TextSlide
    label="06 / Ecosystem Export"
    title={<>ZIP. PPTX. Canva.<br /><span className="text-[#1B3FBF]">One click each.</span></>}
    sub="Export as HTML, production ZIP, cinematic PPTX, or push directly to Canva — automated. Claude gives you code."
    badge="KREO WINS — Export"
  />
);

// Export demo
const S13 = () => (
  <DemoSlide label="Export Suite · One-Click Production">
    <div className="w-full space-y-3">
      {[
        { label: 'Manifest Source', ext: '.html', desc: 'Full production HTML', color: '#1B3FBF' },
        { label: 'Dev Package', ext: '.zip', desc: 'Complete project bundle', color: '#8b5cf6' },
        { label: 'Cinematic PPTX', ext: '.pptx', desc: 'Presentation-ready slides', color: '#f97316' },
        { label: 'Canva Bridge', ext: 'Canva', desc: 'Auto-inject media asset', color: '#ec4899' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
          className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
            style={{ background: item.color, fontFamily: SAT }}>{item.ext}</div>
          <div className="flex-1">
            <p style={{ fontFamily: SAT }} className="text-[12px] font-black text-black">{item.label}</p>
            <p style={{ fontFamily: SAT }} className="text-[10px] text-black/30 font-light">{item.desc}</p>
          </div>
          <ChevronRight size={13} className="text-black/20" />
        </motion.div>
      ))}
    </div>
  </DemoSlide>
);

// Price
const S14 = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-8">
      <div className="text-center space-y-3">
        <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25">07 / Pricing Reality</p>
        <h2 style={{ fontFamily: IS }} className="text-7xl md:text-8xl italic text-white tracking-tighter leading-none">$1 vs. $20.</h2>
        <p style={{ fontFamily: SAT }} className="text-base text-white/30 font-light">Per month. No asterisk.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-3xl border border-[#1B3FBF]/30 bg-[#1B3FBF]/10 p-6">
          <div style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-widest text-[#1B3FBF] mb-3">KREO Pro</div>
          <div style={{ fontFamily: IS }} className="text-5xl italic text-white mb-5">$1<span className="text-xl text-white/30 not-italic font-light">/mo</span></div>
          {['Unlimited generations', 'Brand Kit persists', 'Live Edit & Knobs', 'Style Mimic', 'Full export suite', 'KREON Identity'].map(f => (
            <div key={f} className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#1B3FBF] flex items-center justify-center"><Check size={7} className="text-white" /></div>
              <span style={{ fontFamily: SAT }} className="text-[10px] text-white/60">{f}</span>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-3xl border border-white/5 bg-white/[0.03] p-6">
          <div style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">Claude Pro</div>
          <div style={{ fontFamily: IS }} className="text-5xl italic text-white/20 mb-5">$20<span className="text-xl not-italic font-light">/mo</span></div>
          {[['General AI', true], ['No visual artifacts', false], ['No Brand Kit', false], ['No live editing', false], ['No export tools', false], ['No identity', false]].map(([f, ok]) => (
            <div key={String(f)} className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${ok ? 'bg-white/10' : 'bg-white/5'}`}>
                {ok ? <Check size={7} className="text-white/30" /> : <X size={7} className="text-white/15" />}
              </div>
              <span style={{ fontFamily: SAT }} className={`text-[10px] ${ok ? 'text-white/25' : 'text-white/10 line-through'}`}>{String(f)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// CTA
const S15 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8 overflow-hidden">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-8 max-w-2xl relative z-10">
      <p style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">The Answer</p>
      <h1 style={{ fontFamily: IS }} className="text-6xl md:text-8xl italic text-black tracking-tighter leading-none">
        Stop explaining.<br /><span className="text-[#1B3FBF]">Start building.</span>
      </h1>
      <p style={{ fontFamily: SAT }} className="text-lg text-black/30 font-light leading-relaxed">
        You shouldn't pay $20/month for a tool that forgets your brand, rebuilds everything on every change, and has no idea who you are.
      </p>
      <a href="/" style={{ fontFamily: SAT }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#1B3FBF] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#1B3FBF]/30">
        Join KREO for $1/month <ChevronRight size={14} />
      </a>
      <p style={{ fontFamily: SAT }} className="text-[9px] text-black/15 font-black uppercase tracking-widest">kreoai.vercel.app</p>
    </motion.div>
    {/* subtle background cards */}
    <div className="absolute -right-16 bottom-0 flex gap-2 opacity-[0.07] pointer-events-none" style={{ transform: 'scale(0.5) translateY(20%)' }}>
      {(['tech', 'design', 'art'] as const).map((interest, i) => (
        <div key={i} style={{ transform: `rotate(${-6 + i * 6}deg)` }}>
          <KreonCardVisual cardNumber={`00${i + 1}2`} userName="KREON" interest={interest} bio="" />
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const SCENES = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];

export default function KreoPromo4() {
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
        setScene(p => (p + 1) % TOTAL);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(intervalRef.current);
  }, [scene]);

  const SceneComp = SCENES[scene];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-white">
      {/* Nav dots */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9000] flex items-center gap-1.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-400 ${i === scene ? 'w-6 h-1.5 bg-[#1B3FBF]' : 'w-1.5 h-1.5 bg-black/15 hover:bg-black/30'}`}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="fixed top-6 left-8 z-[9000] flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Zap size={11} className="text-white" />
        </div>
        <span style={{ fontFamily: SAT }} className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30">KREO</span>
      </div>

      {/* Scene counter */}
      <div className="fixed top-6 right-8 z-[9000]">
        <span style={{ fontFamily: SAT }} className="text-[9px] font-black text-black/20 uppercase tracking-widest">{scene + 1} / {TOTAL}</span>
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full"
        >
          <SceneComp />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-[9000] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-none" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
