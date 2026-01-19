import { HistoryQuiz } from "@/components/quiz/historyQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
};

const Page = () => {
  return <HistoryQuiz />;
};

export default Page;
