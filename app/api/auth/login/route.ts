import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${config.env.apiUrl}/auth/login`, {
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
          error: data.message || "Login gagal",
          status: res.status,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(
      {
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Proxy login error:", error);

    return NextResponse.json({ error: "Proxy login error" }, { status: 500 });
  }
}
