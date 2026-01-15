import { formatTime } from "@/lib/utils";

interface QuizTimerProps {
  remaining: number;
  timerColor: string;
}

export const QuizTimer = ({ remaining, timerColor }: QuizTimerProps) => {
  return (
    <div className="text-sm">
      Sisa waktu:
      <div className={`font-bold text-lg ${timerColor}`}>
        {formatTime(remaining)}
      </div>
    </div>
  );
};
