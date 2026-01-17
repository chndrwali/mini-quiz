import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
  loggingOut: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,

  setToken: (token) => {
    if (!token) return;
    localStorage.setItem("access_token", token);
    set({ token });
  },
  loggingOut: false,

  logout: async () => {
    try {
      set({ loggingOut: true });

      const token = localStorage.getItem("access_token");

      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      set({
        loggingOut: false,
        token: null,
      });

      window.location.href = "/login";
    }
  },
}));
