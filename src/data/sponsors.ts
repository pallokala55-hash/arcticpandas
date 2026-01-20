export type Sponsor = {
  id: string;
  label: string;
  // Add more fields as needed when sponsors are finalized:
  // logo?: string;
  // url?: string;
  // tier?: "premier" | "partner" | "supporter";
};

const sponsors: Sponsor[] = [
  { id: "finland", label: "Finnish Esports" },
  { id: "hiiva", label: "Hiiva" },
  { id: "lol", label: "League of Legends" },
  { id: "nille", label: "Nille" },
  { id: "nordic", label: "Nordic Excellence" },
  { id: "simpli", label: "Simpli" },
  { id: "north", label: "From the North" },
  { id: "dipu", label: "Dipu" },
  { id: "xpetu", label: "xPetu" },
  { id: "kehvo", label: "Kehvo" },
  { id: "rising", label: "Rising Through the Ranks" },
  { id: "boltox", label: "Boltox" },
];

// Helper to get labels for marquee display
export const sponsorLabels = sponsors.map((s) => s.label);
