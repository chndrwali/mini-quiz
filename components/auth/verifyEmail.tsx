"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Token verifikasi tidak ditemukan.");
      setLoading(false);
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setLoading(false);
      })
      .catch(() => {
        setError("Verifikasi gagal atau token expired.");
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Verifikasi Email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading && <p>Memverifikasi akun...</p>}

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
    </div>
  );
};
