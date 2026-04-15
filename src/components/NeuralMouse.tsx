import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

const NeuralMouse = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  const createParticle = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    const colors = ['#1B3FBF', '#3b82f6', '#ffffff', '#FACC15'];
    
    return {
      id: Math.random(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1, // Slight upwards drift
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0,
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Calculate velocity of mouse for dynamic particle emission
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        const count = Math.min(Math.floor(dist / 4), 5);
        const newParticles = Array.from({ length: count }).map(() => createParticle(e.clientX, e.clientY));
        setParticles(prev => [...prev.slice(-60), ...newParticles]);
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createParticle]);

  // Update particle positions periodically
  useEffect(() => {
    const update = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.02, // Gravity
            life: p.life - 0.015
          }))
          .filter(p => p.life > 0)
      );
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Dynamic Cursor Core */}
      <motion.div
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", damping: 25, stiffness: 500, mass: 0.2 }}
        className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#1B3FBF,0_0_40px_#1B3FBF]"
      />

      {/* Particle Field */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '50%',
            opacity: p.life,
            transform: `scale(${p.life})`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            transition: 'opacity 0.1s linear, transform 0.1s linear',
          }}
        />
      ))}

      {/* Neural Atmosphere Glow */}
      <motion.div
        animate={{ x: mousePos.x - 120, y: mousePos.y - 120 }}
        transition={{ type: "spring", damping: 40, stiffness: 150 }}
        className="w-[240px] h-[240px] bg-[#1B3FBF]/10 blur-[100px] rounded-full mix-blend-screen"
      />
    </div>
  );
};

export default NeuralMouse;
