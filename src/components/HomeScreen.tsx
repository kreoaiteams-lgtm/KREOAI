import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  Search, History, Settings, User, ArrowUp, ArrowDown, Monitor, Database, Smartphone,
  LayoutGrid, ChevronDown, ChevronLeft, Clock, Plus, Zap, FileText, X, Activity,
  Image as ImageIcon, BrainCircuit, Sparkles, Paperclip, Shuffle, MessageSquare, Mail,
  Share2, Globe, Link as LinkIcon, Copy, Info, CheckCircle2, Crown, Star, Volume2, ShieldCheck, UserPlus,
  Presentation, Code2, Table2, GitGraph, Smile
} from "lucide-react";

import { narrateText, generateBio } from "@/lib/ai";
import KreonCard from "./KreonCard";

import KreoLogo from "./KreoLogo";
import ArtifactPanel from "./ArtifactPanel";
import CloudFraming from "./CloudFraming";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { generateArtifact } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { createWorker } from "tesseract.js";
import Dither from "./Dither";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

interface HomeScreenProps {
  onCloudBurst: () => void;
  setIsArtifactActive: (active: boolean) => void;
  setIsSubmittingGlobal: (submitting: boolean) => void;
  theme: "light" | "dark" | "ultra";
  setTheme: (theme: "light" | "dark" | "ultra") => void;
  isGuest?: boolean;
  onAuthRequired?: () => void;
  urlId?: string;
}

