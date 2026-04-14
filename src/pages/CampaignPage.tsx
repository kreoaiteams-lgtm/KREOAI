import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, UserPlus, ArrowDown } from 'lucide-react';
import KreonCard from '../components/KreonCard';

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
                SCREEN 1 — "WHAT YOU CAN DO WITH KREO" (REPEL LOGIC)
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg width="100%" height="100%">
                  <pattern id="dg1" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="black" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dg1)" />
                </svg>
              </div>

              <div className="relative z-20 text-center pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF] mb-4 block">
                  Capability Engine
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none mb-4">
                  What you can do with <br />
                  <span className="text-[#1B3FBF]" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>KREO</span>
                </h1>
                <p className="text-sm font-medium text-black/40">Move your mouse to interact</p>
              </div>

              {/* Floating repulsion items */}
              {floatingItems.map((item, i) => {
                // Calculate distance from mouse
                const dx = mousePos.x - item.initialX;
                const dy = mousePos.y - item.initialY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 250;
                
                let ox = 0;
                let oy = 0;
                
                if (distance < repelRadius && distance > 0) {
                  const force = (repelRadius - distance) / repelRadius;
                  ox = -(dx / distance) * force * 100;
                  oy = -(dy / distance) * force * 100;
                }

                return (
                  <motion.div
                    key={i}
                    animate={{ x: ox, y: oy }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ position: 'absolute', left: `${item.left}%`, top: `${item.top}%` }}
                    className={`px-6 py-4 rounded-full text-sm md:text-base font-black shadow-2xl border border-white/50 backdrop-blur-md cursor-default select-none ${item.color}`}
                    whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 5 : -5 }}
                  >
                    {item.label}
                  </motion.div>
                );
              })}

              <div className="absolute bottom-8 flex flex-col items-center gap-2 text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Scroll down</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ArrowDown size={13} />
                </motion.div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                SCREEN 2 — "BUILD YOUR IMAGINATION." (WHITE + GRAPHICS)
            ══════════════════════════════════════════ */}
            <section
              style={{ scrollSnapAlign: 'start' }}
              className="relative h-screen w-full bg-[#f8f9fa] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Grain */}
              <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.04]"
                   style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

              <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center">
                
                {/* Smaller top text */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative mb-2">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Build your
                    <br />
                    imagination.
                  </h2>
                  
                  {/* Graphics added around text */}
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute -top-16 -left-20 opacity-80 mix-blend-multiply hidden md:block">
                    <svg width="80" height="80" viewBox="0 0 80 80"><path d="M 40 10 L 45 35 L 70 40 L 45 45 L 40 70 L 35 45 L 10 40 L 35 35 Z" fill="#facc15" /></svg>
                  </motion.div>
                  <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -bottom-12 -right-16 opacity-80 mix-blend-multiply hidden md:block">
                    <svg width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="#3b82f6" /></svg>
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.1, 1], rotate: [15, 25, 15] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute top-1/2 -right-32 opacity-80 mix-blend-multiply hidden md:block">
                    <svg width="70" height="70" viewBox="0 0 70 70"><rect x="15" y="15" width="40" height="40" rx="8" fill="#f97316" /></svg>
                  </motion.div>
                  <motion.div animate={{ x: [0, 10, 0], y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-full left-1/2 opacity-80 mix-blend-multiply hidden md:block">
                    <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,5 35,35 5,35" fill="#ec4899" /></svg>
                  </motion.div>
                  <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-1/4 -left-36 opacity-30 mix-blend-multiply hidden md:block">
                    <svg width="120" height="120" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* BIGGER "with KREO" */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 flex flex-col items-center justify-center relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-1">with</span>
                  <span className="text-6xl sm:text-[90px] font-bold text-[#1B3FBF] tracking-tighter leading-none" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                    KREO
                  </span>
                </motion.div>

                {/* CTA merged into this screen */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-14 flex flex-col items-center gap-3">
                  <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-black text-white rounded-full flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#1B3FBF] transition-colors"
                  >
                    <UserPlus size={16} /> Enter the Studio
                  </motion.button>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/40">Open for Registry</p>
                  </div>
                </motion.div>

              </div>

              {/* Scroll cue */}
              <div className="absolute bottom-8 w-full flex justify-center text-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">View Identity Protocol</span>
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
                <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-5xl">

                  {/* Left Side: What is a KREON? Explanation Popup */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="flex-1 text-left bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Identity Protocol</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">What is a KREON?</h3>
                    <p className="text-sm font-medium text-white/70 leading-relaxed mb-6">
                      A KREON isn't just a user account. It is your permanent, immutable identity in the KREO ecosystem. Every wireframe designed, every component exported, and every workspace built is permanently tied to this unique residency number.
                    </p>
                    <div className="h-px w-full bg-white/10 mb-6" />
                    <p className="text-sm font-medium text-white/70 leading-relaxed">
                      Choose your primary discipline above to construct your aesthetic marker. Claiming this card unlocks your permanent access to the studio engine.
                    </p>
                  </motion.div>

                  {/* Right Side: The Dynamic Card */}
                  <motion.div
                    className="flex-shrink-0 perspective-[1000px] relative group"
                    key={cardInterest} // Force re-animation on change
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                  >
                    {/* Glowing aura when hovered */}
                    <div className="absolute inset-0 bg-white/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <KreonCard interest={cardInterest} />
                  </motion.div>

                </div>
              </div>
              
              <footer className="absolute bottom-4 text-center text-white/30 text-[9px] font-black uppercase tracking-[0.5em] w-full">
                ©2026 KREO NEURAL STUDIO. ALL RIGHTS RESERVED.
              </footer>
            </section>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignPage;
