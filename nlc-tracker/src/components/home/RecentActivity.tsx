import { activity } from "@/data/activity";

const TYPE_ICON: Record<string, string> = {
  result: "🏆",
  transfer: "🔁",
  news: "📰",
  forum: "💬",
};

export default function RecentActivity() {
  return (
    <section className="card">
      <h2 className="border-b border-white/[0.06] px-4 py-3 text-xs font-bold tracking-[0.2em] text-accent-soft">
        RECENT ACTIVITY
      </h2>
      <ul>
        {activity.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 border-b border-white/[0.04] px-4 py-2.5 last:border-0 ${
              item.highlight ? "border-l-2 border-l-accent" : ""
            }`}
          >
            <span className="text-sm" aria-hidden="true">
              {TYPE_ICON[item.type]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-white/85">{item.text}</span>
              <span className="text-[11px] text-muted">{item.time}</span>
            </span>
            {item.comments !== undefined && (
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
                {item.comments}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
