"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

interface ErrorListQuizProps {
  error: string;
}

export const ErrorListQuiz = ({ error }: ErrorListQuizProps) => {
  const router = useRouter();

  return (
    <Empty className="border-destructive/20 bg-destructive/5">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-destructive/10">
          <AlertTriangle className="size-6 text-destructive" />
        </EmptyMedia>
        <EmptyTitle className="text-destructive">Gagal Memuat Quiz</EmptyTitle>
        <EmptyDescription>{error}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={() => router.refresh()} className="w-full">
          Coba Lagi
        </Button>
      </EmptyContent>
    </Empty>
  );
};
