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
          className="fixed inset-0 z-[100] bg-[#0020C2] text-white flex flex-col items-center justify-between p-12 overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10"
          >
            <X size={24} />
          </button>

          {/* Top Section - Center Top Image */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-shrink-0 w-full max-w-xl mx-auto"
          >
            <img 
              src="/Screenshot_2026-04-09_at_4.14.58_PM-removebg-preview.png" 
              alt="Welcome Highlight" 
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
            />
          </motion.div>

          {/* Middle Section - App Data */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-grow flex flex-col items-center justify-center space-y-8 py-16 text-center"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light italic font-serif tracking-tighter">
                Welcome to <span className="not-italic font-black uppercase text-yellow-400">Kreo</span>
              </h1>
              <p className="text-white/60 text-[10px] font-black tracking-[0.6em] uppercase">The Architect's Workspace</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl">
              {[
                { label: "Manifests", value: "Unlimited", desc: "Professional creative depth" },
                { label: "Intelligence", value: "Google Opal", desc: "Advanced reasoning engine" },
                { label: "Precision", value: "99.9%", desc: "Cinematic architecture" }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
                  <div className="text-[10px] font-black tracking-widest uppercase text-white/30 mb-2">{stat.label}</div>
                  <div className="text-3xl font-serif italic text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] text-white/40 italic font-serif">{stat.desc}</div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={onClose}
              className="mt-12 px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Start Manifesting
            </button>
          </motion.div>

          {/* Bottom Section - Regards and Image */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex-shrink-0 flex flex-col items-center gap-6"
          >
            <div className="text-center space-y-2">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Architectural Sign-off</span>
              <p className="text-2xl font-serif italic text-white/90">Best regards, Dhruv Gautam</p>
            </div>
            <div className="w-32 h-32 relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
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
