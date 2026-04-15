import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralMouse = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newFlares = [
        { id: Math.random() + Date.now(), x: e.clientX, y: e.clientY },
        { id: Math.random() + Date.now(), x: e.clientX, y: e.clientY },
        { id: Math.random() + Date.now(), x: e.clientX, y: e.clientY }
      ];
      setTrail((prev) => [...prev.slice(-45), ...newFlares]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Primary Neural Core */}
      <motion.div
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
        className="w-2 h-2 bg-[#1B3FBF] rounded-full shadow-[0_0_15px_rgba(27,63,191,0.8)]"
      />

      {/* Trailing Flares */}
      <AnimatePresence>
        {trail.map((flare, i) => (
          <motion.div
            key={flare.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: flare.y + (Math.random() * 20 - 10) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              left: flare.x,
              top: flare.y,
              width: '4px',
              height: '4px',
              backgroundColor: i % 2 === 0 ? '#1B3FBF' : '#FACC15',
              borderRadius: '50%',
              boxShadow: i % 2 === 0 ? '0 0 10px #1B3FBF' : '0 0 10px #FACC15',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Global Atmosphere Glow */}
      <motion.div
        animate={{ x: mousePos.x - 100, y: mousePos.y - 100 }}
        transition={{ type: "spring", damping: 40, stiffness: 200 }}
        className="w-[200px] h-[200px] bg-[#1B3FBF]/5 blur-[80px] rounded-full"
      />
    </div>
  );
};

export default NeuralMouse;
