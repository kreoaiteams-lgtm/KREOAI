import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Zap, Globe, Cpu, Smartphone, Layout, ArrowRight, ShieldCheck, ZapOff, CheckCircle2, Search, ArrowUp } from 'lucide-react';

const KreoMasterPromo = () => {
  const [scene, setScene] = useState(-1); 
  const [typedText, setTypedText] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  
  const scenarios = [
    { name: "School Ki tension", messages: [
      { sender: "Chirkut Friend", text: "Bro, project submission is in 10 mins! 😱" },
      { sender: "Me", text: "Chill, I haven't even opened the laptop yet." },
      { sender: "Chirkut Friend", text: "We are dead... teacher will kill us." },
      { sender: "Me", text: "Wait... KREO zindabad. Check this." }
    ], prompt: "Manifest a clean, modern school project dashboard for history." },
    { name: "The Corporate Nightmare", messages: [
      { sender: "Boss 👹", text: "Where is the app design? Client is on the call!" },
      { sender: "Me", text: "Sir, I'm just polishing the pixels..." },
      { sender: "Boss 👹", text: "I need it NOW or no bonus this month!" },
      { sender: "Me", text: "Pixels polished. Manifesting now." }
    ], prompt: "Manifest a luxury real estate dashboard with 3D views." },
    { name: "Startup Hustle", messages: [
      { sender: "Co-Founder 🤡", text: "Pitch deck is missing a tech slide. Investor is here." },
      { sender: "Me", text: "I'm on it. Just give me 30 seconds." },
      { sender: "Co-Founder 🤡", text: "30 seconds? Are you a wizard?" },
      { sender: "Me", text: "Better. I have KREO." }
    ], prompt: "Manifest a futuristic AI analytics dashboard for startups." }
  ];

  const [activeScenario] = useState(scenarios[Math.floor(Math.random() * scenarios.length)]);

  useEffect(() => {
    if (scene === -1) {
      setChatMessages([]); // Reset on start
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
    if (scene === 2) setTimeout(() => setScene(5), 5000); // Jump to Code after Artifact
    if (scene === 5) setTimeout(() => setScene(6), 4000); // To Responsive
    if (scene === 6) setTimeout(() => setScene(3), 4000); // To Mentra
    if (scene === 3) setTimeout(() => setScene(4), 5000); // To Final
  }, [scene]);

  const bgImage = "file:///Users/dhruvgautam/.gemini/antigravity/brain/c2033881-71b8-461f-826d-0e22f90a9933/promo_background_atmosphere_1778411496540.png";

  return (
    <div className={`fixed inset-0 transition-colors duration-1000 ${scene <= 0 ? 'bg-[#fcfcff]' : 'bg-[#050505]'} text-black overflow-hidden font-sans z-[9999]`}>
      {/* Cinematic Background Layer (Only for Manifestation phases) */}
      <AnimatePresence>
        {scene > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
      </AnimatePresence>
      
      {scene > 0 && <div className="absolute inset-0 bg-black/40 z-[1]" />}
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
              className="w-full max-w-md h-[600px] flex flex-col bg-[#e5ddd5] rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white relative z-[50]"
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

          {/* SCENE 0: THE CHAT SPARK (Transitions to Manifest) */}
          {scene === 0 && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`w-full max-w-2xl space-y-12 text-center ${scene <= 0 ? 'text-black' : 'text-white'}`}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Neural Interface Active</span>
                <h1 className="text-5xl md:text-6xl font-serif italic tracking-tighter">Your vision, <span className="opacity-40">manifested.</span></h1>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1B3FBF]/50 to-purple-500/50 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className={`relative flex items-center gap-4 ${scene <= 0 ? 'bg-black/[0.03] border-black/[0.06]' : 'bg-white/5 backdrop-blur-3xl border border-white/10'} p-6 rounded-[2rem] text-left`}>
                  <div className="p-3 bg-[#1B3FBF]/10 rounded-2xl">
                    <MessageSquare size={24} className="text-[#1B3FBF]" />
                  </div>
                  <div className={`flex-1 text-xl md:text-2xl font-light tracking-tight ${scene <= 0 ? 'text-black/80' : 'text-white/80'}`}>
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
                  className="absolute inset-0 border border-white/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-4 border border-[#1B3FBF]/20 rounded-full"
                />
                <div className="w-32 h-32 rounded-full bg-[#1B3FBF]/5 backdrop-blur-3xl flex items-center justify-center relative">
                   <Zap className="text-[#1B3FBF] animate-pulse" size={48} />
                   {Array.from({ length: 12 }).map((_, i) => (
                     <motion.div
                       key={i}
                       animate={{ 
                         rotate: [i * 30, i * 30 + 360],
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.4, 0.1]
                       }}
                       transition={{ repeat: Infinity, duration: 3, delay: i * 0.1 }}
                       className="absolute inset-0 flex items-start justify-center"
                     >
                       <div className="w-1 h-8 bg-gradient-to-b from-[#1B3FBF] to-transparent rounded-full" />
                     </motion.div>
                   ))}
                </div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif italic tracking-tight text-white/80">Orchestrating Visual DNA...</h2>
                <div className="w-48 h-[1px] bg-white/5 mx-auto relative overflow-hidden">
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
              className="w-full h-full flex items-center justify-center gap-16 flex-col md:flex-row"
            >
              <div className="space-y-8 max-w-md text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Instant Manifestation</span>
                  <h2 className="text-6xl font-serif italic tracking-tighter leading-none">Aura <span className="opacity-40">Fitness.</span></h2>
                </div>
                <p className="text-lg font-light text-white/40 leading-relaxed">
                  High-fidelity UIs generated in seconds. Fully responsive, multi-million dollar aesthetics, and production-ready code.
                </p>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                     <Layout size={14} className="text-[#1B3FBF]" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Bento Logic</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                     <Smartphone size={14} className="text-[#1B3FBF]" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Mobile First</span>
                   </div>
                </div>
              </div>

              {/* Phone Frame Simulation */}
              <div className="relative w-[300px] h-[600px] bg-black rounded-[3.5rem] border-[10px] border-black shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="h-full w-full bg-[#f8f9ff] text-black p-6 space-y-8 flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center opacity-20">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-black" />
                      <div className="w-3 h-3 rounded-full border border-black" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 text-[#1B3FBF]">Good Morning</span>
                    <h3 className="text-4xl font-serif italic leading-none tracking-tighter">Dhruv <span className="opacity-30">G.</span></h3>
                  </div>

                  {/* Bento Boxes */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="col-span-2 bg-[#1B3FBF] rounded-[2.5rem] p-6 text-white space-y-4">
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

          {/* SCENE 5: CODE FLOW */}
          {scene === 5 && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-4xl space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">The Source</span>
                <h2 className="text-5xl font-serif italic tracking-tighter">Pure, production-ready <span className="opacity-40">logic.</span></h2>
              </div>
              <div className="bg-black/80 rounded-[2.5rem] border border-white/10 p-8 font-mono text-sm text-[#1B3FBF]/80 overflow-hidden relative h-[400px]">
                <motion.div 
                  animate={{ y: [0, -800] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="space-y-2"
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="opacity-10 w-8">{i + 1}</span>
                      <span className="text-white/60">
                        {i % 4 === 0 ? 'export const Manifestation = () => {' : 
                         i % 4 === 1 ? '  const [active, setActive] = useState(false);' :
                         i % 4 === 2 ? '  return <motion.div className="p-12">' : 
                                       '    <h1 className="serif italic">Neural Core</h1>'}
                      </span>
                    </div>
                  ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none" />
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
              className="w-full h-full flex flex-col items-center justify-center gap-12"
            >
               <div className="text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Infinite Adaptability</span>
                <h2 className="text-5xl font-serif italic tracking-tighter">Mobile. Tablet. <span className="opacity-40">Desktop.</span></h2>
              </div>
              <div className="flex items-center gap-8 w-full max-w-4xl justify-center">
                 <motion.div 
                    animate={{ width: [320, 850, 320] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-[450px] border-[8px] border-white/10 rounded-[3rem] bg-white overflow-hidden shadow-2xl relative"
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

          {/* SCENE 3: MENTRA INTELLIGENCE */}
          {scene === 3 && (
            <motion.div 
              key="mentra"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-5xl flex flex-col items-center gap-12"
            >
              <div className="text-center space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Deep Intelligence</span>
                <h2 className="text-7xl font-serif italic tracking-tighter">MENTRA</h2>
              </div>

              <div className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] space-y-12 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <div className="flex items-center gap-4 text-white/40">
                    <Search size={16} />
                    <span className="text-sm font-light italic font-serif">Comparing High-Performance Mobility...</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 text-white">Live Data Synced</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <h4 className="text-4xl font-serif italic tracking-tighter text-white/80">Tata <span className="opacity-20">Harrier</span></h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Safety</span>
                         <div className="text-xl font-serif italic">5-Star GNCAP</div>
                       </div>
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Mileage</span>
                         <div className="text-xl font-serif italic">16.8 kmpl</div>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-6 border-l border-white/5 pl-16">
                    <h4 className="text-4xl font-serif italic tracking-tighter text-white/80">Mahindra <span className="opacity-20">XUV700</span></h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Safety</span>
                         <div className="text-xl font-serif italic">5-Star GNCAP</div>
                       </div>
                       <div className="space-y-1">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-[#1B3FBF]">Mileage</span>
                         <div className="text-xl font-serif italic">15.5 kmpl</div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                   <div className="px-8 py-4 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
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
              className="text-center space-y-12"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4"
              >
                <h1 className="text-[12rem] md:text-[18rem] font-normal leading-none tracking-tighter text-white drop-shadow-2xl font-serif">KREO</h1>
                <p className="text-3xl font-serif italic tracking-tight opacity-40">The Silent Threshold of Design.</p>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileActive={{ scale: 0.95 }}
                className="px-12 py-5 bg-[#1B3FBF] text-white rounded-full text-sm font-black uppercase tracking-[0.5em] shadow-[0_20px_50px_rgba(27,63,191,0.3)] border border-[#1B3FBF]/50"
              >
                Start Manifesting
              </motion.button>

              <div className="flex gap-12 justify-center pt-24 opacity-20">
                <div className="flex flex-col items-center gap-2">
                  <Smartphone size={24} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Mobile</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Globe size={24} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Web</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Layout size={24} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Dash</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aesthetic Overlays */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1B3FBF]/40 to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-60" />
      
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
