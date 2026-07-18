import type { LeaderboardEntry, PlayerOfMonth } from "./types";

/** Solo queue ladder snapshot (home page leaderboard card) */
export const leaderboard: LeaderboardEntry[] = [
  { playerId: "simpli", tier: "challenger", lp: 1412, winrate: 58, delta: 2.1, games: 312 },
  { playerId: "maelstrom", tier: "challenger", lp: 1287, winrate: 56, delta: 0.8, games: 401 },
  { playerId: "nille", tier: "challenger", lp: 1104, winrate: 55, delta: -0.4, games: 288 },
  { playerId: "zerodeg", tier: "grandmaster", lp: 968, winrate: 54, delta: 1.5, games: 350 },
  { playerId: "kehvo", tier: "grandmaster", lp: 911, winrate: 55, delta: 0.2, games: 297 },
  { playerId: "lumen", tier: "grandmaster", lp: 874, winrate: 53, delta: -1.2, games: 366 },
  { playerId: "harpoon", tier: "master", lp: 512, winrate: 52, delta: 0.6, games: 240 },
  { playerId: "dibu", tier: "master", lp: 448, winrate: 54, delta: 1.9, games: 205 },
];

export const playerOfTheMonth: PlayerOfMonth = {
  playerId: "simpli",
  month: "July 2026",
  summary: "Highest damage share and KDA of the playoffs so far.",
  statLabel: "Match rating, last 6 games",
  bars: [
    { label: "G1", value: 72 },
    { label: "G2", value: 66 },
    { label: "G3", value: 78 },
    { label: "G4", value: 84 },
    { label: "G5", value: 91 },
    { label: "G6", value: 80 },
  ],
};
