import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KreonCardVisual } from './KreonCard';
import { Check, X, Zap, ChevronRight } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from './Hello (apple).json';

// ─── Typography Helpers ───────────────────────────────────────────────────────
const IS = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span style={{ fontFamily: "'Instrument Serif', serif" }} className={className}>{children}</span>
);
const SAT = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span style={{ fontFamily: "'Satoshi', sans-serif" }} className={className}>{children}</span>
);

// ─── Scene Durations ──────────────────────────────────────────────────────────
const SCENE_DURATION = [
  4500,  // 0: Intro — "Honestly?"
  5000,  // 1: Problem — "Claude is great, but..."
  6000,  // 2: Identity — KREON cards
  5500,  // 3: Style Mimic
  5500,  // 4: Brand Kit
  5500,  // 5: Live Edit
  5500,  // 6: Knobs
  5500,  // 7: Export
  6000,  // 8: Price
  6000,  // 9: CTA
];
const TOTAL_SCENES = SCENE_DURATION.length;

// ─── SCENE 0: Intro ───────────────────────────────────────────────────────────
const Scene0 = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SAT className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">A Visual Creator's Reality Check</SAT>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-7xl md:text-[10vw] italic text-black tracking-tighter leading-none">
              Honestly?
            </h1>
            <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-lg text-black/30 font-light">Let's be real about this.</p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6 max-w-3xl">
            <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-7xl italic text-black tracking-tighter leading-tight">
              Where does <span className="text-[#1B3FBF]">KREO</span> actually win?
            </h1>
            <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-base text-black/30 font-light uppercase tracking-[0.4em] text-sm">8 reasons. Clear, honest, real.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── SCENE 1: Claude Problem ──────────────────────────────────────────────────
const Scene1 = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="fixed inset-0 bg-[#f8f9ff] flex items-center justify-center px-10">
      <div className="max-w-5xl w-full grid grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          <SAT className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/50">The Context</SAT>
          <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-6xl italic text-black tracking-tighter leading-tight">
            Claude is brilliant.<br />
            <span className="text-black/30">For general AI.</span>
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-lg text-black/40 font-light leading-relaxed">
            It's one of the most impressive AI systems ever built. It also has zero features built for visual creators.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
          {[
            { text: 'No identity system', sub: 'You are just a session ID' },
            { text: 'No visual persistence', sub: 'Forgets your brand every time' },
            { text: 'No live element editing', sub: 'Regenerates everything, always' },
            { text: 'No export suite', sub: 'Code in. You figure out the rest.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-black/5">
              <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X size={12} className="text-red-400" />
              </div>
              <div>
                <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[12px] font-black text-black">{item.text}</p>
                <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] text-black/30 font-light">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ─── SCENE 2: Identity — Real Kreon Cards ────────────────────────────────────
const CARD_DATA = [
  { interest: 'tech' as const, name: 'DHRUV G.', num: '0012' },
  { interest: 'design' as const, name: 'ANYA M.', num: '0047' },
  { interest: 'product' as const, name: 'RAJAN K.', num: '0091' },
  { interest: 'art' as const, name: 'PRIYA S.', num: '0133' },
  { interest: 'music' as const, name: 'ARJUN R.', num: '0197' },
];

const Scene2 = () => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= CARD_DATA.length) clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center px-8 md:px-16 overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 space-y-5 text-center md:text-left"
        >
          <SAT className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/50 block">01 / Identity</SAT>
          <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-6xl italic text-black tracking-tighter leading-tight">
            KREO feels like a&nbsp;<span className="text-[#1B3FBF]">community.</span>
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-base text-black/40 font-light leading-relaxed">
            KREONs. Discipline-based identity cards. Onboarding that knows who you are. Claude has zero concept of this.
          </p>
          <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-[#1B3FBF]/5 border border-[#1B3FBF]/10">
            <div className="w-7 h-7 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-white" />
            </div>
            <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] text-[#1B3FBF] font-black">KREO WINS — Community & Identity</p>
          </div>
        </motion.div>

        {/* Fanned Cards — scaled down and contained */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 280, height: 400 }}>
          <div className="relative" style={{ width: 265, height: 375 }}>
            {CARD_DATA.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: -12 + i * 4 }}
                animate={i < visible ? {
                  opacity: 1,
                  y: i * -14,
                  x: i * 5,
                  rotate: -6 + i * 3,
                  zIndex: i,
                } : {}}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                className="absolute"
                style={{ transformOrigin: 'bottom center', transform: 'scale(0.78)' }}
              >
                <KreonCardVisual
                  cardNumber={card.num}
                  userName={card.name}
                  interest={card.interest}
                  bio="Visual creator & KREON resident."
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── GENERIC FEATURE SCENE ───────────────────────────────────────────────────
interface FeatureSceneProps {
  num: string;
  label: string;
  title: React.ReactNode;
  kreo: string;
  claude: string;
  visual: React.ReactNode;
  bg?: string;
  dark?: boolean;
}

