import { NextResponse } from "next/server";
import { findBible, koboFor } from "@/content/bibles";
import { createOrder } from "@/lib/console/orders";
import { initializeTransaction } from "@/lib/console/paystack";
import { publicOrigin } from "@/lib/console/url";


export const dynamic = "force-dynamic";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { code?: unknown; email?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const bible = findBible(code);
  if (!bible || bible.priceNgn <= 0) return NextResponse.json({ error: "This translation is not available for purchase." }, { status: 400 });
  if (!EMAIL.test(email) || email.length > 200) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  try {
    // Price always comes from the server-side catalogue, never from the browser.
    const reference = await createOrder(bible, email);
    const { url } = await initializeTransaction({
      email, amountKobo: koboFor(bible), reference,
      callbackUrl: `${publicOrigin(req)}/media/bible/order`,
      metadata: { bible_code: bible.code, bible_name: bible.name },
    });
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[checkout]", e instanceof Error ? e.message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted]") : e);
    return NextResponse.json({ error: "We could not start the payment. Please try again." }, { status: 503 });
  }
}