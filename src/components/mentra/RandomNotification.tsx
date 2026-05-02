import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RandomNotificationProps {
  label?: string;
  forceVisible?: boolean;
}

export default function RandomMentraNotification({ label = "visit mentra", forceVisible = false }: RandomNotificationProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) return;

    const trigger = () => {
      const delay = Math.random() * 15000 + 10000;
      const t = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          trigger();
        }, 5000);
      }, delay);
      return t;
    };

    const t = trigger();
    return () => clearTimeout(t);
  }, [forceVisible]);

  return (
    <AnimatePresence>
      {(isVisible || forceVisible) && (
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 50, opacity: 0, scale: 0.95 }}
          onClick={() => navigate('/webresearch')}
          className="fixed bottom-10 right-10 z-[2000] cursor-pointer group"
        >
          <div 
            className="px-12 py-8 rounded-[2rem] border-2 border-white shadow-2xl relative overflow-hidden flex items-center justify-center min-w-[300px]"
            style={{
              backgroundImage: `url("/mentra-bg.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <span className="relative z-10 text-white text-2xl md:text-3xl font-bold tracking-[0.5em] uppercase brand-font whitespace-nowrap pt-2">
              {label}
            </span>
            <div className="absolute top-4 right-6 flex gap-1.5 opacity-60">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-75" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
