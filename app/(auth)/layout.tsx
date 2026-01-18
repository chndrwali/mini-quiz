import { ColourfulText } from "@/components/ui/colourfull-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";

const words = `Uji pengetahuan kamu dengan quiz interaktif. Login atau daftar untuk mulai mengerjakan quiz dan lihat progress kamu.`;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:flex flex-col justify-center px-12 text-white overflow-hidden">
        <Image
          src="/auth-illustration.png"
          alt="Auth background"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-primary/70" />
        {/* OVERLAY */}

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            <ColourfulText text="Mini Quiz App" />
          </h1>

          <TextGenerateEffect words={words} />
        </div>
      </div>

      <div className="flex items-center justify-center bg-muted px-4">
        {children}
      </div>
    </div>
  );
}
