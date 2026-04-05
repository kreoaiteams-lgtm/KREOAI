import { useState, useRef, useEffect } from "react";
import { 
  Eye, Code2, Copy, Download, RefreshCw, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, X,
  Share2, Play, Presentation
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
  const [isSlideshowMode, setIsSlideshowMode] = useState(false);

  // Detect Presentation Mode
  const isPresentation = !!(
    prompt?.toLowerCase().includes("ppt") ||
    prompt?.toLowerCase().includes("presentation") ||
    prompt?.toLowerCase().includes("slideshow") ||
    prompt?.toLowerCase().includes("slides") ||
    prompt?.toLowerCase().includes("slide")
  );

  // High-fidelity slide parser — looks for <section> blocks
  const slides = isPresentation
    ? (code.match(/<section[^>]*>([\s\S]*?)<\/section>/g) || [code])
    : [code];

  const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  // Keyboard Orchestration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSlideshowMode) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
        if (e.key === "Escape") setIsSlideshowMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSlideshowMode, slides.length, currentSlide]);

  // Reset slide when switching artifacts
  useEffect(() => {
    setCurrentSlide(0);
  }, [code]);

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

  // Build the iframe srcDoc
  const buildSrcDoc = (slideContent: string) => {
    if (isPresentation) {
      return `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
              html, body { width: 100%; height: 100%; overflow: hidden; background: white; }
              body { font-family: 'Inter', sans-serif; }
              .font-serif { font-family: 'Instrument Serif', serif; }
              section { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; box-sizing: border-box; overflow: hidden; }
            </style>
          </head>
          <body>${slideContent}</body>
        </html>
      `;
    }
    // Non-presentation
    if (!code.trim().toLowerCase().startsWith("<!doctype") && !code.trim().toLowerCase().startsWith("<html")) {
      return `
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
            <style>body { font-family: 'Inter', sans-serif; background: white; margin: 0; }</style>
          </head>
          <body>
            <div id="root"></div>
            <script type="module">
              import { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } from 'https://esm.sh/react@18';
              import { createRoot } from 'https://esm.sh/react-dom@18/client';
              const React = { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext };
              window.React = React; window.useState = useState; window.useEffect = useEffect; window.useRef = useRef;
              window.useCallback = useCallback; window.useMemo = useMemo; window.useReducer = useReducer; window.useContext = useContext;
              window.onerror = (message, source, lineno, colno) => {
                document.getElementById('root').innerHTML =
                  '<div style="padding: 3rem; background: #000; color: #ff3e3e; font-family: sans-serif; border-radius: 2rem; margin: 2rem;">' +
                    '<h3 style="font-size: 1.5rem; font-weight: 300; margin-bottom: 1rem;">Neural Manifest Collision</h3>' +
                    '<p style="opacity: 0.6; font-size: 0.9rem; line-height: 1.6;">' + message + '</p>' +
                    '<p style="opacity: 0.3; font-size: 0.7rem; margin-top: 1rem;">Line: ' + lineno + ' / Col: ' + colno + '</p>' +
                  '</div>';
                return true;
              };
              try {
                ${code
                  .replace(/import\s+React.*?from\s+['"]react['"];?\n?/g, "")
                  .replace(/import\s+\{[^}]+\}\s+from\s+['"]react['"];?\n?/g, "")
                  .replace(/import\s+.*?\s+from\s+['"]lucide-react['"];?\n?/g, "")
                  .replace(/import\s+.*?\s+from\s+['"]recharts['"];?\n?/g, "")
                  .replace(/export\s+default\s+/g, "window.__Component = ")
                }
                const App = window.__Component;
                if (App) createRoot(document.getElementById('root')).render(createElement(App));
                else document.getElementById('root').innerHTML = '<div style="padding:2rem;color:red">Could not find exported component.</div>';
              } catch (err) { window.onerror(err.message, null, null, null, err); }
            </script>
          </body>
        </html>
      `;
    }
    return code;
  };

  return (
    <>
      {/* ─── CINEMATIC SLIDESHOW OVERLAY ─── */}
      <AnimatePresence>
        {isSlideshowMode && isPresentation && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[3000] bg-black flex flex-col"
          >
            {/* Minimal top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2 backdrop-blur-md">
                  <Play size={10} fill="white" className="text-white" />
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white">Slideshow</span>
                </div>
                <span className="text-[10px] font-mono text-white/30">{currentSlide + 1} / {slides.length}</span>
              </div>
              <button
                onClick={() => setIsSlideshowMode(false)}
                className="pointer-events-auto p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md"
              >
                <X size={16} />
              </button>
            </div>

            {/* Slide content */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 60, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <iframe
                    key={`ss-${iframeId}-${currentSlide}`}
                    srcDoc={buildSrcDoc(slides[currentSlide])}
                    title="Slideshow"
                    className="w-full h-full border-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-10 gap-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-white disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5 px-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`rounded-full transition-all duration-300 ${i === currentSlide ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                  className="p-2.5 rounded-xl hover:bg-white/15 text-white disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 pointer-events-none">← → to navigate · Esc to exit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN PANEL ─── */}
      <div className={`flex flex-col h-full w-full bg-white shadow-xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden ${isPresentation ? "rounded-none" : isSplitView ? "" : "rounded-[2.5rem]"}`}>
        
        {/* Premium Header Toolbar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
          
          {/* Left: Tab switcher or slideshow badge */}
          <div className="flex items-center gap-3">
            {!isPresentation && (
              <div className="flex p-1 rounded-xl border gap-0.5 bg-black/[0.04] border-black/[0.07]">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === "preview" ? "bg-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/25" : "text-black/40 hover:text-black/70"
                  }`}
                >
                  <Eye size={12} /> Preview
                </button>
                {!readOnly && (
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                      activeTab === "code" ? "bg-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/25" : "text-black/40 hover:text-black/70"
                    }`}
                  >
                    <Code2 size={12} /> Code
                  </button>
                )}
              </div>
            )}

            {isPresentation && (
              <div className="flex items-center gap-3">
                {/* Slide counter */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.03] border border-black/5">
                  <button onClick={handlePrev} disabled={currentSlide === 0} className="p-0.5 text-black/30 hover:text-[#1B3FBF] disabled:opacity-20 transition-all">
                    <ChevronLeft size={13} />
                  </button>
                  <span className="text-[10px] font-black tabular-nums min-w-[40px] text-center text-black/40">{currentSlide + 1} / {slides.length}</span>
                  <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className="p-0.5 text-black/30 hover:text-[#1B3FBF] disabled:opacity-20 transition-all">
                    <ChevronRight size={13} />
                  </button>
                </div>

                {/* PPT badge */}
                <div className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border bg-[#1B3FBF]/8 text-[#1B3FBF] border-[#1B3FBF]/15 flex items-center gap-1.5">
                  <Presentation size={9} /> Presentation
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-0.5">
            
            {/* ── SLIDESHOW MODE BUTTON — only for presentations ── */}
            {isPresentation && (
              <button
                onClick={() => setIsSlideshowMode(true)}
                className="flex items-center gap-2 px-4 py-2 mr-2 rounded-xl bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#2548d4] active:scale-95 transition-all shadow-lg shadow-[#1B3FBF]/30"
              >
                <Play size={11} fill="white" /> Slideshow
              </button>
            )}

            {/* Zoom controls */}
            <div className="flex items-center gap-0.5 p-1 rounded-xl bg-black/[0.03] mr-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={handleZoomOut} className="p-1.5 rounded-lg text-black/40 hover:text-[#1B3FBF] transition-all disabled:opacity-20" disabled={zoom <= 0.5}>
                    <ZoomOut size={13} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
              <span className="text-[9px] font-bold min-w-[30px] text-center text-black/30">{Math.round(zoom * 100)}%</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={handleZoomIn} className="p-1.5 rounded-lg text-black/40 hover:text-[#1B3FBF] transition-all disabled:opacity-20" disabled={zoom >= 3}>
                    <ZoomIn size={13} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
            </div>

            <div className="w-[1px] h-4 mx-1 bg-black/5" />

            {/* Fullscreen (for non-presentation, or as secondary) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) el.requestFullscreen?.();
                    else document.exitFullscreen?.();
                  }}
                  className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all"
                >
                  <Maximize2 size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Fullscreen</TooltipContent>
            </Tooltip>

            {!readOnly && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setIframeId(prev => prev + 1)} className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                    <RefreshCw size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Refresh</TooltipContent>
              </Tooltip>
            )}

            {!readOnly && onShare && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={onShare} className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                    <Share2 size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${copied ? "text-[#1B3FBF] bg-[#1B3FBF]/10" : "text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8"}`}>
                  <Copy size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{copied ? "Copied!" : "Copy Source"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleDownload} className="p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                  <Download size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Download HTML</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* ─── Content Area ─── */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-[#f7f8fc]">
          {(activeTab === "preview" || isPresentation) ? (
            <div
              className="w-full h-full p-4 md:p-10 transition-all duration-300 flex items-center justify-center overflow-hidden"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
            >
              <div className="h-full w-full max-w-[1920px] aspect-video animate-in fade-in duration-700 bg-white shadow-2xl overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full w-full"
                  >
                    <iframe
                      key={`${iframeId}-${currentSlide}`}
                      srcDoc={buildSrcDoc(isPresentation ? slides[currentSlide] : code)}
                      title="Manifestation Player"
                      className="h-full w-full border-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* In-panel slide nav overlay (presentation only) */}
              {isPresentation && slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-white border border-black/5 shadow-xl">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`rounded-full transition-all duration-300 ${i === currentSlide ? "w-5 h-1.5 bg-[#1B3FBF]" : "w-1.5 h-1.5 bg-black/15 hover:bg-black/30"}`}
                      />
                    ))}
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
    </>
  );
};

export default ArtifactPanel;
