import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") ?? "10";
    const offset = searchParams.get("offset") ?? "0";

    const res = await fetch(
      `${config.env.apiUrl}/quiz/history?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader || "",
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Proxy quiz history error" },
      { status: 500 }
    );
  }
}
