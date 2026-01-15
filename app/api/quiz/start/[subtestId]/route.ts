import { config } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ subtestId: string }> }
) {
  try {
    const { subtestId } = await context.params;
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${config.env.apiUrl}/quiz/start/${subtestId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Proxy start quiz error" },
      { status: 500 }
    );
  }
}
