export type RosterPlayer = {
  name: string;
  slug: string;
  role: string;
  image: string;
  note: string;
};

export const roster: RosterPlayer[] = [
  { name: "Nille", slug: "nille", role: "Top", image: "/nille.webp", note: "200+ pro matches\nNordic Champion" },
  { name: "Dibu", slug: "dibu", role: "Jungle", image: "/dipu.webp", note: "ERL veteran\nLowLandLions, Sector One" },
  { name: "Simpli", slug: "simpli", role: "Mid", image: "/simpli.webp", note: "Prime League 2nd\nUoL Sexy Edition" },
  { name: "Kehvo", slug: "kehvo", role: "ADC", image: "/Kehvo.webp", note: "ENCE, Verdant\nRiddle alumni" },
  { name: "Boltox", slug: "boltox", role: "Support", image: "/boltox.webp", note: "Estonia\nBlueWhites, NLC 2nd Div" },
];
