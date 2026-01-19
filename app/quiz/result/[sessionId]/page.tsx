import { ResultQuiz } from "@/components/quiz/resultQuiz";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export const metadata: Metadata = {
  title: "Quiz Result",
};

const Page = async ({ params }: PageProps) => {
  const { sessionId } = await params;

  return <ResultQuiz sessionId={sessionId} />;
};

export default Page;
