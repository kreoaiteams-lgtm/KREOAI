import { useEffect, useState } from "react";

export type AnimIntensity = "full" | "soft" | "still";

export interface Prefs {
  animation: AnimIntensity;
  compact: boolean;
}

const KEY = "mentra:prefs:v1";
const DEFAULTS: Prefs = { animation: "full", compact: false };

const read = (): Prefs => {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
};

const apply = (p: Prefs) => {
  const root = document.documentElement;
  root.dataset.anim = p.animation;
  root.dataset.compact = p.compact ? "true" : "false";
};

// Cross-instance sync within the same tab
const listeners = new Set<(p: Prefs) => void>();
const broadcast = (p: Prefs) => listeners.forEach((l) => l(p));

export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const p = read();
    if (typeof window !== "undefined") apply(p);
    return p;
  });

  useEffect(() => {
    const onChange = (p: Prefs) => setPrefs(p);
    listeners.add(onChange);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        const next = read();
        apply(next);
        setPrefs(next);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const update = (patch: Partial<Prefs>) => {
    const next = { ...prefs, ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
    apply(next);
    setPrefs(next);
    broadcast(next);
  };

  return { prefs, update };
}
