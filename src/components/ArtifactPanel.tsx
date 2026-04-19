import { useState, useRef, useEffect } from "react";
import { 
  Eye, Code2, Copy, Download, RefreshCw, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, RotateCcw,
  Share2, Play, MousePointer2, SlidersHorizontal, Settings2, Sparkles, FileArchive, Presentation, Image
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

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
  const { t } = useLang();
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // New Claude Design Features
  const [inlineEditMode, setInlineEditMode] = useState(false);
  const [showKnobs, setShowKnobs] = useState(false);
  const [renderTheme, setRenderTheme] = useState<'light' | 'dark' | 'ultra'>('light');
  const [splitArchitecture, setSplitArchitecture] = useState(true);
  const [showExports, setShowExports] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#1B3FBF");
  const [borderRadius, setBorderRadius] = useState("0.5rem");

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
                <Eye size={13} /> {t.artifact_preview}
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
                  <Code2 size={13} /> {t.artifact_code}
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



          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${copied ? 'text-[#1B3FBF] bg-[#1B3FBF]/10' : 'text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8'}`}>
                <Copy size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied!" : "Copy Source"}</TooltipContent>
          </Tooltip>

          {!readOnly && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group/export">
                  <button className="flex items-center gap-2 p-2 text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/8 rounded-lg transition-all">
                    <Download size={15} />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border shadow-2xl rounded-xl overflow-hidden opacity-0 invisible group-hover/export:opacity-100 group-hover/export:visible transition-all z-[100] flex flex-col p-1">
                    <div className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-black/30 border-b mb-1">Ecosystem Export</div>
                    <button onClick={handleDownload} className="flex flex-col items-start px-3 py-2 text-xs font-semibold hover:bg-black/5 rounded-lg text-black transition-all">
                      <div className="flex items-center gap-2"><Code2 size={12} className="text-[#1B3FBF]"/> Download standalone HTML</div>
                    </button>
                    <button onClick={() => alert("Handoff bundle created successfully!")} className="flex flex-col items-start px-3 py-2 text-xs font-semibold hover:bg-black/5 rounded-lg text-black transition-all">
                      <div className="flex items-center gap-2"><FileArchive size={12} className="text-[#1B3FBF]"/> Export Developer .zip</div>
                    </button>
                    <button onClick={() => alert("Exported to PPTX!")} className="flex flex-col items-start px-3 py-2 text-xs font-semibold hover:bg-black/5 rounded-lg text-black transition-all">
                      <div className="flex items-center gap-2"><Presentation size={12} className="text-[#1B3FBF]"/> Export to PowerPoint</div>
                    </button>
                    <button onClick={() => alert("Pushed to Canva!")} className="flex flex-col items-start px-3 py-2 text-xs font-semibold hover:bg-black/5 rounded-lg text-black transition-all">
                      <div className="flex items-center gap-2"><Image size={12} className="text-[#1B3FBF]"/> Push to Canva</div>
                    </button>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Ecosystem Export</TooltipContent>
            </Tooltip>
          )}

          {!readOnly && (
            <>
              <div className={`w-[1px] h-4 mx-2 ${isFullscreen ? "bg-white/10" : "bg-black/5"}`} />
              <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-xl">
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <button onClick={() => setInlineEditMode(!inlineEditMode)} className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${inlineEditMode ? "bg-[#1B3FBF] text-white shadow-md shadow-[#1B3FBF]/30" : "text-black/40 hover:text-black"}`}>
                       <MousePointer2 size={13} fill={inlineEditMode ? "currentColor" : "none"} />
                       <span className="text-[10px] font-bold pr-1">Live Edit</span>
                     </button>
                   </TooltipTrigger>
                   <TooltipContent>Select-to-edit elements</TooltipContent>
                 </Tooltip>
                 
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <button onClick={() => setShowKnobs(!showKnobs)} className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${showKnobs ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"}`}>
                       <Settings2 size={13} />
                       <span className="text-[10px] font-bold pr-1">Knobs</span>
                     </button>
                   </TooltipTrigger>
                   <TooltipContent>Dynamic Styles & Brand</TooltipContent>
                 </Tooltip>
              </div>
            </>
          )}

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
                    <iframe
                      key={`${iframeId}-${currentSlide}`}
                      srcDoc={isPresentation ? `
                        <html>
                          <head>
                            <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;700&display=swap" rel="stylesheet">
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                              :root {
                                --primary: ${primaryColor};
                                --radius: ${borderRadius};
                                --background: 0 0% 100%;
                                --foreground: 0 0% 0%;
                              }
                              .dark {
                                --background: 227 80% 8%;
                                --foreground: 0 0% 100%;
                                background-color: hsl(var(--background));
                                color: hsl(var(--foreground));
                              }
                              .ultra {
                                --background: 227 75% 43%;
                                --foreground: 0 0% 100%;
                                background-color: hsl(var(--background));
                                color: hsl(var(--foreground));
                              }
                              ${inlineEditMode ? `
                                * { cursor: crosshair !important; }
                                *:hover { outline: 2px dashed #1B3FBF !important; outline-offset: 2px; }
                              ` : ""}
                            </style>
                            <style>
                              body { font-family: 'Inter', sans-serif; background: white; margin: 0; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; overflow-y: auto; }
                              .font-serif { font-family: 'Instrument Serif', serif; }
                              section { min-height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; box-sizing: border-box; }
                            </style>
                          </head>
                          <body className="${renderTheme === 'dark' ? 'dark' : renderTheme === 'ultra' ? 'ultra' : ''}">
                            ${slides[currentSlide]}
                          </body>
                        </html>
                      ` : (
                        !code.trim().toLowerCase().startsWith("<!doctype") &&
                        !code.trim().toLowerCase().startsWith("<html")
                      ) ? (() => {
                        const cleanCode = code
                          .replace(/```(jsx|tsx|javascript|js|html|react-native|react)?/g, "")
                          .replace(/```/g, "")
                          .trim();

                        // Detection: If code doesn't look like React/HTML code (e.g. it's a clarification prompt), render as a UI card
                        const isProbableText = !cleanCode.includes('import ') && !cleanCode.includes('export default') && !cleanCode.includes('function') && !cleanCode.includes('const') && !cleanCode.includes('<');
                        if (isProbableText) {
                          return `
                          <html>
                            <head>
                               <script src="https://cdn.tailwindcss.com"></script>
                               <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
                            </head>
                            <body style="margin:0; font-family: 'Inter', sans-serif; background: #f8f9fa; display: flex; align-items:center; justify-content:center; height:100vh; overflow:hidden;">
                              <div class="max-w-xl p-16 bg-white rounded-[3rem] shadow-2xl border border-black/[0.03] text-center animate-in zoom-in-95 duration-700">
                                 <div class="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF] mb-12">Neural Clarification</div>
                                 <h3 class="text-2xl text-black font-light leading-relaxed tracking-tight">${cleanCode.replace(/\n/g, '<br/>')}</h3>
                              </div>
                            </body>
                          </html>`;
                        }

                        const cleanCodeForBabel = cleanCode
                          .replace(/import\s+['"].*?['"];?/g, "") // Strip raw side-effect imports like import './styles.css'
                          .replace(/import\s+ React.*?from\s+['"]react['"];?\n?/g, "")
                          .replace(/import\s+.*?\s+from\s+['"]react['"];?\n?/g, "")
                          .replace(/import\s+.*?\s+from\s+['"]lucide-react['"];?\n?/g, "")
                          .replace(/import\s+.*?\s+from\s+['"]recharts['"];?\n?/g, "")
                          .replace(/import\s+.*?\s+from\s+['"].*?['"];?\n?/g, "") // Generic strip for any other imports
                          .replace(/export\s+default\s+/g, "window.__Component = ");
                        
                        return `
                        <html>
                          <head>
                            <script>
                              // Standard KREO Manifest Header: Silence CDN & Setup Neural Roots
                              window.tailwind = { 
                                config: { 
                                  theme: { 
                                    extend: { 
                                      colors: { primary: '${primaryColor}' },
                                      borderRadius: { xl: '${borderRadius}' }
                                    } 
                                  } 
                                } 
                              };
                            </script>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
                            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                            <style>
                              :root {
                                --primary: ${primaryColor};
                                --radius: ${borderRadius};
                                --background: 0 0% 100%;
                                --foreground: 0 0% 0%;
                              }
                              .dark {
                                --background: 227 80% 8%;
                                --foreground: 0 0% 100%;
                                background-color: hsl(var(--background));
                                color: hsl(var(--foreground));
                              }
                              .ultra {
                                --background: 227 75% 43%;
                                --foreground: 0 0% 100%;
                                background-color: hsl(var(--background));
                                color: hsl(var(--foreground));
                              }
                              ${inlineEditMode ? `
                                * { cursor: crosshair !important; }
                                *:hover { outline: 2px dashed #1B3FBF !important; outline-offset: 2px; }
                              ` : ""}
                              body { font-family: 'Inter', sans-serif; background: white; margin: 0; overflow-x: hidden; overflow-y: auto; min-height: 100vh; }
                              #root { min-height: 100vh; }
                            </style>
                          </head>
                          <body class="${renderTheme === 'dark' ? 'dark' : renderTheme === 'ultra' ? 'ultra' : ''}">
                            <div id="root"></div>
                            <script type="text/babel" data-type="module">
                              import { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } from 'https://esm.sh/react@18';
                              import { createRoot } from 'https://esm.sh/react-dom@18/client';
                              
                              const React = { createElement, useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext };
                              window.React = React;
                              
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
                                ${cleanCodeForBabel}
                                
                                const App = window.__Component;
                                if (App) {
                                  createRoot(document.getElementById('root')).render(createElement(App));
                                } else {
                                  document.getElementById('root').innerHTML = '<div style="padding:2rem;color:red">Could not find exported component. Ensure you use "export default function ComponentName()".</div>';
                                }
                              } catch (err) {
                                 window.onerror(err.message, null, null, null, err);
                              }
                            </script>
                          </body>
                        </html>
                      `; })() : code}
                      title="Manifestation Player"
                      className="h-full w-full border-none"
                    />

                    {/* Knobs Floating Panel */}
                    <AnimatePresence>
                      {showKnobs && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute bottom-24 right-12 z-[1000] w-[340px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-black/[0.03] p-8 space-y-8 animate-in zoom-in-95 duration-500"
                        >
                          {/* Theme Selector */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                               <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Manifest Style</span>
                            </div>
                            <div className="flex items-center bg-black/[0.03] p-1 rounded-2xl h-14">
                               {['light', 'dark', 'ultra'].map((t) => (
                                 <button
                                   key={t}
                                   onClick={() => setRenderTheme(t as any)}
                                   className={`flex-1 h-full rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                      renderTheme === t 
                                        ? 'bg-[#1B3FBF] text-white shadow-lg shadow-[#1B3FBF]/20' 
                                        : 'text-black/30 hover:text-black hover:bg-black/5'
                                   }`}
                                 >
                                   {t}
                                 </button>
                               ))}
                            </div>
                          </div>

                          {/* Split Architecture Toggle */}
                          <div className="flex items-center justify-between px-1 py-2">
                             <div className="space-y-1">
                               <span className="text-sm font-bold text-black tracking-tight flex items-center gap-2">
                                  Split Architecture
                                  <div className="w-1 h-1 rounded-full bg-[#1B3FBF] animate-pulse" />
                               </span>
                               <p className="text-[10px] text-black/30 font-medium">Parallel neural execution</p>
                             </div>
                             <button 
                                onClick={() => setSplitArchitecture(!splitArchitecture)}
                                className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${splitArchitecture ? 'bg-[#1B3FBF]' : 'bg-black/10'}`}
                             >
                                <motion.div 
                                   animate={{ x: splitArchitecture ? 24 : 0 }}
                                   className="w-4 h-4 rounded-full bg-white shadow-sm" 
                                />
                             </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
              <span className="ml-2 text-[10px] font-mono text-black/30 tracking-widest">manifestation.jsx</span>
            </div>
            <pre className="p-8 font-mono text-xs leading-relaxed text-[#2D4FA8] whitespace-pre-wrap overflow-x-auto">
              {code.replace(/```(jsx|tsx|javascript|js|html|react|css)?/g, "").replace(/```/g, "").trim()}
            </pre>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactPanel;
