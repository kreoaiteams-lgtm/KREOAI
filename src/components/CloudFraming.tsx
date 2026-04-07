import React from "react";

const CloudFraming = ({ visible = true }: { visible?: boolean }) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Central Horizon Contrast Shield — more subtle wash */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full h-[50vh] bg-radial-gradient from-black/20 via-transparent to-transparent z-[1] opacity-60 blur-[120px]" />

      {/* Symmetric Cloud Horizon — Edge to Edge Floor ONLY */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] flex items-end">
        {/* Left Side Cloud — Mirrored with deeper horizontal stretch */}
        <div className="absolute bottom-[-150%] left-[-20%] w-[120%] transition-opacity duration-1000">
          <img 
            src="/custom_clouds.png" 
            alt="Mirrored Cloud" 
            className="w-full h-auto object-contain scale-x-[-1.5] scale-y-[1.2] origin-bottom-left opacity-90" 
          />
        </div>
        
        {/* Right Side Cloud — Original with deeper horizontal stretch */}
        <div className="absolute bottom-[-150%] right-[-20%] w-[120%] transition-opacity duration-1000">
          <img 
            src="/custom_clouds.png" 
            alt="Original Cloud" 
            className="w-full h-auto object-contain scale-x-[1.5] scale-y-[1.2] origin-bottom-right" 
          />
        </div>
      </div>





    </div>
  );
};

export default CloudFraming;
