export type Milestone = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type TimelineStar = {
  x: number;
  y: number;
  r: number;
  opacity: number;
};

export const timelineNodes: Milestone[] = [
  { id: "fpl", label: "WINNING FPL", x: 3, y: 14 },
  { id: "nlc", label: "WINNING NLC", x: 34, y: 17 },
  { id: "emea", label: "WINNING EMEA MASTERS", x: 65, y: 8.5 },
  { id: "next", label: "NEXT STAR AWAITS", x: 94, y: 13.5 },
];

export const timelineStars: TimelineStar[] = [
  { x: 6, y: 6, r: 0.18, opacity: 0.45 },
  { x: 18, y: 10, r: 0.22, opacity: 0.5 },
  { x: 26, y: 5, r: 0.16, opacity: 0.35 },
  { x: 42, y: 12, r: 0.2, opacity: 0.4 },
  { x: 50, y: 4, r: 0.16, opacity: 0.38 },
  { x: 64, y: 16.5, r: 0.18, opacity: 0.42 },
  { x: 74, y: 6, r: 0.22, opacity: 0.45 },
  { x: 88, y: 10, r: 0.2, opacity: 0.36 },
  { x: 94, y: 4, r: 0.15, opacity: 0.32 },
  { x: 16, y: 20, r: 0.18, opacity: 0.38 },
];
