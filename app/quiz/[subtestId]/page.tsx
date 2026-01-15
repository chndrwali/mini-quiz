import { QuizId } from "@/components/quiz/quizId";

interface PageProps {
  params: Promise<{ subtestId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { subtestId } = await params;

  return <QuizId subtestId={subtestId} />;
};

export default Page;
