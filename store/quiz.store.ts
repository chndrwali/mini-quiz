import { create } from "zustand";
import { QuizSession } from "@/types/quiz";

interface QuizSessionState {
  quiz: QuizSession | null;
  loading: boolean;
  submitting: boolean;
  currentIndex: number;
  answers: Record<number, string>;

  fetchQuiz: (subtestId: string) => Promise<void>;
  selectQuestion: (index: number) => void;
  answerQuestion: (questionNumber: number, answer: string) => void;
  submitQuiz: () => Promise<string | null>;
  resetQuiz: () => void;
}

export const useQuizSessionStore = create<QuizSessionState>((set, get) => ({
  quiz: null,
  loading: true,
  submitting: false,
  currentIndex: 0,
  answers: {},

  fetchQuiz: async (subtestId) => {
    try {
      set({ loading: true });

      const token = localStorage.getItem("access_token");

      // cek active dulu
      let res = await fetch("/api/quiz/active", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let json = await res.json();

      if (res.ok && json.data) {
        set({ quiz: json.data, loading: false });
        const saved = localStorage.getItem(
          `quiz-answers-${json.data.session_id}`
        );

        if (saved) {
          set({ answers: JSON.parse(saved) });
        }

        return;
      }

      // start baru
      res = await fetch(`/api/quiz/start/${subtestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      json = await res.json();
      if (!res.ok) throw new Error();

      set({ quiz: json.data, loading: false });
      const saved = localStorage.getItem(
        `quiz-answers-${json.data.session_id}`
      );

      if (saved) {
        set({
          answers: JSON.parse(saved),
        });
      }
    } catch {
      set({ quiz: null, loading: false });
    }
  },

  selectQuestion: (index) => set({ currentIndex: index }),

  answerQuestion: (questionNumber, answer) =>
    set((state) => {
      const updatedAnswers = {
        ...state.answers,
        [questionNumber]: answer,
      };

      if (state.quiz?.session_id) {
        localStorage.setItem(
          `quiz-answers-${state.quiz.session_id}`,
          JSON.stringify(updatedAnswers)
        );
      }

      return { answers: updatedAnswers };
    }),

  submitQuiz: async () => {
    try {
      set({ submitting: true });
      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: get().answers }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error();

      return json.data.session_id;
    } catch {
      return null;
    } finally {
      set({ submitting: false });
      localStorage.removeItem(`quiz-answers-${get().quiz?.session_id}`);
    }
  },
  resetQuiz: () =>
    set({
      quiz: null,
      answers: {},
      currentIndex: 0,
      loading: true,
    }),
}));
