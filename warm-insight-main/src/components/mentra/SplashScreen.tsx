import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [active, setActive] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Stage 1: Ignite bloom sequence
    const tStart = setTimeout(() => setActive(true), 200);
    // Stage 2: Start exit fade
    const tExit = setTimeout(() => setExit(true), 4000);
    // Stage 3: Finish
    const tFinish = setTimeout(onComplete, 4800);

    return () => {
      clearTimeout(tStart);
      clearTimeout(tExit);
      clearTimeout(tFinish);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-1000 ${
        exit ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Cinematic Rising Bloom */}
      <div 
        className={`absolute inset-0 transition-all duration-[3000ms] cubic-bezier(0.23, 1, 0.32, 1) ${
          active ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
        }`}
        style={{
          background: "linear-gradient(180deg, #C9C1F0 0%, #F2C4A0 60%, #FAF7F2 100%)",
        }}
      />

      {/* Atmospheric Secondary Glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] delay-1000 ${
          active ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, transparent 70%)',
        }}
      />

      {/* White Branding Zoom */}
      <div
        className={`brand-font relative z-10 text-white text-center transition-all duration-[2500ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          active ? 'opacity-100 scale-[1.15] blur-0' : 'opacity-0 scale-[0.6] blur-[20px]'
        }`}
        style={{
          fontSize: 'clamp(64px, 16vw, 200px)',
          letterSpacing: '0.45em',
          transitionDelay: '1200ms',
          textShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        MENTRA
      </div>
    </div>
  );
};
