import { QuizId } from "@/components/quiz/quizId";

interface PageProps {
  params: Promise<{ activeId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { activeId } = await params;

  return <QuizId subtestId={activeId} />;
};

export default Page;
