# Data Layer Refactor - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor from AP-centric embedded data to normalized atomic entities (players, teams, games) with Zod validation.

**Architecture:** Each entity type gets its own directory with individual JSON files. Zod schemas validate at build time. A data index loads and exports typed collections with helper functions.

**Tech Stack:** TypeScript, Zod (validation + types), Next.js static imports

---

## Task 1: Install Zod and Create Directory Structure

**Files:**
- Modify: `package.json`
- Create: `src/data/schemas/` directory
- Create: `src/data/players/` directory
- Create: `src/data/teams/` directory
- Create: `src/data/games/` directory
- Create: `src/data/lol/` directory

**Step 1: Install Zod**

Run: `npm install zod`
Expected: zod added to dependencies

**Step 2: Create directory structure**

```bash
mkdir -p src/data/schemas src/data/players src/data/teams src/data/games src/data/lol
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add zod dependency"
```

---

## Task 2: Create Zod Schemas

**Files:**
- Create: `src/data/schemas/player.ts`
- Create: `src/data/schemas/team.ts`
- Create: `src/data/schemas/game.ts`
- Create: `src/data/schemas/lol.ts`
- Create: `src/data/schemas/index.ts`

**Step 1: Create player schema**

Create `src/data/schemas/player.ts`:

```typescript
import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  realName: z.string().optional(),
  nationality: z.string().length(2).optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  socials: z.record(z.string(), z.string()).optional(),
  esportsIds: z.record(z.string(), z.string()).optional(),
});

export type Player = z.infer<typeof PlayerSchema>;
```

**Step 2: Create team schema**

Create `src/data/schemas/team.ts`:

```typescript
import { z } from "zod";

export const TeamColorsSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
});

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().min(1).max(5),
  region: z.string().optional(),
  league: z.string().optional(),
  logo: z.string().optional(),
  colors: TeamColorsSchema.optional(),
  socials: z.record(z.string(), z.string()).optional(),
  website: z.string().url().optional(),
  esportsIds: z.record(z.string(), z.string()).optional(),
});

export type Team = z.infer<typeof TeamSchema>;
```

**Step 3: Create game schema**

Create `src/data/schemas/game.ts`:

```typescript
import { z } from "zod";

export const RoleSchema = z.enum(["top", "jungle", "mid", "bottom", "support"]);
export const SideSchema = z.enum(["blue", "red"]);
export const ResultSchema = z.enum(["win", "loss"]);
export const DragonTypeSchema = z.enum(["infernal", "mountain", "ocean", "cloud", "hextech", "chemtech"]);

export const PlayerParticipationSchema = z.object({
  playerId: z.string().nullable(),
  name: z.string().min(1),
  role: RoleSchema,
  champion: z.string().min(1),
  kills: z.number().int().nonnegative().optional(),
  deaths: z.number().int().nonnegative().optional(),
  assists: z.number().int().nonnegative().optional(),
  cs: z.number().int().nonnegative().optional(),
  gold: z.number().int().nonnegative().optional(),
  items: z.array(z.number().int()).optional(),
  kp: z.number().min(0).max(1).optional(),
  dmgShare: z.number().min(0).max(1).optional(),
});

export const TeamParticipationSchema = z.object({
  teamId: z.string().min(1),
  side: SideSchema,
  result: ResultSchema,
  kills: z.number().int().nonnegative().optional(),
  deaths: z.number().int().nonnegative().optional(),
  gold: z.number().int().nonnegative().optional(),
  towers: z.number().int().nonnegative().optional(),
  dragons: z.array(DragonTypeSchema).optional(),
  barons: z.number().int().nonnegative().optional(),
  players: z.array(PlayerParticipationSchema),
});

export const TournamentSchema = z.object({
  name: z.string().min(1),
  stage: z.string().optional(),
});

export const VodSchema = z.object({
  url: z.string().url(),
  label: z.string().min(1),
});

export const GameSchema = z.object({
  id: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  patch: z.string().optional(),
  duration: z.number().int().positive().optional(),
  durationRealtime: z.number().int().positive().optional(),
  tournament: TournamentSchema.optional(),
  vods: z.array(VodSchema).optional(),
  teams: z.tuple([TeamParticipationSchema, TeamParticipationSchema]),
});

export type PlayerParticipation = z.infer<typeof PlayerParticipationSchema>;
export type TeamParticipation = z.infer<typeof TeamParticipationSchema>;
export type Game = z.infer<typeof GameSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type DragonType = z.infer<typeof DragonTypeSchema>;
```

