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
  initialPhase?: 'pref' | 'interview' | 'reveal';
  onPhaseChange?: (phase: 'pref' | 'interview' | 'reveal') => void;
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
  "How would you describe your creative style?",
  "What is your favorite tool or craft?",
  "Where do you find your best ideas?"
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
  const [phase, setPhase] = useState<'pref' | 'interview' | 'reveal'>(initialPhase || (initialBio ? 'reveal' : 'pref'));
  const [interest, setInterest] = useState<KreonInterest>(initialInterest as KreonInterest);
  const [interviewPhase, setInterviewPhase] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [residentBio, setResidentBio] = useState(initialBio || "");
  const [cardNumber, setCardNumber] = useState(initialCardNumber);

  useEffect(() => {
    if (onPhaseChange) onPhaseChange(phase);
  }, [phase, onPhaseChange]);

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
    <div className="fixed inset-0 z-[3000] bg-white overflow-y-auto flex flex-col">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <BrainCircuit size={1000} className="absolute -top-1/4 -right-1/4 text-[#1B3FBF] rotate-12" />
        <BrainCircuit size={800} className="absolute -bottom-1/4 -left-1/4 text-[#1B3FBF] -rotate-12" />
      </div>

      <main className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'pref' && (
            <motion.div 
              key="pref"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col md:flex-row h-auto min-h-full"
            >
              {/* Left Side: Buttons */}
              <div className="w-full md:w-[50%] flex flex-col justify-start px-12 md:px-24 py-16 md:py-24 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-[#1B3FBF]/40" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/60">Step 01 / Basics</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif italic text-black tracking-tight leading-tight">
                    What are you into?
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full max-w-xl pr-12">
                  {INTERESTS.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInterest(item.id)}
                      className={`relative w-full px-4 py-3 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${
                        interest === item.id 
                          ? 'bg-[#1B3FBF] border-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/20' 
                          : 'bg-[#f8f9ff] border-black/5 text-black hover:border-[#1B3FBF]/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        interest === item.id ? 'bg-white/20 text-white' : 'bg-white border border-black/5 text-[#1B3FBF] group-hover:bg-[#1B3FBF]/5'
                      }`}>
                        <item.icon size={15} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] flex-1 text-left">{item.label}</span>
                      
                      {interest === item.id && (
                        <Check size={12} className="text-white" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setPhase('interview')}
                    className="group px-10 py-5 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center gap-4 w-fit"
                  >
                    Next <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Side: Card Preview */}
              <div className="hidden md:flex flex-1 bg-[#f8f9ff] items-start justify-center pt-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                   <BrainCircuit size={600} className="absolute -bottom-40 -left-40 text-[#1B3FBF] rotate-12" />
                </div>
                <motion.div 
                  key={interest}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="scale-90 lg:scale-[0.85] origin-top"
                >
                  <KreonCardVisual cardNumber="----" userName={userName || "DHRUV"} userEmail={userEmail} interest={interest} bio="Loading..." />
                </motion.div>
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
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]">Step 02 / About you</span>
                    </div>

                    <div className="space-y-8">
                       <h2 className="text-3xl md:text-5xl font-serif italic text-black leading-tight tracking-tighter h-32">
                         {isGenerating ? "Just a moment..." : QUESTIONS[interviewPhase]}
                       </h2>
                       
                       {isGenerating ? (
                         <div className="flex items-center gap-4 text-[#1B3FBF]">
                            <div className="w-5 h-5 border-2 border-[#1B3FBF]/20 border-t-[#1B3FBF] rounded-full animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Setting things up...</span>
                         </div>
                       ) : (
                         <form onSubmit={handleAnswerSubmit} className="space-y-6">
                            <input 
                              autoFocus 
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Tell us here..."
                              className="w-full bg-transparent border-b-2 border-black/5 py-4 text-xl outline-none focus:border-[#1B3FBF] transition-all placeholder:text-black/10 font-serif italic"
                            />
                            <button 
                              type="submit"
                              className="px-10 py-5 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1B3FBF]/20 flex items-center gap-4"
                            >
                              Next <ChevronRight size={14} />
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
              className="flex-1 flex flex-col items-center justify-center p-12 py-32 relative"
            >
              {/* Flanking Panels (The logic from HomeScreen moved here) */}
              <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 pointer-events-none hidden xl:flex justify-between items-center px-24 w-full h-[600px] z-10">
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
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]/40 block mb-3">HI THERE</span>
                     <h3 className="text-4xl md:text-5xl font-serif italic text-[#1B3FBF] leading-tight tracking-tight">
                        Welcome to <br/>KREO.
                     </h3>
                    <p className="text-sm text-black/40 leading-relaxed mt-5 font-medium max-w-[280px]">
                      Your account is ready. You are now part of our growing community.
                    </p>
                    
                    <div className="mt-8 pt-8 border-t border-black/5 flex items-center gap-6">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black/20">RESIDENT CENSUS</span>
                          <span className="text-sm font-serif italic text-[#1B3FBF]">#{cardNumber} of 2,048</span>
                       </div>
                    </div>
                  </div>
                </motion.div>

                <div className="w-[340px]" />
              </div>

              <div className="z-20 scale-100 md:scale-110 my-10 flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-2 opacity-40">
                   <div className="h-[1px] w-8 bg-black/10" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Resident ID</span>
                   <span className="text-3xl font-serif italic text-black/60">#{cardNumber}</span>
                </div>
                <KreonCard userEmail={userEmail} userName={userName} interest={interest} bio={residentBio} cardNumber={cardNumber} />
              </div>

              {/* Final Footer Area Removed per Request */}
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
