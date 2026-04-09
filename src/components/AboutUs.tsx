import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Globe, ShieldCheck, Zap, Code, Layout, BarChart, Smartphone, 
  Cpu, Layers, Cloud, Terminal, CheckCircle2, Monitor, Database, Settings, ToggleRight
} from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="relative min-h-[220vh] pt-12 pb-32 px-6 overflow-hidden bg-white text-[#0020C2] flex flex-col items-center">
      {/* Subtle background atmosphere - Editorial White */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/40 blur-[220px] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-yellow-50/40 blur-[180px] rounded-full opacity-40 pointer-events-none" />

      {/* Scattered background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="absolute -top-20 -left-20 w-[400px] h-[400px] border border-blue-100 rounded-full" />
      </div>

      {/* SPREAD UI COMPONENTS AROUND THE SCREEN - AS REQUESTED */}
      <div className="absolute inset-0 pointer-events-none select-none">
         {/* Code Snippet Card - Scattered Left */}
         <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute top-[20%] left-[5%] p-6 bg-white border border-blue-50 rounded-3xl shadow-xl shadow-blue-900/5 hidden md:block z-30 pointer-events-auto"
         >
            <div className="flex gap-1.5 mb-3">
               <div className="w-2 h-2 rounded-full bg-red-400/40" />
               <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
               <div className="w-2 h-2 rounded-full bg-green-400/40" />
            </div>
            <div className="space-y-2">
               <div className="h-1.5 w-16 bg-blue-100 rounded-full" />
               <div className="h-1.5 w-10 bg-blue-50 rounded-full" />
            </div>
            <span className="block mt-4 text-[8px] font-black uppercase text-blue-500/30">Logic.manifest</span>
         </motion.div>

         {/* Metrics Pill - Scattered Right */}
         <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute top-[35%] right-[5%] p-6 bg-white border border-blue-50 rounded-full shadow-xl shadow-blue-900/5 flex items-center gap-4 hidden md:flex z-30 pointer-events-auto"
         >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><BarChart size={18} /></div>
            <div>
               <div className="text-[9px] font-black uppercase text-blue-400/40">Efficiency</div>
               <div className="text-sm font-serif italic text-blue-900/60">Optimized</div>
            </div>
         </motion.div>

         {/* System Settings Toggle - Scattered Bottom Left */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-[40%] left-[10%] p-6 bg-yellow-50/20 border border-yellow-100 rounded-3xl flex items-center gap-6 hidden md:flex z-30 pointer-events-auto"
         >
            <ToggleRight size={24} className="text-yellow-600/60" />
            <span className="text-[9px] font-black uppercase tracking-widest text-yellow-600/40">Visual Depth</span>
         </motion.div>

         {/* Global Scale Card - Scattered Center Right */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute top-[55%] right-[12%] p-6 bg-white border border-blue-50 rounded-3xl shadow-xl shadow-blue-900/5 flex flex-col gap-2 hidden md:flex z-30 pointer-events-auto"
         >
            <div className="flex items-center gap-3">
               <Globe size={16} className="text-blue-500/50" />
               <span className="text-[9px] font-black uppercase text-blue-500/40">Nodes</span>
            </div>
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white" />)}
               <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-400">+</div>
            </div>
         </motion.div>

         {/* Additional Floating UI - Code Pill */}
         <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[10%] right-[25%] px-6 py-2 bg-blue-50 border border-blue-100 rounded-full hidden md:block opacity-40"
         >
            <span className="text-[8px] font-black uppercase tracking-widest text-blue-900">Render Pipeline Alpha</span>
         </motion.div>
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center pt-24">
        {/* Section Label */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-8"
        >
          <div className="px-8 py-2 bg-[#f0f4ff] border border-blue-100 rounded-full flex items-center gap-2">
             <ShieldCheck size={14} className="text-blue-600" />
             <span className="text-[9px] font-black tracking-[0.5em] uppercase text-blue-600/60 font-satoshi">Architecture & Intent</span>
          </div>
        </motion.div>

        {/* Hero Section - The Name */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center relative mb-32"
        >
          <h1 className="flex flex-col items-center select-none">
            <span className="text-[7rem] md:text-[10rem] font-light italic font-serif text-[#0020C2] leading-[0.7] tracking-tighter block">
              Dhruv
            </span>
            <span className="text-[7rem] md:text-[10rem] font-black font-satoshi text-yellow-500 leading-[0.9] tracking-tighter block uppercase">
              GAUTAM
            </span>
          </h1>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '100%' }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="h-4 bg-[#f0f4ff] mt-2 mx-auto opacity-50"
          />
        </motion.div>

        {/* Narrative Block - Vision */}
        <div className="max-w-4xl w-full space-y-40 text-center mt-12 pb-40 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl font-serif italic text-blue-900/20 tracking-[0.3em] uppercase">The Vision Architect</p>
            <div className="space-y-10 text-xl md:text-2xl font-light leading-relaxed font-serif italic text-[#0020C2]/80">
              <p>
                I am a visionary designer obsessed with the intersection of architecture, code, and neural intelligence. My journey started with a simple question: "Can we manifest imagination instantly?"
              </p>
              <p>
                Through KREO, I have engineered a system that treats design not as a series of manual steps, but as a direct extension of intent. I believe that professional tools should fade into the background, leaving only the clarity of the vision itself.
              </p>
              <p className="text-lg text-[#0020C2]/40 font-satoshi font-medium not-italic tracking-wide">
                My architectural philosophy is rooted in "Rich Minimalism"—the art of making vast, complex structures feel effortless and intentional.
              </p>
            </div>
          </motion.div>

          {/* New Skill Manifest Component - Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-10 bg-blue-50/30 border border-blue-100 rounded-[3.5rem] space-y-6"
             >
                <div className="p-4 bg-white border border-blue-100 w-max rounded-2xl shadow-sm">
                  <Cpu size={20} className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#0020C2]">Neural Logic</h3>
                <p className="text-lg font-serif italic text-[#0020C2]/60 leading-relaxed">Engineering the background orchestration that turns simple prompts into high-resolution layouts.</p>
                <div className="pt-2 space-y-2">
                   {['Reasoning Engines', 'Contextual Mapping', 'Logical Manifestation'].map(s => (
                     <div key={s} className="flex items-center gap-3 text-[9px] font-black uppercase text-blue-600/40 tracking-widest">
                        <CheckCircle2 size={10} /> {s}
                     </div>
                   ))}
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-10 bg-yellow-50/20 border border-yellow-100 rounded-[3.5rem] space-y-6"
             >
                <div className="p-4 bg-white border border-yellow-100 w-max rounded-2xl shadow-sm">
                  <Layers size={20} className="text-yellow-600" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#0020C2]">Visual Depth</h3>
                <p className="text-lg font-serif italic text-[#0020C2]/60 leading-relaxed">Pioneering the "Rich Minimalism" aesthetic, where every pixel is deliberate and atmospheric.</p>
                <div className="pt-2 space-y-2">
                   {['Editorial Typography', 'Atmospheric Gradients', 'High-Fidelity UI'].map(s => (
                     <div key={s} className="flex items-center gap-3 text-[9px] font-black uppercase text-yellow-600/60 tracking-widest">
                        <CheckCircle2 size={10} /> {s}
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>

          {/* Philosophy Detail - manifesto */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 md:p-20 bg-[#0020C2] text-white rounded-[4rem] space-y-10 relative overflow-hidden"
          >
             <Cloud size={80} className="absolute -top-10 -right-10 opacity-10 rotate-12" />
             <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40">The Manifest Manifesto</span>
                <h3 className="text-4xl md:text-5xl font-light italic font-serif leading-tight">"Code is just the canvas. Vision is the paintbrush."</h3>
                <p className="text-lg font-light italic font-serif text-white/60 leading-relaxed">
                  I created KREO to bridge the gap between abstract thought and production-grade reality. Technology should serve creativity, not hinder it.
                </p>
             </div>
          </motion.div>

          {/* Final Operational Status */}
          <div className="flex flex-col items-center gap-10 pt-10">
             <div className="text-center">
                <div className="text-[9px] font-black uppercase tracking-widest text-[#0020C2]/20 font-satoshi mb-4">Operational Status</div>
                <div className="flex items-center gap-4 py-4 px-10 bg-blue-50 rounded-full border border-blue-100">
                   <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                   <span className="text-xl font-serif italic text-[#0020C2]/80">Building The Future</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
