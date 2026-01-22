import {
  PlayerSchema,
  TeamSchema,
  GameSchema,
  ChampionsFileSchema,
  DragonsFileSchema,
  type Player,
  type Team,
  type Game,
  type Champion,
  type DragonRef,
} from "./schemas";

// Static imports for JSON data (Next.js compatible)
import nilleData from "./players/nille.json";
import dibuData from "./players/dibu.json";
import simpliData from "./players/simpli.json";
import kehvoData from "./players/kehvo.json";
import boltoxData from "./players/boltox.json";

import apTeamData from "./teams/ap.json";
import verTeamData from "./teams/ver.json";
import llsTeamData from "./teams/lls.json";
import foursbTeamData from "./teams/4sb.json";
import bombTeamData from "./teams/bomb.json";
import bdgTeamData from "./teams/bdg.json";

import game1Data from "./games/115762378910707629.json";
import game2Data from "./games/115762378910707655.json";
import game3Data from "./games/4sb-2026-01-22.json";

import championsData from "./lol/champions.json";
import dragonsData from "./lol/dragons.json";

// Parse and validate all data
const playerDataArray = [nilleData, dibuData, simpliData, kehvoData, boltoxData];
const teamDataArray = [apTeamData, verTeamData, llsTeamData, foursbTeamData, bombTeamData, bdgTeamData];
const gameDataArray = [game1Data, game2Data, game3Data];

// Load players into Map
export const players = new Map<string, Player>(
  playerDataArray.map((data) => {
    const player = PlayerSchema.parse(data);
    return [player.id, player];
  })
);

// Load teams into Map
export const teams = new Map<string, Team>(
  teamDataArray.map((data) => {
    const team = TeamSchema.parse(data);
    return [team.id, team];
  })
);

// Load and sort games
export const games: Game[] = gameDataArray
  .map((data) => GameSchema.parse(data))
  .sort((a, b) => b.date.localeCompare(a.date));

// Compute canonical slugs (simplest unique slug for each game)
function computeCanonicalSlugs(games: Game[]): { slugToGame: Map<string, Game>; gameToSlug: Map<string, string> } {
  const slugToGame = new Map<string, Game>();
  const gameToSlug = new Map<string, string>();
  const usedSlugs = new Set<string>();

  // First pass: find the simplest unique slug for each game
  for (const game of games) {
    for (const slug of game.slugs) {
      // Check if this slug is unique (not in another game's slugs)
      const isUnique = !games.some(
        (other) => other.id !== game.id && other.slugs.includes(slug)
      );

      if (isUnique && !usedSlugs.has(slug)) {
        gameToSlug.set(game.id, slug);
        usedSlugs.add(slug);
        break;
      }
    }

    // Fallback to game ID if no unique slug found
    if (!gameToSlug.has(game.id)) {
      gameToSlug.set(game.id, game.id);
      usedSlugs.add(game.id);
    }
  }

  // Second pass: map all slugs to their games (for redirects)
  for (const game of games) {
    for (const slug of game.slugs) {
      slugToGame.set(slug, game);
    }
    // Also map the game ID
    slugToGame.set(game.id, game);
  }

  return { slugToGame, gameToSlug };
}

const { slugToGame, gameToSlug } = computeCanonicalSlugs(games);

// Get canonical slug for a game
export function getGameSlug(gameId: string): string {
  return gameToSlug.get(gameId) ?? gameId;
}

// Get game by any valid slug
export function getGameBySlug(slug: string): Game | undefined {
  return slugToGame.get(slug);
}

// Get all valid slugs for redirects
export function getAllGameSlugs(): string[] {
  return Array.from(slugToGame.keys());
}

// Load LoL reference data
export const champions = ChampionsFileSchema.parse(championsData) as Record<string, Champion>;
export const dragons = DragonsFileSchema.parse(dragonsData) as Record<string, DragonRef>;

// Helper functions
export function getPlayer(id: string): Player | undefined {
  return players.get(id);
}

export function getTeam(id: string): Team | undefined {
  return teams.get(id);
}

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getPlayerGames(playerId: string): Game[] {
  return games.filter((game) =>
    game.teams.some((team) =>
      team.players.some((p) => p.playerId === playerId)
    )
  );
}

export function getTeamGames(teamId: string): Game[] {
  return games.filter((game) =>
    game.teams.some((team) => team.teamId === teamId)
  );
}

export function getTeamRecord(teamId: string): { wins: number; losses: number } {
  const teamGames = getTeamGames(teamId);
  let wins = 0;
  let losses = 0;
  for (const game of teamGames) {
    const teamPart = game.teams.find((t) => t.teamId === teamId);
    if (teamPart?.result === "win") wins++;
    if (teamPart?.result === "loss") losses++;
  }
  return { wins, losses };
}

// Re-export types
export type { Player, Team, Game, Champion, DragonRef } from "./schemas";
export type { PlayerParticipation, TeamParticipation, Role, DragonType } from "./schemas";

// ============================================================
// Compatibility exports for existing components
// ============================================================

