import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── SCENE DURATIONS (ms) ───────────────────────────────────────────────────────
const SCENE_DURATION = [
  8000,  // 0: Problem pile — "No matter what..."
  4500,  // 1: Transition — "There's always one answer"
  4000,  // 2: KREO Reveal
  52000, // 3: Feature showcase loop
  18000, // 4: Possibilities bombardment
  5000,  // 5: Finale
];
const TOTAL_SCENES = SCENE_DURATION.length;

// ── FONT STYLE HELPERS ─────────────────────────────────────────────────────────
const TAN = { fontFamily: "'TAN-NIMBUS', sans-serif" };
const SAT = { fontFamily: "'Satoshi', sans-serif" };

// ── SCENE 0: Problem Pile ──────────────────────────────────────────────────────
const PROBLEMS = [
  { t: "Pitch deck in 45 minutes.", s: "No slides. No designer. No time." },
  { t: "You need a landing page. Now.", s: "The launch is tomorrow." },
  { t: "Client wants a dashboard by noon.", s: "You have no developer." },
  { t: "Study flowchart for the exam.", s: "The exam is at 9 AM." },
  { t: "Explain the market to investors.", s: "With visuals they actually understand." },
  { t: "Your competitor looks better.", s: "You need a brand system, fast." },
  { t: "Report needs a visual summary.", s: "Nobody reads 40-page PDFs." },
  { t: "New startup needs an identity.", s: "Budget zero. Timeline: now." },
];

const Scene0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 z-10">
      <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-3" style={SAT}>Every Day</p>
      <h1 className="text-4xl md:text-6xl tracking-tighter leading-tight text-black" style={{ ...TAN }}>
        No matter <span className="italic text-[#1B3FBF]">what</span> you face
      </h1>
    </motion.div>

    <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center">
      {PROBLEMS.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, scale: 0.95, rotate: i % 2 === 0 ? -2 : 2 }}
          animate={{ opacity: 1, y: i * 18, scale: 1, rotate: i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0, zIndex: i }}
          transition={{ delay: i * 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-full max-w-2xl p-10 rounded-[2.5rem] border shadow-2xl bg-[#1B3FBF] border-white/20 text-white"
        >
          <div className="space-y-3 text-center">
            <h2 className="text-xl md:text-3xl tracking-tight leading-tight" style={{ ...TAN }}>{card.t}</h2>
            <p className="text-sm md:text-base font-light text-white/60" style={SAT}>{card.s}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── SCENE 1: Transition ────────────────────────────────────────────────────────
const Scene1 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-6">
    <motion.h2
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
      className="text-4xl md:text-7xl tracking-tighter text-black/80 leading-none"
      style={TAN}
    >
      So many problems.{' '}
      <br />
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        style={{ color: '#1B3FBF' }}
      >
        One solution.
      </motion.span>
    </motion.h2>
  </div>
);

// ── SCENE 2: KREO Reveal ───────────────────────────────────────────────────────
const Scene2 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="fixed inset-0 bg-[#1B3FBF] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Confetti */}
      <AnimatePresence>
        {show && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(36)].map((_, i) => {
              const colors = ['bg-yellow-400', 'bg-white', 'bg-blue-300', 'bg-pink-400', 'bg-green-400'];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0.8], x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 600 }}
                  transition={{ duration: 2.5, delay: Math.random() * 0.5 }}
                  className={`absolute ${colors[i % colors.length]} rounded-sm`}
                  style={{ left: '50%', top: '50%', width: `${Math.random() * 10 + 4}px`, height: `${Math.random() * 10 + 4}px` }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <h1 className="text-9xl md:text-[20vw] text-white leading-none tracking-tighter" style={TAN}>KREO</h1>
        <p className="text-[10px] font-black tracking-[0.8em] uppercase text-white/40" style={SAT}>Neural Design Engine</p>
      </motion.div>
    </div>
  );
};

