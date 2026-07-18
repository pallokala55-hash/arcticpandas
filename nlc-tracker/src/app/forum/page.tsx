import type { Metadata } from "next";
import { activity } from "@/data/activity";

export const metadata: Metadata = { title: "Forum" };

export default function ForumPage() {
  const threads = activity.filter((a) => a.type === "forum");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-black text-white">Forum</h1>
      <p className="mt-2 text-sm text-muted">
        Community discussions open with user accounts. A preview of active threads:
      </p>
      <div className="card mt-8">
        <ul>
          {threads.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 border-b border-white/[0.04] px-4 py-3.5 last:border-0"
            >
              <span aria-hidden="true">💬</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white/90">
                  {t.text}
                </span>
                <span className="text-xs text-muted">{t.time}</span>
              </span>
              <span className="text-xs text-muted">{t.comments} replies</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
