"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { QuizHistoryItem, QuizHistoryResponse } from "@/types/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const HistoryQuiz = () => {
  const router = useRouter();

  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`/api/quiz/history?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const json: QuizHistoryResponse = await res.json();
        if (!res.ok) throw new Error();

        // 🔥 sesuai struktur backend
        setHistory(json.data?.results);
        setTotalPages(json.data.total_pages);
      })
      .catch(() => {
        setError("Gagal memuat riwayat quiz.");
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Riwayat Quiz</h1>

      {loading && <p className="text-muted-foreground">Loading history...</p>}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && history.length === 0 && (
        <p className="text-muted-foreground">
          Belum ada quiz yang diselesaikan.
        </p>
      )}

      {!loading && !error && history.length > 0 && (
        <>
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.session_id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">
                    {item.subtest_name}
                  </CardTitle>

                  <span className="text-sm font-semibold">
                    Skor: {item.score}
                  </span>
                </CardHeader>

                <CardContent className="flex justify-between items-center text-sm">
                  <div className="text-muted-foreground">
                    {new Date(item.completed_at).toLocaleString()}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/quiz/result/${item.session_id}`)
                    }
                  >
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Sebelumnya
            </Button>

            <span className="text-sm text-muted-foreground">
              Halaman {page} dari {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Selanjutnya →
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
