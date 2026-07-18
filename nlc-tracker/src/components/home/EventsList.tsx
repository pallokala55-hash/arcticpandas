import Link from "next/link";
import { events } from "@/data/events";
import { countdownLabel } from "@/lib/format";

export default function EventsList() {
  const visible = events.filter((e) => e.status !== "completed");

  return (
    <section className="card">
      <h2 className="border-b border-white/[0.06] px-4 py-3 text-xs font-bold tracking-[0.2em] text-accent-soft">
        EVENTS
      </h2>
      <ul>
        {visible.map((event) => {
          const label = countdownLabel(event.startDate, event.endDate);
          return (
            <li key={event.id} className="border-b border-white/[0.04] last:border-0">
              <Link
                href={`/events/${event.slug}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white/90"
                  style={{
                    background:
                      event.status === "ongoing"
                        ? "linear-gradient(135deg, #6C6CF5, #3B2E8C)"
                        : "linear-gradient(135deg, #1c1a2e, #14121f)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  aria-hidden="true"
                >
                  {event.name.includes("Aurora") ? "AC" : "NLC"}
                </div>
                <span className="truncate text-sm font-medium text-white/90">
                  {event.name}
                </span>
                <span
                  className={`ml-auto shrink-0 text-xs ${
                    label === "now" ? "font-bold text-win" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
