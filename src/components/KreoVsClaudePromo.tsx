import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap, Check, X, ArrowRight, Sparkles, Users, Target, Globe, Palette,
  MousePointer2, SlidersHorizontal, Download, BadgeDollarSign, ChevronRight
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Identity & Community",
    kreo: "KREONs, the card system, discipline-based onboarding. You're part of a community.",
    claude: "No concept of users, identity, or community. Just prompts and responses.",
    winner: "kreo"
  },
  {
    icon: Target,
    title: "Purpose Built",
    kreo: "Every single feature is optimised for one goal: visual output. Zero fluff.",
    claude: "A general AI. It does everything, which means it's excellent at nothing specific.",
    winner: "kreo"
  },
  {
    icon: Globe,
    title: "Style Mimic",
    kreo: "Paste stripe.com. Get that exact aesthetic — colors, spacing, components. Instant.",
    claude: "Cannot read live websites. Cannot extract or replicate visual styles.",
    winner: "kreo"
  },
  {
    icon: Palette,
    title: "Brand Kit",
    kreo: "Your design system persists across every artifact. Colors, fonts, radius — always consistent.",
    claude: "Forgets everything between sessions. Your brand has to be re-explained every time.",
    winner: "kreo"
  },
  {
    icon: MousePointer2,
    title: "Live Edit",
    kreo: "Click any element in the artifact. Re-prompt just that piece. Hot-swap in milliseconds.",
    claude: "Regenerates the entire codebase from scratch. Every. Single. Time.",
    winner: "kreo"
  },
  {
    icon: SlidersHorizontal,
    title: "Knobs",
    kreo: "Real-time sliders for color, radius, font size — all instant, zero credits spent.",
    claude: "Has no concept of real-time visual controls. It's a text box.",
    winner: "kreo"
  },
  {
    icon: Download,
    title: "Ecosystem Export",
    kreo: "ZIP package, PPTX slides, Canva push, HTML — production-ready in one click.",
    claude: "Gives you code. You figure out the rest.",
    winner: "kreo"
  },
  {
    icon: BadgeDollarSign,
    title: "Price",
    kreo: "$1 / month. No API fees, no credit burns, no paywalls behind features.",
    claude: "$20 / month for Claude Pro. And you still don't get visual tools.",
    winner: "kreo"
  }
];

const KREON_THEMES = ['tech', 'design', 'product', 'art', 'music'];
const THEME_COLORS: Record<string, string> = {
  tech: '#3b82f6', design: '#c084fc', product: '#f97316', art: '#ec4899', music: '#8b5cf6'
};

function MiniKreonCard({ interest = 'tech', name = 'RESIDENT', num = '0042' }: { interest?: string; name?: string; num?: string }) {
  const color = THEME_COLORS[interest] || '#3b82f6';
  return (
    <div style={{ width: 160, height: 220, borderRadius: 20, background: color, position: 'relative', overflow: 'hidden', boxShadow: `0 20px 50px ${color}50`, flexShrink: 0 }}>
      <div style={{ padding: '14px 14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ padding: '3px 8px', background: 'rgba(0,0,0,0.15)', borderRadius: 20, color: 'white', fontSize: 7, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{interest}</div>
        <div style={{ fontSize: 11, fontWeight: 900, color: 'white', opacity: 0.8 }}>#{num}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 14px 14px' }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>KREO</div>
        <div style={{ fontSize: 7, fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: 3 }}>Resident Architect</div>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'white', textTransform: 'uppercase', marginTop: 2 }}>{name}</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, pointerEvents: 'none' }} />
    </div>
  );
}

