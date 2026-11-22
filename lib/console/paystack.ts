import { createHmac, timingSafeEqual } from "node:crypto";

const API = "https://api.paystack.co";
const secret = () => {
  const k = process.env.PAYSTACK_SECRET_KEY?.trim();
  if (!k) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  return k;
};

export async function initializeTransaction(p: { email: string; amountKobo: number; reference: string; callbackUrl: string; metadata: Record<string, string> }) {
  const res = await fetch(`${API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: p.email, amount: p.amountKobo, currency: "NGN", reference: p.reference, callback_url: p.callbackUrl, metadata: p.metadata }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.status || !json.data?.authorization_url) throw new Error(`Paystack initialize failed: ${json?.message ?? res.status}`);
  return { url: json.data.authorization_url as string };
}

export interface VerifiedTransaction { status: string; amount: number; currency: string; id: number; channel: string | null; paidAt: string | null }
export async function verifyTransaction(reference: string): Promise<VerifiedTransaction> {
  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${secret()}` }, cache: "no-store" });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.data) throw new Error(`Paystack verify failed: ${json?.message ?? res.status}`);
  const d = json.data;
  return { status: d.status, amount: d.amount, currency: d.currency, id: d.id, channel: d.channel ?? null, paidAt: d.paid_at ?? null };
}

/** Paystack signs webhook bodies with HMAC-SHA512 using your secret key. */
export function validWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha512", secret()).update(rawBody).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}