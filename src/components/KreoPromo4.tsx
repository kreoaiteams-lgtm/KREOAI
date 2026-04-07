import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from './Hello (apple).json';

// --- CONSTANTS ---
const SCENE_DURATION = [
  10000, // 0: Scenes Stacking
  4000,  // 1: White screen "so many problems..."
  4600,  // 2: Splash (KREO Revelation)
  64500, // 3: Interactive Visual Loop (4 demos + text screens)
  22000, // 4: Possibilities Pile (BOMBARDMENT) 
  6000,  // 5: Finale (Typing KREO)
];
const TOTAL_SCENES = SCENE_DURATION.length;

// --- SHARED COMPONENTS ---
const ScenarioCard = ({ text, subtext, index, theme = 'blue' }: { text: string; subtext: string; index: number; theme?: 'blue' | 'accent' }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.95, rotate: (index % 2 === 0 ? -2 : 2) }}
    animate={{ 
      opacity: 1, 
      y: index * 20, 
      rotate: (index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0),
      scale: 1, 
      zIndex: index 
    }}
    transition={{ delay: index * 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute w-full max-w-2xl p-10 rounded-[2.5rem] border shadow-2xl ${
      theme === 'blue' ? 'bg-[#1B3FBF] border-white/20 text-white' : 'bg-white border-black/10 text-black'
    }`}
  >
    <div className="text-center space-y-3">
      <h2 className="text-xl md:text-3xl font-serif italic tracking-tight leading-tight">{text}</h2>
      <p className={`text-sm md:text-base font-light ${theme === 'blue' ? 'text-white/60' : 'text-black/40'}`}>{subtext}</p>
    </div>
  </motion.div>
);

// --- SCENE 0: Merged Scenario Pile ---
const SCENARIOS = [
  { t: "Meeting in 2 hours. No deck.", s: "The idea is there. The visuals aren't." },
  { t: "Flowchart for a 40-page PDF.", s: "The exam is tomorrow. You need it visual." },
  { t: "FD @ 7.5% vs SIP @ 12%.", s: "Stop the math. Manifest the result." },
  { t: "Startup needs a landing page.", s: "No dev team? No problem." },
  { t: "Mockup in 10 minutes.", s: "You promised. KREO delivers." },
  { t: "Scientific diagram check.", s: "Complex reality, simple manifestation." },
  { t: "Physics project due at 9 AM.", s: "Vector dynamics in seconds." },
  { t: "Quarterly review board.", s: "Data into aesthetic architecture." },
  { t: "Architecture plan needs 3D.", s: "From wireframe to vision." },
  { t: "Client pitch at noon.", s: "Wow them before they speak." }
];

const Scene0 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-2">Neural Reality</p>
        <h1 className="text-4xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight">We all face situations</h1>
    </motion.div>
    <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center">
       {SCENARIOS.map((card, i) => (
         <ScenarioCard key={i} index={i} text={card.t} subtext={card.s} theme="blue" />
       ))}
    </div>
  </div>
);

// --- SCENE 1: Transition White Screen ---
const Scene1 = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-6">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      className="text-4xl md:text-7xl font-serif italic tracking-tighter text-black/80 leading-none">
      So many problems but <br/>
      only one{' '}
      <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="text-[#1B3FBF] not-italic font-normal">solution</motion.span>
    </motion.h2>
  </div>
);

// --- SCENE 2: Embedded Splash Screen Logic ---
const SceneSplash = () => {
  const [phase, setPhase] = useState<"idle" | "lottie" | "reveal" | "exit">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("lottie"), 200);   
    const t2 = setTimeout(() => setPhase("reveal"), 2400);  
    const t3 = setTimeout(() => setPhase("exit"),   3400);  
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const lottieVisible = phase !== "idle" && phase !== "exit";
  const kreoVisible   = phase === "reveal" || phase === "exit";
  const exitActive    = phase === "exit";

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#1B3FBF] overflow-hidden"
      style={{
        opacity:    exitActive ? 0 : 1,
        transition: exitActive ? "opacity 1.0s cubic-bezier(0.4,0,0.2,1)" : "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Lottie Animation */}
      <div 
        className={`w-[600px] h-[600px] transition-all duration-1000 ${lottieVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-xl'}`}
        style={{ 
           transform: kreoVisible ? 'translateY(-60px) scale(0.6)' : 'translateY(0) scale(1)',
           filter: 'brightness(0) invert(1)' 
        }}
      >
        <Lottie animationData={animationData} loop={false} className="w-full h-full" />
      </div>

      {/* Celebrational Graffiti Field */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${kreoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        {[...Array(40)].map((_, i) => {
          const colors = ['bg-[#facc15]', 'bg-[#3b82f6]', 'bg-[#ef4444]', 'bg-[#10b981]', 'bg-white'];
          const x = (Math.random() * 100);
          const y = (Math.random() * 100);
          const size = Math.random() * 0.8 + 0.2;
          return (
            <div key={i} className={`absolute animate-bounce ${colors[i % colors.length] || 'bg-white'}`} style={{
                left: x + '%', top: y + '%', width: size + 'rem', height: size + 'rem', opacity: 0.6, animationDelay: (Math.random() * 0.5) + 's', borderRadius: i % 2 === 0 ? '50%' : '2px'
            }} />
          );
        })}
      </div>

      {/* Identity Revelation */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${kreoVisible ? 'opacity-100 translate-y-12' : 'opacity-0 translate-y-20 blur-md'}`}>
        <span className="relative z-10 text-8xl md:text-9xl font-light font-serif italic tracking-tighter text-white" style={{ textShadow: '0 0 50px rgba(255,255,255,0.4)' }}>
          KREO
        </span>
        <span className="relative z-10 mt-8 text-[9px] font-black tracking-[0.6em] uppercase text-white/40">Studio Engaged</span>
      </div>
    </div>
  );
};

// --- SCENE 3: Interactive Visual Loop ---
const Scene2 = () => {
  const [subPhase, setSubPhase] = useState(0); 
  
  useEffect(() => {
    const sequence = [
      { p: 13, d: 4000 }, // "An instant visualizer..."
      { p: 14, d: 4500 }, // "Sometimes you need apps..."
      { p: 15, d: 6000 }, // "Studies show visuals..."
      { p: 0, d: 3500 },  // Type PPT
      { p: 1, d: 4000 },  // PPT Slide 1
      { p: 2, d: 4000 },  // PPT Slide 2
      
      { p: 16, d: 6000 }, // "For students..."
      { p: 4, d: 3500 },  // Type Flow
      { p: 5, d: 5000 },  // Flowchart
      
      { p: 17, d: 4500 }, // "I just wanna convince..."
      { p: 7, d: 3500 },  // Type UI
      { p: 8, d: 5000 },  // UI Dashboard
      
      { p: 18, d: 6000 }, // "Why think? Just enter a vague prompt..."
      { p: 10, d: 3500 }, // Type Brand
      { p: 11, d: 5000 }, // Brand Toolkit UI
      { p: 12, d: 3000 }  // what more?
    ];
    let time = 0;
    const timers = sequence.map(item => {
      time += item.d;
      return setTimeout(() => setSubPhase(item.p), time - item.d);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 bg-white overflow-hidden">
       <AnimatePresence mode="wait">
          {subPhase === 13 && (
             <motion.div key="s13" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 01 / Manifestation</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                  An instant visualizer for your current imaginations.
                </h1>
                <div className="flex justify-center gap-2 pt-4">
                  {[...Array(3)].map((_, i) => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />)}
                </div>
             </motion.div>
          )}

          {subPhase === 14 && (
             <motion.div key="s14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 02 / The Need</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                   Sometimes you need apps, <br/>
                   <span className="text-[#1B3FBF] not-italic font-normal">but can't wait for someone to build it or a tool.</span>
                </h1>
             </motion.div>
          )}

          {subPhase === 15 && (
             <motion.div key="s15" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 03 / The Power</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                  Studies show visuals have a great impact on many.
                </h1>
                <p className="text-2xl md:text-4xl font-light text-black/50 italic">
                   Don't hassle anymore. <br/>
                   Just rule the space. <span className="text-[#1B3FBF] font-serif not-italic">Become the one.</span>
                </p>
             </motion.div>
          )}

          {subPhase === 16 && (
             <motion.div key="s16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 04 / For Students</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                  You don't always understand text or explanations...
                </h1>
                <h2 className="text-[#1B3FBF] text-5xl md:text-7xl font-normal">but visuals help.</h2>
             </motion.div>
          )}

          {subPhase === 17 && (
             <motion.div key="s17" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 05 / Conviction</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                  "I just wanna convince people to join me."
                </h1>
                <p className="text-black/40 text-sm uppercase tracking-[0.4em]">Scaling the vision in seconds</p>
             </motion.div>
          )}

          {subPhase === 18 && (
             <motion.div key="s18" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-8">
                <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 06 / Speed</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-tight max-w-5xl">
                  Why think? Just enter a vague prompt.
                </h1>
                <p className="text-[#1B3FBF] text-3xl md:text-6xl font-normal leading-none">
                  Something is better than nothing.
                </p>
             </motion.div>
          )}

          {(subPhase === 0 || subPhase === 4 || subPhase === 7 || subPhase === 10) && (
            <motion.div key="typing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-2xl border border-black/5 p-10 rounded-[2rem] bg-[#f8f9ff]">
               <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#1B3FBF]" />
                  <div className="w-2 h-2 rounded-full bg-black/5" />
               </div>
               <div className="text-black/60 text-lg md:text-2xl font-serif italic tracking-tight leading-snug">
                  {subPhase === 0 ? "Create a presentation on Global Energy Trends in 2026..." : 
                   subPhase === 4 ? "Manifest a physics flowchart for Motion in One Dimension..." : 
                   subPhase === 7 ? "Build a sleek SaaS dashboard for crypto investment tracking..." :
                   "Generate a premium brand toolkit for an AI startup called NEURA..."}
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block w-[2px] h-[0.9em] bg-[#1B3FBF] align-middle" />
               </div>
            </motion.div>
          )}

          {(subPhase === 1 || subPhase === 2) && (
            <motion.div key="ppt" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="w-full max-w-5xl h-[500px] bg-white rounded-[3rem] p-0 shadow-2xl relative border border-black/5 flex overflow-hidden">
                <div className="w-1/4 bg-[#f8f9ff] border-r border-black/5 p-8 flex flex-col gap-4">
                   <div className="h-4 w-20 bg-black/10 rounded-full mb-8" />
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className={`h-16 rounded-xl border ${i === (subPhase === 1 ? 0 : 1) ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'} p-3 space-y-2`}>
                        <div className="h-1.5 w-1/2 bg-black/20 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-black/10 rounded-full" />
                     </div>
                   ))}
                </div>
                <div className="flex-1 p-16 flex flex-col justify-center relative">
                   <div className="absolute top-12 right-12 text-black/10 text-[9px] font-black uppercase tracking-[0.4em]">MANIFESTED PRESENTATION / SLIDE 0{subPhase}</div>
                   <div className="space-y-8">
                      <motion.h1 key={subPhase} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-5xl md:text-7xl font-serif italic text-black leading-none tracking-tighter">
                         {subPhase === 1 ? "Efficiency Peak" : "The Grid Shift"}
                      </motion.h1>
                      <div className="flex items-center gap-3">
                         <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} transition={{ duration: 1 }} className="h-2 bg-[#1B3FBF]" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Neural Energy Analysis</span>
                      </div>
                      <p className="text-black/70 text-xl font-light max-w-2xl leading-relaxed">
                         {subPhase === 1 ? "Solar PV efficiency is projected to reach a record 28.5% by Q2 2026, driven by perovskite tandem cell integration." : 
                          "Smart grid connectivity increases by 42%, enabling decentralized transactive energy markets across oceanic cables."}
                      </p>
                      
                      <div className="flex gap-4 pt-8">
                         {[...Array(4)].map((_, i) => (
                           <motion.div key={i} initial={{ height: 0 }} animate={{ height: [20, 60, 40][i % 3] || 30 }} transition={{ delay: 0.5 + (i * 0.1), duration: 1 }} className="w-12 bg-black/5 rounded-t-lg relative group">
                              <div className={`absolute inset-0 bg-[#1B3FBF] rounded-t-lg transition-transform origin-bottom scale-y-0 group-hover:scale-y-100 duration-500`} style={{ height: '70%' }} />
                           </motion.div>
                         ))}
                      </div>
                   </div>
                </div>
            </motion.div>
          )}

          {(subPhase === 3 || subPhase === 6 || subPhase === 9) && (
            <motion.h1 key="more" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl font-serif italic text-black tracking-tighter uppercase leading-none text-center">
               {subPhase === 3 ? "Wait, there's more?" : subPhase === 6 ? "Even more?" : "Still more?"}
            </motion.h1>
          )}

          {subPhase === 5 && (
            <motion.div key="flow" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-5xl h-[550px] bg-white border border-black/5 rounded-[3rem] p-16 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center">
               <div className="absolute top-10 left-10 flex gap-1.5">
                  {[...Array(3)].map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-black/5" />)}
               </div>
               <div className="text-black/10 text-[10px] font-black uppercase tracking-[0.6em] mb-12 text-center">STUDENT PORTAL / MOTION FLOWCHART</div>
               <div className="flex flex-col items-center space-y-10 w-full relative">
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-12 py-6 bg-[#f8f9ff] border border-black/5 rounded-[1.5rem] text-black font-serif italic text-3xl shadow-sm z-10 relative">
                    Translatory Motion
                    <div className="absolute -bottom-10 left-1/2 w-0.5 h-10 bg-gradient-to-b from-[#1B3FBF]/40 to-transparent -translate-x-1/2" />
                  </motion.div>
                  
                  <div className="flex gap-12 pt-4 relative">
                     <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1B3FBF]/10 -translate-y-4" />
                     {[
                        { title: 'Position', sub: 's = displacement' },
                        { title: 'Velocity', sub: 'v = ∆s / ∆t' },
                        { title: 'Acceleration', sub: 'a = dv / dt' }
                     ].map((item, i) => (
                        <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + (i * 0.1) }} className="flex flex-col items-center space-y-4">
                           <div className="px-6 py-4 bg-[#1B3FBF] rounded-2xl text-white font-bold tracking-widest text-xs uppercase shadow-xl ring-8 ring-[#1B3FBF]/5">
                              {item.title}
                           </div>
                           <div className="text-[10px] text-black/50 font-mono italic px-4 py-2 bg-black/5 rounded-full">{item.sub}</div>
                        </motion.div>
                     ))}
                  </div>

                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }} className="px-12 py-7 border-2 border-[#1B3FBF] bg-white rounded-[2rem] text-[#1B3FBF] font-serif italic text-4xl shadow-xl leading-none relative">
                     Equations of Motion
                     <div className="absolute -top-10 left-1/2 w-0.5 h-10 bg-gradient-to-t from-[#1B3FBF]/40 to-transparent -translate-x-1/2" />
                  </motion.div>
               </div>
               
               {/* Background neural web */}
               <div className="absolute inset-0 -z-10 opacity-[0.03]">
                  <svg width="100%" height="100%">
                     <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="#1B3FBF" />
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
               </div>
            </motion.div>
          )}

          {subPhase === 8 && (
            <motion.div key="ui" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl h-[500px] bg-white border border-black/5 rounded-[3rem] shadow-2xl flex overflow-hidden ring-1 ring-black/5">
               <div className="w-64 border-r border-black/5 bg-[#f8f9ff] p-10 space-y-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-[#1B3FBF] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                     </div>
                     <span className="font-bold tracking-tighter text-black uppercase text-xs">Aesthetics UI</span>
                  </div>
                  <div className="space-y-6 pt-6">
                     {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#1B3FBF]' : 'bg-black/5'}`} />
                           <div className={`h-2 rounded-full ${i === 0 ? 'bg-black/20 w-3/4' : 'bg-black/5 w-1/2'}`} />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex-1 p-16 space-y-12 bg-white relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B3FBF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-center relative">
                     <div className="space-y-1">
                        <h3 className="text-3xl font-serif italic text-black">Crypto Portfolio Explorer</h3>
                        <p className="text-black/30 text-[10px] font-black uppercase tracking-[0.3em]">Neural Real-Time Update</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-green-50 rounded-full text-green-600 text-[10px] font-bold tracking-widest uppercase">Live Nodes: 12</div>
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 relative">
                     <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-44 rounded-[2rem] bg-[#f8f9ff] border border-black/5 p-8 flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-start">
                           <span className="text-[10px] font-black uppercase text-black/20 tracking-widest italic">Btc/Usd Index</span>
                           <span className="text-green-500 font-bold text-xs">+4.2%</span>
                        </div>
                        <span className="text-4xl font-light text-black tracking-tighter">$67,492.00</span>
                        <div className="h-2 bg-black/5 rounded-full w-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-[#1B3FBF] to-[#4F75FF]" />
                        </div>
                     </motion.div>
                     <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-44 rounded-[2rem] bg-black p-8 flex flex-col justify-between shadow-2xl">
                        <div className="flex justify-between items-start">
                           <span className="text-[10px] font-black uppercase text-white/40 tracking-widest italic">Master Portfolio</span>
                           <div className="w-2 h-2 rounded-full bg-[#1B3FBF]" />
                        </div>
                        <span className="text-4xl font-light text-white tracking-tighter">$ +14,250.40</span>
                        <div className="text-[10px] text-[#1B3FBF] font-black uppercase tracking-widest">+12.4% Neural Gain</div>
                     </motion.div>
                  </div>
               </div>
            </motion.div>
          )}

          {subPhase === 11 && (
            <motion.div key="brand" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl h-[550px] bg-white border border-black/10 rounded-[4rem] shadow-2xl p-16 flex flex-col items-center justify-between relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-[#1B3FBF]" />
               <div className="text-black/20 text-[10px] font-black uppercase tracking-[1em] mb-4">NEURA / IDENTITY SYSTEM 2026</div>
               <div className="flex-1 w-full grid grid-cols-2 gap-20">
                  <div className="flex flex-col items-center justify-center space-y-10 border-r border-black/5 relative">
                     <motion.div initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className="w-48 h-48 bg-black rounded-[3rem] flex items-center justify-center shadow-2xl ring-12 ring-black/5">
                        <span className="text-white font-serif text-9xl italic">N</span>
                     </motion.div>
                     <div className="text-center">
                        <p className="text-black text-2xl font-black uppercase tracking-[0.3em] italic mb-1">Primary Wordmark</p>
                        <p className="text-black/30 text-[9px] font-bold uppercase tracking-widest">Designed by KREO Engine</p>
                     </div>
                     <div className="absolute bottom-4 left-4 flex gap-1">
                        {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />)}
                     </div>
                  </div>
                  <div className="space-y-16 justify-center flex flex-col">
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.5em]">Chromatic Palette</p>
                        <div className="flex gap-6">
                           {[
                              { c: '#000000', n: 'Void' },
                              { c: '#1B3FBF', n: 'Kreo Blue' },
                              { c: '#FACC15', n: 'Accent' },
                              { c: '#F8F9FF', n: 'Surface' }
                           ].map((item, i) => (
                              <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + (i * 0.1) }} className="space-y-2">
                                 <div className="w-14 h-14 rounded-2xl border border-black/5 shadow-inner" style={{ backgroundColor: item.c }} />
                                 <div className="text-[8px] font-black uppercase text-black/20 text-center tracking-tighter">{item.n}</div>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.5em]">Typography Spec</p>
                        <div className="space-y-1">
                           <h2 className="text-6xl font-serif italic text-black tracking-tighter">Instrument Serif</h2>
                           <h2 className="text-4xl font-sans text-black/40 tracking-tight">Inter / Geometric Mono</h2>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {subPhase === 12 && (
            <div className="text-center space-y-4">
               <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-serif italic text-black/20 tracking-tight leading-none">What more can you do with</motion.h1>
               <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="block text-6xl md:text-9xl font-serif text-[#1B3FBF] tracking-tighter leading-none">KREO app</motion.span>
            </div>
          )}
       </AnimatePresence>
    </div>
  );
};

// --- SCENE 4: Possibilities Pile ---
const EXAMPLES = [
  "Scientific Diagrams", "Market Reports", "Logic Workflows", "Financial Models", 
  "Flashcard Sets", "Landing Pages", "Mockup Suites", "Pitch Decks", "API Docs", 
  "System Architecture", "Global Strategies", "User Experience Flow", "Legal Briefs",
  "Creative Scripts", "Project Roadmaps", "Course Curriculum", "SaaS Dashboards",
  "Portfolio Sites", "Budget Trackers", "Scientific Papers", "Audit Reports",
  "Marketing Funnels", "Product Wikis", "Hiring Pipelines", "Travel Itineraries",
  "E-commerce Checkouts", "Auth Flows", "Database Schemas", "Network Maps",
  "Org Charts", "Mind Maps", "Style Guides", "Brand Toolkits", "Event Planning"
];

const Scene3 = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [complete, setComplete] = useState(false);
  
  const positions = useMemo(() => {
    return EXAMPLES.map(() => ({
      x: (Math.random() * 70) - 35, 
      y: (Math.random() * 60) - 30, 
      rotate: (Math.random() * 40) - 20 
    }));
  }, []);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= EXAMPLES.length) {
        clearInterval(interval);
        setTimeout(() => setComplete(true), 1500);
      }
    }, 400); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="text-center mb-0 relative z-[1000] self-start w-full pt-16">
        <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.6em] uppercase mb-2">Neural Domain</p>
        <h1 className="text-4xl md:text-6xl font-serif italic text-black tracking-tighter leading-none">What you can do with KREO</h1>
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
                zIndex: i 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute p-6 md:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center justify-center min-w-[280px] md:min-w-[320px] bg-[#1B3FBF]"
            >
              <span className="text-white font-serif italic text-xl md:text-2xl tracking-tighter leading-none">{text}</span>
            </motion.div>
         ))}
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(50px)' }}
            className="fixed inset-0 bg-white/[0.05] z-[2000] flex items-center justify-center text-center px-6">
             <motion.h1 initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}
               className="text-6xl md:text-[10vw] font-serif italic text-white tracking-tighter mix-blend-difference leading-none">
                The limit is your <br/>
                <span className="not-italic font-normal">imagination.</span>
             </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SCENE 5: Finale (Typing KREO) ---
