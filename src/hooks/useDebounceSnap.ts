import { useRef } from "react";

export const useDebouncedSnap = (callback: () => void, delay = 150) => {
  const timerRef = useRef<number | null>(null);

  const schedule = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(callback, delay);
  };

  const cancel = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return { schedule, cancel };
};