**Step 4: Create LoL reference data schema**

Create `src/data/schemas/lol.ts`:

```typescript
import { z } from "zod";

export const ChampionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export const DragonRefSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const ChampionsFileSchema = z.record(z.string(), ChampionSchema);
export const DragonsFileSchema = z.record(z.string(), DragonRefSchema);

export type Champion = z.infer<typeof ChampionSchema>;
export type DragonRef = z.infer<typeof DragonRefSchema>;
```

**Step 5: Create schema index**

Create `src/data/schemas/index.ts`:

```typescript
export { PlayerSchema, type Player } from "./player";
export { TeamSchema, type Team } from "./team";
export {
  GameSchema,
  PlayerParticipationSchema,
  TeamParticipationSchema,
  RoleSchema,
  SideSchema,
  ResultSchema,
  DragonTypeSchema,
  type Game,
  type PlayerParticipation,
  type TeamParticipation,
  type Role,
  type DragonType,
} from "./game";
export {
  ChampionSchema,
  ChampionsFileSchema,
  DragonsFileSchema,
  type Champion,
  type DragonRef,
} from "./lol";
```

**Step 6: Verify schemas compile**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 7: Commit**

```bash
git add src/data/schemas/
git commit -m "feat: add Zod schemas for player, team, game entities"
```

---

## Task 3: Create LoL Reference Data

**Files:**
- Create: `src/data/lol/dragons.json`
- Create: `scripts/fetch-champions.ts`
- Create: `src/data/lol/champions.json`

**Step 1: Create dragons reference file**

Create `src/data/lol/dragons.json`:

```json
{
  "infernal": { "name": "Infernal", "color": "#ef4444" },
  "mountain": { "name": "Mountain", "color": "#d97706" },
  "ocean": { "name": "Ocean", "color": "#3b82f6" },
  "cloud": { "name": "Cloud", "color": "#9ca3af" },
  "hextech": { "name": "Hextech", "color": "#8b5cf6" },
  "chemtech": { "name": "Chemtech", "color": "#22c55e" }
}
```

**Step 2: Create champion fetch script**

Create `scripts/fetch-champions.ts`:

```typescript
const DDRAGON_VERSION_URL = "https://ddragon.leagueoflegends.com/api/versions.json";

async function fetchChampions() {
  // Get latest version
  const versionsRes = await fetch(DDRAGON_VERSION_URL);
  const versions = await versionsRes.json();
  const latestVersion = versions[0];
  console.log(`Fetching champions from Data Dragon ${latestVersion}`);

  // Fetch champion data
  const champUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`;
  const champRes = await fetch(champUrl);
  const champData = await champRes.json();

  // Transform to our format
  const champions: Record<string, { id: string; name: string }> = {};
  for (const [key, champ] of Object.entries(champData.data as Record<string, { id: string; name: string }>)) {
    champions[key] = {
      id: champ.id,
      name: champ.name,
    };
  }

  // Write to file
  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "src/data/lol/champions.json");
  fs.writeFileSync(outPath, JSON.stringify(champions, null, 2) + "\n");
  console.log(`Wrote ${Object.keys(champions).length} champions to ${outPath}`);
}

