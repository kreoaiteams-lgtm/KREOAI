import { ArrowUpRight, Play, Zap, Shield, Globe } from 'lucide-react';
import KreoLogo from '@/components/KreoLogo';
import CloudFraming from '@/components/CloudFraming';
import { Link } from 'react-router-dom';

import AboutUs from '@/components/AboutUs';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0020C2] text-white selection:bg-white selection:text-primary overflow-x-hidden">
      {/* Cinematic Star Field - Global */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 1.5 + 'px',
              height: Math.random() * 1.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 4 + 3) + 's'
            }}
          />
        ))}
      </div>

      {/* Global Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 backdrop-blur-3xl border-b border-white/5 bg-black/5">
        <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
          <KreoLogo />
        </div>
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
          <a href="#vision" className="hover:text-white transition-colors">Vision</a>
          <a href="#intel" className="hover:text-white transition-colors">Manifests</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">Architect</a>
        </nav>
        <Link to="/home" className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl">
          Enter Studio
        </Link>
      </header>


      {/* Ultra Hero Manifest - Exact Studio Replica */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-32 px-10 overflow-hidden">
        {/* Clouds Localized to Hero */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <CloudFraming visible={true} />
        </div>

        <div className="relative z-20 max-w-6xl w-full space-y-12 text-center">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-12 duration-1000">
            <span className="text-[10px] font-black tracking-[0.8em] uppercase text-white/60 animate-pulse bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/5">Neural Design Orchestration</span>
            <h1 className="text-6xl md:text-8xl font-light italic font-serif leading-[0.95] tracking-tighter text-white drop-shadow-2xl">
              Build your <br/>
              <span className="not-italic text-yellow-400">imagination</span>
            </h1>
          </div>

          <p className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic font-serif animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 drop-shadow-lg">
            KREO is the high-fidelity manifest engine for professional visionaries. 
            Transform abstract intent into production-grade architecture with cinematic precision.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10 animate-in fade-in zoom-in-95 duration-1000 delay-500">
             <Link to="/home" className="group flex items-center gap-4 bg-white text-primary p-2 pl-10 pr-2 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Launch Studio</span>
                <div className="p-5 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                   <ArrowUpRight size={20} strokeWidth={3} />
                </div>
             </Link>
             <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                <div className="p-3 border border-white/10 rounded-full"><Play size={14} fill="currentColor" /></div>
                Watch Manifestation
             </button>
          </div>
        </div>
      </section>

      {/* Feature Manifests - Stacked Vertically */}
      <section id="intel" className="relative py-40 px-10">
        <div className="max-w-4xl mx-auto space-y-24">
          {[
            { icon: Zap, title: "Zero-Hassle UI", desc: "Skip the complexity of traditional IDEs like Lovable or Sector Nine. Generate production-ready layouts instantly through raw intent. No complexity, just pure code." },
            { icon: Shield, title: "Neural Tool Suite", desc: "Unlock specialized manifestors for PDF-to-Study and Image-to-Flashcard orchestration. High-fidelity results in a single click, perfectly formatted for your professional workflow." },
            { icon: Globe, title: "Google Opal Logic", desc: "Leverage the Professional tier's reasoning engine for complex architectural manifestation, logical data depth, and secure, high-resolution processing." }
          ].map((feat, i) => (
            <div key={i} className="group p-16 md:p-24 bg-white/10 border border-white/10 rounded-[4rem] space-y-10 hover:bg-white/15 transition-all cursor-crosshair relative overflow-hidden backdrop-blur-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="p-8 bg-primary/10 border border-primary/20 w-max rounded-3xl group-hover:scale-110 transition-all duration-700 relative z-10">
                 <feat.icon className="text-white" size={40} />
               </div>
               <div className="space-y-6 relative z-10">
                  <h3 className="text-6xl font-light font-serif italic text-white tracking-tight">{feat.title}</h3>
                  <p className="text-white/40 text-2xl font-light leading-relaxed font-serif italic max-w-2xl">{feat.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vertical Pricing Manifest */}
      <section id="pricing" className="relative py-40 px-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-primary">Manifestation Tiers</span>
            <h2 className="text-7xl font-light italic font-serif text-white tracking-tighter">Pricing</h2>
          </div>

          <div className="space-y-8">
             {/* Free Tier */}
             <div className="p-12 bg-white/10 border border-white/10 rounded-[4rem] flex flex-col md:flex-row items-center justify-between group hover:bg-white/15 transition-all duration-700 backdrop-blur-2xl">
                <div className="space-y-2 text-center md:text-left">
                   <h3 className="text-5xl font-light text-white font-serif italic">Free</h3>
                   <p className="text-white/40 text-base italic font-serif text-shadow-sm">3 generations per week / No tools</p>
                </div>
                <div className="text-6xl font-light text-white font-serif italic">$0 <span className="text-lg opacity-20 not-italic">/ month</span></div>
             </div>

             {/* Professional Tier (Google Opal) */}
             <div className="relative p-16 bg-primary/20 border border-primary/30 rounded-[4rem] space-y-12 overflow-hidden group shadow-[0_0_100px_rgba(37,99,235,0.2)] hover:bg-primary/25 transition-all duration-700 backdrop-blur-2xl">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-10 py-3 uppercase tracking-widest rounded-bl-3xl">Google Opal Active</div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                   <div className="space-y-3">
                      <h3 className="text-6xl font-light text-white font-serif italic">Professional</h3>
                      <p className="text-primary/60 text-base italic font-serif">Unlimited creative orchestration with high-fidelity tools.</p>
                   </div>
                   <div className="text-7xl font-light text-white font-serif italic">$1 <span className="text-lg opacity-20 not-italic">/ month</span></div>
                </div>
                
                <div className="h-[1px] w-full bg-primary/20" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">Intelligence Engine</span>
                      <p className="text-lg font-light text-white font-serif italic leading-relaxed">Powered by Google Opal for ultra-complex architectural manifestation and logical depth.</p>
                   </div>
                   <div className="space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">Neural Tool Suite</span>
                      <ul className="text-lg font-light text-primary font-serif space-y-2 italic">
                         <li>✓ PDF Master Orchestrator</li>
                         <li>✓ High-Resolution Image Editor</li>
                         <li>✓ Atomic 3D Prototyping</li>
                         <li>✓ Direct GitHub Vault Sync</li>
                      </ul>
                   </div>
                </div>

                <Link to="/home" className="block w-full text-center bg-white text-black py-8 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">Elevate Manifest</Link>
             </div>
          </div>
        </div>
      </section>

      <AboutUs />

      <footer className="py-32 border-t border-white/5 text-center bg-black/40 backdrop-blur-xl">

         <div className="scale-75 opacity-40 mx-auto mb-10"><KreoLogo /></div>
         <p className="max-w-xs mx-auto text-white/20 text-[9px] font-black uppercase tracking-[0.6em] italic leading-relaxed mb-12">
            Established for the visionary architect. <br/>
            Neural Design manifested by KREO Engine.
         </p>
         <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/10 italic">© 2026 KREO ARCHITECTURAL MANIFEST.</p>
      </footer>
    </div>
  );
};

export default Landing;
