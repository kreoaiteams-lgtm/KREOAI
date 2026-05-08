import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

const DUR = [4500, 5000, 5000, 5000];
const TOTAL = DUR.length;

const Glow = ({ x = '50%', y = '50%', size = '65%', op = 0.07 }) => (
  <div
    className="pointer-events-none fixed inset-0"
    style={{
      background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(201,168,76,${op}) 0%, transparent 70%)`,
    }}
  />
);

const Grain = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`,
      opacity: 0.5,
    }}
  />
);

const Wordmark = () => (
  <div className="fixed top-7 left-8 z-[9000]" style={{ fontFamily: NIM, fontSize: '0.85rem', color: `rgba(232,234,240,0.22)`, letterSpacing: '0.12em' }}>
    KREO
  </div>
);

const S0 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="70%" op={0.08} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="space-y-6">
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">Aesthetics First</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Three trajectories.<br /><span style={{ color: GOLD }}>One studio.</span>
        </h2>
      </motion.div>
    </div>
  );
};

const S1 = () => {
  const [cardsIn, setCardsIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setCardsIn(true), 400); return () => clearTimeout(t); }, []);
  const modes = [
    { title: 'Ultra', desc: 'Deep cobalt. Neural glow.', badge: '★ Signature', bg: 'linear-gradient(145deg, #0e1838 0%, #060b18 100%)', border: 'rgba(201,168,76,0.15)', dot: GOLD },
    { title: 'Dark', desc: 'Obsidian architecture.', badge: '', bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)', dot: 'rgba(232,234,240,0.35)' },
    { title: 'Light', desc: 'Porcelain canvas.', badge: '', bg: 'rgba(248,248,252,0.05)', border: 'rgba(248,248,252,0.1)', dot: 'rgba(232,234,240,0.6)' },
  ];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="60%" size="80%" op={0.06} />
      <div className="flex gap-6 max-w-4xl w-full justify-center">
        {modes.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }} animate={cardsIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}
            className="flex-1 rounded-2xl p-6 relative overflow-hidden"
            style={{ background: m.bg, border: `1px solid ${m.border}` }}
          >
            {m.badge && <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />}
            <div className="w-2 h-2 rounded-full mb-8" style={{ background: m.dot, boxShadow: m.badge ? `0 0 10px ${GOLD}` : 'none' }} />
            <p style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(232,234,240,0.3)' }} className="uppercase mb-2">Mode</p>
            <h3 style={{ fontFamily: IS, fontSize: '2.5rem', fontStyle: 'italic', color: m.badge ? GOLD : CLOUD }}>{m.title}</h3>
            <p style={{ fontFamily: SAT, fontSize: '0.8rem', color: 'rgba(232,234,240,0.4)', marginTop: '1rem' }}>{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const S2 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="70%" op={0.08} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="space-y-8 max-w-2xl">
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">Style Mimic</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Paste a URL.<br /><span style={{ color: GOLD }}>Get that aesthetic.</span>
        </h2>
        <div className="mx-auto w-full max-w-md p-4 rounded-xl flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontFamily: SAT, fontSize: '0.9rem', color: 'rgba(232,234,240,0.6)' }}>https://stripe.com</span>
          <span style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.2em', color: GOLD, background: 'rgba(201,168,76,0.1)', padding: '4px 12px', borderRadius: '99px' }} className="uppercase">✓ Extracted</span>
        </div>
      </motion.div>
    </div>
  );
};

const S3 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="70%" op={0.08} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="space-y-6">
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(4rem, 9vw, 6.5rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Brand Kit.<br /><span style={{ color: GOLD }}>Always Active.</span>
        </h2>
        <p style={{ fontFamily: SAT, fontSize: '0.9rem', color: `rgba(232,234,240,0.4)` }}>Every generation instantly adopts your brand DNA.</p>
        <div className="flex justify-center gap-4 mt-8">
          {['#C9A84C', '#060B18', '#E8EAF0'].map((c, i) => (
            <div key={i} className="w-12 h-12 rounded-lg" style={{ background: c, border: '1px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SCENES = [S0, S1, S2, S3];

export default function CleanPromo2() {
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9000] flex gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => { setScene(i); setProgress(0); clearInterval(ref.current); }} className="rounded-full transition-all duration-300" style={{ width: i === scene ? 24 : 6, height: 6, background: i === scene ? GOLD : 'rgba(232,234,240,0.15)' }} />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-[9000]" style={{ background: 'rgba(232,234,240,0.06)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.4))`, transition: 'width 0.05s linear' }} />
      </div>
      <div className="fixed top-7 right-8 z-[9000]">
        <span style={{ fontFamily: SAT, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(232,234,240,0.18)` }} className="uppercase">{scene + 1} / {TOTAL}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }} className="w-full h-full">
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
