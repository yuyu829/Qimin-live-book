"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "street-memory-unlocked";

export function markMemoryUnlocked(locationId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const current = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[]);
  current.add(locationId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]));
  window.dispatchEvent(new Event("memory-unlocked"));
}

export function useUnlockedMemories() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const read = () => setUnlocked(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[]);
    read();
    window.addEventListener("memory-unlocked", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("memory-unlocked", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return unlocked;
}

export function MemoryCounter() {
  const unlocked = useUnlockedMemories();

  return (
    <div className="rounded-md border border-wood/25 bg-paper/70 px-3 py-2 text-sm text-wood">
      已收集记忆 <span className="font-bold text-ink">{unlocked.length}</span> / 3
    </div>
  );
}
