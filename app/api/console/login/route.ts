import { createSession, safeEqual, SESSION_SECONDS, SESSION_COOKIE } from "@/lib/console/console-auth";
import { publicOrigin } from "@/lib/console/url";
import { NextResponse } from "next/server";
// import { publicOrigin } from "@/lib/url";
// import { SESSION_COOKIE, SESSION_SECONDS, createSession, safeEqual } from "@/lib/console-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const password = process.env.CONSOLE_PASSWORD, secret = process.env.CONSOLE_SESSION_SECRET;
  if (!password || !secret) return new NextResponse("Console is not configured.", { status: 503 });
  const form = await req.formData().catch(() => null);
  const given = String(form?.get("password") ?? "");
  if (!safeEqual(given, password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return NextResponse.redirect(new URL("/console/login?error=1", publicOrigin(req)), 303);
  }
  const res = NextResponse.redirect(new URL("/console", publicOrigin(req)), 303);
  res.cookies.set(SESSION_COOKIE, await createSession(secret), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_SECONDS });
  return res;
}