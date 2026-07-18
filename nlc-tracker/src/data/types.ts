/**
 * Data model for the NLC tracker.
 *
 * These types mirror the future database schema. All UI renders purely from
 * this data — components must never hardcode teams, matches or bracket
 * structure. A future admin panel will edit the same shapes.
 */

// ---------------------------------------------------------------------------
// Teams & players
// ---------------------------------------------------------------------------

export type TeamId = string;
export type PlayerId = string;
export type EventId = string;
export type MatchId = string;

export interface Team {
  id: TeamId;
  name: string;
  code: string; // short tag, e.g. "AP"
  region: string;
  /** Placeholder logo: gradient tile until real logo uploads exist */
  colors: { from: string; to: string };
}

export type Role = "top" | "jungle" | "mid" | "bot" | "support";

export interface Player {
  id: PlayerId;
  handle: string;
  realName?: string;
  teamId: TeamId;
  role: Role;
  nationality: string; // ISO-3166 alpha-2
}

// ---------------------------------------------------------------------------
// Events (tournaments / splits)
// ---------------------------------------------------------------------------

export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface Event {
  id: EventId;
  slug: string;
  name: string;
  series: string; // e.g. "NLC 2026"
  status: EventStatus;
  startDate: string; // ISO date
  endDate: string; // ISO date
  location: string;
  prizePool: string;
  teamIds: TeamId[];
  format: {
    group?: string; // human description, e.g. "Single round robin, Bo1"
    playoffs?: string; // e.g. "4-team double elimination, Bo5"
  };
  bracket?: Bracket;
}

// ---------------------------------------------------------------------------
// Matches
// ---------------------------------------------------------------------------

export type MatchStatus = "scheduled" | "live" | "completed";
export type Stage = "group" | "playoffs";

export interface Match {
  id: MatchId;
  eventId: EventId;
  stage: Stage;
  bestOf: 1 | 3 | 5;
  scheduledAt: string; // ISO datetime (UTC)
  status: MatchStatus;
  /** null = participant not decided yet (TBD) */
  teamA: TeamId | null;
  teamB: TeamId | null;
  /** Label shown on TBD slots, e.g. "Winner of UB Final" */
  sourceA?: string;
  sourceB?: string;
  scoreA?: number;
  scoreB?: number;
}

// ---------------------------------------------------------------------------
// Brackets
// ---------------------------------------------------------------------------

export type BracketType = "single" | "double";
export type BracketGrid = "upper" | "lower" | "final";

export interface BracketColumnDef {
  id: string;
  title: string; // e.g. "UB Semifinals"
  /** Which row of the layout the column belongs to (double elim) */
  grid: BracketGrid;
  /** Horizontal position (0-based). Lets lower-bracket columns align under
   *  the correct upper-bracket round without hardcoding layout in components. */
  order: number;
  matchIds: MatchId[];
}

export interface Bracket {
  type: BracketType;
  columns: BracketColumnDef[];
}

// ---------------------------------------------------------------------------
// News, activity, leaderboards (home page content)
// ---------------------------------------------------------------------------

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  featured?: boolean;
  /** Placeholder hero image: CSS gradient until image uploads exist */
  gradient: string;
}

export type ActivityType = "result" | "transfer" | "news" | "forum";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  text: string;
  time: string; // relative label for mock ("2h ago")
  comments?: number;
  highlight?: boolean; // left accent bar in the list
}

export type Tier =
  | "challenger"
  | "grandmaster"
  | "master"
  | "diamond"
  | "emerald";

export interface LeaderboardEntry {
  playerId: PlayerId;
  tier: Tier;
  lp: number;
  winrate: number; // 0..100
  delta: number; // winrate change, percentage points
  games: number;
}

export interface PlayerOfMonth {
  playerId: PlayerId;
  month: string;
  summary: string;
  statLabel: string; // what the bars measure
  bars: { label: string; value: number }[];
}

// ---------------------------------------------------------------------------
// Derived (computed, not stored — future DB view)
// ---------------------------------------------------------------------------

export interface StandingsRow {
  teamId: TeamId;
  played: number;
  wins: number;
  losses: number;
  streak: string; // e.g. "W3"
  form: ("W" | "L")[]; // last 5, newest last
}
