import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/data/events";
import { formatDateRange, countdownLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-black text-white">Events</h1>
      <div className="mt-8 flex flex-col gap-4">
        {events.map((event) => {
          const label = countdownLabel(event.startDate, event.endDate);
          return (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="card card-glow flex flex-wrap items-center gap-5 p-5 transition-colors hover:border-accent/40"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
                style={{ background: "linear-gradient(135deg, #6C6CF5, #2b2364)" }}
                aria-hidden="true"
              >
                {event.name.includes("Aurora") ? "AC" : "NLC"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-white">{event.name}</p>
                <p className="text-sm text-muted">
                  {formatDateRange(event.startDate, event.endDate)} · {event.location}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-6 text-sm">
                <span className="text-muted">{event.teamIds.length} teams</span>
                <span className="font-semibold text-gold">{event.prizePool}</span>
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                    label === "now"
                      ? "bg-win/15 text-win"
                      : label === "ended"
                        ? "bg-white/5 text-muted"
                        : "bg-accent/15 text-accent-soft"
                  }`}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
