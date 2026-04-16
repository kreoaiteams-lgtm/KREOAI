import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SCENE DURATIONS ────────────────────────────────────────────────────────
const SCENE_DURATION = [
  5000,  // 0: Opening title — "There's an app that..."
  5500,  // 1: "Build anything you imagine"
  5000,  // 2: KREO Splash Reveal
  7500,  // 3: The Studio — live prompt typing
  8000,  // 4: Manifest Result — PPT mockup
  7000,  // 5: Manifest Result — Dashboard mockup
  7000,  // 6: Manifest Result — Brand Toolkit
  6000,  // 7: KREON Card Introduction
  9000,  // 8: KREON Card Reveal — animated card
  6000,  // 9: The Possibilities Bombardment
  6000,  // 10: Finale — creoai.vercel.app
];
const TOTAL_SCENES = SCENE_DURATION.length;

// ─── SCENE 0: Opening Hook ───────────────────────────────────────────────────
const Scene0 = () => {
  const lines = [
    { text: "There's an app", delay: 0 },
    { text: "that builds", delay: 0.5 },
    { text: "everything you can imagine.", delay: 1 },
  ];

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-10 text-center">
      <div className="space-y-4">
        {lines.map((l, i) => (
          <motion.h1
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: l.delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif italic text-black tracking-tighter leading-tight"
          >
            {l.text}
          </motion.h1>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] w-48 bg-[#1B3FBF] mt-14 origin-left"
      />
    </div>
  );
};

// ─── SCENE 1: "Build anything" ──────────────────────────────────────────────
const EXAMPLES_FAST = [
  "Pitch Decks", "SaaS Dashboards", "Physics Flowcharts",
  "Brand Kits", "Landing Pages", "Financial Models",
];

const Scene1 = () => (
  <div className="fixed inset-0 bg-[#1B3FBF] flex flex-col items-center justify-center px-12 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: Math.random() * 3 + 2, delay: Math.random() * 2 }}
        />
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em] mb-6"
    >
      Meet KREO
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter leading-tight text-center"
    >
      Build anything <br />
      <span className="not-italic font-light opacity-60">you imagine.</span>
    </motion.h1>

    <div className="flex flex-wrap justify-center gap-3 mt-16 max-w-2xl">
      {EXAMPLES_FAST.map((ex, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm"
        >
          {ex}
        </motion.div>
      ))}
    </div>
  </div>
);

// ─── SCENE 2: KREO Splash ────────────────────────────────────────────────────
const Scene2 = () => {
  const [phase, setPhase] = useState<'in' | 'reveal'>('in');

  useEffect(() => {
    const t = setTimeout(() => setPhase('reveal'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: `${(i + 1) * 20}vw`, height: `${(i + 1) * 20}vw`, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: phase === 'reveal' ? 1 : 0.6, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-[18vw] font-serif italic text-white tracking-tighter leading-none"
            style={{ textShadow: '0 0 120px rgba(255,255,255,0.2)' }}
          >
            KREO
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 'reveal' ? 1 : 0, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white/40 text-[10px] font-black uppercase tracking-[0.8em] mt-6"
        >
          Your AI Studio
        </motion.p>
      </div>
    </div>
  );
};

// ─── SCENE 3: The Studio Prompt Typing ──────────────────────────────────────
const PROMPT_TEXT = "Create a cinematic pitch deck for a climate-tech startup Series A...";

const Scene3 = () => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(PROMPT_TEXT.slice(0, i + 1));
      i++;
      if (i >= PROMPT_TEXT.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-6">
      {/* Header bar mockup */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 h-14 border-b border-black/5 flex items-center px-8 justify-between"
      >
        <span className="text-2xl font-serif italic text-[#1B3FBF] tracking-tighter">KREO</span>
        <div className="flex gap-2">
          {['History', 'Pricing', 'Account'].map((item) => (
            <span key={item} className="text-[10px] text-black/20 font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-black/5">{item}</span>
          ))}
        </div>
      </motion.div>

      <div className="w-full max-w-2xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h1 className="text-5xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight">
            Build your <br />
            <span className="text-[#1B3FBF]">imagination.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-4 bg-white border border-black/10 rounded-[2rem] px-7 py-5 shadow-2xl shadow-black/5 ring-1 ring-black/5"
        >
          <div className="w-8 h-8 bg-[#1B3FBF] rounded-xl flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div className="flex-1 text-lg text-black/50 font-light font-serif italic">
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

// ─── SCENE 4: PPT Manifest Result ────────────────────────────────────────────
const Scene4 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-6 gap-6">
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.6em]">
      Manifest Complete / Presentation
    </motion.p>
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl h-[500px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      {/* Slide panel */}
      <div className="w-1/5 bg-[#f8f9ff] border-r border-black/5 p-6 flex flex-col gap-3">
        <div className="h-3 w-16 bg-black/10 rounded-full mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-14 rounded-xl border p-2.5 space-y-1.5 ${i === 0 ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'}`}>
            <div className="h-1.5 w-2/3 bg-black/20 rounded-full" />
            <div className="h-1.5 w-1/2 bg-black/10 rounded-full" />
          </div>
        ))}
      </div>

      {/* Main slide */}
      <div className="flex-1 p-16 flex flex-col justify-between relative">
        <div className="absolute top-10 right-10 text-black/10 text-[9px] font-black uppercase tracking-[0.4em]">SLIDE 01 / GENERATED BY KREO</div>
        <div className="space-y-6">
          <motion.h2 initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-5xl font-serif italic text-black leading-none tracking-tighter">
            The Climate <br />Opportunity
          </motion.h2>
          <motion.div initial={{ width: 0 }} animate={{ width: '160px' }} transition={{ delay: 0.8, duration: 1 }} className="h-1.5 bg-[#1B3FBF]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-black/40 text-lg font-light max-w-lg leading-relaxed">
            Global climate-tech investments surpassed $1.1T in 2025, driven by policy shifts and energy mandates across 64 nations.
          </motion.p>
        </div>
        <div className="flex gap-4 items-end">
          {[60, 80, 50, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}px` }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              className="w-10 rounded-t-xl"
              style={{ background: i === 3 ? '#1B3FBF' : '#1B3FBF20' }}
            />
          ))}
          <span className="text-black/20 text-[9px] font-black uppercase tracking-widest ml-2">Investment 2021–2025</span>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── SCENE 5: Dashboard Manifest ────────────────────────────────────────────
const Scene5 = () => (
  <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center px-6 gap-6">
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.6em]">
      Manifest Complete / SaaS Dashboard
    </motion.p>
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl h-[500px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      {/* Sidebar */}
      <div className="w-56 bg-black p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1B3FBF]" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">Insights</span>
        </div>
        {['Overview', 'Revenue', 'Users', 'Campaigns', 'Reports'].map((item, i) => (
          <div key={item} className={`text-sm py-2 px-3 rounded-xl ${i === 0 ? 'bg-[#1B3FBF] text-white' : 'text-white/30'}`}>{item}</div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-10 space-y-8 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif italic text-black">Revenue Overview</h3>
          <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'MRR', value: '$48,200', up: true },
            { label: 'Users', value: '12,841', up: true },
            { label: 'Churn', value: '1.2%', up: false },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="bg-[#f8f9ff] rounded-2xl p-5 space-y-2"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-black/20">{kpi.label}</div>
              <div className="text-3xl font-light text-black tracking-tighter">{kpi.value}</div>
              <div className={`text-xs font-bold ${kpi.up ? 'text-green-500' : 'text-red-400'}`}>{kpi.up ? '↑ +8.4%' : '↓ -0.3%'}</div>
            </motion.div>
          ))}
        </div>
        {/* Sparkline */}
        <div className="h-24 flex items-end gap-2">
          {[40, 55, 35, 70, 60, 85, 75, 90, 65, 95, 80, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              className="flex-1 rounded-t-lg bg-[#1B3FBF]/15 relative overflow-hidden"
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '40%' }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 bg-[#1B3FBF]"
              />
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
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.6em]">
      Manifest Complete / Brand Toolkit
    </motion.p>
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl h-[500px] bg-white rounded-[3rem] border border-black/5 flex overflow-hidden shadow-2xl"
    >
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-black/5 p-16 space-y-8">
        <motion.div
          initial={{ rotate: -12, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-44 h-44 bg-black rounded-[3rem] flex items-center justify-center shadow-2xl"
        >
          <span className="text-white font-serif italic text-8xl">N</span>
        </motion.div>
        <div className="text-center space-y-1">
          <p className="text-black text-lg font-black uppercase tracking-[0.3em]">Neura AI</p>
          <p className="text-black/30 text-[9px] font-bold uppercase tracking-widest">Designed by KREO Studio</p>
        </div>
      </div>

      <div className="w-1/2 p-16 flex flex-col justify-center space-y-10">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">Chromatic Palette</p>
          <div className="flex gap-4">
            {['#000000', '#1B3FBF', '#FACC15', '#F8F9FF'].map((c, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-12 h-12 rounded-2xl border border-black/5 shadow-inner"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">Typography</p>
          <h2 className="text-5xl font-serif italic text-black tracking-tighter">Instrument</h2>
          <h2 className="text-3xl font-light text-black/30 tracking-tight">Satoshi / Inter</h2>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── SCENE 7: KREON Card Intro ───────────────────────────────────────────────
const Scene7 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-10">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.6em] mb-6"
    >
      But there's more
    </motion.p>
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-8xl font-serif italic text-black tracking-tighter leading-tight"
    >
      Your identity <br />
      <span className="text-[#1B3FBF]">inside KREO.</span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="text-black/30 text-lg font-light mt-8 max-w-md leading-relaxed"
    >
      Every member gets a KREON Card — your permanent digital identity in the studio.
    </motion.p>
  </div>
);

// ─── SCENE 8: KREON Card Reveal ──────────────────────────────────────────────
const Scene8 = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => setPhase(3), 4500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#f0f4ff] flex flex-col items-center justify-center gap-10 overflow-hidden px-6">
      {/* Background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#1B3FBF]/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.7 }}
            style={{ width: `${i * 30}vw`, height: `${i * 30}vw` }}
          />
        ))}
      </div>

      {/* Left: Info */}
      <div className="flex items-center gap-16 w-full max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 flex-1"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#1B3FBF]/50">KREON Identity</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight">
            Your card. <br /> Your proof.
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Resident ID', val: '#0042', show: phase >= 1 },
              { label: 'Creative Style', val: 'Editorial & Precise', show: phase >= 2 },
              { label: 'Resident Census', val: '#42 of 2,048', show: phase >= 3 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: item.show ? 1 : 0, x: item.show ? 0 : -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-6 bg-[#1B3FBF]/30" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">{item.label}</span>
                <span className="text-sm font-medium text-black">{item.val}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1000px' }}
          className="w-[320px] h-[200px] flex-shrink-0"
        >
          {/* Card */}
          <div className="w-full h-full bg-[#1B3FBF] rounded-[2rem] p-7 relative overflow-hidden shadow-2xl shadow-[#1B3FBF]/40 flex flex-col justify-between">
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border-[0.5px] border-white" style={{ left: 0, right: 0, top: `${i * 14}%` }} />
              ))}
            </div>
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <div className="flex justify-between items-start relative z-10">
              <span className="text-white/50 text-[8px] font-black uppercase tracking-[0.5em]">KREON</span>
              <span className="text-white text-lg font-serif italic opacity-80">#0042</span>
            </div>

            <div className="relative z-10 space-y-1">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-[0.5em]">Resident</p>
              <p className="text-white text-xl font-medium tracking-tight">Dhruv Gautam</p>
              <p className="text-white/40 text-[9px]">gautam.07dhruv@gmail.com</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom label */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-black/30 text-sm font-light font-serif italic text-center max-w-md"
          >
            Every resident in KREO gets their own permanent identity card, generated through a guided creative alignment.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── SCENE 9: Possibilities Bombardment ─────────────────────────────────────
const PILE_ITEMS = [
  "Pitch Decks", "SaaS Dashboards", "Flowcharts", "Brand Kits",
  "Landing Pages", "Financial Models", "Storyboards", "API Docs",
  "System Architecture", "Mind Maps", "Style Guides", "Legal Briefs",
  "Marketing Funnels", "Course Curriculum", "Portfolio Sites", "KREON Cards",
];

const Scene9 = () => {
  const [count, setCount] = useState(0);
  const positions = useMemo(() => PILE_ITEMS.map(() => ({
    x: (Math.random() * 70) - 35,
    y: (Math.random() * 50) - 25,
    r: (Math.random() * 30) - 15,
  })), []);

  useEffect(() => {
    let c = 0;
    const t = setInterval(() => {
      c++;
      setCount(c);
      if (c >= PILE_ITEMS.length) clearInterval(t);
    }, 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-16 text-center z-[100] pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight">Build without limits.</h1>
      </motion.div>
      <div className="relative flex-1 w-full flex items-center justify-center">
        {PILE_ITEMS.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, y: 120 }}
            animate={{
              opacity: i < count ? 1 : 0,
              scale: i < count ? 1 : 0.5,
              x: `${positions[i].x}vw`,
              y: `${positions[i].y}vh`,
              rotate: positions[i].r,
              zIndex: i,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute min-w-[220px] px-7 py-4 bg-[#1B3FBF] rounded-[2rem] flex items-center justify-center shadow-xl"
          >
            <span className="text-white font-serif italic text-lg tracking-tight">{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── SCENE 10: Finale ────────────────────────────────────────────────────────
const Scene10 = () => {
  const [text, setText] = useState('');
  const target = 'KREO';

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setText(target.slice(0, i + 1));
      i++;
      if (i >= target.length) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center gap-8">
      <motion.h1 className="text-[18vw] font-serif italic text-[#1B3FBF] tracking-tighter leading-none">
        {text}
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block w-[0.06em] h-[1em] bg-[#1B3FBF] align-middle" />
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="space-y-2">
        <p className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] opacity-30">creoai.vercel.app</p>
        <p className="text-black/20 text-[9px] font-medium uppercase tracking-[0.5em]">Your AI Studio · Your KREON Identity</p>
      </motion.div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
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
        if (scene < TOTAL_SCENES - 1) {
          setScene(prev => prev + 1);
          setProgress(0);
        }
      }
    }, tick);

    return () => clearInterval(intervalRef.current);
  }, [scene]);

  const scenes = [
    <Scene0 />,
    <Scene1 />,
    <Scene2 />,
    <Scene3 />,
    <Scene4 />,
    <Scene5 />,
    <Scene6 />,
    <Scene7 />,
    <Scene8 />,
    <Scene9 />,
    <Scene10 />,
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Scene dots nav (optional visual indicator) */}
      <div className="fixed top-10 right-12 z-[6000] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === scene ? 'w-6 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/10'
            }`}
          />
        ))}
      </div>

      {/* Scene render */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full"
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] z-[6000] bg-black/5">
        <div
          className="h-full bg-[#1B3FBF] transition-all duration-[50ms]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
