export type Milestone = {
  id: string;
  label: string;
  labelMobile: [string, string];
  x: number;
  y: number;
  textOffset?: number;
  textOffsetMobile?: number;
};

export const timelineNodes: Milestone[] = [
  {
    id: "nlc",
    label: "WINNING NLC",
    labelMobile: ["WINNING", "NLC"],
    x: 10,
    y: 20,
  },
  {
    id: "emea",
    label: "WINNING EMEA MASTERS",
    labelMobile: ["WINNING", "EMEA MASTERS"],
    x: 50,
    y: 16,
    textOffset: -4.5,
    textOffsetMobile: -8.5,
  },
  {
    id: "next",
    label: "NEXT STAR AWAITS",
    labelMobile: ["NEXT STAR", "AWAITS"],
    x: 90,
    y: 8,
  },
];
