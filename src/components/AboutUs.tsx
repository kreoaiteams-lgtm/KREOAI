import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="relative min-h-[140vh] py-32 px-6 overflow-hidden bg-white text-[#0020C2] flex flex-col items-center">
      {/* Subtle background atmosphere - Editorial White */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/40 blur-[180px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-yellow-50/40 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      {/* Floating UI Elements around the Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[15%] p-4 bg-white/40 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-500/60">Creative Signal Alpha</span>
        </motion.div>
        
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[15%] right-[20%] p-4 bg-white/40 backdrop-blur-md border border-yellow-100 rounded-2xl shadow-sm flex items-center gap-3">
          <Zap size={14} className="text-yellow-500" />
          <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500/60">Neural Pulse Active</span>
        </motion.div>

        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-[40%] right-[10%] w-32 h-32 border border-blue-50 rounded-full opacity-20" />
        <motion.div animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute top-[40%] left-[5%] w-48 h-48 border border-yellow-50 rounded-full opacity-20" />
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        {/* The Architect Pill */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <div className="px-8 py-2 bg-[#f0f4ff] border border-blue-100 rounded-full flex items-center gap-3">
             <ShieldCheck size={14} className="text-blue-600" />
             <span className="text-[10px] font-black tracking-[0.5em] uppercase text-blue-600/60 font-satoshi">The Architect</span>
          </div>
        </motion.div>

        {/* Hero Section - The Name - Styled exactly like screenshot */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="text-center relative mb-24"
        >
          <h1 className="flex flex-col items-center select-none">
            <span className="text-[10rem] md:text-[14rem] font-light italic font-serif text-[#0020C2] leading-[0.7] tracking-tighter block">
              Dhruv
            </span>
            <span className="text-[10rem] md:text-[14rem] font-black font-satoshi text-yellow-500 leading-[0.9] tracking-tighter block uppercase">
              GAUTAM
            </span>
          </h1>
          
          {/* Underline Bar from screenshot */}
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '100%' }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="h-6 bg-[#f0f4ff] mt-4 mx-auto opacity-60"
          />
        </motion.div>

        {/* First Person Description - Smaller Text as requested */}
        <div className="max-w-3xl w-full space-y-24 text-center mt-12 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl font-serif italic text-blue-900/40 leading-tight">Founder & Lead Orchestrator</p>
            <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed font-serif italic text-[#0020C2]/80">
              <p>
                I am a young visionary architect who believes that imagination shouldn't be limited by tools.
                I built KREO with a simple philosophy: "Why think when you can visualise?" 
              </p>
              <p>
                Every pixel in KREO is designed to bring my thoughts—and yours—to life with cinematic precision. 
              </p>
              <p className="text-base md:text-lg text-[#0020C2]/50 font-satoshi font-medium not-italic tracking-wide">
                When I'm not orchestrating neural manifestations, you'll find me obsessing over the perfect balance of white space and typography.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-16"
          >
            <div className="flex flex-wrap justify-center gap-3">
               {['Visionary', 'Minimalist', 'Core Architect', 'Design Lead'].map((tag, i) => (
                 <span 
                   key={tag}
                   className="px-8 py-3 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-[#0020C2]/40 font-satoshi hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all cursor-default"
                 >
                   {tag}
                 </span>
               ))}
            </div>

            {/* Playful Status Widget */}
            <div className="p-10 bg-white border border-blue-100 rounded-[3rem] shadow-2xl shadow-blue-900/5 flex flex-col items-center gap-6 max-w-xs group hover:scale-[1.02] transition-all">
               <div className="relative">
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0020C2] group-hover:rotate-12 transition-transform duration-500">
                   <div className="w-5 h-5 bg-yellow-400 rounded-full animate-ping" />
                 </div>
               </div>
               <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0020C2]/20 font-satoshi mb-2">Current State</div>
                  <div className="text-xl font-serif italic text-[#0020C2]/80 leading-none">Manifesting Realities</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
