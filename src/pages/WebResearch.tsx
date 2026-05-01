import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Volume2, Globe, ArrowUp, X, Sparkles, ShieldCheck, Crosshair, Cpu, Radio, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';
import ArtifactPanel from '../components/ArtifactPanel';
import CloudBackground from '../components/CloudBackground';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

export default function WebResearch() {
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isSplitView, setIsSplitView] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant", content: string, display?: string }[]>([]);
  
  // Splash Sequence State: 'phase1' | 'phase2' | 'complete'
  const [splashPhase, setSplashPhase] = useState<'phase1' | 'phase2' | 'complete'>('phase1');

  useEffect(() => {
    const p1 = setTimeout(() => setSplashPhase('phase2'), 3000);
    const p2 = setTimeout(() => setSplashPhase('complete'), 5500);
    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-hidden font-satoshi selection:bg-[#1B3FBF]/10">
      <AnimatePresence mode="wait">
        {splashPhase === 'phase1' && (
          <motion.div 
            key="splash1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <h2 className="text-6xl md:text-7xl font-light tracking-tighter leading-tight italic font-serif">
                What shall we <span className="text-[#1B3FBF]">uncover</span> today?
              </h2>
              <p className="text-lg text-black/40 font-light tracking-wide leading-relaxed">
                Enter a complex query. KREO will orchestrate a multi-step research mission across the live web to synthesize your manifest.
              </p>
            </motion.div>
          </motion.div>
        )}

        {splashPhase === 'phase2' && (
          <motion.div 
            key="splash2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] font-satoshi">Welcome</span>
                <span className="text-4xl md:text-5xl font-serif italic font-light opacity-30">to</span>
              </div>
              <h1 
                className="text-5xl md:text-7xl font-bold text-[#E63946] tracking-tighter" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Research Portal
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: splashPhase === 'complete' ? 1 : 0 }}
        className="flex flex-col min-h-screen relative"
      >
        {/* Immersive Background for Research Phase */}
        {!artifact && <CloudBackground speed={0.2} />}

        {/* UI Elements / Scanning Grid Overlay */}
        {!artifact && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '30px 30px, 150px 150px, 150px 150px'
            }} 
          />
        )}

        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-white/40 backdrop-blur-2xl border-b border-black/[0.03]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-black transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ChevronLeft size={14} />
              </div>
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-black/10" />
            <div className="flex items-center gap-3">
              <span 
                className="text-lg font-bold tracking-tighter text-black" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Research Portal
              </span>
              <div className="px-2 py-0.5 rounded-full bg-[#E63946]/10 text-[#E63946] text-[7px] font-black uppercase tracking-widest">
                Live
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end opacity-20">
                <span className="text-[10px] font-mono">48.8566</span>
              </div>
              <div className="flex flex-col items-end opacity-20">
                <span className="text-[10px] font-mono">2.3522</span>
              </div>
            </div>
            <div className="h-8 w-px bg-black/5" />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-medium">SECURE</span>
              </div>
              <button className="p-2.5 rounded-full bg-black/5 text-black/40 hover:bg-black hover:text-white transition-all">
                <ShieldCheck size={16} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-16">
          {!artifact ? (
            <section className="min-h-[calc(100vh-4rem)] relative w-full flex flex-col items-center justify-center py-12 px-6">
              
              {/* ABSTRACT ANIMATED ELEMENTS - LEFT */}
              <div className="absolute top-20 left-12 bottom-20 w-32 hidden lg:flex flex-col gap-16 justify-center">
                <div className="flex gap-1.5 h-8">
                  {Array.from({length: 8}).map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [4, 24, 4], opacity: [0.1, 0.4, 0.1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                      className="w-1 bg-[#1B3FBF]" 
                    />
                  ))}
                </div>
                <div className="space-y-4">
                  {Array.from({length: 4}).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                      className="h-px bg-black w-full"
                    />
                  ))}
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="w-10 h-10 border-2 border-dashed border-black/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 bg-[#1B3FBF]/20 rounded-full" />
                </motion.div>
              </div>

              {/* ABSTRACT ANIMATED ELEMENTS - RIGHT */}
              <div className="absolute top-20 right-12 bottom-20 w-32 hidden lg:flex flex-col gap-16 justify-center items-end">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({length: 9}).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                      className="w-1.5 h-1.5 rounded-full bg-black"
                    />
                  ))}
                </div>
                <div className="w-full space-y-2">
                  <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["10%", "90%", "30%", "60%"] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="h-full bg-black/10"
                    />
                  </div>
                  <div className="w-2/3 h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["90%", "20%", "70%", "40%"] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="h-full bg-black/10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                   <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                   <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                </div>
              </div>

              <div className="w-full max-w-4xl relative">
                <div className="absolute -inset-4 border border-black/[0.01] rounded-[2rem] pointer-events-none" />
                
                <CoWorkPanel
                   onManifestGenerated={(code, p) => {
                     setArtifact(code);
                     setQuery(p);
                     setChatHistory([
                       { role: 'user', content: p }, 
                       { role: 'assistant', content: code, display: "Research Synthesis Complete: Verified manifest generated." }
                     ]);
                   }}
                   onClose={() => navigate('/')}
                />
              </div>

              {/* Status Bar Detail */}
              <div className="mt-12 flex items-center gap-8 opacity-10">
                <Crosshair size={12} />
                <div className="w-8 h-px bg-black" />
                <Zap size={12} />
                <div className="w-8 h-px bg-black" />
                <Globe size={12} />
              </div>
            </section>
          ) : (
            <div className={`flex w-full h-[calc(100vh-4rem)] animate-in fade-in slide-in-from-bottom-8 duration-1000 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
              <div className={`${isSplitView ? "w-[400px] shrink-0" : "w-full max-w-2xl mb-8"} flex flex-col ${isSplitView ? "h-full" : "min-h-[60vh]"} overflow-hidden bg-[#fbfbff] border-r border-black/[0.02]`}>
                <div className="shrink-0 flex justify-between items-center px-8 py-4 border-b border-black/[0.02] bg-white/90 backdrop-blur-2xl">
                  <button
                    onClick={() => {
                      setArtifact(null);
                      setChatHistory([]);
                    }}
                    className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-black/20 hover:text-[#1B3FBF] transition-all group"
                  >
                    <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Reset
                  </button>
                  <button
                    onClick={() => setShareDialogOpen(true)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10"
                  >
                    <Share2 size={11} /> Share
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl p-5 text-[13px] font-light leading-relaxed tracking-wide shadow-sm ${msg.role === 'user'
                        ? 'bg-[#1B3FBF] text-white'
                        : 'bg-white border border-black/[0.03] text-black/60'
                        }`}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">{msg.display || msg.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 h-full overflow-hidden bg-white">
                <ArtifactPanel 
                  code={artifact} 
                  prompt={query} 
                  isSplitView={isSplitView} 
                  onShare={() => setShareDialogOpen(true)} 
                  onRefinement={(refinement) => {
                    setQuery(refinement);
                  }}
                />
              </div>
            </div>
          )}
        </main>
      </motion.div>
    </div>
  );
}
