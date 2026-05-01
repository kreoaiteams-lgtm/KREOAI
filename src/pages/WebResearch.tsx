import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Volume2, Globe, ArrowUp, X, Sparkles, ShieldCheck } from 'lucide-react';
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-hidden font-satoshi">
      {/* Immersive Background for Research Phase */}
      {!artifact && <CloudBackground speed={0.5} />}

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

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-4">
            <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Protocol Status</span>
            <span className="text-[10px] font-medium text-black/60 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Encrypted Web Access
            </span>
          </div>
          <button className="p-3 rounded-full bg-black/5 text-black/40 hover:bg-black hover:text-white transition-all">
            <ShieldCheck size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative z-10 pt-20">
        {!artifact ? (
          <section className="min-h-[calc(100vh-5rem)] relative w-full flex flex-col items-center justify-center py-20 px-6">
            {/* Contextual Header for the Research Stage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 space-y-4 max-w-2xl"
            >
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter leading-tight italic font-serif">
                What shall we <span className="text-[#1B3FBF]">uncover</span> today?
              </h2>
              <p className="text-sm text-black/40 font-light tracking-wide max-w-md mx-auto">
                Enter a complex query. KREO will orchestrate a multi-step research mission across the live web to synthesize your manifest.
              </p>
            </motion.div>

            <div className="w-full max-w-5xl">
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

            {/* Decorative Detail */}
            <div className="mt-20 flex items-center gap-8 opacity-20 grayscale pointer-events-none">
              <Globe size={40} strokeWidth={1} />
              <Sparkles size={40} strokeWidth={1} />
              <div className="w-24 h-px bg-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Neural Search Interface v4.0</span>
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
    </div>
  );
}
