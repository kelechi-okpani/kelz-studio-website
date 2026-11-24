import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/config/site";
import { emailConfigured, emailHref, whatsappConfigured, whatsappHref } from "@/lib/contact";
export function Footer({ latestTag }: { latestTag?: string }) {
  return (
    <footer className="border-t border-line bg-surface2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div><div className="flex items-center gap-2.5 text-base font-semibold text-fg"><Image src="/logo.png" alt="" width={32} height={32} />{site.name}</div>
          <p className="mt-4 max-w-sm text-sm">{site.description}</p><p className="mt-3 text-sm font-medium text-fg">{site.tagline}</p></div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-fg">Product</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.label}>
              <Link className="hover:text-fg" href={n.href}>{n.label}</Link></li>)}
              </ul></nav>
        <div><h2 className="text-sm font-semibold text-fg">Releases &amp; Legal</h2>
        <ul className="mt-4 space-y-2.5 text-sm">
          <li><Link className="hover:text-fg" href="/releases">Release archive</Link></li>{latestTag && <li><Link className="hover:text-fg" href={`/releases/${encodeURIComponent(latestTag)}`}>Latest release notes</Link></li>}<li><Link className="hover:text-fg" href="/privacy-policy">Privacy Policy</Link></li><li><Link className="hover:text-fg" href="/terms">Terms of Use</Link></li>{whatsappConfigured && <li><a className="hover:text-fg" href={whatsappHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>}{emailConfigured && <li><a className="hover:text-fg" href={emailHref}>Email support</a></li>}</ul></div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-muted">© {new Date().getFullYear()} KelzStudio · Developed by {site.company}</div>
    </footer>
  );
}
