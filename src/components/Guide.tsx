import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, X, Zap } from 'lucide-react';

interface Step {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const STEPS: Step[] = [
  {
    target: 'kreo-tour-prompt',
    title: 'Prompt Box',
    content: 'Type anything you want to create here. From websites to presentations, KREO builds it for you in seconds.',
    position: 'bottom'
  },
  {
    target: 'kreo-tour-upload',
    title: 'Add Files',
    content: 'Upload PDFs, images, or paste links. KREO uses them as a style guide or for data to build your project.',
    position: 'bottom'
  },
  {
    target: 'kreo-tour-history',
    title: 'Your History',
    content: 'Find everything you’ve created here. All your projects are saved automatically.',
    position: 'bottom'
  },
  {
    target: 'kreo-tour-profile',
    title: 'Your Profile',
    content: 'Manage your settings and brand style here to keep your designs consistent.',
    position: 'bottom'
  }
];

export const Guide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [spotlight, setSpotlight] = useState({ top: 0, left: 0, width: 0, height: 0, radius: 24 });

  useEffect(() => {
    const completed = localStorage.getItem('kreo_guide_completed');
    if (!completed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setCurrentStep(0);
      }, 3000); // 3s delay for hero animations
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    
    const updateSpotlight = () => {
      if (isVisible && currentStep >= 0 && currentStep < STEPS.length) {
        const step = STEPS[currentStep];
        const el = document.getElementById(step.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetRadius = window.getComputedStyle(el).borderRadius;
          const radius = parseInt(targetRadius) || 24;

          setSpotlight(prev => {
            if (
              Math.abs(prev.top - rect.top) < 0.1 && 
              Math.abs(prev.left - rect.left) < 0.1 &&
              Math.abs(prev.width - rect.width) < 0.1 &&
              prev.radius === radius + 8
            ) return prev;

            return {
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
              radius: radius + 8
            };
          });
        }
      }
      rafId = requestAnimationFrame(updateSpotlight);
    };

    if (isVisible) {
      rafId = requestAnimationFrame(updateSpotlight);
      window.addEventListener('resize', updateSpotlight);
      window.addEventListener('scroll', updateSpotlight, true);
    }
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
    };
  }, [currentStep, isVisible]);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeGuide();
    }
  };

  const closeGuide = () => {
    setIsVisible(false);
    localStorage.setItem('kreo_guide_completed', 'true');
  };

  if (!isVisible || currentStep === -1) return null;

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Dimmed Overlay with Mask Spotlight */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-auto shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
        style={{
          maskImage: `radial-gradient(circle at ${spotlight.left + spotlight.width/2}px ${spotlight.top + spotlight.height/2}px, transparent ${spotlight.width/2}px, black ${spotlight.width/2 + 2}px)`,
          WebkitMaskImage: `paint(spotlight-mask)`, // Fallback logic below
        }}
        onClick={closeGuide}
      >
        {/* Modern Hole Logic using Clip-Path Donut (Fixed Coordinates) */}
        <div 
          className="absolute inset-0 bg-black/60"
          style={{
            clipPath: `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
              ${spotlight.left}px ${spotlight.top}px, 
              ${spotlight.left + spotlight.width}px ${spotlight.top}px, 
              ${spotlight.left + spotlight.width}px ${spotlight.top + spotlight.height}px, 
              ${spotlight.left}px ${spotlight.top + spotlight.height}px, 
              ${spotlight.left}px ${spotlight.top}px)`
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute pointer-events-auto z-[10001] w-[320px]"
          style={{
            top: spotlight.top + spotlight.height + 20,
            left: Math.min(window.innerWidth - 340, Math.max(20, spotlight.left + (spotlight.width / 2) - 160))
          }}
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1B3FBF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#1B3FBF] rounded-full flex items-center justify-center">
                    <Zap size={10} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">The Guide</span>
                </div>
                <div className="text-[9px] font-black text-black/20 uppercase tracking-widest">{currentStep + 1} / {STEPS.length}</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-serif italic text-black leading-tight">{step.title}</h4>
                <p className="text-[12px] text-black/50 leading-relaxed font-light">{step.content}</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={nextStep}
                  className="flex-1 bg-[#1B3FBF] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  {currentStep === STEPS.length - 1 ? "Finish Tour" : "Next Step"}
                  <ChevronRight size={12} />
                </button>
                <button 
                  onClick={closeGuide}
                  className="w-12 h-12 bg-black/5 text-black/30 rounded-xl flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Prompt to skip */}
          <button 
            onClick={closeGuide}
            className="w-full text-center mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
          >
            Skip the Guide
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Decorative spark for spotlight */}
      <motion.div 
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute z-[10002] pointer-events-none"
        style={{ top: spotlight.top - 12, left: spotlight.left + spotlight.width - 12 }}
      >
        <Sparkles size={24} className="text-[#1B3FBF]" />
      </motion.div>
    </div>
  );
};
