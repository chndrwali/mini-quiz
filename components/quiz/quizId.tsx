"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ErrorActiveQuiz } from "@/components/skeleton/errorActiveQuiz";
import { useQuizSessionStore } from "@/store/quiz.store";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingActiveQuiz } from "../skeleton/loadingActiveQuiz";

interface QuizIdProps {
  subtestId: string;
}

const ABCD = ["A", "B", "C", "D"];

export const QuizId = ({ subtestId }: QuizIdProps) => {
  const router = useRouter();

  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  const {
    quiz,
    loading,
    submitting,
    currentIndex,
    answers,
    fetchQuiz,
    selectQuestion,
    answerQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizSessionStore();

  useEffect(() => {
    resetQuiz();
    fetchQuiz(subtestId);
  }, [subtestId]);

  const remaining = useTimer(quiz?.expires_at);

  if (loading) {
    return (
      <LoadingActiveQuiz title="Memuat Quiz" desc="Memuat sesi quiz baru" />
    );
  }

  if (!quiz) {
    return (
      <ErrorActiveQuiz
        error="Gagal memuat quiz. Silakan kembali ke dashboard dan coba lagi."
        resetError={() => router.push("/dashboard")}
      />
    );
  }

  const question = quiz.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / quiz.questions.length) * 100;

  const remainingSeconds = Math.floor(remaining / 1000);

  const timerColor =
    remainingSeconds <= 120
      ? "text-red-600 bg-red-100 w-fit px-1 rounded"
      : remainingSeconds <= 240
      ? "text-yellow-500 bg-yellow-100 w-fit px-1 rounded"
      : "text-foreground";

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      {/* LEFT PANEL */}
      <aside className="border-r p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Progress</p>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            {answeredCount}/{quiz.questions.length} terjawab
          </p>
        </div>

        <div className="text-sm">
          Sisa waktu:
          <div className={`font-bold text-lg ${timerColor}`}>
            {formatTime(remaining)}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-4">
          {quiz.questions.map((q, idx) => (
            <button
              key={q.question_number}
              onClick={() => selectQuestion(idx)}
              className={`h-10 rounded-md text-sm font-medium
                ${
                  currentIndex === idx
                    ? "bg-primary text-white"
                    : answers[q.question_number]
                    ? "bg-green-100 text-green-700"
                    : "bg-muted"
                }`}
            >
              {q.question_number}
            </button>
          ))}
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="p-6">
        <Card className="p-6 space-y-6">
          <h2 className="font-semibold">Soal {question.question_number}</h2>

          <p>{question.question_text}</p>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const selected = answers[question.question_number] === opt;

              return (
                <Button
                  key={opt}
                  variant={selected ? "default" : "outline"}
                  className="w-full justify-start gap-3"
                  onClick={() => answerQuestion(question.question_number, opt)}
                >
                  <span className="font-bold">{ABCD[i]}.</span>
                  {opt}
                </Button>
              );
            })}
          </div>
        </Card>

        <div className="pt-6">
          <AlertDialog
            open={openSubmitDialog}
            onOpenChange={setOpenSubmitDialog}
          >
            <AlertDialogTrigger asChild>
              <Button
                className="w-full"
                disabled={submitting || remaining === 0}
              >
                {remaining === 0 ? "Waktu Habis" : "Submit Quiz"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Submit Quiz</AlertDialogTitle>

                <AlertDialogDescription>
                  {Object.keys(answers).length < quiz.questions.length ? (
                    <>
                      Masih ada{" "}
                      <strong>
                        {quiz.questions.length - Object.keys(answers).length}
                      </strong>{" "}
                      soal yang belum dijawab.
                      <br />
                      Apakah kamu yakin ingin submit?
                    </>
                  ) : (
                    "Semua soal sudah dijawab. Yakin ingin submit quiz?"
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>

                <AlertDialogAction
                  disabled={submitting}
                  onClick={async () => {
                    const sessionId = await submitQuiz();
                    if (sessionId) {
                      router.replace(`/quiz/result/${sessionId}`);
                    }
                  }}
                >
                  {submitting ? "Submitting..." : "Ya, Submit"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
};
