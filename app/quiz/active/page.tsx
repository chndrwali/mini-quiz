import ProtectedRoute from "@/components/layout/protectedRoute";
import { ActiveQuiz } from "@/components/quiz/activeQuiz";

export const metadata = {
  title: "Active Quiz",
};

const Page = () => {
  return (
    <ProtectedRoute>
      <ActiveQuiz />
    </ProtectedRoute>
  );
};

export default Page;
