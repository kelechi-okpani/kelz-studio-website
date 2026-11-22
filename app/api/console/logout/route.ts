import { SESSION_COOKIE } from "@/lib/console/console-auth";
import { publicOrigin } from "@/lib/console/url";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/ops/login", publicOrigin(req)), 303);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}