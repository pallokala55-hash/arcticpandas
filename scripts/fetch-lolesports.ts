/**
 * Fetch Arctic Pandas match data from LoL Esports API
 *
 * API Endpoints:
 * - esports-api.lolesports.com/persisted/gw/getVods - tournament schedule & VODs
 * - feed.lolesports.com/livestats/v1/window/{gameId} - team-level game stats
 * - feed.lolesports.com/livestats/v1/details/{gameId} - player-level detailed stats
 *
 * Notes:
 * - Timestamps must be evenly divisible by 10 seconds
 * - Request game end by fetching with timestamp 1 hour after start
 */

const API_KEY = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z";
const NLC_TOURNAMENT_ID = "115762368780361599";
const ARCTIC_PANDAS_ID = "115848475436772149";

// ============ API Types ============

interface Team {
  name: string;
  code: string;
  image: string;
  result: { gameWins: number };
}

interface Game {
  id: string;
  state: string;
}

interface MatchEvent {
  startTime: string;
  state: string;
  blockName: string;
  match: {
    id: string;
    teams: Team[];
    strategy: { type: string; count: number };
  };
  games: Game[];
}

interface ParticipantMetadata {
  participantId: number;
  esportsPlayerId: string;
  summonerName: string;
  championId: string;
  role: string;
}

interface TeamMetadata {
  esportsTeamId: string;
  participantMetadata: ParticipantMetadata[];
}

interface ParticipantWindowStats {
  participantId: number;
  totalGold: number;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  creepScore: number;
  currentHealth: number;
  maxHealth: number;
}

interface TeamWindowStats {
  totalGold: number;
  totalKills: number;
  towers: number;
  dragons: string[];
  barons: number;
  inhibitors: number;
  participants: ParticipantWindowStats[];
}

interface WindowFrame {
  rfc460Timestamp: string;
  gameState: string;
  blueTeam: TeamWindowStats;
  redTeam: TeamWindowStats;
}

interface LivestatsWindow {
  esportsGameId: string;
  esportsMatchId: string;
  gameMetadata: {
    patchVersion: string;
    blueTeamMetadata: TeamMetadata;
    redTeamMetadata: TeamMetadata;
  };
  frames: WindowFrame[];
}

interface ParticipantDetailStats {
  participantId: number;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  totalGoldEarned: number;
  creepScore: number;
  killParticipation: number;
  championDamageShare: number;
  wardsPlaced: number;
  wardsDestroyed: number;
  attackDamage: number;
  abilityPower: number;
  criticalChance: number;
  attackSpeed: number;
  lifeSteal: number;
  armor: number;
  magicResistance: number;
  tenacity: number;
  items: number[];
  perkMetadata: {
    styleId: number;
    subStyleId: number;
    perks: number[];
  };
  abilities: string[];
}

interface DetailFrame {
  rfc460Timestamp: string;
  participants: ParticipantDetailStats[];
}

interface LivestatsDetails {
  frames: DetailFrame[];
}

// ============ Output Types (new normalized format) ============

// Map of esportsId -> playerId for AP players
const AP_PLAYER_IDS: Record<string, string> = {
  "103877885177694021": "nille",
  "103935622852857101": "dibu",
  "105519573596232348": "simpli",
  "105519570521259934": "kehvo",
  "112440590902095873": "boltox",
};

// Map of esportsId -> teamId
const TEAM_IDS: Record<string, string> = {
  "115848475436772149": "ap",
  "107565477822627354": "ver",
  "107565473980214294": "lls",
};

interface PerkMetadata {
  styleId: number;
  subStyleId: number;
  perks: number[];
}

interface PlayerParticipation {
  playerId: string | null;
  name: string;
  role: string;
  champion: string;
  kills?: number;
  deaths?: number;
  assists?: number;
  cs?: number;
  gold?: number;
  level?: number;
  items?: number[];
  kp?: number;
  dmgShare?: number;
  wardsPlaced?: number;
  wardsDestroyed?: number;
  perks?: PerkMetadata;
  abilities?: string[];
}

