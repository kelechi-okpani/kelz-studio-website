import { randomBytes } from "node:crypto";
import { db } from "./db";
import { verifyTransaction } from "./paystack";
import { koboFor, type BiblePlugin } from "@/content/bibles";

export interface Order {
  id: string; reference: string; bible_code: string; bible_name: string; email: string;
  amount_kobo: number; currency: string; status: "pending" | "paid" | "failed";
  paid_at: string | null; download_token: string | null; max_downloads: number; created_at: string; downloads: number;
}

export const newReference = () => `KB-${randomBytes(9).toString("hex")}`;

export async function createOrder(bible: BiblePlugin, email: string) {
  const sql = await db();
  const reference = newReference();
  await sql`INSERT INTO bible_orders (reference, bible_code, bible_name, email, amount_kobo)
            VALUES (${reference}, ${bible.code}, ${bible.name}, ${email}, ${koboFor(bible)})`;
  return reference;
}

export async function getOrder(by: { reference?: string; token?: string }): Promise<Order | null> {
  const sql = await db();
  const rows = by.token
    ? await sql`SELECT o.*, (SELECT count(*)::int FROM bible_downloads d WHERE d.order_id = o.id) AS downloads FROM bible_orders o WHERE o.download_token = ${by.token} LIMIT 1`
    : await sql`SELECT o.*, (SELECT count(*)::int FROM bible_downloads d WHERE d.order_id = o.id) AS downloads FROM bible_orders o WHERE o.reference = ${by.reference ?? ""} LIMIT 1`;
  return (rows[0] as unknown as Order) ?? null;
}

/** Confirms a payment with Paystack (never trusting the browser) and marks the order paid. Safe to call repeatedly. */
export async function fulfil(reference: string): Promise<Order | null> {
  const order = await getOrder({ reference });
  if (!order || order.status === "paid") return order;
  const sql = await db();
  const v = await verifyTransaction(reference);
  if (v.status === "success" && v.amount === order.amount_kobo && v.currency === order.currency) {
    const token = randomBytes(24).toString("hex");
    await sql`UPDATE bible_orders
              SET status = 'paid', paid_at = COALESCE(${v.paidAt}::timestamptz, now()), paystack_id = ${String(v.id)},
                  channel = ${v.channel}, download_token = COALESCE(download_token, ${token})
              WHERE reference = ${reference} AND status <> 'paid'`;
  } else if (v.status === "failed") {
    await sql`UPDATE bible_orders SET status = 'failed' WHERE reference = ${reference} AND status = 'pending'`;
  }
  return getOrder({ reference });
}

/** Records a download. For paid orders it atomically enforces the download limit. Returns false if not allowed. */
export async function recordDownload(opts: { order?: Order; bibleCode: string; country: string | null; userAgent: string | null }) {
  const sql = await db();
  const ua = opts.userAgent?.slice(0, 300) ?? null;
  if (opts.order) {
    const rows = await sql`INSERT INTO bible_downloads (order_id, bible_code, kind, country, user_agent)
      SELECT o.id, o.bible_code, 'paid', ${opts.country}::text, ${ua}::text FROM bible_orders o
      WHERE o.id = ${opts.order.id}::uuid AND o.status = 'paid'
        AND (SELECT count(*) FROM bible_downloads d WHERE d.order_id = o.id) < o.max_downloads
      RETURNING id`;
    return rows.length > 0;
  }
  await sql`INSERT INTO bible_downloads (bible_code, kind, country, user_agent) VALUES (${opts.bibleCode}, 'free', ${opts.country}, ${ua})`;
  return true;
}