import { ConsoleShell, DbError, Stat, Table } from "@/components/console/ConsoleShell";
import { getOverview } from "@/lib/console/console-data";
import { nairaFromKobo } from "@/lib/console/format";

export const dynamic = "force-dynamic";

export default async function OpsOverview() {
  let data: Awaited<ReturnType<typeof getOverview>> | null = null, error: unknown;
  try { data = await getOverview(); } catch (e) { error = e; }
  return (
    <ConsoleShell title="Overview">
      {!data ? <DbError error={error} /> : <>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Revenue (all time)" value={nairaFromKobo(data.orders.revenue)} hint={`${nairaFromKobo(data.orders.revenue30)} in the last 30 days`} />
          <Stat label="Paid orders" value={data.orders.paid} hint={`${data.orders.buyers} buyers`} />
          <Stat label="Pending / failed" value={`${data.orders.pending} / ${data.orders.failed}`} />
          <Stat label="Bible downloads" value={data.downloads.total} hint={`${data.downloads.paid} paid · ${data.downloads.free} free · ${data.downloads.week} this week`} />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section><h2 className="mb-3 font-semibold text-fg">Top sellers</h2>
            <Table head={["Bible", "Sales", "Revenue"]}>{data.top.map((r) => <tr key={String(r.bible_code)}><td className="p-3 text-fg">{String(r.bible_code)} <span className="text-muted">{String(r.bible_name)}</span></td><td className="p-3">{Number(r.sales)}</td><td className="p-3">{nairaFromKobo(Number(r.revenue))}</td></tr>)}{!data.top.length && <tr><td className="p-3 text-muted" colSpan={3}>No sales yet.</td></tr>}</Table></section>
          <section><h2 className="mb-3 font-semibold text-fg">Most downloaded</h2>
            <Table head={["Bible", "Downloads"]}>{data.popular.map((r) => <tr key={String(r.bible_code)}><td className="p-3 text-fg">{String(r.bible_code)}</td><td className="p-3">{Number(r.downloads)}</td></tr>)}{!data.popular.length && <tr><td className="p-3 text-muted" colSpan={2}>No downloads yet.</td></tr>}</Table></section>
        </div>
        <section className="mt-10"><h2 className="mb-3 font-semibold text-fg">Installer download clicks</h2>
          <Table head={["Platform", "All time", "Last 7 days"]}>{data.installers.map((r) => <tr key={String(r.platform)}><td className="p-3 text-fg">{String(r.platform)}</td><td className="p-3">{Number(r.total)}</td><td className="p-3">{Number(r.week)}</td></tr>)}{!data.installers.length && <tr><td className="p-3 text-muted" colSpan={3}>No clicks recorded yet.</td></tr>}</Table></section>
      </>}
    </ConsoleShell>);
}