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
          className="fixed inset-0 z-[100] bg-[#0020C2] text-white flex flex-col items-center justify-between py-12 px-8 text-center overflow-hidden"
        >
          {/* Atmospheric Clouds */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <motion.img 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.4 }}
              src="/cloud_left.png" 
              className="absolute -left-20 top-0 h-full w-auto object-contain mix-blend-screen"
            />
            <motion.img 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.4 }}
              src="/cloud_right.png" 
              className="absolute -right-20 top-0 h-full w-auto object-contain mix-blend-screen"
            />
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10 z-[110]"
          >
            <X size={20} />
          </button>

          {/* Top Section - Small Image */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-shrink-0 relative z-10"
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
            className="flex-grow flex flex-col items-center justify-center max-w-2xl space-y-12 relative z-10"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">
                Welcome to <span className="not-italic font-black uppercase text-yellow-400">Kreo</span>
              </h1>
              <p className="text-white/40 text-[10px] font-black tracking-[0.6em] uppercase">Build Your Imagination</p>
            </div>

            <div className="space-y-6 text-lg md:text-xl font-satoshi font-light text-white/90 leading-relaxed px-4">
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
              className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Start Building
            </button>
          </motion.div>

          {/* Bottom Section - Regards and Profile */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex-shrink-0 flex flex-col items-center gap-6 relative z-10"
          >
            <div className="text-center">
              <p className="text-xl font-serif italic text-white/90 leading-tight">Best regards,</p>
              <p className="text-xl font-serif italic text-white/90 leading-tight">Dhruv Gautam</p>
            </div>
            <div className="w-24 h-24 relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-125 opacity-20" />
              <img 
                src="/Screenshot_2026-04-09_at_4.13.17_PM-removebg-preview.png" 
                alt="Dhruv Gautam" 
                className="w-full h-full object-cover rounded-full border-2 border-white/20 relative z-10"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
