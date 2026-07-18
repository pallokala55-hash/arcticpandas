import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NLC Tracker — Northern League of Legends Championship",
    template: "%s | NLC Tracker",
  },
  description:
    "Matches, events, brackets and stats for the NLC — by Arctic Pandas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <TopNav />
        <main>{children}</main>
        <footer className="mt-20 border-t border-white/[0.06] py-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-xs text-muted sm:px-6">
            <span>© 2026 Arctic Pandas Oy · NLC Tracker</span>
            <span>Mock data — not affiliated with Riot Games</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
