import type { Team } from "./types";

export const teams: Team[] = [
  {
    id: "ap",
    name: "Arctic Pandas",
    code: "AP",
    region: "FI",
    colors: { from: "#4ED0FF", to: "#1B4E8A" },
  },
  {
    id: "nly",
    name: "Nordlys Esports",
    code: "NLY",
    region: "NO",
    colors: { from: "#8F8FFA", to: "#3B2E8C" },
  },
  {
    id: "krk",
    name: "Kraken Union",
    code: "KRK",
    region: "SE",
    colors: { from: "#34D399", to: "#0E5F4B" },
  },
  {
    id: "ims",
    name: "Ironmoose",
    code: "IMS",
    region: "SE",
    colors: { from: "#F5C96C", to: "#8A5A1B" },
  },
  {
    id: "pvx",
    name: "Polar Vortex",
    code: "PVX",
    region: "DK",
    colors: { from: "#C4B5FD", to: "#5B21B6" },
  },
  {
    id: "rvn",
    name: "Baltic Ravens",
    code: "RVN",
    region: "EE",
    colors: { from: "#F87171", to: "#7F1D1D" },
  },
  {
    id: "fjf",
    name: "Fjord Five",
    code: "FJF",
    region: "NO",
    colors: { from: "#60A5FA", to: "#1E3A8A" },
  },
  {
    id: "msn",
    name: "Midnight Sun",
    code: "MSN",
    region: "FI",
    colors: { from: "#FB923C", to: "#7C2D12" },
  },
];

export const teamsById = new Map(teams.map((t) => [t.id, t]));

export function getTeam(id: string | null | undefined): Team | undefined {
  return id ? teamsById.get(id) : undefined;
}
