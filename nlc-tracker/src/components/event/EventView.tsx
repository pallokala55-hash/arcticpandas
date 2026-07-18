"use client";

import { useState } from "react";
import Bracket from "./bracket/Bracket";
import StandingsTable from "./StandingsTable";
import MatchCard from "@/components/MatchCard";
import TeamLogo from "@/components/ui/TeamLogo";
import { getTeam } from "@/data/teams";
import { getTeamPlayers } from "@/data/players";
import type { Event, Match, StandingsRow } from "@/data/types";
import { formatDate, formatTime } from "@/lib/format";

const TABS = ["Overview", "Matches", "Teams", "Players", "Stats"] as const;
type Tab = (typeof TABS)[number];

type EventViewProps = {
  event: Event;
  matches: Match[];
  standings: StandingsRow[];
};

const ROLE_LABEL: Record<string, string> = {
  top: "Top",
  jungle: "Jungle",
  mid: "Mid",
  bot: "Bot",
  support: "Support",
};

function StageToggle({
  stage,
  setStage,
  hasGroup,
  hasPlayoffs,
}: {
  stage: "group" | "playoffs";
  setStage: (s: "group" | "playoffs") => void;
  hasGroup: boolean;
  hasPlayoffs: boolean;
}) {
  return (
    <div
      className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-panel-2 p-1"
      role="tablist"
      aria-label="Tournament stage"
    >
      <button
        type="button"
        role="tab"
        aria-selected={stage === "group"}
        disabled={!hasGroup}
        onClick={() => setStage("group")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${
          stage === "group" ? "bg-white/10 text-white" : "text-muted hover:text-white/80"
        }`}
      >
        Group Stage
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={stage === "playoffs"}
        disabled={!hasPlayoffs}
        onClick={() => setStage("playoffs")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${
          stage === "playoffs" ? "bg-white/10 text-white" : "text-muted hover:text-white/80"
        }`}
      >
        Playoffs
      </button>
    </div>
  );
}

export default function EventView({ event, matches, standings }: EventViewProps) {
  const hasGroup = matches.some((m) => m.stage === "group");
  const hasPlayoffs = event.bracket !== undefined;

  const [tab, setTab] = useState<Tab>("Overview");
  const [stage, setStage] = useState<"group" | "playoffs">(
    hasPlayoffs ? "playoffs" : "group",
  );

  const completedGames = matches.filter((m) => m.status === "completed").length;
  const upcomingGames = matches.filter((m) => m.status !== "completed").length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Tab bar */}
      <nav
        className="scroll-thin -mx-4 overflow-x-auto border-b border-white/[0.06] px-4 sm:mx-0 sm:px-0"
        aria-label="Event sections"
      >
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-current={tab === t ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t
                  ? "border-accent text-white"
                  : "border-transparent text-muted hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      {/* Overview: stage toggle + standings / bracket */}
      {tab === "Overview" && (
        <section className="py-8">
          <div className="card p-5">
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-accent-soft">
              TOURNAMENT STAGES
            </h3>
            <StageToggle
              stage={stage}
              setStage={setStage}
              hasGroup={hasGroup}
              hasPlayoffs={hasPlayoffs}
            />

            <div className="mt-8">
              {stage === "group" && hasGroup && (
                <>
                  {event.format.group && (
                    <p className="mb-4 text-xs text-muted">{event.format.group}</p>
                  )}
                  <StandingsTable rows={standings} playoffCutoff={4} />
                </>
              )}
              {stage === "playoffs" &&
                (event.bracket ? (
                  <>
                    {event.format.playoffs && (
                      <p className="mb-6 text-xs text-muted">{event.format.playoffs}</p>
                    )}
                    <Bracket bracket={event.bracket} />
                  </>
                ) : (
                  <p className="py-8 text-center text-sm text-muted">
                    Bracket will be published once the group stage ends.
                  </p>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Matches */}
      {tab === "Matches" && (
        <section className="grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...matches]
            .sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt))
            .map((m) => (
              <MatchCard key={m.id} match={m} variant="row" />
            ))}
        </section>
      )}

      {/* Teams */}
      {tab === "Teams" && (
        <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {event.teamIds.map((id) => {
            const team = getTeam(id);
            const row = standings.find((r) => r.teamId === id);
            if (!team) return null;
            return (
              <div key={id} className="card flex items-center gap-4 p-4">
                <TeamLogo team={team} size={44} />
                <div className="min-w-0">
                  <p className="truncate font-bold text-white/95">{team.name}</p>
                  <p className="text-xs text-muted">
                    {team.region}
                    {row && (
                      <>
                        {" · "}
                        <span className="text-win">{row.wins}W</span>{" "}
                        <span className="text-loss">{row.losses}L</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Players */}
      {tab === "Players" && (
        <section className="py-8">
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-muted">
                  <th className="py-2.5 pl-4 font-medium">Player</th>
                  <th className="font-medium">Team</th>
                  <th className="font-medium">Role</th>
                  <th className="pr-4 text-right font-medium">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {event.teamIds.flatMap((teamId) =>
                  getTeamPlayers(teamId).map((p) => {
                    const team = getTeam(teamId);
                    return (
                      <tr
                        key={p.id}
                        className="border-t border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                      >
                        <td className="py-2.5 pl-4 font-semibold text-white/95">
                          {p.handle}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <TeamLogo team={team} size={20} />
                            <span className="text-muted">{team?.code}</span>
                          </div>
                        </td>
                        <td className="text-white/80">{ROLE_LABEL[p.role]}</td>
                        <td className="pr-4 text-right font-mono text-xs text-muted">
                          {p.nationality}
                        </td>
                      </tr>
                    );
                  }),
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Stats */}
      {tab === "Stats" && (
        <section className="py-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card card-glow p-5 text-center">
              <p className="text-3xl font-black text-white">{completedGames}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                Matches played
              </p>
            </div>
            <div className="card card-glow p-5 text-center">
              <p className="text-3xl font-black text-white">{upcomingGames}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                Matches remaining
              </p>
            </div>
            <div className="card card-glow p-5 text-center">
              <p className="text-3xl font-black text-white">
                {standings[0] ? getTeam(standings[0].teamId)?.code : "—"}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                Best regular season
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Per-game player statistics arrive with the Riot API integration.
          </p>
          {matches
            .filter((m) => m.status !== "completed")
            .slice(0, 1)
            .map((m) => (
              <p key={m.id} className="mt-2 text-center text-xs text-muted">
                Next match: {formatDate(m.scheduledAt)} at {formatTime(m.scheduledAt)}
              </p>
            ))}
        </section>
      )}
    </div>
  );
}
