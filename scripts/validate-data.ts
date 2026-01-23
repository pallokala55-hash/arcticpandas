import fs from "fs";
import path from "path";
import {
  PlayerSchema,
  TeamSchema,
  GameSchema,
  ChampionsFileSchema,
  DragonsFileSchema,
} from "../src/data/schemas";

const dataDir = path.join(process.cwd(), "src/data");

let errors: string[] = [];
let warnings: string[] = [];

function validateJsonFiles(dir: string, schema: { parse: (data: unknown) => unknown }, entityName: string): Set<string> {
  const ids = new Set<string>();
  const fullPath = path.join(dataDir, dir);

  if (!fs.existsSync(fullPath)) {
    warnings.push(`Directory ${dir}/ does not exist`);
    return ids;
  }

  for (const file of fs.readdirSync(fullPath)) {
    if (!file.endsWith(".json")) continue;

    try {
      const content = JSON.parse(fs.readFileSync(path.join(fullPath, file), "utf-8"));
      const parsed = schema.parse(content);
      const id = (parsed as { id: string }).id;

      if (ids.has(id)) {
        errors.push(`Duplicate ${entityName} ID: ${id}`);
      }
      ids.add(id);

      // Check filename matches ID
      const expectedFile = `${id}.json`;
      if (file !== expectedFile && !file.includes("-")) {
        warnings.push(`${entityName} file ${file} should be named ${expectedFile}`);
      }
    } catch (e) {
      errors.push(`Invalid ${entityName} in ${file}: ${e instanceof Error ? e.message : e}`);
    }
  }

  return ids;
}

function validateGames(playerIds: Set<string>, teamIds: Set<string>, championIds: Set<string>): void {
  const gamesPath = path.join(dataDir, "games");

  if (!fs.existsSync(gamesPath)) {
    warnings.push("Directory games/ does not exist");
    return;
  }

  for (const file of fs.readdirSync(gamesPath)) {
    if (!file.endsWith(".json")) continue;

    try {
      const content = JSON.parse(fs.readFileSync(path.join(gamesPath, file), "utf-8"));
      const game = GameSchema.parse(content);

      // Check team references
      for (const teamPart of game.teams) {
        if (!teamIds.has(teamPart.teamId)) {
          errors.push(`Game ${game.id}: Unknown team ${teamPart.teamId}`);
        }

        // Check player references (if game has been played)
        if (teamPart.players) {
          for (const player of teamPart.players) {
            if (player.playerId !== null && !playerIds.has(player.playerId)) {
              errors.push(`Game ${game.id}: Unknown player ${player.playerId}`);
            }

            // Check champion exists (skip "Unknown" placeholder)
            if (player.champion !== "Unknown" && !championIds.has(player.champion)) {
              warnings.push(`Game ${game.id}: Unknown champion ${player.champion}`);
            }
          }
        }
      }
    } catch (e) {
      errors.push(`Invalid game in ${file}: ${e instanceof Error ? e.message : e}`);
    }
  }
}

function validateLolData(): Set<string> {
  const championIds = new Set<string>();

  // Validate champions
  const champPath = path.join(dataDir, "lol/champions.json");
  if (fs.existsSync(champPath)) {
    try {
      const content = JSON.parse(fs.readFileSync(champPath, "utf-8"));
      const champs = ChampionsFileSchema.parse(content);
      for (const key of Object.keys(champs)) {
        championIds.add(key);
      }
      console.log(`✓ Loaded ${championIds.size} champions`);
    } catch (e) {
      errors.push(`Invalid champions.json: ${e instanceof Error ? e.message : e}`);
    }
  } else {
    errors.push("Missing lol/champions.json");
  }

  // Validate dragons
  const dragonPath = path.join(dataDir, "lol/dragons.json");
  if (fs.existsSync(dragonPath)) {
    try {
      const content = JSON.parse(fs.readFileSync(dragonPath, "utf-8"));
      DragonsFileSchema.parse(content);
      console.log(`✓ Dragons file valid`);
    } catch (e) {
      errors.push(`Invalid dragons.json: ${e instanceof Error ? e.message : e}`);
    }
  } else {
    errors.push("Missing lol/dragons.json");
  }

  return championIds;
}

// Run validation
console.log("Validating data...\n");

const championIds = validateLolData();
const playerIds = validateJsonFiles("players", PlayerSchema, "Player");
console.log(`✓ Validated ${playerIds.size} players`);

const teamIds = validateJsonFiles("teams", TeamSchema, "Team");
console.log(`✓ Validated ${teamIds.size} teams`);

validateGames(playerIds, teamIds, championIds);
const gamesPath = path.join(dataDir, "games");
const gameCount = fs.existsSync(gamesPath)
  ? fs.readdirSync(gamesPath).filter(f => f.endsWith(".json")).length
  : 0;
console.log(`✓ Validated ${gameCount} games`);

console.log();

// Report results
if (warnings.length > 0) {
  console.log("Warnings:");
  for (const w of warnings) {
    console.log(`  ⚠ ${w}`);
  }
  console.log();
}

if (errors.length > 0) {
  console.log("Errors:");
  for (const e of errors) {
    console.log(`  ✗ ${e}`);
  }
  console.log();
  process.exit(1);
}

console.log("✓ All data valid!");
