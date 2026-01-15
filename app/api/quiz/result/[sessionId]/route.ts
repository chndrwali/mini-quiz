import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params;
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${config.env.apiUrl}/quiz/result/${sessionId}`, {
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
      { error: "Proxy quiz result error" },
      { status: 500 }
    );
  }
}