// ── SCENE 3: Feature Showcase ──────────────────────────────────────────────────
const Scene3 = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const seq = [
      { p: 1, d: 0 },      // "An instant visualizer..."
      { p: 2, d: 5000 },   // typing → web capture
      { p: 3, d: 9000 },   // Web capture UI
      { p: 4, d: 14000 },  // "Mimic any website..."
      { p: 5, d: 18000 },  // typing → manifest
      { p: 6, d: 22000 },  // Manifest result UI
      { p: 7, d: 28000 },  // "For decks..."
      { p: 8, d: 32000 },  // PPT slide UI
      { p: 9, d: 38000 },  // "The limit is your mind"
      { p: 10, d: 43000 }, // Brand kit UI
      { p: 11, d: 49000 }, // "What more can you do?"
    ];
    const timers = seq.map(({ p, d }) => setTimeout(() => setPhase(p), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const TextSlide = ({ kicker, headline, sub }: { kicker: string; headline: React.ReactNode; sub?: string }) => (
    <motion.div key={`ts-${kicker}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6 max-w-5xl">
      <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase" style={SAT}>{kicker}</p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl text-black tracking-tighter leading-tight" style={TAN}>{headline}</h1>
      {sub && <p className="text-xl text-black/40 font-light" style={SAT}>{sub}</p>}
    </motion.div>
  );

  const TypingSlide = ({ text }: { text: string }) => (
    <motion.div key={`typ-${text}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-2xl border border-black/5 p-10 rounded-[2rem] bg-[#f8f9ff]">
      <div className="flex gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#1B3FBF]" />
        <div className="w-2 h-2 rounded-full bg-black/5" />
      </div>
      <div className="text-black/60 text-lg md:text-2xl tracking-tight leading-snug" style={{ fontFamily: "'Satoshi', sans-serif", fontStyle: 'italic' }}>
        {text}
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block w-[2px] h-[0.9em] bg-[#1B3FBF] align-middle" />
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <TextSlide key="p1" kicker="Phase 01 / Manifestation" headline={<>Describe it. <span style={{ color: '#1B3FBF' }}>KREO builds it.</span></>} sub="Apps, dashboards, slides, and websites — from one sentence." />
        )}
        {phase === 2 && <TypingSlide key="p2" text="Build me a SaaS dashboard for real-time inventory tracking..." />}
        {phase === 3 && (
          <motion.div key="p3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl h-[480px] bg-white border border-black/5 rounded-[3rem] shadow-2xl flex overflow-hidden">
            <div className="w-56 border-r border-black/5 bg-[#f8f9ff] p-8 flex flex-col gap-4">
              <div className="h-8 w-24 bg-[#1B3FBF] rounded-xl mb-6" />
              {[...Array(5)].map((_, i) => <div key={i} className={`h-8 rounded-xl ${i === 0 ? 'bg-black/10 w-4/5' : 'bg-black/5 w-3/5'}`} />)}
            </div>
            <div className="flex-1 p-12 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl text-black tracking-tighter" style={TAN}>Inventory Dashboard</h3>
                  <p className="text-black/30 text-[10px] uppercase tracking-[0.3em] mt-1" style={SAT}>Neural Real-Time Sync</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-green-50 rounded-full text-green-600 text-[10px] font-bold tracking-widest uppercase" style={SAT}>Live</div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                {[{ label: 'Total SKUs', val: '12,482', delta: '+3.2%' }, { label: 'Low Stock', val: '247', delta: '-8.1%' }, { label: 'Revenue', val: '₹4.2Cr', delta: '+14%' }].map((c, i) => (
                  <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="bg-[#f8f9ff] border border-black/5 rounded-2xl p-6 flex flex-col justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30" style={SAT}>{c.label}</p>
                    <div>
                      <p className="text-3xl tracking-tighter text-black" style={TAN}>{c.val}</p>
                      <p className="text-green-500 text-xs font-bold mt-1" style={SAT}>{c.delta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {phase === 4 && (
          <TextSlide key="p4" kicker="Phase 02 / Web Capture" headline={<>Paste a URL. <br /><span style={{ color: '#1B3FBF' }}>Own that design.</span></>} sub="KREO extracts any website's aesthetic and makes it yours." />
        )}
        {phase === 5 && <TypingSlide key="p5" text="Mimic the design of apple.com for my tech startup homepage..." />}
        {phase === 6 && (
          <motion.div key="p6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-2xl bg-white border border-black/5 rounded-[3rem] shadow-2xl p-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#1B3FBF]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]" style={SAT}>Web Capture</p>
                <p className="text-xl tracking-tight text-black" style={TAN}>apple.com aesthetic cloned</p>
              </div>
            </div>
            <div className="space-y-3">
              {['Primary: #000000 · SF Pro Display', 'Spacing: 8px grid · 3rem radius', 'Motion: spring · easeInOut'].map((item, i) => (
                <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f8f9ff] border border-black/5">
                  <div className="w-2 h-2 rounded-full bg-[#1B3FBF]" />
                  <p className="text-sm text-black/50 font-mono">{item}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} className="h-1 bg-[#1B3FBF] rounded-full" />
            <p className="text-[10px] text-center font-black uppercase tracking-[0.5em] text-[#1B3FBF]" style={SAT}>Design System Applied</p>
          </motion.div>
        )}
        {phase === 7 && (
          <TextSlide key="p7" kicker="Phase 03 / Presentations" headline={<>One sentence. <span style={{ color: '#1B3FBF' }}>A full deck.</span></>} sub="Cinematic, editorial-grade slides — in seconds." />
        )}
        {phase === 8 && (
          <motion.div key="p8" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl h-[480px] bg-white border border-black/5 rounded-[3rem] shadow-2xl flex overflow-hidden">
            <div className="w-1/4 bg-[#f8f9ff] border-r border-black/5 p-8 flex flex-col gap-4">
              <div className="h-3 w-20 bg-black/10 rounded-full mb-6" />
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`h-16 rounded-2xl border ${i === 0 ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'} p-3 space-y-2`}>
                  <div className="h-1.5 w-1/2 bg-black/20 rounded-full" />
                  <div className="h-1.5 w-3/4 bg-black/10 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-14 flex flex-col justify-center relative">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-black/10 absolute top-10 right-10" style={SAT}>KREO MANIFEST / SLIDE 01</p>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl text-black leading-none tracking-tighter" style={TAN}>The Future<br />of Energy</h1>
                <div className="flex items-center gap-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 1 }} className="h-1.5 bg-[#1B3FBF]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]" style={SAT}>Global Report 2026</span>
                </div>
                <p className="text-black/50 text-lg font-light max-w-md leading-relaxed" style={SAT}>Solar PV efficiency reaches 28.5% with perovskite tandem cell integration driving mass-market adoption.</p>
              </div>
            </div>
          </motion.div>
        )}
        {phase === 9 && (
          <TextSlide key="p9" kicker="Phase 04 / Brand Identity" headline={<>Brand toolkit. <span style={{ color: '#1B3FBF' }}>From scratch to system.</span></>} sub="Colors, typography, identity — all generated by KREO." />
        )}
        {phase === 10 && (
          <motion.div key="p10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl bg-white border border-black/10 rounded-[4rem] shadow-2xl p-14 flex flex-col gap-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1B3FBF]" />
            <div className="text-[10px] font-black uppercase tracking-[1em] text-black/20" style={SAT}>NOVA · BRAND SYSTEM 2026</div>
            <div className="grid grid-cols-2 gap-16">
              <div className="flex flex-col items-center gap-8 border-r border-black/5 pr-16">
                <motion.div initial={{ rotate: -12, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className="w-40 h-40 bg-black rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                  <span className="text-white text-8xl" style={TAN}>N</span>
                </motion.div>
                <p className="text-center text-black/30 text-[10px] uppercase tracking-widest" style={SAT}>Primary Wordmark · KREO Engine</p>
              </div>
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 mb-4" style={SAT}>Chromatic System</p>
                  <div className="flex gap-4">
                    {[{ c: '#000', n: 'Void' }, { c: '#1B3FBF', n: 'Primary' }, { c: '#FACC15', n: 'Accent' }, { c: '#F8F9FF', n: 'Surface' }].map((s, i) => (
                      <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl border border-black/10 shadow-inner" style={{ backgroundColor: s.c }} />
                        <p className="text-[8px] font-black uppercase text-black/30" style={SAT}>{s.n}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 mb-3" style={SAT}>Typography</p>
                  <h2 className="text-5xl text-black tracking-tighter" style={TAN}>TAN NIMBUS</h2>
                  <h3 className="text-3xl text-black/30 tracking-tight mt-1" style={SAT}>Satoshi — UI Sans</h3>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {phase === 11 && (
          <div className="text-center space-y-4">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl text-black/20 tracking-tight" style={TAN}>What more can you do with</motion.h1>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="block text-6xl md:text-9xl text-[#1B3FBF] tracking-tighter" style={TAN}>KREO</motion.span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── SCENE 4: Possibilities Bombardment ────────────────────────────────────────
const EXAMPLES = [
  "Financial Reports", "Landing Pages", "Pitch Decks", "SaaS Dashboards",
  "Brand Toolkits", "Flowcharts", "Study Flashcards", "Legal Briefs",
  "Architecture Plans", "Portfolio Sites", "Marketing Funnels", "Audit Reports",
  "Scientific Diagrams", "Project Roadmaps", "Course Curriculum", "Event Programs",
  "Budget Trackers", "Org Charts", "Mind Maps", "Style Guides",
  "API Documentation", "System Architecture", "Hiring Pipelines", "E-commerce UIs",
  "Network Maps", "Digital Magazines", "Social Creatives", "Mobile Apps",
];

const Scene4 = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [complete, setComplete] = useState(false);

  const positions = useMemo(() => EXAMPLES.map(() => ({
    x: (Math.random() * 70) - 35,
    y: (Math.random() * 60) - 30,
    rotate: (Math.random() * 40) - 20,
  })), []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= EXAMPLES.length) {
        clearInterval(interval);
        setTimeout(() => setComplete(true), 1500);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="text-center mb-0 relative z-[1000] self-start w-full pt-16">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.6em] uppercase mb-2" style={SAT}>Neural Domain</p>
        <h1 className="text-4xl md:text-6xl tracking-tighter leading-none text-black" style={TAN}>What you can do with KREO</h1>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center">
        {EXAMPLES.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, y: 150 }}
            animate={{
              opacity: i < visibleCount ? 1 : 0,
              scale: i < visibleCount ? 1 : 0.5,
              x: `${positions[i].x}vw`,
              y: `${positions[i].y}vh`,
              rotate: positions[i].rotate,
              zIndex: i,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute p-5 md:p-7 rounded-[2rem] border-white/10 shadow-2xl flex items-center justify-center min-w-[240px] md:min-w-[300px] bg-[#1B3FBF]"
          >
            <span className="text-white text-lg md:text-2xl tracking-tighter" style={TAN}>{text}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, backdropFilter: 'blur(50px)' }}
            className="fixed inset-0 bg-white/5 z-[2000] flex items-center justify-center text-center px-6"
          >
            <motion.h1 initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}
              className="text-6xl md:text-[10vw] text-white tracking-tighter mix-blend-difference leading-none"
              style={TAN}
            >
              The limit is your<br /><span className="font-light">imagination.</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── SCENE 5: Finale ────────────────────────────────────────────────────────────
const Scene5 = () => {
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
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      <div className="text-center space-y-8 w-full px-10">
        <motion.h1 className="text-[15vw] text-[#1B3FBF] tracking-tighter leading-none" style={TAN}>
          {text}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-2 inline-block w-[3px] h-[1em] bg-[#1B3FBF] align-middle"
          />
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] opacity-30" style={SAT}
        >
          creoai.vercel.app
        </motion.p>
      </div>
    </div>
  );
};

// ── MAIN ───────────────────────────────────────────────────────────────────────
export default function Promo8() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = useRef<any>(null);

  useEffect(() => {
    const duration = SCENE_DURATION[scene];
    let elapsed = 0;
    const tick = 50;
    timer.current = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        clearInterval(timer.current);
        setScene(prev => (prev + 1) % TOTAL_SCENES);
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(timer.current);
  }, [scene]);

  const scenes = [<Scene0 />, <Scene1 />, <Scene2 />, <Scene3 />, <Scene4 />, <Scene5 />];

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-white">
      {/* Dot navigation */}
      <div className="fixed top-10 right-12 z-[6000] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-500 ${i === scene ? 'w-8 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>

      {/* Scene renderer */}
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="w-full h-full">
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 z-[6000] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
