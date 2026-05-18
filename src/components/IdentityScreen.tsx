import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, BrainCircuit, ChevronRight, Check, Sparkles,
  Palette, Cpu, Building2, Briefcase, Paintbrush, Trophy, Music, Newspaper,
  Smile, Zap, Link as LinkIcon
} from 'lucide-react';
import KreonCard, { KreonCardVisual } from './KreonCard';
import { generateBio } from '@/lib/ai';

interface IdentityScreenProps {
  userEmail: string;
  userName?: string;
  onClose: () => void;
  onBioGenerated: (bio: string, interest: string) => void;
  initialBio?: string;
  initialInterest?: string;
  initialCardNumber?: string;
  initialPhase?: 'pref' | 'brand' | 'interview' | 'reveal';
  onPhaseChange?: (phase: 'pref' | 'brand' | 'interview' | 'reveal') => void;
}

type KreonInterest = 'design' | 'tech' | 'architecture' | 'product' | 'art' | 'sports' | 'music' | 'news';

const INTERESTS_META = [
  { id: 'tech', icon: Cpu, label: 'Engineering' },
  { id: 'design', icon: Palette, label: 'Design' },
  { id: 'architecture', icon: Building2, label: 'Architecture' },
  { id: 'product', icon: Briefcase, label: 'Product' },
  { id: 'art', icon: Paintbrush, label: 'Art & Culture' },
  { id: 'sports', icon: Trophy, label: 'Sports' },
  { id: 'music', icon: Music, label: 'Music' },
  { id: 'news', icon: Newspaper, label: 'Insight' },
];

const QUESTIONS = [
  "What's the one project or idea that defines your work right now?",
  "Describe your aesthetic in three words or less.",
  "What would you build if KREO had no limits?",
];

