import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// ── TYPES ──────────────────────────────────────────────────────────────────────
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

// ── DATA ───────────────────────────────────────────────────────────────────────
const HEADLINE_WORDS = [
  { text: 'No',       gold: false },
  { text: 'matter',   gold: false },
  { text: 'what,',    gold: true  },
  { text: 'KREO',     gold: false },
  { text: 'is',       gold: false },
  { text: 'the',      gold: false },
  { text: 'solution.', gold: true },
];

const WORD_DELAYS = [0, 0.15, 0.35, 0.75, 0.95, 1.1, 1.25];

const FEATURES: FeatureCard[] = [
  { icon: '✦', title: 'Manifest',    description: 'Turn a prompt into a fully working product — apps, websites, dashboards, anything.' },
  { icon: '◎', title: 'Web Capture', description: 'Paste any URL and KREO instantly mirrors its design aesthetic into your new creation.' },
  { icon: '◈', title: 'Live Edit',   description: 'Point, click, refine. Edit any element of your design without touching a line of code.' },
  { icon: '⬡', title: 'Export',      description: 'Ship as HTML, ZIP bundles, PPTX decks, or straight to Canva.' },
  { icon: '◉', title: 'Brand Kit',   description: 'Lock in your visual identity once. Every creation reflects your brand automatically.' },
  { icon: '∿', title: 'Slideshows',  description: 'Generate cinematic, editorial-grade presentation decks from a single sentence.' },
];

// ── NOISE TEXTURE (inline SVG data URL to avoid external deps) ─────────────────
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

// ── FEATURE CARD COMPONENT ─────────────────────────────────────────────────────
const FCard: React.FC<{ card: FeatureCard; delay: number }> = ({ card, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.04)' }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '2rem',
        padding: '2.5rem 2rem',
        textAlign: 'left',
        cursor: 'default',
        transition: 'background 0.3s, borderColor 0.3s',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{card.icon}</div>
      <h3 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: '1.9rem',
        color: '#c9a84c',
        fontStyle: 'italic',
        fontWeight: 400,
        marginBottom: '0.75rem',
      }}>
        {card.title}
      </h3>
      <p style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: '1.05rem',
        color: '#e8eaf0',
        opacity: 0.5,
        lineHeight: 1.65,
      }}>
        {card.description}
      </p>
    </motion.div>
  );
};

// ── SECTION 2 HEADER REVEAL ────────────────────────────────────────────────────
const RevealText: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
const Promo8: React.FC = () => {
  return (
    <div
      style={{
        background: '#0a0f1e',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'Instrument Serif', Georgia, serif",
      }}
    >
      {/* Global noise overlay */}
      <div
        style={{
          position: 'fixed', inset: 0,
          backgroundImage: NOISE_BG,
          opacity: 0.4, pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {/* Corner wordmark */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'fixed', top: '2.5rem', left: '3rem',
          fontSize: '0.7rem', letterSpacing: '0.5em',
          textTransform: 'uppercase', color: 'rgba(232,234,240,0.25)',
          zIndex: 50,
        }}
      >
        KREO
      </motion.p>

      {/* ── SCREEN 1: THE SOLUTION ── */}
      <section
        style={{
          width: '100vw', minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center', padding: '2rem',
        }}
      >
        {/* Ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '70vw', height: '70vw',
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />

        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            color: '#c9a84c', marginBottom: '2.5rem',
          }}
        >
          Neural Design Intelligence
        </motion.p>

        {/* Headline — word by word */}
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
            fontWeight: 400, lineHeight: 1.0,
            letterSpacing: '-0.04em', maxWidth: '1100px',
            position: 'relative', zIndex: 2,
          }}
        >
          {HEADLINE_WORDS.map((w, i) => (
            <React.Fragment key={i}>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: WORD_DELAYS[i] + 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  color: w.gold ? '#c9a84c' : '#e8eaf0',
                  fontStyle: w.gold ? 'italic' : 'normal',
                }}
              >
                {w.text}
              </motion.span>
              {/* line break after "what," */}
              {i === 2 ? <br /> : i < HEADLINE_WORDS.length - 1 ? '\u00A0' : null}
            </React.Fragment>
          ))}
        </h1>

        {/* Thin gold rule */}
        <motion.div
          initial={{ width: 0, opacity: 0.3 }}
          animate={{ width: 120, opacity: 0.3 }}
          transition={{ duration: 2, delay: 3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: '10vh',
            height: '1px', background: '#c9a84c',
          }}
        />
      </section>

      {/* ── SCREEN 2: WHAT YOU CAN DO ── */}
      <section
        style={{
          width: '100vw', minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '8rem 3rem', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Blue ambient glow */}
        <div
          style={{
            position: 'absolute', top: '20%', left: '50%',
            transform: 'translateX(-50%)',
            width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(27,63,191,0.1) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />

        {/* Section kicker */}
        <RevealText
          delay={0}
          style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            color: '#c9a84c', opacity: 0.7, marginBottom: '2rem',
          }}
        >
          What you can do with KREO
        </RevealText>

        {/* Section headline */}
        <RevealText delay={0.15} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 400, lineHeight: 1.05,
              letterSpacing: '-0.03em', maxWidth: '820px',
              color: '#e8eaf0',
            }}
          >
            From a single thought<br />
            to a{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>
              complete digital reality
            </em>
            .
          </h2>
        </RevealText>

        {/* Feature cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            width: '100%', maxWidth: '1100px',
          }}
        >
          {FEATURES.map((card, i) => (
            <FCard key={card.title} card={card} delay={i * 0.12} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Promo8;
