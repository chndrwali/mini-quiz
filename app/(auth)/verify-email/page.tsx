import { Suspense } from "react";
import { VerifyEmail } from "@/components/auth/verifyEmail";
import { Spinner } from "@/components/ui/spinner";

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
