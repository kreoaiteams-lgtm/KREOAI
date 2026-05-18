import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Zap, ArrowRight, Share2, Layers, Cpu, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

// Timing per scene in milliseconds
const DUR = [5000, 5200, 5200, 5500, 6000];
const TOTAL = DUR.length;

// Ambient Glow
const Glow = ({ x = '50%', y = '50%', size = '65%', op = 0.07, color = '201,168,76' }) => (
  <div
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(${color},${op}) 0%, transparent 70%)`,
    }}
  />
);

// Grain effect
const Grain = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`,
      opacity: 0.5,
    }}
  />
);

// Wordmark
const Wordmark = () => (
  <div className="fixed top-7 left-8 z-[9000] flex items-center gap-3" style={{ fontFamily: SAT, fontSize: '0.65rem', color: `rgba(232,234,240,0.35)`, letterSpacing: '0.2em' }}>
    <span className="font-bold tracking-widest text-white">KREO</span>
    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
    <span className="text-[8px] font-light uppercase opacity-55">TREND LOG</span>
  </div>
);

/* ──────────────────────────────── SCENES ─────────────────────────────── */

// S0: The New Paradigm Shift
const S0 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-10 text-center" style={{ background: NAVY }}>
      <Glow x="50%" y="45%" size="80%" op={0.06} />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl space-y-6"
      >
        <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.45em', color: GOLD }} className="uppercase font-bold">
          A New Era of Identity
        </span>
        <h1 style={{ fontFamily: IS, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Standard PDF profiles are dead.<br />
          The <span style={{ color: GOLD }}>Kreon Card</span> is the new trend.
        </h1>
        <p style={{ fontFamily: SAT, fontSize: '0.9rem', color: 'rgba(232,234,240,0.4)', fontWeight: 300, maxW: '460px', margin: '0 auto', lineHeight: 1.6 }}>
          Visionaries, curators, and elite digital architects are sharing their live-manifested creative DNA across the web.
        </p>
      </motion.div>
    </div>
  );
};

