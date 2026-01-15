interface ErrorActiveQuizProps {
  error: string;
  resetError: () => void;
}

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const ErrorActiveQuiz = ({
  error,
  resetError,
}: ErrorActiveQuizProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">Terjadi Kesalahan</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertDescription>
          Gagal memuat quiz. Silakan kembali ke dashboard dan coba lagi.
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={resetError}
        >
          <ArrowLeft className="size-4 mr-2" />
          Kembali
        </Button>
      </div>
    </div>
  );
};
