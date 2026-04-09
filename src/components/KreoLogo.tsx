const KreoLogo = ({ className = "", isPro = false }: { className?: string, isPro?: boolean }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span
      className="text-3xl italic tracking-tighter leading-none text-foreground"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
    >
      Kreo
    </span>
    {isPro && (
      <span className="bg-[#0020C2] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
        PRO
      </span>
    )}
  </div>
);

export default KreoLogo;
