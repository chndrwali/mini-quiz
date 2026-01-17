import { NextResponse } from "next/server";
import { config } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${config.env.apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: authHeader ?? "",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Proxy logout error" }, { status: 500 });
  }
}
