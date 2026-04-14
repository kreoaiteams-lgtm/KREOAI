import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   KREO PROMO 5 — "Build your imagination."
   
   6 scenes:
   0 – Open: Big bold stamp, campaign tagline, playful shapes rain
   1 – What is KREO? (Problem → Solution narrative)
   2 – App Examples (3 tabbed interactive mockups)
   3 – What is a KREON? (Identity card reveal + explainer)
   4 – KREON Showcase (stacked discipline cards)
   5 – Finale (CTA)
─────────────────────────────────────────────────────────────────── */

const SCENE_DURATION = [5500, 6000, 8000, 7000, 6000, 5000];
const TOTAL_SCENES = SCENE_DURATION.length;

// ── Floating Shape (reused decoration) ──
const FloatShape = ({ color, size, x, y, shape, delay = 0, rotate = 0 }: {
  color: string; size: number; x: string; y: string; shape: 'circle' | 'rect' | 'star' | 'diamond';
  delay?: number; rotate?: number;
}) => {
  const s = size;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.6 }}
      animate={{ opacity: 1, y: [0, -14, 0], scale: 1, rotate: [rotate, rotate + 8, rotate] }}
      transition={{ delay, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    >
      {shape === 'circle' && (
        <div style={{ width: s, height: s, borderRadius: '50%', background: color }} />
      )}
      {shape === 'rect' && (
        <div style={{ width: s, height: s * 0.7, borderRadius: 6, background: color, transform: `rotate(${rotate}deg)` }} />
      )}
      {shape === 'star' && (
        <svg width={s} height={s} viewBox="0 0 60 60">
          <path d="M30 5 L33 24 L52 24 L37 37 L42 56 L30 44 L18 56 L23 37 L8 24 L27 24 Z" fill={color} />
        </svg>
      )}
      {shape === 'diamond' && (
        <div style={{ width: s * 0.7, height: s * 0.7, background: color, transform: 'rotate(45deg)', borderRadius: 4 }} />
      )}
    </motion.div>
  );
};

// ── Scene 0: Campaign Open ──
const Scene0 = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#f0f0ee]">
    {/* Decorative shapes */}
    <FloatShape color="#3b82f6" size={52} x="8%" y="10%" shape="circle" delay={0.1} />
    <FloatShape color="#f97316" size={38} x="85%" y="8%" shape="rect" rotate={15} delay={0.3} />
    <FloatShape color="#c084fc" size={44} x="6%" y="72%" shape="diamond" delay={0.5} />
    <FloatShape color="#facc15" size={54} x="88%" y="66%" shape="star" delay={0.2} />
    <FloatShape color="#22c55e" size={32} x="50%" y="88%" shape="circle" delay={0.6} />
    <FloatShape color="#ec4899" size={28} x="18%" y="42%" shape="rect" rotate={-10} delay={0.4} />
    <FloatShape color="#14b8a6" size={36} x="76%" y="40%" shape="circle" delay={0.7} />
    <FloatShape color="#f97316" size={24} x="33%" y="12%" shape="diamond" delay={0.9} />

    {/* Center content */}
    <motion.div
      className="relative z-10 flex flex-col items-center text-center px-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
      >
        KREO Campaign
      </motion.div>
      <motion.h1
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[14vw] sm:text-[10vw] font-black text-black tracking-tighter leading-none mb-4"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        Build your
      </motion.h1>
      <motion.h1
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[14vw] sm:text-[10vw] font-black text-[#1B3FBF] tracking-tighter leading-none mb-6"
        style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
      >
        imagination.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="text-base sm:text-xl font-medium text-black/50 tracking-tight max-w-xl"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        The neural engine that turns your ideas into high-fidelity realities — in seconds.
      </motion.p>
    </motion.div>
  </div>
);

