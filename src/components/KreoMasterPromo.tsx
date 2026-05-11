import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Zap, Globe, Cpu, Smartphone, Layout, ArrowRight, ShieldCheck, ZapOff, CheckCircle2, Search, ArrowUp } from 'lucide-react';

const KreoMasterPromo = () => {
  const [scene, setScene] = useState(-1); 
  const [typedText, setTypedText] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  const [accentColor, setAccentColor] = useState("#1B3FBF");
  const [activeLang, setActiveLang] = useState("English");
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  
  const scenarios = [
    { name: "Luxury Jewelry Pivot", type: "jewelry", messages: [
      { sender: "CEO 💎", text: "We need to showcase the 2026 Diamond Collection by tonight." },
      { sender: "Me", text: "I'll manifest a high-end vault experience. Stay calm." },
      { sender: "CEO 💎", text: "Wait, don't we need a photographer first?" },
      { sender: "Me", text: "Neural assets are already rendering. Watch." }
    ], prompt: "Manifest a luxury jewelry dashboard with 24k Gold accents and 3D vault transitions." },
    { name: "Global Fitness Launch", type: "fitness", messages: [
      { sender: "Sarah (Fitness)", text: "The app needs to feel like a multi-million dollar health platform." },
      { sender: "Me", text: "I'm orchestrating the biometric DNA right now." },
      { sender: "Sarah (Fitness)", text: "Make it beautiful. No placeholders." },
      { sender: "Me", text: "Beauty is the threshold. Manifesting." }
    ], prompt: "Manifest a premium fitness app with heart-rate tracking and bento layouts." },
    { name: "Food Delivery Crisis", type: "food", messages: [
      { sender: "Restaurant Partner 🍕", text: "The menu is changing every hour! How do we keep up?" },
      { sender: "Me", text: "Real-time menu manifestation. I'll sync the database now." },
      { sender: "Restaurant Partner 🍕", text: "Is it going to look tasty?" },
      { sender: "Me", text: "It will look delicious. KREO style." }
    ], prompt: "Manifest a vibrant food delivery app with organic curves and neon food photography." },
    { name: "Crypto Whale Alert", type: "crypto", messages: [
      { sender: "Investor 📈", text: "The market is moving too fast. I need a terminal that breathes." },
      { sender: "Me", text: "Synthesizing a high-density financial nexus for you." },
      { sender: "Investor 📈", text: "I need it to feel elite. Black and Gold." },
      { sender: "Me", text: "Elite is my baseline. Recalibrating." }
    ], prompt: "Manifest a high-density crypto terminal with glass-morphism and live candle charts." },
    { name: "Executive Presentation", type: "ppt", messages: [
      { sender: "VP of Sales 👔", text: "Board meeting is in an hour. I need the Q4 growth deck." },
      { sender: "Me", text: "Manifesting 12 cinematic slides now. High-fidelity only." },
      { sender: "VP of Sales 👔", text: "Wait, an hour? We need a week for this." },
      { sender: "Me", text: "Welcome to the future. Slides are ready." }
    ], prompt: "Manifest a cinematic 12-slide presentation for executive Q4 growth." },
    { name: "System Architecture", type: "flowchart", messages: [
      { sender: "Lead Architect 🏗️", text: "The user flow for the new payment bridge is too messy." },
      { sender: "Me", text: "I'll manifest a high-density neural flowchart. Give me a second." },
      { sender: "Lead Architect 🏗️", text: "It needs to handle 50+ edge cases." },
      { sender: "Me", text: "Edge cases are my specialty. Mapping now." }
    ], prompt: "Manifest a high-density system flowchart for a global payment bridge." },
    { name: "Medical Exam Prep", type: "flashcards", messages: [
      { sender: "Med Student 🩺", text: "Exams tomorrow. 500 pages of anatomy to memorize..." },
      { sender: "Me", text: "I'll manifest 50 interactive neural flashcards. Focus on the core." },
      { sender: "Med Student 🩺", text: "Interactive? Just make them readable!" },
      { sender: "Me", text: "They will be unforgettable. Study mode active." }
    ], prompt: "Manifest 50 high-fidelity interactive flashcards for human anatomy." }
  ];

  const [activeScenario] = useState(scenarios[Math.floor(Math.random() * scenarios.length)]);

  useEffect(() => {
    if (scene === -1) {
      setChatMessages([]); 
      let i = 0;
      const interval = setInterval(() => {
        if (activeScenario && i < activeScenario.messages.length) {
          setChatMessages(prev => [...prev, activeScenario.messages[i]]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setScene(0), 1500);
        }
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [scene, activeScenario]);

  useEffect(() => {
    if (scene === 0) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(activeScenario.prompt.slice(0, i));
        i++;
        if (i > activeScenario.prompt.length) {
          clearInterval(interval);
          setTimeout(() => setScene(1), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scene, activeScenario]);

  useEffect(() => {
    if (scene === 1) {
      const statuses = [
        "Synthesizing Pixel DNA...",
        "Orchestrating Layout Logic...",
        "Injecting Branding Tokens...",
        "Calibrating Neural Aesthetic...",
        "Manifestation Finalized."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingStatus(statuses[i]);
        i++;
        if (i >= statuses.length) clearInterval(interval);
      }, 600);
      setTimeout(() => setScene(2), 3500);
      return () => clearInterval(interval);
    }
    if (scene === 2) setTimeout(() => setScene(7), 5000); 
    if (scene === 7) setTimeout(() => setScene(8), 4000); // To Language Swap
    if (scene === 8) setTimeout(() => setScene(5), 4000); // To Code
    if (scene === 5) setTimeout(() => setScene(6), 4000); // To Responsive
    if (scene === 6) setTimeout(() => setScene(9), 4000); // To Export
    if (scene === 9) setTimeout(() => setScene(10), 4000); // To "And that's not all"
    if (scene === 10) setTimeout(() => setScene(3), 4000); // To Mentra
    if (scene === 3) setTimeout(() => setScene(4), 5000); // To Final
  }, [scene]);

  useEffect(() => {
    if (scene === 7) {
       const colors = ["#1B3FBF", "#D4AF37", "#10b981", "#ef4444"];
       let i = 0;
       const interval = setInterval(() => {
         setAccentColor(colors[i % colors.length]);
         i++;
       }, 1000);
       return () => clearInterval(interval);
    }
    if (scene === 8) {
       const langs = ["English", "हिंदी", "Español", "Français"];
       let i = 0;
       const interval = setInterval(() => {
         setActiveLang(langs[i % langs.length]);
         i++;
       }, 1000);
       return () => clearInterval(interval);
    }
  }, [scene]);

  const bgImage = "file:///Users/dhruvgautam/.gemini/antigravity/brain/c2033881-71b8-461f-826d-0e22f90a9933/promo_background_atmosphere_1778411496540.png";

  return (
    <div className="fixed inset-0 bg-[#f8f9ff] text-black overflow-hidden font-sans z-[9999]">
      {/* Cinematic Light Background Layer */}
      <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)'
            }}
          />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-white/40 z-[1]" />
      <div className="grain z-[2]" />

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {/* SCENE -1: INTRO CHAT (WhatsApp Light Theme) */}
          {scene === -1 && (
            <motion.div 
              key="intro-chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md h-[600px] flex flex-col bg-[#e5ddd5] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-[10px] border-white relative z-[50]"
            >
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] p-6 pt-10 text-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                   {activeScenario?.name?.includes("School") ? "🎓" : activeScenario?.name?.includes("Corporate") ? "👹" : "🤡"}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm truncate">{activeScenario?.name || "Neural Chat"}</h4>
                  <p className="text-[10px] opacity-60">online</p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[#e5ddd5] relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />
                {chatMessages && chatMessages.map((msg, i) => msg && (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.sender !== 'Me' ? -20 : 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className={`flex relative z-10 ${msg.sender !== 'Me' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed relative shadow-sm ${msg.sender !== 'Me' ? 'bg-white text-black rounded-tl-none' : 'bg-[#dcf8c6] text-black rounded-tr-none'}`}>
                      <span className={`block text-[9px] font-bold mb-1 ${msg.sender !== 'Me' ? 'text-[#075e54]' : 'text-[#2b8a3e]'}`}>{msg.sender}</span>
                      {msg.text}
                      <span className="block text-[8px] opacity-30 text-right mt-1">11:11 PM</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCENE 0: THE CHAT SPARK */}
          {scene === 0 && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl space-y-12 text-center text-black"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Neural Interface Active</span>
                <h1 className="text-5xl md:text-6xl font-serif italic tracking-tighter text-black">Your vision, <span className="opacity-40">manifested.</span></h1>
                <p className="text-sm font-tan-nimbus tracking-widest opacity-20 uppercase">Powered by KREO</p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1B3FBF]/20 to-purple-500/20 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-3xl border border-black/[0.05] shadow-2xl shadow-black/5 p-6 rounded-[2rem] text-left">
                  <div className="p-3 bg-[#1B3FBF]/10 rounded-2xl">
                    <MessageSquare size={24} className="text-[#1B3FBF]" />
                  </div>
                  <div className="flex-1 text-xl md:text-2xl font-light tracking-tight text-black/80">
                    {typedText}<span className="animate-pulse">|</span>
                  </div>
                  <div className="p-3 bg-[#1B3FBF] text-white rounded-2xl shadow-lg">
                    <ArrowUp size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

           {/* SCENE 1: REAL LOADING SCREEN */}
          {scene === 1 && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-16 w-full max-w-md"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 border-4 border-black/5 rounded-full border-t-[#1B3FBF]"
                 />
                 <Zap className="text-[#1B3FBF] animate-bounce" size={48} />
              </div>
              <div className="w-full space-y-6 text-center">
                <motion.div 
                  key={loadingStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-serif italic text-black/80 tracking-tight"
                >
                  {loadingStatus}
                </motion.div>
                <div className="w-full h-[2px] bg-black/5 relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 bg-[#1B3FBF]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 2: DYNAMIC ARTIFACT REVEAL */}
          {scene === 2 && (
            <motion.div 
              key="artifact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full h-full flex items-center justify-center gap-16 flex-col md:flex-row text-black"
            >
              <div className="space-y-8 max-w-md text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Manifestation Complete</span>
                  <h2 className="text-6xl font-serif italic tracking-tighter leading-none capitalize">
                    {activeScenario.type} <span className="opacity-40">Portal.</span>
                  </h2>
                </div>
                <p className="text-lg font-light text-black/40 leading-relaxed">
                  Every pixel synthesized in real-time. No templates. Pure neural architecture tailored to your specific request.
                </p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-black/[0.03] rounded-full border border-black/[0.06] text-[9px] font-bold uppercase tracking-widest">
                     {activeScenario.type === 'jewelry' ? 'Gold DNA' : activeScenario.type === 'fitness' ? 'Biometric Sync' : activeScenario.type === 'food' ? 'Organic Flow' : 'Hedge Logic'}
                   </div>
                </div>
              </div>

              {/* Phone Frame Simulation */}
              <div className="relative w-[300px] h-[600px] bg-black rounded-[3.5rem] border-[10px] border-black shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className={`h-full w-full p-6 space-y-8 flex flex-col transition-colors duration-1000 ${activeScenario.type === 'jewelry' ? 'bg-[#1a1a1a] text-[#D4AF37]' : activeScenario.type === 'crypto' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9ff] text-black'}`}>
                  {/* App Content */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Neural Hub</span>
                    <h3 className="text-4xl font-serif italic leading-none tracking-tighter capitalize">{activeScenario.type} <span className="opacity-30">Gen.</span></h3>
                  </div>

                  {/* Dynamic UI Content */}
                  <div className="flex-1 space-y-6">
                    {activeScenario.type === 'fitness' && (
                      <div className="space-y-6">
                        <div className="bg-[#1B3FBF] rounded-[2.5rem] p-6 text-white space-y-4 shadow-xl shadow-[#1B3FBF]/20">
                           <div className="text-4xl font-serif italic tracking-tighter">12,840 <span className="text-xs opacity-40 not-italic uppercase tracking-widest font-sans font-bold">Steps</span></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-black/5 flex items-center justify-center"><Zap className="text-[#1B3FBF]" /></div>
                          <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-black/5 flex items-center justify-center"><Globe className="text-[#1B3FBF]" /></div>
                        </div>
                      </div>
                    )}
                    {activeScenario.type === 'jewelry' && (
                      <div className="space-y-6">
                        <div className="aspect-[4/5] bg-[#D4AF37]/10 rounded-[3rem] border border-[#D4AF37]/20 flex items-center justify-center overflow-hidden">
                           <div className="text-6xl">💎</div>
                        </div>
                        <div className="text-center font-serif italic text-2xl">The Eternal Vault</div>
                      </div>
                    )}
                    {activeScenario.type === 'food' && (
                      <div className="space-y-6">
                         <div className="relative h-64 bg-gradient-to-br from-[#FF4D4D] to-[#FF8E53] rounded-[3rem] overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-8xl drop-shadow-2xl">🍕</div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                               <div className="h-2 w-1/3 bg-white rounded-full mb-2" />
                               <div className="h-1 w-1/2 bg-white/40 rounded-full" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 bg-white rounded-[2rem] p-4 shadow-sm border border-black/5 flex flex-col justify-between">
                               <div className="text-2xl font-serif italic text-[#FF4D4D]">4.8 ★</div>
                               <span className="text-[8px] font-bold uppercase tracking-widest opacity-30">Top Rated</span>
                            </div>
                            <div className="h-32 bg-white rounded-[2rem] p-4 shadow-sm border border-black/5 flex flex-col justify-between">
                               <div className="text-2xl font-serif italic text-[#FF4D4D]">15 <span className="text-[10px] uppercase font-sans font-bold">Min</span></div>
                               <span className="text-[8px] font-bold uppercase tracking-widest opacity-30">Delivery</span>
                            </div>
                         </div>
                      </div>
                    )}
                    {activeScenario.type === 'ppt' && (
                      <div className="space-y-6">
                         <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-2xl border border-white/10">
                            <div className="text-3xl font-serif italic text-white">Q4 Growth Nexus</div>
                            <div className="h-1 w-12 bg-[#1B3FBF]" />
                            <div className="text-[8px] text-white/40 uppercase tracking-[0.3em]">Confidential Executive Brief</div>
                         </div>
                         <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="aspect-video bg-black/5 rounded-lg border border-black/5" />
                            ))}
                         </div>
                      </div>
                    )}
                    {activeScenario.type === 'flowchart' && (
                      <div className="space-y-4">
                         <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-12 rounded-xl bg-[#1B3FBF] flex items-center justify-center text-[8px] text-white font-bold uppercase tracking-widest">Entry</div>
                            <div className="w-[1px] h-8 bg-black/10" />
                            <div className="w-32 h-16 rounded-xl border border-black/10 flex items-center justify-center text-[8px] font-serif italic px-2 text-center">Payment Verification Engine</div>
                            <div className="flex gap-12 mt-2">
                               <div className="w-[1px] h-8 bg-black/10 rotate-45" />
                               <div className="w-[1px] h-8 bg-black/10 -rotate-45" />
                            </div>
                         </div>
                      </div>
                    )}
                    {activeScenario.type === 'flashcards' && (
                      <div className="space-y-6">
                         <div className="w-full aspect-[3/4] bg-white rounded-[3rem] shadow-2xl border border-black/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
                            <span className="text-[10px] font-bold text-[#1B3FBF] uppercase tracking-widest">Flashcard 01/50</span>
                            <div className="text-4xl font-serif italic tracking-tighter">The Cerebral Cortex</div>
                            <div className="h-[1px] w-12 bg-black/10" />
                            <p className="text-[10px] text-black/40 leading-relaxed">Tap to reveal neural structure</p>
                         </div>
                      </div>
                    )}
                    {activeScenario.type === 'crypto' && (
                      <div className="space-y-4">
                         <div className="h-32 bg-white/5 rounded-[2rem] p-4 flex flex-col justify-between border border-white/10">
                            <span className="text-[10px] font-bold text-green-400">BTC +4.2%</span>
                            <div className="text-3xl font-mono">$64,281</div>
                         </div>
                         <div className="grid grid-cols-2 gap-2 h-48">
                            <div className="bg-white/5 rounded-[2rem] border border-white/5" />
                            <div className="bg-white/5 rounded-[2rem] border border-white/5" />
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 7: BRAND MUTATION */}
          {scene === 7 && (
            <motion.div 
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl space-y-12 text-center"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: accentColor }}>Dynamic Identity</span>
                <h2 className="text-6xl font-serif italic tracking-tighter">Instant <span className="opacity-40">Mutation.</span></h2>
              </div>
              <div className="flex justify-center gap-8">
                 <div className="w-64 h-64 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center gap-4 transition-colors duration-500 bg-white" style={{ border: `1px solid ${accentColor}20` }}>
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-lg" style={{ backgroundColor: accentColor }}>
                       <Zap className="text-white" size={32} />
                    </div>
                    <div className="text-sm font-bold tracking-widest uppercase transition-colors duration-500" style={{ color: accentColor }}>{accentColor}</div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 8: GLOBAL PRESENCE */}
          {scene === 8 && (
            <motion.div 
              key="global"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-4xl space-y-12 text-center"
            >
               <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Global Reach</span>
                <h2 className="text-6xl font-serif italic tracking-tighter">Borders <span className="opacity-40">dissolved.</span></h2>
              </div>
              <motion.div 
                key={activeLang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl font-serif italic tracking-tighter text-[#1B3FBF]"
              >
                {activeLang === "English" ? "Welcome" : activeLang === "हिंदी" ? "नमस्ते" : activeLang === "Español" ? "Bienvenido" : "Bienvenue"}
              </motion.div>
            </motion.div>
          )}

          {/* SCENE 5: CODE FLOW */}
          {scene === 5 && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-4xl space-y-8 text-black"
            >
              <div className="space-y-2 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">The Source</span>
                <h2 className="text-5xl font-serif italic tracking-tighter">Pure, production-ready <span className="opacity-40">logic.</span></h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-black/5 p-8 font-mono text-sm text-[#1B3FBF]/80 overflow-hidden relative h-[400px] shadow-2xl">
                <motion.div 
                  animate={{ y: [0, -800] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="space-y-2"
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="opacity-10 w-8">{i + 1}</span>
                      <span className="text-black/60">
                        {i % 4 === 0 ? 'export const Manifestation = () => {' : 
                         i % 4 === 1 ? '  const [active, setActive] = useState(false);' :
                         i % 4 === 2 ? '  return <motion.div className="p-12">' : 
                                       '    <h1 className="serif italic">Neural Core</h1>'}
                      </span>
                    </div>
                  ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* SCENE 6: RESPONSIVE TRANSFORMATION */}
          {scene === 6 && (
            <motion.div 
              key="responsive"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="w-full h-full flex flex-col items-center justify-center gap-12 text-black"
            >
               <div className="text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Infinite Adaptability</span>
                <h2 className="text-5xl font-serif italic tracking-tighter">Mobile. Tablet. <span className="opacity-40">Desktop.</span></h2>
              </div>
              <div className="flex items-center gap-8 w-full max-w-4xl justify-center">
                 <motion.div 
                    animate={{ width: [320, 850, 320] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-[450px] border-[8px] border-black shadow-2xl rounded-[3rem] bg-white overflow-hidden relative"
                 >
                    <div className="p-10 space-y-8">
                       <div className="w-1/4 h-3 bg-black/5 rounded-full" />
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="h-32 bg-[#1B3FBF]/10 rounded-[2rem]" />
                          <div className="h-32 bg-[#1B3FBF]/10 rounded-[2rem]" />
                          <div className="h-32 bg-[#1B3FBF]/10 rounded-[2rem]" />
                       </div>
                       <div className="h-48 bg-black/5 rounded-[2rem]" />
                    </div>
                    <div className="absolute inset-y-0 right-0 w-1 bg-[#1B3FBF] opacity-20 animate-pulse" />
                 </motion.div>
              </div>
            </motion.div>
          )}

          {/* SCENE 9: EXPORT READY */}
          {scene === 9 && (
            <motion.div 
              key="export"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl space-y-12 text-center"
            >
               <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Production Ready</span>
                <h2 className="text-6xl font-serif italic tracking-tighter">Export <span className="opacity-40">Everywhere.</span></h2>
              </div>
              <div className="flex justify-center flex-wrap gap-6">
                 {['Canva', 'Figma', 'React', 'GitHub', 'Vercel'].map((tool, i) => (
                   <motion.div 
                     key={tool}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className="px-8 py-4 bg-white border border-black/5 rounded-2xl shadow-lg flex items-center gap-3"
                   >
                     <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-[#1B3FBF]" />
                     </div>
                     <span className="font-bold text-xs uppercase tracking-widest">{tool}</span>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* SCENE 10: AND THAT'S NOT ALL */}
          {scene === 10 && (
            <motion.div 
              key="extra"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl font-serif italic tracking-tighter opacity-40">And that's not all...</h2>
              <h1 className="text-7xl font-serif italic tracking-tighter text-black">
                Compare <span className="text-[#1B3FBF]">anything</span> with
              </h1>
              <div className="text-9xl brand-font text-[#1B3FBF] mb-4">MENTRA</div>
              <div className="text-2xl font-tan-nimbus tracking-tighter opacity-30">via KREO</div>
            </motion.div>
          )}

          {/* SCENE 3: MENTRA INTELLIGENCE */}
          {scene === 3 && (
            <motion.div 
              key="mentra"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-5xl flex flex-col items-center gap-12 text-black"
            >
              <div className="text-center space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Deep Intelligence</span>
                <h2 className="text-7xl brand-font tracking-tighter text-[#1B3FBF]">MENTRA</h2>
              </div>

              <div className="w-full bg-white border border-black/5 p-12 rounded-[4rem] space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between border-b border-black/5 pb-8">
                  <div className="flex items-center gap-4 text-black/40">
                    <Search size={16} />
                    <span className="text-sm font-light italic font-serif">Comparing High-Performance Mobility...</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 text-black">Live Data Synced</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <h4 className="text-4xl font-serif italic tracking-tighter text-black/80">Tata <span className="opacity-20">Harrier</span></h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Safety</span>
                         <div className="text-xl font-serif italic text-black/60">5-Star GNCAP</div>
                       </div>
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Mileage</span>
                         <div className="text-xl font-serif italic text-black/60">16.8 kmpl</div>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-6 border-l border-black/5 pl-16">
                    <h4 className="text-4xl font-serif italic tracking-tighter text-black/80">Mahindra <span className="opacity-20">XUV700</span></h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Safety</span>
                         <div className="text-xl font-serif italic text-black/60">5-Star GNCAP</div>
                       </div>
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Mileage</span>
                         <div className="text-xl font-serif italic text-black/60">15.5 kmpl</div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                   <div className="px-8 py-4 bg-black/[0.02] rounded-full border border-black/5 text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
                     Manifest Analysis Complete
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 4: FINAL REVEAL */}
          {scene === 4 && (
            <motion.div 
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-12 text-black"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4"
              >
                <h1 className="text-[12rem] md:text-[18rem] font-normal leading-none tracking-tighter text-black drop-shadow-sm font-tan-nimbus">KREO</h1>
                <p className="text-3xl font-serif italic tracking-tight opacity-40">The Silent Threshold of Design.</p>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileActive={{ scale: 0.95 }}
                className="px-12 py-5 bg-[#1B3FBF] text-white rounded-full text-sm font-black uppercase tracking-[0.5em] shadow-[0_20px_50px_rgba(27,63,191,0.2)]"
              >
                Start Manifesting
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aesthetic Overlays */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1B3FBF]/20 to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-60" />
      
      <style>{`
        .brand-font {
          font-family: 'Glassure', 'Instrument Serif', serif;
          text-transform: uppercase;
        }
        .font-tan-nimbus {
          font-family: 'Tan Nimbus', 'Instrument Serif', serif;
          letter-spacing: -0.05em;
        }
        .grain {
          position: fixed;
          inset: -100% -100%;
          width: 300%;
          height: 300%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
          z-index: 2;
          animation: grain 8s steps(10) infinite;
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          50% { transform: translate(-4%, 2%); }
          90% { transform: translate(2%, -4%); }
        }
      `}</style>
    </div>
  );
};

export default KreoMasterPromo;