const FeatureScene = ({ num, label, title, kreo, claude, visual, bg = 'bg-white', dark = false }: FeatureSceneProps) => {
  const text = dark ? 'text-white' : 'text-black';
  const sub = dark ? 'text-white/40' : 'text-black/40';
  return (
    <div className={`fixed inset-0 ${bg} flex items-center justify-center px-10 overflow-hidden`}>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <SAT className={`text-[9px] font-black uppercase tracking-[0.5em] ${dark ? 'text-white/30' : 'text-[#1B3FBF]/50'}`}>{num} / {label}</SAT>
          <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className={`text-5xl md:text-6xl italic ${text} tracking-tighter leading-tight`}>
            {title}
          </h2>
          <div className="space-y-3 pt-2">
            <div className={`flex items-start gap-3 p-4 rounded-2xl ${dark ? 'bg-white/10 border-white/10' : 'bg-[#1B3FBF]/5 border-[#1B3FBF]/10'} border`}>
              <div className="w-6 h-6 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={10} className="text-white" /></div>
              <p style={{ fontFamily: "'Satoshi', sans-serif" }} className={`text-[12px] ${dark ? 'text-white/80' : 'text-black/70'} font-light leading-relaxed`}><span className="font-black">KREO:</span> {kreo}</p>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-2xl ${dark ? 'bg-white/5 border-white/5' : 'bg-black/[0.02] border-black/5'} border`}>
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><X size={10} className="text-red-400" /></div>
              <p style={{ fontFamily: "'Satoshi', sans-serif" }} className={`text-[12px] ${dark ? 'text-white/40' : 'text-black/40'} font-light leading-relaxed`}><span className="font-black">Claude:</span> {claude}</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          {visual}
        </motion.div>
      </div>
    </div>
  );
};

// ─── SCENE 3: Style Mimic ────────────────────────────────────────────────────
const Scene3 = () => (
  <FeatureScene
    num="02" label="Style Mimic"
    title={<>Paste a URL.<br /><span className="text-[#1B3FBF]">Get that exact aesthetic.</span></>}
    kreo="Paste stripe.com, get that aesthetic — colors, spacing, components. Instant extraction, instant application."
    claude="Cannot read live websites. Cannot extract or replicate visual styles. There is no equivalent feature."
    visual={
      <div className="rounded-3xl bg-[#f0f4ff] border border-black/5 p-8 space-y-5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-black/5">
          <div className="w-6 h-6 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0">
            <Zap size={10} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] text-black/40 font-light flex-1">https://stripe.com</span>
          <div className="text-[9px] text-[#1B3FBF] font-black uppercase tracking-widest bg-[#1B3FBF]/10 px-2 py-1 rounded-full">Captured</div>
        </div>
        <div className="h-[1px] bg-black/5" />
        <div className="space-y-3">
          {['#6772E5', '#F6F9FC', '#32325D', 'Inter', '4px radius'].map((v, i) => (
            <div key={i} className="flex items-center justify-between">
              <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] text-black/30 uppercase tracking-widest">
                {['Primary', 'Background', 'Dark', 'Font', 'Radius'][i]}
              </span>
              <div className="flex items-center gap-2">
                {i < 3 && <div className="w-4 h-4 rounded" style={{ background: v }} />}
                <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] font-black text-black">{v}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl text-white text-center text-[11px] font-black uppercase tracking-widest" style={{ background: '#6772E5', fontFamily: "'Satoshi', sans-serif" }}>
          Style Applied to Artifact
        </div>
      </div>
    }
  />
);

// ─── SCENE 4: Brand Kit ──────────────────────────────────────────────────────
const Scene4 = () => (
  <FeatureScene
    num="03" label="Brand Kit"
    title={<>Your design system.<br /><span className="text-[#1B3FBF]">Persists forever.</span></>}
    kreo="Colors, fonts, radius — saved once, injected automatically into every artifact you ever generate."
    claude="Forgets everything between sessions. Your brand has to be re-explained every single time, from scratch."
    visual={
      <div className="space-y-4">
        <div className="rounded-3xl bg-[#f0f4ff] border border-black/5 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: '#1B3FBF', fontFamily: "'Satoshi', sans-serif" }}>K</div>
              <div>
                <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] font-black">Brand Kit Active</p>
                <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-black/30">Persists across sessions</p>
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['#1B3FBF','#0020C2','#F0F4FF','#000000'].map((c, i) => (
              <div key={i} className="aspect-square rounded-xl border border-white/50" style={{ background: c }} />
            ))}
          </div>
          <div className="flex gap-2">
            {['Inter', '12px', 'Logo ✓'].map((v, i) => (
              <div key={i} style={{ fontFamily: "'Satoshi', sans-serif" }} className="flex-1 text-center py-2 rounded-xl text-[9px] font-black bg-white border border-black/5 text-black/50 uppercase tracking-wider">{v}</div>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-center text-[9px] text-black/30 font-black uppercase tracking-[0.4em]">
          ↓ Applied to every artifact automatically
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Dashboard', 'Landing', 'Pitch'].map((v, i) => (
            <div key={i} className="py-3 rounded-2xl text-white text-center text-[9px] font-black uppercase tracking-wide" style={{ background: '#1B3FBF', fontFamily: "'Satoshi', sans-serif" }}>{v}</div>
          ))}
        </div>
      </div>
    }
  />
);

// ─── SCENE 5: Live Edit ──────────────────────────────────────────────────────
const Scene5 = () => (
  <FeatureScene
    num="04" label="Live Edit"
    title={<>Click any element.<br /><span className="text-[#1B3FBF]">Re-prompt just that piece.</span></>}
    kreo="Enable Live Edit, click any element in your manifest, describe the change. Only that element gets updated."
    claude="Regenerates the entire codebase from scratch every single time. One word change = full rebuild."
    visual={
      <div className="rounded-3xl bg-[#030318] p-8 space-y-4">
        <div style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-white/20 uppercase tracking-[0.5em] mb-4">Live Manifest — Neural Edit Mode</div>
        <div className="space-y-3">
          {[
            { el: 'nav', label: 'Navigation', active: false },
            { el: 'h1', label: 'Hero Title', active: true },
            { el: 'p', label: 'Body Copy', active: false },
            { el: 'button', label: 'CTA Button', active: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.active ? 'border-[#1B3FBF] bg-[#1B3FBF]/20' : 'border-white/5 bg-white/5'}`}>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black ${item.active ? 'bg-[#1B3FBF] text-white' : 'bg-white/5 text-white/20'}`} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                {item.el}
              </div>
              <span style={{ fontFamily: "'Satoshi', sans-serif" }} className={`text-[11px] font-black ${item.active ? 'text-white' : 'text-white/30'}`}>{item.label}</span>
              {item.active && <div style={{ fontFamily: "'Satoshi', sans-serif" }} className="ml-auto text-[9px] text-[#1B3FBF] font-black uppercase tracking-widest bg-[#1B3FBF]/20 px-2 py-0.5 rounded-full">Selected</div>}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1B3FBF]/10 border border-[#1B3FBF]/20">
          <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] text-[#1B3FBF] font-light italic">"Make this text bold and increase size to 5xl"</p>
          <div style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-[#1B3FBF]/50 mt-1 font-black uppercase tracking-widest">⚡ Orchestrating Local Edit...</div>
        </div>
      </div>
    }
    bg="bg-white"
  />
);

// ─── SCENE 6: Knobs ──────────────────────────────────────────────────────────
const Scene6 = () => {
  const [primary, setPrimary] = useState('#1B3FBF');
  const [radius, setRadius] = useState(12);
  useEffect(() => {
    const colors = ['#1B3FBF', '#ec4899', '#f97316', '#22c55e', '#8b5cf6'];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setPrimary(colors[i % colors.length]);
      setRadius(4 + (i % 5) * 6);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <FeatureScene
      num="05" label="Knobs"
      title={<>Real-time controls.<br /><span style={{ color: primary }}>Zero credits spent.</span></>}
      kreo="Live sliders for brand color, border radius, font size, dark mode — all instant, no regeneration, no credits."
      claude="Has no concept of real-time visual controls. Every change goes back through the full generation pipeline."
      visual={
        <div className="rounded-3xl bg-[#f0f4ff] border border-black/5 p-8 space-y-6">
          <div style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-black/30 font-black uppercase tracking-[0.4em]">Aesthetic Engine · Live Override</div>
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] font-black text-black/50 uppercase tracking-widest">Brand Primary</span>
                <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] font-mono font-black" style={{ color: primary }}>{primary}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-black/5 transition-all duration-1000" style={{ background: primary }} />
                <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: '60%', background: primary }} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] font-black text-black/50 uppercase tracking-widest">Border Radius</span>
                <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] font-mono font-black text-black">{radius}px</span>
              </div>
              <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${radius * 2.5}%` }} />
              </div>
            </div>
            <div className="flex gap-2">
              {['Light', 'Dark'].map((m) => (
                <div key={m} style={{ fontFamily: "'Satoshi', sans-serif", borderRadius: radius + 'px' }} className="flex-1 py-3 text-center text-[9px] font-black uppercase tracking-widest transition-all duration-1000" style={{ background: m === 'Light' ? primary : '#030318', color: 'white', borderRadius: radius + 'px' }}>{m}</div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-black/5">
            <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-black/30 font-black uppercase tracking-widest text-center">Changes apply instantly · No credits consumed</p>
          </div>
        </div>
      }
    />
  );
};

