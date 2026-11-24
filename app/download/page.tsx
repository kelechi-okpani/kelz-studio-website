import type { Metadata } from "next";
import Link from "next/link";
import { DownloadStats } from "@/components/releases/DownloadStats";
import { DownloadGrid } from "@/components/releases/DownloadGrid";
import { Stale, Unavailable } from "@/components/releases/Unavailable";
import { VersionBadge } from "@/components/releases/VersionBadge";
import { site } from "@/config/site";
import { fmtDate, getReleases, latestStable } from "@/lib/releases/github";
import { downloadRelease } from "@/lib/releases/manual";
import { TelegramBanner } from "@/components/TelegramBanner";


export const revalidate = 300; // keep in sync with config/downloads.ts (Next requires a literal)
export const metadata: Metadata = { title: "Download KelzStudio", description: "Download the latest version of KelzStudio for Windows and macOS.", ...(site.url ? { alternates: { canonical: "/download" } } : {}) };


export default async function Download() {
  const d = await getReleases(); const r = d.ok ? latestStable(d.releases) : undefined; const dl = downloadRelease(r);
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <h1 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">Download KelzStudio.</h1>
      <p className="mt-5 text-base text-muted">Choose your platform and get started with KelzStudio.</p>
      <TelegramBanner />

    {/* <div>
        {!dl ? <div className="mt-12"><Unavailable what="Downloads are" /></div> : <>
        <div className="mt-10 flex flex-wrap items-center gap-4">{dl.version && <VersionBadge version={dl.version} latest={!!r} />}{dl.publishedAt && <span className="text-sm text-muted">Published {fmtDate(dl.publishedAt)}</span>}
          {r && <Link href={`/releases/${encodeURIComponent(r.tag)}`} className="text-sm font-medium text-glow hover:underline">Release notes →</Link>}</div>
        {d.ok && d.stale && <div className="mt-6"><Stale at={d.fetchedAt} /></div>}
      
        <div className="mt-8"><DownloadGrid release={dl} /></div>
        
        {r && d.ok && <DownloadStats release={r} all={d.releases} />}
        
        </>}
      <ul className="mt-10 grid gap-2 text-sm text-muted md:grid-cols-2"><li>Windows: 64-bit installer.</li><li>macOS: separate builds for Apple Silicon and Intel.</li><li>Your libraries and files are stored on your computer.</li><li>Showing Office files as originals downloads LibreOffice the first time you use it.</li></ul>
      <p className="mt-6 text-sm text-muted">Need an earlier version? <Link href="/releases" className="text-glow hover:underline">View all releases</Link>. Installer signing and notarization status is not stated here until it has been confirmed.</p>
   
    </div> */}


    </div>);
}
