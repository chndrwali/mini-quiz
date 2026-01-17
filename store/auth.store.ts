import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loggingOut: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,

  setToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ token });
  },
  isAuthenticated: true,
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
        isAuthenticated: false,
        loggingOut: false,
      });

      window.location.href = "/login";
    }
  },
}));
