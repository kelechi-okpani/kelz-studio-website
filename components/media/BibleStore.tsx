"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Download, Search, X } from "lucide-react";
import { naira } from "@/lib/console/format";
// import { naira } from "@/lib/format";

export interface StoreBible { code: string; name: string; language: string; priceNgn: number; copyright: string }

export function BibleStore({ bibles }: { bibles: StoreBible[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const [buying, setBuying] = useState<StoreBible | null>(null);

  const languages = useMemo(() => [...new Set(bibles.map((b) => b.language))].sort(), [bibles]);
  const hasFree = bibles.some((b) => b.priceNgn === 0), hasPaid = bibles.some((b) => b.priceNgn > 0);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return bibles
      .filter((b) => !s || `${b.code} ${b.name} ${b.language}`.toLowerCase().includes(s))
      .filter((b) => filter === "all" || (filter === "free" ? b.priceNgn === 0 : filter === "paid" ? b.priceNgn > 0 : b.language === filter.slice(5)))
      .sort((a, b) => sort === "za" ? b.name.localeCompare(a.name) : sort === "low" ? a.priceNgn - b.priceNgn : sort === "high" ? b.priceNgn - a.priceNgn : sort === "lang" ? a.language.localeCompare(b.language) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  }, [bibles, q, sort, filter]);

  const field = "rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-fg";
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label className="relative block"><span className="sr-only">Find translation</span><Search className="absolute left-3 top-3 text-muted" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find translation…" className={`${field} w-full pl-10`} /></label>
        <label className="flex items-center gap-2 text-sm text-muted">Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={field}><option value="name">Name (A–Z)</option><option value="za">Name (Z–A)</option><option value="lang">Language</option>{hasFree && hasPaid && <><option value="low">Price (low to high)</option><option value="high">Price (high to low)</option></>}</select></label>
        <label className="flex items-center gap-2 text-sm text-muted">Filter
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={field}><option value="all">All Bibles</option>{hasFree && <option value="free">Free</option>}{hasPaid && <option value="paid">Premium</option>}{languages.map((l) => <option key={l} value={`lang:${l}`}>{l}</option>)}</select></label>
      </div>
      <p className="mt-6 text-xs text-muted">{list.length} available {list.length === 1 ? "translation" : "translations"}</p>

      <ul className="mt-3 space-y-3">
        {list.map((b) => (
          <li key={b.code} className="rounded-xl border border-line bg-surface">
            <div className="flex flex-wrap items-center gap-4 p-4 md:p-5">
              <button type="button" onClick={() => setOpen(open === b.code ? null : b.code)} aria-expanded={open === b.code} aria-label={`Details for ${b.name}`} className="rounded-md p-1 text-muted hover:bg-surface2"><ChevronDown size={18} className={`transition-transform ${open === b.code ? "rotate-180" : ""}`} /></button>
              <div className="min-w-0 flex-1"><p className="font-medium text-fg">{b.code} - {b.name}</p><p className="text-sm text-muted">{b.language}</p></div>
              {b.priceNgn === 0
                ? <div className="flex items-center gap-4"><span className="flex items-center gap-1.5 text-sm text-fg"><Check size={16} className="text-glow" />Free</span>
                    <a href={`/api/media/bible/free?code=${encodeURIComponent(b.code)}`} className="btn-primary !px-4 !py-2 text-sm"><Download size={16} />Download</a></div>
                : <button type="button" onClick={() => setBuying(b)} className="btn-primary !px-4 !py-2 text-sm">{naira(b.priceNgn)} <span className="opacity-60">|</span> Buy</button>}
            </div>
            {open === b.code && <p className="border-t border-line px-5 py-3 text-xs text-muted">Copyright: {b.copyright}</p>}
          </li>))}
        {!list.length && <li className="rounded-xl border border-dashed border-line p-8 text-center text-muted">No translations match your search.</li>}
      </ul>
      {buying && <CheckoutDialog bible={buying} onClose={() => setBuying(null)} />}
    </div>);
}

function CheckoutDialog({ bible, onClose }: { bible: StoreBible; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  async function pay(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await fetch("/api/media/bible/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: bible.code, email }) });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error ?? "Something went wrong.");
      window.location.href = json.url; // Paystack hosted checkout
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); setBusy(false); }
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="buy-title" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <form onSubmit={pay} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-line bg-surface p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="buy-title" className="text-lg font-semibold text-fg">Buy {bible.code}</h2><p className="text-sm text-muted">{bible.name}</p></div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-muted hover:bg-surface2"><X size={18} /></button></div>
        <p className="mt-5 text-2xl font-semibold text-fg">{naira(bible.priceNgn)}</p>
        <label className="mt-5 block text-sm text-muted">Email address
          <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg" /></label>
        <p className="mt-2 text-xs text-muted">Paystack sends your receipt here. You will be able to download immediately after paying.</p>
        {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">{busy ? "Opening Paystack…" : `Pay ${naira(bible.priceNgn)} with Paystack`}</button>
      </form>
    </div>);
}