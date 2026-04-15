import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-white pt-32 pb-16 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-indigo-50 blur-[100px] rounded-full" />
      </div>

      {/* Massive KREO wordmark as requested */}
      <div className="w-full select-none pointer-events-none opacity-[0.04] overflow-hidden">
        <h2 className="text-[25vw] font-black text-black tracking-tighter leading-none text-center" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
          KREO
        </h2>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.6em] text-black/10">
        ©2026 KREO NEURAL STUDIO
      </div>
    </footer>
  );
};

export default Footer;
