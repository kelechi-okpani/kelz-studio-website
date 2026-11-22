import { NextResponse } from "next/server";
import { findBible } from "@/content/bibles";
import { getOrder, recordDownload } from "@/lib/console/orders";
import { signedFileUrl } from "@/lib/console/r2";
// import { getOrder, recordDownload } from "@/lib/orders";
// import { signedFileUrl } from "@/lib/r2";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  try {
    const order = token.length >= 32 ? await getOrder({ token }) : null;
    const bible = order && findBible(order.bible_code);
    if (!order || order.status !== "paid" || !bible) return NextResponse.json({ error: "Download link not found." }, { status: 404 });
    const allowed = await recordDownload({ order, bibleCode: bible.code, country: req.headers.get("x-vercel-ip-country"), userAgent: req.headers.get("user-agent") });
    if (!allowed) return NextResponse.json({ error: "This purchase has reached its download limit. Please contact support." }, { status: 403 });
    const ext = bible.file.split(".").pop() ?? "zip";
    const url = await signedFileUrl(bible.file, `${bible.code}-KelzStudio-Bible.${ext}`);
    return NextResponse.redirect(url, { status: 302, headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[download]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "The download is unavailable right now. Please try again." }, { status: 503 });
  }
}