


export const nav = [
  { label: "Overview", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Downloads", href: "/download" },
  { label: "Releases", href: "/releases" },
  { label: "Support", href: "/support" },
  { label: "Media", href: "/media" },
];

// Real captures supplied by the developer. Swap files in /public/shots to update everywhere.
export interface ShotInfo { src: string; w: number; h: number; alt: string; bare?: boolean }
export const shots: Record<"hero" | "media" | "songs" | "scriptures" | "presentations" | "themes" | "options" | "alternate" | "output", ShotInfo> = {
  hero: { src: "/shots/hero.png", w: 1647, h: 1030, alt: "KelzStudio with a schedule, Preview and Live panels, and the Media library open" },
  media: { src: "/shots/media.png", w: 1417, h: 1027, alt: "KelzStudio All Media list showing images and videos with Title, File name and Type" },
  songs: { src: "/shots/songs.png", w: 1532, h: 1026, alt: "KelzStudio Songs library with a song shown as chorus and verse slides in Preview and Live" },
  scriptures: { src: "/shots/scriptures.png", w: 1533, h: 1012, alt: "KelzStudio Scriptures library with reference search, results and a book and chapter picker" },
  presentations: { src: "/shots/presentations.png", w: 1521, h: 1027, alt: "KelzStudio Presentations library with Word and PowerPoint presentations and slide navigation" },
  themes: { src: "/shots/themes.png", w: 1531, h: 1027, alt: "KelzStudio Theme Editor with slide canvas, toolbar and Inspector" },
  options: { src: "/shots/options.png", w: 1533, h: 1032, alt: "KelzStudio Options dialog on Main Output, Song settings" },
  alternate: { src: "/shots/alternate.png", w: 1537, h: 1032, alt: "KelzStudio Options dialog on Alternate Output with monitor, position and margin settings" },
  output: { src: "/shots/output.png", w: 1918, h: 1078, alt: "A KelzStudio scripture slide as shown on the main output", bare: true },
};




export const site = {
  name: "KelzStudio",
  company: "kelechi okpani.",
  tagline: "One Platform. For Every Presentation.",

  description:
    "KelzStudio by kelechi okpani is an easy-to-use cross-platform presentation software for churches, worship teams, businesses, schools, event organizers, and organizations. Create and manage church lyrics, Bible verses, multimedia slides, announcements, and professional presentations with ease.",

  keywords: [
    // Brand keywords
    "free",
    "free software",
    "free presentation software",


    "Kelz",
    "Studio",
    "KelzStudio",
    "Kelz Studio",
    "kelechi okpani",
    "kelechi",

    // General presentation software
    "present",
    "presentation",
    "presentation software",
    "best presentation software",
    "cross platform presentation software",
    "multimedia presentation software",
    "professional presentation software",
    "presentation maker",
    "slideshow software",
    "digital presentation software",
    "presentation management software",
    "presentation tools",

    // Church and worship
    "church presentation software",
    "church media software",
    "worship presentation software",
    "church lyrics presentation software",
    "Bible verse presentation software",
    "church service presentation",
    "worship lyrics software",
    "church screen presentation",
    "Sunday service presentation software",
    "church announcement software",
    "sermon presentation software",
    "church multimedia software",

    // Events and organizations
    "event presentation software",
    "event media software",
    "live event presentation",
    "conference presentation software",
    "organization presentation software",
    "event slideshow software",
    "live presentation software",
    "live",
    "media",
    "church media",

    // Education
    "educational presentation software",
    "classroom presentation software",
    "school presentation software",
    "teaching presentation tools",
    "lecture presentation software",

    // Business
    "business presentation software",
    "corporate presentation software",
    "business slideshow software",
    "professional slideshow maker",
    "meeting presentation software",

    // Media and workflow
    "media management software",
    "live presentation workflow",
    "multimedia management software",
    "screen display software",
    "presentation display software",
    "audio visual presentation software",
    "digital screen presentation",

    // Platform and discovery
    "desktop presentation app",
    "Windows presentation software",
    "presentation software for Windows",
    "cross platform presentation app",
    "presentation software for churches",
    "presentation software for events",
  ],

  icons: {
  icon: "/logo.png",
  shortcut: "/logo.png",
  apple: "/logo.png",
  },  

  logo: "https://www.kelzstudio.com/logo.png",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://kelechi-okpani.com",

  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",

  whatsappNumber:
    (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "")
      .replace(/\D/g, ""),

  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
    "Hello Kelz Studio! I would like to make an enquiry about your presentation software. Please share more information about its features, pricing, and how I can get started.",

  issuesUrl:
    process.env.NEXT_PUBLIC_ISSUES_URL ?? "",
};
