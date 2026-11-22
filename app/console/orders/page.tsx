import { ConsoleShell, DbError, Table } from "@/components/console/ConsoleShell";
import { listOrders } from "@/lib/console/console-data";
import { nairaFromKobo, when } from "@/lib/console/format";
import { Link } from "lucide-react";

export const dynamic = "force-dynamic";
const badge: Record<string, string> = { paid: "bg-glow/15 text-glow", pending: "bg-surface2 text-muted", failed: "bg-red-500/15 text-red-600 dark:text-red-400" };

export default async function OpsOrders({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1") || 1);
  let res: Awaited<ReturnType<typeof listOrders>> | null = null, error: unknown;
  try { res = await listOrders({ status: sp.status, q: sp.q, page }); } catch (e) { error = e; }
  const href = (p: Record<string, string | undefined>) => { const q = new URLSearchParams(); Object.entries({ status: sp.status, q: sp.q, ...p }).forEach(([k, v]) => v && q.set(k, v)); return `/ops/orders?${q}`; };
  return (
    <ConsoleShell title="Orders">
      <form className="mb-5 flex flex-wrap gap-3"><input name="q" defaultValue={sp.q} placeholder="Search email, reference or Bible" className="min-w-64 flex-1 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-fg" />
        <select name="status" defaultValue={sp.status ?? ""} className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-fg"><option value="">All statuses</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option></select>
        <button className="btn-primary !px-4 !py-2.5 text-sm">Filter</button></form>
      {!res ? <DbError error={error} /> : <>
        <Table head={["Date", "Reference", "Bible", "Email", "Amount", "Status", "Downloads"]}>
          {res.rows.map((r:any) => <tr key={String(r.reference)}>
            <td className="whitespace-nowrap p-3 text-muted">{when(r.created_at as string)}</td><td className="p-3 font-mono text-xs text-fg">{String(r.reference)}</td>
            <td className="p-3 text-fg">{String(r.bible_code)}</td><td className="p-3">{String(r.email)}</td><td className="whitespace-nowrap p-3">{nairaFromKobo(Number(r.amount_kobo))}</td>
            <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-xs ${badge[String(r.status)]}`}>{String(r.status)}</span></td>
            <td className="p-3">{Number(r.downloads)} / {Number(r.max_downloads)}</td></tr>)}
          {!res.rows.length && <tr><td className="p-3 text-muted" colSpan={7}>No orders found.</td></tr>}
        </Table>
        <div className="mt-5 flex justify-between text-sm">{page > 1 ? <Link href={href({ page: String(page - 1) })} className="text-glow">← Newer</Link> : <span />}{res.more && <Link href={href({ page: String(page + 1) })} className="text-glow">Older →</Link>}</div></>}
    </ConsoleShell>);
}