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
import { Subtest } from "@/types/quiz";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ModalCustom } from "../responsiveModal";

export const ListQuiz = () => {
  const router = useRouter();
  const [startingQuizId, setStartingQuizId] = useState<string | null>(null);
  const [selectedSubtest, setSelectedSubtest] = useState<Subtest>();
  const [openStartDialog, setOpenStartDialog] = useState(false);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6">
      {loading && <LoadingListQuiz />}

      {error && <ErrorListQuiz error={error} onRetry={fetchSubtests} />}

      {!loading && !error && (
        <>
          <Card className="md:col-span-1">
            <CardHeader>
              <TextGenerateEffect words="Daftar Quiz" className="font-bold" />
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-4">
              {subtests.map((subtest) => (
                <button
                  key={subtest.id}
                  onClick={() => setSelectedSubtest(subtest)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition
            ${
              selectedSubtest?.id === subtest.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }
          `}
                >
                  {subtest.name}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">
                {selectedSubtest?.name ?? "Pilih Quiz"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground hidden md:block">
                {selectedSubtest?.description ??
                  "Pilih quiz di sebelah kiri untuk melihat detail dan petunjuk."}
              </p>
              <p className="text-muted-foreground block md:hidden">
                {selectedSubtest?.description ??
                  "Pilih quiz di atas untuk melihat detail dan petunjuk."}
              </p>

              {selectedSubtest && (
                <>
                  <div className="rounded-lg border bg-muted/40 p-4 text-sm space-y-2">
                    <p className="font-medium">📌 Petunjuk:</p>
                    <ul className="list-disc ml-5 text-muted-foreground">
                      <li>
                        Durasi pengerjaan adalah 10 menit. Jika waktu habis,
                        jawaban tidak dapat dikirim.
                      </li>
                      <li>
                        Jika terdapat satu quiz yang sedang aktif, Kamu tidak
                        dapat memulai quiz lain.
                      </li>
                      <li>
                        Untuk melanjutkan quiz yang sedang aktif, silakan pilih
                        quiz apa saja. Sistem akan otomatis melanjutkan ke quiz
                        tersebut.
                      </li>
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setOpenStartDialog(true)}
                  >
                    Mulai Quiz
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <ModalCustom
        title="Mulai Quiz"
        open={openStartDialog}
        onOpenChange={setOpenStartDialog}
      >
        <div className="">
          <p>
            Apakah Anda yakin ingin memulai quiz &quot;{selectedSubtest?.name}
            &quot;?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenStartDialog(false)}>
              Batal
            </Button>

            <Button
              onClick={() => {
                if (!selectedSubtest) return;
                handleStartQuiz(selectedSubtest.id);
              }}
              disabled={startingQuizId === selectedSubtest?.id}
            >
              {startingQuizId === selectedSubtest?.id ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Memulai...
                </span>
              ) : (
                "Mulai"
              )}
            </Button>
          </div>
        </div>
      </ModalCustom>
    </div>
  );
};
