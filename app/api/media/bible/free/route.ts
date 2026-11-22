import { NextResponse } from "next/server";
import { findBible } from "@/content/bibles";
import { recordDownload } from "@/lib/console/orders";
import { signedFileUrl } from "@/lib/console/r2";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const bible = findBible(new URL(req.url).searchParams.get("code") ?? "");
  if (!bible || bible.priceNgn > 0) return NextResponse.json({ error: "Not found." }, { status: 404 });
  try {
    await recordDownload({ bibleCode: bible.code, country: req.headers.get("x-vercel-ip-country"), userAgent: req.headers.get("user-agent") });
    const ext = bible.file.split(".").pop() ?? "zip";
    const url = await signedFileUrl(bible.file, `${bible.code}-KelzStudio-Bible.${ext}`);
    return NextResponse.redirect(url, { status: 302, headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[free-download]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "The download is unavailable right now. Please try again." }, { status: 503 });
  }
}