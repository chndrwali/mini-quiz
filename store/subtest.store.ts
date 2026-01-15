import { create } from "zustand";
import { Subtest } from "@/types/quiz";

interface SubtestState {
  subtests: Subtest[];
  loading: boolean;
  error: string | null;

  fetchSubtests: () => Promise<void>;
  clearSubtests: () => void;
}

interface ActiveQuizStore {
  loading: boolean;
  error: string | null;
  fetchActiveQuiz: (token: string) => Promise<{ session_id: string } | null>;
  resetError: () => void;
}

export const useSubtestStore = create<SubtestState>((set) => ({
  subtests: [],
  loading: false,
  error: null,

  fetchSubtests: async () => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/subtests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error();

      set({
        subtests: json.data ?? json,
      });
    } catch {
      set({ error: "Gagal memuat subtest." });
    } finally {
      set({ loading: false });
    }
  },

  clearSubtests: () => set({ subtests: [] }),
}));

export const useActiveQuizStore = create<ActiveQuizStore>((set) => ({
  loading: true,
  error: null,

  fetchActiveQuiz: async (token: string) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/quiz/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.data) {
        set({ loading: false, error: null });
        return null;
      }

      set({ loading: false });
      return data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memuat quiz aktif.";
      set({
        error: errorMessage,
        loading: false,
      });
      return null;
    }
  },

  resetError: () => set({ error: null }),
}));
