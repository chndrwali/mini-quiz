"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubtestStore } from "@/store/subtest.store";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { LoadingListQuiz } from "@/components/skeleton/loadingListQuiz";
import { ErrorListQuiz } from "@/components/skeleton/errorListQuiz";

export const ListQuiz = () => {
  const router = useRouter();
  const [startingQuizId, setStartingQuizId] = useState<string | null>(null);

  const { subtests, loading, error, fetchSubtests } = useSubtestStore();

  useEffect(() => {
    fetchSubtests();
  }, [fetchSubtests]);

  const handleStartQuiz = async (subtestId: string) => {
    const token = localStorage.getItem("access_token");
    setStartingQuizId(subtestId);

    try {
      const res = await fetch(`/api/quiz/start/${subtestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 409) {
        router.push("/quiz/active");
        return;
      }

      if (!res.ok) {
        toast.error("Gagal memulai quiz");
      }

      router.push(`/quiz/${subtestId}`);
    } catch {
      toast.error("Terjadi kesalahan saat memulai quiz.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Pilih quiz untuk memulai</p>
      </div>

      {loading && <LoadingListQuiz />}

      {error && <ErrorListQuiz error={error} />}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subtests.map((subtest) => (
            <Card
              key={subtest.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-balance">{subtest.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {subtest.description || "Latihan soal untuk quiz ini."}
                </p>
                <Button
                  className="w-full"
                  onClick={() => handleStartQuiz(subtest.id)}
                  disabled={startingQuizId === subtest.id}
                >
                  {startingQuizId === subtest.id ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="size-4" />
                      Memulai...
                    </span>
                  ) : (
                    "Mulai Quiz"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
