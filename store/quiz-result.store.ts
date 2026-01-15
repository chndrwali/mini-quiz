import { create } from "zustand";
import { QuizResult } from "@/types/quiz";

interface QuizResultState {
  result: QuizResult | null;
  loading: boolean;
  error: string | null;

  fetchResult: (sessionId: string) => Promise<void>;
  clearResult: () => void;
}

export const useQuizResultStore = create<QuizResultState>((set) => ({
  result: null,
  loading: true,
  error: null,

  fetchResult: async (sessionId) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");

      const res = await fetch(`/api/quiz/result/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error();

      set({
        result: json.data.result,
        loading: false,
      });
    } catch {
      set({
        error: "Gagal memuat hasil quiz.",
        loading: false,
      });
    }
  },

  clearResult: () =>
    set({
      result: null,
      loading: true,
      error: null,
    }),
}));
