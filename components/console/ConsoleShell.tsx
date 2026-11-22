import Link from "next/link";

const links = [{ href: "/console", label: "Overview" }, { href: "/console/orders", label: "Orders" }, { href: "/console/downloads", label: "Downloads" }];

export function ConsoleShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-6"><span className="font-semibold text-fg">KelzStudio Console</span>
          <nav className="flex gap-4 text-sm">{links.map((l) => <Link key={l.href} href={l.href} className="text-muted hover:text-fg">{l.label}</Link>)}</nav></div>
        <form action="/api/console/logout" method="post"><button className="btn-ghost !px-4 !py-2 text-sm">Sign out</button></form>
      </header>
      <h1 className="mt-8 text-2xl font-semibold text-fg">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>);
}

export function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <div className="rounded-xl border border-line bg-surface p-5"><p className="text-xs text-muted">{label}</p><p className="mt-1 text-2xl font-semibold tabular-nums text-fg">{value}</p>{hint && <p className="mt-1 text-xs text-muted">{hint}</p>}</div>;
}

export function DbError({ error }: { error: unknown }) {
  const msg = error instanceof Error ? error.message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted]") : "Unknown error";
  return <div role="alert" className="rounded-xl border border-line bg-surface p-6 text-sm text-muted"><p className="font-medium text-fg">Could not load data.</p><p className="mt-1">{msg}</p></div>;
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return <div className="overflow-x-auto rounded-xl border border-line"><table className="w-full text-left text-sm"><thead className="bg-surface2 text-muted"><tr>{head.map((h) => <th key={h} className="whitespace-nowrap p-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y divide-line">{children}</tbody></table></div>;
}