import { db } from "./db";

type Row = Record<string, unknown>;
const num = (v: unknown) => Number(v ?? 0);

export async function getOverview() {
  const sql = await db();
  const [o] = await sql`SELECT
      count(*) FILTER (WHERE status = 'paid')::int AS paid,
      count(*) FILTER (WHERE status = 'pending')::int AS pending,
      count(*) FILTER (WHERE status = 'failed')::int AS failed,
      COALESCE(sum(amount_kobo) FILTER (WHERE status = 'paid'), 0)::bigint AS revenue,
      COALESCE(sum(amount_kobo) FILTER (WHERE status = 'paid' AND paid_at > now() - interval '30 days'), 0)::bigint AS revenue30,
      count(DISTINCT email) FILTER (WHERE status = 'paid')::int AS buyers
    FROM bible_orders`;
  const [d] = await sql`SELECT count(*)::int AS total,
      count(*) FILTER (WHERE kind = 'paid')::int AS paid,
      count(*) FILTER (WHERE kind = 'free')::int AS free,
      count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS week
    FROM bible_downloads`;
  const top = await sql`SELECT bible_code, bible_name, count(*)::int AS sales, sum(amount_kobo)::bigint AS revenue
    FROM bible_orders WHERE status = 'paid' GROUP BY 1, 2 ORDER BY sales DESC LIMIT 8`;
  const popular = await sql`SELECT bible_code, count(*)::int AS downloads FROM bible_downloads GROUP BY 1 ORDER BY 2 DESC LIMIT 8`;
  let installers: Row[] = [];
  try { // table is created by the installer click tracker
    installers = await sql`SELECT platform, count(*)::int AS total, count(*) FILTER (WHERE clicked_at > now() - interval '7 days')::int AS week
      FROM kelzstudio_download_clicks GROUP BY 1 ORDER BY 2 DESC`;
  } catch { /* not created yet */ }
  return {
    orders: { paid: num(o.paid), pending: num(o.pending), failed: num(o.failed), revenue: num(o.revenue), revenue30: num(o.revenue30), buyers: num(o.buyers) },
    downloads: { total: num(d.total), paid: num(d.paid), free: num(d.free), week: num(d.week) },
    top: top as Row[], popular: popular as Row[], installers,
  };
}

export const PAGE_SIZE = 25;

export async function listOrders(o: { status?: string; q?: string; page: number }) {
  const sql = await db();
  const status = ["pending", "paid", "failed"].includes(o.status ?? "") ? o.status! : null;
  const q = o.q?.trim() ? `%${o.q.trim()}%` : null;
  const offset = (o.page - 1) * PAGE_SIZE;
  const rows = await sql`SELECT o.reference, o.bible_code, o.bible_name, o.email, o.amount_kobo, o.status, o.channel, o.paid_at, o.created_at,
      (SELECT count(*)::int FROM bible_downloads d WHERE d.order_id = o.id) AS downloads, o.max_downloads
    FROM bible_orders o
    WHERE (${status}::text IS NULL OR o.status = ${status})
      AND (${q}::text IS NULL OR o.email ILIKE ${q} OR o.reference ILIKE ${q} OR o.bible_code ILIKE ${q})
    ORDER BY o.created_at DESC LIMIT ${PAGE_SIZE + 1} OFFSET ${offset}`;
  return { rows: rows.slice(0, PAGE_SIZE) as Row[], more: rows.length > PAGE_SIZE };
}

export async function listDownloads(page: number) {
  const sql = await db();
  const offset = (page - 1) * PAGE_SIZE;
  const rows = await sql`SELECT d.created_at, d.bible_code, d.kind, d.country, d.user_agent, o.email
    FROM bible_downloads d LEFT JOIN bible_orders o ON o.id = d.order_id
    ORDER BY d.created_at DESC LIMIT ${PAGE_SIZE + 1} OFFSET ${offset}`;
  return { rows: rows.slice(0, PAGE_SIZE) as Row[], more: rows.length > PAGE_SIZE };
}