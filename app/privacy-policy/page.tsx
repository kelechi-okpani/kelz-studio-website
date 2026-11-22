import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { policy, policyUpdated } from "@/content/privacy";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How kelechi okpani. handles information on the KelzStudio website and in the KelzStudio application.",
  ...(site.url ? { alternates: { canonical: "/privacy-policy" } } : {}),
};

export default function PrivacyPolicy() {
  return <LegalDocument title="Privacy Policy" updated={policyUpdated} sections={policy} contactIntro="For privacy questions or to use your rights, contact kelechi okpani." />;
}
