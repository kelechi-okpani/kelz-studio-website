import type { Metadata } from "next";

export const metadata: Metadata = { title: "Console", robots: { index: false, follow: false } };

// Covers the public site's navigation, footer and contact buttons so the console looks like its own app.
export default function consoleLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] overflow-auto bg-bg text-fg">{children}</div>;
}