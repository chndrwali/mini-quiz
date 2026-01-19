import { RegisterForm } from "@/components/auth/form/registerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const Page = () => {
  return <RegisterForm />;
};

export default Page;
