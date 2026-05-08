import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

const DUR = [4000, 4500, 5000];
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
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">Visual Fidelity</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Zero external bloat.<br /><span style={{ color: GOLD }}>100% Native.</span>
        </h2>
      </motion.div>
    </div>
  );
};

const S1 = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="80%" op={0.06} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="max-w-3xl w-full text-center space-y-12">
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, fontStyle: 'italic', color: CLOUD }}>
          Every component KREO builds is a clean, production-ready React artifact.
        </h2>
        <div className="flex justify-center gap-12">
          {[
            { label: 'Lines of CSS', val: '0' },
            { label: 'Dependencies', val: '0' },
            { label: 'Quality', val: '100%' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p style={{ fontFamily: IS, fontSize: '3.5rem', color: GOLD, fontStyle: 'italic', lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(232,234,240,0.4)', marginTop: '0.5rem' }} className="uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
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
        <p style={{ fontFamily: NIM, fontSize: '5rem', color: CLOUD, letterSpacing: '-0.01em', lineHeight: 0.9 }}>
          KRE<span style={{ color: GOLD }}>O</span>
        </p>
        <p style={{ fontFamily: SAT, fontSize: '0.75rem', letterSpacing: '0.4em', color: `rgba(232,234,240,0.4)` }} className="uppercase">
          The ultimate creation engine.
        </p>
        <div style={{ width: 60, height: 1, background: `rgba(201,168,76,0.4)`, margin: '2rem auto' }} />
      </motion.div>
    </div>
  );
};

const SCENES = [S0, S1, S2];

export default function CleanPromo5() {
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
