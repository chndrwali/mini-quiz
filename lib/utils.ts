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