// ── Scene 1: What is KREO? ──
const problems = [
  { text: 'Meeting in 45 mins.', sub: 'No deck. No time.', color: '#3b82f6' },
  { text: 'Need a landing page.', sub: 'No dev team.', color: '#c084fc' },
  { text: 'Complex data report.', sub: 'Clients need it visual.', color: '#f97316' },
  { text: 'Study for tomorrow.', sub: 'Can\'t read dense text.', color: '#22c55e' },
];

const Scene1 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2800);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Decorative shapes — only phase 0 */}
      {phase === 0 && <>
        <FloatShape color="#3b82f640" size={200} x="-5%" y="-5%" shape="circle" delay={0} />
        <FloatShape color="#f9731620" size={160} x="80%" y="70%" shape="circle" delay={0.3} />
      </>}

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-5xl"
          >
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-6 text-center">
              The Problem Space
            </motion.p>
            <p className="text-center text-2xl md:text-4xl font-black text-black mb-12 tracking-tight"
               style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Everyone faces the same wall.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {problems.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundColor: p.color }}
                  className="rounded-[24px] p-8 text-white"
                >
                  <p className="text-lg md:text-2xl font-black leading-tight mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{p.text}</p>
                  <p className="text-sm font-medium opacity-70">{p.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center max-w-4xl relative z-10"
          >
            {/* Big colourful circle backdrop */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#1B3FBF]/8 blur-[80px] pointer-events-none" />

            <motion.p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-6">
              One Solution
            </motion.p>
            <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-6"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              So many problems.<br />
              <span className="text-[#1B3FBF]" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>One canvas.</span>
            </h2>
            <p className="text-base md:text-xl font-medium text-black/50 max-w-xl mx-auto leading-relaxed"
               style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              KREO is a neural canvas engine that turns any prompt into a high-fidelity, living artifact — presentations, flows, dashboards, apps — produced in seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Scene 2: App Examples ──
const APP_DEMOS = [
  {
    tab: 'Presentations', color: '#3b82f6',
    title: 'Global Energy Trends',
    subtitle: 'Neural Slide 01 / Efficiency Peak',
    content: (
      <div className="flex-1 p-10 flex flex-col gap-6">
        <h3 className="text-4xl font-black text-black tracking-tighter leading-none" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Solar Efficiency <br/><span className="text-[#3b82f6]">+28.5%</span>
        </h3>
        <p className="text-black/50 font-medium text-sm max-w-xs leading-relaxed">
          Perovskite tandem cell integration drives a record high in PV efficiency by Q2 2026.
        </p>
        <div className="flex items-end gap-3 pt-4">
          {[40, 65, 55, 80, 70, 90].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: h + '%' }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-t-xl bg-[#3b82f6] min-h-[4px]" style={{ maxHeight: 120 }} />
          ))}
        </div>
      </div>
    )
  },
  {
    tab: 'Flowcharts', color: '#c084fc',
    title: 'Physics: Motion in 1D',
    subtitle: 'Student Portal / Neural Flowchart',
    content: (
      <div className="flex-1 p-10 flex flex-col items-center justify-center gap-5">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
          className="px-10 py-4 rounded-2xl bg-[#c084fc] text-white font-black text-lg tracking-tight">
          Translatory Motion
        </motion.div>
        <div className="w-px h-8 bg-[#c084fc]/40" />
        <div className="flex gap-8">
          {['Position', 'Velocity', 'Acceleration'].map((t, i) => (
            <motion.div key={t} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.12 }}
              className="px-5 py-3 rounded-2xl bg-black/5 text-black/70 font-bold text-sm tracking-wide text-center">
              {t}
            </motion.div>
          ))}
        </div>
        <div className="w-px h-8 bg-[#c084fc]/40" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7 }}
          className="px-10 py-4 rounded-2xl border-2 border-[#c084fc] text-[#c084fc] font-black text-lg tracking-tight">
          Equations of Motion
        </motion.div>
      </div>
    )
  },
  {
    tab: 'Dashboards', color: '#22c55e',
    title: 'Crypto Portfolio',
    subtitle: 'SaaS Dashboard / Live Nodes: 12',
    content: (
      <div className="flex-1 p-10 grid grid-cols-2 gap-5">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl bg-black/5 p-6 flex flex-col gap-3 justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/30">BTC / USD</span>
          <span className="text-3xl font-black text-black tracking-tighter">$67,492</span>
          <div className="h-2 rounded-full bg-black/10 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ delay: 0.5, duration: 1.2 }}
              className="h-full rounded-full bg-[#22c55e]" />
          </div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="rounded-2xl bg-black p-6 flex flex-col gap-3 justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Portfolio</span>
          <span className="text-3xl font-black text-white tracking-tighter">+$14,250</span>
          <span className="text-[10px] text-[#22c55e] font-black uppercase tracking-widest">+12.4% Gain</span>
        </motion.div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="col-span-2 rounded-2xl bg-[#22c55e]/10 p-6 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-sm font-bold text-[#22c55e] uppercase tracking-widest">Neural Real-Time Active</span>
        </motion.div>
      </div>
    )
  }
];

