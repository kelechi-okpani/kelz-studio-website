import { Building2, CalendarDays, Church, GraduationCap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { ParallaxShot } from "@/components/ParallaxShot";
import { StickyStory, type Story } from "@/components/StickyStory";
import { DisplayStage } from "@/components/DisplayStage";
import { Orbs } from "@/components/Orbs";
import { LatestRelease } from "@/components/releases/LatestRelease";
import { DownloadGrid } from "@/components/releases/DownloadGrid";
import { NoStable, Unavailable } from "@/components/releases/Unavailable";
import { getReleases, latestStable } from "@/lib/releases/github";
import { downloadRelease } from "@/lib/releases/manual";
import { libraries } from "@/content/features";
const h2 = "text-3xl font-semibold tracking-tight text-fg md:text-4xl";
const features: Story[] = libraries.map((f) => ({ id: f.id, title: f.title, text: f.summary, points: f.points, shot: f.shot ?? "scriptures", href: `/features#${f.id}` }));
const workflow: Story[] = [
  { id: "w1", title: "Organize your content", text: "Keep songs, scriptures, media, presentations and themes in their own libraries.", shot: "media" },
  { id: "w2", title: "Build your schedule", text: "Add items to the Schedule in running order, with notes and a theme per item.", shot: "songs" },
  { id: "w3", title: "Customize your presentation", text: "Design themes in the Theme Editor and set fonts, margins and transitions in Options.", shot: "themes" },
  { id: "w4", title: "Preview your content", text: "Step through slides in Preview without changing the audience screen.", shot: "scriptures" },
  { id: "w5", title: "Present with confidence", text: "Use Go Live, then Logo, Black, Clear and alerts, across Main, Alternate and Foldback displays.", shot: "output" } ];
const audiences = [[Church, "Churches and ministries", "Songs, scriptures, media and nursery alerts in one service schedule.", "md:col-span-2 md:row-span-2"], [CalendarDays, "Conferences and events", "Prepare a running order ahead, send it live, and use a second screen or stage display.", ""], [GraduationCap, "Educational institutions", "Present lessons from PDF and Office pages, plus announcements and media.", ""], [Building2, "Businesses and organizations", "Show PDF, PowerPoint and Excel pages and media with a clear live output.", "md:col-span-2"]] as const;
export default async function Home() {
  const d = await getReleases(); const latest = d.ok ? latestStable(d.releases) : undefined; const dl = downloadRelease(latest);
  return (<>
    <Hero />



    <section id="overview" className="scroll-mt-20 py-28">
      <div className="mx-auto max-w-7xl px-5"><Reveal><div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-end"><h2 className={h2}>Everything You Need to Deliver Better Presentations.</h2>
        <p className="text-base leading-relaxed text-muted md:text-lg">Manage your content, organize your service or event, prepare media, and control your displays from one desktop application.</p></div></Reveal></div>
      <ParallaxShot name="media" className="mx-auto mt-16 max-w-[78rem] px-5 md:px-10" />
      {/* <ParallaxShot name="media" className="mx-auto mt-16 max-w-[88rem] px-5 md:px-10" /> */}
    </section>



    <section id="features" className="scroll-mt-20 bg-surface2 py-28"><div className="mx-auto max-w-7xl px-5">
      <Reveal><h2 className={`${h2} max-w-4xl`}>Built for Every Part of Your Presentation Workflow.</h2></Reveal>
      <div className="mt-12">
        <StickyStory items={features} />
        
        </div></div></section>
   
   
    <section className="force-dark relative overflow-hidden bg-bg bg-[radial-gradient(70rem_30rem_at_50%_0%,rgb(var(--brand)/.35),transparent_70%)] py-32 text-fg">
      <Orbs />
      <div className="relative mx-auto max-w-[88rem] px-5 text-center md:px-10"><Reveal><h2 className={`${h2} mx-auto max-w-3xl`}>Everything Comes Together on One Screen.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted">Schedule, Preview, Live and every library, side by side in one window.</p></Reveal>
        <ParallaxShot name="songs" className="mx-auto mt-14 max-w-6xl" /></div></section>



    <section className="py-28"><div className="mx-auto max-w-7xl px-5">
      <Reveal><h2 className={h2}>More Control. More Display Possibilities.</h2><p className="mt-5 max-w-2xl text-base text-muted">Prepare once, then deliver to the displays your event needs.</p></Reveal>
      <div className="mt-14"><DisplayStage /></div></div></section>
    <section className="bg-surface2 py-28"><div className="mx-auto max-w-7xl px-5">
      <Reveal><h2 className={h2}>From Preparation to Presentation.</h2></Reveal>
      <div className="mt-10"><StickyStory items={workflow} numbered /></div></div></section>
    <section className="py-28"><div className="mx-auto max-w-7xl px-5">
      <Reveal><h2 className={h2}>Designed for the Way You Present.</h2></Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">{audiences.map(([I, t, d, c], i) => (
        <Reveal key={t} delay={i * 0.07} className={c}><div className="flex h-full min-h-[11rem] flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition hover:-translate-y-1 hover:shadow-lg"><I className="text-brand dark:text-glow" size={i === 0 ? 40 : 28} /><div><h3 className={`font-semibold text-fg ${i === 0 ? "text-2xl" : "text-lg"}`}>{t}</h3><p className="mt-2 text-muted">{d}</p></div></div></Reveal>))}</div></div></section>
    {/* <section className="pb-28"><div className="mx-auto max-w-6xl px-5">
      {d.ok ? (latest ? <LatestRelease release={latest} /> : <NoStable />) : <Unavailable />}</div>
      </section> */}
    {/* <section className="pb-32"><div className="mx-auto max-w-5xl px-5 text-center">
      <Reveal><h2 className={h2}>Your Next Presentation Starts Here.</h2><p className="mx-auto mt-5 max-w-xl text-base text-muted">Get started with KelzStudio and bring your presentation workflow together in one powerful desktop application.</p></Reveal>
      <div className="mt-12">{dl ? <DownloadGrid release={dl} /> : <Unavailable what="Downloads are" />}</div></div>
      </section> */}
  </>);
}
