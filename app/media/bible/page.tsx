import type { Metadata } from "next";
import Link from "next/link";
import { BibleStore } from "@/components/media/BibleStore";
import { bibles } from "@/content/bibles";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Bible Plugins", description: "Find Bible translations for KelzStudio. Free translations download instantly; premium translations unlock after payment.", ...(site.url ? { alternates: { canonical: "/media/bible" } } : {}) };

export default function BiblePlugins() {
  // Only send what the browser needs. The file location never leaves the server.
  const list = bibles.map(({ code, name, language, priceNgn, copyright }) => ({ code, name, language, priceNgn, copyright }));
  return (
    <div className="mx-auto max-w-4xl px-5 pb-28 pt-8">
      <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">Expand your resources with Bible Plugins</h1>
      <p className="mt-4 max-w-2xl text-muted">Search digital Bibles in real time and display them to your audience. Install a plugin into your Scriptures library with Import Bible(s). <Link href="/how-it-works/scriptures" className="text-glow hover:underline">How do I install a Bible plugin?</Link></p>
      <div className="mt-10"><BibleStore bibles={list} /></div>
      <p className="mt-10 text-xs text-muted">Payments are processed securely by Paystack. After a successful payment you can download your Bible straight away from the confirmation page.</p>
    </div>);
}