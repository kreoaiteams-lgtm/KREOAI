import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, UserPlus, ArrowDown, Presentation, Code2, Table2, GitGraph, Smile } from 'lucide-react';
import KreonCard from '../components/KreonCard';
import Footer from '../components/Footer';

/**
 * CampaignPage — "Build with KREO"
 *
 * 3 snap sections:
 *  1. White hero        — KREO wordmark + "Build with"
 *  2. Pure black        — KREON certificate fills the screen (card + share)
 *  3. Black details     — perks, CTA, join registry
 */
const floatingItems = [
  { label: 'Generate Wireframes', left: 8, top: 12, color: 'bg-blue-100/90 text-blue-700', initialX: window.innerWidth * 0.08, initialY: window.innerHeight * 0.12 },
  { label: 'Export to Code', left: 82, top: 18, color: 'bg-indigo-100/90 text-indigo-700', initialX: window.innerWidth * 0.82, initialY: window.innerHeight * 0.18 },
  { label: 'UI Prototyping', left: 68, top: 32, color: 'bg-green-100/90 text-green-700', initialX: window.innerWidth * 0.68, initialY: window.innerHeight * 0.32 },
  { label: 'Live Collaboration', left: 12, top: 42, color: 'bg-orange-100/90 text-orange-700', initialX: window.innerWidth * 0.12, initialY: window.innerHeight * 0.42 },
  { label: 'Component Library', left: 85, top: 58, color: 'bg-rose-100/90 text-rose-700', initialX: window.innerWidth * 0.85, initialY: window.innerHeight * 0.58 },
  { label: 'Auto Layout', left: 5, top: 68, color: 'bg-yellow-100/90 text-yellow-700', initialX: window.innerWidth * 0.05, initialY: window.innerHeight * 0.68 },
  { label: 'Design Systems', left: 62, top: 82, color: 'bg-purple-100/90 text-purple-700', initialX: window.innerWidth * 0.62, initialY: window.innerHeight * 0.82 },
  { label: 'Version Control', left: 28, top: 86, color: 'bg-teal-100/90 text-teal-700', initialX: window.innerWidth * 0.28, initialY: window.innerHeight * 0.86 },
  { label: 'Responsive Grids', left: 42, top: 10, color: 'bg-red-100/90 text-red-700', initialX: window.innerWidth * 0.42, initialY: window.innerHeight * 0.10 },
  { label: 'Dark Mode Generator', left: 18, top: 80, color: 'bg-slate-100/90 text-slate-700', initialX: window.innerWidth * 0.18, initialY: window.innerHeight * 0.80 },
  { label: 'Micro-Animations', left: 45, top: 25, color: 'bg-emerald-100/90 text-emerald-700', initialX: window.innerWidth * 0.45, initialY: window.innerHeight * 0.25 },
  { label: 'Accessibility Tools', left: 25, top: 35, color: 'bg-cyan-100/90 text-cyan-700', initialX: window.innerWidth * 0.25, initialY: window.innerHeight * 0.35 },
  { label: 'Real-time Analytics', left: 55, top: 48, color: 'bg-fuchsia-100/90 text-fuchsia-700', initialX: window.innerWidth * 0.55, initialY: window.innerHeight * 0.48 },
  { label: 'Content Strategy', left: 40, top: 70, color: 'bg-lime-100/90 text-lime-700', initialX: window.innerWidth * 0.40, initialY: window.innerHeight * 0.70 },
  { label: 'API Integrations', left: 75, top: 72, color: 'bg-sky-100/90 text-sky-700', initialX: window.innerWidth * 0.75, initialY: window.innerHeight * 0.72 },
];

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'reveal' | 'hero'>('reveal');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardInterest, setCardInterest] = useState<'design' | 'tech' | 'architecture' | 'product' | 'art' | 'sports' | 'music' | 'news'>('design');

  useEffect(() => {
    const t = setTimeout(() => setStage('hero'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-screen overflow-y-auto overflow-x-hidden relative"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Noise */}
      <div
        className="fixed inset-0 z-[900] pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay' }}
      />

      <AnimatePresence mode="wait">

        {/* ─── REVEAL: identity pop ─── */}
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.93, y: -24 }}
            transition={{ exit: { duration: 0.45 } }}
            className="fixed inset-0 z-[800] flex items-center justify-center bg-white"
          >
            <motion.span
              initial={{ scale: 0.45, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 9, stiffness: 150 }}
              style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              className="text-[16vw] font-bold text-[#1B3FBF] tracking-tighter select-none"
            >
              KREO
            </motion.span>
          </motion.div>
        )}

        {stage === 'hero' && (
          <div>

            {/* ══════════════════════════════════════════
                SCREEN 1 — "BUILD YOUR IMAGINATION" HERO
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-[#1B3FBF] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Dot grid bg */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
                <svg width="100%" height="100%">
                  <pattern id="dg2" width="44" height="44" patternUnits="userSpaceOnUse">
                    <circle cx="22" cy="22" r="1.5" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dg2)" />
                </svg>
              </div>

              {/* Large white diagonal stripe accent — top right */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute top-0 right-0 w-full h-full bg-white origin-top-right" style={{ clipPath: 'polygon(40% 0%, 100% 0%, 100% 60%)' }} />
              </div>
              {/* Bottom left accent */}
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute bottom-0 left-0 w-full h-full bg-white" style={{ clipPath: 'polygon(0% 40%, 60% 100%, 0% 100%)' }} />
              </div>

              {/* Productivity Floating Elements (High Visibility) */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1 }} className="absolute inset-0 pointer-events-none">
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-[20%] left-[10%]">
                  <Presentation size={64} className="text-white" />
                  <span className="text-[12px] font-black uppercase tracking-widest mt-3 block opacity-90">Strategy</span>
                </motion.div>
                <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-[25%] right-[12%]">
                  <Code2 size={60} className="text-white" />
                  <span className="text-[12px] font-black uppercase tracking-widest mt-3 block opacity-90">Engineering</span>
                </motion.div>
                <motion.div animate={{ x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-[25%] left-[15%]">
                  <Table2 size={56} className="text-white" />
                  <span className="text-[12px] font-black uppercase tracking-widest mt-3 block opacity-90">Analysis</span>
                </motion.div>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute bottom-[20%] right-[10%] text-white">
                  <GitGraph size={62} />
                  <span className="text-[12px] font-black uppercase tracking-widest mt-3 block opacity-90 text-white">Workflow</span>
                </motion.div>
                {/* Smilies */}
                <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-[40%] right-[8%] opacity-60">
                  <Smile size={48} className="text-white" />
                </motion.div>
                <motion.div animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute bottom-[40%] left-[8%] opacity-60">
                  <Smile size={36} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Decorative dashed arrows — corners */}
              <svg className="absolute top-[12%] left-[8%] opacity-30 pointer-events-none hidden md:block" width="90" height="28" viewBox="0 0 90 28" fill="none">
                <path d="M4 14 L72 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="6 5"/>
                <path d="M65 6 L75 14 L65 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <svg className="absolute top-[12%] right-[8%] opacity-30 pointer-events-none hidden md:block scale-x-[-1]" width="90" height="28" viewBox="0 0 90 28" fill="none">
                <path d="M4 14 L72 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="6 5"/>
                <path d="M65 6 L75 14 L65 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <svg className="absolute bottom-[14%] left-[8%] opacity-30 pointer-events-none hidden md:block rotate-[180deg]" width="90" height="28" viewBox="0 0 90 28" fill="none">
                <path d="M4 14 L72 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="6 5"/>
                <path d="M65 6 L75 14 L65 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <svg className="absolute bottom-[14%] right-[8%] opacity-30 pointer-events-none hidden md:block rotate-[180deg] scale-x-[-1]" width="90" height="28" viewBox="0 0 90 28" fill="none">
                <path d="M4 14 L72 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="6 5"/>
                <path d="M65 6 L75 14 L65 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              {/* Centre top small asterisk */}
              <svg className="absolute top-[8%] left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="10" y1="1" x2="10" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="1" y1="10" x2="19" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="3" x2="17" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="17" y1="3" x2="3" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>

              {/* Main content */}
              <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
                <motion.span
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-[10px] font-black uppercase tracking-[0.6em] text-white/60 mb-8 block"
                >
                  Creative Studio Engine
                </motion.span>

                {/* Main headline — stacked large type */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[9vw] font-black text-white tracking-tighter leading-[0.9] mb-0"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Build your
                </motion.h1>

                {/* "imagination." with slight italic flavour */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <h1 className="text-[9vw] font-black italic text-[#FACC15] tracking-tighter leading-[0.9]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    imagination.
                  </h1>
                </motion.div>

                {/* "with KREO" — large, cobalt, TAN-NIMBUS */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-6 mt-8"
                >
                  <span className="text-6xl font-black uppercase tracking-[0.2em] text-white"
                        style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    with
                  </span>
                  <span className="text-[9vw] font-bold text-white tracking-tighter leading-none"
                        style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                    KREO
                  </span>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
                  className="mt-12 flex items-center gap-4"
                >
                  <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-10 py-4 bg-white text-[#1B3FBF] rounded-full flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-white/10 hover:bg-black hover:text-white transition-all"
                  >
                    <UserPlus size={14} /> Enter the Studio
                  </motion.button>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Open Registry</p>
                  </div>
                </motion.div>
              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">View Identity Protocol</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={13} />
                </motion.div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SCREEN 3 — CONFIGURE YOUR CREATIVE IDENTITY
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden py-24"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {/* Grain / Noise + Grid bg */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', mixBlendMode: 'overlay' }} />
              <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
                <svg width="100%" height="100%">
                  <pattern id="gridbg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern>
                  <rect width="100%" height="100%" fill="url(#gridbg)" />
                </svg>
              </div>

              {/* Cursor trailing graphics */}
              <motion.div
                className="absolute pointer-events-none"
                animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
              >
                <div className="w-[300px] h-[300px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center justify-center text-center">
                
                {/* Preference Toggle Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-2 mb-10 w-full max-w-4xl"
                >
                  {[
                    { id: 'design', label: 'Design', color: '#c084fc' },
                    { id: 'tech', label: 'Engineering', color: '#3b82f6' },
                    { id: 'architecture', label: 'Architecture', color: '#22c55e' },
                    { id: 'product', label: 'Product', color: '#f97316' },
                    { id: 'art', label: 'Art', color: '#ec4899' },
                    { id: 'sports', label: 'Sports', color: '#14b8a6' },
                    { id: 'music', label: 'Music', color: '#8b5cf6' },
                    { id: 'news', label: 'News', color: '#eab308' },
                  ].map((cat) => {
                    const isActive = cardInterest === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCardInterest(cat.id as any)}
                        style={{
                          backgroundColor: isActive ? cat.color : 'rgba(255,255,255,0.05)',
                          color: isActive ? (cat.id === 'tech' || cat.id === 'art' || cat.id === 'sports' || cat.id === 'music' ? '#fff' : '#000') : '#fff',
                          border: isActive ? `1px solid ${cat.color}` : '1px solid rgba(255,255,255,0.1)',
                          boxShadow: isActive ? `0 4px 20px ${cat.color}60` : 'none',
                        }}
                        className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </motion.div>

                {/* Main Row */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl relative h-[600px]">

                  {/* ── Decorative SVG graffiti / arrows scattered around ── */}
                  {/* Top-left scribble arrow */}
                  <svg className="absolute top-2 left-[18%] opacity-30 pointer-events-none" width="80" height="60" viewBox="0 0 80 60" fill="none">
                    <path d="M10 50 Q20 10 60 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="4 3"/>
                    <path d="M55 14 L64 22 L52 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  {/* Top-right small star/asterisk */}
                  <svg className="absolute top-8 right-[20%] opacity-20 pointer-events-none" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <line x1="14" y1="2" x2="14" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="5" y1="5" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="23" y1="5" x2="5" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {/* Bottom-left curved arrow */}
                  <svg className="absolute bottom-20 left-[22%] opacity-25 pointer-events-none" width="70" height="55" viewBox="0 0 70 55" fill="none">
                    <path d="M60 10 Q20 10 15 40" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="5 3"/>
                    <path d="M10 34 L17 44 L26 36" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  {/* Bottom-right circle sketch */}
                  <svg className="absolute bottom-24 right-[22%] opacity-20 pointer-events-none" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="14" stroke="white" strokeWidth="1.2" strokeDasharray="5 3"/>
                  </svg>
                  {/* Mid-left diagonal line */}
                  <svg className="absolute top-1/2 left-[12%] -translate-y-1/2 opacity-15 pointer-events-none" width="40" height="80" viewBox="0 0 40 80" fill="none">
                    <line x1="35" y1="5" x2="5" y2="75" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4"/>
                  </svg>
                  {/* Mid-right diagonal line */}
                  <svg className="absolute top-1/2 right-[12%] -translate-y-1/2 opacity-15 pointer-events-none" width="40" height="80" viewBox="0 0 40 80" fill="none">
                    <line x1="5" y1="5" x2="35" y2="75" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4"/>
                  </svg>

                  {/* Left Side: You are a KREON */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 20 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[340px] text-left hidden md:flex flex-col gap-6"
                  >
                    {/* Swirly Arrow pointing left toward info panel (Originating from Card) */}
                    <svg className="mb-2 scale-x-[-1]" width="200" height="90" viewBox="0 0 160 60" fill="none">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.6, duration: 1.2 }}
                        d="M10 30 C 60 10, 80 50, 150 50" 
                        stroke="white" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeDasharray="2 8"
                      />
                      <path d="M140 42 L154 51 L142 60" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-2">Identity Confirmed</span>
                      <h3 className="text-4xl font-black text-white leading-tight tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                        You are a<br/>KREON.
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed mt-4 font-medium">
                        This card is your permanent residency in the KREO ecosystem. A living proof of your creative identity.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 mt-1">
                      {['Unique Residency #', 'Permanent Identity', 'Studio Access'].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <svg width="28" height="14" viewBox="0 0 24 12" fill="none">
                            <path d="M2 6 L18 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
                            <path d="M14 2 L20 6 L14 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" fill="none"/>
                          </svg>
                          <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Center: The Dynamic Card */}
                  <motion.div
                    className="flex-shrink-0 relative z-20 group mx-auto"
                    key={cardInterest}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                  >
                    <div className="absolute inset-0 bg-[#1B3FBF]/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <KreonCard interest={cardInterest} />
                  </motion.div>

                  {/* Right Side: Lined arrows showing powers */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] text-left hidden md:flex flex-col gap-5"
                  >
                    {/* Swirly Arrow pointing right toward info panel (Originating from Card) */}
                    <svg className="mb-2" width="200" height="90" viewBox="0 0 160 60" fill="none">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        d="M10 30 C 60 10, 80 50, 150 50" 
                        stroke="white" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeDasharray="2 8"
                      />
                      <path d="M140 42 L154 51 L142 60" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Powers Unlocked</span>
                    {[
                      { label: 'Generate Wireframes', desc: 'Instant UI from a prompt' },
                      { label: 'Export to Code', desc: 'Clean, production-ready HTML' },
                      { label: 'Live Collaboration', desc: 'Share & iterate in real-time' },
                      { label: 'Design Systems', desc: 'Tokens, palettes & components' },
                    ].map((power, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="flex items-start gap-4 group/item"
                      >
                        {/* Lined arrow */}
                        <svg className="shrink-0 mt-1.5" width="40" height="20" viewBox="0 0 32 16" fill="none">
                          <path d="M2 8 L24 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" className="group-hover/item:stroke-opacity-80 transition-all"/>
                          <path d="M19 3 L26 8 L19 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" fill="none" className="group-hover/item:stroke-opacity-80 transition-all"/>
                        </svg>
                        <div>
                          <div className="text-[12px] font-black text-white/80 uppercase tracking-widest">{power.label}</div>
                          <div className="text-[11px] text-white/40 font-medium mt-0.5">{power.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                </div>
              </div>
              
            </section>

            {/* Global Footer */}
            <section className="snap-start h-auto bg-white">
              <Footer />
            </section>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignPage;
