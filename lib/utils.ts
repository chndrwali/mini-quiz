import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function formatDuration(seconds: number): string {
  if (seconds < 0 || Number.isNaN(seconds)) return "0d";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];

  if (h > 0) parts.push(`${h}j`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}d`);

  return parts.join(" ");
}

export const config = {
  env: {
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://apiquiz.ambisiusacademy.com/api/v1",
  },
};

export const getPasswordStrength = (password: string) => {
  if (!password) return { score: 0, label: "" };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "Lemah", color: "bg-red-500" },
    { label: "Cukup", color: "bg-yellow-500" },
    { label: "Kuat", color: "bg-green-500" },
    { label: "Sangat Kuat", color: "bg-green-600" },
  ];

  return {
    score,
    label: map[Math.min(score, map.length - 1)].label,
    color: map[Math.min(score, map.length - 1)].color,
  };
};
