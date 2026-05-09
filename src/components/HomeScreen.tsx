import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  Search, History, Settings, User, ArrowUp, ArrowDown, Monitor, Database, Smartphone,
  LayoutGrid, ChevronDown, ChevronLeft, Clock, Plus, Zap, FileText, X, Activity,
  Image as ImageIcon, BrainCircuit, Sparkles, Paperclip, Shuffle, MessageSquare, Mail,
  Share2, Globe, Palette, Link as LinkIcon, Copy, Info, CheckCircle2, Crown, Star, Volume2, ShieldCheck, UserPlus,
  Presentation, Code2, Table2, GitGraph, Smile, Trash2, RefreshCw
} from "lucide-react";

import { narrateText, generateBio, generateArtifact } from "@/lib/ai";
import { useBrandKit } from "@/features/useBrandKit";
import { useStyleMimic } from "@/features/useStyleMimic";
import { BrandKitModal } from "./BrandKitModal";
import KreonCard from "./KreonCard";
import IdentityScreen from "./IdentityScreen";

import KreoLogo from "./KreoLogo";
import ArtifactPanel from "./ArtifactPanel";
import CoWorkPanel from "./CoWorkPanel";
import RandomMentraNotification from "./mentra/RandomNotification";
import CloudFraming from "./CloudFraming";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabase";
import { createWorker } from "tesseract.js";
import Dither from "./Dither";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Guide } from "./Guide";
import Footer from "./Footer";
import { useLang } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";

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

// PLACEHOLDERS moved inside HomeScreen to access 't' from LanguageContext
const NEURAL_PROMPTS = [
  "Create a high-quality PPT presentation for a VC pitch — cinematic slides, beautiful typography, and clear diagrams.",
  "Create a professional Excel-style financial report for a SaaS company with live charts, MRR tables, and clean budgeting tools.",
  "Powerful PDF analysis: create an interactive document viewer that identifies structures and extracts data.",
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
  { t: "Scientific diagram check.", s: "Complex reality, simple design." },
  { t: "Client pitch at noon.", s: "Wow them before you start." }
];