const Scene2 = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed inset-0 bg-[#f8f8f6] flex flex-col items-center justify-center px-6 overflow-hidden">
      <FloatShape color="#facc1540" size={120} x="90%" y="5%" shape="star" delay={0} />
      <FloatShape color="#3b82f620" size={90} x="2%" y="80%" shape="circle" delay={0.4} />

      <motion.div initial={{ opacity: 0. }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-4xl">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-3 text-center">What KREO makes</p>
        <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter text-center mb-8"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Anything you can imagine.
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          {APP_DEMOS.map((d, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              style={{
                backgroundColor: activeTab === i ? d.color : '#fff',
                color: activeTab === i ? '#fff' : '#000',
                border: `1px solid ${activeTab === i ? d.color : 'rgba(0,0,0,0.12)'}`,
              }}
              className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300"
            >
              {d.tab}
            </button>
          ))}
        </div>

        {/* Demo card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[32px] shadow-2xl border border-black/5 overflow-hidden"
            style={{ minHeight: 340 }}
          >
            {/* Card header */}
            <div className="px-10 py-6 border-b border-black/5 flex items-center justify-between"
                 style={{ background: APP_DEMOS[activeTab].color + '10' }}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: APP_DEMOS[activeTab].color }}>
                  {APP_DEMOS[activeTab].subtitle}
                </p>
                <h3 className="text-xl font-black text-black tracking-tight mt-1"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {APP_DEMOS[activeTab].title}
                </h3>
              </div>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: APP_DEMOS[activeTab].color }} />
            </div>
            <div className="flex flex-col" style={{ minHeight: 240 }}>
              {APP_DEMOS[activeTab].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ── Scene 3: What is a KREON? ──
const Scene3 = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex items-center justify-center px-8 overflow-hidden">
      {/* Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatShape color="rgba(255,255,255,0.08)" size={300} x="-8%" y="-10%" shape="circle" delay={0} />
        <FloatShape color="rgba(255,255,255,0.06)" size={250} x="75%" y="60%" shape="circle" delay={0.3} />
        <FloatShape color="#facc1540" size={60} x="15%" y="80%" shape="star" delay={0.4} />
        <FloatShape color="#ffffff20" size={40} x="85%" y="15%" shape="diamond" delay={0.6} />
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="q" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
            className="text-center relative z-10 max-w-3xl"
          >
            <motion.div initial={{ rotate: -6, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', damping: 10 }}
              className="text-8xl md:text-[15vw] font-black text-white tracking-tighter leading-none"
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
            >
              KREON
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-white/50 text-lg font-medium mt-4 tracking-tight"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              What exactly is one?
            </motion.p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="ans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12"
          >
            {/* Left: Identity card visual */}
            <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="flex-shrink-0 w-[260px] h-[360px] rounded-[28px] relative overflow-hidden"
              style={{ background: '#c084fc' }}
            >
              <div className="p-6 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/60">Design & Visuals</span>
                <span className="text-sm font-black text-black/70">#1247</span>
              </div>
              <div className="flex-1 flex items-center justify-center py-6">
                <svg viewBox="0 0 100 100" width="130" height="130">
                  <circle cx="50" cy="50" r="40" fill="white" opacity="0.9" />
                  <path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black" />
                </svg>
              </div>
              <div className="p-6">
                <div style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
                  className="text-6xl font-black text-black tracking-tighter leading-none">KREO</div>
                <p className="text-[9px] font-black uppercase tracking-widest text-black/50 mt-1">Resident Architect</p>
                <p className="text-base font-black text-black uppercase tracking-tight mt-0.5">Dhruv Gautam</p>
              </div>
            </motion.div>

            {/* Right: Explanation */}
            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex-1 text-white"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">Identity Protocol</p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-6"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Not just a user account.
                <br/>Your permanent identity
                <br/>in the KREO ecosystem.
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '◎', text: 'Every artifact you create is permanently tied to your unique KREON number.' },
                  { icon: '◈', text: 'Your card reflects your primary creative discipline — designed to be shared.' },
                  { icon: '◉', text: 'Claiming your KREON unlocks your permanent studio access.' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-[#facc15] text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <p className="text-white/70 font-medium leading-relaxed text-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Scene 4: KREON Card Showcase ──
const CARD_STYLES = [
  { label: 'Design', bg: '#c084fc', textColor: 'black', graphic: <svg viewBox="0 0 100 100" width="90" height="90"><circle cx="50" cy="50" r="40" fill="white" opacity="0.9"/><path d="M50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 90 Z" fill="black"/></svg> },
  { label: 'Engineering', bg: '#3b82f6', textColor: 'white', graphic: <svg viewBox="0 0 100 100" width="90" height="90"><rect x="15" y="25" width="70" height="50" rx="8" fill="white"/><path d="M30 40 L45 50 L30 60" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round"/><line x1="55" y1="60" x2="70" y2="60" stroke="black" strokeWidth="6" strokeLinecap="round"/></svg> },
  { label: 'Architecture', bg: '#22c55e', textColor: 'black', graphic: <svg viewBox="0 0 100 100" width="90" height="90"><polygon points="50,20 20,80 80,80" fill="white"/><polygon points="50,20 50,80 80,80" fill="black"/></svg> },
  { label: 'Art', bg: '#ec4899', textColor: 'white', graphic: <svg viewBox="0 0 100 100" width="90" height="90"><path d="M30 70 A30 30 0 0 1 70 30 L70 70 Z" fill="white"/></svg> },
  { label: 'Music', bg: '#8b5cf6', textColor: 'white', graphic: <svg viewBox="0 0 100 100" width="90" height="90"><rect x="30" y="20" width="40" height="60" rx="20" fill="none" stroke="white" strokeWidth="8"/><circle cx="30" cy="80" r="10" fill="black"/><circle cx="70" cy="80" r="10" fill="black"/></svg> },
];

const Scene4 = () => {
  const [activeCard, setActiveCard] = useState(2);

  return (
    <div className="fixed inset-0 bg-[#f0f0ee] flex flex-col items-center justify-center px-6 overflow-hidden">
      <FloatShape color="#facc1560" size={70} x="4%" y="8%" shape="star" delay={0} />
      <FloatShape color="#3b82f640" size={50} x="88%" y="78%" shape="diamond" delay={0.4} />

      <div className="relative z-10 w-full max-w-5xl">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-3 text-center">
          Your Identity / Pick Your Discipline
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter text-center mb-8"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Every KREON is different.
        </h2>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
          {CARD_STYLES.map((c, i) => (
            <button key={i} onClick={() => setActiveCard(i)}
              style={{
                background: activeCard === i ? c.bg : '#fff',
                color: activeCard === i ? c.textColor : '#000',
                border: `1px solid ${activeCard === i ? c.bg : 'rgba(0,0,0,0.1)'}`,
                boxShadow: activeCard === i ? `0 4px 20px ${c.bg}60` : 'none',
              }}
              className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300"
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Stacked cards */}
        <div className="relative flex items-center justify-center" style={{ height: 380 }}>
          {CARD_STYLES.map((card, i) => {
            const dist = i - activeCard;
            const isActive = i === activeCard;
            return (
              <motion.div
                key={i}
                animate={{
                  x: dist * 45,
                  scale: isActive ? 1 : 0.88 - Math.abs(dist) * 0.04,
                  rotate: dist * 5,
                  zIndex: isActive ? 10 : 5 - Math.abs(dist),
                  opacity: Math.abs(dist) > 2 ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ position: 'absolute', cursor: 'pointer' }}
                onClick={() => setActiveCard(i)}
              >
                <div
                  className="rounded-[28px] relative overflow-hidden"
                  style={{ width: 220, height: 320, backgroundColor: card.bg, boxShadow: isActive ? `0 30px 80px ${card.bg}60` : '0 5px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: card.textColor === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>
                      {card.label}
                    </span>
                    <span className="text-sm font-black" style={{ color: card.textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>#1247</span>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    {card.graphic}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="text-4xl font-black leading-none tracking-tighter mb-1"
                         style={{ fontFamily: "'TAN-NIMBUS', sans-serif", color: card.textColor === 'white' ? '#fff' : '#000' }}>
                      KREO
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: card.textColor === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                      Resident Architect
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Scene 5: Finale CTA ──
const Scene5 = () => {
  const [text, setText] = useState('');
  const target = 'KREO';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setText(target.slice(0, i + 1));
      i++;
      if (i >= target.length) clearInterval(t);
    }, 320);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      <FloatShape color="#c084fc50" size={180} x="-4%" y="-4%" shape="circle" delay={0} />
      <FloatShape color="#22c55e40" size={120} x="82%" y="72%" shape="circle" delay={0.3} />
      <FloatShape color="#facc1560" size={50} x="78%" y="10%" shape="star" delay={0.5} />
      <FloatShape color="#3b82f640" size={40} x="8%" y="78%" shape="diamond" delay={0.7} />

      <div className="relative z-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-6">
          Build with
        </motion.p>
        <motion.h1
          className="text-[22vw] sm:text-[16vw] font-black tracking-tighter leading-none text-[#1B3FBF] mb-6"
          style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
        >
          {text}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[4px] h-[0.85em] bg-[#1B3FBF] align-middle ml-2" />
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="text-base sm:text-xl font-medium text-black/40 mb-8 max-w-md mx-auto"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Claim your KREON identity.<br/>Enter the studio.
        </motion.p>
        <motion.a href="/build" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
          className="inline-block px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#1B3FBF] transition-colors"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Join the Registry →
        </motion.a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function KreoPromo5() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;
    progressRef.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(progressRef.current);
        setScene(prev => (prev + 1) % TOTAL_SCENES);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(progressRef.current);
  }, [scene]);

  const scenes = [<Scene0 />, <Scene1 />, <Scene2 />, <Scene3 />, <Scene4 />, <Scene5 />];
  const labels = ['Campaign', 'The Problem', 'App Examples', 'What\'s a KREON?', 'Your Identity', 'Join'];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[900] pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay' }} />

      {/* Nav dots */}
      <div className="fixed top-8 right-10 z-[6000] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button key={i} onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-500 ${i === scene ? 'w-8 h-2 bg-black' : 'w-2 h-2 bg-black/15 hover:bg-black/30'}`} />
        ))}
      </div>

      {/* Scene label */}
      <motion.div
        key={scene}
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        className="fixed top-8 left-10 z-[6000] text-[9px] font-black uppercase tracking-[0.4em] text-black/30"
      >
        {String(scene + 1).padStart(2, '0')} / {labels[scene]}
      </motion.div>

      {/* Render scene */}
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }} className="w-full h-full">
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] z-[6000] bg-black/8">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
