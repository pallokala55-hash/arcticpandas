import { playerOfTheMonth } from "@/data/leaderboard";
import { getPlayer } from "@/data/players";
import { getTeam } from "@/data/teams";
import TeamLogo from "@/components/ui/TeamLogo";

export default function PlayerOfMonth() {
  const player = getPlayer(playerOfTheMonth.playerId);
  const team = player ? getTeam(player.teamId) : undefined;
  const max = Math.max(...playerOfTheMonth.bars.map((b) => b.value));
  const avg = Math.round(
    playerOfTheMonth.bars.reduce((s, b) => s + b.value, 0) /
      playerOfTheMonth.bars.length,
  );

  return (
    <section className="card card-glow p-4">
      <h2 className="text-xs font-bold tracking-[0.2em] text-accent-soft">
        PLAYER OF THE MONTH
      </h2>

      <div className="mt-3 flex items-center gap-4">
        <div>
          <p className="text-4xl font-black text-white">{avg}</p>
          <p className="text-[11px] text-muted">Avg rating · {playerOfTheMonth.month}</p>
          <div className="mt-2 flex items-center gap-2">
            <TeamLogo team={team} size={20} />
            <span className="text-sm font-semibold text-white/90">
              {player?.handle ?? playerOfTheMonth.playerId}
            </span>
          </div>
        </div>
        {/* Portrait placeholder until player photos exist */}
        <div
          className="ml-auto h-20 w-20 shrink-0 rounded-xl border border-white/10"
          style={{
            background: team
              ? `linear-gradient(160deg, ${team.colors.from}33, ${team.colors.to}66)`
              : undefined,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bar chart */}
      <div className="mt-4 flex h-28 items-end gap-2" role="img" aria-label={playerOfTheMonth.statLabel}>
        {playerOfTheMonth.bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
            <span className="rounded-md bg-win/15 px-1.5 py-0.5 text-[10px] font-bold text-win">
              {bar.value}
            </span>
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-accent/25 to-accent/70"
              style={{ height: `${(bar.value / max) * 72}px` }}
            />
            <span className="text-[10px] text-muted">{bar.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">{playerOfTheMonth.summary}</p>
    </section>
  );
}
