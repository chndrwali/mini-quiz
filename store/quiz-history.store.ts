import { create } from "zustand";
import { QuizHistoryItem, QuizHistoryResponse } from "@/types/quiz";

interface QuizHistoryState {
  history: QuizHistoryItem[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;

  fetchHistory: (page: number) => Promise<void>;
  setPage: (page: number) => void;
}

const LIMIT = 5;

export const useQuizHistoryStore = create<QuizHistoryState>((set) => ({
  history: [],
  loading: true,
  error: null,
  page: 1,
  totalPages: 1,

  setPage: (page) => set({ page }),

  fetchHistory: async (page) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `/api/quiz/history?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json: QuizHistoryResponse = await res.json();
      if (!res.ok) throw new Error();

      set({
        history: json.data.results,
        totalPages: json.data.total_pages,
        loading: false,
      });
    } catch {
      set({
        error: "Gagal memuat riwayat quiz.",
        loading: false,
      });
    }
  },
}));
