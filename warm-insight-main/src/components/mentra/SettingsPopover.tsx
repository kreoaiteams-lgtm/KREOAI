import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { AnimIntensity, usePrefs } from "@/hooks/usePrefs";

const ANIM_OPTIONS: { value: AnimIntensity; label: string; hint: string }[] = [
  { value: "full", label: "Full", hint: "Breathing orbs, drifting gradients" },
  { value: "soft", label: "Soft", hint: "Slower, calmer ambient motion" },
  { value: "still", label: "Still", hint: "No ambient motion at all" },
];

export const SettingsPopover = () => {
  const { prefs, update } = usePrefs();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Preferences"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="glass flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5"
        style={{ color: "var(--m-text-2)" }}
      >
        <Settings size={16} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Preferences"
          className="glass-verdict absolute right-0 top-12 z-50 w-[300px] rounded-2xl p-5 anim-card"
          style={{ animationDuration: "0.25s" }}
        >
          <div className="label-tag mb-3">✦ Preferences</div>

          <div className="mb-4">
            <div className="mb-2 text-[13px]" style={{ color: "var(--m-text)" }}>
              Animation intensity
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {ANIM_OPTIONS.map((o) => {
                const active = prefs.animation === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => update({ animation: o.value })}
                    className="rounded-full px-2 py-2 text-[12px] transition-all"
                    style={{
                      background: active ? "rgba(175,169,236,0.22)" : "rgba(250,247,242,0.5)",
                      border: active
                        ? "1px solid rgba(175,169,236,0.6)"
                        : "1px solid rgba(180,158,130,0.22)",
                      color: active ? "var(--m-text)" : "var(--m-text-2)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] leading-snug" style={{ color: "var(--m-text-3)" }}>
              {ANIM_OPTIONS.find((o) => o.value === prefs.animation)?.hint}
            </p>
          </div>

          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl px-1 py-2">
            <span>
              <span className="block text-[13px]" style={{ color: "var(--m-text)" }}>
                Compact mode
              </span>
              <span className="block text-[11px] leading-snug" style={{ color: "var(--m-text-3)" }}>
                Tighter spacing for dense reading.
              </span>
            </span>
            <span
              role="switch"
              aria-checked={prefs.compact}
              onClick={() => update({ compact: !prefs.compact })}
              className="relative mt-1 inline-block h-5 w-9 shrink-0 rounded-full transition-all"
              style={{
                background: prefs.compact
                  ? "linear-gradient(120deg, #C9C1F0, #F0C4C8)"
                  : "rgba(180,158,130,0.28)",
              }}
            >
              <span
                className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                style={{
                  left: prefs.compact ? 18 : 2,
                  transition: "left 0.25s var(--ease-spring)",
                }}
              />
            </span>
          </label>

          <p className="mt-4 border-t pt-3 text-[11px]" style={{ borderColor: "rgba(180,158,130,0.18)", color: "var(--m-text-3)" }}>
            Saved to this device. Stays with you across visits.
          </p>
        </div>
      )}
    </div>
  );
};
