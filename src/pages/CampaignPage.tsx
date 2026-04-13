
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Sparkles, BrainCircuit, Layout, BarChart, Users } from 'lucide-react';
import KreoLogo from '../components/KreoLogo';

/**
 * CampaignPage: "Build with KREO"
 * Ultra-minimal, white aesthetic, playful fragments.
 */
const CampaignPage: React.FC = () => {
  const navigate = useNavigate();

  // Playful fragments that float around the hero
  const fragments = [
    { icon: <Layout size={20} />, label: "App Core", x: "15%", y: "25%", color: "bg-[#1B3FBF]" },
    { icon: <BarChart size={20} />, label: "Analytics", x: "80%", y: "20%", color: "bg-yellow-400" },
    { icon: <Users size={20} />, label: "CRM", x: "10%", y: "70%", color: "bg-red-400" },
    { icon: <BrainCircuit size={20} />, label: "Neural", x: "85%", y: "75%", color: "bg-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white overflow-hidden relative">
      
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex items-center justify-between">
        <div className="scale-125">
          <KreoLogo isPro={false} />
        </div>
        <div className="flex items-center gap-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">The Series 01</span>
        </div>
      </nav>

      {/* Playful Fragments Field */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {fragments.map((frag, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5 
            }}
            className="absolute hidden md:flex items-center gap-3 px-5 py-3 bg-white border border-black/5 shadow-2xl rounded-2xl shadow-black/5"
            style={{ left: frag.x, top: frag.y }}
          >
            <div className={`w-8 h-8 rounded-lg ${frag.color} flex items-center justify-center text-white shadow-lg`}>
              {frag.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{frag.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Orchestration */}
      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl text-center space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-black/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Campaign Premiere</span>
              <span className="h-[1px] w-12 bg-black/10" />
            </div>
            
            <h1 className="text-7xl md:text-[9rem] font-light tracking-tighter leading-[0.9] text-black">
              Build with <br />
              <span className="font-serif italic text-[#1B3FBF]">Kreo</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-serif italic text-black/40 max-w-xl mx-auto leading-relaxed">
              Transition from imagination to orchestration in high-fidelity. The series begins now.
            </p>
          </motion.div>

          {/* Action Trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-12"
          >
            <button 
              onClick={() => navigate('/')}
              className="group relative px-16 py-8 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
            >
              <div className="absolute inset-0 bg-[#1B3FBF] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em]">
                Enter Studio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.6em] text-black/20 animate-pulse">Zero Friction Interface</p>
          </motion.div>

        </div>
      </main>

      {/* Footer Details */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-12 py-8 flex items-center justify-between pointer-events-none">
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Established 2024</p>
          <p className="text-[8px] font-medium uppercase tracking-widest text-black/20">Neural Design Institute</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-black/40">Sync Active</span>
        </div>
      </footer>

      {/* Atmospheric Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[60vmax] bg-[#1B3FBF]/5 blur-[120px] rounded-full pointer-events-none z-0" />

    </div>
  );
};

export default CampaignPage;
