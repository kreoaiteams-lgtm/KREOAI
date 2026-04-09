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
          className="fixed inset-0 z-[100] bg-[#0020C2] text-white flex flex-col items-center justify-between py-16 px-8 text-center"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10"
          >
            <X size={20} />
          </button>

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
              className="w-24 h-24 object-contain mx-auto drop-shadow-xl"
            />
          </motion.div>

          {/* Middle Section - Plain Text Data */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-grow flex flex-col items-center justify-center max-w-2xl space-y-10"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-light italic font-serif tracking-tighter">
                Welcome to <span className="not-italic font-black uppercase text-yellow-400">Kreo</span>
              </h1>
              <p className="text-white/40 text-[9px] font-black tracking-[0.6em] uppercase">High-Fidelity Studio</p>
            </div>

            <div className="space-y-6 text-lg md:text-xl font-serif italic text-white/80 leading-relaxed">
              <p>
                KREO is your master engine for architectural manifestation. 
                Experience a new standard of creative depth with professional orchestration and neural precision.
              </p>
              <p>
                Your vision is now powered by Google Opal, ensuring ultra-complex manifestation and logical depth 
                in every pixel and every word.
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="mt-8 px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Enter Studio
            </button>
          </motion.div>

          {/* Bottom Section - Regards and Profile */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex-shrink-0 flex flex-col items-center gap-6"
          >
            <div className="space-y-1">
              <p className="text-xl font-serif italic text-white/90">Best regards,</p>
              <p className="text-xl font-serif italic text-white/90">Dhruv Gautam</p>
            </div>
            <div className="w-24 h-24 relative">
              <img 
                src="/Screenshot_2026-04-09_at_4.13.17_PM-removebg-preview.png" 
                alt="Dhruv Gautam" 
                className="w-full h-full object-cover rounded-full border border-white/10"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
