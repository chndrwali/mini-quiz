import { Navbar } from "@/components/layout/navbar";
import ProtectedRoute from "@/components/layout/protectedRoute";
import { HistoryQuiz } from "@/components/quiz/historyQuiz";

const Page = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <HistoryQuiz />
    </ProtectedRoute>
  );
};

export default Page;
