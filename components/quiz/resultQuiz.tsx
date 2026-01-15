"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QuizResult } from "@/types/quiz";
import { formatDuration } from "@/lib/utils";

interface ResultQuizProps {
  sessionId: string;
}

export const ResultQuiz = ({ sessionId }: ResultQuizProps) => {
  const router = useRouter();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`/api/quiz/result/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const json = await res.json();
        console.log("RAW RESULT:", json);

        if (!res.ok) throw new Error();

        setResult(json.data.result);
      })
      .catch(() => {
        setError("Gagal memuat hasil quiz.");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading result...
      </div>
    );
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
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle>Hasil Quiz 🎉</CardTitle>
          <p className="text-sm text-muted-foreground">{result.subtest_name}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            {result.score && (
              <p className="text-4xl font-bold">{result.score}</p>
            )}
            <p className="text-muted-foreground">Skor</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">
                {result.correct_answers}/{result.total_questions}
              </p>
              <p className="text-muted-foreground">Benar</p>
            </div>

            <div>
              <p className="font-semibold">{result.percentage}%</p>
              <p className="text-muted-foreground">Akurasi</p>
            </div>

            <div>
              <p className="font-semibold">
                {formatDuration(result.total_time_seconds)}
              </p>
              <p className="text-muted-foreground">Total Waktu</p>
            </div>

            <div>
              <p className="font-semibold">
                {formatDuration(result.average_time_per_question)}
              </p>
              <p className="text-muted-foreground">Rata-rata / Soal</p>
            </div>
          </div>

          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            Kembali ke Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
