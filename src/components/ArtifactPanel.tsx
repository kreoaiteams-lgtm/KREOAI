import { useState, useRef, useEffect } from "react";
import { 
  Eye, Code2, Copy, Download, RefreshCw, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, RotateCcw,
  Share2, Play
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface ArtifactPanelProps {
  code: string;
  prompt?: string;
  isSplitView?: boolean;
  onShare?: () => void;
  readOnly?: boolean;
}

const ArtifactPanel = ({ code, prompt, isSplitView, onShare, readOnly }: ArtifactPanelProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [iframeId, setIframeId] = useState(0);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Detect Presentation Mode
  const isPresentation = prompt?.toLowerCase().includes("ppt") || prompt?.toLowerCase().includes("presentation") || prompt?.toLowerCase().includes("slideshow");

  // High-fidelity slide parser — looks for <section> blocks (Standard manifest format)
  const slides = isPresentation ? (code.match(/<section[^>]*>([\s\S]*?)<\/section>/g) || [code]) : [code];

  const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  // Keyboard Orchestration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isPresentation) return;
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPresentation, isFullscreen, slides.length]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifestation.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className={`flex flex-col h-full w-full bg-white shadow-xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden ${isFullscreen ? "fixed inset-0 z-[2000] rounded-none bg-black" : isPresentation ? "rounded-none" : isSplitView ? "" : "rounded-[2.5rem]"}`}>
      {/* Premium Header Toolbar */}
      <div className={`flex items-center justify-between px-6 py-4 border-b border-black/[0.06] backdrop-blur-xl transition-all duration-500 ${isFullscreen ? "bg-black/90 text-white border-white/10" : "bg-white/95 text-black"}`}>
        <div className="flex items-center gap-4">
          {!isPresentation && (
            <div className={`flex p-1 rounded-xl border gap-0.5 ${isFullscreen ? "bg-white/5 border-white/10" : "bg-black/[0.04] border-black/[0.07]"}`}>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "preview"
                    ? "bg-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/25"
                    : isFullscreen ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black/70"
                }`}
              >
                <Eye size={13} /> Preview
              </button>
              {!readOnly && (
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === "code"
                      ? "bg-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/25"
                      : isFullscreen ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black/70"
                  }`}
                >
                  <Code2 size={13} /> Code
                </button>
              )}
            </div>
          )}
          {isPresentation && (
            <div className="flex items-center gap-4">
               <div className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-lg border flex items-center gap-2 ${isFullscreen ? "bg-white/10 text-white border-white/20" : "bg-[#1B3FBF]/10 text-[#1B3FBF] border-[#1B3FBF]/20"}`}>
                  <Play size={10} fill="currentColor" /> Slideshow
               </div>
               <span className={`text-[10px] font-mono tracking-tighter ${isFullscreen ? "text-white/40" : "text-black/30"}`}>Manifest {currentSlide + 1} of {slides.length}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isPresentation && (
            <div className={`flex items-center rounded-xl border p-1 px-2 mr-3 ${isFullscreen ? "bg-white/5 border-white/10" : "bg-black/[0.02] border-black/5"}`}>
              <button onClick={handlePrev} disabled={currentSlide === 0} className={`p-1 px-3 text-[9px] font-bold transition-all uppercase tracking-widest disabled:opacity-10 ${isFullscreen ? "text-white/40 hover:text-white" : "text-black/30 hover:text-[#1B3FBF]"}`}>←</button>
              <div className={`w-[1px] h-3 mx-1 ${isFullscreen ? "bg-white/10" : "bg-black/5"}`} />
              <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className={`p-1 px-3 text-[9px] font-bold transition-all uppercase tracking-widest disabled:opacity-10 ${isFullscreen ? "text-white/40 hover:text-white" : "text-black/30 hover:text-[#1B3FBF]"}`}>→</button>
            </div>
          )}

          <div className={`w-[1px] h-4 mx-2 ${isFullscreen ? "bg-white/10" : "bg-black/5"}`} />

          <div className={`flex items-center gap-0.5 p-1 rounded-xl mr-2 ${isFullscreen ? "bg-white/5" : "bg-black/[0.03]"}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleZoomOut} className={`p-1.5 rounded-lg transition-all disabled:opacity-20 ${isFullscreen ? "text-white/40 hover:text-white" : "text-black/40 hover:text-[#1B3FBF]"}`} disabled={zoom <= 0.5}>
                  <ZoomOut size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
            <span className={`text-[9px] font-bold min-w-[32px] text-center ${isFullscreen ? "text-white/40" : "text-black/30"}`}>{Math.round(zoom * 100)}%</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleZoomIn} className={`p-1.5 rounded-lg transition-all disabled:opacity-20 ${isFullscreen ? "text-white/40 hover:text-white" : "text-black/40 hover:text-[#1B3FBF]"}`} disabled={zoom >= 3}>
                  <ZoomIn size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsFullscreen(!isFullscreen)} className={`p-2 rounded-lg transition-all ${isFullscreen ? "text-[#1B3FBF] bg-[#1B3FBF]/10" : "text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8"}`}>
                {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{isFullscreen ? "Exit Slideshow" : "Start Slideshow"}</TooltipContent>
          </Tooltip>

          {!readOnly && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setIframeId(prev => prev + 1)} className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                  <RefreshCw size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
          )}

          {onShare && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onShare} 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#2548d4] transition-all shadow-lg shadow-[#1B3FBF]/20 active:scale-95"
                >
                  <Share2 size={13} strokeWidth={3} /> Share Artifact
                </button>
              </TooltipTrigger>
              <TooltipContent>Neural Portal Share</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${copied ? 'text-[#1B3FBF] bg-[#1B3FBF]/10' : 'text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8'}`}>
                <Copy size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied!" : "Copy Source"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleDownload} className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                <Download size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Download HTML</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className={`flex-1 overflow-hidden relative flex ${isFullscreen ? "bg-[#0a0a0a]" : "bg-[#f7f8fc]"}`}>
        
        {/* Slides Sidebar */}
        {isPresentation && !isFullscreen && activeTab === "preview" && slides.length > 0 && (
          <div className="w-48 lg:w-64 border-r border-black/[0.06] bg-[#f8f9fa] flex flex-col overflow-y-auto p-4 gap-4 custom-scrollbar shrink-0">
            {slides.map((slideCode, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`relative flex flex-col items-center gap-2 group text-left w-full`}
              >
                <div className="flex w-full justify-between items-center px-1">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${currentSlide === idx ? "text-[#1B3FBF]" : "text-black/30 group-hover:text-black/60"}`}>Slide {idx + 1}</span>
                </div>
                <div className={`w-full aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 relative bg-white shadow-sm flex items-center justify-center ${currentSlide === idx ? "border-[#1B3FBF] shadow-md shadow-[#1B3FBF]/20 scale-[1.02]" : "border-black/[0.05] group-hover:border-black/20"}`}>
                   {/* Mini-iframe for Thumbnail */}
                   <div className="absolute inset-0 pointer-events-none opacity-50 blur-[1px] group-hover:blur-none group-hover:opacity-100 transition-all">
                      <iframe
                        srcDoc={`
                          <html>
                            <head>
                              <script src="https://cdn.tailwindcss.com"></script>
                              <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;700&display=swap" rel="stylesheet">
                              <style>
                                body { font-family: 'Inter', sans-serif; background: white; margin: 0; transform: scale(0.2); transform-origin: top left; width: 500vw; height: 500vh; overflow:hidden;}
                                .font-serif { font-family: 'Instrument Serif', serif; }
                              </style>
                            </head>
                            <body>
                              ${slideCode}
                            </body>
                          </html>
                        `}
                        className="w-full h-full border-none"
                      />
                   </div>
                   {currentSlide === idx && <div className="absolute inset-0 ring-4 ring-[#1B3FBF]/10 rounded-xl" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full h-full">
        {(activeTab === "preview" || isPresentation) ? (
          <div 
            className="w-full h-full transition-all duration-300 flex items-center justify-center overflow-hidden relative"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            <div className={`h-full w-full animate-in fade-in duration-700 bg-white overflow-hidden ${isFullscreen ? "rounded-none" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <iframe
                    key={`${iframeId}-${currentSlide}`}
                    srcDoc={isPresentation ? `
                      <html>
                        <head>
                          <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;700&display=swap" rel="stylesheet">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>
                            body { font-family: 'Inter', sans-serif; background: white; margin: 0; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; overflow-y: auto; }
                            .font-serif { font-family: 'Instrument Serif', serif; }
                            section { min-height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; box-sizing: border-box; }
                          </style>
                        </head>
                        <body>
                          ${slides[currentSlide]}
                        </body>
                      </html>
                    ` : (
                      !code.trim().toLowerCase().startsWith("<!doctype") &&
                      !code.trim().toLowerCase().startsWith("<html")
                    ) ? `
                      <html>
                        <head>
                          <script src="https://cdn.tailwindcss.com"></script>
                          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
                          <style>
                            body { font-family: 'Inter', sans-serif; background: white; margin: 0; overflow-x: hidden; overflow-y: auto; min-height: 100vh; }
                          </style>
                        </head>
                        <body>
                          <div id="root"></div>
                          <script type="module">
                            import { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } from 'https://esm.sh/react@18';
                            import { createRoot } from 'https://esm.sh/react-dom@18/client';
                            const React = { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext };
                            window.React = React;
                            window.useState = useState;
                            window.useEffect = useEffect;
                            window.useRef = useRef;
                            window.useCallback = useCallback;
                            window.useMemo = useMemo;
                            window.useReducer = useReducer;
                            window.useContext = useContext;
                            window.onerror = (message, source, lineno, colno, error) => {
                              document.getElementById('root').innerHTML =
                                '<div style="padding: 3rem; background: #000; color: #ff3e3e; font-family: sans-serif; border: 1px solid #1a1a1a; border-radius: 2rem; margin: 2rem;">' +
                                  '<h3 style="font-size: 1.5rem; font-weight: 300; margin-bottom: 1rem;">Neural Manifest Collision</h3>' +
                                  '<p style="opacity: 0.6; font-size: 0.9rem; line-height: 1.6;">' + message + '</p>' +
                                  '<p style="opacity: 0.3; font-size: 0.7rem; margin-top: 1rem;">Line: ' + lineno + ' / Col: ' + colno + '</p>' +
                                '</div>';
                              return true;
                            };
                            try {
                              const { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } = React;
                              ${code
                                .replace(/import\s+React.*?from\s+['"']react['"'];?\n?/g, "")
                                .replace(/import\s+\{[^}]+\}\s+from\s+['"']react['"'];?\n?/g, "")
                                .replace(/import\s+.*?\s+from\s+['"']lucide-react['"'];?\n?/g, "")
                                .replace(/import\s+.*?\s+from\s+['"']recharts['"'];?\n?/g, "")
                                .replace(/export\s+default\s+/g, "window.__Component = ")
                              }
                              const App = window.__Component;
                              if (App) {
                                createRoot(document.getElementById('root')).render(createElement(App));
                              } else {
                                document.getElementById('root').innerHTML = '<div style="padding:2rem;color:red">Could not find exported component.</div>';
                              }
                            } catch (err) {
                               window.onerror(err.message, null, null, null, err);
                            }
                          </script>
                        </body>
                      </html>
                    ` : code}
                    title="Manifestation Player"
                    className="h-full w-full border-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slideshow Controls Overlay */}
            {isPresentation && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 animate-in slide-in-from-bottom-8 duration-1000">
                    <div className={`p-2 rounded-full border shadow-2xl flex items-center gap-2 px-6 ${isFullscreen ? "bg-[#1B3FBF]/20 border-white/20 backdrop-blur-3xl text-white" : "bg-white border-black/5 text-[#1B3FBF]"}`}>
                         <button onClick={handlePrev} disabled={currentSlide === 0} className="p-2 hover:scale-125 transition-transform disabled:opacity-20"><ChevronLeft size={16} /></button>
                         <div className="h-6 w-[1px] bg-white/10 mx-2" />
                         <span className="text-[10px] font-black tracking-widest uppercase">{currentSlide + 1} / {slides.length}</span>
                         <div className="h-6 w-[1px] bg-white/10 mx-2" />
                         <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className="p-2 hover:scale-125 transition-transform disabled:opacity-20"><ChevronRight size={16} /></button>
                    </div>
                </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full overflow-auto bg-white">
            <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.06] bg-[#f4f5f9]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-[10px] font-mono text-black/30 tracking-widest">manifestation.html</span>
            </div>
            <pre className="p-8 font-mono text-xs leading-relaxed text-[#2D4FA8] whitespace-pre-wrap overflow-x-auto">{code}</pre>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactPanel;
