import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Globe, ShieldCheck, Zap, Code, Layout, BarChart, Smartphone, 
  Cpu, Layers, Cloud, Terminal, CheckCircle2, Monitor, Database
} from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="relative min-h-[220vh] py-32 px-6 overflow-hidden bg-white text-[#0020C2] flex flex-col items-center">
      {/* Subtle background atmosphere - Editorial White */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/40 blur-[220px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-yellow-50/40 blur-[180px] rounded-full opacity-50 pointer-events-none" />

      {/* Floating KREO-built UI Elements - Orchestrated across the scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Code Artifact Snippet */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[5%] w-72 p-6 bg-white border border-blue-50 rounded-3xl shadow-xl shadow-blue-900/5 backdrop-blur-md hidden xl:block z-20"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#0020C2]/30 ml-2">App.tsx</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 w-full bg-blue-100/50 rounded-full" />
            <div className="h-2 w-[90%] bg-blue-100/50 rounded-full" />
            <div className="h-2 w-[40%] bg-yellow-100/50 rounded-full" />
            <div className="h-2 w-[70%] bg-blue-100/50 rounded-full" />
          </div>
        </motion.div>

        {/* Neural Analytics Card */}
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[18%] right-[5%] w-60 p-6 bg-white border border-blue-50 rounded-3xl shadow-2xl shadow-blue-900/5 backdrop-blur-md hidden xl:block z-20"
        >
          <div className="flex items-center justify-between mb-6">
            <BarChart size={16} className="text-blue-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-500/80">Velocity Intel</span>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {[30, 60, 45, 100, 75, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-500/40 rounded-t-lg" style={{ height: `${h}%` }} />
            ))}
          </div>
        </motion.div>

        {/* Floating Verified Pill */}
        <motion.div 
          animate={{ x: [0, 8, 0] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[35%] left-[8%] flex items-center gap-3 px-6 py-3 bg-white border border-blue-100 rounded-full shadow-lg z-20"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-900/60">Logic Engine Confirmed</span>
        </motion.div>

        {/* System Tokens Display */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-[25%] right-[10%] p-6 bg-white border border-yellow-100 rounded-[2.5rem] shadow-xl xl:block hidden"
        >
          <div className="text-[10px] font-black uppercase tracking-widest text-yellow-600/40 mb-4">Color Manifest</div>
          <div className="flex gap-3">
             {['#0020C2', '#FACC15', '#FFFFFF', '#F0F4FF'].map((c, i) => (
               <div key={i} className="w-8 h-8 rounded-full border border-black/5" style={{ backgroundColor: c }} />
             ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        {/* Section Label */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <div className="px-10 py-3 bg-[#f0f4ff] border border-blue-100 rounded-full flex items-center gap-3">
             <ShieldCheck size={16} className="text-blue-600" />
             <span className="text-[11px] font-black tracking-[0.6em] uppercase text-blue-600/60 font-satoshi">Architecture & Intent</span>
          </div>
        </motion.div>

        {/* Hero Section - The Name */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="text-center relative mb-24"
        >
          <h1 className="flex flex-col items-center select-none">
            <span className="text-[8rem] md:text-[11rem] font-light italic font-serif text-[#0020C2] leading-[0.7] tracking-tighter block">
              Dhruv
            </span>
            <span className="text-[8rem] md:text-[11rem] font-black font-satoshi text-yellow-500 leading-[0.9] tracking-tighter block uppercase">
              GAUTAM
            </span>
          </h1>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '100%' }}
             transition={{ duration: 1.8, delay: 0.5 }}
             className="h-5 bg-[#f0f4ff] mt-2 mx-auto opacity-60"
          />
        </motion.div>

        {/* Narrative Block - More Data */}
        <div className="max-w-4xl w-full space-y-40 text-center mt-12 pb-40 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <p className="text-2xl md:text-3xl font-serif italic text-blue-900/30 tracking-[0.3em] uppercase">The Vision Architect</p>
            <div className="space-y-12 text-xl md:text-2xl font-light leading-relaxed font-serif italic text-[#0020C2]/80">
              <p>
                I am a visionary designer obsessed with the intersection of architecture, code, and neural intelligence. My journey started with a simple question: "Can we manifest imagination instantly?"
              </p>
              <p>
                Through KREO, I have engineered a system that treats design not as a series of manual steps, but as a direct extension of intent. I believe that professional tools should fade into the background, leaving only the clarity of the vision itself.
              </p>
              <p className="text-lg text-[#0020C2]/50 font-satoshi font-medium not-italic tracking-wide">
                My architectural philosophy is rooted in "Rich Minimalism"—the art of making vast, complex structures feel effortless and intentional.
              </p>
            </div>
          </motion.div>

          {/* New Skill Manifest Component - More UI Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-12 bg-blue-50/30 border border-blue-100 rounded-[4rem] space-y-8"
             >
                <div className="p-5 bg-white border border-blue-100 w-max rounded-3xl shadow-sm">
                  <Cpu size={24} className="text-blue-600" />
                </div>
                <h3 className="text-4xl font-serif italic text-[#0020C2]">Neural Logic</h3>
                <p className="text-lg font-serif italic text-[#0020C2]/60">Engineering the background orchestration that turns simple prompts into high-resolution layouts.</p>
                <div className="pt-4 space-y-3">
                   {['Reasoning Engines', 'Contextual Mapping', 'Logical Manifestation'].map(s => (
                     <div key={s} className="flex items-center gap-3 text-[10px] font-black uppercase text-blue-600/40 tracking-widest">
                        <CheckCircle2 size={12} /> {s}
                     </div>
                   ))}
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-12 bg-yellow-50/20 border border-yellow-100 rounded-[4rem] space-y-8"
             >
                <div className="p-5 bg-white border border-yellow-100 w-max rounded-3xl shadow-sm">
                  <Layers size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-4xl font-serif italic text-[#0020C2]">Visual Depth</h3>
                <p className="text-lg font-serif italic text-[#0020C2]/60">Pioneering the "Rich Minimalism" aesthetic, where every pixel is deliberate and atmospheric.</p>
                <div className="pt-4 space-y-3">
                   {['Editorial Typography', 'Atmospheric Gradients', 'High-Fidelity UI'].map(s => (
                     <div key={s} className="flex items-center gap-3 text-[10px] font-black uppercase text-yellow-600/60 tracking-widest">
                        <CheckCircle2 size={12} /> {s}
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>

          {/* Artifact Capabilities Grid - More UI Elements */}
          <div className="space-y-16">
            <h4 className="text-[11px] font-black uppercase tracking-[0.8em] text-blue-500/30">Orchestration Capabilities</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { icon: Terminal, label: "React Mastery", val: "99%" },
                 { icon: Layout, label: "UX Architecture", val: "Studio" },
                 { icon: Monitor, label: "Motion Engine", val: "Cinematic" },
                 { icon: Database, label: "Data Integrity", val: "Sync" }
               ].map((cap, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="p-10 bg-white border border-blue-50 rounded-[3rem] shadow-xl shadow-blue-900/5 flex flex-col items-center gap-6 group hover:border-blue-100 transition-all"
                 >
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <cap.icon size={24} />
                    </div>
                    <div className="text-center">
                       <span className="block text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{cap.label}</span>
                       <span className="block text-xl font-serif italic text-blue-900/60">{cap.val}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Philosophy Detail - More Data */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-16 bg-[#0020C2] text-white rounded-[5rem] space-y-10 relative overflow-hidden"
          >
             <Cloud size={100} className="absolute -top-10 -right-10 opacity-10 rotate-12" />
             <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">The Manifest Manifesto</span>
                <h3 className="text-5xl md:text-6xl font-light italic font-serif leading-tight">"Code is just the canvas. Vision is the paintbrush."</h3>
                <p className="text-xl font-light italic font-serif text-white/60 leading-relaxed">
                  I created KREO to bridge the gap between abstract thought and production-grade reality. Every feature and every animation is a testament to the belief that technology should serve creativity, not hinder it.
                </p>
             </div>
          </motion.div>

          {/* Final Social/Contact Manifest */}
          <div className="flex flex-col items-center gap-12 pt-20">
             <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0020C2]/20 font-satoshi mb-4">Operational Status</div>
                <div className="flex items-center gap-4 py-4 px-10 bg-blue-50 rounded-full border border-blue-100">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                   <span className="text-2xl font-serif italic text-[#0020C2]/80">Building The Future</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
