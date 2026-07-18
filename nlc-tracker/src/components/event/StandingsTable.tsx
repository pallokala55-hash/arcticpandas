import TeamLogo from "@/components/ui/TeamLogo";
import { getTeam } from "@/data/teams";
import type { StandingsRow } from "@/data/types";

export default function StandingsTable({
  rows,
  playoffCutoff,
}: {
  rows: StandingsRow[];
  /** Top N qualify — draws the cutoff line */
  playoffCutoff?: number;
}) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-muted">
            <th className="py-2.5 pl-4 font-medium">#</th>
            <th className="font-medium">Team</th>
            <th className="text-right font-medium">W</th>
            <th className="text-right font-medium">L</th>
            <th className="hidden text-right font-medium sm:table-cell">Streak</th>
            <th className="hidden pr-4 text-right font-medium md:table-cell">Form</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const team = getTeam(row.teamId);
            const cutoff = playoffCutoff !== undefined && i === playoffCutoff - 1;
            return (
              <tr
                key={row.teamId}
                className={`border-t border-white/[0.04] transition-colors hover:bg-white/[0.03] ${
                  cutoff ? "border-b border-b-accent/40" : ""
                }`}
              >
                <td className="py-3 pl-4 font-mono text-muted">{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <TeamLogo team={team} size={28} />
                    <span className="font-semibold text-white/95">{team?.name}</span>
                    {playoffCutoff !== undefined && i < playoffCutoff && (
                      <span className="hidden rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-soft lg:inline">
                        Playoffs
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-right font-mono font-bold text-win">{row.wins}</td>
                <td className="text-right font-mono text-loss">{row.losses}</td>
                <td
                  className={`hidden text-right font-mono text-xs font-bold sm:table-cell ${
                    row.streak.startsWith("W") ? "text-win" : "text-loss"
                  }`}
                >
                  {row.streak}
                </td>
                <td className="hidden pr-4 md:table-cell">
                  <div className="flex justify-end gap-1">
                    {row.form.map((r, j) => (
                      <span
                        key={j}
                        className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                          r === "W" ? "bg-win/20 text-win" : "bg-loss/15 text-loss"
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
