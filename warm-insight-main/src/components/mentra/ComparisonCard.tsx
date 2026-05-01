import { ArrowRight, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export interface CardData {
  label: string;        // e.g. "Option A"
  name: string;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  winner?: boolean;
}

interface Props {
  data: CardData;
  side: "left" | "right";
  delayMs?: number;
}

interface DeepDive {
  strengths: { title: string; detail: string }[];
  weaknesses: { title: string; detail: string }[];
  tradeoffs: { gives: string; takes: string }[];
  reflection: string;
}

const buildDeepDive = (d: CardData): DeepDive => {
  const strengths = d.strengths.map((s) => ({
    title: s,
    detail: d.winner
      ? "This compounds in your favor over time — small at first, undeniable later."
      : "Real, but the kind of advantage you stop noticing once it's familiar.",
  }));
  const weaknesses = d.weaknesses.map((w) => ({
    title: w,
    detail: d.winner
      ? "Worth naming so it doesn't ambush you — survivable with intention."
      : "The friction you'd quietly negotiate with for years.",
  }));

  const tradeoffs = [
    {
      gives: d.strengths[0] ?? "Forward motion",
      takes: d.weaknesses[0] ?? "Comfort of the known",
    },
    {
      gives: d.strengths[1] ?? "A clearer signal about who you are",
      takes: d.weaknesses[1] ?? "Some short-term certainty",
    },
  ];

  return {
    strengths,
    weaknesses,
    tradeoffs,
    reflection: d.winner
      ? "If you imagine yourself a year from now, this is the path you'd thank yourself for."
      : "Choosing this is choosing the version of you that stays — not the one that grows.",
  };
};

export const ComparisonCard = ({ data, side, delayMs = 0 }: Props) => {
  const [open, setOpen] = useState(false);
  const deep = useMemo(() => buildDeepDive(data), [data]);
  const animClass = side === "left" ? "anim-left" : "anim-right";

  // Once expanded, undim the losing side so it can be read clearly.
  const dimmed = data.winner === false && !open;

  return (
    <div
      className={`glass-card reveal-mask reveal-card relative rounded-3xl p-8 ${animClass}`}
      style={{
        animationDelay: `${delayMs}ms`,
        opacity: dimmed ? 0.45 : 1,
        filter: dimmed ? "blur(1.5px)" : "none",
        transition: "all 1s var(--ease-expo)",
        borderColor: data.winner ? "rgba(175,169,236,0.6)" : "rgba(180,158,130,0.15)",
        borderWidth: 1,
      }}
    >
      {data.winner && (
        <div
          className="brand-font absolute right-6 top-6 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] tracking-[0.15em]"
          style={{ 
            color: "var(--m-text)",
            background: "linear-gradient(120deg, rgba(201,193,240,0.4), rgba(242,196,160,0.3))",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 24px rgba(175,169,236,0.12)"
          }}
          aria-hidden
        >
          ✦ Winner
        </div>
      )}

      <div className="brand-font text-[9px] tracking-[0.25em] opacity-40">{data.label}</div>

      <h3 className="brand-font mt-4 text-[32px] leading-[0.9] tracking-tight" style={{ color: "var(--m-text)" }}>
        {data.name}
      </h3>
      <p
        className="font-serif-i mt-2 text-[16px] leading-snug"
        style={{ color: "var(--m-text-2)", opacity: 0.8 }}
      >
        {data.tagline}
      </p>

      <div className="my-7 h-px" style={{ background: "linear-gradient(to right, rgba(180,158,130,0.25), transparent)" }} />

      <ul className="space-y-3.5">
        {data.strengths.map((s, i) => (
          <li key={`s-${i}`} className="flex gap-4 text-[14.5px] leading-tight" style={{ color: "var(--m-text-2)" }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(175,169,236,0.9)" }} />
            <span>{s}</span>
          </li>
        ))}
        {data.weaknesses.map((w, i) => (
          <li key={`w-${i}`} className="flex gap-4 text-[14.5px] leading-tight" style={{ color: "var(--m-text-3)" }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(184,168,152,0.6)" }} />
            <span>{w}</span>
          </li>
        ))}
      </ul>

      {/* Expansion */}
      <div
        className="grid overflow-hidden transition-all"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.7s var(--ease-expo), margin 0.5s var(--ease-expo)",
          marginTop: open ? 32 : 0,
        }}
      >
        <div className="min-h-0">
          <div
            className="rounded-[2rem] p-7"
            style={{
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 16px 48px rgba(180,145,100,0.04)"
            }}
          >
            {/* Strengths */}
            <div>
              <div className="label-tag text-[9px]">✦ Nuance</div>
              <ul className="mt-4 space-y-4">
                {deep.strengths.map((s, i) => (
                  <li key={`ds-${i}`}>
                    <p className="text-[15px] font-medium leading-tight" style={{ color: "var(--m-text)" }}>{s.title}</p>
                    <p
                      className="font-serif-i mt-1.5 text-[14px] leading-relaxed opacity-80"
                      style={{ color: "var(--m-text-2)" }}
                    >
                      {s.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-6 h-px" style={{ background: "rgba(180,158,130,0.12)" }} />

            {/* Reflection */}
            <div className="flex gap-4">
              <div className="h-10 w-px shrink-0" style={{ background: "linear-gradient(to bottom, rgba(175,169,236,0.6), transparent)" }} />
              <p
                className="font-serif-i text-[16px] leading-relaxed"
                style={{ color: "var(--m-text)" }}
              >
                {deep.reflection}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn-ghost-m group mt-8 inline-flex items-center gap-2.5"
      >
        <span className="relative z-10">{open ? "Collapse" : "Explore deeper"}</span>
        <div className="relative flex h-4 w-4 items-center justify-center">
          {open ? (
            <ChevronDown
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-500"
              style={{ transform: "rotate(180deg)" }}
            />
          ) : (
            <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
          )}
        </div>
      </button>
    </div>
  );
};
