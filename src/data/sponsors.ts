export type Sponsor = {
  id: string;
  label: string;
  // Add more fields as needed when sponsors are finalized:
  // logo?: string;
  // url?: string;
  // tier?: "premier" | "partner" | "supporter";
};

export const sponsors: Sponsor[] = [
  { id: "sponsor-logo", label: "Sponsor logo" },
  { id: "premier-partner", label: "Premier partner" },
  { id: "broadcast-lane", label: "Broadcast lane" },
  { id: "tech-stack", label: "Tech stack slot" },
  { id: "analyst-desk", label: "Analyst desk partner" },
  { id: "scrim-facility", label: "Scrim facility" },
];

// Helper to get labels for marquee display
export const sponsorLabels = sponsors.map((s) => s.label);
