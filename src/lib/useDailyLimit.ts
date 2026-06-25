"use client";
import { useState, useCallback } from "react";

export function useDailyLimit(key: string, limit: number, isPremium: boolean) {
  const today = new Date().toISOString().split("T")[0];
  const storageKey = `mathuz_limit_${key}_${today}`;

  const getCount = () => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem(storageKey) ?? "0");
  };

  const [count, setCount] = useState<number>(getCount);
  const [showGate, setShowGate] = useState(false);

  const increment = useCallback(() => {
    if (isPremium) return true; // Premium — cheksiz
    const current = getCount();
    if (current >= limit) {
      setShowGate(true);
      return false; // Limit tugadi
    }
    const next = current + 1;
    localStorage.setItem(storageKey, String(next));
    setCount(next);
    return true; // Ruxsat
  }, [isPremium, limit, storageKey]);

  const remaining = isPremium ? Infinity : Math.max(0, limit - count);

  return { count, remaining, showGate, setShowGate, increment };
}
