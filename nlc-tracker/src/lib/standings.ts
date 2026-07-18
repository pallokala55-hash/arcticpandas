import type { Match, StandingsRow } from "@/data/types";

/**
 * Standings are always derived from match data — never stored.
 * This mirrors how the future backend will compute them from DB rows.
 */
export function computeStandings(
  matches: Match[],
  teamIds: string[],
): StandingsRow[] {
  const rows = new Map<string, StandingsRow & { results: ("W" | "L")[] }>();
  for (const id of teamIds) {
    rows.set(id, { teamId: id, played: 0, wins: 0, losses: 0, streak: "—", form: [], results: [] });
  }

  const completed = matches
    .filter((m) => m.stage === "group" && m.status === "completed")
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  for (const m of completed) {
    if (!m.teamA || !m.teamB) continue;
    const a = rows.get(m.teamA);
    const b = rows.get(m.teamB);
    if (!a || !b) continue;
    const aWon = (m.scoreA ?? 0) > (m.scoreB ?? 0);
    a.played++;
    b.played++;
    if (aWon) {
      a.wins++;
      b.losses++;
      a.results.push("W");
      b.results.push("L");
    } else {
      b.wins++;
      a.losses++;
      b.results.push("W");
      a.results.push("L");
    }
  }

  for (const row of rows.values()) {
    row.form = row.results.slice(-5);
    const last = row.results[row.results.length - 1];
    if (last) {
      let n = 0;
      for (let i = row.results.length - 1; i >= 0 && row.results[i] === last; i--) n++;
      row.streak = `${last}${n}`;
    }
  }

  return Array.from(rows.values())
    .map(({ results: _results, ...row }) => row)
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses || a.teamId.localeCompare(b.teamId));
}
