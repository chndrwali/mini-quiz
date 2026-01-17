"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Spinner } from "@/components/ui/spinner";
import { Navbar } from "./navbar";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const isValidToken = token && token !== "undefined";

  useEffect(() => {
    if (!isValidToken) {
      router.replace("/login");
    }
  }, [router, isValidToken]);

  if (!isValidToken) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-muted opacity-30"></div>
              <Spinner className="size-8 text-primary" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-lg font-semibold">Verifikasi Akses</h2>
              <p className="text-sm text-muted-foreground">Mohon tunggu...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
