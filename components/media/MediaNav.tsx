"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/media", label: "Overview" },
  { href: "/media/bible", label: "Bible Plugins" },
  { href: "/media/themes", label: "Themes" },
  { href: "/media/backgrounds", label: "Backgrounds" },
];

export function MediaNav() {
  const path = usePathname();
  return (
    <nav aria-label="Media resources" className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((t) => {
        const on = t.href === "/media" ? path === "/media" : path.startsWith(t.href);
        return <Link key={t.href} href={t.href} aria-current={on ? "page" : undefined}
          className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${on ? "border-brand bg-brand text-on-brand" : "border-line text-fg hover:bg-surface2"}`}>{t.label}</Link>;
      })}
    </nav>
  );
}