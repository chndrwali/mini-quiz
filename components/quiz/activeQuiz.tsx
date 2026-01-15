"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

import { useActiveQuizStore } from "@/store/subtest.store";
import { LoadingActiveQuiz } from "@/components/skeleton/loadingActiveQuiz";
import { ErrorActiveQuiz } from "@/components/skeleton/errorActiveQuiz";

export const ActiveQuiz = () => {
  const router = useRouter();
  const { loading, error, fetchActiveQuiz, resetError } = useActiveQuizStore();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadActiveQuiz = async () => {
      const result = await fetchActiveQuiz(token);

      if (!result) {
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
        return;
      }

      router.replace(`/quiz/active/${result.session_id}`);
    };

    loadActiveQuiz();
  }, [router, fetchActiveQuiz]);

  const handleReset = () => {
    resetError();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        {loading && !error && (
          <LoadingActiveQuiz
            desc="Memuat sesi quiz yang aktif"
            title="Melanjutkan Quiz"
          />
        )}

        {error && <ErrorActiveQuiz error={error} resetError={handleReset} />}

        {!loading && !error && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Spinner className="size-8 text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-lg font-semibold">Mengalihkan...</h2>
                <p className="text-sm text-muted-foreground">
                  Membawa Anda ke quiz...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
