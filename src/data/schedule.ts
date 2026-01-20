import scheduleData from "./schedule.json";

export type MatchResult = "win" | "loss";

export type Match = {
  datetime: string;
  opponent: string;
  opponentShort: string;
  result: MatchResult | null;
  vodUrl: string | null;
  thumbnail?: string | null;
};

export const matches: Match[] = scheduleData.matches as Match[];

export function getLatestPlayedMatch(): Match | null {
  const played = matches.filter((m) => m.result !== null);
  return played.length > 0 ? played[played.length - 1] : null;
}

export function getUpcomingMatches(): Match[] {
  return matches.filter((m) => m.result === null);
}

export function formatMatchDate(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatMatchTime(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortGeneric",
  });
}
