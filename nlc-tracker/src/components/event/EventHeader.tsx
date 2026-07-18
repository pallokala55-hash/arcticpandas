import type { Event, StandingsRow } from "@/data/types";
import { formatDateRange } from "@/lib/format";

function HeaderStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-right">
      <p className="text-lg font-extrabold text-white">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

export default function EventHeader({
  event,
}: {
  event: Event;
  standings?: StandingsRow[];
}) {
  return (
    <section className="border-b border-white/[0.06] bg-gradient-to-b from-accent/[0.07] to-transparent">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-8 sm:px-6">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-[0_0_30px_rgba(108,108,245,0.35)]"
          style={{ background: "linear-gradient(135deg, #6C6CF5, #2b2364)" }}
          aria-hidden="true"
        >
          {event.name.includes("Aurora") ? "AC" : "NLC"}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-2xl font-extrabold text-white sm:text-3xl">
              {event.name}
            </h1>
            {event.status === "ongoing" && (
              <span className="rounded-md bg-win/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-win">
                Live
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted">
            {formatDateRange(event.startDate, event.endDate)}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-8">
          <HeaderStat value={String(event.teamIds.length)} label="Teams" />
          <HeaderStat value={event.prizePool} label="Prize" />
          <HeaderStat value={event.location} label="Location" />
        </div>
      </div>
    </section>
  );
}
