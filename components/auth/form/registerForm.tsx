"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/passwordInput";
import { toast } from "sonner";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const RegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    if (loading) return;

    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json;

      console.log(data);

      if (!res.ok) {
        toast.error("Registrasi gagal. Silakan coba lagi.");
        setSuccess(false);
        return;
      }

      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("REGISTER ERROR:", err.response?.data || err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Registrasi gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <CardTitle>Cek Email Kamu 📩</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Link verifikasi sudah dikirim ke email kamu. Silakan verifikasi
            sebelum login.
          </p>
          <p className="text-xs text-muted-foreground">
            Tidak menerima email? Cek folder spam.
          </p>

          <Button onClick={() => router.push("/login")}>
            Ke Halaman Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <TextGenerateEffect
          words="Daftar Akun"
          className="text-2xl font-bold text-center"
        />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <Alert variant="destructive" role="alert" aria-live="assertive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama Lengkap Anda"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email Aktif"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
              required
              showStrength
              showRules
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Daftar"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Sudah punya akun?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-primary cursor-pointer hover:underline"
            >
              Masuk
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
