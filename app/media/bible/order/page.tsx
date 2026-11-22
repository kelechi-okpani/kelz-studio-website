import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { naira } from "@/lib/console/format";
import { fulfil } from "@/lib/console/orders";


export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your Bible download", robots: { index: false, follow: false } };

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ reference?: string; trxref?: string }> }) {
  const sp = await searchParams;
  const reference = (sp.reference ?? sp.trxref ?? "").slice(0, 80);
  let order = null, failed = false;
  if (reference) { try { order = await fulfil(reference); } catch (e) { console.error("[order]", e instanceof Error ? e.message : e); failed = true; } }

  return (
    <div className="mx-auto max-w-xl px-5 pb-28 pt-8">
      {!reference || (!order && !failed) ? <State icon="x" title="Order not found" text="We could not find this order. If you were charged, contact support with your Paystack receipt." />
        : failed || !order ? <State icon="clock" title="We could not confirm your payment yet" text="Please refresh in a moment. If you were charged, your download will appear here shortly." />
        : order.status === "paid" ? (
          <div className="rounded-2xl border border-line bg-surface p-8">
            <CheckCircle2 className="text-glow" size={36} />
            <h1 className="mt-4 text-2xl font-semibold text-fg">Payment successful</h1>
            <p className="mt-2 text-muted">{order.bible_code} - {order.bible_name} · {naira(order.amount_kobo / 100)}</p>
            <a href={`/api/media/bible/download?token=${order.download_token}`} className="btn-primary mt-6 w-full">Download {order.bible_code}</a>
            <p className="mt-4 text-sm text-muted">You can download up to {order.max_downloads} times ({Math.max(0, order.max_downloads - order.downloads)} left). Keep this page’s link, or your reference <span className="font-mono text-fg">{order.reference}</span>, to download again.</p>
            <p className="mt-3 text-sm text-muted">To install: open KelzStudio, go to Scriptures and choose Import Bible(s).</p>
          </div>)
        : order.status === "failed" ? <State icon="x" title="Payment was not completed" text="Your card was not charged. You can try again from the Bible Plugins page." />
        : <State icon="clock" title="Waiting for payment confirmation" text="We have not received confirmation from Paystack yet. Refresh this page in a few seconds." />}
      <p className="mt-8 text-center text-sm"><Link href="/media/bible" className="text-glow hover:underline">← Back to Bible Plugins</Link></p>
    </div>);
}

function State({ icon, title, text }: { icon: "x" | "clock"; title: string; text: string }) {
  const I = icon === "x" ? XCircle : Clock;
  return <div className="rounded-2xl border border-line bg-surface p-8"><I className="text-muted" size={36} /><h1 className="mt-4 text-2xl font-semibold text-fg">{title}</h1><p className="mt-2 text-muted">{text}</p></div>;
}