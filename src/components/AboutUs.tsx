import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/Hello (apple) (1).json';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="relative py-40 px-10 overflow-hidden bg-white text-[#0020C2]">
      {/* Subtle decorative elements for a premium white look */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-50 blur-[100px] rounded-full opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          {/* Lottie Animation side - Moved to right */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-100/50 rounded-[4rem] blur-2xl group-hover:bg-blue-100 transition-all duration-700" />
            <div className="relative p-8 bg-white/50 border border-blue-100 rounded-[4rem] backdrop-blur-xl shadow-2xl shadow-blue-900/5">
              <div className="w-full aspect-square max-w-[400px] mx-auto scale-110">
                <Lottie 
                  animationData={animationData} 
                  loop={true} 
                  className="w-full h-full"
                />
              </div>
              
              {/* Playful UI Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-6 bg-white border border-blue-100 rounded-3xl shadow-xl flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-blue-100 rounded-full" />
                  <div className="h-2 w-10 bg-blue-50 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text content side - Moved to left (first) */}
          <div className="w-full md:w-1/2 space-y-10 text-center md:text-left relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-[#0020C2]/60 mb-6 font-satoshi">The Architect</span>
              <h2 className="text-7xl md:text-9xl font-light italic font-serif text-[#0020C2] leading-[0.85] tracking-tighter">
                Dhruv <br/> <span className="not-italic text-yellow-500 font-sans font-black underline decoration-blue-100 underline-offset-8">GAUTAM</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="space-y-6 text-xl md:text-2xl font-light leading-relaxed font-serif italic max-w-xl text-[#0020C2]/80"
            >
              <p>
                Dhruv is a young visionary architect who believes that imagination shouldn't be limited by tools.
              </p>
              <p>
                He built KREO with a simple philosophy: "Why think when you can visualise?" 
                Every pixel in KREO is designed to bring your thoughts to life with cinematic precision.
              </p>
              <p className="text-lg text-[#0020C2]/60">
                When he's not orchestrating neural manifestations, you'll find him obsessing over the perfect balance of white space and serif typography.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               {['Visionary', 'Minimalist', 'Core Architect', 'Design Lead'].map((tag, i) => (
                 <motion.span 
                   key={tag}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="px-6 py-2 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black uppercase tracking-widest text-[#0020C2]/40 hover:text-[#0020C2] hover:bg-blue-100 transition-all cursor-default font-satoshi"
                 >
                   {tag}
                 </motion.span>
               ))}
            </div>

            {/* Playful Status Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mt-12 p-6 bg-white border border-blue-100 rounded-3xl shadow-lg max-w-xs mx-auto md:mx-0 flex items-center gap-4 group hover:shadow-xl transition-all"
            >
               <div className="relative">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0020C2] group-hover:rotate-12 transition-transform">
                   <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                 </div>
               </div>
               <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#0020C2]/20 font-satoshi">Current Mood</div>
                  <div className="text-sm font-serif italic text-[#0020C2]/80">Manifesting New Realities</div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