export default function KreoVsClaudePromo() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCardIndex(i => (i + 1) % KREON_THEMES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-2xl border-b border-black/[0.04]">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center"><Zap size={13} className="text-white" /></div>
          <span className="font-black text-sm tracking-tighter">KREO</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-5 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#1B3FBF] transition-colors">
          Try Free <ArrowRight size={11} />
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-10 bg-black/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Honestly? Let's be real.</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            KREO vs.<br />
            <span className="text-[#1B3FBF]">Claude.</span>
          </h1>
          <p className="text-xl text-black/40 font-light max-w-2xl leading-relaxed mb-10">
            Claude is one of the most impressive AI systems ever built. It also has absolutely zero features built for visual creators. Here's where KREO wins — clearly, honestly.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="group flex items-center gap-3 px-8 py-4 bg-[#1B3FBF] text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20">
              Start Free — $1/mo <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[10px] text-black/30 font-medium">vs. Claude Pro at <span className="line-through">$20</span>/mo</div>
          </div>
        </motion.div>
      </section>

      {/* KREON CARD STRIP */}
      <section className="py-12 px-6 overflow-hidden bg-[#f8f9ff] border-y border-black/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-6 bg-[#1B3FBF]/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/50">KREON Identity System — Community of Makers</span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            {[
              { interest: 'tech', name: 'DHRUV G.', num: '0012' },
              { interest: 'design', name: 'ANYA M.', num: '0047' },
              { interest: 'product', name: 'RAJAN K.', num: '0091' },
              { interest: 'art', name: 'PRIYA S.', num: '0133' },
              { interest: 'music', name: 'ARJUN R.', num: '0197' },
              { interest: 'tech', name: 'MEERA V.', num: '0228' },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <MiniKreonCard {...c} />
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-[160px] h-[220px] rounded-[20px] border-2 border-dashed border-[#1B3FBF]/20 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center"><Sparkles size={14} className="text-[#1B3FBF]" /></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#1B3FBF]/40 text-center">Your Card<br />Here</span>
            </div>
          </div>
          <p className="text-[9px] text-black/30 font-medium mt-4 uppercase tracking-widest">Claude has no identity system. You're just another session.</p>
        </div>
      </section>

      {/* FEATURE BATTLE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-black/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Feature by Feature</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16">Where we win.</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveFeature(activeFeature === i ? -1 : i)}
              className={`rounded-3xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                activeFeature === i ? 'border-[#1B3FBF] bg-[#1B3FBF]' : 'border-black/5 bg-[#f9faff] hover:border-[#1B3FBF]/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  activeFeature === i ? 'bg-white/20' : 'bg-[#1B3FBF]/10'
                }`}>
                  <f.icon size={16} className={activeFeature === i ? 'text-white' : 'text-[#1B3FBF]'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-[13px] font-black uppercase tracking-widest ${activeFeature === i ? 'text-white' : 'text-black'}`}>{f.title}</h3>
                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${activeFeature === i ? 'bg-white text-[#1B3FBF]' : 'bg-[#1B3FBF]/10 text-[#1B3FBF]'}`}>
                      KREO Wins
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeFeature === i ? (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={10} className="text-white" /></div>
                          <p className="text-white/80 text-[12px] font-light leading-relaxed">{f.kreo}</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"><X size={10} className="text-white/50" /></div>
                          <p className="text-white/40 text-[12px] font-light leading-relaxed">{f.claude}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-black/40 text-[12px] font-light leading-relaxed line-clamp-2">{f.kreo}</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICE COMPARISON */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Pricing Reality Check</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16">$1 vs. $20.</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* KREO */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-[#1B3FBF]/30 bg-[#1B3FBF]/10 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#1B3FBF] rounded-full text-[9px] font-black uppercase tracking-widest">Recommended</div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-[#1B3FBF] rounded-full flex items-center justify-center"><Zap size={12} className="text-white" /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">KREO Pro</span>
                </div>
                <div className="text-6xl font-black tracking-tighter">$1<span className="text-2xl text-white/40 font-light">/mo</span></div>
              </div>
              <div className="space-y-3">
                {['Unlimited artifact generation', 'Brand Kit (persists forever)', 'Live Edit & Neural Commands', 'Style Mimic any website', 'ZIP, PPTX, Canva export', 'KREON Identity Card', 'Community access'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1B3FBF] flex items-center justify-center flex-shrink-0"><Check size={9} className="text-white" /></div>
                    <span className="text-[12px] text-white/70 font-light">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Claude */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/5 bg-white/[0.03] p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"><span className="text-white/40 text-[10px] font-black">AI</span></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Claude Pro</span>
                </div>
                <div className="text-6xl font-black tracking-tighter text-white/30">$20<span className="text-2xl font-light">/mo</span></div>
              </div>
              <div className="space-y-3">
                {[
                  ['General AI assistant', true],
                  ['No visual artifact generation', false],
                  ['No Brand Kit or persistence', false],
                  ['No style mimic capability', false],
                  ['No live visual editing', false],
                  ['No one-click export suite', false],
                  ['No community or identity', false],
                ].map(([f, included]) => (
                  <div key={String(f)} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${included ? 'bg-white/10' : 'bg-white/5'}`}>
                      {included ? <Check size={9} className="text-white/40" /> : <X size={9} className="text-white/20" />}
                    </div>
                    <span className={`text-[12px] font-light ${included ? 'text-white/40' : 'text-white/20 line-through'}`}>{String(f)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3FBF]/10 text-[#1B3FBF] text-[9px] font-black uppercase tracking-widest mb-8">
              <Sparkles size={11} /> Built for visual creators
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Stop explaining.<br />
              <span className="text-[#1B3FBF]">Start building.</span>
            </h2>
            <p className="text-lg text-black/40 font-light mb-10 max-w-xl mx-auto leading-relaxed">
              You shouldn't have to explain your brand every session, regenerate the whole page for one change, or pay $20/month for a text box.
            </p>
            <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-3 px-10 py-5 bg-[#1B3FBF] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#1B3FBF]/30">
              Join KREO for $1/month <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-black/20 mt-6 font-medium">No credit card required to start. First artifact is free.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
