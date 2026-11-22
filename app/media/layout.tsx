import { MediaNav } from "@/components/media/MediaNav";

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-28">
        <MediaNav />
        </div>
      {children}
    </>
  );
}