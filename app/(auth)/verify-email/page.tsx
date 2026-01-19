import { Suspense } from "react";
import { VerifyEmail } from "@/components/auth/verifyEmail";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;
