import { FinalResult } from "@/lib/scoring";

const STORAGE_KEY = "iq-test:last-result";

export function saveResult(result: FinalResult): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadResult(): FinalResult | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FinalResult;
  } catch {
    return null;
  }
}
