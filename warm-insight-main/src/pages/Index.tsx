import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { GradientOrb } from "@/components/mentra/GradientOrb";
import { InputBar } from "@/components/mentra/InputBar";
import { ComparisonCard, CardData } from "@/components/mentra/ComparisonCard";
import { Verdict } from "@/components/mentra/Verdict";
import { Reveal } from "@/components/mentra/Reveal";
import { SettingsPopover } from "@/components/mentra/SettingsPopover";
import { HistoryPanel } from "@/components/mentra/HistoryPanel";
import { SplashScreen } from "@/components/mentra/SplashScreen";
import { useParallax } from "@/hooks/useParallax";
import { addHistory, DecisionEntry, readHistory } from "@/lib/history";

type Phase = "hero" | "comparison" | "onboarding" | "dashboard";

const sampleComparison = (prompt: string): { a: CardData; b: CardData; verdict: string } => {
  const lower = prompt.toLowerCase();
  if (lower.includes("job") || lower.includes("offer") || lower.includes("career")) {
    return {
      a: {
        label: "Option A", name: "The established path",
        tagline: "the one that pays well and feels safe",
        strengths: ["Predictable trajectory and compensation", "Strong mentorship infrastructure"],
        weaknesses: ["Limited room to define your own work", "Slow signal-to-noise on impact"],
        winner: false,
      },
      b: {
        label: "Option B", name: "The early-stage gamble",
        tagline: "the one that scares you in a good way",
        strengths: ["Compounding learning curve", "Direct ownership of outcomes"],
        weaknesses: ["Volatility in scope and security", "Higher emotional load"],
        winner: true,
      },
      verdict: "If the fear is the kind that teaches, lean toward Option B.",
    };
  }
  return {
    a: {
      label: "Option A", name: "Stay the course",
      tagline: "what you already know how to do",
      strengths: ["Lower cognitive cost", "Predictable outcome shape"],
      weaknesses: ["Risk of quiet stagnation", "Diminishing returns on familiarity"],
      winner: false,
    },
    b: {
      label: "Option B", name: "Choose the harder thing",
      tagline: "the door you keep walking past",
      strengths: ["Asymmetric upside on growth", "Aligns with the version of you that's emerging"],
      weaknesses: ["Short-term friction is real", "Requires letting some things go"],
      winner: true,
    },
    verdict: "The harder thing is usually the more honest one.",
  };
};

const principles = [
  {
    eyebrow: "I — Listen",
    title: "It begins by hearing you.",
    body: "Mentra reads the texture of your question — what's said, what's avoided, what's being weighed underneath.",
    hue: "peach-lavender" as const,
  },
  {
    eyebrow: "II — Weigh",
    title: "Then it weighs, gently.",
    body: "Two paths, side by side. Strengths, frictions, and the quiet asymmetries you might have missed.",
    hue: "rose-sky" as const,
  },
  {
    eyebrow: "III — Reflect",
    title: "And offers a read — never a verdict.",
    body: "A single, honest sentence. The kind a thoughtful friend would say after a long pause.",
    hue: "sage-peach" as const,
  },
];