const IdentityScreen: React.FC<IdentityScreenProps> = ({ 
  userEmail, 
  userName, 
  onClose, 
  onBioGenerated, 
  initialBio,
  initialInterest = 'tech',
  initialCardNumber = '0000',
  initialPhase,
  onPhaseChange
}) => {
  // Language hook reserved for future i18n of onboarding strings
  // const { t } = useLang();
  const [phase, setPhase] = useState<'pref' | 'brand' | 'interview' | 'reveal'>(
    initialPhase || (initialBio ? 'reveal' : 'pref')
  );
  const [interest, setInterest] = useState<KreonInterest>(initialInterest as KreonInterest);
  const [interviewPhase, setInterviewPhase] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [residentBio, setResidentBio] = useState(initialBio || '');
  const [cardNumber, setCardNumber] = useState(initialCardNumber);

  // Brand Kit State
  const [brandPrimary, setBrandPrimary] = useState('#1B3FBF');
  const [brandSecondary, setBrandSecondary] = useState('#0020C2');
  const [brandFont, setBrandFont] = useState('Inter');
  const [brandRadius, setBrandRadius] = useState('12px');
  const [brandLogoUrl, setBrandLogoUrl] = useState('');

  useEffect(() => {
    if (onPhaseChange) onPhaseChange(phase as any);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (initialCardNumber && initialCardNumber !== '0000') {
      setCardNumber(initialCardNumber);
    }
  }, [initialCardNumber]);

  const saveBrandKit = () => {
    const kit = {
      primaryColor: brandPrimary,
      secondaryColor: brandSecondary,
      fontFamily: brandFont,
      borderRadius: brandRadius,
      logoUrl: brandLogoUrl,
    };
    localStorage.setItem('kreo_brand_kit', JSON.stringify(kit));
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const newAnswers = [...answers, query];
    setAnswers(newAnswers);
    setQuery('');
    if (interviewPhase < 2) {
      setInterviewPhase(interviewPhase + 1);
    } else {
      setIsGenerating(true);
      const bio = await generateBio(newAnswers);
      setResidentBio(bio);
      onBioGenerated(bio, interest);
      setIsGenerating(false);
      setPhase('reveal');
    }
  };

  const stepIndicator = (current: number) => {
    const steps = ['Discipline', 'Brand DNA', 'Identity Interview', 'Your KREON'];
    const phaseOrder: Record<string, number> = { pref: 0, brand: 1, interview: 2, reveal: 3 };
    const activeStep = phaseOrder[phase] ?? 0;
    return (
      <div className="flex items-center gap-3 mb-12">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black border transition-all ${
                i < activeStep ? 'bg-[#1B3FBF] border-[#1B3FBF] text-white' :
                i === activeStep ? 'bg-white border-[#1B3FBF] text-[#1B3FBF]' :
                'bg-transparent border-black/10 text-black/20'
              }`}>
                {i < activeStep ? <Check size={10} /> : i + 1}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest hidden md:block ${
                i === activeStep ? 'text-[#1B3FBF]' : i < activeStep ? 'text-black/40' : 'text-black/15'
              }`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-[1px] ${i < activeStep ? 'bg-[#1B3FBF]/40' : 'bg-black/5'}`} />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-[#F9FAFF] overflow-y-auto flex flex-col">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1B3FBF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[4000] flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-2xl border-b border-black/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1B3FBF] rounded-full flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">KREON Identity Registry</span>
        </div>
        <button onClick={onClose} className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-all">
          <X size={13} className="text-black/30 group-hover:text-black" />
          <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:text-black">Exit</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col pt-20 relative z-10">
        <AnimatePresence mode="wait">

          {/* ── PHASE 1: DISCIPLINE ── */}
          {phase === 'pref' && (
            <motion.div key="pref" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className="flex-1 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 flex flex-col px-10 md:px-20 py-12">
                {stepIndicator(0)}
                <div className="space-y-4 mb-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/60">Step 01</span>
                  <h1 className="text-4xl md:text-5xl font-serif italic text-black tracking-tight leading-tight">
                    What's your primary<br /><span className="text-[#1B3FBF]">discipline?</span>
                  </h1>
                  <p className="text-sm text-black/40 font-light">This shapes your KREON card and how artifacts are generated for you.</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-w-lg mb-10">
                  {INTERESTS_META.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => setInterest(item.id as KreonInterest)}
                      className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 group ${
                        interest === item.id 
                          ? 'bg-[#1B3FBF] border-[#1B3FBF] text-white shadow-xl shadow-[#1B3FBF]/25' 
                          : 'bg-white border-black/5 text-black hover:border-[#1B3FBF]/30 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        interest === item.id ? 'bg-white/20' : 'bg-[#1B3FBF]/5 group-hover:bg-[#1B3FBF]/10'
                      }`}>
                        <item.icon size={14} className={interest === item.id ? 'text-white' : 'text-[#1B3FBF]'} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider flex-1 text-left">{item.label}</span>
                      {interest === item.id && <Check size={11} />}
                    </motion.button>
                  ))}
                </div>
                <button 
                  onClick={() => setPhase('brand')}
                  className="group w-fit px-10 py-4 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center gap-3"
                >
                  Next: Brand DNA <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#f0f4ff] to-[#f8f9ff] items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]"><BrainCircuit size={600} className="absolute -bottom-40 -left-40 text-[#1B3FBF] rotate-12" /></div>
                <motion.div key={interest} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} className="scale-90">
                  <KreonCardVisual cardNumber="----" userName={userName || 'RESIDENT'} userEmail={userEmail} interest={interest} bio="Your identity is being formed..." />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── PHASE 2: BRAND DNA ── */}
          {phase === 'brand' && (
            <motion.div key="brand" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="flex-1 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 flex flex-col px-10 md:px-20 py-12">
                {stepIndicator(1)}
                <div className="space-y-3 mb-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/60">Step 02</span>
                  <h1 className="text-4xl md:text-5xl font-serif italic text-black tracking-tight leading-tight">
                    Set your<br /><span className="text-[#1B3FBF]">Brand DNA.</span>
                  </h1>
                  <p className="text-sm text-black/40 font-light max-w-md">These values will be automatically injected into every artifact you generate. Your brand, always consistent.</p>
                </div>

                <div className="space-y-6 max-w-lg mb-10">
                  {/* Primary Color */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black">Primary Color</label>
                      <span className="text-[10px] font-mono text-[#1B3FBF] bg-[#1B3FBF]/5 px-2 py-0.5 rounded">{brandPrimary}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="color" value={brandPrimary} onChange={e => setBrandPrimary(e.target.value)} className="w-14 h-10 rounded-xl cursor-pointer border-none bg-transparent" />
                      <div className="flex-1 h-10 rounded-xl border-2 border-black/5" style={{ background: `linear-gradient(135deg, ${brandPrimary}, ${brandSecondary})` }} />
                    </div>
                  </div>
                  {/* Secondary Color */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black">Accent Color</label>
                      <span className="text-[10px] font-mono text-[#1B3FBF] bg-[#1B3FBF]/5 px-2 py-0.5 rounded">{brandSecondary}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="color" value={brandSecondary} onChange={e => setBrandSecondary(e.target.value)} className="w-14 h-10 rounded-xl cursor-pointer border-none bg-transparent" />
                      <div className="flex-1 h-10 rounded-xl border-2 border-black/5 flex items-center px-4" style={{ background: `${brandSecondary}15` }}>
                        <div className="w-4 h-4 rounded-full" style={{ background: brandSecondary }} />
                      </div>
                    </div>
                  </div>
                  {/* Font + Radius row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black">Font Family</label>
                      <select value={brandFont} onChange={e => setBrandFont(e.target.value)} className="w-full h-10 rounded-xl border-2 border-black/5 bg-white px-3 text-[11px] font-semibold focus:outline-none focus:border-[#1B3FBF]/40">
                        {['Inter', 'Satoshi', 'Sora', 'DM Sans', 'Outfit', 'Plus Jakarta Sans', 'Space Grotesk', 'Poppins'].map(f => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black">Border Radius</label>
                        <span className="text-[10px] font-mono text-black">{brandRadius}</span>
                      </div>
                      <input type="range" min="0" max="32" value={parseInt(brandRadius)} onChange={e => setBrandRadius(e.target.value + 'px')} className="w-full mt-2 accent-[#1B3FBF]" />
                    </div>
                  </div>
                  {/* Logo URL */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black">Logo URL <span className="normal-case font-medium text-black/40">(optional)</span></label>
                    <div className="relative">
                      <LinkIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" />
                      <input type="url" value={brandLogoUrl} onChange={e => setBrandLogoUrl(e.target.value)} placeholder="https://your-logo-url.com/logo.png" className="w-full h-10 rounded-xl border-2 border-black/5 bg-white pl-9 pr-3 text-[11px] text-slate-800 focus:outline-none focus:border-[#1B3FBF]/40" />
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="p-4 rounded-2xl border-2 border-black/5" style={{ fontFamily: brandFont, borderRadius: brandRadius }}>
                    <div className="text-[9px] font-black uppercase tracking-widest text-black mb-3">Brand DNA Preview</div>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 text-white text-[10px] font-black uppercase tracking-widest rounded-lg" style={{ background: brandPrimary, borderRadius: brandRadius }}>Primary Button</div>
                      <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border-2" style={{ color: brandPrimary, borderColor: brandPrimary, borderRadius: brandRadius }}>Outline</div>
                    </div>
                    <p className="text-xs text-black/40 mt-3 font-light" style={{ fontFamily: brandFont }}>Sample body text in {brandFont}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={() => setPhase('pref')} className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors">
                    ← Back
                  </button>
                  <button 
                    onClick={() => { saveBrandKit(); setPhase('interview'); }}
                    className="group flex-1 max-w-xs px-10 py-4 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center justify-center gap-3"
                  >
                    <Sparkles size={13} /> Save & Continue <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#f0f4ff] to-[#f8f9ff] items-center justify-center relative overflow-hidden p-12">
                <div className="w-full max-w-xs space-y-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/40 text-center">Your Brand Kit · Always Active</div>
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-black/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{ background: brandPrimary }}>K</div>
                      <div>
                        <div className="text-[11px] font-black" style={{ fontFamily: brandFont }}>Brand Kit</div>
                        <div className="text-[9px] text-black/30 font-mono">{brandFont} · {brandRadius} radius</div>
                      </div>
                      <div className="ml-auto w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-6 rounded" style={{ background: brandPrimary }} />
                      <div className="flex-1 h-6 rounded" style={{ background: brandSecondary }} />
                      <div className="flex-1 h-6 rounded bg-black/5" />
                    </div>
                    <div className="text-[9px] text-black/30 font-light leading-relaxed">Applied automatically to every artifact you create — colors, fonts, spacing — all from your Brand DNA.</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Dashboard', 'Landing Page', 'Portfolio', 'Pitch Deck', 'Form', 'Newsletter'].map(c => (
                      <div key={c} className="text-center py-3 rounded-xl text-[8px] font-black uppercase tracking-wide text-white" style={{ background: brandPrimary, opacity: 0.7 + Math.random() * 0.3 }}>{c}</div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-black font-black uppercase tracking-widest">6+ artifact types · Personal style, enforced</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PHASE 3: INTERVIEW ── */}
          {phase === 'interview' && (
            <motion.div key="interview" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="flex-1 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gradient-to-br from-[#f0f4ff] to-[#f8f9ff] flex items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]"><BrainCircuit size={400} className="absolute -bottom-20 -left-20 text-[#1B3FBF]" /></div>
                <motion.div initial={{ rotateY: -20, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
                  <KreonCardVisual cardNumber="----" userName={userName} userEmail={userEmail} interest={interest} bio={answers.join(' ') || 'Forming your identity...'} />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 py-12">
                {stepIndicator(2)}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= interviewPhase ? 'w-10 bg-[#1B3FBF]' : 'w-5 bg-[#1B3FBF]/10'}`} />
                    ))}
                    <span className="text-[9px] font-black uppercase tracking-widest text-black">{interviewPhase + 1} / 3</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/60">Step 03 · Identity Interview</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={interviewPhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h2 className="text-3xl md:text-4xl font-serif italic text-black leading-tight tracking-tight mb-8">
                      {isGenerating ? 'Calibrating your neural identity...' : QUESTIONS[interviewPhase]}
                    </h2>
                  </motion.div>
                </AnimatePresence>

                {isGenerating ? (
                  <div className="flex items-center gap-4 text-[#1B3FBF]">
                    <div className="w-5 h-5 border-2 border-[#1B3FBF]/20 border-t-[#1B3FBF] rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Generating your KREON identity...</span>
                  </div>
                ) : (
                  <form onSubmit={handleAnswerSubmit} className="space-y-6">
                    <input 
                      autoFocus key={interviewPhase}
                      value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Your answer..."
                      className="w-full bg-transparent border-b-2 border-black/8 py-4 text-xl text-slate-800 outline-none focus:border-[#1B3FBF] transition-all placeholder:text-slate-400 font-serif italic"
                    />
                    <button type="submit" className="group px-10 py-4 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center gap-3">
                      {interviewPhase < 2 ? 'Next' : 'Generate Identity'} <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* ── PHASE 4: REVEAL ── */}
          {phase === 'reveal' && (
            <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-10 py-8 relative">
              {/* Atmospheric Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[20%] left-[15%] w-32 h-32 bg-[#1B3FBF]/10 rounded-full blur-3xl" />
                <motion.div animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
              </div>

              <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 pointer-events-none hidden xl:flex justify-between items-center px-24 w-full h-[600px] z-10">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="w-[320px] text-left flex flex-col gap-8 pointer-events-auto">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF] block mb-3">Welcome to</span>
                    <h3 className="text-5xl font-serif italic text-black leading-tight">
                      The <span className="text-[#1B3FBF]">Residency.</span>
                    </h3>
                    <p className="text-sm text-black font-light leading-relaxed mt-5 max-w-[280px]">Your identity is now registry-verified. Built for the future of visual engineering.</p>
                    <div className="mt-8 pt-8 border-t border-black/10 space-y-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Master Registry</span>
                       <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-[#1B3FBF]">
                             <span>Resident Rank</span>
                             <span>Core</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-black">
                             <span>Serial Node</span>
                             <span>#{cardNumber}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
                <div className="w-[320px]" />
              </div>

              <div className="z-20 flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-1">
                    <div className="h-[1px] w-12 bg-[#1B3FBF]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B3FBF]">Identity Confirmed</span>
                  </motion.div>
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring' }}>
                    <KreonCard userEmail={userEmail} userName={userName} interest={interest} bio={residentBio} cardNumber={cardNumber} />
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col items-center gap-6 w-full max-w-[340px]">
                   <div className="h-[1px] w-full bg-black/5" />
                   <button 
                     onClick={onClose} 
                     className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                   >
                     Enter KREO
                   </button>
                   <p className="text-[9px] font-black uppercase tracking-widest text-black/20">Identity Manifestation Complete</p>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default IdentityScreen;
