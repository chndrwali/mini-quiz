import { QuizId } from "@/components/quiz/quizId";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ activeId: string }>;
}

export const metadata: Metadata = {
  title: "Active Quiz",
};

const Page = async ({ params }: PageProps) => {
  const { activeId } = await params;

  return <QuizId subtestId={activeId} />;
};

export default Page;