interface TeamParticipation {
  teamId: string;
  side: "blue" | "red";
  result: "win" | "loss";
  kills?: number;
  deaths?: number;
  gold?: number;
  towers?: number;
  inhibitors?: number;
  dragons?: string[];
  barons?: number;
  players: PlayerParticipation[];
}

interface Vod {
  url: string;
  label: string;
}

interface GameData {
  id: string;
  date: string;
  patch?: string;
  duration?: number;
  durationRealtime?: number;
  tournament?: {
    name: string;
    stage?: string;
  };
  vods?: Vod[];
  teams: [TeamParticipation, TeamParticipation];
}

// ============ API Functions ============

async function fetchWithApiKey(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { "x-api-key": API_KEY },
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function getSchedule(): Promise<MatchEvent[]> {
  const url = `https://esports-api.lolesports.com/persisted/gw/getVods?hl=en-GB&tournamentId=${NLC_TOURNAMENT_ID}`;
  const data = (await fetchWithApiKey(url)) as { data: { schedule: { events: MatchEvent[] } } };
  return data.data.schedule.events;
}

async function getWindowStats(gameId: string, startTime?: string): Promise<LivestatsWindow | null> {
  let url = `https://feed.lolesports.com/livestats/v1/window/${gameId}`;
  if (startTime) {
    url += `?startingTime=${startTime}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json() as Promise<LivestatsWindow>;
  } catch {
    return null;
  }
}

async function getDetailStats(gameId: string, startTime: string, participantIds: string): Promise<LivestatsDetails | null> {
  const url = `https://feed.lolesports.com/livestats/v1/details/${gameId}?startingTime=${startTime}&participantIds=${participantIds}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json() as Promise<LivestatsDetails>;
  } catch {
    return null;
  }
}

function roundTimestamp(date: Date): string {
  const roundedMs = Math.floor(date.getTime() / 10000) * 10000;
  return new Date(roundedMs).toISOString();
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ============ Main Logic ============

const VALID_ROLES = new Set(["top", "jungle", "mid", "bottom", "support"]);

function normalizeRole(role: string): string {
  const lower = role.toLowerCase();
  return VALID_ROLES.has(lower) ? lower : lower;
}

async function fetchGameData(gameId: string, oppTeamId?: string): Promise<GameData | null> {
  // Get base window stats (includes game start timestamp and metadata)
  const baseWindow = await getWindowStats(gameId);
  if (!baseWindow || !baseWindow.frames.length) {
    console.log(`  No base data for game ${gameId}`);
    return null;
  }

  const startFrame = baseWindow.frames[0];
  const gameStart = new Date(startFrame.rfc460Timestamp);

  // Get end-game window stats
  const endTime = roundTimestamp(new Date(gameStart.getTime() + 60 * 60 * 1000));
  const endWindow = await getWindowStats(gameId, endTime);
  if (!endWindow || !endWindow.frames.length) {
    console.log(`  No end data for game ${gameId}`);
    return null;
  }

  const endFrame = endWindow.frames[endWindow.frames.length - 1];
  const gameEnd = new Date(endFrame.rfc460Timestamp);

  // Get detailed player stats at end of game
  const allParticipantIds = "1_2_3_4_5_6_7_8_9_10";
  const detailStats = await getDetailStats(gameId, endTime, allParticipantIds);

  // Build participant detail map
  const detailMap = new Map<number, ParticipantDetailStats>();
  if (detailStats && detailStats.frames.length > 0) {
    const lastDetailFrame = detailStats.frames[detailStats.frames.length - 1];
    for (const p of lastDetailFrame.participants) {
      detailMap.set(p.participantId, p);
    }
  }

  // Determine which side AP is on
  const apIsBlue = baseWindow.gameMetadata.blueTeamMetadata.esportsTeamId === ARCTIC_PANDAS_ID;

  const blueMetadata = baseWindow.gameMetadata.blueTeamMetadata;
  const redMetadata = baseWindow.gameMetadata.redTeamMetadata;
  const blueStats = endFrame.blueTeam;
  const redStats = endFrame.redTeam;

  // Build player participation in new format
  function buildPlayerParticipation(metadata: ParticipantMetadata, windowStats: ParticipantWindowStats, isApTeam: boolean): PlayerParticipation {
    const detail = detailMap.get(metadata.participantId);
    const playerId = isApTeam ? (AP_PLAYER_IDS[metadata.esportsPlayerId] ?? null) : null;

    const player: PlayerParticipation = {
      playerId,
      name: metadata.summonerName,
      role: normalizeRole(metadata.role),
      champion: metadata.championId,
      kills: windowStats.kills,
      deaths: windowStats.deaths,
      assists: windowStats.assists,
      cs: windowStats.creepScore,
      gold: windowStats.totalGold,
      level: windowStats.level,
    };

    if (detail?.items?.length) {
      player.items = detail.items;
    }
    if (detail?.killParticipation !== undefined) {
      player.kp = Math.round(detail.killParticipation * 100) / 100;
    }
    if (detail?.championDamageShare !== undefined) {
      player.dmgShare = Math.round(detail.championDamageShare * 100) / 100;
    }
    if (detail?.wardsPlaced !== undefined) {
      player.wardsPlaced = detail.wardsPlaced;
    }
    if (detail?.wardsDestroyed !== undefined) {
      player.wardsDestroyed = detail.wardsDestroyed;
    }
    if (detail?.perkMetadata) {
      player.perks = {
        styleId: detail.perkMetadata.styleId,
        subStyleId: detail.perkMetadata.subStyleId,
        perks: detail.perkMetadata.perks,
      };
    }
    if (detail?.abilities?.length) {
      player.abilities = detail.abilities;
    }

    return player;
  }

  function buildTeamParticipation(
    metadata: TeamMetadata,
    windowStats: TeamWindowStats,
    side: "blue" | "red",
    isApTeam: boolean,
    result: "win" | "loss"
  ): TeamParticipation {
    const players = metadata.participantMetadata.map((pm) => {
      const pw = windowStats.participants.find((p) => p.participantId === pm.participantId)!;
      return buildPlayerParticipation(pm, pw, isApTeam);
    });

    const kills = players.reduce((sum, p) => sum + (p.kills ?? 0), 0);
    const deaths = players.reduce((sum, p) => sum + (p.deaths ?? 0), 0);

    // Get team ID from mapping or use provided oppTeamId
    let teamId: string;
    if (isApTeam) {
      teamId = "ap";
    } else {
      teamId = TEAM_IDS[metadata.esportsTeamId] ?? oppTeamId ?? metadata.esportsTeamId;
    }

    return {
      teamId,
      side,
      result,
      kills,
      deaths,
      gold: windowStats.totalGold,
      towers: windowStats.towers,
      inhibitors: windowStats.inhibitors,
      dragons: windowStats.dragons.map(d => d.toLowerCase()),
      barons: windowStats.barons,
      players,
    };
  }

  const durationSeconds = Math.round((gameEnd.getTime() - gameStart.getTime()) / 1000);

  // Determine winner
  const blueKills = blueStats.participants.reduce((sum, p) => sum + p.kills, 0);
  const redKills = redStats.participants.reduce((sum, p) => sum + p.kills, 0);
  const blueWon = blueKills > redKills || (blueKills === redKills && blueStats.totalGold > redStats.totalGold);

  const apWon = apIsBlue ? blueWon : !blueWon;

  const apTeam = apIsBlue
    ? buildTeamParticipation(blueMetadata, blueStats, "blue", true, apWon ? "win" : "loss")
    : buildTeamParticipation(redMetadata, redStats, "red", true, apWon ? "win" : "loss");

  const oppTeam = apIsBlue
    ? buildTeamParticipation(redMetadata, redStats, "red", false, apWon ? "loss" : "win")
    : buildTeamParticipation(blueMetadata, blueStats, "blue", false, apWon ? "loss" : "win");

  return {
    id: gameId,
    date: gameStart.toISOString().split("T")[0],
    patch: baseWindow.gameMetadata.patchVersion,
    duration: durationSeconds,
    durationRealtime: durationSeconds,
    tournament: {
      name: "NLC 2026 Winter",
      stage: "Regular Season",
    },
    teams: [apTeam, oppTeam],
  };
}

// Map of opponent code -> teamId
const OPP_TEAM_IDS: Record<string, string> = {
  VER: "ver",
  LLS: "lls",
  "4S&B": "4sb",
  BOMB: "bomb",
  BDG: "bdg",
};

import { generateGameSlugs } from "../src/data/slugs";

async function main() {
  console.log("Fetching NLC 2026 Winter schedule...\n");

  const events = await getSchedule();

  // Filter to Arctic Pandas matches
  const apMatches = events.filter((event) =>
    event.match.teams.some((team) => team.code === "AP" || team.name === "Arctic Pandas")
  );

  console.log(`Found ${apMatches.length} Arctic Pandas matches\n`);

  const allGameData: GameData[] = [];

  for (const match of apMatches) {
    const opponent = match.match.teams.find((t) => t.code !== "AP")!;
    const oppTeamId = OPP_TEAM_IDS[opponent.code] ?? opponent.code.toLowerCase();
    console.log(`Processing: ${match.startTime.split("T")[0]} vs ${opponent.name}`);

    for (const game of match.games) {
      if (game.state !== "completed") continue;

      const data = await fetchGameData(game.id, oppTeamId);
      if (data) {
        allGameData.push(data);
        const apTeam = data.teams.find(t => t.teamId === "ap")!;
        const oppTeam = data.teams.find(t => t.teamId !== "ap")!;
        console.log(`  ✓ ${apTeam.kills}-${oppTeam.kills} (${formatDuration(data.duration ?? 0)})`);
      }
    }
  }

  console.log("\n=== Summary ===\n");
  for (const game of allGameData) {
    const apTeam = game.teams.find(t => t.teamId === "ap")!;
    const oppTeam = game.teams.find(t => t.teamId !== "ap")!;
    console.log(`${game.date} vs ${oppTeam.teamId}`);
    console.log(`  ${apTeam.result.toUpperCase()} | ${apTeam.kills}-${oppTeam.kills} | ${formatDuration(game.duration ?? 0)}`);
    console.log(`  Players:`);
    for (const p of apTeam.players) {
      const kp = p.kp !== undefined ? `${Math.round(p.kp * 100)}% KP` : "";
      console.log(`    ${p.role.padEnd(7)} ${p.name.padEnd(12)} ${p.champion.padEnd(10)} ${p.kills ?? 0}/${p.deaths ?? 0}/${p.assists ?? 0} ${kp}`);
    }
    console.log();
  }

  // Write individual game files
  const fs = await import("fs");
  const path = await import("path");
  const gamesDir = path.join(process.cwd(), "src/data/games");

  console.log("=== Writing game files ===\n");
  for (const game of allGameData) {
    const filePath = path.join(gamesDir, `${game.id}.json`);

    // Preserve existing slugs/vods if file exists
    let existingSlugs: string[] | undefined;
    let existingVods: Vod[] | undefined;
    if (fs.existsSync(filePath)) {
      try {
        const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        existingSlugs = existing.slugs;
        existingVods = existing.vods;
      } catch {
        // Ignore parse errors
      }
    }

    // Generate slugs for new games
    if (!existingSlugs) {
      const oppTeam = game.teams.find(t => t.teamId !== "ap")!;
      existingSlugs = generateGameSlugs(oppTeam.teamId, game.date);
    }

    const output = {
      ...game,
      slugs: existingSlugs,
      ...(existingVods && { vods: existingVods }),
    };

    fs.writeFileSync(filePath, JSON.stringify(output, null, 2) + "\n");
    console.log(`Wrote ${filePath}${existingVods ? " (preserved vods)" : ""}`);
  }

  console.log("\nDone! Don't forget to update src/data/index.ts with new game imports.");
}

main().catch(console.error);
