import { useState, useRef, useEffect, useMemo } from "react";
import {
  Search, History, Settings, User, ArrowUp, ArrowDown, Monitor, Database, Smartphone,
  LayoutGrid, ChevronDown, ChevronLeft, Clock, Plus, Zap, FileText,
  Image as ImageIcon, BrainCircuit, Sparkles, Paperclip, Shuffle, MessageSquare, Mail,
  Share2, Globe, Link
} from "lucide-react";
import KreoLogo from "./KreoLogo";
import ArtifactPanel from "./ArtifactPanel";
import CloudFraming from "./CloudFraming";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { generateArtifact } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { createWorker } from "tesseract.js";
import Dither from "./Dither";
import { useToast } from "@/hooks/use-toast";

interface HomeScreenProps {
  onCloudBurst: () => void;
  setIsArtifactActive: (active: boolean) => void;
  setIsSubmittingGlobal: (submitting: boolean) => void;
  theme: "light" | "dark" | "ultra";
  setTheme: (theme: "light" | "dark" | "ultra") => void;
  isGuest?: boolean;
  onAuthRequired?: () => void;
}

const PLACEHOLDER_TEXTS = [
  "Create a project dashboard…",
  "Design a high-end landing page…",
  "Build a neumorphic widget…",
  "Generate a stylish login card…",
  "Make a minimal portfolio site…",
];

const NEURAL_PROMPTS = [
  "Manifest a high-fidelity PPT presentation for a VC pitch — cinematic slides, editorial typography, and architectural diagrams.",
  "Create a professional Excel-style financial manifest for a SaaS company with live charts, MRR tables, and layout-clean budgeting tool.",
  "Perform a neural PDF orchestration: manifest an interactive document viewer that identifies logical structures and extracts metadata.",
  "Build a SaaS pricing page with glassmorphism cards, animated gradient backgrounds, and a toggle between monthly/annual billing.",
  "Design a stunning personal portfolio for a motion designer — dark theme, smooth scroll, project cards with hover reveal.",
  "Create a real-time crypto dashboard with live-updating sparklines, portfolio tracker, and a dark editorial aesthetic.",
  "Make a cinematic movie streaming landing page with hero video mockup, genre filters, and neon accent colors.",
  "Build an AI chat interface with animated typing indicators, message bubbles, and a sidebar for conversation history.",
  "Create a luxury e-commerce product page for a high-end watch brand — full bleed image, specs accordion, and add-to-cart flow.",
  "Design a developer portfolio with a terminal-style hero, animated code snippets, and a project grid with tech stack tags.",
  "Make a fitness app home screen with progress rings, workout cards, daily streaks, and a vibrant coral color palette.",
  "Build a minimal notes app with rich text editing, tags, pinning, and a calm warm-beige aesthetic.",
  "Create a data analytics dashboard for a marketing team with funnel charts, KPI cards, and dark-mode table views.",
];

const SCENARIOS = [
  { t: "Meeting in 2 hours. No deck.", s: "The idea is there. The visuals aren't." },
  { t: "Flowchart for a 40-page PDF.", s: "The exam is tomorrow. You need it visual." },
  { t: "Startup needs a landing page.", s: "No dev team? No problem." },
  { t: "Mockup in 10 minutes.", s: "You promised. KREO delivers." },
  { t: "Scientific diagram check.", s: "Complex reality, simple manifestation." },
  { t: "Client pitch at noon.", s: "Wow them before they speak." }
];

const ScenariosGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {SCENARIOS.map((card, i) => (
      <div key={i} className="p-10 rounded-[2.5rem] border border-black/10 bg-white hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all group">
        <div className="space-y-4 text-left">
          <div className="w-10 h-10 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center text-[#1B3FBF] font-serif italic text-xl group-hover:scale-110 transition-transform">?</div>
          <h4 className="text-2xl font-serif italic text-black leading-tight">{card.t}</h4>
          <p className="text-sm text-black/40 font-light italic font-serif leading-relaxed">{card.s}</p>
        </div>
      </div>
    ))}
  </div>
);

