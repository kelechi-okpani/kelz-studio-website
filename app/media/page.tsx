import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Image as ImageIcon, Palette } from "lucide-react";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Media Resources", description: "Bible translations, themes and background images for KelzStudio.", ...(site.url ? { alternates: { canonical: "/media" } } : {}) };

const items = [
  { href: "/media/bible", icon: BookOpen, title: "Bible Plugins", text: "Search translations and add them to your Scriptures library. Free translations download instantly; premium ones are unlocked after payment." },
  { href: "/media/themes", icon: Palette, title: "Themes", text: "Reusable looks for songs, scriptures and presentations, imported into the Theme Editor as .kelz-theme.json files." },
  { href: "/media/backgrounds", icon: ImageIcon, title: "Background images", text: "Images and videos to use behind your slides, added through the Media library." },
];

export default function MediaHome() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-8">
      <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">Media resources</h1>
      <p className="mt-4 max-w-2xl text-muted">Extra content for KelzStudio: Bible translations, themes and backgrounds.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="group rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(var(--shadow)/.4)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface2 text-brand dark:text-glow"><i.icon size={24} /></span>
            <h2 className="mt-5 text-lg font-semibold text-fg">{i.title}</h2>
            <p className="mt-2 text-sm text-muted">{i.text}</p>
            <span className="mt-4 inline-block text-sm font-medium text-glow">Open →</span>
          </Link>))}
      </div>
    </div>);
}