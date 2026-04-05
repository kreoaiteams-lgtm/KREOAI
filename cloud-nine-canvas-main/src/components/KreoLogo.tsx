const KreoLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <span
      className="text-3xl italic tracking-tighter leading-none text-foreground"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
    >
      Kreo
    </span>
  </div>
);

export default KreoLogo;
