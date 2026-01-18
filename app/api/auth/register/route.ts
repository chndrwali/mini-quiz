import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${config.env.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: data.message || "Registrasi gagal",
          status: res.status,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(
      {
        message: "Registrasi berhasil, silakan cek email untuk verifikasi",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER PROXY ERROR:", error);

    return NextResponse.json(
      { error: "Proxy register error" },
      { status: 500 },
    );
  }
}
