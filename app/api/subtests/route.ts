import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${config.env.apiUrl}/subtests`, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Proxy subtests error" },
      { status: 500 }
    );
  }
}
