import { useState, useRef, useEffect } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { 
  Eye, Code2, Copy, Download, RefreshCw, 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, RotateCcw,
  Share2, Play, MousePointer2, SlidersHorizontal, Settings2, Sparkles, FileArchive, Presentation, Image,
  Monitor, Smartphone
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

interface ArtifactPanelProps {
  code: string;
  prompt?: string;
  isSplitView?: boolean;
  onShare?: () => void;
  onRefinement?: (refinement: string) => void;
  readOnly?: boolean;
}

const ArtifactPanel = ({ code, prompt, isSplitView, onShare, onRefinement, readOnly }: ArtifactPanelProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [iframeId, setIframeId] = useState(0);
  const [copied, setCopied] = useState(false);
  const { t } = useLang();
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refinement Portal State
  const [refinementInput, setRefinementInput] = useState("");
  const [selectedElementContext, setSelectedElementContext] = useState<{ tag: string; text: string; x: number; y: number } | null>(null);
  
  // Design Features
  const [inlineEditMode, setInlineEditMode] = useState(false);
  const [showKnobs, setShowKnobs] = useState(false);
  const [renderTheme, setRenderTheme] = useState<'light' | 'dark' | 'ultra'>('light');
  const [splitArchitecture, setSplitArchitecture] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#1B3FBF");
  const [borderRadius, setBorderRadius] = useState("0.5rem");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "phone">("desktop");

  // Detect Presentation Mode
  const isPresentation = prompt?.toLowerCase().includes("ppt") || prompt?.toLowerCase().includes("presentation") || prompt?.toLowerCase().includes("slideshow");

  // Slide parser
  const slides = isPresentation ? (code.match(/<section[^>]*>([\s\S]*?)<\/section>/g) || [code]) : [code];

  const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

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

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifestation.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ELEMENT_CLICKED' && inlineEditMode) {
        setSelectedElementContext({
          tag: e.data.tag,
          text: e.data.text,
          x: e.data.x,
          y: e.data.y
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [inlineEditMode]);

  const submitRefinement = () => {
    if (!refinementInput.trim() || !onRefinement || !selectedElementContext) return;
    const fullRefinement = `In the ${selectedElementContext.tag} element containing "${selectedElementContext.text}", please: ${refinementInput}`;
    onRefinement(fullRefinement);
    setRefinementInput("");
    setSelectedElementContext(null);
  };

  // Robust Manifestation Engine
  const getManifestationSrcDoc = () => {
    const strippedCode = code
       .replace(/```(jsx|tsx|javascript|js|html|react-native|react)?/g, "")
       .replace(/```/g, "")
       .trim();

    if (isPresentation) {
      return `
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
              body { font-family: 'Inter', sans-serif; background: white; margin: 0; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; overflow-y: auto; }
              .font-serif { font-family: 'Instrument Serif', serif; }
              section { min-height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; box-sizing: border-box; }
            </style>
          </head>
          <body class="${renderTheme === 'dark' ? 'dark' : renderTheme === 'ultra' ? 'ultra' : ''}">
            ${slides[currentSlide]}
          </body>
        </html>
      `;
    }

    const isRawHtml = strippedCode.toLowerCase().startsWith("<!doctype") || strippedCode.toLowerCase().startsWith("<html");
    if (isRawHtml) return strippedCode;

    if (code.includes('MANIFEST_EN_ROUTE')) {
       return `<html><head><script src="https://cdn.tailwindcss.com"></script><style>@keyframes pulse-bg { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } } .pulse { animation: pulse-bg 2s infinite; }</style></head><body style="margin:0; background: #fff; display: flex; align-items:center; justify-content:center; height:100vh;"><div class="pulse text-black/20 font-black uppercase tracking-[0.5em]">Neural Orchestration</div></body></html>`;
    }

    const isProbableText = !strippedCode.includes('import ') && !strippedCode.includes('export default') && !strippedCode.includes('function') && !strippedCode.includes('const') && !strippedCode.includes('<');
    if (isProbableText) {
      return `<html><head><script src="https://cdn.tailwindcss.com"></script></head><body style="margin:0; background: #f8f9fa; display: flex; align-items:center; justify-content:center; height:100vh;"><div class="max-w-xl p-16 bg-white rounded-[3rem] shadow-2xl text-center"><div class="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B3FBF] mb-8">Neural Clarification</div><h3 class="text-xl font-light">${strippedCode.replace(/\n/g, '<br/>')}</h3></div></body></html>`;
    }

    let cleanCodeForBabel = strippedCode
      .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, "") // Full from imports
      .replace(/import\s+(['"].*?['"]|{.*?});?/g, "")      // Side effect or deconstructed imports
      .replace(/export\s+default\s+/g, "window.__Component = ")
      .replace(/export\s+(const|var|let|function|class)/g, "$1") // Strip named exports but keep the content
      .trim();

    try {
      const tags = (cleanCodeForBabel.match(/<([a-zA-Z1-6]+)(?:\s+[^>]*)?>/g) || []).map(t => t.match(/<([a-zA-Z1-6]+)/)![1]);
      const closingTags = (cleanCodeForBabel.match(/<\/([a-zA-Z1-6]+)>/g) || []).map(t => t.match(/<\/([a-zA-Z1-6]+)/)![1]);
      const stack: string[] = [];
      tags.forEach(t => { if (!['img', 'br', 'hr', 'input', 'meta', 'link'].includes(t.toLowerCase()) && !t.endsWith('/')) stack.push(t); });
      closingTags.forEach(t => { const idx = stack.lastIndexOf(t); if (idx !== -1) stack.splice(idx, 1); });
      cleanCodeForBabel += stack.reverse().map(t => `</${t}>`).join('');
    } catch (e) {}

    return `
      <html>
        <head>
          <script>window.tailwind = { config: { theme: { extend: { colors: { primary: '${primaryColor}' }, borderRadius: { xl: '${borderRadius}' } } } } };</script>
          <script src="https://cdn.tailwindcss.com"></script>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/lucide-react/dist/umd/lucide-react.js"></script>
          <script src="https://unpkg.com/recharts@2.15.3/umd/Recharts.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
          <style>
            :root { --primary: ${primaryColor}; --radius: ${borderRadius}; }
            .dark { background-color: #050a1f; color: white; }
            .ultra { background-color: #1a42f0; color: white; }
            body { font-family: 'Satoshi', sans-serif; margin: 0; min-height: 100vh; overflow-y: auto; }
            #root { min-height: 100vh; }
          </style>
        </head>
        <body class="${renderTheme === 'dark' ? 'dark' : renderTheme === 'ultra' ? 'ultra' : ''}">
          <div id="root"></div>
          <script>
            // Expose React hooks and UMD globals to window for AI-generated code
            const { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createElement, createContext, forwardRef, Fragment } = React;
            Object.assign(window, { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createElement, createContext, forwardRef, Fragment });

            // Expose Lucide icons individually
            if (window.LucideReact) {
              Object.entries(window.LucideReact).forEach(([k, v]) => { if (typeof v === 'function') window[k] = v; });
            }

            // Expose Recharts components
            if (window.Recharts) {
              Object.assign(window, window.Recharts);
            }

            // motion shim (framer-motion not available as UMD, provide basic passthrough)
            window.motion = new Proxy({}, {
              get: (_, tag) => React.forwardRef((props, ref) => React.createElement(tag, { ...props, ref }))
            });
            window.AnimatePresence = ({ children }) => children;

            window.onerror = (message, _src, lineno) => {
              document.getElementById('root').innerHTML =
                '<div style="padding:2rem 2.5rem;color:#c00;font-family:sans-serif;background:#fff0f0;border-left:4px solid #c00;margin:2rem;border-radius:1rem">' +
                '<b>Neural Manifest Collision</b><br/><code style="font-size:0.85rem">' + message + '</code>' +
                (lineno ? '<br/><small>Line: ' + lineno + '</small>' : '') + '</div>';
              return true;
            };
          </script>
          <script type="text/babel" data-presets="react">
            try {
              ${cleanCodeForBabel}
              const App = window.__Component;
              if (App) {
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
              } else {
                document.getElementById('root').innerHTML = '<div style="padding:2rem;color:orange;font-family:sans-serif">No default export found. Use <code>export default function YourComponent()</code>.</div>';
              }
            } catch (err) {
              window.onerror(err.message, null, null);
            }
          </script>
        </body>
      </html>
    `;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className={`flex flex-col h-full w-full bg-white shadow-xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden ${isFullscreen ? "fixed inset-0 z-[2000] rounded-none bg-black" : isPresentation ? "rounded-none" : isSplitView ? "" : "rounded-[2.5rem]"}`}>
      <div className={`flex items-center justify-between px-6 py-4 border-b border-black/[0.06] backdrop-blur-xl transition-all duration-500 ${isFullscreen ? "bg-black/90 text-white border-white/10" : "bg-white/95 text-black"}`}>
        <div className="flex items-center gap-4">
          {!isPresentation && (
            <div className={`flex p-1 rounded-xl border gap-0.5 ${isFullscreen ? "bg-white/5 border-white/10" : "bg-black/[0.04] border-black/[0.07]"}`}>
              <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold ${activeTab === "preview" ? "bg-[#1B3FBF] text-white" : "text-black/40"}`}><Eye size={13} /> {t.artifact_preview}</button>
              {!readOnly && <button onClick={() => setActiveTab("code")} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold ${activeTab === "code" ? "bg-[#1B3FBF] text-white" : "text-black/40"}`}><Code2 size={13} /> {t.artifact_code}</button>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isPresentation && (
            <div className="flex items-center rounded-xl border p-1 px-2 mr-3 bg-black/[0.02]">
              <button onClick={handlePrev} disabled={currentSlide === 0} className="p-1 px-3 text-[9px] font-bold">←</button>
              <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className="p-1 px-3 text-[9px] font-bold">→</button>
            </div>
          )}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-black/[0.03]">
             <button onClick={() => setDeviceMode("desktop")} className={`p-1.5 rounded-lg ${deviceMode === 'desktop' ? "bg-white text-black shadow-sm" : "text-black/40"}`}><Monitor size={14} /></button>
             <button onClick={() => setDeviceMode("phone")} className={`p-1.5 rounded-lg ${deviceMode === 'phone' ? "bg-white text-black shadow-sm" : "text-black/40"}`}><Smartphone size={14} /></button>
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 text-black/30 hover:text-[#1B3FBF]">{isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}</button>
          {!readOnly && <button onClick={() => setIframeId(i => i + 1)} className="p-2 text-black/30"><RefreshCw size={15} /></button>}
          {!readOnly && <button onClick={handleDownload} className="p-2 text-black/30"><Download size={15} /></button>}
          {!readOnly && (
            <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-xl">
               <button onClick={() => setInlineEditMode(!inlineEditMode)} className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${inlineEditMode ? "bg-[#1B3FBF] text-white" : "text-black/40"}`}>
                 <MousePointer2 size={13} fill={inlineEditMode ? "currentColor" : "none"} />
                 <span className="text-[10px] font-bold">Live Edit</span>
               </button>
               <button onClick={() => setShowKnobs(!showKnobs)} className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${showKnobs ? "bg-white text-black shadow-sm" : "text-black/40"}`}>
                 <Settings2 size={13} />
                 <span className="text-[10px] font-bold">Knobs</span>
               </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex bg-[#f7f8fc]">
        {isPresentation && !isFullscreen && activeTab === "preview" && (
          <div className="w-48 border-r bg-[#f8f9fa] flex flex-col p-4 gap-4 overflow-y-auto">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-full aspect-[16/9] rounded-xl border-2 transition-all ${currentSlide === idx ? "border-[#1B3FBF] scale-105" : "border-black/5"}`}>
                 <div className="text-[9px] font-bold text-center">Slide {idx + 1}</div>
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {(activeTab === "preview" || isPresentation) ? (
            <motion.div 
              layout
              className={`relative bg-white overflow-hidden shadow-2xl transition-all duration-700 ${isFullscreen ? "w-full h-full" : deviceMode === 'phone' ? "w-[375px] h-[760px] rounded-[3.5rem] border-[12px] border-black scale-90" : "w-full h-full"}`}
            >
              <div className="h-full w-full animate-in fade-in duration-700 bg-white overflow-hidden">
                <AnimatePresence>
                  {inlineEditMode && selectedElementContext && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed z-[3000] p-6 bg-black text-white rounded-[2rem] shadow-2xl space-y-4 w-[320px]" style={{ left: 20, bottom: 20 }}>
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/30"><span>Neural Refinement</span><button onClick={() => setSelectedElementContext(null)}>✕</button></div>
                      <textarea autoFocus value={refinementInput} onChange={(e) => setRefinementInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitRefinement(); } }} placeholder="Describe changes..." className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none placeholder:text-white/20 resize-none" />
                      <button onClick={submitRefinement} className="w-full py-3 bg-[#1B3FBF] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Manifest Refinement</button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={`${currentSlide}-${iframeId}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
                    {(() => {
                      const strippedCode = code
                        .replace(/```(jsx|tsx|javascript|js|html|react-native|react)?/g, "")
                        .replace(/```/g, "")
                        .trim();
                      
                      const isRawHtml = strippedCode.toLowerCase().startsWith("<!doctype") || strippedCode.toLowerCase().startsWith("<html");
                      const isReact = !isRawHtml && !isPresentation && (strippedCode.includes('import ') || strippedCode.includes('React') || strippedCode.includes('useState') || strippedCode.includes('Manifestation'));

                      if (isReact && !isPresentation) {
                        return (
                          <div className="h-full w-full sandpack-full-height">
                            <style>{`
                              .sandpack-full-height .sp-wrapper, 
                              .sandpack-full-height .sp-layout, 
                              .sandpack-full-height .sp-stack { 
                                height: 100% !important; 
                                border: none !important;
                                border-radius: 0 !important;
                                background: white !important;
                              }
                              .sp-preview-container { background: white !important; }
                            `}</style>
                            <Sandpack
                              template="react"
                              files={{
                                "/App.js": strippedCode,
                              }}
                              options={{
                                showPreview: true,
                                showCode: false,
                                showTabs: false,
                                showConsoleButton: false,
                                showRefreshButton: false,
                                showInlineErrors: true,
                                wrapContent: true,
                              }}
                              theme="light"
                            />
                          </div>
                        );
                      }

                      return (
                        <iframe 
                          key={`${iframeId}-${currentSlide}`} 
                          srcDoc={getManifestationSrcDoc()} 
                          title="Manifestation Player" 
                          className="h-full w-full border-none" 
                        />
                      );
                    })()}
                    {showKnobs && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute bottom-12 right-12 z-[1000] w-[340px] bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-8">
                        <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Manifest Style</span>
                          <div className="flex items-center bg-black/[0.03] p-1 rounded-2xl h-14">
                             {['light', 'dark', 'ultra'].map((t) => (
                               <button key={t} onClick={() => setRenderTheme(t as any)} className={`flex-1 h-full rounded-xl text-[9px] font-black uppercase transition-all ${renderTheme === t ? 'bg-[#1B3FBF] text-white' : 'text-black/30'}`}>{t}</button>
                             ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="space-y-1"><span className="text-sm font-bold">Split Architecture</span><p className="text-[10px] text-black/30">Parallel neural execution</p></div>
                           <button onClick={() => setSplitArchitecture(!splitArchitecture)} className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${splitArchitecture ? 'bg-[#1B3FBF]' : 'bg-black/10'}`}><div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-all ${splitArchitecture ? 'translate-x-6' : ''}`} /></button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="h-full w-full overflow-auto bg-white">
              <pre className="p-8 font-mono text-xs leading-relaxed text-[#2D4FA8] whitespace-pre-wrap">{code.replace(/```(jsx|tsx|javascript|js|html|react|css)?/g, "").replace(/```/g, "").trim()}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactPanel;
