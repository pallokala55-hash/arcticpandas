import fs from "fs";
import path from "path";
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

const dataDir = path.join(process.cwd(), "src/data");

function loadJsonFiles<T>(dir: string, schema: { parse: (data: unknown) => T }): Map<string, T> {
  const result = new Map<string, T>();
  const fullPath = path.join(dataDir, dir);

  if (!fs.existsSync(fullPath)) return result;

  for (const file of fs.readdirSync(fullPath)) {
    if (!file.endsWith(".json")) continue;
    const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), "utf-8"));
    const parsed = schema.parse(content);
    const id = (parsed as { id: string }).id;
    result.set(id, parsed);
  }
  return result;
}

function loadGames(): Game[] {
  const gamesPath = path.join(dataDir, "games");
  if (!fs.existsSync(gamesPath)) return [];

  const games: Game[] = [];
  for (const file of fs.readdirSync(gamesPath)) {
    if (!file.endsWith(".json")) continue;
    const content = JSON.parse(fs.readFileSync(path.join(gamesPath, file), "utf-8"));
    games.push(GameSchema.parse(content));
  }
  return games.sort((a, b) => b.date.localeCompare(a.date));
}

function loadLolData<T>(file: string, schema: { parse: (data: unknown) => T }): T {
  const filePath = path.join(dataDir, "lol", file);
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return schema.parse(content);
}

// Load all data
export const players = loadJsonFiles<Player>("players", PlayerSchema);
export const teams = loadJsonFiles<Team>("teams", TeamSchema);
export const games = loadGames();
export const champions = loadLolData<Record<string, Champion>>("champions.json", ChampionsFileSchema);
export const dragons = loadLolData<Record<string, DragonRef>>("dragons.json", DragonsFileSchema);

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
