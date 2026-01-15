import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("REGISTER BODY:", body);

    const res = await fetch(
      "https://apiquiz.ambisiusacademy.com/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    console.log("BACKEND RESPONSE:", data);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
