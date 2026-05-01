import { CardData } from "@/components/mentra/ComparisonCard";

export interface DecisionEntry {
  id: string;
  prompt: string;
  createdAt: number;
  a: CardData;
  b: CardData;
  verdict: string;
}

const KEY = "mentra:history:v1";
const MAX = 30;

const listeners = new Set<(items: DecisionEntry[]) => void>();

export const readHistory = (): DecisionEntry[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DecisionEntry[]) : [];
  } catch {
    return [];
  }
};

const write = (items: DecisionEntry[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l(items));
};

export const addHistory = (entry: Omit<DecisionEntry, "id" | "createdAt">) => {
  const items = readHistory();
  const next: DecisionEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const merged = [next, ...items].slice(0, MAX);
  write(merged);
  return next;
};

export const removeHistory = (id: string) => {
  write(readHistory().filter((i) => i.id !== id));
};

export const clearHistory = () => write([]);

export const subscribeHistory = (fn: (items: DecisionEntry[]) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