fetchChampions().catch(console.error);
```

**Step 3: Run the script**

Run: `npx tsx scripts/fetch-champions.ts`
Expected: Output showing champions written

**Step 4: Verify champions.json exists and has content**

Run: `head -20 src/data/lol/champions.json`
Expected: JSON with champion entries

**Step 5: Commit**

```bash
git add src/data/lol/ scripts/fetch-champions.ts
git commit -m "feat: add LoL reference data (champions, dragons)"
```

---

## Task 4: Create Player JSON Files

**Files:**
- Create: `src/data/players/nille.json`
- Create: `src/data/players/dibu.json`
- Create: `src/data/players/simpli.json`
- Create: `src/data/players/kehvo.json`
- Create: `src/data/players/boltox.json`

**Step 1: Create nille.json**

Create `src/data/players/nille.json`:

```json
{
  "id": "nille",
  "name": "Nille",
  "realName": "Juho Janhunen",
  "nationality": "FI",
  "photo": "/nille.webp",
  "bio": "Nille is one of the most experienced top laners in the Nordic scene, having competed across Germany, Denmark, Turkey, Spain, Norway, France, and the Nordics since 2018. He won the Nordic Championship 2020 Spring with Team Singularity, claimed LFL Division 2 2025 Spring with Valiant, and reached the NLC 2023 Spring final with Verdant, earning 1st All-Pro honors that split.",
  "socials": {
    "twitter": "naborenern",
    "opgg": "https://op.gg/lol/summoners/euw/Frank%20Lundy-AGENT"
  },
  "esportsIds": {
    "lolesports": "103877885177694021"
  }
}
```

**Step 2: Create dibu.json**

Create `src/data/players/dibu.json`:

```json
{
  "id": "dibu",
  "name": "Dibu",
  "realName": "Janne Heikkonen",
  "nationality": "FI",
  "photo": "/dipu.webp",
  "bio": "Dibu has competed professionally since 2019, with his peak coming in 2020 when he led Sector One to a dominant Belgian League season — winning Spring, Summer, and Country Finals. He earned MVP honors in Spring playoffs and has since played for LowLandLions, mYinsanity, and All For One Gaming across the Dutch League and Prime League.",
  "socials": {
    "opgg": "https://op.gg/lol/summoners/euw/Jan%20Olejko-1234"
  },
  "esportsIds": {
    "lolesports": "103935622852857101"
  }
}
```

**Step 3: Create simpli.json**

Create `src/data/players/simpli.json`:

```json
{
  "id": "simpli",
  "name": "Simpli",
  "realName": "Anselmi Rintanen",
  "nationality": "FI",
  "photo": "/simpli.webp",
  "bio": "Simpli earned the 'Finnish Faker' nickname for his mechanical plays at FC Schalke 04 Esports. Starting at NYYRIKKI Academy in 2019, he joined ENCE's all-Finnish roster in 2020 alongside Nille and Kehvo. He reached the Prime League 2024 Summer final with Schalke, then competed at EMEA Masters 2025 Summer with UoL Sexy Edition.",
  "socials": {
    "opgg": "https://op.gg/lol/summoners/euw/Simpli-000"
  },
  "esportsIds": {
    "lolesports": "105519573596232348"
  }
}
```

**Step 4: Create kehvo.json**

Create `src/data/players/kehvo.json`:

```json
{
  "id": "kehvo",
  "name": "Kehvo",
  "realName": "Aleksi Merta",
  "nationality": "FI",
  "photo": "/Kehvo.webp",
  "bio": "Kehvo has built a reputation for consistency across the UK, Netherlands, Belgium, and MENA regions since 2018. He won the Elite Series Benelux Masters 2023 with Myth Esports and reached 2nd at the Arabian League 2025 Winter with Anubis Gaming. In 2020, he was part of ENCE's all-Finnish roster alongside Nille and Simpli — a reunion now happening at Arctic Pandas.",
  "socials": {
    "opgg": "https://op.gg/lol/summoners/euw/Kehvo-EUW"
  },
  "esportsIds": {
    "lolesports": "105519570521259934"
  }
}
```

**Step 5: Create boltox.json**

Create `src/data/players/boltox.json`:

```json
{
  "id": "boltox",
  "name": "Boltox",
  "realName": "Arlet Semre",
  "nationality": "EE",
  "photo": "/boltox.webp",
  "bio": "Boltox started his competitive journey with VISU Gaming Snow in 2022, then moved through BlueWhites, Estonian Vipers, and Epic Avalanche. As one of the few Estonian players in the NLC, he brings a fresh perspective to Arctic Pandas. His solo queue peak of Challenger 1099 LP demonstrates the mechanical skill backing his climb through the regional scene.",
  "socials": {
    "opgg": "https://op.gg/lol/summoners/euw/Boltox-EUW"
  },
  "esportsIds": {
    "lolesports": "112440590902095873"
  }
}
```

**Step 6: Commit**

```bash
git add src/data/players/
git commit -m "feat: add player JSON files"
```

---

## Task 5: Create Team JSON Files

**Files:**
- Create: `src/data/teams/ap.json`
- Create: `src/data/teams/ver.json`
- Create: `src/data/teams/lls.json`
- Create: `src/data/teams/4sb.json`
- Create: `src/data/teams/bomb.json`
- Create: `src/data/teams/bdg.json`

**Step 1: Create ap.json**

Create `src/data/teams/ap.json`:

```json
{
  "id": "ap",
  "name": "Arctic Pandas",
  "code": "AP",
  "region": "FI",
  "league": "NLC",
  "logo": "/teams/ap.png",
  "colors": {
    "primary": "#4ED0FF",
    "secondary": "#1a1a2e"
  },
  "socials": {
    "twitter": "ArcticPandasGG",
    "twitch": "arcticpandasgg"
  },
  "esportsIds": {
    "lolesports": "115848475436772149"
  }
}
```

**Step 2: Create ver.json**

Create `src/data/teams/ver.json`:

```json
{
  "id": "ver",
  "name": "Verdant",
  "code": "VER",
  "league": "NLC",
  "esportsIds": {
    "lolesports": "107565477822627354"
  }
}
```

**Step 3: Create lls.json**

Create `src/data/teams/lls.json`:

```json
{
  "id": "lls",
  "name": "Lundqvist Lightside",
  "code": "LLS",
  "league": "NLC",
  "esportsIds": {
    "lolesports": "107565473980214294"
  }
}
```

**Step 4: Create 4sb.json**

Create `src/data/teams/4sb.json`:

```json
{
  "id": "4sb",
  "name": "4 SWINES & A BUM",
  "code": "4S&B",
  "league": "NLC"
}
```

**Step 5: Create bomb.json**

Create `src/data/teams/bomb.json`:

```json
{
  "id": "bomb",
  "name": "La BOMBAS",
  "code": "BOMB",
  "league": "NLC"
}
```

**Step 6: Create bdg.json**

Create `src/data/teams/bdg.json`:

```json
{
  "id": "bdg",
  "name": "Bulldog Esports",
  "code": "BDG",
  "league": "NLC"
}
```

**Step 7: Commit**

```bash
git add src/data/teams/
git commit -m "feat: add team JSON files"
```

---

## Task 6: Create Game JSON Files

**Files:**
- Create: `src/data/games/115762378910707629.json` (vs Verdant)
- Create: `src/data/games/115762378910707655.json` (vs LLS)
- Create: `src/data/games/4sb-2026-01-22.json` (vs 4S&B - manual ID since API not available)

**Step 1: Create game vs Verdant**

Create `src/data/games/115762378910707629.json`:

```json
{
  "id": "115762378910707629",
  "date": "2026-01-15",
  "patch": "16.1.736.4955",
  "duration": 2179,
  "durationRealtime": 2261,
  "tournament": {
    "name": "NLC 2026 Winter",
    "stage": "Regular Season"
  },
  "vods": [
    { "url": "https://www.twitch.tv/videos/2670746985?t=05h11m00s", "label": "NLC Broadcast" }
  ],
  "teams": [
    {
      "teamId": "ap",
      "side": "blue",
      "result": "win",
      "kills": 26,
      "deaths": 20,
      "gold": 75588,
      "towers": 10,
      "dragons": ["mountain", "ocean"],
      "barons": 2,
      "players": [
        { "playerId": "nille", "name": "AP Nille", "role": "top", "champion": "Ambessa", "kills": 7, "deaths": 3, "assists": 11, "cs": 278, "gold": 16243, "kp": 0.69, "dmgShare": 0.18 },
        { "playerId": "dibu", "name": "AP DIBU", "role": "jungle", "champion": "Vi", "kills": 4, "deaths": 6, "assists": 11, "cs": 190, "gold": 13252, "kp": 0.58, "dmgShare": 0.10 },
        { "playerId": "simpli", "name": "AP Simpli", "role": "mid", "champion": "Swain", "kills": 3, "deaths": 5, "assists": 21, "cs": 265, "gold": 14234, "kp": 0.92, "dmgShare": 0.26 },
        { "playerId": "kehvo", "name": "AP Kehvo", "role": "bottom", "champion": "Corki", "kills": 11, "deaths": 4, "assists": 8, "cs": 352, "gold": 22084, "kp": 0.73, "dmgShare": 0.37 },
        { "playerId": "boltox", "name": "AP Boltox", "role": "support", "champion": "Nami", "kills": 1, "deaths": 2, "assists": 22, "cs": 30, "gold": 9775, "kp": 0.88, "dmgShare": 0.09 }
      ]
    },
    {
      "teamId": "ver",
      "side": "red",
      "result": "loss",
      "kills": 20,
      "deaths": 26,
      "gold": 69620,
      "towers": 5,
      "dragons": ["chemtech", "ocean", "ocean"],
      "barons": 0,
      "players": [
        { "playerId": null, "name": "VER bobista", "role": "top", "champion": "Rumble", "kills": 9, "deaths": 6, "assists": 7, "cs": 286, "gold": 15113 },
        { "playerId": null, "name": "VER Mafro", "role": "jungle", "champion": "JarvanIV", "kills": 2, "deaths": 6, "assists": 16, "cs": 209, "gold": 12428 },
        { "playerId": null, "name": "VER Furuy", "role": "mid", "champion": "Taliyah", "kills": 3, "deaths": 3, "assists": 12, "cs": 350, "gold": 14419 },
        { "playerId": null, "name": "VER Mishi", "role": "bottom", "champion": "Yunara", "kills": 6, "deaths": 6, "assists": 8, "cs": 335, "gold": 19300 },
        { "playerId": null, "name": "VER guggu", "role": "support", "champion": "Alistar", "kills": 0, "deaths": 5, "assists": 15, "cs": 23, "gold": 8360 }
      ]
    }
  ]
}
```

**Step 2: Create game vs LLS**

Create `src/data/games/115762378910707655.json`:

```json
{
  "id": "115762378910707655",
  "date": "2026-01-21",
  "patch": "16.1.736.4955",
  "duration": 1735,
  "durationRealtime": 2125,
  "tournament": {
    "name": "NLC 2026 Winter",
    "stage": "Regular Season"
  },
  "vods": [
    { "url": "https://www.twitch.tv/videos/2676194933?t=01h28m41s", "label": "NLC Broadcast" }
  ],
  "teams": [
    {
      "teamId": "ap",
      "side": "red",
      "result": "win",
      "kills": 28,
      "deaths": 16,
      "gold": 65896,
      "towers": 9,
      "dragons": ["infernal"],
      "barons": 2,
      "players": [
        { "playerId": "nille", "name": "AP Nille", "role": "top", "champion": "Aurora", "kills": 7, "deaths": 3, "assists": 8, "cs": 242, "gold": 12525, "kp": 0.54, "dmgShare": 0.22 },
        { "playerId": "dibu", "name": "AP DIBU", "role": "jungle", "champion": "Vi", "kills": 6, "deaths": 5, "assists": 13, "cs": 201, "gold": 13058, "kp": 0.68, "dmgShare": 0.17 },
        { "playerId": "simpli", "name": "AP Simpli", "role": "mid", "champion": "Ryze", "kills": 8, "deaths": 1, "assists": 10, "cs": 290, "gold": 15456, "kp": 0.64, "dmgShare": 0.30 },
        { "playerId": "kehvo", "name": "AP Kehvo", "role": "bottom", "champion": "Corki", "kills": 7, "deaths": 5, "assists": 9, "cs": 258, "gold": 16635, "kp": 0.57, "dmgShare": 0.25 },
        { "playerId": "boltox", "name": "AP Boltox", "role": "support", "champion": "Alistar", "kills": 0, "deaths": 2, "assists": 21, "cs": 30, "gold": 8222, "kp": 0.75, "dmgShare": 0.06 }
      ]
    },
    {
      "teamId": "lls",
      "side": "blue",
      "result": "loss",
      "kills": 16,
      "deaths": 28,
      "gold": 54751,
      "towers": 3,
      "dragons": ["hextech", "mountain"],
      "barons": 0,
      "players": [
        { "playerId": null, "name": "LLS Thunder2", "role": "top", "champion": "Rumble", "kills": 1, "deaths": 5, "assists": 2, "cs": 182, "gold": 8696 },
        { "playerId": null, "name": "LLS CLEARS", "role": "jungle", "champion": "MonkeyKing", "kills": 9, "deaths": 6, "assists": 5, "cs": 199, "gold": 13003 },
        { "playerId": null, "name": "LLS MathisV", "role": "mid", "champion": "Sylas", "kills": 3, "deaths": 5, "assists": 9, "cs": 218, "gold": 12018 },
        { "playerId": null, "name": "LLS Kobbe", "role": "bottom", "champion": "Sivir", "kills": 3, "deaths": 7, "assists": 7, "cs": 272, "gold": 13172 },
        { "playerId": null, "name": "LLS Soul2", "role": "support", "champion": "Bard", "kills": 0, "deaths": 5, "assists": 10, "cs": 32, "gold": 7862 }
      ]
    }
  ]
}
```

**Step 3: Create game vs 4S&B (perfect game)**

Create `src/data/games/4sb-2026-01-22.json`:

```json
{
  "id": "4sb-2026-01-22",
  "date": "2026-01-22",
  "duration": 1362,
  "tournament": {
    "name": "NLC 2026 Winter",
    "stage": "Regular Season"
  },
  "vods": [
    { "url": "https://www.twitch.tv/videos/2676981964?t=01h47m52s", "label": "NLC Broadcast" }
  ],
  "teams": [
    {
      "teamId": "ap",
      "side": "blue",
      "result": "win",
      "kills": 19,
      "deaths": 0,
      "gold": 52500,
      "towers": 10,
      "dragons": ["infernal", "infernal"],
      "barons": 1,
      "players": [
        { "playerId": "nille", "name": "AP Nille", "role": "top", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": "dibu", "name": "AP DIBU", "role": "jungle", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": "simpli", "name": "AP Simpli", "role": "mid", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": "kehvo", "name": "AP Kehvo", "role": "bottom", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": "boltox", "name": "AP Boltox", "role": "support", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 }
      ]
    },
    {
      "teamId": "4sb",
      "side": "red",
      "result": "loss",
      "kills": 0,
      "deaths": 19,
      "gold": 35400,
      "towers": 0,
      "dragons": [],
      "barons": 0,
      "players": [
        { "playerId": null, "name": "4S&B Top", "role": "top", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": null, "name": "4S&B Jungle", "role": "jungle", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": null, "name": "4S&B Mid", "role": "mid", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": null, "name": "4S&B Bot", "role": "bottom", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 },
        { "playerId": null, "name": "4S&B Support", "role": "support", "champion": "Unknown", "kills": 0, "deaths": 0, "assists": 0 }
      ]
    }
  ]
}
```

**Step 4: Commit**

```bash
git add src/data/games/
git commit -m "feat: add game JSON files"
```

---

## Task 7: Create Data Loader and Validation

**Files:**
- Create: `src/data/index.ts`
- Create: `scripts/validate-data.ts`
- Modify: `package.json` (add validate script)

**Step 1: Create data loader**

Create `src/data/index.ts`:

```typescript
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
```

**Step 2: Create validation script**

Create `scripts/validate-data.ts`:

```typescript
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

        // Check player references
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
```

**Step 3: Add validate script to package.json**

Run: `npm pkg set scripts.validate="npx tsx scripts/validate-data.ts"`

**Step 4: Run validation**

Run: `npm run validate`
Expected: All data valid (or shows specific errors to fix)

**Step 5: Commit**

```bash
git add src/data/index.ts scripts/validate-data.ts package.json
git commit -m "feat: add data loader and validation script"
```

---

## Task 8: Update Components to Use New Data Layer

**Files:**
- Modify: `src/app/(site)/page.tsx` (home page)
- Modify: `src/app/(site)/[player]/page.tsx` (player profile)
- Modify: `src/components/RosterCard.tsx`
- Modify: `src/components/ScheduleCard.tsx`

This task migrates components one at a time. Each component update should be verified with a build before moving to the next.

**Step 1: Update RosterCard to use new player data**

The existing RosterCard uses `roster.ts`. Update it to pull from the new player JSON files via the data index.

Read the existing component first, then update imports and data source.

**Step 2: Update ScheduleCard to use new game data**

The existing ScheduleCard uses `schedule.json`. Update it to derive schedule from games.

**Step 3: Update player profile page**

The existing `[player]/page.tsx` uses `players.ts`. Update it to use the new player JSON files and derive stats from games.

**Step 4: Run build to verify**

Run: `npm run build`
Expected: Build succeeds with all routes

**Step 5: Commit**

```bash
git add src/
git commit -m "refactor: update components to use new data layer"
```

---

## Task 9: Remove Old Data Files

**Files:**
- Delete: `src/data/players.ts`
- Delete: `src/data/roster.ts`
- Delete: `src/data/schedule.json`
- Delete: `src/data/schedule.ts`
- Delete: `src/data/matches.ts` (if exists)
- Delete: `src/data/matches-api.json` (if exists)

**Step 1: Remove old files**

```bash
rm -f src/data/players.ts src/data/roster.ts src/data/schedule.json src/data/schedule.ts src/data/matches.ts src/data/matches-api.json
```

**Step 2: Run build to verify nothing is broken**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old data files"
```

---

## Task 10: Integrate Validation into Build

**Files:**
- Modify: `package.json`

**Step 1: Update build script to run validation first**

Run: `npm pkg set scripts.build="npm run validate && next build"`

**Step 2: Test the build**

Run: `npm run build`
Expected: Validation runs first, then build succeeds

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore: run data validation before build"
```

---

## Summary

After completing all tasks:
- New atomic data structure in `src/data/{players,teams,games,lol}/`
- Zod schemas providing validation and TypeScript types
- Validation script that runs on every build
- Components updated to use the new data layer
- Old embedded data files removed

The data layer is now normalized, validated, and extensible.
