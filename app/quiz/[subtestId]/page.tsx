import { QuizId } from "@/components/quiz/quizId";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ subtestId: string }>;
}

export const metadata: Metadata = {
  title: "Quiz",
};

const Page = async ({ params }: PageProps) => {
  const { subtestId } = await params;

  return <QuizId subtestId={subtestId} />;
};

export default Page;
