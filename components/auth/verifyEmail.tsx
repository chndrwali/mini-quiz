"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "../ui/spinner";

export const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const missingToken = !token;

  useEffect(() => {
    if (missingToken) return;

    const verify = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      } catch {
        setError("Verifikasi gagal atau token expired.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [missingToken, token]);

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle>Verifikasi Email</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner />
            <p>Memverifikasi akun...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <>
            <p className="text-muted-foreground text-sm">
              Email berhasil diverifikasi. Silakan login.
            </p>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
