import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

const DUR = [4500, 5500, 4000];
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
        <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }} className="uppercase">The Reality</p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Claude is brilliant.<br /><span style={{ color: 'rgba(232,234,240,0.3)' }}>For general AI.</span>
        </h2>
        <p style={{ fontFamily: SAT, fontSize: '1rem', color: `rgba(232,234,240,0.4)` }}>But it has zero features built for visual creators.</p>
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="w-full max-w-4xl grid grid-cols-2 gap-8">
        <div className="rounded-3xl p-10" style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid rgba(201,168,76,0.2)` }}>
          <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.3em', color: GOLD }} className="uppercase mb-4">KREO Pro</p>
          <h3 style={{ fontFamily: IS, fontSize: '5rem', fontStyle: 'italic', color: CLOUD }}>$1<span style={{ fontSize: '2rem', color: 'rgba(232,234,240,0.3)' }}>/mo</span></h3>
          <ul className="mt-6 space-y-3" style={{ fontFamily: SAT, fontSize: '0.9rem', color: CLOUD }}>
            <li className="flex gap-3"><span style={{ color: GOLD }}>✓</span> Unlimited generations</li>
            <li className="flex gap-3"><span style={{ color: GOLD }}>✓</span> Persistent Brand Kit</li>
            <li className="flex gap-3"><span style={{ color: GOLD }}>✓</span> Live Element Editing</li>
            <li className="flex gap-3"><span style={{ color: GOLD }}>✓</span> Canva & PPTX Export</li>
          </ul>
        </div>
        <div className="rounded-3xl p-10" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.05)` }}>
          <p style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(232,234,240,0.3)' }} className="uppercase mb-4">Claude Pro</p>
          <h3 style={{ fontFamily: IS, fontSize: '5rem', fontStyle: 'italic', color: 'rgba(232,234,240,0.3)' }}>$20<span style={{ fontSize: '2rem', color: 'rgba(232,234,240,0.2)' }}>/mo</span></h3>
          <ul className="mt-6 space-y-3" style={{ fontFamily: SAT, fontSize: '0.9rem', color: 'rgba(232,234,240,0.4)' }}>
            <li className="flex gap-3"><span style={{ color: 'rgba(232,234,240,0.2)' }}>✗</span> General AI only</li>
            <li className="flex gap-3"><span style={{ color: 'rgba(232,234,240,0.2)' }}>✗</span> No Brand Kit</li>
            <li className="flex gap-3"><span style={{ color: 'rgba(232,234,240,0.2)' }}>✗</span> No visual persistence</li>
            <li className="flex gap-3"><span style={{ color: 'rgba(232,234,240,0.2)' }}>✗</span> No export tools</li>
          </ul>
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
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05, fontStyle: 'italic', color: CLOUD }}>
          Stop explaining.<br /><span style={{ color: GOLD }}>Start building.</span>
        </h2>
        <p style={{ fontFamily: SAT, fontSize: '1rem', color: `rgba(232,234,240,0.4)` }}>Join KREO for $1/month.</p>
      </motion.div>
    </div>
  );
};

const SCENES = [S0, S1, S2];

export default function CleanPromo4() {
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
