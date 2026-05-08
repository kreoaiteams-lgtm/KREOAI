import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NIM = "'TAN-NIMBUS', serif";
const IS  = "'Instrument Serif', Georgia, serif";
const SAT = "'Satoshi', system-ui, sans-serif";

const GOLD  = '#C9A84C';
const CLOUD = '#E8EAF0';
const NAVY  = '#060B18';

/* ── timing per scene (ms) ── */
const DUR = [4500, 4000, 5000, 5500, 6000];
const TOTAL = DUR.length;

/* ── ambient glow ── */
const Glow = ({ x = '50%', y = '50%', size = '65%', op = 0.07 }) => (
  <div
    className="pointer-events-none fixed inset-0"
    style={{
      background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(201,168,76,${op}) 0%, transparent 70%)`,
    }}
  />
);

/* ── grain overlay ── */
const Grain = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`,
      opacity: 0.5,
    }}
  />
);

/* ── corner wordmark ── */
const Wordmark = () => (
  <div className="fixed top-7 left-8 z-[9000]" style={{ fontFamily: NIM, fontSize: '0.85rem', color: `rgba(232,234,240,0.22)`, letterSpacing: '0.12em' }}>
    KREO
  </div>
);

/* ──────────────────────────────── SCENES ─────────────────────────────── */

