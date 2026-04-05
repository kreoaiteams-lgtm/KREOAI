import { useState, useEffect } from "react";

const NeuralTextDither = ({ theme }: { theme: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const text = "KREO NEURAL MANIFESTATION ENGINE ESTABLISHING STUDIO LINK ARCHITECTURE SYNTHESIS CREATIVE INTENT ";
  const repeatedText = Array(20).fill(text).join(" ");

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-20">
      <div 
        className={`absolute inset-0 flex flex-wrap content-start text-[10px] font-black leading-none tracking-widest break-all p-4 ${
          theme === 'light' ? 'text-black/[0.03]' : 'text-white/[0.03]'
        }`}
        style={{
          maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
};

export default NeuralTextDither;
