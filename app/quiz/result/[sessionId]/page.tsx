import { ResultQuiz } from "@/components/quiz/resultQuiz";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { sessionId } = await params;

  return <ResultQuiz sessionId={sessionId} />;
};

export default Page;
