import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Zap, Globe, Cpu, Smartphone, Layout, ArrowRight, ShieldCheck, ZapOff, CheckCircle2, Search, ArrowUp } from 'lucide-react';

const KreoMasterPromo = () => {
  const [scene, setScene] = useState(-1); 
  const [typedText, setTypedText] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  const [accentColor, setAccentColor] = useState("#1B3FBF");
  const [activeLang, setActiveLang] = useState("English");
  
  const scenarios = [
    { name: "Global Launch", messages: [
      { sender: "Marketing Head 📈", text: "We need the landing page in 5 languages by tomorrow." },
      { sender: "Me", text: "Why tomorrow? Let's do it in 5 seconds." },
      { sender: "Marketing Head 📈", text: "Is that even possible?" },
      { sender: "Me", text: "With KREO, borders don't exist." }
    ], prompt: "Manifest a global landing page with multi-language support and dynamic branding." },
    { name: "Brand Pivot", messages: [
      { sender: "CEO 💎", text: "Change of plans. The brand color is now Gold, not Blue." },
      { sender: "Me", text: "Give me 10 seconds to re-calibrate." },
      { sender: "CEO 💎", text: "Re-calibrating usually takes weeks..." },
      { sender: "Me", text: "Not in the KREO ecosystem." }
    ], prompt: "Manifest a luxury jewelry dashboard with 24k Gold accents and dark-light toggles." }
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
    if (scene === 1) setTimeout(() => setScene(2), 3000);
    if (scene === 2) setTimeout(() => setScene(7), 4000); // To Brand Mutation
    if (scene === 7) setTimeout(() => setScene(8), 4000); // To Language Swap
    if (scene === 8) setTimeout(() => setScene(5), 4000); // To Code
    if (scene === 5) setTimeout(() => setScene(6), 4000); // To Responsive
    if (scene === 6) setTimeout(() => setScene(9), 4000); // To Export
    if (scene === 9) setTimeout(() => setScene(3), 4000); // To Mentra
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
                <h1 className="text-5xl md:text-6xl font-serif italic tracking-tighter">Your vision, <span className="opacity-40">manifested.</span></h1>
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

          {/* SCENE 1: NEURAL ORCHESTRATION */}
          {scene === 1 && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-0 border border-black/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-4 border border-[#1B3FBF]/10 rounded-full"
                />
                <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center relative">
                   <Zap className="text-[#1B3FBF] animate-pulse" size={48} />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif italic tracking-tight text-black/80">Orchestrating Visual DNA...</h2>
                <div className="w-48 h-[1px] bg-black/5 mx-auto relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-[#1B3FBF] w-1/2"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 2: THE ARTIFACT REVEAL */}
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
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Instant Manifestation</span>
                  <h2 className="text-6xl font-serif italic tracking-tighter leading-none">Aura <span className="opacity-40">Fitness.</span></h2>
                </div>
                <p className="text-lg font-light text-black/40 leading-relaxed">
                  High-fidelity UIs generated in seconds. Fully responsive, multi-million dollar aesthetics, and production-ready code.
                </p>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/[0.03] rounded-full border border-black/[0.06]">
                     <Layout size={14} className="text-[#1B3FBF]" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Bento Logic</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-black/[0.03] rounded-full border border-black/[0.06]">
                     <Smartphone size={14} className="text-[#1B3FBF]" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Mobile First</span>
                   </div>
                </div>
              </div>

              {/* Phone Frame Simulation */}
              <div className="relative w-[300px] h-[600px] bg-black rounded-[3.5rem] border-[10px] border-black shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="h-full w-full bg-[#f8f9ff] text-black p-6 space-y-8 flex flex-col">
                  {/* App Content */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 text-[#1B3FBF]">Good Morning</span>
                    <h3 className="text-4xl font-serif italic leading-none tracking-tighter">Dhruv <span className="opacity-30">G.</span></h3>
                  </div>

                  {/* Bento Boxes */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="col-span-2 bg-[#1B3FBF] rounded-[2.5rem] p-6 text-white space-y-4 shadow-xl shadow-[#1B3FBF]/20">
                       <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Daily Activity</span>
                       <div className="text-5xl font-serif italic tracking-tighter">8,432 <span className="text-sm opacity-40 not-italic uppercase tracking-widest font-sans font-bold">Steps</span></div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 2, delay: 1 }} className="h-full bg-white" />
                       </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-black/[0.03] space-y-3">
                       <Zap size={20} className="text-[#1B3FBF]" />
                       <div className="text-2xl font-serif italic">120 <span className="text-[8px] font-sans font-bold opacity-30 uppercase tracking-widest">BPM</span></div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-black/[0.03] space-y-3">
                       <Globe size={20} className="text-[#1B3FBF]" />
                       <div className="text-2xl font-serif italic">240 <span className="text-[8px] font-sans font-bold opacity-30 uppercase tracking-widest">CAL</span></div>
                    </div>
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
                <h2 className="text-7xl font-serif italic tracking-tighter">MENTRA</h2>
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
                <h1 className="text-[12rem] md:text-[18rem] font-normal leading-none tracking-tighter text-black drop-shadow-sm font-serif">KREO</h1>
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
