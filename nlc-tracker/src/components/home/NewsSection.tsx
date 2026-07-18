import Link from "next/link";
import { featuredNews, popularNews } from "@/data/news";
import { formatDate } from "@/lib/format";

export default function NewsSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Featured story with a big (placeholder gradient) image */}
      <Link href="/news" className="card card-glow group block overflow-hidden">
        <div
          className="relative h-52 w-full sm:h-64"
          style={{ background: featuredNews.gradient }}
        >
          <span className="absolute left-4 top-4 rounded-md bg-black/50 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90 backdrop-blur">
            {featuredNews.category}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-16">
            <h3 className="text-xl font-extrabold leading-snug text-white transition-colors group-hover:text-accent-soft sm:text-2xl">
              {featuredNews.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/70">
              {featuredNews.excerpt}
            </p>
          </div>
        </div>
      </Link>

      {/* Popular news list */}
      <section className="card">
        <h2 className="border-b border-white/[0.06] px-4 py-3 text-xs font-bold tracking-[0.2em] text-accent-soft">
          POPULAR NEWS
        </h2>
        <ul>
          {popularNews.map((item) => (
            <li key={item.id} className="border-b border-white/[0.04] last:border-0">
              <Link
                href="/news"
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <span
                  className="h-8 w-8 shrink-0 rounded-lg"
                  style={{ background: item.gradient }}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white/90">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted">
                    {item.category} · {formatDate(item.publishedAt)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