/* S0 — "We all face situations..." */
const S0 = () => {
  const situations = [
    'A presentation due in 2 hours.',
    'A pitch deck with no designer.',
    'A report that needs to look polished.',
    'A landing page, from scratch.',
    'A budget sheet for tomorrow.',
  ];
  const [shown, setShown] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setShowLabel(true), 300);
    const timers = situations.map((_, i) =>
      setTimeout(() => setShown(i + 1), 700 + i * 580)
    );
    return () => { clearTimeout(t0); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-10" style={{ background: NAVY }}>
      <Glow x="50%" y="60%" size="80%" op={0.055} />
      <div className="w-full max-w-lg space-y-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showLabel ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: SAT, fontSize: '0.65rem', letterSpacing: '0.42em', color: `rgba(232,234,240,0.3)` }}
          className="uppercase"
        >
          We all face situations
        </motion.p>

        <div className="space-y-4">
          {situations.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={shown > i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <div
                className="flex-shrink-0 w-1 h-1 rounded-full"
                style={{ background: shown > i ? GOLD : 'rgba(232,234,240,0.1)', boxShadow: shown > i ? `0 0 6px ${GOLD}` : 'none', transition: 'all 0.4s ease' }}
              />
              <p style={{ fontFamily: IS, fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)', color: shown > i ? CLOUD : 'rgba(232,234,240,0.15)', fontStyle: 'italic', lineHeight: 1.2, transition: 'color 0.5s ease' }}>
                {s}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* S1 — KREO reveal */
const S1 = () => {
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showRule, setShowRule] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setShowSub(true), 1400);
    const t3 = setTimeout(() => setShowRule(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: NAVY }}>
      <Glow x="50%" y="45%" size="70%" op={0.09} />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <p
          style={{
            fontFamily: NIM,
            fontSize: 'clamp(5.5rem, 18vw, 13rem)',
            color: CLOUD,
            letterSpacing: '-0.01em',
            lineHeight: 0.9,
          }}
        >
          KRE<span style={{ color: GOLD }}>O</span>
        </p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showSub ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ fontFamily: SAT, fontSize: '0.72rem', letterSpacing: '0.4em', color: `rgba(232,234,240,0.3)` }}
          className="uppercase"
        >
          The Creation Engine
        </motion.p>

        <motion.div
          style={{ width: showRule ? 100 : 0, height: 1, background: `rgba(201,168,76,0.4)`, margin: '0 auto', transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </motion.div>
    </div>
  );
};

/* S2 — What it is */
const S2 = () => {
  const lines = [
    { word: 'Describe', gold: false },
    { word: 'anything.', gold: false },
    { word: 'Get a professional', gold: false },
    { word: 'result.', gold: true },
  ];
  const [shown, setShown] = useState(0);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => setShown(i + 1), 300 + i * 500);
    });
    const t = setTimeout(() => setShowSub(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-10" style={{ background: NAVY }}>
      <Glow x="40%" y="50%" size="75%" op={0.065} />
      <div className="max-w-2xl space-y-8">
        <h1 style={{ fontFamily: IS, fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', fontStyle: 'italic' }}>
          {lines.map((l, i) => (
            <span key={i}>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={shown > i ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: l.gold ? GOLD : CLOUD, display: 'inline' }}
              >
                {l.word}
              </motion.span>
              {i < lines.length - 1 && (i === 1 ? <br /> : ' ')}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={showSub ? { opacity: 1 } : {}}
          transition={{ duration: 0.9 }}
          style={{ fontFamily: SAT, fontSize: '1rem', color: `rgba(232,234,240,0.35)`, lineHeight: 1.7, fontWeight: 300 }}
        >
          Presentations. Financial reports. Landing pages. Research. <br />
          KREO builds it all — in seconds.
        </motion.p>
      </div>
    </div>
  );
};

/* S3 — prompt demo */
const S3 = () => {
  const [cardIn, setCardIn] = useState(false);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [statIn, setStatIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCardIn(true), 200);
    const t2 = setTimeout(() => setTyping(true), 800);
    const t3 = setTimeout(() => setDone(true), 2800);
    const t4 = setTimeout(() => setStatIn(true), 3400);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-8 px-8" style={{ background: NAVY }}>
      <Glow x="55%" y="45%" size="65%" op={0.07} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={cardIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(232,234,240,0.07)', background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)' }}
      >
        {/* chrome */}
        <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid rgba(232,234,240,0.07)' }}>
          {[0.5, 0.5, 0.5].map((op, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: `rgba(232,234,240,${op * 0.2})` }} />
          ))}
          <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.3em', color: `rgba(232,234,240,0.2)` }} className="ml-2 uppercase">Neural Prompt</span>
        </div>
        {/* body */}
        <div className="px-6 py-5">
          <p
            style={{
              fontFamily: IS,
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: CLOUD,
              lineHeight: 1.5,
              borderRight: typing && !done ? `2px solid ${GOLD}` : '2px solid transparent',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: typing ? '100%' : '0',
              transition: 'width 1.8s steps(48, end)',
            }}
          >
            "Make me a VC pitch deck for my startup"
          </p>
        </div>
        {/* footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: '1px solid rgba(232,234,240,0.06)' }}
        >
          <span style={{ fontFamily: SAT, fontSize: '0.6rem', letterSpacing: '0.3em', color: `rgba(232,234,240,0.2)` }} className="uppercase">Manifest Engine</span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ border: `1px solid rgba(201,168,76,0.25)`, background: 'rgba(201,168,76,0.05)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}`, animation: 'pulse 1.2s infinite' }} />
            <span style={{ fontFamily: SAT, fontSize: '0.58rem', color: GOLD, letterSpacing: '0.2em' }} className="uppercase">Generated · 3.2s</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={statIn ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-8"
      >
        {[['One prompt', ''], ['3.2 seconds', ''], ['Presentation ready', '']].map(([val], i) => (
          <div key={i} className="text-center">
            <p style={{ fontFamily: IS, fontSize: '0.85rem', color: GOLD, fontStyle: 'italic' }}>{val}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* S4 — CTA */
const S4 = () => {
  const [show, setShow] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setShowUrl(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-10" style={{ background: NAVY }}>
      <Glow x="50%" y="50%" size="80%" op={0.08} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 max-w-xl"
      >
        <p style={{ fontFamily: SAT, fontSize: '0.62rem', letterSpacing: '0.45em', color: `rgba(232,234,240,0.25)` }} className="uppercase">
          Built in 2 hours · Priced at $1
        </p>
        <h2 style={{ fontFamily: IS, fontSize: 'clamp(3rem, 8vw, 6rem)', fontStyle: 'italic', color: CLOUD, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Stop waiting.<br /><span style={{ color: GOLD }}>Start creating.</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={showUrl ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: SAT, fontSize: '0.72rem', letterSpacing: '0.4em', color: `rgba(232,234,240,0.25)` }}
          className="uppercase"
        >
          kreoai.vercel.app
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={showUrl ? { width: 80 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ height: 1, background: `rgba(201,168,76,0.35)`, margin: '0 auto' }}
        />
      </motion.div>
    </div>
  );
};

/* ── Main ── */
const SCENES = [S0, S1, S2, S3, S4];

export default function CleanPromo1() {
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

      {/* scene dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9000] flex gap-2">
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

      {/* progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] z-[9000]" style={{ background: 'rgba(232,234,240,0.06)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.4))`, transition: 'width 0.05s linear' }} />
      </div>

      {/* scene counter */}
      <div className="fixed top-7 right-8 z-[9000]">
        <span style={{ fontFamily: SAT, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(232,234,240,0.18)` }} className="uppercase">
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
