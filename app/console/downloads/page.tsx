import { ConsoleShell, DbError, Table } from "@/components/console/ConsoleShell";
import { listDownloads } from "@/lib/console/console-data";
import { when } from "@/lib/console/format";
import Link from "next/link";


export const dynamic = "force-dynamic";

export default async function OpsDownloads({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, parseInt((await searchParams).page ?? "1") || 1);
  let res: Awaited<ReturnType<typeof listDownloads>> | null = null, error: unknown;
  try { res = await listDownloads(page); } catch (e) { error = e; }
  return (
    <ConsoleShell title="Bible downloads">
      {!res ? <DbError error={error} /> : <>
        <Table head={["Date", "Bible", "Type", "Buyer", "Country", "Browser"]}>
          {res.rows.map((r:any, i:any) => <tr key={i}>
            <td className="whitespace-nowrap p-3 text-muted">{when(r.created_at as string)}</td><td className="p-3 text-fg">{String(r.bible_code)}</td><td className="p-3">{String(r.kind)}</td>
            <td className="p-3">{r.email ? String(r.email) : "—"}</td><td className="p-3">{r.country ? String(r.country) : "—"}</td><td className="max-w-xs truncate p-3 text-xs text-muted">{r.user_agent ? String(r.user_agent) : "—"}</td></tr>)}
          {!res.rows.length && <tr><td className="p-3 text-muted" colSpan={6}>No downloads yet.</td></tr>}
        </Table>
        <div className="mt-5 flex justify-between text-sm">{page > 1 ? <Link href={`/ops/downloads?page=${page - 1}`} className="text-glow">← Newer</Link> : <span />}{res.more && <Link href={`/ops/downloads?page=${page + 1}`} className="text-glow">Older →</Link>}</div></>}
    </ConsoleShell>);
}