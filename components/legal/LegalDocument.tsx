import Link from "next/link";
import { emailConfigured, emailHref, whatsappConfigured, whatsappHref } from "@/lib/contact";

export type LegalBlock = string | string[]; // string = paragraph, string[] = bullet list
export interface LegalSection { id: string; title: string; body: LegalBlock[] }

/** Shared layout for legal pages (Terms of Use, Privacy Policy). Adds a table of contents and a final "Contact us" section. */
export function LegalDocument({ title, updated, sections, contactIntro }: {
  title: string; updated: string; sections: LegalSection[]; contactIntro: React.ReactNode;
}) {
  const contactTitle = `${sections.length + 1}. Contact us`;
  const hasContact = whatsappConfigured || emailConfigured;
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-32">
      <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">kelechi okpani. · Last updated {updated}</p>

      <nav aria-label="On this page" className="mt-8 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold text-fg">On this page</p>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-muted hover:text-fg">{s.title}</a></li>)}
          <li><a href="#contact" className="text-muted hover:text-fg">{contactTitle}</a></li>
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-fg/80">
              {s.body.map((b, i) => typeof b === "string"
                ? <p key={i}>{b}</p>
                : <ul key={i} className="list-disc space-y-1.5 pl-5">{b.map((x) => <li key={x}>{x}</li>)}</ul>)}
            </div>
          </section>
        ))}

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-fg">{contactTitle}</h2>
          <p className="mt-3 leading-relaxed text-fg/80">
            {contactIntro}{hasContact ? " using:" : <> through the <Link href="/support" className="text-glow hover:underline">Support page</Link>.</>}
          </p>
          {hasContact && (
            <div className="mt-4 flex flex-wrap gap-3">
              {whatsappConfigured && <a className="btn-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
              {emailConfigured && <a className="btn-ghost" href={emailHref}>Email</a>}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}