const SynthesisEngine = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
    {[
      { step: "01", title: "Cognitive Input", desc: "Describe your intent in plain language or upload a source manifest." },
      { step: "02", title: "Neural Orchestration", desc: "Our engine decomposes your logic and applies high-fidelity design weighting." },
      { step: "03", title: "Visual Manifestation", desc: "A functional, aesthetic outcome is generated in seconds." }
    ].map((item, i) => (
      <div key={i} className="space-y-6 text-center group">
        <div className="text-6xl font-serif italic text-black/5 group-hover:text-[#1B3FBF]/10 transition-colors duration-700">{item.step}</div>
        <h4 className="text-xl font-bold uppercase tracking-widest text-black">{item.title}</h4>
        <div className="h-[1px] w-12 mx-auto bg-[#1B3FBF]/20" />
        <p className="text-sm text-black/40 font-serif italic leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
);

const TypingKreo = () => {
  const [text, setText] = useState("");
  const target = "KREO";

  useEffect(() => {
    let index = 0;
    const t = setInterval(() => {
      setText(target.slice(0, index + 1));
      index++;
      if (index >= target.length) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in zoom-in-95 duration-1000">
      <div className="text-center w-full">
        <h1 className="text-[12vw] font-serif italic text-[#1B3FBF] tracking-tighter leading-none select-none">
          {text}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-2 inline-block w-[4px] h-[0.9em] bg-[#1B3FBF] align-middle" />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] opacity-20 mt-8">Manifesting Reality</motion.p>
      </div>
    </div>
  );
};

const ENHANCEMENT_ADJECTIVES = [
  "high-fidelity", "cinematic", "architectural", "editorial", "minimalist", "clean", "premium", "modern", "aesthetic", "functional", "orchestrated", "slick"
];

const ENHANCEMENT_PHRASES = [
  "with refined typography and balanced whitespace",
  "incorporating smooth parallax transitions and glassmorphism cards",
  "focusing on logical hierarchy and architectural spacing",
  "using a professional monochromatic palette with vibrant blue accents",
  "leveraging high-fidelity motion design and structural clarity"
];

const EXAMPLES = [
  "Scientific Diagrams", "Market Reports", "Logic Workflows", "Financial Models",
  "Flashcard Sets", "Landing Pages", "Mockup Suites", "Pitch Deck", "API Docs",
  "System Architecture", "Global Strategies", "User Experience Flow", "Legal Briefs",
  "Creative Scripts", "Project Roadmaps", "Course Curriculum", "SaaS Dashboards",
  "Portfolio Sites", "Budget Trackers", "Scientific Papers", "Audit Reports",
  "Marketing Funnels", "Product Wikis", "Hiring Pipelines", "Travel Guides",
  "E-commerce Checkouts", "Auth Flows", "Database Schemas", "Network Maps",
  "Org Charts", "Mind Maps", "Style Guides", "Brand Toolkits", "Event Planning",
  "Recipe Books", "Workout Plans", "Travel Itineraries", "Coding Sandboxes", "Learning Paths",
  "Task Dashboards", "Contact Cards", "Pricing Matrices", "Storyboards", "User Personas",
  "Competitor Analysis", "SWOT Manifests", "System Diagrams", "Social Media Feeds", "Newsletter Layouts",
  "Real Estate Listings", "Job Boards", "Community Portals", "Resource Libraries"
];

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const PossibilitiesPile: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const positions = useMemo(() => {
    return EXAMPLES.map((_, i) => {
      // Disperse cards across the entire container area to avoid dense overlaps
      const xPos = (Math.random() * 80 - 40); // spread across 80% width
      const yPos = (Math.random() * 65 - 20); // spread across height, slightly lower to clear header

      return {
        x: xPos,
        y: yPos,
        rotate: (Math.random() * 30) - 15
      };
    });
  }, []);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= EXAMPLES.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-white rounded-[4rem] border border-black/5 mt-10">
      {/* Central Focal Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-16 left-0 right-0 z-[200] text-center px-6 pointer-events-none"
      >
        <h2 className="text-4xl md:text-6xl font-serif italic text-[#1B3FBF] tracking-tighter leading-tight drop-shadow-sm">
          What you can do <br /> with KREO
        </h2>
      </motion.div>

      {EXAMPLES.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, y: 150 }}
          animate={{
            opacity: i < visibleCount ? 1 : 0,
            scale: i < visibleCount ? 1 : 1,
            x: `${positions[i].x}vw`,
            y: `${positions[i].y}vh`,
            rotate: positions[i].rotate,
            zIndex: i
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute px-8 py-4 rounded-[2.5rem] border border-white/10 shadow-lg flex items-center justify-center min-w-[200px] md:min-w-[260px] bg-[#1B3FBF] select-none hover:z-[100] transition-colors duration-500`}
        >
          <span className="text-white font-serif italic text-xl md:text-2xl font-medium tracking-tight leading-none text-center">{text}</span>
        </motion.div>
      ))}
    </div>
  );
};

const InteractiveVisualLoop = ({ theme }: { theme: string }) => {
  const [subPhase, setSubPhase] = useState(13);

  useEffect(() => {
    const sequence = [
      { p: 13, d: 4000 }, { p: 14, d: 4500 }, { p: 15, d: 6000 },
      { p: 0, d: 3500 }, { p: 1, d: 4000 }, { p: 2, d: 4000 },
      { p: 16, d: 6000 }, { p: 4, d: 3500 }, { p: 5, d: 5000 },
      { p: 17, d: 4500 }, { p: 7, d: 3500 }, { p: 8, d: 5000 },
      { p: 18, d: 6000 }, { p: 10, d: 3500 }, { p: 11, d: 5000 },
      { p: 12, d: 3000 }
    ];
    let time = 0;
    const timers = sequence.map(item => {
      time += item.d;
      return setTimeout(() => setSubPhase(item.p), time - item.d);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-[700px] flex flex-col items-center justify-center bg-white rounded-[4rem] border border-black/5 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {subPhase === 13 && (
          <motion.div key="s13" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 01 / Manifestation</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              An instant visualizer for your current imaginations.
            </h1>
            <div className="flex justify-center gap-2 pt-4">
              {[...Array(3)].map((_, i) => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />)}
            </div>
          </motion.div>
        )}

        {subPhase === 14 && (
          <motion.div key="s14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 02 / The Need</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              Sometimes you need apps, <br />
              <span className="text-[#1B3FBF] not-italic font-normal">but can't wait for someone to build it or a tool.</span>
            </h1>
          </motion.div>
        )}

        {subPhase === 15 && (
          <motion.div key="s15" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 03 / The Power</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              Studies show visuals have a great impact on many.
            </h1>
          </motion.div>
        )}

        {subPhase === 16 && (
          <motion.div key="s16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 04 / For Students</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              You don't always understand text or explanations...
            </h1>
            <h2 className="text-[#1B3FBF] text-4xl md:text-6xl font-normal px-6">but visuals help.</h2>
          </motion.div>
        )}

        {subPhase === 17 && (
          <motion.div key="s17" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 05 / Conviction</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              "I just wanna convince people to join me."
            </h1>
          </motion.div>
        )}

        {subPhase === 18 && (
          <motion.div key="s18" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-8">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Phase 06 / Speed</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              Why think? Just enter a vague prompt.
            </h1>
            <p className="text-[#1B3FBF] text-2xl md:text-4xl font-normal leading-none px-6">
              Something is better than nothing.
            </p>
          </motion.div>
        )}

        {(subPhase === 0 || subPhase === 4 || subPhase === 7 || subPhase === 10) && (
          <motion.div key="typing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-2xl border border-black/5 p-10 rounded-[2rem] bg-[#f8f9ff] mx-6">
            <div className="flex gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#1B3FBF]" />
              <div className="w-2 h-2 rounded-full bg-black/5" />
            </div>
            <div className="text-black/60 text-lg md:text-2xl font-serif italic tracking-tight leading-snug">
              {subPhase === 0 ? "Create a presentation on Global Energy Trends in 2026..." :
                subPhase === 4 ? "Manifest a physics flowchart for Motion in One Dimension..." :
                  subPhase === 7 ? "Build a sleek SaaS dashboard for crypto investment tracking..." :
                    "Generate a premium brand toolkit for an AI startup called NEURA..."}
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block w-[2px] h-[0.9em] bg-[#1B3FBF] align-middle" />
            </div>
          </motion.div>
        )}

        {(subPhase === 1 || subPhase === 2) && (
          <motion.div key="ppt" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="w-full max-w-5xl h-[500px] bg-white rounded-[3rem] p-0 shadow-2xl relative border border-black/5 flex overflow-hidden mx-6 scale-[0.8] md:scale-100 transition-all">
            <div className="w-1/4 bg-[#f8f9ff] border-r border-black/5 p-8 flex flex-col gap-4">
              <div className="h-4 w-20 bg-black/10 rounded-full mb-8" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-16 rounded-xl border ${i === (subPhase === 1 ? 0 : 1) ? 'bg-white border-[#1B3FBF] shadow-sm' : 'bg-black/5 border-transparent'} p-3 space-y-2`}>
                  <div className="h-1.5 w-1/2 bg-black/20 rounded-full" />
                  <div className="h-1.5 w-3/4 bg-black/10 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-16 flex flex-col justify-center relative">
              <div className="absolute top-12 right-12 text-black/10 text-[9px] font-black uppercase tracking-[0.4em]">SLIDE 0{subPhase}</div>
              <div className="space-y-8">
                <motion.h1 key={subPhase} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl md:text-5xl font-serif italic text-black leading-none tracking-tighter">
                  {subPhase === 1 ? "Efficiency Peak" : "The Grid Shift"}
                </motion.h1>
                <div className="flex items-center gap-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} transition={{ duration: 1 }} className="h-2 bg-[#1B3FBF]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Neural Analysis</span>
                </div>
                <p className="text-black/70 text-lg font-light max-w-2xl leading-relaxed">
                  {subPhase === 1 ? "Solar PV efficiency is projected to reach a record 28.5% by Q2 2026." :
                    "Smart grid connectivity increases by 42% across oceanic cables."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {subPhase === 5 && (
          <motion.div key="flow" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-5xl h-[550px] bg-white border border-black/5 rounded-[3rem] p-16 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center mx-6 scale-[0.7] md:scale-100 transition-all">
            <div className="flex flex-col items-center space-y-10 w-full relative">
              <div className="px-12 py-6 bg-[#f8f9ff] border border-black/5 rounded-[1.5rem] text-black font-serif italic text-3xl shadow-sm z-10">Translatory Motion</div>
              <div className="flex gap-12 pt-4 relative">
                {['Position', 'Velocity', 'Acceleration'].map((title, i) => (
                  <div key={i} className="flex flex-col items-center space-y-4">
                    <div className="px-6 py-4 bg-[#1B3FBF] rounded-2xl text-white font-bold tracking-widest text-xs uppercase shadow-xl">{title}</div>
                  </div>
                ))}
              </div>
              <div className="px-12 py-7 border-2 border-[#1B3FBF] bg-white rounded-[2rem] text-[#1B3FBF] font-serif italic text-4xl shadow-xl leading-none">Equations of Motion</div>
            </div>
          </motion.div>
        )}

        {subPhase === 8 && (
          <motion.div key="ui" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl h-[500px] bg-white border border-black/5 rounded-[3rem] shadow-2xl flex overflow-hidden mx-6 scale-[0.7] md:scale-100 transition-all">
            <div className="w-64 border-r border-black/5 bg-[#f8f9ff] p-10 space-y-10">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#1B3FBF]" /><span className="font-bold text-xs uppercase">Aesthetics UI</span></div>
            </div>
            <div className="flex-1 p-16 space-y-12">
              <div className="flex justify-between items-center"><h3 className="text-3xl font-serif italic text-black">Crypto Portfolio Explorer</h3><div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" /></div>
              <div className="grid grid-cols-2 gap-8">
                <div className="h-44 rounded-[2rem] bg-[#f8f9ff] border border-black/5 p-8 flex flex-col justify-between"><span className="text-4xl font-light text-black">$67,492.00</span><div className="h-2 bg-[#1B3FBF] rounded-full w-3/4" /></div>
                <div className="h-44 rounded-[2rem] bg-black p-8 flex flex-col justify-between"><span className="text-4xl font-light text-white">$ +14,250.40</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {subPhase === 11 && (
          <motion.div key="brand" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl h-[550px] bg-white border border-black/10 rounded-[4rem] shadow-2xl p-16 flex flex-col items-center justify-between mx-6 scale-[0.7] md:scale-100 transition-all overflow-hidden">
            <div className="flex-1 w-full grid grid-cols-2 gap-20">
              <div className="flex flex-col items-center justify-center space-y-10 border-r border-black/5">
                <div className="w-48 h-48 bg-black rounded-[3rem] flex items-center justify-center shadow-2xl"><span className="text-white font-serif text-9xl italic">N</span></div>
                <p className="text-black text-2xl font-black uppercase tracking-[0.3em] italic">Primary Wordmark</p>
              </div>
              <div className="space-y-16 justify-center flex flex-col">
                <div className="space-y-6"><div className="flex gap-6">{['#000000', '#1B3FBF', '#FACC15'].map((c, i) => <div key={i} className="w-14 h-14 rounded-2xl" style={{ backgroundColor: c }} />)}</div></div>
                <div className="space-y-1"><h2 className="text-5xl font-serif italic text-black">Instrument Serif</h2></div>
              </div>
            </div>
          </motion.div>
        )}

        {subPhase === 12 && (
          <div className="text-center space-y-4">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="block text-4xl md:text-8xl font-serif text-[#1B3FBF] tracking-tighter leading-none">Unlimited Potential.</motion.span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


import { PREMADE_ARTIFACTS } from "@/lib/premadeArtifacts";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomeScreen = ({
  onCloudBurst,
  setIsArtifactActive,
  setIsSubmittingGlobal,
  theme,
  setTheme,
  isGuest = false,
  onAuthRequired
}: HomeScreenProps) => {
  const [query, setQuery] = useState("");
  const [artifact, setArtifact] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSplitView, setIsSplitView] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Establishing Neural Link...");
  const [isIncomingPortal, setIsIncomingPortal] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant", content: string, display?: string }[]>([]);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<{ id: string, label: string, icon: any, desc: string } | null>(null);
  const [manifestCount, setManifestCount] = useState(0);
  const [hasUsedFreeTool, setHasUsedFreeTool] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ url: string, name: string, type: string, ocr?: string } | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentArtifactId, setCurrentArtifactId] = useState<string | null>(null);

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clarificationRequest, setClarificationRequest] = useState<{ question: string, options: string[] } | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL Synchronization: Load from URL ID if present
  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId && !currentArtifactId) {
      setIsIncomingPortal(true);
      const fetchFromUrl = async () => {
        try {
          const { data, error } = await supabase
            .from("artifacts")
            .select("*")
            .eq("id", urlId)
            .single();
          if (!error && data) {
            // Simulated delay for premium splash feel
            setTimeout(() => {
              setArtifact(data.code);
              setCurrentArtifactId(data.id);
              setQuery(data.prompt);
              setChatHistory([{ role: "user", content: data.prompt }, { role: "assistant", content: data.code, display: "Manifest restored from neural link." }]);
              setIsArtifactActive(true);
              setIsIncomingPortal(false);
            }, 2500); 
          } else {
            setIsIncomingPortal(false);
          }
        } catch (e) {
          setIsIncomingPortal(false);
        }
      };
      fetchFromUrl();
    }
  }, [searchParams, currentArtifactId, setIsArtifactActive]);

  // Update URL whenever currentArtifactId changes
  useEffect(() => {
    if (currentArtifactId) {
      window.history.replaceState(null, '', `/${currentArtifactId}`);
    }
  }, [currentArtifactId]);

  // Supabase Data Load
  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data, error } = await supabase
          .from("artifacts")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) setHistoryItems(data);
      }
    };
    loadData();
  }, []);

  // Hydrate local memory if it exists
  useEffect(() => {
    const localHistoryStr = localStorage.getItem('kreo_local_history');
    if (localHistoryStr) {
      try {
        const localHistoryTree = JSON.parse(localHistoryStr);
        if (localHistoryTree.length > 0) {
           setHistoryItems(prev => {
             const merged = [...prev, ...localHistoryTree];
             // Simple deduplication
             return Array.from(new Map(merged.map(item => [item.id, item])).values());
           });
        }
      } catch (e) {
        console.error("Local memory corrupted.");
      }
    }
  }, []);

  // Placeholder Animation
  useEffect(() => {
    const currentText = PLACEHOLDER_TEXTS[placeholderIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setPlaceholderText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholderText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex]);

  useEffect(() => {
    if (isSubmitting) {
      const messages = [
        "Calibrating Architectural Weight...",
        "Gathering Atmospheric Context...",
        "Orchestrating Visual Flow...",
        "Resolving Design Manifest...",
        "Finalizing Neural Geometry..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[i % messages.length]);
        i++;
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    setUserEmail("");
    setArtifact(null);
    setChatHistory([]);
    window.location.reload();
  };
  const handleHistoryItemClick = (item: any) => {
    setArtifact(item.code);
    setCurrentArtifactId(item.id);
    setQuery(item.prompt);
    setChatHistory([{ role: "user", content: item.prompt }, { role: "assistant", content: item.code, display: "Manifest restored from history." }]);
    setHistoryOpen(false);
    navigate(`/?id=${item.id}`, { replace: true });
  };

  const handleManifestClick = (title: string) => {
    setQuery(title);
    handleSubmit(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { setIsArtifactActive(!!artifact); }, [artifact, setIsArtifactActive]);

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== "string") e.preventDefault();
    const finalQuery = typeof e === "string" ? e : query;
    if (!finalQuery.trim() || isSubmitting) return;

    // GUEST PROTOCOL: If user is not authed, trigger the Auth manifestation before processing
    if (isGuest && onAuthRequired) {
      onAuthRequired();
      return;
    }

    // Neural Clarification Trigger for Broad/Vague Manifests
    const isPresentationRequest = finalQuery.toLowerCase().includes("ppt") ||
      finalQuery.toLowerCase().includes("presentation") ||
      finalQuery.toLowerCase().includes("slides");
    const isVagueRequest = !finalQuery.includes(" ") || finalQuery.length < 15;
    const isLoanRequest = /(loan|roi|interest)/i.test(finalQuery);
    
    if ((isPresentationRequest || isVagueRequest || isLoanRequest) && !clarificationRequest) {
      let question = "Establishing Manifest Parameters / Choose a design trajectory:";
      let options = [
        "Cinematic & Dark (Editorial focus)",
        "Clean & Minimalist (Professional clarity)",
        "Vibrant & Energetic (Impact-driven)",
        "Technical & Schematic (Detail-oriented)"
      ];

      if (isLoanRequest) {
        question = "Specify Neural Loan Parameters:";
        options = ["Home Loan Logic", "Personal Loan Model", "Business Capital Flow", "Auto-Finance Matrix"];
      } else if (isVagueRequest) {
        question = "Neural Link Detected Vague Intent / Clarify Path:";
        options = ["Dashboard Manifestation", "Landing Page Core", "Interactive Logic Map", "Presentation Deck"];
      }

      setClarificationRequest({ question, options });
      return;
    }

    setIsSubmitting(true);
    setIsSubmittingGlobal(true);
    setClarificationRequest(null);
    onCloudBurst();

    // High-Fidelity Research Detection for UI Feedback
    const isResearchPrompt = /(roi|bank|price|rate|current|latest|vs|compare|stats|statistics|market|stock)/i.test(finalQuery);
    if (isResearchPrompt) {
      setLoadingMessage("Orchestrating live market data & research analysis...");
    } else {
      setLoadingMessage("Manifesting neural architecture...");
    }

    if (manifestCount >= 3) {
      setPricingOpen(true);
      setIsSubmitting(false);
      setIsSubmittingGlobal(false);
      return;
    }

    try {
      const newUserMsg = { role: "user" as const, content: finalQuery };

      let optimisticId = "";
      if (!artifact) {
        optimisticId = 'opt-' + Date.now();
        setChatHistory([newUserMsg]);
        setHistoryItems(prev => [{
            id: optimisticId,
            prompt: finalQuery,
            code: "<!-- Manifesting... -->",
            created_at: new Date().toISOString()
        }, ...prev]);
        setCurrentArtifactId(optimisticId);
      } else {
        setChatHistory(prev => [...prev, newUserMsg]);
      }
      setManifestCount(prev => prev + 1);

      const historyToSend = artifact
        ? [...chatHistory, { role: "assistant" as const, content: `Current Code Base:\n\`\`\`tsx\n${artifact}\n\`\`\`` }]
        : [];

      // Background Prompt Enhancement Protocol
      const adj = ENHANCEMENT_ADJECTIVES[Math.floor(Math.random() * ENHANCEMENT_ADJECTIVES.length)];
      const phrase = ENHANCEMENT_PHRASES[Math.floor(Math.random() * ENHANCEMENT_PHRASES.length)];

      let backgroundEnhancedQuery = `Manifest a ${adj} ${finalQuery.trim()} ${phrase}.`;

      // PPT ENFORCEMENT PROTOCOL: Direct manifest to use <section> based slideshow architecture
      if (isPresentationRequest) {
        backgroundEnhancedQuery += `
          CRITICAL ARCHITECTURE: This is a MULTI-SLIDE PPT. 
          1. Use ONLY HTML/Tailwind. No external JS libraries.
          2. Structure each slide within <section class="h-screen w-screen flex flex-col items-center justify-center p-20 bg-white"> tags.
          3. Create a PROPER PPT from start to end (at least 5-7 slides: Title, Problem, Solution, Data/Charts, Team, Contact).
          4. Use high-fidelity editorial typography (font-serif italic) and architectural layout.
          5. EVERY SLIDE MUST BE WRAPPED IN <section> TAGS.
        `;
      }

      const code = await generateArtifact(backgroundEnhancedQuery, historyToSend, uploadedFile?.url, false);

      if (code) {
        setArtifact(code);
        setChatHistory(prev => [...prev, {
          role: "assistant",
          content: code,
          display: prev.length === 1
            ? "Design manifest established. You can now use 'Visual Editing' by describing refinements below."
            : "Manifest architecture updated according to your refinements."
        }]);

        // PERSISTENCE PROTOCOL: Save to Supabase History
        const { data: { user } } = await supabase.auth.getUser();
        const shareToken = Math.random().toString(36).substring(2, 12);
        
        const { data: newArtifact, error: insertError } = await supabase
          .from("artifacts")
          .insert({
            prompt: finalQuery,
            code: code,
            user_id: user ? user.id : null,
            is_public: true, // Automatically public for instant sharing
            share_token: shareToken
          })
          .select()
          .single();

          if (!insertError && newArtifact) {
            setHistoryItems(prev => [newArtifact, ...prev.filter(i => i.id !== optimisticId)]);
            setCurrentArtifactId(newArtifact.share_token || newArtifact.id);
            window.history.replaceState(null, '', `/${newArtifact.share_token || newArtifact.id}`);
          } else if (insertError) {
            console.warn("Neural Sync Interrupted. Failing over to Local Memory.", insertError);
            // Local Memory Fallback
            const localToken = Math.random().toString(36).substr(2, 10);
            const localId = 'local-' + localToken;
            const localArtifact = {
              id: localId,
              prompt: finalQuery,
              code: code,
              created_at: new Date().toISOString(),
              share_token: localToken
            };
            setHistoryItems(prev => [localArtifact, ...prev.filter(i => i.id !== optimisticId)]);
            setCurrentArtifactId(localToken);
            window.history.replaceState(null, '', `/${localToken}`);
            
            // Persist to local storage
            const existingLocal = JSON.parse(localStorage.getItem('kreo_local_history') || '[]');
            localStorage.setItem('kreo_local_history', JSON.stringify([localArtifact, ...existingLocal]));
            
            toast({
              title: "Local Memory Active",
              description: "Cloud sync failed. Manifest saved to secure local history.",
            });
          }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setIsSubmittingGlobal(false);
      setQuery("");
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-transparent">
      {/* High-Fidelity Dither Manifest — Neural Wave Exploration */}
      {(theme === 'light' || theme === 'dark') && (
        <Dither
          waveColor={theme === 'light' ? [0.9, 0.9, 0.9] : [0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      )}
      {!artifact && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-transparent backdrop-blur-3xl border-b border-white/5 transition-all">
          <div className="text-foreground group cursor-pointer max-w-[124px]" onClick={() => { setArtifact(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <KreoLogo />
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className={`rounded-full p-2 transition-all ${historyOpen ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-foreground"}`}
                >
                  <Clock size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>History</TooltipContent>
            </Tooltip>

            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ml-2 text-[10px] font-black uppercase tracking-widest ${toolsOpen
                  ? 'bg-primary border-primary text-white'
                  : (theme === 'light' ? 'bg-black/5 border-black/10 text-black/60 hover:text-black' : 'bg-white/5 border-white/10 text-white/60 hover:text-white')
                  }`}
              >
                <Zap size={14} /> Tools
              </button>

              {toolsOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-[100]">
                  <div className="space-y-4">
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20">Neural Tool Suite</span>
                    <div className="space-y-2">
                      {[
                        { id: "study", label: "Study Manifestor", icon: FileText, desc: "PDF to Instant Study Guide (1 Free Project)" },
                        { id: "flash", label: "Flash Architecture", icon: BrainCircuit, desc: "Image to Editable Flashcards" },
                        { id: "pdf", label: "Neural PDF", icon: Sparkles, desc: "Contextual Document Logic" }
                      ].map((tool, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (tool.id === "study" && hasUsedFreeTool) {
                              setPricingOpen(true);
                              setToolsOpen(false);
                            } else {
                              setActiveTool(tool);
                              setToolsOpen(false);
                              if (tool.id === "study") setHasUsedFreeTool(true);
                            }
                          }}
                          className="w-full p-4 rounded-2xl hover:bg-white/5 text-left transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <tool.icon size={16} className="text-primary group-hover:scale-110 transition-transform" />
                            <div className="space-y-0.5">
                              <div className="text-[11px] font-bold text-white tracking-widest uppercase">{tool.label}</div>
                              <div className="text-[9px] font-medium text-white/30 italic font-serif">{tool.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setFeedbackOpen(true)} className="rounded-full p-2 text-foreground/80 hover:text-foreground transition-all">
                  <MessageSquare size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Feedback & Contact</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setSettingsOpen(true)} className="rounded-full p-2 text-foreground/80 hover:text-foreground transition-all">
                  <Settings size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setProfileOpen(true)} className="rounded-full p-2 text-foreground/80 hover:text-foreground transition-all">
                  <User size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Account</TooltipContent>
            </Tooltip>
          </div>
        </header>
      )}

      {historyOpen && (
        <div className="fixed right-0 top-20 z-50 h-[calc(100vh-100px)] w-80 glass-panel border-l border-white/10 animate-in slide-in-from-right duration-300">
          <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">History</h3>
            <div className="space-y-3">
              {historyItems.map((item, i) => (
                <div key={i} className="group relative">
                  <button onClick={() => handleHistoryItemClick(item)} className="w-full text-left p-4 pr-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm truncate">
                    {item.prompt}
                  </button>
                  <button 
                    onClick={async (e) => {
                      e.stopPropagation();
                      const { error } = await supabase.from("artifacts").delete().eq("id", item.id);
                      if (!error) {
                        setHistoryItems(prev => prev.filter(h => h.id !== item.id));
                        toast({ title: "Manifest Purged", description: "Memory entry deleted from neural cloud." });
                      }
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSettingsOpen(false)} />
          <div className={`relative w-full max-w-sm p-8 rounded-[2.5rem] border animate-in zoom-in-95 duration-200 ${theme === 'light' ? 'bg-white border-black/5 shadow-2xl' : 'glass-panel border-white/10 shadow-2xl'}`}>
            <h2 className="text-2xl font-medium mb-8">Settings</h2>
            <div className="space-y-6">
              <div className="flex bg-foreground/5 p-1 rounded-2xl">
                {(["light", "dark", "ultra"] as const).map((m) => (
                  <button key={m} onClick={() => setTheme(m)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${theme === m ? "bg-foreground text-background shadow-lg" : "text-foreground/40"}`}>{m}</button>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="text-sm font-medium">Split View</div>
                <button onClick={() => setIsSplitView(!isSplitView)} className={`w-12 h-6 rounded-full transition-all relative ${isSplitView ? 'bg-primary' : 'bg-foreground/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isSplitView ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {profileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setProfileOpen(false)} />
          <div className={`relative w-full max-w-sm p-8 rounded-[2.5rem] border animate-in zoom-in-95 duration-200 ${theme === 'light' ? 'bg-white border-black/5' : 'glass-panel border-white/10'}`}>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="text-center">
                <div className="font-medium">{userEmail.split('@')[0]}</div>
                <div className="text-xs opacity-40">{userEmail}</div>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full py-4 bg-red-500/10 text-red-500 font-medium rounded-2xl hover:bg-red-500/20 transition-all">Sign Out</button>
          </div>
        </div>
      )}

      <main className={`flex flex-col relative z-20 overflow-x-hidden ${artifact && isSplitView ? "h-screen overflow-hidden" : ""}`}>
        {(isSubmitting && !artifact) || isIncomingPortal ? (
          <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Subtle warm gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-white to-[#fff8f0] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-14">
              {/* High-Fidelity Pulse Manifest */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#1B3FBF]/5 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 rounded-full bg-[#1B3FBF]/8 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.6s' }} />
                <div className="absolute inset-8 rounded-full bg-[#1B3FBF]/10 animate-pulse transition-all duration-1000 scale-110" />

                <div className="relative w-24 h-24 rounded-full bg-[#1B3FBF] flex items-center justify-center shadow-[0_0_80px_rgba(27,63,191,0.4)] animate-in zoom-in-50 duration-700">
                  <div className="w-4 h-4 rounded-full bg-white shadow-inner animate-[pulse_1.5s_ease-in-out_infinite]" />

                  {/* Orbiting Particles Manifest */}
                  <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                    <div className="w-2 h-2 rounded-full bg-white/40 absolute -top-1 left-1/2 -translate-x-1/2" />
                  </div>
                  <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              </div>

              {/* Wordmark Manifestation */}
              <div className="text-center">
                <h1 className="text-6xl italic tracking-tighter text-[#1B3FBF] mb-4 animate-in slide-in-from-bottom-2 duration-700" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Kreo</h1>
                <p className="text-[12px] font-black uppercase tracking-[0.7em] text-black/40 animate-pulse">
                  {isIncomingPortal ? "Restoring Neural Manifest..." : loadingMessage}
                </p>
              </div>
            </div>

            {/* Full-width progress bar at bottom */}
            <div className="fixed bottom-0 left-0 w-full h-[3px] bg-black/5">
              <div className="h-full bg-[#1B3FBF] animate-[loading_2s_ease-in-out_infinite]" />
            </div>

            <style>{`
              @keyframes loading {
                0% { width: 0%; transform: translateX(0); }
                50% { width: 60%; transform: translateX(60vw); }
                100% { width: 0%; transform: translateX(100vw); }
              }
            `}</style>
          </div>
        ) : artifact ? (
          <div className={`flex w-full h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
            {/* Chat Sidebar */}
            <div className={`${isSplitView ? "w-[420px] shrink-0" : "w-full max-w-4xl mb-6"} flex flex-col ${isSplitView ? "h-full" : "min-h-[50vh]"} overflow-hidden bg-[#f5f7ff] border-r border-black/[0.06]`}>
              <div className="shrink-0 flex justify-between items-center px-6 py-4 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
                <button
                  onClick={() => { setArtifact(null); setChatHistory([]); }}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/30 hover:text-[#1B3FBF] transition-all group"
                >
                  <ChevronLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20">Dialogue / Session</span>
                  {currentArtifactId && (
                    <button
                      onClick={async () => {
                        const shareUrl = `${window.location.origin}/share/${currentArtifactId}`;
                        await navigator.clipboard.writeText(shareUrl);
                        toast({ title: "Portal Link Manifested", description: "Successfully copied to clipboard." });
                      }}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3FBF]/20 bg-[#1B3FBF]/5 text-[#1B3FBF] text-[9px] font-black uppercase tracking-widest hover:bg-[#1B3FBF]/10 transition-all shadow-sm"
                    >
                      <Share2 size={12} /> Neural Share
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] rounded-2xl p-4 text-[13px] font-light leading-relaxed tracking-wide ${msg.role === 'user'
                      ? 'bg-[#1B3FBF] text-white rounded-tr-sm shadow-sm shadow-[#1B3FBF]/20'
                      : 'bg-white border border-black/[0.07] text-black/60 rounded-tl-sm shadow-sm'
                      }`}>
                      {msg.display || msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-black/[0.06] bg-white">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    className="w-full rounded-2xl px-6 py-4 pr-14 text-sm outline-none border border-black/[0.08] bg-[#f0f3ff] text-black placeholder:text-black/30 focus:border-[#1B3FBF]/60 focus:bg-white transition-all font-light disabled:opacity-40"
                    placeholder={isSubmitting ? "Orchestrating..." : "Refine the manifest..."}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isSubmitting ? (
                      <div className="p-2 bg-[#1B3FBF]/10 rounded-xl">
                        <div className="w-4 h-4 border-2 border-[#1B3FBF]/20 border-t-[#1B3FBF] rounded-full animate-spin" />
                      </div>
                    ) : (
                      <button type="submit" className="p-2.5 bg-[#1B3FBF] text-white rounded-xl shadow-lg shadow-[#1B3FBF]/30 hover:bg-[#2548d4] transition-all">
                        <ArrowUp size={14} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <ArtifactPanel
                code={artifact}
                prompt={query}
                isSplitView={isSplitView}
                onShare={() => setShareDialogOpen(true)}
              />
            </div>

            {/* HIGH-FIDELITY SHARE DIALOG */}
            {shareDialogOpen && (
              <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
                <div className="bg-white w-full max-w-lg rounded-[3rem] border border-black/5 shadow-2xl p-10 space-y-10 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#1B3FBF]/10 rounded-2xl">
                        <Share2 size={24} className="text-[#1B3FBF]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">Share Manifestation</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Google Docs Style Orchestration</p>
                      </div>
                    </div>
                    <button onClick={() => setShareDialogOpen(false)} className="text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black">Dismiss</button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-black/[0.03] border border-black/[0.05] rounded-[2rem] space-y-4">
                      <div className="flex items-center gap-3">
                        <Globe size={14} className="text-[#1B3FBF]" />
                        <span className="text-[11px] font-bold">Bridge Visibility</span>
                      </div>
                      <p className="text-xs text-black/40 leading-relaxed">Anyone with this high-fidelity link can view your manifestation. Editing access must be requested from the cloud portal.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 pl-2">Neural Share Link</div>
                      <div className="flex items-center gap-2 p-2 bg-black/[0.02] border border-black/5 rounded-2xl">
                        <input
                          readOnly
                          value={`${window.location.origin}/${currentArtifactId || 'unbound'}`}
                          className="flex-1 bg-transparent px-4 py-2 text-xs font-medium text-black/60 outline-none"
                        />
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(`${window.location.origin}/${currentArtifactId}`);
                            toast({ title: "Link Manifested", description: "Successfully copied to clipboard." });
                          }}
                          className="px-6 py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Cloud Sync Active</span>
                    </div>
                    <button
                      onClick={() => setShareDialogOpen(false)}
                      className="text-[10px] font-bold text-[#1B3FBF] hover:underline"
                    >
                      Manage Collaborators
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            {/* Landing Hero */}
            <section className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 pb-32">
              <div className="text-center space-y-4 pt-48 md:pt-64">
                <h1
                  className="text-7xl md:text-8xl font-light tracking-tighter leading-tight animate-in fade-in slide-in-from-top-12 duration-1000"
                  style={{
                    textShadow: theme === 'light'
                      ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff'
                      : theme === 'dark'
                        ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000'
                        : 'none'
                  }}
                >
                  Build your <br />
                  <span className="text-yellow-accent italic font-serif px-2" style={{ textShadow: theme === 'ultra' ? '0 0 80px rgba(255,215,0,0.2)' : 'none' }}>imagination</span>
                </h1>
                <p className={`text-[12px] font-black uppercase tracking-[0.8em] mt-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300 ${theme === 'light' ? 'text-[#1B3FBF]' : 'text-white/90'}`}>
                  Beyond your thought
                </p>
              </div>

              <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Neural Source Preview Manifest */}
                  {uploadedFile && (
                    <div className={`flex items-center gap-4 p-4 backdrop-blur-3xl border rounded-3xl w-max animate-in zoom-in-95 duration-500 relative group ${theme === 'light' ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'}`}>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 shadow-xl z-20"
                      >
                        ×
                      </button>
                      {uploadedFile.url ? (
                        <img src={uploadedFile.url} className={`w-12 h-12 rounded-xl object-cover border shadow-lg ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`} alt="Source" />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${theme === 'light' ? 'bg-primary/10 border-primary/20' : 'bg-primary/20 border-primary/30'}`}>
                          <FileText size={20} className="text-primary" />
                        </div>
                      )}
                      <div className="pr-4">
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${theme === 'light' ? 'text-black/40' : 'text-white/40'}`}>Source Manifest</div>
                        <div className={`text-[11px] font-bold tracking-wide truncate max-w-[120px] ${theme === 'light' ? 'text-black' : 'text-white'}`}>{uploadedFile.name}</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className={`flex items-center rounded-[1.8rem] px-6 py-4 shadow-2xl transition-all border ring-1 gap-3 ${theme === 'light' ? 'bg-white border-black/10 ring-black/5 text-black' : 'glass-panel border-white/20 ring-white/10 backdrop-blur-3xl text-white'}`}>
                      <div className={`flex items-center gap-2 pr-2 border-r leading-none ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*,.pdf,.txt"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              console.log("Neural Manifesting Source:", file.name);

                              const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
                              setUploadedFile({ url: previewUrl, name: file.name, type: file.type });

                              // BACKGROUND OCR - NO UI BLOCK
                              (async () => {
                                try {
                                  let extractedContent = "";

                                  if (file.type.startsWith('image/')) {
                                    const worker = await createWorker('eng');
                                    const ret = await worker.recognize(file);
                                    extractedContent = ret.data.text;
                                    await worker.terminate();
                                  } else {
                                    extractedContent = await file.text();
                                  }

                                  setUploadedFile(prev => prev ? { ...prev, ocr: extractedContent } : null);

                                  const { data: { user } } = await supabase.auth.getUser();
                                  if (user) {
                                    await supabase.from('manifest_documents').insert({
                                      user_id: user.id,
                                      source_name: file.name,
                                      source_type: file.type,
                                      source_size: file.size,
                                      neural_intent: extractedContent.substring(0, 500),
                                      vault_path: `manifests/${Date.now()}_${file.name}`,
                                      metadata: { ocr_full: extractedContent }
                                    });
                                  }
                                } catch (err) {
                                  console.error("Background Manifest Error:", err);
                                }
                              })();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className={`p-2 transition-all hover:scale-110 active:scale-90 tooltip-trigger ${theme === 'light' ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          <Paperclip size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const randomIdx = Math.floor(Math.random() * NEURAL_PROMPTS.length);
                            setQuery(NEURAL_PROMPTS[randomIdx]);
                          }}
                          className={`p-2 transition-all hover:scale-110 active:scale-90 ${theme === 'light' ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          <Shuffle size={20} />
                        </button>
                      </div>
                      <input
                        className={`flex-1 bg-transparent text-lg outline-none font-normal tracking-wide font-satoshi ${theme === 'light' ? 'placeholder:text-black/30 text-black' : 'placeholder:text-white/40 text-white'}`}
                        style={{ fontFamily: "'Satoshi', sans-serif" }}
                        placeholder={placeholderText}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <button type="submit" className="p-2.5 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          <ArrowUp size={20} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="flex flex-wrap justify-center gap-2 mt-10">
                    {[
                      { icon: Monitor, label: "Brand Landing" },
                      { icon: Database, label: "SaaS Platform" },
                      { icon: Smartphone, label: "Mobile App" },
                      { icon: LayoutGrid, label: "Visual Art" }
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubmit(item.label)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-[10px] tracking-widest uppercase transition-all font-bold ${theme === 'light'
                          ? 'bg-black/5 border-black/10 text-black hover:bg-black/10'
                          : 'glass-panel border-white/10 text-white hover:bg-white/10'
                          }`}
                      >
                        <item.icon size={12} className={theme === 'light' ? 'text-black/60' : 'text-white'} /> {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Simplified Know More Text Indicator */}
                  <div className="pt-20 md:pt-24 animate-bounce cursor-pointer flex flex-col items-center gap-2 group" onClick={() => {
                     document.getElementById('manifesto-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50 group-hover:text-white transition-colors">Know More</span>
                    <ArrowDown size={14} className="text-white/40 group-hover:text-white" />
                  </div>
                </div>
              </div>

            </section>

            {/* New Manifesto Section - Full Screen Coverage */}
            <section id="manifesto-section" className="w-full relative bg-white py-24 flex flex-col items-center z-30">
              <div className="w-full max-w-7xl px-6 space-y-24">
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]">The Situation</span>
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-black leading-tight">We all face situations...</h2>
                </div>

                <ScenariosGrid />

                <div className="text-center py-10 scale-90 md:scale-100">
                  <h2 className="text-3xl md:text-5xl font-serif italic tracking-tighter text-black/80 leading-tight">
                    So many problems but <br />
                    only one <span className="text-[#1B3FBF] not-italic font-normal">solution.</span>
                  </h2>
                </div>

                <TypingKreo />

                <div className="text-center space-y-8 pt-10">
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]">The Outcome</span>
                  <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter text-black leading-tight">Manifested from <br /> simple intentions</h2>
                </div>

                {/* Possibilities Pile Ported from Promo 4 - What you can do */}
                <div className="space-y-12">
                  <PossibilitiesPile />
                </div>

                {/* Interactive Visual Loop Ported from Promo 4 - Chat and Enter */}
                <div className="space-y-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-serif italic text-black">Live Manifestation Sequence</h3>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black/20 italic">Acoustic Signal Processing Active</p>
                    </div>
                    <div className="h-[1px] w-48 bg-black/5" />
                  </div>
                  <div className="relative group overflow-hidden rounded-[4.5rem]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#1B3FBF]/10 to-[#4F75FF]/10 rounded-[4.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="transition-all duration-1000">
                      <InteractiveVisualLoop theme={theme} />
                    </div>
                  </div>
                </div>

                {/* Synthesis Engine Process Section */}
                <div className="space-y-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-serif italic text-black">The Synthesis Engine</h3>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black/20 italic">Process Flow Architecture</p>
                    </div>
                    <div className="h-[1px] w-48 bg-black/5" />
                  </div>
                  <SynthesisEngine />
                </div>

                <div className="flex justify-center pt-16 pb-12">
                  <div className="max-w-4xl text-center space-y-10">
                    <div className="h-[1px] w-24 mx-auto bg-black/10" />
                    <p className="text-2xl md:text-4xl font-light font-serif italic leading-snug text-black/70">
                      KREO doesn't just write code. It <span className="font-normal not-italic text-black">orchestrates experiences</span> by understanding the logical weight of your words and manifesting them into functional, aesthetic reality.
                    </p>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 rounded-full border text-[11px] font-black uppercase tracking-[0.4em] shadow-xl transition-all hover:scale-105 active:scale-95 bg-black text-white hover:bg-black/80">Start Manifesting</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Pricing Manifest - High Fidelity Editorial Design */}
      {pricingOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-white/40 backdrop-blur-3xl animate-in fade-in duration-500 p-6">
          <div className="bg-white w-full max-w-4xl border border-black/[0.03] rounded-[3.5rem] relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh] custom-scrollbar">

            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#1B3FBF]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full p-10 md:p-14 overflow-y-auto custom-scrollbar">
              {/* Header Manifest */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-black/[0.05] pb-10">
                <div className="space-y-4 max-w-md">
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]">Tier Strategy</span>
                  <h2 className="text-7xl font-serif italic text-black tracking-tighter leading-[0.9]">Elevate your <br />vision</h2>
                </div>
                <button
                  onClick={() => setPricingOpen(false)}
                  className="px-8 py-3 rounded-full border border-black/10 text-[10px] font-black uppercase tracking-[0.4em] bg-black"
                >
                  Dismiss
                </button>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                {/* Free Tier - The Foundation */}
                <div className="group relative p-12 bg-[#f9faff] border border-black/[0.03] rounded-[3rem] transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-black/5 flex flex-col justify-between h-full">
                  <div className="space-y-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-serif italic text-black">Foundation</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Free Architecture</p>
                      </div>
                      <div className="text-4xl font-serif italic text-black">$0</div>
                    </div>
                    <div className="space-y-6">
                      {[
                        "3 Generations per week",
                        "Standard Manifest Logic",
                        "1 Trial Tool Set",
                        "Public Artifact Access"
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm text-black/40 font-light italic font-serif">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="mt-12 w-full py-5 rounded-2xl border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] bg-black">Current Tier</button>
                </div>

                {/* Pro Tier - The Orchestrator */}
                <div className="group relative p-12 bg-white border border-[#1B3FBF]/10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(27,63,191,0.1)] transition-all duration-700 hover:scale-[1.02] flex flex-col justify-between overflow-hidden h-full">
                  <div className="absolute top-0 right-0 py-2 px-8 bg-[#1B3FBF] text-white text-[9px] font-black uppercase tracking-widest rounded-bl-3xl">Most Manifested</div>

                  <div className="space-y-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-serif italic text-[#1B3FBF]">Ultra</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]/40">Professional Elite</p>
                      </div>
                      <div className="text-4xl font-serif italic text-black">$1 <span className="text-xs font-sans not-italic text-black/20 font-bold ml-1">/ mo</span></div>
                    </div>
                    <p className="text-xs text-black/60 italic font-serif leading-relaxed">Unlimited high-fidelity orchestration</p>
                    <div className="space-y-6">
                      {[
                        "Unlimited Generations",
                        "Manifest Document Studio (PDF/OCR)",
                        "Private Manifest Vault",
                        "High-Res Asset Export"
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm text-black/60 font-medium italic font-serif">
                          <div className="w-2 h-2 rounded-full bg-[#1B3FBF] shadow-[0_0_10px_rgba(27,63,191,0.4)]" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="mt-12 w-full py-6 bg-[#1B3FBF] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-[#1B3FBF]/30 hover:bg-[#2548d4] transform hover:-translate-y-1 transition-all">Elevate Identity</button>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-black/10 italic">Opal AI Systems Orchestration Layer Active</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Localized Tool Manifest Popup - High Fidelity Scrollable */}
      {activeTool && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center bg-white/20 backdrop-blur-3xl animate-in fade-in duration-500 p-6">
          <div className="bg-white/40 w-full max-w-4xl border border-white/30 rounded-[3rem] p-8 md:p-12 relative shadow-2xl backdrop-blur-3xl overflow-hidden flex flex-col h-auto max-h-[90vh]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />

            <div className="relative z-10 flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex justify-between items-start border-b border-black/5 pb-6 mb-8 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                    <activeTool.icon size={28} className="text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-primary">Neural Manifestor</span>
                    <h2 className="text-4xl font-light italic font-serif text-black tracking-tighter">{activeTool.label}</h2>
                  </div>
                </div>
                <button onClick={() => setActiveTool(null)} className="text-[10px] font-black uppercase text-black/40 hover:text-black tracking-[0.4em]">Dismiss</button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="max-w-md w-full p-10 bg-white/20 border border-white/40 border-dashed rounded-[2.5rem] text-center space-y-6 group cursor-pointer hover:bg-white/40 transition-all duration-700">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <Zap size={24} className="text-primary animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light font-serif italic text-black">Ready for Orchestration</h3>
                    <p className="text-black/40 text-sm font-light leading-relaxed font-serif italic">
                      Describe your intent or upload your source manifest (PDF/Image) to begin high-fidelity synthesis.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const prompts = {
                        study: "Create a comprehensive, visually-stunning study guide from this material. Extract key logical concepts and format them into a high-fidelity editorial manifest.",
                        flash: "Manifest a suite of interactive, editable flashcards from this intent. Focus on architectural clarity and rapid retrieval logic.",
                        pdf: "Perform high-level neural orchestration on this document. Identify logical structures, extract contextual metadata, and manifest a standalone analysis dashboard."
                      };
                      setQuery(prompts[activeTool.id as keyof typeof prompts] || "");
                      setActiveTool(null);
                      // Auto-focus the input after a short delay
                      setTimeout(() => {
                        const inputEl = document.querySelector('textarea');
                        if (inputEl) (inputEl as HTMLTextAreaElement).focus();
                      }, 100);
                    }}
                    className="px-10 py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    Start Manifestation
                  </button>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.6em] text-black/20 italic">Google Opal Reasoning Engine Active</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Review Modal - High Fidelity White Manifestation */}
      {feedbackOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => { setFeedbackOpen(false); setFeedbackSubmitted(false); setFeedbackRating(null); setFeedbackText(''); }} />
          <div className={`relative w-full max-w-lg rounded-[3rem] border-white/20 bg-white shadow-2xl animate-in zoom-in-95 duration-500 overflow-y-auto max-h-[90vh] custom-scrollbar`}>

            <div className="p-10 space-y-10 text-center">
              {/* Header */}
              <div className="space-y-1">
                <h2 className="text-4xl font-serif italic text-black tracking-tight leading-none">KREO</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black/20">YOUR FEEDBACK</p>
              </div>

              {feedbackSubmitted ? (
                <div className="py-12 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <h1 className="text-5xl font-serif italic text-[#1B3FBF]">Gracias! ❤️</h1>
                  <p className="text-sm font-light text-black/40 italic">Your vision helps us evolve the manifestation engine.</p>
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Face Emoji Manifestation */}
                  <div className="text-8xl animate-bounce" style={{ animationDuration: '3s' }}>
                    {['😡', '😕', '😐', '😊', '😍'][(feedbackRating || 3) - 1]}
                  </div>

                  {/* Clay Slider Design */}
                  <div className="px-6 space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feedbackRating || 3}
                      onChange={e => setFeedbackRating(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-[#1B3FBF]/10 rounded-full appearance-none cursor-pointer accent-[#1B3FBF]"
                    />
                    <div className="flex justify-between text-[10px] font-black uppercase text-black/10 tracking-widest px-1">
                      <span>Poor</span>
                      <span>Neutral</span>
                      <span>Loved it!</span>
                    </div>
                  </div>

                  {/* Feedback Input Manifest */}
                  <div className="text-left space-y-3">
                    <label className="text-xs font-serif italic text-black/40 ml-4">Suggestions?</label>
                    <textarea
                      value={feedbackText}
                      onChange={e => setFeedbackText(e.target.value)}
                      placeholder="Tell us what you'd like to visualize next..."
                      className="w-full rounded-[2rem] px-8 py-6 text-sm outline-none border border-black/5 bg-[#f5f7ff] text-black placeholder:text-black/20 focus:border-[#1B3FBF]/20 transition-all font-light resize-none h-32"
                    />
                  </div>

                  <div className="space-y-6">
                    <button
                      onClick={async () => {
                        setFeedbackSubmitting(true);
                        try {
                          const { data: { user } } = await supabase.auth.getUser();
                          await supabase.from('feedback').insert({
                            rating: feedbackRating || 3,
                            suggestion: feedbackText.trim() || null,
                            user_id: user?.id || null
                          });
                          setFeedbackSubmitted(true);
                        } catch (err) {
                          console.error('Feedback failed:', err);
                        } finally {
                          setFeedbackSubmitting(false);
                        }
                      }}
                      className="w-full py-6 bg-[#1B3FBF] text-white font-serif italic text-2xl rounded-2xl shadow-xl shadow-[#1B3FBF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {feedbackSubmitting ? 'Sending...' : 'Share Love'}
                    </button>

                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Contact Manifest</span>
                      <a href="mailto:kreoai.teams@gmail.com" className="text-[#1B3FBF] text-sm font-semibold hover:underline">kreoai.teams@gmail.com</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HIGH-FIDELITY SHARE DIALOG */}
      {shareDialogOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-lg rounded-[3rem] border border-black/5 shadow-2xl p-10 space-y-10 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/5 rounded-2xl">
                  <Share2 size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-black">Share Artifact</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Instantly share your manifestation across the neural web.</p>
                </div>
              </div>
              <button onClick={() => setShareDialogOpen(false)} className="text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black">Dismiss</button>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-black/[0.03] border border-black/[0.05] rounded-[2rem] space-y-4">
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-[#1B3FBF]" />
                  <span className="text-[11px] font-bold">Bridge Visibility</span>
                </div>
                <p className="text-xs text-black/40 leading-relaxed">Anyone with this high-fidelity link can view your manifestation. Editing access must be requested from the cloud portal.</p>
              </div>

              <div className="space-y-2">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 pl-2">Neural Share Link</div>
                <div className="flex items-center gap-2 p-2 bg-black/[0.02] border border-black/5 rounded-2xl">
                  <input
                    readOnly
                    value={`${window.location.origin}/${currentArtifactId || 'unbound'}`}
                    className="flex-1 bg-transparent px-4 py-2 text-xs font-medium text-black/60 outline-none"
                  />
                  <button
                    onClick={async () => {
                      if (!currentArtifactId) return;
                      await navigator.clipboard.writeText(`${window.location.origin}/${currentArtifactId}`);
                      toast({ title: "Link Manifested", description: "Successfully copied to clipboard." });
                    }}
                    className="px-6 py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Cloud Sync Active</span>
              </div>
              <button
                onClick={() => setShareDialogOpen(false)}
                className="text-[10px] font-bold text-[#1B3FBF] hover:underline"
              >
                Manage Collaborators
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
