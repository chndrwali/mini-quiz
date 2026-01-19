import { ListQuiz } from "@/components/quiz/listQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
  return <ListQuiz />;
};

export default Page;