// ─── SCENE 7: Export ─────────────────────────────────────────────────────────
const Scene7 = () => (
  <FeatureScene
    num="06" label="Ecosystem Export"
    title={<>ZIP. PPTX. Canva.<br /><span className="text-[#1B3FBF]">One click each.</span></>}
    kreo="Export as HTML/ZIP package, cinematic PPTX, or push directly to Canva — automated, no manual steps."
    claude="Gives you code. You figure out the rest. How to turn it into a PPTX is entirely your problem."
    visual={
      <div className="space-y-3">
        {[
          { label: 'Manifest Source', ext: '.html', desc: 'Full production-ready HTML', color: '#1B3FBF' },
          { label: 'Dev Package', ext: '.zip', desc: 'Complete project bundle', color: '#8b5cf6' },
          { label: 'Cinematic PPTX', ext: '.pptx', desc: 'Presentation-ready slides', color: '#f97316' },
          { label: 'Canva Bridge', ext: 'Canva', desc: 'Auto-inject media asset', color: '#ec4899' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8f9ff] border border-black/5 hover:border-black/10 transition-all"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[9px] font-black flex-shrink-0" style={{ background: item.color, fontFamily: "'Satoshi', sans-serif" }}>
              {item.ext}
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[12px] font-black text-black">{item.label}</p>
              <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] text-black/30 font-light">{item.desc}</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center">
              <ChevronRight size={11} className="text-black/30" />
            </div>
          </motion.div>
        ))}
      </div>
    }
  />
);

