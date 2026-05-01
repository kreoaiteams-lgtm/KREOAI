import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Volume2, Globe, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CoWorkPanel from '../components/CoWorkPanel';
import ArtifactPanel from '../components/ArtifactPanel';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

export default function WebResearch() {
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isSplitView, setIsSplitView] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant", content: string, display?: string }[]>([]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-3xl border-b border-black/5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/40 hover:text-black transition-all group"
          >
            <ChevronLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <div className="h-4 w-px bg-black/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#E63946]">Live Research Portal</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative pt-16">
        {!artifact ? (
          <section className="min-h-[calc(100vh-4rem)] relative w-full flex items-center justify-center py-12">
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
          </section>
        ) : (
          <div className={`flex w-full h-[calc(100vh-4rem)] animate-in fade-in slide-in-from-bottom-4 duration-700 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
            <div className={`${isSplitView ? "w-[420px] shrink-0" : "w-full max-w-2xl mb-6"} flex flex-col ${isSplitView ? "h-full" : "min-h-[50vh]"} overflow-hidden bg-[#f5f7ff] border-r border-black/[0.06]`}>
              <div className="shrink-0 flex justify-between items-center px-6 py-4 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
                <button
                  onClick={() => {
                    setArtifact(null);
                    setChatHistory([]);
                  }}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/30 hover:text-[#1B3FBF] transition-all group"
                >
                  <ChevronLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Reset
                </button>
                <button
                  onClick={() => setShareDialogOpen(true)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3FBF]/20 bg-[#1B3FBF]/5 text-[#1B3FBF] text-[9px] font-black uppercase tracking-widest hover:bg-[#1B3FBF]/10 transition-all shadow-sm"
                >
                  <Share2 size={12} /> Share
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] rounded-2xl p-4 text-[13px] font-light leading-relaxed tracking-wide ${msg.role === 'user'
                      ? 'bg-[#1B3FBF] text-white rounded-tr-sm shadow-sm opacity-90'
                      : 'bg-white border border-black/[0.07] text-black/60 rounded-tl-sm shadow-sm'
                      }`}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">{msg.display || msg.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
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
