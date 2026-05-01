import { useEffect, useState } from "react";

export const Verdict = ({ text, delayMs = 1100 }: { text: string; delayMs?: number }) => {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let raf: number;
    const start = setTimeout(() => {
      const tick = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) raf = window.setTimeout(tick, 35) as unknown as number;
      };
      tick();
    }, delayMs);
    return () => {
      clearTimeout(start);
      if (raf) clearTimeout(raf);
    };
  }, [text, delayMs]);

  return (
    <div className="mt-12 flex flex-col items-center gap-5">
      <div className="h-px w-16" style={{ background: "rgba(180,158,130,0.35)" }} />
      <p
        className="max-w-xl text-center text-[22px] leading-relaxed"
        style={{
          color: "var(--m-text)",
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
        }}
      >
        {shown}
        <span className="inline-block w-[1px]" />
      </p>
    </div>
  );
};
