import { db } from "@/lib/console/db";
import { fulfil } from "@/lib/console/orders";
import { validWebhookSignature } from "@/lib/console/paystack";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

// Set this URL in your Paystack dashboard: https://YOUR-DOMAIN/api/paystack/webhook
export async function POST(req: Request) {
  const raw = await req.text();
  try {
    if (!validWebhookSignature(raw, req.headers.get("x-paystack-signature"))) return new NextResponse("Invalid signature", { status: 401 });
    const event = JSON.parse(raw) as { event?: string; data?: { reference?: string } };
    const reference = event.data?.reference ?? null;
    const sql = await db();
    await sql`INSERT INTO paystack_events (event, reference, payload) VALUES (${event.event ?? "unknown"}, ${reference}, ${raw}::jsonb)`;
    if (event.event === "charge.success" && reference) await fulfil(reference); // re-verifies with Paystack before marking paid
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[webhook]", e instanceof Error ? e.message : e);
    return new NextResponse("Error", { status: 500 }); // Paystack retries on non-2xx
  }
}