import React, { useState, useEffect } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<"initial" | "transition" | "final">("initial");
  const [bgColor, setBgColor] = useState("bg-black");

  useEffect(() => {
    // Stage 1: "Why explain?" in black background
    const timer1 = setTimeout(() => {
      setPhase("transition");
      // Background starts lightening up to Royal Cobalt Blue (#1B3FBF is bg-cobalt in our theme)
      setBgColor("bg-cobalt");
    }, 1500);

    // Stage 2: After background starts lightening, change the text
    const timer2 = setTimeout(() => {
      setPhase("final");
    }, 3000);

    // Stage 3: Complete and move to Splash
    const timer3 = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center transition-colors duration-[3000ms] ease-in-out ${bgColor}`}>
      <div className="relative text-center px-6">
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white transition-all duration-1000 tracking-tighter`}
          style={{
            opacity: phase === "initial" || phase === "transition" ? 1 : 0,
            transform: `translateY(${phase === "transition" ? "-20px" : "0"})`,
            display: phase === "final" ? "none" : "block"
          }}
        >
          Why explain?
        </h1>
        
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white transition-all duration-1000 tracking-tighter`}
          style={{
            opacity: phase === "final" ? 1 : 0,
            transform: `translateY(${phase === "final" ? "0" : "20px"})`,
            display: phase === "final" ? "block" : "none"
          }}
        >
          When you can visualize.
        </h1>
      </div>
    </div>
  );
};

export default IntroScreen;
