import { useEffect, useState } from "react";

function getRemaining(expiresAt?: string) {
  if (!expiresAt) return 0;
  return Math.max(0, new Date(expiresAt).getTime() - Date.now());
}

export function useTimer(expiresAt?: string) {
  const [remaining, setRemaining] = useState(() => getRemaining(expiresAt));

  useEffect(() => {
    if (!expiresAt) return;

    const end = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const diff = Math.max(0, end - Date.now());
      setRemaining(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return remaining;
}
