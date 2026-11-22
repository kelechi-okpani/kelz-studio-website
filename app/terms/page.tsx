import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { site } from "@/config/site";
import { terms, termsUpdated } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the KelzStudio website and the KelzStudio application.",
  ...(site.url ? { alternates: { canonical: "/terms" } } : {}),
};

export default function TermsOfUse() {
  return (
    <LegalDocument
      title="Terms of Use"
      updated={termsUpdated}
      sections={terms}
      contactIntro={<>Questions about these terms? Read our <Link href="/privacy-policy" className="text-glow hover:underline">Privacy Policy</Link>, or contact kelechi okpani.</>}
    />
  );
}