// ─── SCENE 8: Price ──────────────────────────────────────────────────────────
const Scene8 = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center px-10">
    <div className="max-w-4xl w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <SAT className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 block mb-4">07 / Pricing Reality Check</SAT>
        <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl md:text-8xl italic text-white tracking-tighter leading-none">
          $1 vs. $20.
        </h2>
        <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-base text-white/30 font-light mt-4">Per month. No asterisk.</p>
      </motion.div>
      <div className="grid grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-3xl border border-[#1B3FBF]/30 bg-[#1B3FBF]/10 p-8 relative">
          <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-white bg-[#1B3FBF] px-3 py-1 rounded-full" style={{ fontFamily: "'Satoshi', sans-serif" }}>KREO Pro</div>
          <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl italic text-white mb-6">$1<span className="text-2xl text-white/30 not-italic font-light">/mo</span></div>
          {['Unlimited generations', 'Brand Kit persistence', 'Live Edit & Knobs', 'Style Mimic', 'Full export suite', 'KREON Identity Card'].map(f => (
            <div key={f} className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0"><Check size={8} className="text-white" /></div>
              <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[11px] text-white/60 font-light">{f}</span>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 relative">
          <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full" style={{ fontFamily: "'Satoshi', sans-serif" }}>Claude Pro</div>
          <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl italic text-white/20 mb-6">$20<span className="text-2xl not-italic font-light">/mo</span></div>
          {[['General AI assistant', true], ['No visual artifacts', false], ['No Brand Kit', false], ['No style mimic', false], ['No live editing', false], ['No identity system', false]].map(([f, ok]) => (
            <div key={String(f)} className="flex items-center gap-3 mb-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${ok ? 'bg-white/10' : 'bg-white/5'}`}>
                {ok ? <Check size={8} className="text-white/30" /> : <X size={8} className="text-white/20" />}
              </div>
              <span style={{ fontFamily: "'Satoshi', sans-serif" }} className={`text-[11px] font-light ${ok ? 'text-white/30' : 'text-white/15 line-through'}`}>{String(f)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);

// ─── SCENE 9: CTA ────────────────────────────────────────────────────────────
const Scene9 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 800); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="space-y-8 max-w-3xl">
        <SAT className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">The Answer</SAT>
        <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl md:text-8xl italic text-black tracking-tighter leading-none">
          Stop explaining.<br />
          <span className="text-[#1B3FBF]">Start building.</span>
        </h1>
        <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-lg text-black/30 font-light leading-relaxed max-w-xl mx-auto">
          You shouldn't pay $20/month for a text box that forgets your brand, rebuilds everything on every change, and has no idea who you are.
        </p>
        <AnimatePresence>
          {show && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4">
              <a href="/" style={{ fontFamily: "'Satoshi', sans-serif" }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#1B3FBF] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#1B3FBF]/30">
                Join KREO for $1/month <ChevronRight size={14} />
              </a>
              <p style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[9px] text-black/20 font-black uppercase tracking-widest">kreoai.vercel.app</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle fanned cards in background */}
      <div className="absolute right-8 bottom-8 flex gap-3 opacity-10">
        {(['tech', 'design', 'art'] as const).map((interest, i) => (
          <div key={i} style={{ transform: `rotate(${-4 + i * 4}deg) translateY(${i * -8}px)`, transformOrigin: 'bottom', scale: '0.4' }}>
            <KreonCardVisual cardNumber={`00${i + 1}2`} userName="KREON" interest={interest} bio="" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function KreoPromo4() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;

    progressInterval.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(progressInterval.current);
        setScene(prev => (prev + 1) % TOTAL_SCENES);
        setProgress(0);
      }
    }, tick);

    return () => clearInterval(progressInterval.current);
  }, [scene]);

  const scenes = [
    <Scene0 />, <Scene1 />, <Scene2 />, <Scene3 />, <Scene4 />,
    <Scene5 />, <Scene6 />, <Scene7 />, <Scene8 />, <Scene9 />,
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Scene dots nav */}
      <div className="fixed top-10 right-12 z-[6000] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-500 ${i === scene ? 'w-8 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>

      {/* Scene counter */}
      <div className="fixed top-10 left-12 z-[6000] flex items-center gap-3">
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center"><Zap size={12} className="text-white" /></div>
        <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">KREO vs Claude · {scene + 1}/{TOTAL_SCENES}</span>
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full"
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-0.5 z-[6000] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
