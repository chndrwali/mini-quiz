"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { formatDateTime } from "@/lib/utils";
import { useQuizHistoryStore } from "@/store/quiz-history.store";
import { Spinner } from "../ui/spinner";

export const HistoryQuiz = () => {
  const router = useRouter();

  const { history, loading, error, page, totalPages, fetchHistory, setPage } =
    useQuizHistoryStore();

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Riwayat Quiz</h1>

      {loading && (
        <div className="flex items-center flex-col gap-4 justify-center place-content-center">
          <Spinner />
          <p className="text-sm text-muted-foreground">
            Memuat riwayat quiz...
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && history.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Belum ada quiz yang diselesaikan.
        </p>
      )}

      {!loading && !error && history.length > 0 && (
        <>
          <div className="space-y-3">
            {history.map((item) => (
              <Card
                key={item.session_id}
                className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.subtest_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(item.completed_at)}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-semibold">
                    Skor: {item.score}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/quiz/result/${item.session_id}`)
                    }
                  >
                    Detail
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-full sm:w-auto"
            >
              ← Sebelumnya
            </Button>

            <span className="text-xs sm:text-sm text-muted-foreground">
              Halaman {page} dari {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="w-full sm:w-auto"
            >
              Selanjutnya →
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
