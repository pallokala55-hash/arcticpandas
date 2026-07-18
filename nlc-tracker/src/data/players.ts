import type { Player } from "./types";

export const players: Player[] = [
  // Arctic Pandas
  { id: "nille", handle: "Nille", teamId: "ap", role: "top", nationality: "FI" },
  { id: "dibu", handle: "Dibu", teamId: "ap", role: "jungle", nationality: "FI" },
  { id: "simpli", handle: "Simpli", teamId: "ap", role: "mid", nationality: "FI" },
  { id: "kehvo", handle: "Kehvo", teamId: "ap", role: "bot", nationality: "FI" },
  { id: "boltox", handle: "Boltox", teamId: "ap", role: "support", nationality: "EE" },
  // Nordlys Esports
  { id: "aurora", handle: "Aurora", teamId: "nly", role: "top", nationality: "NO" },
  { id: "skadi", handle: "Skadi", teamId: "nly", role: "jungle", nationality: "NO" },
  { id: "lumen", handle: "Lumen", teamId: "nly", role: "mid", nationality: "SE" },
  { id: "vidar", handle: "Vidar", teamId: "nly", role: "bot", nationality: "NO" },
  { id: "brage", handle: "Brage", teamId: "nly", role: "support", nationality: "DK" },
  // Kraken Union
  { id: "tento", handle: "Tento", teamId: "krk", role: "top", nationality: "SE" },
  { id: "abyss", handle: "Abyss", teamId: "krk", role: "jungle", nationality: "SE" },
  { id: "maelstrom", handle: "Maelstrom", teamId: "krk", role: "mid", nationality: "FI" },
  { id: "harpoon", handle: "Harpoon", teamId: "krk", role: "bot", nationality: "SE" },
  { id: "inkwell", handle: "Inkwell", teamId: "krk", role: "support", nationality: "NO" },
  // Ironmoose
  { id: "alces", handle: "Alces", teamId: "ims", role: "top", nationality: "SE" },
  { id: "antler", handle: "Antler", teamId: "ims", role: "jungle", nationality: "SE" },
  { id: "birchbark", handle: "Birchbark", teamId: "ims", role: "mid", nationality: "FI" },
  { id: "tundra", handle: "Tundra", teamId: "ims", role: "bot", nationality: "SE" },
  { id: "mossback", handle: "Mossback", teamId: "ims", role: "support", nationality: "DK" },
  // Polar Vortex
  { id: "cyclone", handle: "Cyclone", teamId: "pvx", role: "top", nationality: "DK" },
  { id: "isobar", handle: "Isobar", teamId: "pvx", role: "jungle", nationality: "DK" },
  { id: "zerodeg", handle: "ZeroDeg", teamId: "pvx", role: "mid", nationality: "SE" },
  { id: "hail", handle: "Hail", teamId: "pvx", role: "bot", nationality: "DK" },
  { id: "windchill", handle: "Windchill", teamId: "pvx", role: "support", nationality: "FI" },
  // Baltic Ravens
  { id: "corvus", handle: "Corvus", teamId: "rvn", role: "top", nationality: "EE" },
  { id: "talon", handle: "Talon", teamId: "rvn", role: "jungle", nationality: "LV" },
  { id: "nightwing", handle: "Nightwing", teamId: "rvn", role: "mid", nationality: "LT" },
  { id: "carrion", handle: "Carrion", teamId: "rvn", role: "bot", nationality: "EE" },
  { id: "roost", handle: "Roost", teamId: "rvn", role: "support", nationality: "EE" },
  // Fjord Five
  { id: "bergen", handle: "Bergen", teamId: "fjf", role: "top", nationality: "NO" },
  { id: "elv", handle: "Elv", teamId: "fjf", role: "jungle", nationality: "NO" },
  { id: "geiranger", handle: "Geiranger", teamId: "fjf", role: "mid", nationality: "NO" },
  { id: "stavanger", handle: "Stav", teamId: "fjf", role: "bot", nationality: "DK" },
  { id: "tromso", handle: "Tromso", teamId: "fjf", role: "support", nationality: "NO" },
  // Midnight Sun
  { id: "kaamos", handle: "Kaamos", teamId: "msn", role: "top", nationality: "FI" },
  { id: "yoton", handle: "Yoton", teamId: "msn", role: "jungle", nationality: "FI" },
  { id: "revontuli", handle: "Revontuli", teamId: "msn", role: "mid", nationality: "FI" },
  { id: "usva", handle: "Usva", teamId: "msn", role: "bot", nationality: "FI" },
  { id: "halla", handle: "Halla", teamId: "msn", role: "support", nationality: "SE" },
];

export const playersById = new Map(players.map((p) => [p.id, p]));

export function getPlayer(id: string): Player | undefined {
  return playersById.get(id);
}

export function getTeamPlayers(teamId: string): Player[] {
  return players.filter((p) => p.teamId === teamId);
}
