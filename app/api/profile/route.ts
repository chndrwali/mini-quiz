import { NextResponse } from "next/server";
import { config } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${config.env.apiUrl}/auth/profile`, {
      headers: {
        Authorization: authHeader ?? "",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Proxy get profile error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(`${config.env.apiUrl}/auth/profile`, {
      method: "PUT",
      headers: {
        Authorization: authHeader ?? "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Proxy update profile error" },
      { status: 500 }
    );
  }
}
