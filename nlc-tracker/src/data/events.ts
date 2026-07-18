import type { Event } from "./types";

export const events: Event[] = [
  {
    id: "nlc-summer-2026",
    slug: "nlc-summer-2026",
    name: "NLC 2026 Summer",
    series: "NLC 2026",
    status: "ongoing",
    startDate: "2026-06-04",
    endDate: "2026-07-26",
    location: "Online · Nordics & UK",
    prizePool: "€40,000",
    teamIds: ["ap", "nly", "krk", "ims", "pvx", "rvn", "fjf", "msn"],
    format: {
      group: "Single round robin · Bo1",
      playoffs: "Top 4 · Double elimination · Bo5",
    },
    bracket: {
      type: "double",
      columns: [
        {
          id: "ub-sf",
          title: "UB Semifinals",
          grid: "upper",
          order: 0,
          matchIds: ["nlc-su26-po-ubsf1", "nlc-su26-po-ubsf2"],
        },
        {
          id: "ub-final",
          title: "UB Final",
          grid: "upper",
          order: 1,
          matchIds: ["nlc-su26-po-ubf"],
        },
        {
          id: "grand-final",
          title: "Grand Final",
          grid: "final",
          order: 2,
          matchIds: ["nlc-su26-po-gf"],
        },
        {
          id: "lb-r1",
          title: "LB Round 1",
          grid: "lower",
          order: 0,
          matchIds: ["nlc-su26-po-lbr1"],
        },
        {
          id: "lb-final",
          title: "LB Final",
          grid: "lower",
          order: 1,
          matchIds: ["nlc-su26-po-lbf"],
        },
      ],
    },
  },
  {
    id: "aurora-cup-2026",
    slug: "aurora-cup-2026",
    name: "NLC Aurora Cup 2026",
    series: "NLC 2026",
    status: "upcoming",
    startDate: "2026-08-14",
    endDate: "2026-08-16",
    location: "Helsinki, Finland",
    prizePool: "€10,000",
    teamIds: ["ap", "nly", "krk", "ims", "pvx", "rvn", "fjf", "msn"],
    format: {
      playoffs: "8 teams · Single elimination · Bo3",
    },
    bracket: {
      type: "single",
      columns: [
        {
          id: "qf",
          title: "Quarterfinals",
          grid: "upper",
          order: 0,
          matchIds: ["aurora26-qf1", "aurora26-qf2", "aurora26-qf3", "aurora26-qf4"],
        },
        {
          id: "sf",
          title: "Semifinals",
          grid: "upper",
          order: 1,
          matchIds: ["aurora26-sf1", "aurora26-sf2"],
        },
        {
          id: "final",
          title: "Final",
          grid: "final",
          order: 2,
          matchIds: ["aurora26-final"],
        },
      ],
    },
  },
  {
    id: "nlc-winter-2027",
    slug: "nlc-winter-2027",
    name: "NLC 2027 Winter",
    series: "NLC 2027",
    status: "upcoming",
    startDate: "2027-01-14",
    endDate: "2027-03-20",
    location: "Online · Nordics & UK",
    prizePool: "€40,000",
    teamIds: ["ap", "nly", "krk", "ims", "pvx", "rvn", "fjf", "msn"],
    format: {
      group: "Double round robin · Bo1",
      playoffs: "Top 6 · Double elimination · Bo5",
    },
  },
];

export const eventsById = new Map(events.map((e) => [e.id, e]));
export const eventsBySlug = new Map(events.map((e) => [e.slug, e]));

export function getEvent(id: string): Event | undefined {
  return eventsById.get(id);
}

export function getEventBySlug(slug: string): Event | undefined {
  return eventsBySlug.get(slug);
}
