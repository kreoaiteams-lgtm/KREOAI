import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

interface InputBarProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export const InputBar = ({ onSubmit, disabled }: InputBarProps) => {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    setSending(true);
    setTimeout(() => {
      onSubmit(value.trim());
      setValue("");
      setSending(false);
    }, 220);
  };

  return (
    <form
      onSubmit={handle}
      className="relative z-10 mx-auto w-full px-4"
      style={{ maxWidth: "720px" }}
    >
      <div
        className="glass-input group relative flex items-center gap-4 rounded-full pl-8 pr-3"
        style={{
          height: 72,
          transform: sending ? "scale(0.98)" : undefined,
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What are you deciding today?"
          className="flex-1 bg-transparent text-[22px] font-light outline-none placeholder:text-[color:var(--m-text-3)] md:text-[24px]"
          style={{
            color: "var(--m-text)",
            transform: sending ? "translateY(-4px)" : "translateY(0)",
            opacity: sending ? 0 : 1,
            transition: "all 0.4s var(--ease-expo)",
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
          }}
        />
        <button
          type="submit"
          disabled={!value.trim() || sending || disabled}
          className="relative flex h-14 w-14 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
          style={{
            color: "var(--m-text-2)",
            background: "rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <ArrowRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      <style>{`
        .glass-input:focus-within {
          border-color: rgba(255,255,255,1);
          box-shadow:
            0 0 0 4px rgba(175,169,236,0.12),
            0 24px 80px rgba(180,145,100,0.15),
            inset 0 1px 0 rgba(255,255,255,1);
          transform: translateY(-2px);
        }
      `}</style>
    </form>
  );
};