const PLACEHOLDER_TEXTS = [
  "Create a project dashboard…",
  "Design a high-end landing page…",
  "Build a neumorphic widget…",
  "Generate a stylish login card…",
  "Make a minimal portfolio site…",
  "Make an About Us page for Dhruv Gautam…",
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
      { step: "02", title: "Visual Orchestration", desc: "Our engine decomposes your intent and applies high-fidelity design weighting." },
      { step: "03", title: "Digital Manifestation", desc: "A functional, aesthetic outcome is generated in seconds." }
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

const PossibilitiesPile: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const positions = useMemo(() => {
    return EXAMPLES.map((_, i) => {
      const xPos = (Math.random() * 80 - 40); 
      const yPos = (Math.random() * 65 - 20); 

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
          className={`absolute px-8 py-4 rounded-[2.5rem] border border-white/10 shadow-lg flex items-center justify-center min-w-[200px] md:min-w-[260px] bg-[#1B3FBF] select-none hover:z-[100] transition-all duration-500 hover:scale-110 active:scale-95`}
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

const HomeScreen = ({
  onCloudBurst,
  setIsArtifactActive,
  setIsSubmittingGlobal,
  theme,
  setTheme,
  isGuest = false,
  onAuthRequired,
  urlId: propUrlId
}: HomeScreenProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(() => localStorage.getItem('kreo_last_query') || "");
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
  const [showUpgradePop, setShowUpgradePop] = useState(false);
  const [manifestCount, setManifestCount] = useState(0);
  const [isPro, setIsPro] = useState(localStorage.getItem('is_kreo_pro') === 'true');

  const [uploadedFile, setUploadedFile] = useState<{ url: string, name: string, type: string, ocr?: string } | null>(() => {
    const saved = localStorage.getItem('kreo_last_upload');
    return saved ? JSON.parse(saved) : null;
  });
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentArtifactId, setCurrentArtifactId] = useState<string | null>(() => localStorage.getItem('kreo_last_id'));
  const [showKreonModal, setShowKreonModal] = useState(false);
  const [residentBio, setResidentBio] = useState(() => localStorage.getItem('kreo_resident_bio') || "");
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [interviewPhase, setInterviewPhase] = useState(0);
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>([]);
  const [interviewQuery, setInterviewQuery] = useState("");

  const INTERVIEW_QUESTIONS = [
    "What is the primary creative weapon you bring to the KREO registry?",
    "If you could manifest one change in reality instantly, what would it be?",
    "Which environment or atmosphere fuels your neural manifest the most?"
  ];

  const handleInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewQuery.trim()) return;

    const newAnswers = [...interviewAnswers, interviewQuery];
    setInterviewAnswers(newAnswers);
    setInterviewQuery("");

    if (interviewPhase < 2) {
      setInterviewPhase(interviewPhase + 1);
    } else {
      setIsInterviewing(false);
      setLoadingMessage("Synthesizing your Resident Bio...");
      setIsSubmitting(true);
      const bio = await generateBio(newAnswers);
      setResidentBio(bio);
      localStorage.setItem('kreo_resident_bio', bio);
      setIsSubmitting(false);
      setShowKreonModal(true);
    }
  };

  useEffect(() => {
    localStorage.setItem('kreo_last_query', query);
  }, [query]);

  useEffect(() => {
    if (uploadedFile) {
        localStorage.setItem('kreo_last_upload', JSON.stringify(uploadedFile));
    } else {
        localStorage.removeItem('kreo_last_upload');
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (currentArtifactId) {
        localStorage.setItem('kreo_last_id', currentArtifactId);
    } else {
        localStorage.removeItem('kreo_last_id');
    }
  }, [currentArtifactId]);

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clarificationRequest, setClarificationRequest] = useState<{ question: string, options: string[] } | null>(null);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const urlId = propUrlId || searchParams.get("id") || (window.location.pathname.startsWith('/share/') ? window.location.pathname.split('/').pop() : null);

    if (urlId && urlId !== "" && !artifact && !isIncomingPortal) {
      setIsIncomingPortal(true);
      const fetchFromUrl = async () => {
        try {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          const isUuid = (urlId && uuidRegex.test(urlId));

          let query = supabase.from("artifacts").select("*");
          if (isUuid) {
            query = query.or(`share_token.eq.${urlId},id.eq.${urlId}`);
          } else {
            query = query.eq("share_token", urlId);
          }

          const { data, error } = await query.single();

          if (!error && data) {
            setTimeout(() => {
              setArtifact(data.code);
              setCurrentArtifactId(data.share_token || data.id);
              setQuery(data.prompt);
              setChatHistory([{ role: "user", content: data.prompt }, { role: "assistant", content: data.code, display: "Manifest restored from neural link." }]);
              setIsArtifactActive(true);
              setIsIncomingPortal(false);
            }, 1000); // Faster restore
            return;
          }

          const localHistory = JSON.parse(localStorage.getItem('kreo_local_history') || '[]');
          const localMatch = localHistory.find((h: any) => h.share_token === urlId || h.id === urlId);

          if (localMatch) {
            setArtifact(localMatch.code);
            setCurrentArtifactId(localMatch.share_token || localMatch.id);
            setQuery(localMatch.prompt);
            setChatHistory([{ role: "user", content: localMatch.prompt }, { role: "assistant", content: localMatch.code, display: "Manifest restored from local neural buffer." }]);
            setIsArtifactActive(true);
            setIsIncomingPortal(false);
          } else {
            setIsIncomingPortal(false);
          }
        } catch (err) {
          setIsIncomingPortal(false);
        }
      };
      fetchFromUrl();
    } else if (!urlId && artifact && !isSubmitting) {
      // Manual navigation to root / with no ID while an artifact is currently set
      setArtifact(null);
      setCurrentArtifactId(null);
      setChatHistory([]);
      setIsArtifactActive(false);
    }
  }, [searchParams, location.pathname, artifact, isIncomingPortal, isSubmitting]);

  useEffect(() => {
    if (currentArtifactId && !currentArtifactId.startsWith('opt-')) {
      const newPath = `/share/${currentArtifactId}`;
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath);
      }
    } else if (!currentArtifactId && window.location.pathname !== '/' && window.location.search === '') {
      window.history.replaceState(null, '', '/');
    }
  }, [currentArtifactId]);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || "");
        const { data, error } = await supabase
          .from("artifacts")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) setHistoryItems(data);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const localHistoryStr = localStorage.getItem('kreo_local_history');
    if (localHistoryStr) {
      try {
        const localHistoryTree = JSON.parse(localHistoryStr);
        if (localHistoryTree.length > 0) {
          setHistoryItems(prev => {
            const merged = [...prev, ...localHistoryTree];
            return Array.from(new Map(merged.map(item => [item.id, item])).values());
          });
        }
      } catch (e) {
        console.error("Local memory corrupted.");
      }
    }
  }, []);

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

    const isPresentationRequest = finalQuery.toLowerCase().includes("ppt") ||
      finalQuery.toLowerCase().includes("presentation") ||
      finalQuery.toLowerCase().includes("slides");
    const isVagueRequest = !finalQuery.includes(" ") || finalQuery.length < 15;
    const isLoanRequest = /(loan|roi|interest)/i.test(finalQuery);

    if ((isPresentationRequest || isVagueRequest || isLoanRequest) && !clarificationRequest) {
      if (finalQuery.trim().split(" ").length >= 4) {
      } else {
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
    }

    setIsSubmitting(true);
    setIsSubmittingGlobal(true);
    setClarificationRequest(null);
    onCloudBurst();

    const isResearchPrompt = /(roi|bank|price|rate|current|latest|vs|compare|stats|statistics|market|stock)/i.test(finalQuery);
    if (isResearchPrompt) {
      setLoadingMessage("Orchestrating live market data & research analysis...");
    } else {
      setLoadingMessage("Generating visual manifestation...");
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

      const adj = ENHANCEMENT_ADJECTIVES[Math.floor(Math.random() * ENHANCEMENT_ADJECTIVES.length)];
      const phrase = ENHANCEMENT_PHRASES[Math.floor(Math.random() * ENHANCEMENT_PHRASES.length)];

      const formsReactRequest = finalQuery.toLowerCase().includes("react");
      const isInteractiveApp = /(dashboard|app|tool|interactive|calculator|widget|game)/i.test(finalQuery);
      const isStoryboardRequest = /(storyboard|story board|script|dialogue|scene)/i.test(finalQuery);
      const hasThemeSpecified = /(dark|black|neon|vibrant|colorful|night)/i.test(finalQuery);

      let backgroundEnhancedQuery = `Manifest a ${adj} visual experience for ${finalQuery.trim()} ${phrase}. DO NOT create a blueprint or documentation layout; build a LIVE, interactive, and high-fidelity product interface.`;

      // Default to Light Editorial if no theme is specified
      if (!hasThemeSpecified) {
        backgroundEnhancedQuery += ` DEFAULT THEME: Use a "Clean Light Editorial" aesthetic (White background, black text, royal blue accents). `;
      }

      if (isPresentationRequest && !formsReactRequest) {
        backgroundEnhancedQuery += `
          CRITICAL ACTION: This is a MULTI-SLIDE PPT. 
          1. Use ONLY HTML/Tailwind. No external JS libraries.
          2. Structure each slide within <section class="h-screen w-screen flex flex-col items-center justify-center p-24 bg-white"> tags.
          3. Create a STUNNING PPT from start to end (at least 5-8 slides: Title, Narrative, Data Visuals, Outcome).
          4. Use high-fidelity editorial typography (font-serif italic) and clean whitespace.
          5. EVERY SLIDE MUST BE WRAPPED IN <section> TAGS.
        `;
      } else if (isStoryboardRequest) {
        backgroundEnhancedQuery += `
          CRITICAL ORCHESTRATION: This is a HIGH-FIDELITY VISUAL STORYBOARD.
          1. Structure the layout as a CINEMATIC VERTICAL PROGRESSION.
          2. USE PROPER SCRIPT FORMATTING: Character names in Bold, Dialogues in centered or distinct blocks.
          3. Include "Visual Direction" notes in a small, italic, professional font.
          4. Use subtle dividers or architectural spacing between scenes.
          5. Ensure distinct dialogue labels for every line of speech.
        `;
      } else if (formsReactRequest || isInteractiveApp) {
        backgroundEnhancedQuery += `
          CRITICAL ARCHITECTURE: You may use REACT for this manifestation.
          1. This MUST be a SINGLE-FILE REACT COMPONENT.
          2. Use React hooks (useState, useEffect, etc.) via the 'React' global if needed.
          3. Use ONLY Lucide-React icons (access via standard component names).
          4. Use ONLY Tailwind CSS for all styling and animations.
          5. Export ONE single default functional component.
          6. RETURN THE PURE RAW CODE ONLY. 
          7. DO NOT use markdown code blocks (no triple backticks).
          8. DO NOT include any explanations, preambles, or post-scripts.
          9. Focus on a high-fidelity, functional application interface.
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

        const { data: { user } } = await supabase.auth.getUser();
        const shareToken = crypto.randomUUID();

        // Mirror to Local Neural Buffer (Guest Persistence)
        const localHistory = JSON.parse(localStorage.getItem('kreo_local_history') || '[]');
        const localEntry = {
          id: shareToken,
          share_token: shareToken,
          prompt: finalQuery,
          code: code,
          created_at: new Date().toISOString()
        };
        const updatedLocal = [localEntry, ...localHistory].slice(0, 20);
        localStorage.setItem('kreo_local_history', JSON.stringify(updatedLocal));

        const { data: newArtifact, error: insertError } = await supabase
          .from("artifacts")
          .insert({
            prompt: finalQuery,
            code: code,
            user_id: user ? user.id : null,
            is_public: true,
            share_token: shareToken
          })
          .select()
          .single();

        if (!insertError && newArtifact) {
          setHistoryItems(prev => [newArtifact, ...prev.filter(i => i.id !== optimisticId)]);
          setCurrentArtifactId(newArtifact.share_token || newArtifact.id);
        } else {
          // If cloud sync fails (guest or network), fallback to local buffer for visibility
          if (!user) {
            setHistoryItems(updatedLocal);
          }
        }
        
        // Show upgrade popup after first manifestation
        if (manifestCount === 1) {
          setTimeout(() => setShowUpgradePop(true), 2000);
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
      {!artifact && !isSubmitting && !isIncomingPortal && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-transparent backdrop-blur-3xl border-b border-white/5 transition-all">
          <div className="text-foreground group cursor-pointer max-w-[150px]" onClick={() => { setArtifact(null); setCurrentArtifactId(null); setChatHistory([]); window.history.replaceState(null, '', '/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <KreoLogo isPro={isPro} />
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

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/landing#about')}
                  className="rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all"
                >
                  <Info size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>About Us</TooltipContent>
            </Tooltip>

            <button
              onClick={() => navigate('/pricing')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ml-2 text-[10px] font-black uppercase tracking-widest ${
                theme === 'light' ? 'bg-[#0020C2] text-white border-[#0020C2]' : 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
              } hover:scale-105 active:scale-95`}
            >
              <Crown size={12} /> Pricing
            </button>

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
        <div className="fixed right-0 top-20 z-50 h-[calc(100vh-100px)] w-80 glass-panel border-l border-white/10 animate-in slide-in-from-right duration-300 shadow-2xl overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Manifest History</h3>
            <div className="space-y-4">
              {historyItems.map((item, i) => (
                <div key={i} className="group relative">
                  <button onClick={() => handleHistoryItemClick(item)} className="w-full text-left p-4 pr-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm truncate font-light">
                    {item.prompt}
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
            <h2 className="text-2xl font-serif italic mb-8">Atmosphere Control</h2>
            <div className="space-y-6">
              <div className="flex bg-foreground/5 p-1 rounded-2xl">
                {(["light", "dark", "ultra"] as const).map((m) => (
                  <button key={m} onClick={() => setTheme(m)} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === m ? "bg-[#0020C2] text-white shadow-lg" : "text-foreground/40"}`}>{m}</button>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0020C2]/5 border border-[#0020C2]/10">
                <div className="text-sm font-medium">Split Architecture</div>
                <button onClick={() => setIsSplitView(!isSplitView)} className={`w-12 h-6 rounded-full transition-all relative ${isSplitView ? 'bg-[#0020C2]' : 'bg-foreground/10'}`}>
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
              <div className="w-20 h-20 rounded-full bg-[#0020C2] flex items-center justify-center text-white text-3xl font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="text-center">
                <div className="font-serif italic text-xl">{userEmail.split('@')[0]}</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{userEmail}</div>
              </div>
            </div>
            <button 
              onClick={() => { setShowKreonModal(true); setProfileOpen(false); }} 
              className="w-full py-4 mb-3 border border-[#1B3FBF]/20 bg-[#1B3FBF]/5 text-[#1B3FBF] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#1B3FBF]/10 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={14} /> View KREON ID
            </button>
            <button onClick={handleLogout} className="w-full py-4 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-500/20 transition-all">Sign Out Portal</button>
          </div>
        </div>
      )}

      <main className={`flex flex-col relative z-20 overflow-x-hidden ${artifact && isSplitView ? "h-screen overflow-hidden" : ""}`}>
        {(isSubmitting && !artifact) || isIncomingPortal ? (
           <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white overflow-hidden">
              {/* Dismiss Button */}
              <button 
                onClick={() => { setIsSubmitting(false); setIsIncomingPortal(false); }}
                className="absolute top-10 right-10 z-[100] w-12 h-12 rounded-full glass-panel border border-black/5 flex items-center justify-center text-black/40 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/5 transition-all shadow-sm group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-white to-[#fff8f0] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-14 w-full h-full justify-center">
              
              {/* High-Fidelity Neural Archetypes scattered around the screen */}
              <div className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none">
                 <div className="relative h-full w-full">
                    {[
                      { delay: 0.2, x: "-35%", y: "-38%", type: "pricing", title: "Ultra Tier", value: "$49/mo" },
                      { delay: 1.0, x: "32%", y: "-42%", type: "metric", title: "Neural Fidelity", value: "99.2%" },
                      { delay: 1.8, x: "-38%", y: "25%", type: "toggle", title: "Real-time Sync", active: true },
                      { delay: 0.5, x: "38%", y: "35%", type: "chart", title: "Project Growth" },
                      { delay: 1.5, x: "-18%", y: "42%", type: "profile", name: "Dhruv Gautam", role: "Archon" },
                      { delay: 2.2, x: "42%", y: "-15%", type: "skeleton", height: "40px", width: "120px" },
                      { delay: 0.8, x: "0%", y: "45%", type: "skeleton", height: "20px", width: "200px" },
                      { delay: 3.0, x: "-45%", y: "-10%", type: "skeleton", height: "100px", width: "80px" }
                    ].map((frag, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: frag.delay, 
                          duration: 2.5, 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                        className="absolute p-4 md:p-6 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-2xl flex flex-col gap-3 min-w-[180px] group hover:border-[#1B3FBF]/20 transition-all duration-1000"
                        style={{ left: `50%`, top: `50%`, transform: `translate(${frag.x}, ${frag.y})` }}
                      >
                         {frag.type === 'pricing' && (
                            <div className="space-y-4">
                               <div className="flex justify-between items-center"><span className="text-[7px] font-black uppercase text-[#1B3FBF]/40">Active Tier</span><Crown size={10} className="text-yellow-500" /></div>
                               <div className="text-xl font-serif italic text-black">{frag.value}</div>
                               <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 3 }} className="w-full h-full bg-[#1B3FBF]/30" /></div>
                            </div>
                         )}
                         {frag.type === 'metric' && (
                            <div className="space-y-2">
                               <div className="flex items-center gap-1.5"><Activity size={10} className="text-[#1B3FBF]" /><span className="text-[7px] font-black uppercase text-[#1B3FBF]/40">{frag.title}</span></div>
                               <div className="text-2xl font-light tracking-tighter text-black">{frag.value}</div>
                            </div>
                         )}
                         {frag.type === 'toggle' && (
                            <div className="flex items-center justify-between gap-4">
                               <span className="text-[8px] font-bold text-black/40">{frag.title}</span>
                               <div className="w-8 h-4 bg-[#1B3FBF] rounded-full p-0.5 flex justify-end items-center"><div className="w-3 h-3 bg-white rounded-full shadow-sm" /></div>
                            </div>
                         )}
                         {frag.type === 'chart' && (
                            <div className="space-y-3">
                               <span className="text-[7px] font-black uppercase text-[#1B3FBF]/40">{frag.title}</span>
                               <div className="h-12 flex items-end gap-1 px-1">
                                  {[40, 70, 45, 90, 60, 80].map((h, i) => <motion.div key={i} animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} className="flex-1 bg-[#1B3FBF]/10 rounded-full" />)}
                               </div>
                            </div>
                         )}
                         {frag.type === 'profile' && (
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center text-[#1B3FBF] font-black text-[10px]">{frag.name[0]}</div>
                               <div className="leading-tight"><div className="text-[10px] font-bold text-black">{frag.name}</div><div className="text-[8px] text-black/30 italic font-serif">{frag.role}</div></div>
                            </div>
                         )}
                         {frag.type === 'skeleton' && (
                            <div className="space-y-2" style={{ width: frag.width }}>
                               <div className="h-2 bg-black/5 rounded-full w-2/3" />
                               <div className="bg-black/5 rounded-xl border border-black/5" style={{ height: frag.height }} />
                            </div>
                         )}
                      </motion.div>
                    ))}
                 </div>
              </div>

              {/* Flanking Panels: Identity & Powers (Main App Integration) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex justify-between items-center px-24 w-full h-[600px] z-10">
                
                {/* Left Side: You are a KREON */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 20 }}
                  className="w-[340px] text-left flex flex-col gap-8"
                >
                  {/* Swirly Arrow (Dotted/Card -> Panel direction) */}
                  <svg className="mb-2 scale-x-[-1]" width="200" height="80" viewBox="0 0 160 60" fill="none">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6, duration: 1.2 }}
                      d="M10 30 C 60 10, 80 50, 150 50" 
                      stroke="#1B3FBF" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeDasharray="2 8"
                      strokeOpacity="0.5"
                    />
                    <path d="M140 42 L154 51 L142 60" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.6"/>
                  </svg>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40 block mb-2">Identity Confirmed</span>
                    <h3 className="text-5xl font-black text-[#1B3FBF] leading-tight tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                      You are a<br/>KREON.
                    </h3>
                    <p className="text-sm text-black/50 leading-relaxed mt-5 font-medium max-w-[280px]">
                      Your permanent residency in the KREO ecosystem is now active.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 mt-2">
                    {['Unique Residency #', 'Permanent Identity', 'Studio Access'].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <svg width="28" height="14" viewBox="0 0 24 12" fill="none">
                          <path d="M2 6 L18 6" stroke="#1B3FBF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2"/>
                          <path d="M14 2 L20 6 L14 10" stroke="#1B3FBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.2" fill="none"/>
                        </svg>
                        <span className="text-[11px] font-bold text-[#1B3FBF]/40 uppercase tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side: Identity Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
                  className="w-[340px] text-left flex flex-col gap-8"
                >
                  {/* Swirly Arrow (Dotted/Card -> Panel direction) */}
                  <svg className="mb-2" width="200" height="80" viewBox="0 0 160 60" fill="none">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                      d="M10 30 C 60 10, 80 50, 150 50" 
                      stroke="#1B3FBF" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeDasharray="2 8"
                      strokeOpacity="0.5"
                    />
                    <path d="M140 42 L154 51 L142 60" stroke="#1B3FBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.6"/>
                  </svg>
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40">KREON PROFILE</span>
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="shrink-0 w-12 h-12 bg-[#1B3FBF]/10 rounded-full flex items-center justify-center text-[#1B3FBF] font-black text-lg border border-[#1B3FBF]/20">
                        {userEmail?.[0].toUpperCase() || 'K'}
                      </div>
                      <div>
                        <div className="text-[14px] font-black text-[#1B3FBF] uppercase tracking-widest">{userEmail?.split('@')[0] || 'GUEST'}</div>
                        <div className="text-[11px] text-black/40 font-medium">Neural Manifestation Active</div>
                      </div>
                    </div>
                    {[
                      { label: 'Environment', desc: 'Studio Protocol v4.2', icon: ShieldCheck },
                      { label: 'Latency', desc: '12ms (Neural Sync)', icon: Zap },
                      { label: 'Manifests', desc: chatHistory.length > 0 ? `${chatHistory.length} Created` : '0 Created', icon: LayoutGrid },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-5"
                      >
                        <div className="shrink-0 mt-1 p-2 bg-[#1B3FBF]/5 rounded-xl border border-[#1B3FBF]/10">
                          <item.icon size={16} className="text-[#1B3FBF]/60" />
                        </div>
                        <div>
                          <div className="text-[11px] font-black text-[#1B3FBF] uppercase tracking-widest">{item.label}</div>
                          <div className="text-[11px] text-black/30 font-medium mt-0.5">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Floating Decorative Elements (Graffiti Style) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] text-[#1B3FBF]/10">
                  <Presentation size={64} />
                </motion.div>
                <motion.div animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-[20%] right-[12%] text-[#1B3FBF]/10">
                  <Code2 size={56} />
                </motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ repeat: Infinity, duration: 15 }} className="absolute bottom-[25%] left-[15%] text-[#1B3FBF]/10">
                  <GitGraph size={60} />
                </motion.div>
                <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute top-[40%] right-[20%] text-[#1B3FBF]/25">
                  <Smile size={48} />
                </motion.div>
                <motion.div animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-[20%] right-[15%] text-[#1B3FBF]/25">
                  <Smile size={32} />
                </motion.div>
                
                {/* Secondary scatter */}
                <svg className="absolute top-[18%] left-[45%] opacity-10" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="2" x2="12" y2="22" stroke="#1B3FBF" strokeWidth="1"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#1B3FBF" strokeWidth="1"/>
                </svg>
                <svg className="absolute bottom-[20%] right-[45%] opacity-10" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="#1B3FBF" strokeWidth="1" strokeDasharray="4 3"/>
                </svg>
              </div>

              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#1B3FBF]/5 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-8 rounded-full bg-[#1B3FBF]/10 animate-pulse transition-all duration-1000 scale-110" />
                <div className="relative w-24 h-24 rounded-full bg-[#1B3FBF] flex items-center justify-center shadow-[0_0_80px_rgba(27,63,191,0.4)] animate-in zoom-in-50 duration-700">
                  <div className="w-4 h-4 rounded-full bg-white shadow-inner animate-[pulse_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
              
              <div className="text-center relative z-20">
                <h1 className="text-6xl tracking-tighter text-[#1B3FBF] mb-4 animate-in slide-in-from-bottom-2 duration-700" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                  KREO {isPro && <span className="bg-[#1B3FBF] text-white text-[14px] font-black uppercase tracking-widest px-3 py-1 rounded-full align-middle ml-2">PRO</span>}
                </h1>

                {/* KREON Badge */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowKreonModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3FBF]/5 border border-[#1B3FBF]/10 rounded-full text-[#1B3FBF] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1B3FBF]/10 transition-all shadow-sm"
                >
                  <UserPlus size={14} /> View KREON ID
                </motion.button>

                <p className="text-[12px] font-black uppercase tracking-[0.7em] text-black/40 animate-pulse mt-8">
                  {isIncomingPortal ? "Restoring Neural Manifest..." : loadingMessage}
                </p>
              </div>
            </div>
          </div>
        ) : artifact ? (
          <div className={`flex w-full h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
            <div className={`${isSplitView ? "w-[420px] shrink-0" : "w-full max-w-4xl mb-6"} flex flex-col ${isSplitView ? "h-full" : "min-h-[50vh]"} overflow-hidden bg-[#f5f7ff] border-r border-black/[0.06]`}>
              <div className="shrink-0 flex justify-between items-center px-6 py-4 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
                <button
                  onClick={() => { setArtifact(null); setChatHistory([]); setCurrentArtifactId(null); window.history.replaceState(null, '', '/'); }}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/30 hover:text-[#1B3FBF] transition-all group"
                >
                  <ChevronLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back
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
                        {msg.role === 'assistant' && (
                          <button 
                            onClick={() => narrateText(msg.content)}
                            className="p-1 rounded-md hover:bg-black/5 text-black/20 hover:text-[#1B3FBF] transition-all shrink-0"
                            title="Narrate Manifestation"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-black/[0.06] bg-white">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    className="w-full rounded-2xl px-6 py-4 pr-14 text-sm outline-none border border-black/[0.08] bg-[#f0f3ff] text-black placeholder:text-black/30 focus:border-[#1B3FBF]/60 focus:bg-white transition-all font-light disabled:opacity-40"
                    placeholder="Refine the manifest..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button type="submit" disabled={isSubmitting} className="p-2.5 bg-[#1B3FBF] text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50">
                      {isSubmitting ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowUp size={14} strokeWidth={3} />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <ArtifactPanel code={artifact} prompt={query} isSplitView={isSplitView} onShare={() => setShareDialogOpen(true)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full relative">
            <section className="min-h-screen flex flex-col items-center justify-center gap-16 px-4 pb-32 relative w-full">
              {/* Flanking Panels in Main Dashboard */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:flex justify-between items-center px-16 w-full h-[600px] z-10">
                {/* Left: Identity */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="w-[300px] text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]/40 block mb-2">Verified Identity</span>
                  <h3 className="text-4xl font-black text-[#1B3FBF] leading-tight tracking-tighter" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
                    YOU ARE A<br/>KREON.
                  </h3>
                  <div className="mt-6 flex flex-col gap-3">
                    {['Access Granted', 'Studio Active', 'Neural Linked'].map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-1 h-1 rounded-full bg-[#1B3FBF]/30" />
                         <span className="text-[9px] font-bold text-[#1B3FBF]/40 uppercase tracking-widest">{t}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right: User */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-[300px] text-right flex flex-col items-end">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="text-right">
                         <div className="text-[14px] font-black text-[#1B3FBF] uppercase tracking-widest">{userEmail?.split('@')[0] || 'RESIDENT'}</div>
                         <div className="text-[9px] text-black/40 font-bold tracking-tighter uppercase">Neural Buffer 100%</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center border border-[#1B3FBF]/20 text-[#1B3FBF]">
                        <User size={16} />
                      </div>
                   </div>
                   <div className="flex flex-col gap-4">
                      {[{l:'Manifests', v: historyItems.length}, {l:'Latency', v:'12ms'}, {l:'Protocol', v:'v4.2'}].map((s, i) => (
                        <div key={i} className="flex justify-end items-center gap-4">
                           <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest">{s.l}</span>
                           <span className="text-[10px] font-black text-[#1B3FBF]">{s.v}</span>
                        </div>
                      ))}
                   </div>
                </motion.div>
              </div>

              <div className="text-center space-y-8 pt-12 md:pt-16 relative z-20">
                <h1 className="text-7xl md:text-8xl font-light tracking-tighter leading-tight animate-in fade-in slide-in-from-top-12 duration-1000">
                  Build your <br />
                  <span className="text-yellow-accent italic font-serif px-2">imagination</span>
                </h1>
              </div>
              <div className="w-full max-w-4xl">
                <form onSubmit={handleSubmit}>
                  <div className={`flex items-center rounded-[1.8rem] px-6 py-4 shadow-2xl transition-all border ring-1 gap-3 ${theme === 'light' ? 'bg-white border-black/10 ring-black/5 text-black' : 'glass-panel border-white/20 ring-white/10 backdrop-blur-3xl text-white'}`}>
                    <div className={`flex items-center gap-2 pr-2 border-r leading-none ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-foreground/40 hover:text-foreground">
                        <Paperclip size={20} />
                      </button>
                    </div>
                    <input
                      className={`flex-1 bg-transparent text-lg outline-none font-satoshi ${theme === 'light' ? 'placeholder:text-black/30 text-black' : 'placeholder:text-white/40 text-white'}`}
                      placeholder={placeholderText}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="p-2.5 bg-[#0020C2] text-white rounded-2xl shadow-xl hover:scale-105 transition-all">
                      <ArrowUp size={20} strokeWidth={3} />
                    </button>
                  </div>
                </form>
                <div className="flex flex-wrap justify-center gap-3 mt-10">
                  {["Brand Architecture", "SaaS Dashboard", "Interactive App", "Visual Guide"].map((label, i) => (
                    <button key={i} onClick={() => handleSubmit(label)} className="flex items-center gap-2 px-6 py-3 rounded-2xl border text-[10px] tracking-widest uppercase transition-all font-bold glass-panel hover:bg-white/10">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            <section id="manifesto-section" className="w-full relative bg-white py-24 flex flex-col items-center z-30">
              <div className="w-full max-w-7xl px-6 space-y-24">
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]">The Situation</span>
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-black leading-tight">We all face situations...</h2>
                </div>
                <ScenariosGrid />
                <TypingKreo />
                <PossibilitiesPile />
                <InteractiveVisualLoop theme={theme} />
                <div className="flex justify-center pt-16">
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-105 transition-all">Start Manifesting</button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Manifest Success Upgrade Popup */}
      <AnimatePresence>
        {showUpgradePop && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[3rem] p-12 text-center space-y-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[50px] rounded-full" />
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-3xl mx-auto flex items-center justify-center text-black shadow-lg shadow-yellow-400/20 rotate-12">
                   <Crown size={40} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-serif italic text-black leading-tight">Manifestation Successful</h2>
                  <p className="text-sm font-light text-black/50 italic font-serif leading-relaxed px-4">
                    You've established your first manifest. Unlock unlimited high-fidelity orchestration and private vaults with KREO Ultra.
                  </p>
                </div>
                <div className="space-y-4 pt-4">
                   <button 
                     onClick={() => navigate('/pricing')}
                     className="w-full py-5 bg-[#0020C2] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
                   >
                     Upgrade to Ultra — $1
                   </button>
                   <button 
                     onClick={() => setShowUpgradePop(false)}
                     className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors"
                   >
                     Maybe Later
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {shareDialogOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-lg rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#0020C2]/5 blur-[60px] rounded-full" />
            
            <div className="flex justify-between items-center pb-6 border-b border-black/5 relative z-10">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif italic tracking-tight text-black">Share Manifestation</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#0020C2]">Public View-Only Link Active</p>
              </div>
              <button onClick={() => setShareDialogOpen(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:text-black transition-colors hover:bg-black/10">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              <p className="text-sm font-light text-black/50 italic font-serif leading-relaxed text-left">
                Anyone with this link can view your high-fidelity manifestation in real-time.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-[#1B3FBF]/5 border border-[#1B3FBF]/10 rounded-[2rem] group hover:border-[#1B3FBF]/30 transition-all">
                <LinkIcon className="text-[#1B3FBF] shrink-0" size={18} />
                <input 
                  readOnly 
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  value={`${window.location.origin}/share/${currentArtifactId || 'unbound'}`} 
                  className="flex-1 bg-transparent px-2 text-xs font-mono text-[#1B3FBF] outline-none truncate" 
                />
                <button 
                  onClick={() => { 
                    navigator.clipboard.writeText(`${window.location.origin}/share/${currentArtifactId}`); 
                    toast({ title: "Link Manifested", description: "URL copied to your neural buffer." }); 
                  }} 
                  className="px-6 py-3 bg-[#1B3FBF] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#1B3FBF]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-center relative z-10">
               <button 
                 onClick={() => setShareDialogOpen(false)}
                 className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors"
               >
                 Close Manifest
               </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* KREON Identity Modal */}
      <AnimatePresence>
        {showKreonModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              {residentBio ? (
                <KreonCard userEmail={userEmail} bio={residentBio} />
              ) : (
                <div className="bg-white w-[340px] h-[480px] rounded-[32px] p-10 flex flex-col justify-center items-center text-center space-y-8 shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 left-0 w-full h-1 bg-[#1B3FBF]/10">
                      <motion.div animate={{ width: `${(interviewPhase + 1) * 33}%` }} className="h-full bg-[#1B3FBF]" />
                   </div>
                   <div className="w-16 h-16 rounded-3xl bg-[#1B3FBF]/5 flex items-center justify-center text-[#1B3FBF] mb-4">
                      <BrainCircuit size={32} />
                   </div>
                   <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]">Resident Setup</span>
                      <h3 className="text-xl font-serif italic leading-tight text-black">
                        {INTERVIEW_QUESTIONS[interviewPhase]}
                      </h3>
                   </div>
                   <form onSubmit={handleInterviewSubmit} className="w-full space-y-4 pt-4">
                      <input 
                        autoFocus
                        value={interviewQuery}
                        onChange={(e) => setInterviewQuery(e.target.value)}
                        placeholder="Manifest your answer..."
                        className="w-full px-6 py-4 rounded-2xl bg-black/5 border border-black/5 text-sm outline-none focus:border-[#1B3FBF]/30 transition-all font-light"
                      />
                      <button type="submit" className="w-full py-4 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#1B3FBF]/20">
                        Continue Setup
                      </button>
                   </form>
                   <div className="pt-4">
                      <p className="text-[9px] font-medium text-black/30 uppercase tracking-widest">Neural Sync in Progress (0{interviewPhase + 1}/03)</p>
                   </div>
                   {/* Graffiti Sprinkles for Interview */}
                   <Smile size={32} className="absolute -bottom-4 -left-4 text-[#1B3FBF]/5 rotate-12" />
                   <Code2 size={48} className="absolute -top-6 -right-6 text-[#1B3FBF]/5 -rotate-12" />
                </div>
              )}
              <button 
                onClick={() => setShowKreonModal(false)}
                className="absolute -top-12 right-0 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-white/70 transition-colors"
              >
                Close Identity
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
