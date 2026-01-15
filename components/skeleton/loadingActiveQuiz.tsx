import { Spinner } from "../ui/spinner";

interface LoadingActiveQuizProps {
  title: string;
  desc: string;
}

export const LoadingActiveQuiz = ({ title, desc }: LoadingActiveQuizProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-muted opacity-30"></div>
          <Spinner className="size-8 text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1 bg-accent rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
