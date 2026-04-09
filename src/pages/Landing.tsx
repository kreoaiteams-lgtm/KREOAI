import KreoLogo from '@/components/KreoLogo';
import { Link } from 'react-router-dom';
import AboutUs from '@/components/AboutUs';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-[#0020C2] selection:bg-[#0020C2] selection:text-white overflow-x-hidden">
      {/* Global Navigation - Simplified for About Us only page */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 backdrop-blur-3xl border-b border-blue-50 bg-white/80">
        <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
          <KreoLogo />
        </div>
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-[#0020C2]/40">
          <Link to="/" className="hover:text-[#0020C2] transition-colors">Studio</Link>
          <span className="text-[#0020C2] font-black">Architect</span>
        </nav>
        <Link to="/home" className="px-8 py-3 bg-[#0020C2] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
          Enter Studio
        </Link>
      </header>

      <main className="pt-20">
        <AboutUs />
      </main>

      <footer className="py-32 border-t border-blue-50 text-center bg-white">
         <div className="scale-75 opacity-40 mx-auto mb-10"><KreoLogo /></div>
         <p className="max-w-xs mx-auto text-[#0020C2]/20 text-[9px] font-black uppercase tracking-[0.6em] italic leading-relaxed mb-12">
            Established for the visionary architect. <br/>
            Neural Design manifested by KREO Engine.
         </p>
         <p className="text-[9px] font-black uppercase tracking-[0.6em] text-[#0020C2]/10 italic">© 2026 KREO ARCHITECTURAL MANIFEST.</p>
      </footer>
    </div>
  );
};

export default Landing;
