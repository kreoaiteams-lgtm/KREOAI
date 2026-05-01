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
              className="space-y-2"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 block mb-4">Establishing Portal</span>
              <h1 
                className="text-7xl md:text-8xl font-bold tracking-tighter text-black" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Welcome to <br />
                <span className="text-[#E63946]">Research Portal</span>
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
        {!artifact && <CloudBackground speed={0.3} />}

        {/* UI Elements / Scanning Grid Overlay */}
        {!artifact && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px, 200px 200px, 200px 200px'
            }} 
          />
        )}

        <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-6 bg-white/40 backdrop-blur-2xl border-b border-black/[0.03]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-black transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ChevronLeft size={14} />
              </div>
              <span>Back to KREO</span>
            </button>
            <div className="h-4 w-px bg-black/10" />
            <div className="flex items-center gap-3">
              <span 
                className="text-2xl font-bold tracking-tighter text-black" 
                style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
              >
                Research Portal
              </span>
              <div className="px-2 py-0.5 rounded-full bg-[#E63946]/10 text-[#E63946] text-[8px] font-black uppercase tracking-widest">
                Live Neural Link
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Uplink</span>
                <span className="text-[10px] font-mono text-black/40">48.8566° N</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Downlink</span>
                <span className="text-[10px] font-mono text-black/40">2.3522° E</span>
              </div>
            </div>
            <div className="h-8 w-px bg-black/5" />
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Protocol</span>
                <span className="text-[10px] font-medium text-black/60 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> JINA_V2_SECURE
                </span>
              </div>
              <button className="p-3 rounded-full bg-black/5 text-black/40 hover:bg-black hover:text-white transition-all">
                <ShieldCheck size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col relative z-10 pt-20">
          {!artifact ? (
            <section className="min-h-[calc(100vh-5rem)] relative w-full flex flex-col items-center justify-center py-20 px-6">
              {/* Floating UI Decorative Elements */}
              <div className="absolute top-1/4 left-10 opacity-20 hidden lg:block">
                <div className="flex flex-col gap-8">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Signal Strength</div>
                    <div className="flex gap-0.5">
                      {[1,1,1,1,0.3].map((op, i) => <div key={i} className="w-1 h-3 bg-black" style={{ opacity: op }} />)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Radio size={14} className="text-[#1B3FBF]" />
                    <span className="text-[9px] font-mono tracking-tighter text-black/40">SCANNING_NETWORK...</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block text-right">
                <div className="flex flex-col items-end gap-8">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Core Load</div>
                    <div className="w-32 h-1 bg-black/10 overflow-hidden">
                      <motion.div 
                        animate={{ x: [-128, 128] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-full bg-[#E63946]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono tracking-tighter text-black/40">BUFFERING_NEURAL_LINK</span>
                    <Cpu size={14} className="text-[#1B3FBF]" />
                  </div>
                </div>
              </div>

              <div className="w-full max-w-5xl relative">
                {/* Visual Frame */}
                <div className="absolute -inset-10 border border-black/[0.03] rounded-[4rem] pointer-events-none" />
                <div className="absolute -inset-20 border border-black/[0.01] rounded-[6rem] pointer-events-none" />
                
                <CoWorkPanel
                   onManifestGenerated={(code, p) => {
                     setArtifact(code);
                     setQuery(p);
                     setChatHistory([
                       { role: 'user', content: p }, 
                       { role: 'assistant', content: code, display: "Research Synthesis Complete: Verified manifest generated from deep web crawl." }
                     ]);
                   }}
                   onClose={() => navigate('/')}
                />
              </div>

              {/* Status Bar Detail */}
              <div className="mt-20 flex items-center gap-12">
                <div className="flex items-center gap-3 opacity-30">
                  <Crosshair size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Target Lock</span>
                </div>
                <div className="w-12 h-px bg-black/10" />
                <div className="flex items-center gap-3 opacity-30">
                  <Zap size={14} className="text-[#1B3FBF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Fast Synthesis</span>
                </div>
                <div className="w-12 h-px bg-black/10" />
                <div className="flex items-center gap-3 opacity-30">
                  <Globe size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global Crawl</span>
                </div>
              </div>
            </section>
          ) : (
            <div className={`flex w-full h-[calc(100vh-5rem)] animate-in fade-in slide-in-from-bottom-8 duration-1000 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
              <div className={`${isSplitView ? "w-[450px] shrink-0" : "w-full max-w-2xl mb-8"} flex flex-col ${isSplitView ? "h-full" : "min-h-[60vh]"} overflow-hidden bg-[#f8faff] border-r border-black/[0.03]`}>
                <div className="shrink-0 flex justify-between items-center px-8 py-6 border-b border-black/[0.03] bg-white/90 backdrop-blur-2xl">
                  <button
                    onClick={() => {
                      setArtifact(null);
                      setChatHistory([]);
                    }}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-[#1B3FBF] transition-all group"
                  >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> New Research
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShareDialogOpen(true)}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10"
                    >
                      <Share2 size={13} /> Share Manifest
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-3xl p-6 text-[14px] font-light leading-relaxed tracking-wide shadow-sm ${msg.role === 'user'
                        ? 'bg-[#1B3FBF] text-white rounded-tr-sm'
                        : 'bg-white border border-black/[0.05] text-black/60 rounded-tl-sm'
                        }`}>
                        <div className="flex justify-between items-start gap-6">
                          <div className="flex-1">{msg.display || msg.content}</div>
                          {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-[#1B3FBF]/5 flex items-center justify-center text-[#1B3FBF] shrink-0">
                              <Sparkles size={14} />
                            </div>
                          )}
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