// PlayerProfileData type compatible with old players.ts
export type PlayerProfileData = {
  slug: string;
  name: string;
  role: string;
  origin: string;
  image: string;
  headline: string;
  subtitle: string;
  bio: string;
  tags: string[];
  highlights: string[];
  playbook: string;
  peak: {
    tier: "grandmaster" | "challenger";
    text: string;
    opggUrl: string;
  };
};

// Convert Player to PlayerProfileData
function toPlayerProfileData(player: Player): PlayerProfileData {
  return {
    slug: player.id,
    name: player.name,
    role: player.role ?? "",
    origin: player.origin ?? "",
    image: player.photo ?? "",
    headline: player.realName ?? "",
    subtitle: player.subtitle ?? "",
    bio: player.bio ?? "",
    tags: player.tags ?? [],
    highlights: player.highlights ?? [],
    playbook: player.playbook ?? "",
    peak: player.peak ?? { tier: "grandmaster", text: "", opggUrl: "" },
  };
}

// Players array for generateStaticParams and similar
export const playersArray: PlayerProfileData[] = Array.from(players.values()).map(toPlayerProfileData);

// Players by slug lookup for page rendering
export const playersBySlug: Record<string, PlayerProfileData> = Object.fromEntries(
  playersArray.map((p) => [p.slug, p])
);

// RosterPlayer type compatible with old roster.ts
export type RosterPlayer = {
  name: string;
  slug: string;
  role: string;
  image: string;
  note: string;
};

// Roster order (explicit to maintain display order)
const rosterOrder = ["nille", "dibu", "simpli", "kehvo", "boltox"];

// Roster array for Team section
export const roster: RosterPlayer[] = rosterOrder
  .map((id) => players.get(id))
  .filter((p): p is Player => p !== undefined)
  .map((player) => ({
    name: player.name,
    slug: player.id,
    role: player.role?.replace(" Laner", "").replace("er", "") ?? "",
    image: player.photo ?? "",
    note: player.rosterNote ?? "",
  }));

// ============================================================
// Schedule compatibility (derived from games)
// ============================================================

export type MatchResult = "win" | "loss";

export type Match = {
  datetime: string;
  opponent: string;
  opponentShort: string;
  result: MatchResult | null;
  vodUrl: string | null;
  thumbnail?: string | null;
};

// Convert games to matches format
export const matches: Match[] = games
  .filter((game) => game.teams.some((t) => t.teamId === "ap"))
  .map((game) => {
    const apTeam = game.teams.find((t) => t.teamId === "ap")!;
    const opponent = game.teams.find((t) => t.teamId !== "ap")!;
    const opponentData = getTeam(opponent.teamId);

    return {
      datetime: `${game.date}T18:00:00Z`,
      opponent: opponentData?.name ?? opponent.teamId,
      opponentShort: opponentData?.code ?? opponent.teamId.toUpperCase(),
      result: apTeam.result as MatchResult,
      vodUrl: game.vods?.[0]?.url ?? null,
      thumbnail: null,
    };
  })
  .sort((a, b) => a.datetime.localeCompare(b.datetime));

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
  });
}

// ============================================================
// Matches page helpers
// ============================================================

// Get all AP games sorted by date (newest first)
export function getAPGames(): Game[] {
  return games
    .filter((game) => game.teams.some((t) => t.teamId === "ap"))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Get AP's team participation from a game
export function getAPTeam(game: Game) {
  return game.teams.find((t) => t.teamId === "ap")!;
}

// Get opponent's team participation from a game
export function getOpponentTeam(game: Game) {
  return game.teams.find((t) => t.teamId !== "ap")!;
}

// Check if a game was a perfect game (0 deaths for AP)
export function isPerfectGame(game: Game): boolean {
  const apTeam = getAPTeam(game);
  return apTeam.deaths === 0;
}

// Format duration in seconds to "mm:ss" string
export function formatDuration(seconds: number | undefined): string {
  if (!seconds) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Get season totals for AP
export function getSeasonTotals() {
  const apGames = getAPGames();
  let wins = 0;
  let losses = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;
  let barons = 0;
  let dragons = 0;

  for (const game of apGames) {
    const apTeam = getAPTeam(game);
    if (apTeam.result === "win") wins++;
    if (apTeam.result === "loss") losses++;
    kills += apTeam.kills ?? 0;
    deaths += apTeam.deaths ?? 0;
    barons += apTeam.barons ?? 0;
    dragons += apTeam.dragons?.length ?? 0;

    // Sum assists from players
    for (const player of apTeam.players) {
      assists += player.assists ?? 0;
    }
  }

  const kda = deaths > 0 ? (kills + assists) / deaths : kills + assists;

  return { wins, losses, kills, deaths, assists, kda, barons, dragons };
}

// Get player slug from esportsId (for linking to player profiles)
export function getPlayerSlug(esportsId: string | undefined): string | null {
  if (!esportsId) return null;

  for (const [slug, player] of players.entries()) {
    if (player.esportsIds?.lolesports === esportsId) {
      return slug;
    }
  }
  return null;
}

// Get player slug from playerId directly
export function getPlayerSlugFromId(playerId: string | null): string | null {
  if (!playerId) return null;
  return players.has(playerId) ? playerId : null;
}
