const DAY_MS = 24 * 60 * 60 * 1000;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const opts = { month: "short", day: "numeric", timeZone: "UTC" } as const;
  const startStr = start.toLocaleDateString("en-GB", opts);
  const endStr = end.toLocaleDateString("en-GB", opts);
  const year = end.toLocaleDateString("en-GB", { year: "numeric", timeZone: "UTC" });
  return `${startStr} – ${endStr}, ${year}`;
}

/** "now" while ongoing, "in 8d" before start, "ended" after */
export function countdownLabel(
  startIso: string,
  endIso: string,
  now: Date = new Date(),
): string {
  const start = new Date(`${startIso}T00:00:00Z`).getTime();
  const end = new Date(`${endIso}T23:59:59Z`).getTime();
  const t = now.getTime();
  if (t >= start && t <= end) return "now";
  if (t < start) {
    const days = Math.ceil((start - t) / DAY_MS);
    return `in ${days}d`;
  }
  return "ended";
}
