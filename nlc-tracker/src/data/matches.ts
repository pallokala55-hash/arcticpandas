import type { Match } from "./types";

/**
 * NLC 2026 Summer ("nlc-summer-2026"):
 *  - Group stage: single round robin, Bo1, all 28 matches completed.
 *  - Playoffs: 4-team double elimination, Bo5, currently in progress.
 *
 * NLC Aurora Cup ("aurora-cup-2026"):
 *  - 8-team single elimination, Bo3. QFs scheduled, SFs and Final TBD.
 */

const gs = (
  n: number,
  date: string,
  a: string,
  b: string,
  winner: "a" | "b",
): Match => ({
  id: `nlc-su26-gs-${String(n).padStart(2, "0")}`,
  eventId: "nlc-summer-2026",
  stage: "group",
  bestOf: 1,
  scheduledAt: date,
  status: "completed",
  teamA: a,
  teamB: b,
  scoreA: winner === "a" ? 1 : 0,
  scoreB: winner === "b" ? 1 : 0,
});

export const matches: Match[] = [
  // ---- NLC Summer 2026, group stage (rounds weekly on Thursdays) ----
  // Round 1 — Jun 4
  gs(1, "2026-06-04T16:00:00Z", "ap", "msn", "a"),
  gs(2, "2026-06-04T17:00:00Z", "nly", "fjf", "b"),
  gs(3, "2026-06-04T18:00:00Z", "krk", "rvn", "a"),
  gs(4, "2026-06-04T19:00:00Z", "ims", "pvx", "b"),
  // Round 2 — Jun 11
  gs(5, "2026-06-11T16:00:00Z", "ap", "fjf", "a"),
  gs(6, "2026-06-11T17:00:00Z", "msn", "rvn", "a"),
  gs(7, "2026-06-11T18:00:00Z", "nly", "pvx", "a"),
  gs(8, "2026-06-11T19:00:00Z", "krk", "ims", "a"),
  // Round 3 — Jun 18
  gs(9, "2026-06-18T16:00:00Z", "ap", "rvn", "a"),
  gs(10, "2026-06-18T17:00:00Z", "fjf", "pvx", "b"),
  gs(11, "2026-06-18T18:00:00Z", "msn", "ims", "b"),
  gs(12, "2026-06-18T19:00:00Z", "nly", "krk", "b"),
  // Round 4 — Jun 25
  gs(13, "2026-06-25T16:00:00Z", "ap", "pvx", "a"),
  gs(14, "2026-06-25T17:00:00Z", "rvn", "ims", "a"),
  gs(15, "2026-06-25T18:00:00Z", "fjf", "krk", "b"),
  gs(16, "2026-06-25T19:00:00Z", "msn", "nly", "b"),
  // Round 5 — Jul 2
  gs(17, "2026-07-02T16:00:00Z", "ap", "ims", "b"),
  gs(18, "2026-07-02T17:00:00Z", "pvx", "krk", "a"),
  gs(19, "2026-07-02T18:00:00Z", "rvn", "nly", "b"),
  gs(20, "2026-07-02T19:00:00Z", "fjf", "msn", "a"),
  // Round 6 — Jul 9 (schedule compressed before playoffs)
  gs(21, "2026-07-06T16:00:00Z", "ap", "krk", "a"),
  gs(22, "2026-07-06T17:00:00Z", "ims", "nly", "b"),
  gs(23, "2026-07-06T18:00:00Z", "pvx", "msn", "a"),
  gs(24, "2026-07-06T19:00:00Z", "rvn", "fjf", "b"),
  // Round 7 — Jul 9
  gs(25, "2026-07-09T16:00:00Z", "ap", "nly", "a"),
  gs(26, "2026-07-09T17:00:00Z", "krk", "msn", "a"),
  gs(27, "2026-07-09T18:00:00Z", "ims", "fjf", "a"),
  gs(28, "2026-07-09T19:00:00Z", "pvx", "rvn", "a"),

  // ---- NLC Summer 2026, playoffs (double elimination, Bo5) ----
  // Final standings: 1. AP 6-1, 2. KRK 5-2, 3. PVX 5-2, 4. NLY 4-3
  {
    id: "nlc-su26-po-ubsf1",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-11T14:00:00Z",
    status: "completed",
    teamA: "ap",
    teamB: "nly",
    scoreA: 3,
    scoreB: 1,
  },
  {
    id: "nlc-su26-po-ubsf2",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-12T14:00:00Z",
    status: "completed",
    teamA: "krk",
    teamB: "pvx",
    scoreA: 3,
    scoreB: 2,
  },
  {
    id: "nlc-su26-po-lbr1",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-16T14:00:00Z",
    status: "completed",
    teamA: "nly",
    teamB: "pvx",
    scoreA: 2,
    scoreB: 3,
  },
  {
    id: "nlc-su26-po-ubf",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-18T14:00:00Z",
    status: "scheduled",
    teamA: "ap",
    teamB: "krk",
  },
  {
    id: "nlc-su26-po-lbf",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-19T14:00:00Z",
    status: "scheduled",
    teamA: "pvx",
    teamB: null,
    sourceB: "Loser of UB Final",
  },
  {
    id: "nlc-su26-po-gf",
    eventId: "nlc-summer-2026",
    stage: "playoffs",
    bestOf: 5,
    scheduledAt: "2026-07-26T14:00:00Z",
    status: "scheduled",
    teamA: null,
    teamB: null,
    sourceA: "Winner of UB Final",
    sourceB: "Winner of LB Final",
  },

  // ---- NLC Aurora Cup 2026, single elimination, Bo3 ----
  {
    id: "aurora26-qf1",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-14T13:00:00Z",
    status: "scheduled",
    teamA: "ap",
    teamB: "msn",
  },
  {
    id: "aurora26-qf2",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-14T16:00:00Z",
    status: "scheduled",
    teamA: "pvx",
    teamB: "fjf",
  },
  {
    id: "aurora26-qf3",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-15T13:00:00Z",
    status: "scheduled",
    teamA: "krk",
    teamB: "rvn",
  },
  {
    id: "aurora26-qf4",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-15T16:00:00Z",
    status: "scheduled",
    teamA: "nly",
    teamB: "ims",
  },
  {
    id: "aurora26-sf1",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-16T12:00:00Z",
    status: "scheduled",
    teamA: null,
    teamB: null,
    sourceA: "Winner of QF1",
    sourceB: "Winner of QF2",
  },
  {
    id: "aurora26-sf2",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-16T15:00:00Z",
    status: "scheduled",
    teamA: null,
    teamB: null,
    sourceA: "Winner of QF3",
    sourceB: "Winner of QF4",
  },
  {
    id: "aurora26-final",
    eventId: "aurora-cup-2026",
    stage: "playoffs",
    bestOf: 3,
    scheduledAt: "2026-08-16T18:00:00Z",
    status: "scheduled",
    teamA: null,
    teamB: null,
    sourceA: "Winner of SF1",
    sourceB: "Winner of SF2",
  },
];

export const matchesById = new Map(matches.map((m) => [m.id, m]));

export function getMatch(id: string): Match | undefined {
  return matchesById.get(id);
}

export function getEventMatches(eventId: string): Match[] {
  return matches.filter((m) => m.eventId === eventId);
}

export function getUpcomingMatches(): Match[] {
  return matches
    .filter((m) => m.status === "scheduled" || m.status === "live")
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
}

export function getRecentResults(): Match[] {
  return matches
    .filter((m) => m.status === "completed")
    .sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));
}
