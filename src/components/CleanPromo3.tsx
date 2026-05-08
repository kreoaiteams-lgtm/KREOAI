import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

const DUR = [4500, 5000, 5000];
const TOTAL = DUR.length;

const Glow = ({ x = '50%', y = '50%', size = '65%', op = 0.07 }) => (
  <div className="pointer-events-none fixed inset-0" style={{ background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(201,168,76,${op}) 0%, transparent 70%)` }} />
);

const Grain = () => (
  <div className="pointer-events-none fixed inset-0 z-[999]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`, opacity: 0.5 }} />
);

const Wordmark = () => (
  <div className="fixed top-7 left-8 z-[9000]" style={{ fontFamily: NIM, fontSize: '0.85rem', color: `rgba(232,234,240,0.22)`, letterSpacing: '0.12em' }}>KREO</div>
);

const S0 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="70%" op={0.08} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="space-y-6">
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">Output Engine</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Anything you describe.<br /><span style={{ color: GOLD }}>KREO manifests.</span>
        </h2>
      </motion.div>
    </div>
  );
};

const S1 = () => {
  const [tilesIn, setTilesIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setTilesIn(true), 400); return () => clearTimeout(t); }, []);
  const items = [
    ['Dashboard', 'Analytics', 'rgba(201,168,76,0.6)'],
    ['Landing Page', 'Marketing', 'rgba(100,150,255,0.6)'],
    ['Portfolio', 'Creative', 'rgba(180,100,220,0.6)'],
    ['Budget Tracker', 'Finance', 'rgba(80,200,130,0.6)'],
    ['VC Pitch', 'Presentation', 'rgba(255,130,70,0.6)'],
    ['Chat UI', 'Product', 'rgba(70,200,240,0.6)'],
  ];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="80%" op={0.06} />
      <div className="grid grid-cols-3 gap-4 max-w-4xl w-full">
        {items.map(([name, tag, col], i) => (
          <motion.div
            key={i} initial={{ opacity: 0, scale: 0.9 }} animate={tilesIn ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${col}, transparent)` }} />
            <p style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(232,234,240,0.3)' }} className="uppercase mb-2">{tag}</p>
            <p style={{ fontFamily: IS, fontSize: '1.5rem', fontStyle: 'italic', color: CLOUD }}>{name}</p>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="space-y-8 max-w-2xl">
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">Universal Export</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          ZIP. PPTX. Canva.<br /><span style={{ color: GOLD }}>One click each.</span>
        </h2>
        <div className="flex justify-center gap-6 mt-8">
          {['.HTML', '.ZIP', '.PPTX', 'CANVA'].map((ext, i) => (
            <div key={i} className="px-6 py-3 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: SAT, fontSize: '0.8rem', color: CLOUD, letterSpacing: '0.1em' }}>
              {ext}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SCENES = [S0, S1, S2];

export default function CleanPromo3() {
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
