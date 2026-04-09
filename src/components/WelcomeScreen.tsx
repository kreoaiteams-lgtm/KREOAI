import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WelcomeScreenProps {
  isVisible: boolean;
  onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0020C2] text-white flex flex-col items-center py-20 px-8 text-center overflow-y-auto custom-scrollbar"
        >
          {/* Uniform Atmospheric Clouds - Ensuring they fully cover/meet in the center */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img 
                src="/cloud_left.png" 
                className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-50 scale-150 translate-x-[-20%]"
                alt=""
              />
              <img 
                src="/cloud_right.png" 
                className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-50 scale-150 translate-x-[20%]"
                alt=""
              />
            </motion.div>
          </div>

          {/* Close Button - Fixed to viewport */}
          <button 
            onClick={onClose}
            className="fixed top-10 right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10 z-[110] backdrop-blur-md"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center space-y-12 pb-20 mt-10">
            {/* Top Section - Small Image */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex-shrink-0"
            >
              <img 
                src="/Screenshot_2026-04-09_at_4.14.58_PM-removebg-preview.png" 
                alt="Welcome Icon" 
                className="w-20 h-20 object-contain mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Middle Section - Very Simple Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">
                  Welcome to <span className="not-italic font-black uppercase text-yellow-400">Kreo</span>
                </h1>
                <p className="text-white/40 text-[11px] font-black tracking-[0.8em] uppercase">Build Your Imagination</p>
              </div>

              <div className="space-y-8 text-xl md:text-2xl font-satoshi font-light text-white leading-relaxed max-w-xl mx-auto">
                <p>
                  Kreo is the easiest way to turn your ideas into reality. 
                  Everything you build here will look beautiful and work perfectly.
                </p>
                <p>
                  Just tell us what you want to see, and we will manifest it for you in seconds.
                </p>
              </div>
              
              <button 
                onClick={onClose}
                className="px-14 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Start Building
              </button>
            </motion.div>

            {/* Bottom Section - Regards and Profile */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-8 pt-12"
            >
              <div className="text-center space-y-1">
                <p className="text-2xl font-serif italic text-white/90 leading-tight">Best regards,</p>
                <p className="text-2xl font-serif italic text-white/90 leading-tight">Dhruv Gautam</p>
              </div>
              <div className="w-32 h-32 relative group">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-125 opacity-30 animate-pulse" />
                <img 
                  src="/Screenshot_2026-04-09_at_4.13.17_PM-removebg-preview.png" 
                  alt="Dhruv Gautam" 
                  className="w-full h-full object-cover rounded-full border-2 border-white/20 relative z-10 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
