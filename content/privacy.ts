// Privacy Policy content. Facts about the app come from the KelzStudio Complete Project Documentation;
// facts about the website come from this project's code. Infrastructure providers are deliberately not named.
// Review with the product team (and a lawyer if needed) before relying on it.
export const policyUpdated = "19 November 2026";
export type Block = string | string[]; // string = paragraph, string[] = bullet list
export interface PolicySection { id: string; title: string; body: Block[] }
export const policy: PolicySection[] = [
  { id: "who", title: "1. Who we are", body: ["KelzStudio is desktop presentation software developed by kelechi okpani. (“kelechi okpani”, “we”, “us”). This policy explains what information is handled when you visit this website, download KelzStudio, contact us, or use the KelzStudio application."] },
  { id: "summary", title: "2. The short version", body: [[
    "KelzStudio is local-first software. Your songs, scriptures, media, presentations, themes and Schedules are stored on your own computer.",
    "The current version does not ask you to create an account or register.",
    "This website does not use advertising or tracking cookies. It stores one browser setting: your light or dark theme choice.",
    "When you start a download we count it, but we do not record who you are.",
    "We do not sell personal information.",
  ]] },
  { id: "website", title: "3. This website", body: ["When you visit the website, the following may be handled:", [
    "Technical data collected automatically by the providers that host and deliver the site, such as IP address, browser and device type, pages requested and timestamps. This is used to deliver the site, keep it secure and fix problems.",
    "A theme preference. Your choice of light or dark mode is saved in your browser’s local storage so it can be restored on your next visit. It is not sent to us.",
    "Download counts. When you select a download button, we record that a download was started, together with the installer name, its version and the time. We do not store your name, IP address or device details with this count.",
    "Messages you send us. If you contact us by WhatsApp or email, we receive the details you choose to include, such as your name, phone number or email address, and your message.",
  ], "We do not require you to create an account to use the website."] },
  { id: "downloads", title: "4. Downloads", body: ["Installer files are delivered through a third-party file-delivery service. When you download a file, that service handles the request under its own privacy practices and may receive technical data such as your IP address and browser details. We do not receive your identity from a download."] },
  { id: "app", title: "5. The KelzStudio application", body: ["The application runs on your computer. In its current version:", [
    "Your libraries, imported files, themes and saved Schedules stay on your computer, in the storage profile you choose. Backups and Schedule files you create are yours to keep or share.",
    "Alerts and the nursery queue are temporary. Names you type in are kept only while the app is running and are not saved when you close it.",
    "The application does not require sign-in, registration or a cloud account.",
  ], "Some features connect to the internet only when you use them:", [
    "Downloading Bible translations from the built-in catalog contacts the catalog provider, which can see standard connection data such as your IP address.",
    "Showing Office documents as originals downloads a document-conversion component the first time it is needed. The download is checked before it is used.",
    "Links that open web pages open in your system browser, under that website’s own policy.",
  ], "Camera and capture-device feeds use your computer’s camera permission. Video from a feed is shown on your outputs and is not sent to us.",
  "If you enter other people’s information into KelzStudio, such as the names of children in the nursery queue or names in songs and Schedules, you are responsible for handling that information lawfully and for informing the people concerned where required."] },
  { id: "use", title: "6. How we use information", body: [[
    "To respond to your questions and support requests.",
    "To provide the website and downloads, and keep them secure and working.",
    "To understand overall interest in the software, for example through download counts.",
    "To meet legal obligations.",
  ]] },
  { id: "providers", title: "7. Service providers we rely on", body: ["We use third-party providers to run the website and deliver the software. They process data under their own terms and privacy policies:", [
    "Providers that host this website and manage its domain.",
    "A file-delivery service that hosts the installers.",
    "WhatsApp or your email provider, when you contact us through them.",
    "The Bible catalog provider and the document-conversion component source, when you use those features in the application.",
  ], "We do not sell your personal information, and we only share it with providers as needed to run the website, deliver downloads and respond to you, or where the law requires."] },
  { id: "retention", title: "8. How long we keep information", body: ["We keep messages and contact details for as long as needed to deal with your request and any follow-up, then delete or anonymise them where practical. Download counts are kept as statistics. Records held by our providers are kept according to their own retention periods."] },
  { id: "security", title: "9. Security", body: ["We take reasonable steps to protect the website and the information we handle. No online service or software can be guaranteed completely secure. Because KelzStudio stores your data on your computer, keeping that computer, your backups and your Schedule files secure is also up to you."] },
  { id: "transfers", title: "10. International transfers", body: ["Our providers may process data in countries other than your own. Where this happens we rely on providers that apply appropriate safeguards."] },
  { id: "rights", title: "11. Your rights", body: ["Depending on where you live, data protection laws such as the Nigeria Data Protection Act 2023 may give you rights over your personal information, including the right to:", [
    "ask what information we hold about you and request a copy,",
    "ask us to correct or delete it,",
    "object to or ask us to limit how we use it,",
    "withdraw consent where we rely on it,",
    "complain to your data protection authority, such as the Nigeria Data Protection Commission.",
  ], "To use any of these rights, contact us using the details below."] },
  { id: "children", title: "12. Children", body: ["This website is not directed at children, and we do not knowingly collect personal information from them through it."] },
  { id: "changes", title: "13. Changes to this policy", body: ["We may update this policy as the website or the application changes. The date at the top shows when it was last updated. If we make significant changes, we will make that clear on this page."] },
];