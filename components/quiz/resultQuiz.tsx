"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingActiveQuiz } from "@/components/skeleton/loadingActiveQuiz";

import { formatDateTime, formatDuration } from "@/lib/utils";
import { useQuizResultStore } from "@/store/quiz-result.store";

interface ResultQuizProps {
  sessionId: string;
}

export const ResultQuiz = ({ sessionId }: ResultQuizProps) => {
  const router = useRouter();

  const { result, loading, error, fetchResult, clearResult } =
    useQuizResultStore();

  useEffect(() => {
    clearResult();
    fetchResult(sessionId);
  }, [sessionId]);

  if (loading) {
    return <LoadingActiveQuiz title="Memuat hasil quiz" desc="" />;
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const PASSING_GRADE = 70;
  const isPassed = result.percentage >= PASSING_GRADE;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl p-4 sm:p-6 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Hasil Quiz</h1>
          <p className="text-muted-foreground">{result.subtest_name}</p>
          <div className="flex justify-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
      ${isPassed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {isPassed ? "LULUS" : "TIDAK LULUS"}
            </span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {result.score === 0 ? "0" : result.score + "0"}
          </p>
          <p className="text-sm text-muted-foreground">Skor Akhir</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Akurasi</span>
            <span className="font-semibold">{result.percentage}%</span>
          </div>
          <Progress value={result.percentage} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold">
              {result.correct_answers}/{result.total_questions}
            </p>
            <p className="text-sm text-muted-foreground">Jawaban Benar</p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {formatDuration(result.total_time_seconds)}
            </p>
            <p className="text-sm text-muted-foreground">Total Waktu</p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {formatDuration(result.average_time_per_question)}
            </p>
            <p className="text-sm text-muted-foreground">Rata-rata / Soal</p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {formatDateTime(result.completed_at)}
            </p>
            <p className="text-sm text-muted-foreground">Selesai</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-3 pt-4">
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => router.push("/history")}
          >
            Lihat Riwayat
          </Button>

          <Button className="w-fit" onClick={() => router.push("/dashboard")}>
            Kembali ke Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};
