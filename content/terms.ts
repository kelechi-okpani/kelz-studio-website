// Terms of Use content. Review with the product team (and a lawyer if needed) before relying on it.
export const termsUpdated = "19 November 2026";
// Confirm with the company before publishing.
export const governingLaw = "the Federal Republic of Nigeria";
export type Block = string | string[]; // string = paragraph, string[] = bullet list
export interface TermsSection { id: string; title: string; body: Block[] }
export const terms: TermsSection[] = [
  { id: "agreement", title: "1. Agreement to these terms", body: ["These Terms of Use apply to this website and to the KelzStudio desktop application (together, the “Services”), provided by kelechi okpani. (“kelechi okpani”, “we”, “us”). By visiting the website, downloading KelzStudio or using it, you agree to these terms and to our Privacy Policy. If you use KelzStudio on behalf of a church, business or other organization, you confirm that you may accept these terms for it. If you do not agree, please do not use the Services."] },
  { id: "software", title: "2. Using KelzStudio", body: ["kelechi okpani grants you a personal, non-exclusive, non-transferable right to install and use KelzStudio on your computers, subject to these terms and any licence terms supplied with the software. You agree that you will not:", [
    "copy, sell, rent, lease or redistribute KelzStudio or its installers, except as we allow in writing,",
    "reverse engineer, decompile or disassemble the software, except where the law allows it despite this restriction,",
    "remove or hide copyright, brand or licence notices,",
    "use the Services for unlawful purposes or in a way that infringes other people’s rights.",
  ]] },
  { id: "downloads", title: "3. Downloads and installation", body: ["Download KelzStudio only from this website so you get the files we publish. You are responsible for choosing the right version for your computer (Windows, or macOS for Apple Silicon or Intel), for having the permissions needed to install software, and for the security of your own computers. Your system may show a security prompt when you install a newly downloaded app. Automatic updates are not available in this version, so new versions are published on this website."] },
  { id: "content", title: "4. Your content", body: ["You keep ownership of the songs, scriptures, media, presentations, themes, documents and other material you add to KelzStudio (“your content”). It is stored on your computer, and we do not receive or review it. You are responsible for your content and for:", [
    "having the rights, licences and permissions you need to use it, including for song lyrics, Bible translations, music, images, video and documents,",
    "any personal information you enter, such as names in the nursery queue or in Schedules, and for handling it lawfully,",
    "keeping backups of your libraries, themes and Schedule files.",
  ]] },
  { id: "thirdparty", title: "5. Third-party components and services", body: ["KelzStudio uses third-party components and services, such as the Bible catalog and a document-conversion component that is downloaded when first needed. These are provided by others and are subject to their own terms and licences. We are not responsible for their availability or content."] },
  { id: "website", title: "6. Using the website", body: ["You agree to use the website lawfully and not to:", [
    "attempt to gain unauthorised access to the website or its systems,",
    "interfere with or overload the website, or use automated tools to harvest content in a way that harms it,",
    "upload or send harmful code, or misuse our contact channels.",
  ]] },
  { id: "ip", title: "7. Intellectual property", body: ["KelzStudio, the KelzStudio name and logo, the website and its text, design and images belong to kelechi okpani or its licensors and are protected by law. These terms do not give you any ownership of them. Open-source and third-party components remain under their own licences."] },
  { id: "availability", title: "8. Availability and changes", body: ["We work to keep the website and downloads available, but we do not guarantee that they will always be uninterrupted or error-free. We may change, suspend or discontinue features, versions or parts of the website at any time. Descriptions of features reflect the current version and may change."] },
  { id: "warranty", title: "9. No warranty", body: ["To the fullest extent the law allows, the Services are provided “as is” and “as available”, without warranties of any kind, whether express or implied, including fitness for a particular purpose. Software can behave differently on different computers, displays and media files. Before any live service or event, test your outputs, media and Schedule on the equipment you will use, and keep a backup plan."] },
  { id: "liability", title: "10. Limitation of liability", body: ["To the fullest extent the law allows, kelechi okpani is not liable for indirect, incidental or consequential loss, or for loss of data, income, reputation or opportunity, arising from your use of, or inability to use, the Services, including any disruption to a service or event. Nothing in these terms limits liability that cannot be limited by law."] },
  { id: "termination", title: "11. Suspension and termination", body: ["We may suspend or end your access to the website or downloads if you break these terms or misuse the Services. You may stop using KelzStudio at any time by uninstalling it. Your content stays on your computer unless you delete it."] },
  { id: "law", title: "12. Governing law", body: [`These terms are governed by the laws of ${governingLaw}. Disputes will be handled by the competent courts there, unless the law of your country gives you rights that cannot be limited by agreement.`] },
  { id: "changes", title: "13. Changes to these terms", body: ["We may update these terms from time to time. The date at the top shows when they were last updated. By continuing to use the Services after a change, you accept the updated terms."] },
];