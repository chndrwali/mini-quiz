"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export const ErrorListQuiz = ({
  error,
  onRetry,
}: {
  error?: string;
  onRetry?: () => void;
}) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Terjadi Kesalahan
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {error ??
            "Gagal memuat daftar quiz. Silakan coba beberapa saat lagi."}
        </p>

        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
