import { useEffect, useState } from "react";
import { Clock, Trash2, X } from "lucide-react";
import { DecisionEntry, clearHistory, readHistory, removeHistory, subscribeHistory } from "@/lib/history";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenEntry: (entry: DecisionEntry) => void;
}

const formatWhen = (ts: number) => {
  const d = new Date(ts);
  const now = Date.now();
  const diff = now - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export const HistoryPanel = ({ open, onClose, onOpenEntry }: Props) => {
  const [items, setItems] = useState<DecisionEntry[]>(() => readHistory());

  useEffect(() => {
    setItems(readHistory());
    const unsub = subscribeHistory(setItems);
    return () => {
      unsub();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity"
        style={{
          background: "rgba(44, 36, 21, 0.18)",
          backdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Decision history"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(102%)",
          transition: "transform 0.55s var(--ease-expo)",
        }}
      >
        <div
          className="glass-verdict relative m-3 flex h-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-3xl"
          style={{ boxShadow: "0 24px 80px rgba(180,145,100,0.2)" }}
        >
          <header className="flex items-center justify-between px-7 pt-7">
            <div>
              <div className="label-tag">✦ Your library</div>
              <h2 className="font-serif-m mt-1 text-[26px] leading-tight" style={{ color: "var(--m-text)" }}>
                Decision history
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="glass flex h-9 w-9 items-center justify-center rounded-full"
              style={{ color: "var(--m-text-2)" }}
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </header>

          <p className="px-7 pt-3 text-[13px] leading-relaxed" style={{ color: "var(--m-text-2)" }}>
            Quiet record of the questions you've held — saved on this device.
          </p>

          <div className="mt-5 flex-1 space-y-3 overflow-y-auto px-5 pb-5">
            {items.length === 0 && (
              <div className="mx-2 mt-10 rounded-2xl px-5 py-12 text-center" style={{ background: "rgba(250,247,242,0.4)" }}>
                <Clock size={20} strokeWidth={1.5} className="mx-auto" style={{ color: "var(--m-text-3)" }} />
                <p className="font-serif-i mt-4 text-[18px]" style={{ color: "var(--m-text-2)" }}>
                  Nothing yet.
                </p>
                <p className="mt-2 text-[12px]" style={{ color: "var(--m-text-3)" }}>
                  Ask Mentra a question — your verdicts will gather here.
                </p>
              </div>
            )}

            {items.map((item, idx) => {
              const winner = item.a.winner ? item.a : item.b.winner ? item.b : null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenEntry(item)}
                  className="group relative block w-full rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(250,247,242,0.55)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    borderBottomColor: "rgba(180,158,130,0.22)",
                    boxShadow: "0 4px 24px rgba(180,145,100,0.06)",
                    animation: open ? `cardReveal 0.5s var(--ease-expo) ${idx * 40}ms both` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-tag">{formatWhen(item.createdAt)}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHistory(item.id);
                      }}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: "var(--m-text-3)" }}
                      aria-label="Remove"
                    >
                      <Trash2 size={13} strokeWidth={1.75} />
                    </span>
                  </div>
                  <p
                    className="font-serif-i mt-2 text-[17px] leading-snug"
                    style={{ color: "var(--m-text)" }}
                  >
                    "{item.prompt}"
                  </p>
                  {winner && (
                    <p className="mt-2 text-[12px]" style={{ color: "var(--m-text-2)" }}>
                      ✦ Leaned toward <span style={{ color: "var(--m-text)" }}>{winner.name}</span>
                    </p>
                  )}
                  <p className="mt-2 text-[12px] italic" style={{ color: "var(--m-text-3)", fontFamily: "'Instrument Serif', serif" }}>
                    {item.verdict}
                  </p>
                </button>
              );
            })}
          </div>

          {items.length > 0 && (
            <footer className="border-t px-7 py-4" style={{ borderColor: "rgba(180,158,130,0.18)" }}>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Clear all saved decisions? This can't be undone.")) clearHistory();
                }}
                className="text-[12px] underline-offset-4 hover:underline"
                style={{ color: "var(--m-text-3)" }}
              >
                Clear history
              </button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
};