const Scene4 = () => {
  const [text, setText] = useState("");
  const target = "KREO";

  useEffect(() => {
    let index = 0;
    const t = setInterval(() => {
      setText(target.slice(0, index + 1));
      index++;
      if (index >= target.length) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
       <div className="text-center space-y-8 w-full px-10">
          <motion.h1 className="text-[15vw] font-serif italic text-[#1B3FBF] tracking-tighter leading-none">
             {text}
             <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-2 inline-block w-[3px] h-[1em] bg-[#1B3FBF] align-middle" />
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] opacity-20">creoai.vercel.app</motion.p>
       </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
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
    <Scene0 />, 
    <Scene1 />, 
    <SceneSplash />, 
    <Scene2 />, 
    <Scene3 />, 
    <Scene4 />
  ];

  return (
    <div className={`relative w-full h-screen overflow-hidden cursor-default select-none bg-white`}>
      {/* Navigation */}
      <div className="fixed top-12 right-14 z-[6000] flex items-center gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button key={i} onClick={() => { setScene(i); setProgress(0); }}
            className={`rounded-full transition-all duration-500 ${i === scene ? 'w-8 h-2 bg-[#1B3FBF]' : 'w-2 h-2 bg-black/5 hover:bg-black/10'}`} />
        ))}
      </div>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full">
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 w-full h-1 z-[6000] bg-black/5">
        <div className="h-full bg-[#1B3FBF] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
