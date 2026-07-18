"use client";

import { useState } from "react";
import TeamLogo from "@/components/ui/TeamLogo";
import TierBadge from "@/components/ui/TierBadge";
import { leaderboard } from "@/data/leaderboard";
import { getPlayer } from "@/data/players";
import { getTeam } from "@/data/teams";
import type { StandingsRow } from "@/data/types";

type LeaderboardCardProps = {
  standings: StandingsRow[];
};

function Delta({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={`text-[11px] font-semibold ${positive ? "text-win" : "text-loss"}`}>
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export default function LeaderboardCard({ standings }: LeaderboardCardProps) {
  const [tab, setTab] = useState<"players" | "teams">("players");

  return (
    <section className="card card-glow">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-xs font-bold tracking-[0.2em] text-accent-soft">
          LADDER LEADERBOARD
        </h2>
        <div
          className="flex rounded-lg border border-white/10 bg-panel-2 p-0.5 text-xs font-semibold"
          role="tablist"
          aria-label="Leaderboard type"
        >
          {(["players", "teams"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 uppercase tracking-wide transition-colors ${
                tab === t ? "bg-white/10 text-white" : "text-muted hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "players" ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-muted">
              <th className="py-2 pl-4 font-medium">#</th>
              <th className="font-medium">Player</th>
              <th className="font-medium">Tier</th>
              <th className="pr-4 text-right font-medium">Winrate</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => {
              const player = getPlayer(entry.playerId);
              const team = player ? getTeam(player.teamId) : undefined;
              return (
                <tr
                  key={entry.playerId}
                  className="border-t border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                >
                  <td className="py-2.5 pl-4 font-mono text-muted">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <TeamLogo team={team} size={26} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white/95">
                          {player?.handle}
                        </p>
                        <p className="text-[11px] text-muted">{team?.code}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <TierBadge tier={entry.tier} />
                      <span className="font-mono text-xs text-white/80">
                        {entry.lp} LP
                      </span>
                    </div>
                  </td>
                  <td className="pr-4 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-1">
                      <span className="font-bold text-white/90">{entry.winrate}%</span>
                      <Delta value={entry.delta} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-muted">
              <th className="py-2 pl-4 font-medium">#</th>
              <th className="font-medium">Team</th>
              <th className="text-right font-medium">W–L</th>
              <th className="pr-4 text-right font-medium">Streak</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, i) => {
              const team = getTeam(row.teamId);
              return (
                <tr
                  key={row.teamId}
                  className="border-t border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                >
                  <td className="py-2.5 pl-4 font-mono text-muted">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <TeamLogo team={team} size={26} />
                      <span className="font-semibold text-white/95">{team?.name}</span>
                    </div>
                  </td>
                  <td className="text-right font-mono text-white/85">
                    {row.wins}–{row.losses}
                  </td>
                  <td
                    className={`pr-4 text-right font-mono text-xs font-bold ${
                      row.streak.startsWith("W") ? "text-win" : "text-loss"
                    }`}
                  >
                    {row.streak}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
