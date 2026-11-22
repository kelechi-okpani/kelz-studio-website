import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "./lib/console/console-auth";
import { publicOrigin } from "./lib/console/url";


const CONSOLE_HOST = (process.env.CONSOLE_HOST ?? "console.kelzstudio.com").toLowerCase();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const onConsole = host === CONSOLE_HOST;
  const dev = process.env.NODE_ENV !== "production";

  // console.kelzstudio.com/anything  ->  /console/anything (behind the scenes)
  const isconsole = pathname === "/console" || pathname.startsWith("/console/");
  const isApi = pathname.startsWith("/api/");
  const target = onConsole && !isconsole && !isApi ? `/console${pathname === "/" ? "" : pathname}` : pathname;
  const consoleTarget = target === "/console" || target.startsWith("/console/") || target.startsWith("/api/console/");

  if (!consoleTarget) return NextResponse.next();

  // The console only exists on its own subdomain in production.
  if (!onConsole && !dev) return new NextResponse("Not found", { status: 404 });

  const open = target === "/console/login" || target === "/api/console/login";
  if (!open) {
    const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value, process.env.CONSOLE_SESSION_SECRET);
    if (!ok) {
      if (target.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      return NextResponse.redirect(new URL("/console/login", publicOrigin(req)));
    }
  }

  const res = target !== pathname ? NextResponse.rewrite(new URL(target, req.url)) : NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|woff2?)$).*)"] };