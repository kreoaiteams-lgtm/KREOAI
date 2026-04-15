import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Manifest', path: '/' },
        { label: 'Neural Store', path: '/' },
        { label: 'Infrastructure', path: '/' },
        { label: 'Registry', path: '/build' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Philosophy', path: '/' },
        { label: 'Architecture', path: '/' },
        { label: 'Resident Protocol', path: '/card' },
        { label: 'Identity', path: '/card' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', path: '/' },
        { label: 'Neural API', path: '/' },
        { label: 'Community', path: '/' },
        { label: 'Pricing', path: '/pricing' },
      ]
    }
  ];

  return (
    <footer className="relative w-full bg-white border-t border-black/[0.03] pt-32 pb-16 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-indigo-50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-32">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-[#1B3FBF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1B3FBF]/20 group-hover:scale-110 transition-transform">
                <span className="font-serif italic text-2xl">K</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-black">KREO</span>
            </div>
            <p className="max-w-xs text-sm text-black/40 font-serif italic leading-relaxed">
              Orchestrating digital manifestations through neural design weighting and architectural intuition.
            </p>
            <div className="flex items-center gap-5 pt-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/[0.05] flex items-center justify-center text-black/30 hover:text-[#1B3FBF] hover:border-[#1B3FBF]/20 hover:bg-[#1B3FBF]/5 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, i) => (
            <div key={i} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black opacity-30">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="group flex items-center gap-2 text-sm font-medium text-black/50 hover:text-[#1B3FBF] transition-colors"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1B3FBF] group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-black/30">
            <span>© 2026 KREO NEURAL STUDIO</span>
            <a href="#" className="hover:text-black transition-colors">Privacy Manifest</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Orchestration</a>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Neural Engine Status: Optimal</span>
          </div>
        </div>
      </div>

      {/* Massive KREO wordmark as requested */}
      <div className="w-full mt-32 select-none pointer-events-none opacity-[0.03] overflow-hidden">
        <h2 className="text-[25vw] font-black text-black tracking-tighter leading-none text-center -mb-[0.2em]" style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }}>
          KREO
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
