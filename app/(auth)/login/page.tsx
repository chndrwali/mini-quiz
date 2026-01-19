import { LoginForm } from "@/components/auth/form/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return <LoginForm />;
};

export default Page;
