import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="relative min-h-screen py-40 px-6 overflow-hidden bg-white text-[#0020C2] flex flex-col items-center">
      {/* Subtle decorative elements for a premium white look */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 blur-[150px] rounded-full opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-50 blur-[130px] rounded-full opacity-30" />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        {/* Hero Section - The Name */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center mb-32"
        >
          <span className="inline-block px-6 py-2 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-black tracking-[0.6em] uppercase text-[#0020C2]/40 mb-10 font-satoshi">The Architect</span>
          <h1 className="text-8xl md:text-[12rem] font-light italic font-serif text-[#0020C2] leading-[0.8] tracking-tighter">
            Dhruv <br/> <span className="not-italic text-yellow-500 font-sans font-black underline decoration-blue-50 underline-offset-[20px]">GAUTAM</span>
          </h1>
        </motion.div>

        {/* Content Section - Appears on Scroll */}
        <div className="space-y-32 text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="space-y-8 text-3xl md:text-5xl font-light leading-[1.2] font-serif italic text-[#0020C2]/80">
              <p>
                I am a young visionary architect who believes that imagination shouldn't be limited by tools.
              </p>
              <p>
                I built KREO with a simple philosophy: "Why think when you can visualise?" 
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <p className="text-2xl md:text-4xl font-light font-serif italic text-[#0020C2]/60 leading-relaxed max-w-3xl mx-auto">
              Every pixel in KREO is designed to bring thoughts to life with cinematic precision. 
              When I'm not orchestrating neural manifestations, you'll find me obsessing over the perfect balance of white space and typography.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
               {['Visionary', 'Minimalist', 'Core Architect', 'Design Lead'].map((tag, i) => (
                 <span 
                   key={tag}
                   className="px-10 py-4 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#0020C2]/40 font-satoshi"
                 >
                   {tag}
                 </span>
               ))}
            </div>

            {/* Playful Status Widget */}
            <div className="p-10 bg-white border border-blue-100 rounded-[3rem] shadow-2xl shadow-blue-900/5 flex flex-col items-center gap-6 max-w-sm group">
               <div className="relative">
                 <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-[#0020C2] group-hover:rotate-12 transition-transform duration-500">
                   <div className="w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
                 </div>
               </div>
               <div className="text-center">
                  <div className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0020C2]/20 font-satoshi mb-2">Current State</div>
                  <div className="text-2xl font-serif italic text-[#0020C2]/80 leading-none">Manifesting Realities</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
