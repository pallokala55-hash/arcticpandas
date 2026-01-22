# Data Layer Refactor

## Overview

Refactor the data layer from AP-centric embedded JSON to a normalized, atomic structure where each entity (player, team, game) is independent and relationships are expressed through references.

## Goals

- Unified data model for all teams/players, not just AP
- Graceful fallbacks when data is missing
- Validation that catches errors before deployment
- Clean separation of concerns

## Entity Structure

### Player (`src/data/players/{slug}.json`)

```json
{
  "id": "nille",
  "name": "Nille",
  "realName": "Niko Liimatainen",
  "nationality": "FI",
  "photo": "/players/nille.png",
  "bio": "Top laner for Arctic Pandas",
  "socials": {
    "twitter": "naborenern"
  },
  "esportsIds": {
    "lolesports": "103877885177694021"
  }
}
```

Required: `id`, `name`

Optional: `realName`, `nationality`, `photo`, `bio`, `socials`, `esportsIds`

Not stored on player:
- `role` - belongs on game participation (players can role-swap)
- `team` - derived from games (avoids stale data)

### Team (`src/data/teams/{slug}.json`)

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
  "website": "https://arcticpandas.gg",
  "esportsIds": {
    "lolesports": "115848475436772149"
  }
}
```

Required: `id`, `name`, `code`

Optional: `region`, `league`, `logo`, `colors`, `socials`, `website`, `esportsIds`

Not stored on team:
- `roster` - derived from games
- `record` - calculated from games

### Game (`src/data/games/{id}.json`)

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
    { "url": "https://twitch.tv/videos/2670746985?t=05h11m00s", "label": "NLC Broadcast" }
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
        {
          "playerId": "nille",
          "name": "AP Nille",
          "role": "top",
          "champion": "Ambessa",
          "kills": 7,
          "deaths": 3,
          "assists": 11,
          "cs": 278,
          "gold": 16243,
          "items": [6692, 3363, 3161, 3111, 6333, 3156],
          "kp": 0.69,
          "dmgShare": 0.18
        }
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
        {
          "playerId": null,
          "name": "VER bobista",
          "role": "top",
          "champion": "Rumble",
          "kills": 9,
          "deaths": 6,
          "assists": 7,
          "cs": 286,
          "gold": 15113
        }
      ]
    }
  ]
}
```

Required: `id`, `date`, `teams` (array of 2)

Optional: `patch`, `duration`, `durationRealtime`, `tournament`, `vods`

Team participation required: `teamId`, `side`, `result`, `players`

Team participation optional: `kills`, `deaths`, `gold`, `towers`, `dragons`, `barons`

Player participation required: `name`, `role`, `champion`

Player participation optional: `playerId` (null for untracked opponents), `kills`, `deaths`, `assists`, `cs`, `gold`, `items`, `kp`, `dmgShare`

### LoL Reference Data

**Champions** (`src/data/lol/champions.json`)

Comprehensive list pulled from Data Dragon:

```json
{
  "Ambessa": { "id": "Ambessa", "name": "Ambessa" },
  "MonkeyKing": { "id": "MonkeyKing", "name": "Wukong" }
}
```

**Dragons** (`src/data/lol/dragons.json`)

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

## Directory Structure

```
src/data/
  schemas/
    player.ts
    team.ts
    game.ts
    lol.ts
    index.ts
  players/
    nille.json
    dibu.json
    simpli.json
    kehvo.json
    boltox.json
  teams/
    ap.json
    ver.json
    lls.json
    4sb.json
    bomb.json
    bdg.json
  games/
    115762378910707629.json
    115762378910707655.json
  lol/
    champions.json
    dragons.json
  index.ts
```

## Validation

### Zod Schemas

Each entity type has a Zod schema that:
- Defines required and optional fields
- Provides TypeScript types via `z.infer<>`
- Validates data at runtime

### Validation Script (`scripts/validate-data.ts`)

Checks:
1. **Schema validation** - Every JSON file parses against its schema
2. **Reference integrity** - `playerId` exists in `players/`, `teamId` exists in `teams/`, `champion` exists in `lol/champions.json`
3. **Uniqueness** - No duplicate IDs

### Integration

- `npm run validate` - Standalone validation
- `npm run build` - Fails on validation errors
- CI pipeline - Blocks merge on failure

## Data Loading

`src/data/index.ts` exports:

```typescript
// Typed collections
export const players: Map<string, Player>
export const teams: Map<string, Team>
export const games: Game[]

// Helper functions
export function getPlayer(id: string): Player | undefined
export function getTeam(id: string): Team | undefined
export function getGame(id: string): Game | undefined
export function getPlayerGames(playerId: string): Game[]
export function getTeamGames(teamId: string): Game[]
```

## Migration Path

1. Create new directory structure and schemas
2. Write migration script to transform existing data
3. Update components to use new data layer
4. Remove old data files
5. Update fetch script to output new format

## External References

- Champion/item images: Riot Data Dragon CDN
  - `https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{name}.png`
  - `https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{id}.png`