const ScenariosGrid = () => {
  const { t } = useLang();
  const scenarios = [
    { t: t.scenario_1_t, s: t.scenario_1_s },
    { t: t.scenario_2_t, s: t.scenario_2_s },
    { t: t.scenario_3_t, s: t.scenario_3_s },
    { t: t.scenario_4_t, s: t.scenario_4_s },
    { t: t.scenario_5_t, s: t.scenario_5_s },
    { t: t.scenario_6_t, s: t.scenario_6_s }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenarios.map((card, i) => (
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
};

const SynthesisEngine = () => {
  const { t } = useLang();
  const steps = [
    { step: "01", title: t.step_01_title, desc: t.step_01_desc },
    { step: "02", title: t.step_02_title, desc: t.step_02_desc },
    { step: "03", title: t.step_03_title, desc: t.step_03_desc }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
      {steps.map((item, i) => (
        <div key={i} className="space-y-6 text-center group">
          <div className="text-6xl font-serif italic text-black/5 group-hover:text-[#1B3FBF]/10 transition-colors duration-700">{item.step}</div>
          <h4 className="text-xl font-bold uppercase tracking-widest text-black">{item.title}</h4>
          <div className="h-[1px] w-12 mx-auto bg-[#1B3FBF]/20" />
          <p className="text-sm text-black/40 font-serif italic leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

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

  const { t } = useLang();

  return (
    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in zoom-in-95 duration-1000">
      <div className="text-center w-full">
        <h1 className="text-[12vw] font-serif italic text-[#1B3FBF] tracking-tighter leading-none select-none">
          {text}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-2 inline-block w-[4px] h-[0.9em] bg-[#1B3FBF] align-middle" />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-[#1B3FBF] text-[10px] font-black uppercase tracking-[1em] opacity-20 mt-8">{t.footer_tagline}</motion.p>
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
  const { t } = useLang();
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
          {t.possibilities_title}
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
  const { t } = useLang();
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
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t.interactive_phase_01_label}</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              {t.interactive_phase_01_title}
            </h1>
            <div className="flex justify-center gap-2 pt-4">
              {[...Array(3)].map((_, i) => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />)}
            </div>
          </motion.div>
        )}

        {subPhase === 14 && (
          <motion.div key="s14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t.interactive_phase_02_label}</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              {t.interactive_phase_02_title}
            </h1>
          </motion.div>
        )}

        {subPhase === 15 && (
          <motion.div key="s15" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t.interactive_phase_03_label}</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              {t.interactive_phase_03_title}
            </h1>
          </motion.div>
        )}

        {subPhase === 16 && (
          <motion.div key="s16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t.interactive_phase_04_label}</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              {t.interactive_phase_04_title}
            </h1>
            <h2 className="text-[#1B3FBF] text-4xl md:text-6xl font-normal px-6">{t.interactive_phase_04_sub}</h2>
          </motion.div>
        )}

        {subPhase === 17 && (
          <motion.div key="s17" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6">
            <p className="text-[#1B3FBF] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t.interactive_phase_05_label}</p>
            <h1 className="text-3xl md:text-6xl font-serif italic text-black tracking-tighter leading-tight max-w-4xl px-6">
              {t.interactive_phase_05_title}
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
  const [showWebCaptureModal, setShowWebCaptureModal] = useState(false);
  const [captureUrl, setCaptureUrl] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [residentBio, setResidentBio] = useState(() => localStorage.getItem('kreo_resident_bio') || "");
  
  const { brandKit, saveBrandKit, getBrandKitPromptRule } = useBrandKit();
  const { mimicUrl, setMimicUrl, getStyleMimicPromptRule, clearStyleMimic } = useStyleMimic();
  const [showBrandKitModal, setShowBrandKitModal] = useState(false);

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
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, lang, setLang, languages } = useLang();

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
          const isLocal = urlId?.startsWith('local-') || urlId?.startsWith('opt-');

          let data = null;
          let error = null;

          if (!isLocal) {
            // Primary fetch — with broad select for maximum compatibility
            const query = isUuid 
              ? supabase.from("artifacts").select("*").or(`share_token.eq.${urlId},id.eq.${urlId}`)
              : supabase.from("artifacts").select("*").eq("share_token", urlId);
            
            let { data: primaryData, error: primaryError } = await query.maybeSingle();
            
            // Fallback for schema mismatches (if * or share_token fail)
            if (primaryError && (primaryError.status === 400)) {
               const { data: fallbackData, error: fallbackError } = await (isUuid
                ? supabase.from("artifacts").select("id, code").eq("id", urlId).maybeSingle()
                : { data: null, error: new Error("Legacy tokens not supported in fallback mode") });
               data = fallbackData;
               error = fallbackError;
            } else {
               data = primaryData;
               error = primaryError;
            }
          }

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
    } else if (!urlId && artifact && !isSubmitting && !currentArtifactId && !window.location.pathname.startsWith('/share/')) {
      // Only reset if we navigated to root AND have no artifact ID (i.e. user actively went back)
      setArtifact(null);
      setCurrentArtifactId(null);
      setChatHistory([]);
      setIsArtifactActive(false);
    }
  }, [searchParams, location.pathname, isIncomingPortal, isSubmitting, currentArtifactId]);

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
    const fetchArtifacts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          const local = localStorage.getItem('kreo_local_history');
          if (local) setHistoryItems(JSON.parse(local));
          return;
        }

        // Persistent Schema Check: Avoid redundant 400 logs by checking once per user/device
        const schemaVerified = localStorage.getItem('kreo_schema_v2') === 'true';
        let useShareToken = schemaVerified;

        if (!schemaVerified) {
          const { error: testError } = await supabase.from('artifacts').select('share_token').limit(1);
          if (!testError) {
             localStorage.setItem('kreo_schema_v2', 'true');
             useShareToken = true;
          } else {
             localStorage.setItem('kreo_schema_v2', 'false');
          }
        }

        let { data, error } = await supabase.from('artifacts').select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error && error.status === 400) {
          // Absolute fallback if select * fails (unlikely, but for resilience)
          const { data: minimalData, error: minimalError } = await supabase.from('artifacts')
            .select('id, code')
            .eq('user_id', user.id);
          data = minimalData;
          error = minimalError;
        }

        if (error) {
          console.error("Neural sync throttled:", error.message);
          return;
        }

        if (data) {
          setHistoryItems(prev => {
            const merged = [...data!, ...prev];
            return Array.from(new Map(merged.map(item => [item.id, item])).values());
          });
        }
      } catch (err) {
        // Silent fail for non-critical history fetch
      }
    };

    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || "");
        fetchArtifacts();
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

  const PLACEHOLDER_TEXTS = useMemo(() => [
    t.hero_placeholder_1,
    t.hero_placeholder_2,
    t.hero_placeholder_3,
    t.hero_placeholder_4,
    t.hero_placeholder_5,
    t.hero_placeholder_6,
  ], [t]);

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
  }, [charIndex, isDeleting, placeholderIndex, PLACEHOLDER_TEXTS]);

  useEffect(() => {
    if (isSubmitting) {
      const messages = [
        t.loading_calibrating,
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
  }, [isSubmitting, t]);

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

  const handleDeleteHistoryItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // 1. Remove from Local Memory
      const localHistoryStr = localStorage.getItem('kreo_local_history');
      if (localHistoryStr) {
        const localHistoryTree = JSON.parse(localHistoryStr);
        const updated = localHistoryTree.filter((item: any) => item.id !== id);
        localStorage.setItem('kreo_local_history', JSON.stringify(updated));
      }

      // 2. Remove from Neural Cloud (if logged in)
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('artifacts').delete().eq('id', id);
      }

      // 3. Update UI State
      setHistoryItems(prev => prev.filter(item => item.id !== id));

      if (currentArtifactId === id) {
        setArtifact(null);
        setCurrentArtifactId(null);
        setChatHistory([]);
        window.history.replaceState(null, '', '/');
      }
    } catch (err) {
      console.error("Neural deletion failed.");
    }
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

      let targetId = currentArtifactId;
      let optimisticId = "";

      if (!artifact) {
        // NEW MANIFESTATION
        optimisticId = 'opt-' + Date.now();
        setChatHistory([newUserMsg]);
        setHistoryItems(prev => [{
          id: optimisticId,
          prompt: finalQuery,
          code: "MANIFEST_EN_ROUTE",
          created_at: new Date().toISOString()
        }, ...prev]);
        setCurrentArtifactId(optimisticId);
      } else {
        // REFINEMENT
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

      let backgroundEnhancedQuery = `Manifest a ${adj} visual experience for ${finalQuery.trim()} ${phrase}. 
        CRITICAL DESIGN SYSTEM: 
        1. NO BRUTALIST UI. Avoid harsh borders, raw layouts, or unpolished elements.
        2. RICH MINIMALISM: Use vast whitespace, high-fidelity editorial typography (Instrument Serif, Satoshi), and subtle micro-animations.
        3. PREMIUM AESTHETIC: Use smooth gradients, glassmorphism (backdrop-blur), and a sophisticated color palette.
        4. EDITORIAL FLOW: Treat every page like a high-end magazine or a premium architectural portal.

        CRITICAL: YOU MUST GENERATE THE LIVE, FUNCTIONAL CODE FOR THE APP UI ITSELF. 
        DO NOT generate a 'blueprint', 'documentation', 'overview', or 'code snippet' UI. 
        DO NOT include labels like "ARCHITECTURE BLUEPRINT" or "JSX SNIPPET" in the preview. 
        THE USER SHOULD SEE THE FINAL PRODUCT, NOT A PRESENTATION OF THE CODE.`;

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
          6. DO NOT wrap this in a code-viewer UI. Render the script directly as a document.
        `;
      } else {
        backgroundEnhancedQuery += `
          CRITICAL ARCHITECTURE: PRODUCING A RAW HTML MANIFESTATION.
          1. This MUST be a SINGLE RAW HTML FILE. NO REACT. NO JSX.
          2. Use ONLY HTML and Tailwind CSS for all styling.
          3. Use <script src="https://unpkg.com/lucide@latest"></script> and <i data-lucide="icon-name"></i> for icons.
          4. RETURN THE PURE RAW HTML CODE ONLY.
          5. ABSOLUTELY NO MARKDOWN CODE BLOCKS. DO NOT USE TRIPLE BACKTICKS (\`\`\`).
          6. DO NOT include any explanations, preambles, notes, or post-scripts.
          7. DO NOT generate a "Blueprint" or "Codebox". Generate the actual UI directly.
          8. Ensure the design is full-screen, responsive, and visually stunning.
          9. Do NOT output React components, hooks, or imports.
        `;
      }

      const code = await generateArtifact(
        backgroundEnhancedQuery, 
        historyToSend, 
        uploadedFile?.url, 
        isPro, 
        getBrandKitPromptRule(), 
        getStyleMimicPromptRule()
      );

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
        const shareToken = currentArtifactId && !currentArtifactId.startsWith('opt-') ? currentArtifactId : crypto.randomUUID();

        // Mirror to Local Neural Buffer
        const localHistory = JSON.parse(localStorage.getItem('kreo_local_history') || '[]');
        const localEntry = {
          id: shareToken,
          share_token: shareToken,
          prompt: artifact ? (historyItems.find(i => i.share_token === shareToken)?.prompt || finalQuery) : finalQuery,
          code: code,
          created_at: new Date().toISOString()
        };
        const updatedLocal = artifact
          ? localHistory.map((item: any) => item.share_token === shareToken ? localEntry : item)
          : [localEntry, ...localHistory].slice(0, 20);
        localStorage.setItem('kreo_local_history', JSON.stringify(updatedLocal));

        let newArtifact = null;
        let insertError = null;

        if (artifact && currentArtifactId && !currentArtifactId.startsWith('opt-')) {
          // UPDATE EXISTING — try with share_token, fall back to id
          const { data, error } = await supabase
            .from("artifacts")
            .update({ code: code, prompt: finalQuery })
            .eq("share_token", currentArtifactId)
            .select('*')
            .maybeSingle();
          newArtifact = data;
          insertError = error;

          // If update failed (share_token column missing), try by id
          if (insertError) {
            const fallback = await supabase
              .from("artifacts")
              .update({ code: code, prompt: finalQuery })
              .eq("id", currentArtifactId)
              .select('*')
              .maybeSingle();
            newArtifact = fallback.data;
            insertError = fallback.error;
          }
        } else {
          // INSERT NEW — try with share_token + is_public, fall back to basics
          const { data, error } = await supabase
            .from("artifacts")
            .insert({
              id: shareToken,
              prompt: finalQuery,
              code: code,
              user_id: user ? user.id : null,
              is_public: true,
              share_token: shareToken
            })
            .select('*')
            .maybeSingle();
          newArtifact = data;
          insertError = error;

          // Fallback: insert without share_token/is_public if columns don't exist yet
          if (insertError) {
            console.debug("[KREO] Falling back to basic insert — run ensure_schema.sql in Supabase to enable sharing features.");
            const fallback = await supabase
              .from("artifacts")
              .insert({
                id: shareToken,
                prompt: finalQuery,
                code: code,
                user_id: user ? user.id : null,
              })
              .select('*')
              .maybeSingle();
            newArtifact = fallback.data;
            insertError = fallback.error;
          }
        }

        if (!insertError && newArtifact) {
          const targetId = newArtifact.share_token || newArtifact.id;
          setHistoryItems(prev => {
            const exists = prev.find(i => i.id === (newArtifact?.id || newArtifact?.share_token));
            if (exists) {
              return prev.map(i => i.id === exists.id ? newArtifact : i);
            }
            return [newArtifact, ...prev.filter(i => i.id !== optimisticId)];
          });
          setCurrentArtifactId(targetId);
          navigate(`/share/${targetId}`, { replace: true });
        } else {
          // Absolute Fallback: Even if cloud sync fails, update local currentArtifactId to the shareToken 
          // so the user isn't stuck with a "Syncing..." spinner in the share dialog.
          if (!user) {
            setHistoryItems(updatedLocal);
          }
          setCurrentArtifactId(shareToken);
          console.warn("[KREO] Database sync failed. Experience remains local. Shared links will not work until database schema/access is resolved.");
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
    <div className={`relative flex flex-col min-h-screen transition-colors duration-1000 bg-transparent`}>
      <Guide />
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
          <div className="text-foreground group cursor-pointer max-w-[150px]" onClick={() => { 
            setArtifact(null); 
            setCurrentArtifactId(null); 
            setChatHistory([]); 
            setIsArtifactActive(false);
            navigate('/'); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}>
            <KreoLogo isPro={isPro} />
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/webresearch')}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#0020C2] text-white border border-[#0020C2] hover:scale-105 active:scale-95 transition-all ml-2"
                >
                  <BrainCircuit size={14} />
                  <span className="text-[12px] font-serif italic capitalize tracking-wide">Mentra</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>Deep Research Agent</TooltipContent>
            </Tooltip>

            <button
              onClick={() => navigate('/pricing')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ml-2 text-[10px] font-black uppercase tracking-widest ${theme === 'light' ? 'bg-[#0020C2] text-white border-[#0020C2]' : 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                } hover:scale-105 active:scale-95`}
            >
              <Crown size={12} /> {t.nav_pricing}
            </button>

            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setSettingsOpen(true)} className="rounded-full p-2 text-foreground/80 hover:text-foreground transition-all">
                  <Settings size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{t.settings}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button id="kreo-tour-profile" onClick={() => setProfileOpen(true)} className="rounded-full p-2 text-foreground/80 hover:text-foreground transition-all">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">{t.history_title}</h3>
            <div className="space-y-4">
              {historyItems.map((item, i) => (
                <div key={i} className="group relative">
                  <button onClick={() => handleHistoryItemClick(item)} className="w-full text-left p-4 pr-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm truncate font-light">
                    {item.prompt}
                  </button>
                  <button
                    onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-400/10"
                  >
                    <Trash2 size={14} />
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
          <div className="relative w-full max-w-sm p-10 rounded-[3rem] bg-white border border-black/5 animate-in zoom-in-95 duration-300 shadow-2xl font-satoshi text-black">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium tracking-tight text-black">{t.settings}</h2>
              <button onClick={() => setSettingsOpen(false)} className="p-2 text-black/20 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-black/30">Atmosphere Control</p>
                <div className="flex bg-black/5 p-1.5 rounded-2xl">
                  {(["light", "dark", "ultra"] as const).map((m) => (
                    <button key={m} onClick={() => setTheme(m)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === m ? "bg-[#1B3FBF] text-white shadow-lg" : "text-black/50 hover:text-black"}`}>{m}</button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0020C2]/5 border border-[#0020C2]/10">
                <div className="text-sm font-medium text-black">Split Architecture</div>
                <button onClick={() => setIsSplitView(!isSplitView)} className={`w-12 h-6 rounded-full transition-all relative ${isSplitView ? 'bg-[#0020C2]' : 'bg-foreground/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isSplitView ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="h-[1px] bg-black/5 w-full my-2" />

              <div className="space-y-3">
                <button 
                  onClick={() => { setHistoryOpen(!historyOpen); setSettingsOpen(false); }} 
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-black/5 transition-all text-sm font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-black/40" />
                    <span>{t.history}</span>
                  </div>
                  <ChevronDown size={14} className="-rotate-90 text-black/20" />
                </button>

                <button 
                  onClick={() => { setLangMenuOpen(!langMenuOpen); }} 
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-black/5 transition-all text-sm font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-black/40" />
                    <span>{t.lang_label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">
                      {languages.find(l => l.code === lang)?.nativeLabel}
                    </span>
                    <ChevronDown size={14} className={`${langMenuOpen ? 'rotate-180' : ''} transition-transform text-black/20`} />
                  </div>
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-2 space-y-1"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${lang === l.code ? 'bg-[#1B3FBF]/10 text-[#1B3FBF]' : 'hover:bg-black/5 text-black/60'}`}
                        >
                          <span className="text-xs font-medium">{l.nativeLabel}</span>
                          {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-[#1B3FBF]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => { navigate('/landing#about'); setSettingsOpen(false); }} 
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-black/5 transition-all text-sm font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Info size={18} className="text-black/40" />
                    <span>About Us</span>
                  </div>
                  <ChevronDown size={14} className="-rotate-90 text-black/20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {profileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setProfileOpen(false)} />
          <div className="relative w-full max-w-sm p-10 rounded-[3rem] bg-white border border-black/5 animate-in zoom-in-95 duration-300 shadow-2xl font-satoshi">
            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="w-24 h-24 rounded-full bg-[#1B3FBF] flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-[#1B3FBF]/20">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-medium tracking-tight text-black">{userEmail.split('@')[0]}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-black/50">{userEmail}</div>
              </div>
            </div>
            <div className="space-y-3">
              <button onClick={() => { setShowBrandKitModal(true); setProfileOpen(false); }} className="w-full py-4 border border-[#1B3FBF]/10 bg-white text-[#1B3FBF] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#1B3FBF]/5 transition-all flex items-center justify-center gap-2 group shadow-sm">
                <Palette size={14} className="group-hover:rotate-12 transition-transform" /> Brand Kit Setup
              </button>
              <button
                onClick={() => { setShowKreonModal(true); setProfileOpen(false); }}
                className="w-full py-5 border border-[#1B3FBF]/10 bg-[#1B3FBF]/5 text-[#1B3FBF] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#1B3FBF]/10 transition-all flex items-center justify-center gap-2 group"
              >
                <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" /> View KREON ID
              </button>
              <button onClick={handleLogout} className="w-full py-5 bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-500/10 transition-all font-black">Sign Out Portal</button>
            </div>
            <button
              onClick={() => setProfileOpen(false)}
              className="w-full text-center mt-8 text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      <main className={`flex flex-col relative z-20 overflow-x-hidden ${artifact && isSplitView ? "h-screen overflow-hidden" : ""}`}>
        {(isSubmitting && !artifact) || isIncomingPortal ? (
          <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Dismiss Button */}
            <button
              onClick={() => { setIsSubmitting(false); setIsIncomingPortal(false); }}
              className="absolute top-10 right-10 z-[100] w-12 h-12 rounded-full bg-black/5 backdrop-blur-md border border-black/10 flex items-center justify-center text-black/20 hover:text-black hover:bg-black/10 transition-all shadow-xl group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>

            {/* Only the webm — dead centre */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
               <video
                src="/Wonder Things.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-72 h-72 sm:w-96 sm:h-96 object-contain mix-blend-multiply"
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center"
              >
                <div 
                  className="text-3xl font-serif italic text-[#1B3FBF] animate-pulse"
                >
                  Coming right up...
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : artifact ? (
          <div className={`flex w-full h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 ${isSplitView ? "flex-row overflow-hidden" : "flex-col items-center p-8 overflow-auto"}`}>
            <div className={`${isSplitView ? "w-[420px] shrink-0" : "w-full max-w-2xl mb-6"} flex flex-col ${isSplitView ? "h-full" : "min-h-[50vh]"} overflow-hidden bg-[#f5f7ff] border-r border-black/[0.06]`}>
              <div className="shrink-0 flex justify-between items-center px-6 py-4 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
                <button
                  onClick={() => {
                    // Holistic reset of manifestation state
                    setArtifact(null);
                    setChatHistory([]);
                    setCurrentArtifactId(null);
                    setIsArtifactActive(false);
                    navigate('/');
                  }}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/30 hover:text-[#1B3FBF] transition-all group"
                >
                  <ChevronLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> {t.back}
                </button>
                <button
                  onClick={() => setShareDialogOpen(true)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1B3FBF]/20 bg-[#1B3FBF]/5 text-[#1B3FBF] text-[9px] font-black uppercase tracking-widest hover:bg-[#1B3FBF]/10 transition-all shadow-sm"
                >
                  <Share2 size={12} /> {t.share}
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
                    className="w-full rounded-2xl px-6 py-4 pl-14 pr-14 text-sm outline-none border border-black/[0.08] bg-[#f0f3ff] text-black placeholder:text-black/30 focus:border-[#1B3FBF]/60 focus:bg-white transition-all font-bold disabled:opacity-40"
                    placeholder="Refine the manifest..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" onClick={() => setShowWebCaptureModal(true)} className={`p-2 rounded-lg transition-all ${mimicUrl ? 'text-[#1B3FBF] bg-[#1B3FBF]/10' : 'text-black/30 hover:text-[#1B3FBF] hover:bg-[#1B3FBF]/10'}`}>
                          <Globe size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Mimic Style — {mimicUrl || "Enter URL"}</TooltipContent>
                    </Tooltip>
                  </div>
                  {/* Style Mimic Active Pill */}
                  <AnimatePresence>
                    {mimicUrl && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10, scale: 0.8 }} 
                        animate={{ opacity: 1, x: 0, scale: 1 }} 
                        exit={{ opacity: 0, x: -10, scale: 0.8 }}
                        className="absolute -bottom-10 left-0 bg-[#1B3FBF] text-white py-1.5 px-4 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#1B3FBF]/20"
                      >
                        <Globe size={10} /> {mimicUrl.replace(/^https?:\/\//, '').split('/')[0]}
                        <button type="button" onClick={clearStyleMimic} className="hover:scale-110"><X size={10} /></button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <ArtifactPanel 
                code={artifact} 
                prompt={query} 
                isSplitView={isSplitView} 
                onShare={() => setShareDialogOpen(true)} 
                onRefinement={(refinement) => {
                  setQuery(refinement);
                  // Optionally trigger submit automatically if you want ultra-fast iteration
                  // setTimeout(() => handleSubmit(refinement), 100);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full relative">
            <section className="min-h-screen flex flex-col items-center justify-center gap-16 px-4 pb-32 relative w-full">


              <div className="text-center space-y-8 pt-12 md:pt-16 relative z-20">
                <h1 className="text-7xl md:text-8xl font-light tracking-tighter leading-tight animate-in fade-in slide-in-from-top-12 duration-1000">
                  {t.hero_tagline.split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-yellow-accent italic font-serif px-2">{t.hero_tagline.split(' ').slice(2).join(' ')}</span>
                </h1>
              </div>
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                  <div id="kreo-tour-prompt" className={`flex items-center rounded-[1.8rem] px-6 py-4 shadow-2xl transition-all border ring-1 gap-3 ${theme === 'light' ? 'bg-white border-black/10 ring-black/5 text-black' : 'glass-panel border-white/20 ring-white/10 backdrop-blur-3xl text-white'}`}>
                    <div id="kreo-tour-upload" className={`flex items-center gap-2 pr-2 border-r leading-none ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-foreground/40 hover:text-foreground">
                        <Paperclip size={20} />
                      </button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" onClick={() => setShowWebCaptureModal(true)} className="p-2 text-foreground/40 hover:text-[#1B3FBF]">
                            <Globe size={20} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Web Capture Style</TooltipContent>
                      </Tooltip>
                    </div>
                    <input
                      className={`flex-1 bg-transparent text-lg outline-none font-satoshi font-bold ${theme === 'light' ? 'placeholder:text-black/30 text-black' : 'placeholder:text-white/40 text-white'}`}
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
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1B3FBF]">{t.manifesto_situation}</span>
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-black leading-tight">{t.manifesto_situations_title}</h2>
                </div>
                <ScenariosGrid />
                <TypingKreo />
                <PossibilitiesPile />
                <InteractiveVisualLoop theme={theme} />
                <div className="flex justify-center pt-16">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-105 transition-all">{t.cta_start}</button>
                </div>
              </div>
            </section>
            <Footer />
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

      <BrandKitModal 
        isOpen={showBrandKitModal} 
        onClose={() => setShowBrandKitModal(false)} 
        brandKit={brandKit} 
        onSave={saveBrandKit} 
      />

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

              <div className={`flex items-center gap-3 p-4 border rounded-[2rem] transition-all ${
                currentArtifactId?.startsWith('opt-') 
                  ? 'bg-amber-50/50 border-amber-200/50' 
                  : 'bg-[#1B3FBF]/5 border-[#1B3FBF]/10'
              }`}>
                {currentArtifactId?.startsWith('opt-') ? (
                  <RefreshCw className="text-amber-500 animate-spin shrink-0" size={18} />
                ) : (
                  <LinkIcon className="text-[#1B3FBF] shrink-0" size={18} />
                )}
                
                <div className="flex-1 min-w-0">
                  <input
                    readOnly
                    onClick={(e) => !currentArtifactId?.startsWith('opt-') && (e.target as HTMLInputElement).select()}
                    value={currentArtifactId?.startsWith('opt-') 
                      ? "Syncing to Cloud Neural Buffer..." 
                      : `${window.location.origin}/share/${currentArtifactId || 'unbound'}`}
                    className={`w-full bg-transparent text-xs outline-none truncate ${
                      currentArtifactId?.startsWith('opt-') ? 'text-amber-600 font-medium' : 'font-mono text-[#1B3FBF]'
                    }`}
                  />
                  {currentArtifactId?.startsWith('opt-') && (
                    <p className="text-[8px] text-amber-500 mt-1 uppercase font-black tracking-widest">Available locally only during sync</p>
                  )}
                </div>

                <button
                  disabled={currentArtifactId?.startsWith('opt-')}
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/share/${currentArtifactId}`);
                    toast({ title: "Link Manifested", description: "URL copied to your neural buffer." });
                  }}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${
                    currentArtifactId?.startsWith('opt-')
                      ? 'bg-black/5 text-black/20 shadow-none cursor-not-allowed'
                      : 'bg-[#1B3FBF] text-white shadow-[#1B3FBF]/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  {currentArtifactId?.startsWith('opt-') ? "Wait..." : "Copy Link"}
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
      {/* KREON Identity Screen */}
      <AnimatePresence>
        {showKreonModal && (
          <IdentityScreen
            userEmail={userEmail}
            initialBio={residentBio}
            onClose={() => setShowKreonModal(false)}
            onBioGenerated={(bio) => {
              setResidentBio(bio);
              localStorage.setItem('kreo_resident_bio', bio);
            }}
          />
        )}
      </AnimatePresence>
      {showWebCaptureModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-[#0020C2]/10 backdrop-blur-2xl animate-in fade-in duration-500">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white w-full max-w-xl rounded-[4rem] p-12 space-y-10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B3FBF]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1B3FBF]/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 bg-[#1B3FBF]/5 rounded-3xl flex items-center justify-center text-[#1B3FBF] mb-2">
                <Globe size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-5xl font-serif italic tracking-tighter text-black" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>{t.webcapture_title}</h3>
                <p className="text-[11px] font-serif italic text-[#1B3FBF] uppercase tracking-widest opacity-60">{t.webcapture_sub}</p>
              </div>
              <button onClick={() => setShowWebCaptureModal(false)} className="absolute top-0 right-0 p-4 text-black/20 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8 relative z-10 w-full max-w-md mx-auto">
              <div className="space-y-3">
                <div className="relative">
                  <input
                    autoFocus
                    type="url"
                    placeholder={t.webcapture_placeholder}
                    className="w-full bg-[#f8faff] border-2 border-transparent rounded-[2rem] px-8 py-6 text-lg outline-none focus:border-[#1B3FBF]/20 focus:bg-white transition-all font-light text-center placeholder:text-black/10 shadow-inner text-black"
                    value={captureUrl}
                    onChange={(e) => setCaptureUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && captureUrl) {
                        setMimicUrl(captureUrl);
                        setShowWebCaptureModal(false);
                        setCaptureUrl("");
                      }
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (captureUrl) {
                    setMimicUrl(captureUrl);
                    setShowWebCaptureModal(false);
                    setCaptureUrl("");
                  }
                }}
                disabled={!captureUrl}
                className="w-full py-6 bg-[#1B3FBF] text-white text-[11px] font-black uppercase tracking-[0.6em] rounded-full shadow-2xl shadow-[#1B3FBF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {t.webcapture_cta}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <RandomMentraNotification />
    </div>
  );
};

export default HomeScreen;
