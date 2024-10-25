// app/api/verifyKey/route.ts

import { NextResponse } from "next/server";
import { serialize } from "cookie";

const ADMIN_KEY = process.env.ADMIN_KEY;

export async function POST(req: Request) {
  try {
    const { adminKey } = await req.json();

    if (adminKey === ADMIN_KEY) {
      const cookie = serialize("auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      const response = NextResponse.json({ success: true });
      response.headers.append("Set-Cookie", cookie);
      return response;
    } else {
      return NextResponse.json({ error: "Invalid key" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" + error },
      { status: 500 }
    );
  }
}
