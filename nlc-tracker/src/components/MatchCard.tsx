import Link from "next/link";
import TeamLogo from "@/components/ui/TeamLogo";
import { getTeam } from "@/data/teams";
import { getEvent } from "@/data/events";
import type { Match } from "@/data/types";
import { formatDate, formatTime } from "@/lib/format";

type MatchCardProps = {
  match: Match;
  /** carousel = compact card for the home page rail; row = full-width list row */
  variant?: "carousel" | "row";
};

function TeamLine({
  teamId,
  source,
  score,
  won,
  finished,
}: {
  teamId: string | null;
  source?: string;
  score?: number;
  won: boolean;
  finished: boolean;
}) {
  const team = getTeam(teamId);
  return (
    <div className="flex items-center gap-2.5">
      <TeamLogo team={team} size={24} />
      <span
        className={`truncate text-sm ${
          team
            ? finished && !won
              ? "text-muted"
              : "font-medium text-white/95"
            : "italic text-muted"
        }`}
      >
        {team?.name ?? source ?? "TBD"}
      </span>
      {score !== undefined && (
        <span
          className={`ml-auto font-mono text-sm font-bold ${won ? "text-win" : "text-muted"}`}
        >
          {score}
        </span>
      )}
    </div>
  );
}

export default function MatchCard({ match, variant = "carousel" }: MatchCardProps) {
  const event = getEvent(match.eventId);
  const finished = match.status === "completed";
  const aWon = finished && (match.scoreA ?? 0) > (match.scoreB ?? 0);
  const bWon = finished && !aWon;

  const body = (
    <>
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2 text-[11px] text-muted">
        <span>
          {formatDate(match.scheduledAt)} · {formatTime(match.scheduledAt)}
        </span>
        <span className="rounded border border-white/10 px-1.5 py-0.5 font-semibold tracking-wide text-accent-soft">
          {event?.series ?? "NLC"}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-3.5 py-3">
        <TeamLine
          teamId={match.teamA}
          source={match.sourceA}
          score={finished ? match.scoreA : undefined}
          won={aWon}
          finished={finished}
        />
        <TeamLine
          teamId={match.teamB}
          source={match.sourceB}
          score={finished ? match.scoreB : undefined}
          won={bWon}
          finished={finished}
        />
      </div>
    </>
  );

  const width = variant === "carousel" ? "w-56 shrink-0" : "w-full";

  if (!event) {
    return <div className={`card ${width}`}>{body}</div>;
  }

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`card block transition-colors hover:border-accent/40 ${width}`}
    >
      {body}
    </Link>
  );
}
