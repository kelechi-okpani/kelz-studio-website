import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Background images", description: "Background images and videos for KelzStudio themes." };

export default function BackgroundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-8">
      <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">Background images</h1>
      <p className="mt-4 text-muted">Images and videos can sit behind your songs, scriptures and presentations.</p>
      <h2 className="mt-10 text-xl font-semibold text-fg">Using backgrounds</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/80">
        <li>Import images and videos into the Media library.</li>
        <li>Choose one as a theme background in the Theme Editor.</li>
        <li>Keep backgrounds inside your library so their paths do not break.</li>
      </ul>
      <p className="mt-6 text-sm text-muted">Downloadable background packs are coming soon. <Link href="/how-it-works/import-media" className="text-glow hover:underline">Read the media guide</Link>.</p>
    </div>);
}