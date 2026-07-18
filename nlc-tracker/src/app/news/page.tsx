import type { Metadata } from "next";
import { news } from "@/data/news";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-black text-white">News</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item) => (
          <article key={item.id} className="card group overflow-hidden">
            <div className="h-32 w-full" style={{ background: item.gradient }} />
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent-soft">
                {item.category} · {formatDate(item.publishedAt)}
              </p>
              <h2 className="mt-1.5 font-bold leading-snug text-white/95">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
