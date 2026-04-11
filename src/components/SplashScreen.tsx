import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./Hello (apple).json";

/**
 * SplashScreen
 *
 * Sequence:
 *  0.2s  — Lottie animation starts
 *  2.4s  — KREO identity reveals
 *  3.4s  — Full splash fades out
 *  4.2s  — onComplete fires
 */
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"idle" | "lottie" | "reveal" | "exit">("idle");

  useEffect(() => {
    // Neural Sequence Timing (Accelerated)
    const t1 = setTimeout(() => setPhase("lottie"), 100);   // Start Lottie
    const t2 = setTimeout(() => setPhase("reveal"), 1400);  // Reveal KREO
    const t3 = setTimeout(() => setPhase("exit"),   2000);  // Fade out
    const t4 = setTimeout(onComplete,               2400);  // Complete
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const lottieVisible = phase !== "idle" && phase !== "exit";
  const kreoVisible   = phase === "reveal" || phase === "exit";
  const exitActive    = phase === "exit";

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0020C2] overflow-hidden"
      style={{
        opacity:    exitActive ? 0 : 1,
        transition: exitActive ? "opacity 1.0s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: exitActive ? "none" : "auto",
      }}
    >
      {/* Background Depth Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Lottie Manifestation — Forced Pure White */}
      <div 
        className={`w-[600px] h-[600px] transition-all duration-1000 ${lottieVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-xl'}`}
        style={{ 
           transform: kreoVisible ? 'translateY(-60px) scale(0.6)' : 'translateY(0) scale(1)',
           filter: 'brightness(0) invert(1)' 
        }}
      >
        <Lottie 
          animationData={animationData} 
          loop={false}
          className="w-full h-full"
        />
      </div>

      {/* Neural Graffiti Field — Celebrational Manifestation */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${kreoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        {[...Array(40)].map((_, i) => {
          const colors = ['bg-[#facc15]', 'bg-[#3b82f6]', 'bg-[#ef4444]', 'bg-[#10b981]', 'bg-white'];
          const color = colors[i % colors.length];
          const x = (Math.random() * 100);
          const y = (Math.random() * 100);
          const size = Math.random() * 0.8 + 0.2;
          const rotation = Math.random() * 360;
          const delay = (Math.random() * 0.5) + 's';
          
          return (
            <div 
              key={i}
              className={`absolute animate-bounce ${color}`}
              style={{
                left: x + '%',
                top: y + '%',
                width: size + 'rem',
                height: size + 'rem',
                opacity: 0.6,
                transform: `rotate(${rotation}deg)`,
                animationDelay: delay,
                borderRadius: i % 2 === 0 ? '50%' : '2px'
              }}
            />
          );
        })}
      </div>

      {/* KREO Identity Revelation */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${kreoVisible ? 'opacity-100 translate-y-12' : 'opacity-0 translate-y-20 blur-md'}`}
      >
        <span 
          className="relative z-10 text-8xl md:text-9xl font-light font-serif italic tracking-tighter text-white"
          style={{ textShadow: '0 0 50px rgba(255,255,255,0.4)' }}
        >
          KREO
        </span>
        <span className="relative z-10 mt-8 text-[9px] font-black tracking-[0.6em] uppercase text-white/40">Studio Engaged</span>
      </div>

      {/* Atmospheric Bloom */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  kreoVisible ? "350vmax" : "0vmax",
          height: kreoVisible ? "350vmax" : "0vmax",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          transition: "width 2.5s cubic-bezier(0.2,1,0.3,1), height 2.5s cubic-bezier(0.2,1,0.3,1)",
          opacity: exitActive ? 0 : 1,
        }}
      />
    </div>
  );
};

export default SplashScreen;
