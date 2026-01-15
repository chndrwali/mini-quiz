import ProtectedRoute from "@/components/layout/protectedRoute";
import { ActiveQuiz } from "@/components/quiz/activeQuiz";

const Page = () => {
  return (
    <ProtectedRoute>
      <ActiveQuiz />
    </ProtectedRoute>
  );
};

export default Page;
