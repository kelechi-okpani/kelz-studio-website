import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Themes", description: "Themes for KelzStudio songs, scriptures and presentations." };

export default function ThemesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-8">
      <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">Themes</h1>
      <p className="mt-4 text-muted">Themes control how songs, scriptures and presentations look: background, fonts, alignment and layout.</p>
      <h2 className="mt-10 text-xl font-semibold text-fg">Using themes</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/80">
        <li>Create your own in the Theme Editor, or import a theme file (.kelz-theme.json).</li>
        <li>Set a default theme for songs, scriptures and presentations, or choose one per Schedule item.</li>
        <li>Export a theme to share it with another computer.</li>
      </ul>
      <p className="mt-6 text-sm text-muted">Downloadable theme packs are coming soon. <Link href="/how-it-works/edit-theme" className="text-glow hover:underline">Read the theme guide</Link>.</p>
    </div>);
}