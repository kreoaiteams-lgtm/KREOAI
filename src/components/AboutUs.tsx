import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/Hello (apple) (1).json';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="relative py-40 px-10 overflow-hidden bg-white/5 backdrop-blur-3xl border-y border-white/10">
      {/* Decorative glass elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Lottie Animation side */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-white/5 rounded-[4rem] blur-2xl group-hover:bg-white/10 transition-all duration-700" />
            <div className="relative p-8 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-2xl shadow-2xl">
              <div className="w-full aspect-square max-w-[400px] mx-auto scale-110">
                <Lottie 
                  animationData={animationData} 
                  loop={true} 
                  className="w-full h-full"
                />
              </div>
              
              {/* Playful UI Element floating near the animation */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-6 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-xl shadow-xl flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-white/20 rounded-full" />
                  <div className="h-2 w-10 bg-white/10 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text content side */}
          <div className="w-full md:w-1/2 space-y-10 text-center md:text-left relative">
            {/* Playful background element behind text */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-white/60 mb-6 backdrop-blur-md">The Architect behind KREO</span>
              <h2 className="text-7xl md:text-9xl font-light italic font-serif text-white leading-[0.85] tracking-tighter">
                Dhruv <br/> <span className="not-italic text-yellow-400 font-sans font-black underline decoration-white/20 underline-offset-8">GAUTAM</span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-white/60 text-xl md:text-2xl font-light leading-relaxed font-serif italic max-w-xl"
            >
              Masterminding the future of architectural intelligence. Dhruv orchestrates the high-fidelity manifestations that power KREO's neural engine.
            </motion.p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               {['Visionary', 'Minimalist', 'Core Architect', 'Design Lead'].map((tag, i) => (
                 <motion.span 
                   key={tag}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                 >
                   {tag}
                 </motion.span>
               ))}
            </div>

            {/* Added a playful "status" widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mt-12 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl max-w-xs mx-auto md:mx-0 flex items-center gap-4 group hover:bg-white/10 transition-all"
            >
               <div className="relative">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                   <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                 </div>
               </div>
               <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Operational Status</div>
                  <div className="text-sm font-serif italic text-white/80">Manifesting New Realities</div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