// S1: The Kreon Trend Card Visual representation
const S1 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 px-10" style={{ background: NAVY }}>
      <Glow x="30%" y="50%" size="70%" op={0.05} />
      
      {/* Left side: Beautiful glowing card visual */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
        animate={show ? { scale: 1, opacity: 1, rotateY: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-80 h-[460px] bg-gradient-to-br from-[#E25C38] to-[#E97E25] rounded-[2.2rem] p-8 shadow-2xl flex flex-col justify-between text-white border border-white/10"
      >
        {/* Neon shine lines */}
        <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start">
          <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.2em' }} className="bg-black/20 px-3 py-1 rounded-full uppercase font-black">
            Product Strategy
          </span>
          <span style={{ fontFamily: SAT, fontSize: '0.75rem', opacity: 0.4 }} className="font-mono"># 7392</span>
        </div>

        {/* Abstract design geometry */}
        <div className="w-full flex items-center justify-center py-6">
          <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 rounded-xl bg-white rotate-45 flex items-center justify-center">
              <span style={{ fontFamily: NIM, color: '#E25C38', fontSize: '1.2rem' }}>K</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-[1px] bg-white/20 w-full" />
          <span style={{ fontFamily: SAT, fontSize: '0.55rem', letterSpacing: '0.3em', opacity: 0.5 }} className="uppercase font-black block">
            Resident Curator
          </span>
          <h2 style={{ fontFamily: SAT, fontSize: '1.4rem', fontWeight: 900, lineHeight: 1 }} className="uppercase tracking-tight">
            Ahana Kushwada
          </h2>
          <p style={{ fontFamily: IS, fontSize: '0.95rem', opacity: 0.8 }} className="italic font-light leading-relaxed">
            "Curating visual systems at the intersection of neural AI and premium architecture."
          </p>
        </div>
      </motion.div>

      {/* Right side: Explanation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="max-w-md space-y-6 text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[9px] font-black uppercase tracking-wider">
          <Share2 className="w-3 h-3" /> Viral Trend
        </div>
        <h3 style={{ fontFamily: IS, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.1 }}>
          Shared. Verified.<br />
          Built to stand out.
        </h3>
        <p style={{ fontFamily: SAT, fontSize: '0.85rem', color: 'rgba(232,234,240,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
          Your Kreon Card generates instantly during onboarding. Download it, post it to Twitter, or share it on your profiles. It's the mark of a certified digital curator.
        </p>
      </motion.div>
    </div>
  );
};

// S2: Customization & Brand DNA
const S2 = () => {
  const [show, setShow] = useState(false);
  const [radius, setRadius] = useState(16);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    
    // Animate customizer mockup
    const interval = setInterval(() => {
      setRadius(prev => (prev === 16 ? 4 : prev === 4 ? 32 : 16));
    }, 1800);

    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row-reverse items-center justify-center gap-12 px-10" style={{ background: NAVY }}>
      <Glow x="70%" y="45%" size="70%" op={0.06} color="59,130,246" />
      
      {/* Mockup Customization Controls visual */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, x: 20 }}
        animate={show ? { scale: 1, opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1 }}
        className="w-80 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-5"
      >
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-400" />
          <span style={{ fontFamily: SAT, fontSize: '0.62rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }} className="uppercase font-black">
            Brand DNA Customizer
          </span>
        </div>

        {/* Dynamic styling panel */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-black uppercase text-white/40">
              <span>Primary Hue</span>
              <span className="text-blue-400 font-mono">#0020C2</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-blue-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-black uppercase text-white/40">
              <span>Border Radius</span>
              <span className="text-blue-400 font-mono">{radius}px</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(radius/32)*100}%` }} />
            </div>
          </div>
        </div>

        {/* Live applied preview */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl transition-all duration-700 space-y-3" style={{ borderRadius: `${radius}px` }}>
          <span style={{ fontFamily: SAT, fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }} className="uppercase font-black block">Live Studio Output</span>
          <div className="flex gap-2">
            <div className="px-3.5 py-1.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-wider transition-all duration-700" style={{ borderRadius: `${radius/2}px` }}>
              Submit
            </div>
            <div className="px-3.5 py-1.5 border border-white/10 text-white text-[8px] font-black uppercase tracking-wider transition-all duration-700" style={{ borderRadius: `${radius/2}px` }}>
              Cancel
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text description */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-md space-y-6 text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[9px] font-black uppercase tracking-wider">
          <Layers className="w-3 h-3" /> Brand Synchronization
        </div>
        <h3 style={{ fontFamily: IS, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.1 }}>
          Infinite control.<br />
          Perfect customized outputs.
        </h3>
        <p style={{ fontFamily: SAT, fontSize: '0.85rem', color: 'rgba(232,234,240,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
          Set your brand colors, custom font, and border radius in seconds. KREO automatically enforces these styles across all generated mockups, dashboards, and pitch decks. Your style, always uniform.
        </p>
      </motion.div>
    </div>
  );
};

// S3: Viral synergy & Referral Perks
const S3 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-10 text-center" style={{ background: NAVY }}>
      <Glow x="50%" y="60%" size="75%" op={0.06} color="147,51,234" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl space-y-6"
      >
        <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.45em', color: GOLD }} className="uppercase font-bold">
          The Curator Network
        </span>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.1 }}>
          Share the card.<br />
          Earn <span style={{ color: GOLD }}>advanced perks.</span>
        </h2>
        <p style={{ fontFamily: SAT, fontSize: '0.88rem', color: 'rgba(232,234,240,0.4)', maxW: '480px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
          Spread the invite link. As creators sign up under your portal code, unlock **Double Code Limits**, **Unlimited AI Generation Steps**, and **Custom Palettes** instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {['Bronze Status', 'Silver Status', 'Gold Visionary', 'Elite Sovereign'].map((badge, idx) => (
            <span key={badge} className="px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-white/50 text-[9px] font-black uppercase tracking-wider font-mono">
              Level {idx + 1}: {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// S4: Cinematic CTA
const S4 = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-10" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="80%" op={0.07} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 max-w-xl"
      >
        <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.45em', color: GOLD }} className="uppercase font-bold">
          KREO ARCHITECTURAL STUDIO
        </span>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Stop waiting.<br />
          <span style={{ color: GOLD }}>Manifest your DNA.</span>
        </h2>
        
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => navigate('/login')}
            className="group px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center gap-3"
          >
            Enter Studio <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p style={{ fontFamily: SAT, fontSize: '0.72rem', letterSpacing: '0.4em', color: `rgba(232,234,240,0.25)` }} className="uppercase">
          kreoai.vercel.app
        </p>
      </motion.div>
    </div>
  );
};

const SCENES = [S0, S1, S2, S3, S4];

export default function CleanPromo6() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    const dur = DUR[scene];
    let elapsed = 0;
    ref.current = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / dur) * 100);
      if (elapsed >= dur) {
        clearInterval(ref.current);
        setScene(p => (p + 1) % TOTAL);
        setProgress(0);
      }
    }, 50);
    return () => clearInterval(ref.current);
  }, [scene]);

  const Scene = SCENES[scene];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" style={{ background: NAVY }}>
      <Grain />
      <Wordmark />

      {/* scene indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9000] flex gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setScene(i); setProgress(0); clearInterval(ref.current); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === scene ? 24 : 6,
              height: 6,
              background: i === scene ? GOLD : 'rgba(232,234,240,0.15)',
            }}
          />
        ))}
      </div>

      {/* Progress indicator bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-[9000]" style={{ background: 'rgba(232,234,240,0.06)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.4))`, transition: 'width 0.05s linear' }} />
      </div>

      {/* scene counter */}
      <div className="fixed top-7 right-8 z-[9000]">
        <span style={{ fontFamily: SAT, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(232,234,240,0.2)` }} className="uppercase">
          {scene + 1} / {TOTAL}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
