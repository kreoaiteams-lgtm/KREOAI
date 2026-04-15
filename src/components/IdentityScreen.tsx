import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, BrainCircuit, User, LayoutGrid, Zap, ShieldCheck, 
  Presentation, Code2, Smile, ChevronRight, Check, Sparkles,
  Palette, Cpu, Building2, Briefcase, Paintbrush, Trophy, Music, Newspaper
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
}

type KreonInterest = 'design' | 'tech' | 'architecture' | 'product' | 'art' | 'sports' | 'music' | 'news';

const INTERESTS: { id: KreonInterest, label: string, icon: any }[] = [
  { id: 'tech', label: 'Engineering', icon: Cpu },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'architecture', label: 'Architecture', icon: Building2 },
  { id: 'product', label: 'Strategy', icon: Briefcase },
  { id: 'art', label: 'Culture', icon: Paintbrush },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'news', label: 'Insights', icon: Newspaper },
];

const QUESTIONS = [
  "What is the primary creative weapon you bring to the KREO registry?",
  "If you could manifest one change in reality instantly, what would it be?",
  "Which environment or atmosphere fuels your neural manifest the most?"
];

const IdentityScreen: React.FC<IdentityScreenProps> = ({ 
  userEmail, 
  userName, 
  onClose, 
  onBioGenerated, 
  initialBio,
  initialInterest = 'tech',
  initialCardNumber = '0000'
}) => {
  const [phase, setPhase] = useState<'pref' | 'interview' | 'reveal'>(initialBio ? 'reveal' : 'pref');
  const [interest, setInterest] = useState<KreonInterest>(initialInterest as KreonInterest);
  const [interviewPhase, setInterviewPhase] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [residentBio, setResidentBio] = useState(initialBio || "");
  const [cardNumber, setCardNumber] = useState(initialCardNumber);

  useEffect(() => {
    if (initialCardNumber && initialCardNumber !== '0000') {
      setCardNumber(initialCardNumber);
    }
  }, [initialCardNumber]);

  const handleInterestSelect = (id: KreonInterest) => {
    setInterest(id);
    setPhase('interview');
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newAnswers = [...answers, query];
    setAnswers(newAnswers);
    setQuery("");

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

  return (
    <div className="fixed inset-0 z-[3000] bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1B3FBF] flex items-center justify-center text-white font-bold text-xs ring-4 ring-[#1B3FBF]/10">K</div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black opacity-40">Neural Registry v4.2</span>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/10 transition-all group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {phase === 'pref' && (
            <motion.div 
              key="pref"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-6 space-y-12"
            >
              <div className="text-center space-y-4 max-w-xl">
                 <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#1B3FBF]">Step 01 / Identity Alignment</span>
                 <h1 className="text-4xl md:text-6xl font-serif italic text-black leading-tight tracking-tighter">
                   Select your primary <br/> neural sector.
                 </h1>
                 <p className="text-sm font-light text-black/40 italic font-serif">Your choice defines the visual manifestation of your resident card.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                {INTERESTS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInterestSelect(item.id)}
                    className="p-8 rounded-[2rem] border border-black/5 bg-[#f8f9ff] flex flex-col items-center gap-4 hover:border-[#1B3FBF]/20 hover:bg-white hover:shadow-2xl hover:shadow-[#1B3FBF]/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black/20 group-hover:text-[#1B3FBF] group-hover:bg-[#1B3FBF]/5 transition-all">
                      <item.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'interview' && (
            <motion.div 
              key="interview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col md:flex-row h-full"
            >
              {/* Left Side: The Card (Side View) */}
              <div className="w-full md:w-1/2 h-full bg-[#f8f9ff] flex items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                   <BrainCircuit size={400} className="absolute -bottom-20 -left-20 text-[#1B3FBF] rotate-12" />
                </div>
                
                <motion.div
                  initial={{ rotateY: -30, opacity: 0, scale: 0.8 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <KreonCardVisual cardNumber="----" userName={userName} userEmail={userEmail} interest={interest} bio={answers.join(' ')} />
                </motion.div>
              </div>

              {/* Right Side: Questions */}
              <div className="w-full md:w-1/2 h-full bg-white flex flex-col items-center justify-center p-12 md:p-24 relative overflow-hidden">
                 <div className="w-full max-w-md space-y-12 relative z-10">
                    <div className="space-y-4">
                       <div className="flex gap-1.5">
                          {[0, 1, 2].map(i => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= interviewPhase ? 'w-8 bg-[#1B3FBF]' : 'w-4 bg-[#1B3FBF]/10'}`} />
                          ))}
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Neural Sync Phase 0{interviewPhase + 1}</span>
                    </div>

                    <div className="space-y-8">
                       <h2 className="text-3xl md:text-5xl font-serif italic text-black leading-tight tracking-tighter h-32">
                         {isGenerating ? "Synthesizing bio..." : QUESTIONS[interviewPhase]}
                       </h2>
                       
                       {isGenerating ? (
                         <div className="flex items-center gap-4 text-[#1B3FBF]">
                            <div className="w-5 h-5 border-2 border-[#1B3FBF]/20 border-t-[#1B3FBF] rounded-full animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Establishing Identity...</span>
                         </div>
                       ) : (
                         <form onSubmit={handleAnswerSubmit} className="space-y-6">
                            <input 
                              autoFocus 
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Describe your intent..."
                              className="w-full bg-transparent border-b-2 border-black/5 py-4 text-xl outline-none focus:border-[#1B3FBF] transition-all placeholder:text-black/10 font-serif italic"
                            />
                            <button 
                              type="submit"
                              className="px-10 py-5 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center gap-4"
                            >
                              Continue Protocol <ChevronRight size={14} />
                            </button>
                         </form>
                       )}
                    </div>
                 </div>
                 
                 {/* Decorative */}
                 <Smile size={32} className="absolute bottom-10 right-10 text-black/5" />
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div 
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-6 relative"
            >
              {/* Flanking Panels (The logic from HomeScreen moved here) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:flex justify-between items-center px-24 w-full h-[600px] z-10">
                {/* Left Side: Identity Details */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                  className="w-[340px] text-left flex flex-col gap-8"
                >
                  <svg className="mb-2 scale-x-[-1]" width="200" height="80" viewBox="0 0 160 60" fill="none">
                    <path d="M10 30 C 60 10, 80 50, 150 50" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 8" strokeOpacity="0.5" />
                    <path d="M140 42 L154 51 L142 60" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.6"/>
                  </svg>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40 block mb-2">Identity Confirmed</span>
                    <h3 className="text-5xl font-black text-[#1B3FBF] leading-tight tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                      Identity<br/>Manifested.
                    </h3>
                    <p className="text-sm text-black/50 leading-relaxed mt-5 font-medium max-w-[280px]">
                      Your permanent residency in the KREO ecosystem is now active.
                    </p>
                  </div>
                </motion.div>

                {/* Right Side: Attributes */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                  className="w-[340px] text-left flex flex-col gap-8"
                >
                  <svg className="mb-2" width="200" height="80" viewBox="0 0 160 60" fill="none">
                    <path d="M10 30 C 60 10, 80 50, 150 50" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 8" strokeOpacity="0.5" />
                    <path d="M140 42 L154 51 L142 60" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.6"/>
                  </svg>
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">KREON PROFILE</span>
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="shrink-0 w-12 h-12 bg-[#1B3FBF]/10 rounded-full flex items-center justify-center text-[#1B3FBF] font-black text-lg border border-[#1B3FBF]/20">
                        {(userName?.[0] || userEmail?.[0] || 'K').toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-black text-[#1B3FBF] uppercase tracking-widest">{userName || userEmail?.split('@')[0] || 'GUEST'}</div>
                        <div className="text-[11px] text-black/40 font-medium">Neural Manifestation Active</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                       <div className="flex items-start gap-4 p-4 border border-[#1B3FBF]/10 rounded-2xl bg-[#1B3FBF]/5">
                          <Sparkles size={16} className="text-[#1B3FBF] mt-1" />
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Sector Alignment</div>
                             <div className="text-[12px] font-bold text-black uppercase mt-0.5">{interest}</div>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="z-20 scale-110">
                <KreonCard userEmail={userEmail} userName={userName} interest={interest} bio={residentBio} cardNumber={cardNumber} />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-16 text-center space-y-6"
              >
                 <button 
                  onClick={onClose}
                  className="px-12 py-6 bg-black text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
                 >
                   Enter Neural Studio
                 </button>
                 <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Your residency is now permanent across all manifests.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1B3FBF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-yellow-400/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>
    </div>
  );
};

export default IdentityScreen;
