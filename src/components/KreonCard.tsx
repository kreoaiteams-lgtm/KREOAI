
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Share2, Crown } from 'lucide-react';

interface KreonCardProps {
  userEmail?: string;
}

const KreonCard: React.FC<KreonCardProps> = ({ userEmail }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="relative w-full max-w-sm aspect-[3/4] rounded-[3rem] overflow-hidden group shadow-2xl"
    >
      {/* Background Manifestation */}
      <div className="absolute inset-0 bg-[#0020C2] z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400 blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2" />
      
      {/* Grain Layer */}
      <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Content Glass */}
      <div className="absolute inset-4 z-20 rounded-[2.2rem] bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col p-8 justify-between">
        
        {/* Header Details */}
        <div className="flex justify-between items-start">
           <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Neural Identity</span>
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Resident Architect</p>
           </div>
           <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck size={18} />
           </div>
        </div>

        {/* Center Name (TAN-Nimbus) */}
        <div className="text-center py-12 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 blur-[40px] rounded-full pointer-events-none" />
           <motion.h2 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-7xl font-bold text-white tracking-widest leading-none drop-shadow-2xl"
             style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}
           >
              KREON
           </motion.h2>
           <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 mt-4 italic">Unbound Awareness</p>
        </div>

        {/* User Specifics */}
        <div className="space-y-6">
           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Access Protocol</div>
              <p className="text-xs font-mono text-white/80 truncate">{userEmail || 'GUEST_MANIFEST_01'}</p>
           </div>
           
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-white">Neural Sync Active</span>
              </div>
              <div className="flex gap-2">
                 <div className="p-2.5 rounded-full bg-white text-black shadow-xl hover:scale-110 transition-all cursor-pointer">
                    <Share2 size={12} />
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Footer Label */}
      <div className="absolute inset-x-0 bottom-8 z-30 flex justify-center pointer-events-none">
         <div className="px-6 py-2 bg-black rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white border border-white/10 shadow-2xl">
            ESTABLISHED BY CREO
         </div>
      </div>

    </motion.div>
  );
};

export default KreonCard;
