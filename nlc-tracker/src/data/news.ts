import type { NewsItem } from "./types";

export const news: NewsItem[] = [
  {
    id: "n1",
    slug: "ap-sweep-into-ub-final",
    title:
      "Arctic Pandas take down Nordlys 3–1 and march into the Upper Bracket Final",
    excerpt:
      "A dominant mid-jungle performance sends the regular season winners one series away from the Grand Final.",
    category: "Playoffs",
    publishedAt: "2026-07-11",
    featured: true,
    gradient: "linear-gradient(135deg, #1b2a5e 0%, #4ED0FF 55%, #0b1b3a 100%)",
  },
  {
    id: "n2",
    slug: "kraken-survive-vortex",
    title: "Kraken Union survive a five-game thriller against Polar Vortex",
    excerpt:
      "The Swedish squad clutches game five off the back of Maelstrom's signature Azir.",
    category: "Playoffs",
    publishedAt: "2026-07-12",
    gradient: "linear-gradient(135deg, #0E5F4B 0%, #34D399 60%, #052e25 100%)",
  },
  {
    id: "n3",
    slug: "vortex-eliminate-nordlys",
    title: "Polar Vortex eliminate Nordlys and set up a Loser Bracket Final",
    excerpt:
      "Nordlys' season ends in 4th place after a second five-game series in a week.",
    category: "Playoffs",
    publishedAt: "2026-07-16",
    gradient: "linear-gradient(135deg, #5B21B6 0%, #C4B5FD 60%, #2a1065 100%)",
  },
  {
    id: "n4",
    slug: "aurora-cup-announced",
    title: "NLC Aurora Cup announced — offline finals in Helsinki this August",
    excerpt:
      "All eight NLC teams meet in a single-elimination cup between the summer and winter splits.",
    category: "Announcement",
    publishedAt: "2026-07-10",
    gradient: "linear-gradient(135deg, #7C2D12 0%, #FB923C 60%, #3a1406 100%)",
  },
  {
    id: "n5",
    slug: "midnight-sun-roster-changes",
    title: "Midnight Sun confirm roster review after a 1–6 split",
    excerpt:
      "The Finnish organisation says changes are coming for the bot side of the map.",
    category: "Roster",
    publishedAt: "2026-07-14",
    gradient: "linear-gradient(135deg, #7F1D1D 0%, #F87171 60%, #3f0d0d 100%)",
  },
];

export const featuredNews = news.find((n) => n.featured) ?? news[0];

export const popularNews = news
  .filter((n) => !n.featured)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
