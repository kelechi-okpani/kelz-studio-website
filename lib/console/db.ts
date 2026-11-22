import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;
let ready: Promise<void> | undefined;

/** Returns the Neon query function, creating the store tables on first use. */
export async function db() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error("DATABASE_URL is not configured.");
  client ??= neon(url);
  const sql = client;
  ready ??= (async () => {
    await sql`CREATE TABLE IF NOT EXISTS bible_orders (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      reference text UNIQUE NOT NULL,
      bible_code text NOT NULL,
      bible_name text NOT NULL,
      email text NOT NULL,
      amount_kobo integer NOT NULL,
      currency text NOT NULL DEFAULT 'NGN',
      status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
      paystack_id text,
      channel text,
      paid_at timestamptz,
      download_token text UNIQUE,
      max_downloads integer NOT NULL DEFAULT 5,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
    await sql`CREATE INDEX IF NOT EXISTS bible_orders_status_idx ON bible_orders (status, created_at DESC)`;
    await sql`CREATE TABLE IF NOT EXISTS bible_downloads (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      order_id uuid REFERENCES bible_orders(id) ON DELETE SET NULL,
      bible_code text NOT NULL,
      kind text NOT NULL CHECK (kind IN ('paid','free')),
      country text,
      user_agent text,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
    await sql`CREATE INDEX IF NOT EXISTS bible_downloads_created_idx ON bible_downloads (created_at DESC)`;
    await sql`CREATE TABLE IF NOT EXISTS paystack_events (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      event text NOT NULL,
      reference text,
      payload jsonb NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
  })().catch((e) => { ready = undefined; throw e; });
  await ready;
  return sql;
}