const Index = () => {
  const [showMiniSplash, setShowMiniSplash] = useState(true);
  const [phase, setPhase] = useState<Phase>("hero");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [bloom, setBloom] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeResult, setActiveResult] = useState<{ a: CardData; b: CardData; verdict: string } | null>(null);
  const [hasHistory, setHasHistory] = useState(() => readHistory().length > 0);
  const par = useParallax(0.08);

  const [splashExit, setSplashExit] = useState(false);

  useEffect(() => {
    const tExit = setTimeout(() => setSplashExit(true), 2400);
    const tDone = setTimeout(() => setShowMiniSplash(false), 3000);
    return () => { clearTimeout(tExit); clearTimeout(tDone); };
  }, []);

  const result = useMemo(() => {
    if (activeResult) return activeResult;
    return prompt ? sampleComparison(prompt) : null;
  }, [prompt, activeResult]);

  const handleSubmit = (v: string) => {
    setPrompt(v);
    setActiveResult(null);
    setBloom((b) => b + 1);
    const generated = sampleComparison(v);
    addHistory({ prompt: v, a: generated.a, b: generated.b, verdict: generated.verdict });
    setHasHistory(true);
    setTimeout(() => setPhase("comparison"), 380);
  };

  const openFromHistory = (entry: DecisionEntry) => {
    setPrompt(entry.prompt);
    setActiveResult({ a: entry.a, b: entry.b, verdict: entry.verdict });
    setHistoryOpen(false);
    setPhase("comparison");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const reset = () => {
    setPhase("hero");
    setPrompt("");
    setActiveResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startOnboarding = () => {
    setShowMiniSplash(true);
    setSplashExit(false);
    setTimeout(() => {
      setPhase("onboarding");
      setShowMiniSplash(false);
    }, 2000);
  };
  return (
    <>
      {showMiniSplash && (
        <div
          className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-m transition-opacity duration-700 ease-in-out ${splashExit ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Ambient warm glow behind text */}
          <div style={{
            position: 'absolute',
            width: '60vw', height: '60vw',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(242,196,160,0.3) 0%, rgba(201,193,240,0.15) 50%, transparent 80%)',
            filter: 'blur(80px)',
            animation: 'splashGlow 2.5s ease-in-out infinite alternate',
          }} />

          {/* Large brand name — letters stagger in */}
          <div
            className="brand-font relative z-10 flex items-center justify-center"
            style={{
              fontSize: 'clamp(56px, 14vw, 160px)',
              letterSpacing: '0.15em',
              color: 'var(--m-text)',
            }}
          >
            {'MENTRA'.split('').map((letter, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  animation: `splashLetterIn 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <main className={`relative min-h-screen overflow-hidden page-enter reveal-mask transition-colors duration-1000 ${phase === 'dashboard' ? 'portal-layout' : 'bg-m'} ${showMiniSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}>
        <div className="grain" />
        <div className="vertical-streaks" />
        
        {/* Top nav */}
        <header className="relative z-20 flex items-center justify-between px-8 pb-4 pt-6 md:px-12 anim-fade delay-100">
        <div className="brand-font text-[24px] tracking-[0.2em]" style={{ color: phase === 'dashboard' ? '#f4f0e8' : 'var(--m-text)' }}>
          Mentra
        </div>
        <nav className="flex items-center gap-3 md:gap-5">
          {phase === 'hero' && <a className="label-tag hidden transition-colors hover:text-[color:var(--m-text)] md:inline" href="#principles">Method</a>}
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="label-tag relative inline-flex items-center gap-1.5 transition-colors hover:text-[color:var(--m-text)]"
            style={{ color: phase === 'dashboard' ? '#f4f0e8' : undefined }}
          >
            <Clock size={12} strokeWidth={1.75} />
            History
            {hasHistory && (
              <span
                className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "linear-gradient(120deg,#C9C1F0,#F0C4C8)" }}
                aria-hidden
              />
            )}
          </button>
          {phase === 'hero' ? (
            <>
              <button onClick={startOnboarding} className="label-tag hidden transition-colors hover:text-[color:var(--m-text)] md:inline">Sign in</button>
              <button onClick={startOnboarding} className="btn-ghost-m hidden md:inline-flex">Begin</button>
            </>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">JD</div>
          )}
          <SettingsPopover />
        </nav>
      </header>

      <HistoryPanel
        open={historyOpen}
        onClose={() => {
          setHistoryOpen(false);
          setHasHistory(readHistory().length > 0);
        }}
        onOpenEntry={openFromHistory}
      />

      {/* Main App Content */}
      <div className="relative z-10">
        {phase === "hero" && (
          <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-start px-6 pb-24 pt-0">
            {/* Splash Rings — Bloom effect */}
            <div className="splash-ring absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20" />

            {/* Halo behind hero */}
            <div
              className="gradient-halo absolute"
              style={{
                width: 700, height: 700,
                top: "20%", left: "50%",
                transform: "translate(-50%, -20%)",
                opacity: 0.12,
              }}
            />

            {/* Ambient orbs — Layered palette */}
            <GradientOrb hue="peach" size={500} blur={100} opacity={0.12} duration={16}
              style={{ bottom: -50, left: -50 }}
              parallax={{ x: par.x, y: par.y, factor: 0.3 }} />
            <GradientOrb hue="sky" size={400} blur={90} opacity={0.1} duration={18}
              style={{ top: "10%", left: "15%" }}
              parallax={{ x: par.x, y: par.y, factor: 0.2 }} />
            <GradientOrb hue="rose" size={450} blur={110} opacity={0.08} duration={20}
              style={{ bottom: "15%", right: "10%" }}
              parallax={{ x: par.x, y: par.y, factor: 0.25 }} />
            <GradientOrb hue="lavender" size={400} blur={90} opacity={0.12} duration={14}
              style={{ top: -50, right: -50 }}
              parallax={{ x: par.x, y: par.y, factor: 0.3 }} />
            
            <GradientOrb
              key={`bloom-${bloom}`}
              hue="peach-lavender" size={600} blur={80} opacity={0.15} duration={12}
              bloom={bloom > 0}
              style={{ top: "30%", left: "50%", transform: "translate(-50%, -5%)" }}
              parallax={{ x: par.x, y: par.y, factor: 0.7 }}
            />

            <div className="label-tag relative z-10 anim-rise-sm delay-100" style={{ marginBottom: 12 }}>
              ✦  A companion for choices that matter
            </div>

            <div 
              className="relative z-10 anim-rise delay-200"
              style={{ transform: `translate3d(${-par.x * 0.04}px, ${-par.y * 0.04}px, 0)` }}
            >
              <h1
                className="brand-font text-glow text-center text-[52px] leading-[0.95] tracking-[-0.03em] md:text-[110px]"
                style={{ maxWidth: 1100, color: "var(--m-text)" }}
              >
                Think clearly.
                <br />
                <span className="font-serif-i italic lowercase tracking-tight opacity-80" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Choose softly.
                </span>
              </h1>
            </div>

            <p className="font-serif-i relative z-10 mt-4 max-w-2xl text-center text-[18px] leading-relaxed anim-rise-sm delay-300 md:text-[22px]"
               style={{ color: "var(--m-text-2)" }}>
              Mentra weighs the choice with you — quietly, honestly, and without the noise.
            </p>

            <div className="relative z-10 mt-10 w-full anim-rise delay-400"
                 style={{ transform: `translate3d(${-par.x * 0.06}px, ${-par.y * 0.06}px, 0)` }}>
              <InputBar onSubmit={handleSubmit} />
              <div className="label-tag mt-6 text-center opacity-40">
                Press enter — your decision stays yours
              </div>
            </div>

            {/* Deep atmospheric gradient base */}
            <div 
              className="absolute bottom-0 left-0 h-[240px] w-full opacity-60 transition-opacity duration-1000"
              style={{ 
                background: "linear-gradient(to bottom, transparent, rgba(201,193,240,0.15), rgba(242,196,160,0.2))",
                pointerEvents: "none"
              }}
            />
          </section>
        )}

        {phase === "onboarding" && (
          <section className="flex min-h-[75vh] flex-col items-center justify-center px-6">
            <div className="max-w-2xl text-center">
              <Reveal>
                <div className="label-tag mb-6 opacity-50">✦ Step {onboardingStep + 1} of 3</div>
                <h2 className="font-serif-m text-[48px] leading-[1.1] tracking-tight md:text-[72px]">
                  {onboardingStep === 0 ? "What calls to you?" : onboardingStep === 1 ? "Your space, quiet." : "Ready to begin."}
                </h2>
                <p className="font-serif-i mt-8 text-[20px] leading-relaxed opacity-70 md:text-[24px]">
                  {onboardingStep === 0 
                    ? "Mentra is a sanctuary for the choices that don't have easy answers. We help you find the resonance." 
                    : onboardingStep === 1 
                    ? "Everything you decide here is private, encrypted, and yours alone. No data ever leaves this room." 
                    : "Your first decision is waiting. The path forward is already within you."}
                </p>
                <button 
                  onClick={() => onboardingStep < 2 ? setOnboardingStep(s => s + 1) : setPhase("dashboard")}
                  className="btn-ghost-m mt-12 px-14 py-5 text-[18px]"
                >
                  {onboardingStep < 2 ? "Continue" : "Enter the Sanctuary"}
                </button>
              </Reveal>
            </div>
          </section>
        )}

        {phase === "dashboard" && (
          <section className="mx-auto max-w-6xl px-8 py-16">
            <div className="flex items-end justify-between border-b border-white/5 pb-10">
              <Reveal>
                <div>
                  <div className="label-tag opacity-40">Welcome back, Julian</div>
                  <h2 className="font-serif-m mt-3 text-[48px] leading-tight md:text-[64px]">The Portal</h2>
                </div>
              </Reveal>
              <button onClick={() => setPhase("hero")} className="label-tag opacity-30 transition-opacity hover:opacity-100">Sign out</button>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { title: "New Decision", desc: "Start a fresh comparison with quiet AI", icon: "✦" },
                { title: "Active Threads", desc: "4 choices pending your reflection", icon: "⚝" },
                { title: "Deep Archive", desc: "Explore 12 preserved past wisdoms", icon: "🕮" }
              ].map((card, i) => (
                <Reveal key={i} delay={i * 100} y={30}>
                  <div className="glass-card reveal-mask group cursor-pointer p-10 transition-all hover:-translate-y-2 hover:bg-white/10">
                    <div className="text-[32px] opacity-40 transition-opacity group-hover:opacity-100">{card.icon}</div>
                    <h3 className="font-serif-m mt-8 text-[26px]">{card.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed opacity-50">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20">
              <Reveal delay={400}>
                <div className="label-tag mb-8 opacity-30">Recent Manifestations</div>
                <div className="space-y-4">
                  {[
                    "Choosing the Series B offer over bootstrapping",
                    "Relocating the studio to Berlin this autumn",
                    "Transitioning from founder to board observer"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/5 px-8 py-6 transition-all hover:border-white/10 hover:bg-white/10 hover:px-10">
                      <span className="font-serif-m text-[18px] opacity-80">{item}</span>
                      <div className="flex items-center gap-4">
                        <span className="label-tag text-[10px] opacity-20">Completed</span>
                        <ArrowRight size={16} className="opacity-30" />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Comparison scene */}
        {phase === "comparison" && result && (
          <section className="reveal-mask relative mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="text-center anim-rise">
              <div className="label-tag mb-4 opacity-40">Your Question</div>
              <p className="font-serif-m text-[36px] leading-tight md:text-[52px]">{prompt}</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
              <ComparisonCard data={result.a} side="left" />
              <ComparisonCard data={result.b} side="right" delayMs={100} />
            </div>
            <div className="relative z-10 anim-card" style={{ animationDelay: "1s" }}>
              <div className="glass-verdict reveal-mask mx-auto mt-16 max-w-3xl rounded-[3rem] px-12 py-14">
                <div className="label-tag mb-6 text-center opacity-40">Mentra's Resonance</div>
                <Verdict text={result.verdict} delayMs={1200} />
                <div className="mt-12 flex justify-center">
                  <button onClick={reset} className="btn-ghost-m px-10 py-4">Ask another</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
    </>
  );
};

export default Index;
