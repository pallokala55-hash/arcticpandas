import TeamLogo from "@/components/ui/TeamLogo";
import { getTeam } from "@/data/teams";
import type { Match } from "@/data/types";
import { formatDate, formatTime } from "@/lib/format";

function Row({
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
    <div className="flex items-center gap-2.5 px-3 py-2">
      <TeamLogo team={team} size={22} />
      <span
        className={`truncate text-sm ${
          team
            ? finished && !won
              ? "text-muted"
              : "font-semibold text-white/95"
            : "text-xs italic text-muted"
        }`}
      >
        {team?.name ?? source ?? "TBD"}
      </span>
      {score !== undefined && (
        <span className={`ml-auto font-mono text-sm font-bold ${won ? "text-win" : "text-muted"}`}>
          {score}
        </span>
      )}
    </div>
  );
}

/**
 * One match inside the bracket tree. Undecided participants (team null)
 * render as TBD; a fully undecided match gets a dashed border.
 */
export default function BracketMatchCard({ match }: { match: Match }) {
  const finished = match.status === "completed";
  const live = match.status === "live";
  const isTbd = match.teamA === null || match.teamB === null;
  const aWon = finished && (match.scoreA ?? 0) > (match.scoreB ?? 0);

  return (
    <div className="w-60">
      <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-muted">
        <span>{formatDate(match.scheduledAt)}</span>
        <span className="flex items-center gap-2">
          {live && (
            <span className="flex items-center gap-1 font-bold text-loss">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-loss" />
              LIVE
            </span>
          )}
          {formatTime(match.scheduledAt)}
          <span className="rounded border border-white/10 px-1 font-semibold text-white/60">
            Bo{match.bestOf}
          </span>
        </span>
      </div>
      <div
        className={`divide-y divide-white/[0.05] rounded-xl bg-panel/90 backdrop-blur ${
          isTbd
            ? "border border-dashed border-white/20"
            : "border border-white/10"
        }`}
      >
        <Row
          teamId={match.teamA}
          source={match.sourceA}
          score={finished ? match.scoreA : undefined}
          won={aWon}
          finished={finished}
        />
        <Row
          teamId={match.teamB}
          source={match.sourceB}
          score={finished ? match.scoreB : undefined}
          won={finished && !aWon}
          finished={finished}
        />
      </div>
    </div>
  );
}
