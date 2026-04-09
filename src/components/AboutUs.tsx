import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, ShieldCheck, Zap, Code, Layout, BarChart, Smartphone } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="relative min-h-[160vh] py-32 px-6 overflow-hidden bg-white text-[#0020C2] flex flex-col items-center">
      {/* Subtle background atmosphere - Editorial White */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/40 blur-[180px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-yellow-50/40 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      {/* Floating KREO-built UI Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Code Artifact Snippet */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-64 p-6 bg-white border border-blue-50 rounded-3xl shadow-xl shadow-blue-900/5 backdrop-blur-md hidden lg:block"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#0020C2]/20 ml-2">Manifest.js</span>
          </div>
          <div className="space-y-2 opacity-30">
            <div className="h-1.5 w-full bg-blue-100 rounded-full" />
            <div className="h-1.5 w-[80%] bg-blue-100 rounded-full" />
            <div className="h-1.5 w-[60%] bg-yellow-100 rounded-full" />
          </div>
        </motion.div>

        {/* Neural Analytics Card */}
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] right-[8%] w-56 p-6 bg-white border border-blue-50 rounded-3xl shadow-2xl shadow-blue-900/5 backdrop-blur-md hidden lg:block"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart size={14} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Live Intel</span>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 70, 45, 90, 65].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </motion.div>

        {/* Global Node Signal */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute bottom-[20%] left-[12%] w-40 h-40 border-2 border-dashed border-blue-100/50 rounded-full flex items-center justify-center opacity-40">
           <Globe size={24} className="text-blue-200" />
        </motion.div>

        {/* Floating Verified Pill */}
        <motion.div 
          animate={{ x: [0, 5, 0] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-[45%] left-[8%] flex items-center gap-3 px-4 py-2 bg-yellow-50 border border-yellow-100 rounded-full shadow-sm"
        >
          <Zap size={12} className="text-yellow-600" />
          <span className="text-[9px] font-black uppercase tracking-widest text-yellow-600/60">Neural Ready</span>
        </motion.div>
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        {/* Top Header Label */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-10"
        >
          <div className="px-8 py-2 bg-[#f0f4ff] border border-blue-100 rounded-full flex items-center gap-3">
             <ShieldCheck size={14} className="text-blue-600" />
             <span className="text-[10px] font-black tracking-[0.5em] uppercase text-blue-600/60 font-satoshi">KREO ARCHITECT</span>
          </div>
        </motion.div>

        {/* Hero Section - The Name - Made Smaller as requested */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="text-center relative mb-20"
        >
          <h1 className="flex flex-col items-center select-none">
            <span className="text-[7rem] md:text-[10rem] font-light italic font-serif text-[#0020C2] leading-[0.7] tracking-tighter block">
              Dhruv
            </span>
            <span className="text-[7rem] md:text-[10rem] font-black font-satoshi text-yellow-500 leading-[0.9] tracking-tighter block uppercase">
              GAUTAM
            </span>
          </h1>
          
          {/* Subtle Underline Bar */}
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '100%' }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="h-4 bg-[#f0f4ff] mt-2 mx-auto opacity-50"
          />
        </motion.div>

        {/* Smaller Text Description Block */}
        <div className="max-w-3xl w-full space-y-24 text-center mt-8 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 px-6"
          >
            <p className="text-lg md:text-xl font-serif italic text-blue-900/30 tracking-widest uppercase">Founder & Designer</p>
            <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed font-serif italic text-[#0020C2]/70">
              <p>
                I am a visionary architect who believes that imagination shouldn't be limited by my tools. 
                I built KREO as my master engine for manifestation.
              </p>
              <p>
                Every pixel I manifest is designed to bring your thoughts to life with cinematic precision. 
              </p>
              <p className="text-sm md:text-base text-[#0020C2]/40 font-satoshi font-medium not-italic tracking-wide">
                When I'm not orchestrating neural logic, you'll find me obsessing over the perfect balance of white space and typography.
              </p>
            </div>
          </motion.div>

          {/* Interactive UI Artifact Grid - Representations of what KREO can make */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6"
          >
             {[
               { icon: Code, label: "React Logic" },
               { icon: Layout, label: "Studio UI" },
               { icon: BarChart, label: "Visual Intel" },
               { icon: Smartphone, label: "Mobile First" }
             ].map((art, i) => (
               <div key={i} className="p-8 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] flex flex-col items-center gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <art.icon size={20} className="text-[#0020C2]/60 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#0020C2]/30">{art.label}</span>
               </div>
             ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
               {['Visionary', 'Minimalist', 'Core Architect', 'Design Lead'].map((tag, i) => (
                 <span 
                   key={tag}
                   className="px-8 py-3 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-[#0020C2]/40 font-satoshi"
                 >
                   {tag}
                 </span>
               ))}
            </div>

            {/* Playful Status Widget */}
            <div className="p-8 bg-white border border-blue-100 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex flex-col items-center gap-5 max-w-xs group">
               <div className="relative">
                 <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0020C2] group-hover:rotate-12 transition-transform duration-500">
                   <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                 </div>
               </div>
               <div className="text-center">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0020C2]/20 font-satoshi mb-1">Status</div>
                  <div className="text-lg font-serif italic text-[#0020C2]/70 leading-none">Manifesting...</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
