/**
 * Slug generation utilities for games
 */

// Map of teamId -> full name for slug generation
const TEAM_NAMES: Record<string, string> = {
  ver: "Verdant",
  lls: "Lundqvist Lightside",
  "4sb": "4 Swines and a Bum",
  bomb: "La BOMBAS",
  bdg: "Bulldog Esports",
  dmg: "DMG Esports",
  leo: "LEO",
  deer: "Deer Gaming",
  rud: "Ruddy Esports",
};

/**
 * Generate URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generate slugs array for a game
 * Returns permutations from most readable to most specific
 */
export function generateGameSlugs(
  opponentTeamId: string,
  date: string // YYYY-MM-DD format
): string[] {
  const oppName = TEAM_NAMES[opponentTeamId] ?? opponentTeamId;
  const oppSlug = slugify(oppName);

  const month = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ][parseInt(date.slice(5, 7)) - 1];
  const day = parseInt(date.slice(8, 10));
  const year = date.slice(0, 4);

  return [
    oppSlug,
    `${month}-${day}-${opponentTeamId}`,
    `${date}-${opponentTeamId}`,
    `winter-${year}-${opponentTeamId}`,
  ];
}
