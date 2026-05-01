import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GradientOrb } from "@/components/mentra/GradientOrb";
import { useParallax } from "@/hooks/useParallax";

interface AuthLayoutProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export const AuthLayout = ({ eyebrow, title, subtitle, children, footer }: AuthLayoutProps) => {
  const par = useParallax(0.08);

  return (
    <main className="relative min-h-screen overflow-hidden bg-m grain page-enter reveal-mask">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-8 py-7 md:px-12">
        <Link to="/" className="brand-font text-[24px] tracking-[0.2em]" style={{ color: "var(--m-text)" }}>
          Mentra
        </Link>
        <Link to="/" className="brand-font text-[10px] tracking-[0.2em] opacity-40 transition-opacity hover:opacity-100">
          ← Back
        </Link>
      </header>

      {/* Ambient orbs — Refined & Limited */}
      <GradientOrb hue="peach-lavender" size={700} blur={130} opacity={0.18} duration={16}
        style={{ top: -250, left: "-15%" }}
        parallax={{ x: par.x, y: par.y, factor: 0.3 }} />
      <GradientOrb hue="rose-sky" size={600} blur={120} opacity={0.15} duration={14}
        style={{ bottom: -250, right: "-10%" }}
        parallax={{ x: par.x, y: par.y, factor: 0.4 }} />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-md flex-col items-center justify-center px-6 pb-16">
        {/* Splash Rings — Subtle focus for Auth */}
        <div className="splash-ring w-[500px] h-[500px] opacity-15" />
        <div className="splash-ring splash-ring-2 w-[700px] h-[700px] opacity-10" />

        {/* Halo behind card */}
        <div
          className="gradient-halo"
          style={{
            width: 600, height: 600,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
          }}
        />

        <div className="relative z-10 mb-10 text-center anim-rise-sm">
          <div className="brand-font text-[10px] tracking-[0.2em] opacity-40" style={{ marginBottom: 24 }}>✦ {eyebrow}</div>
          <h1 className="brand-font text-[48px] leading-[1] tracking-[-0.01em] md:text-[60px]"
              style={{ color: "var(--m-text)" }}>
            {title}
          </h1>
          <p className="font-serif-i mt-4 text-[20px] opacity-70" style={{ color: "var(--m-text-2)" }}>
            {subtitle}
          </p>
        </div>

        <div className="glass-verdict relative z-10 w-full rounded-3xl px-8 py-9 anim-card delay-200">
          {children}
        </div>

        <div className="relative z-10 mt-7 text-center label-tag anim-fade delay-500">
          {footer}
        </div>
      </section>
    </main>
  );
};
