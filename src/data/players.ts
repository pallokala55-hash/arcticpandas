export type PlayerProfileData = {
  slug: string;
  name: string;
  role: string;
  origin: string;
  style: string;
  shotcalling: string;
  image: string;
  headline: string;
  subtitle: string;
  bio: string;
  tags: string[];
  highlights: string[];
  playbook: string;
  peak: {
    tier: "grandmaster" | "challenger";
    text: string;
    opggUrl: string;
  };
};

export const players: PlayerProfileData[] = [
  {
    slug: "nille",
    name: "Nille",
    role: "Top Laner",
    origin: "Finland",
    style: "Control + calculated trades",
    shotcalling: "Primary mid/late",
    image: "/Nille.png",
    headline: "Cold-blooded top anchor.",
    subtitle: "Precision laner, calm comms, tilts pressure into map control.",
    bio: "Nille closes space with patient wave control and favors high-percentage skirmishes. He keeps parity on weakside, then transfers gold to decisive Baron setups. In critical fights he mirrors flank threats, anchoring Arctic Pandas' mid-late game structure.",
    tags: ["Discipline-first", "Late-game insurance", "Vision led rotations"],
    highlights: [
      "Locks weakside without bleeding tempo, enabling bot lane acceleration.",
      "Reads map states early; converts TP windows into objective flips.",
      "Prefers measured aggression on bruisers, turns skirmishes into picks.",
    ],
    playbook: "Ornn · Renekton · K'Sante · Camille",
    peak: {
      tier: "challenger",
      text: "CHALLENGER · 1170 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Frank%20Lundy-AGENT",
    },
  },
  {
    slug: "simpli",
    name: "Simpli",
    role: "Jungler",
    origin: "Finland",
    style: "Tempo pathing + counter ganks",
    shotcalling: "Early objective pacing",
    image: "/Simpli.png",
    headline: "Pathing-first jungle tactician.",
    subtitle:
      "Tracks tempo, pressures lanes with smart timers, never forces coin-flips.",
    bio: "Simpli scouts lane states before first camp, plotting dives only when vision nets safe exits. He stacks early dragons off priority, then flips tempo with Herald-to-bot crossmaps. In fights he peels until carry timers hit, then calls the green light.",
    tags: ["Tempo control", "Objective setups", "Vision discipline"],
    highlights: [
      "Turns 3-camp openers into guaranteed scuttle control.",
      "Holds flash for counter ganks, flipping pressure back at minute four.",
      "Secures heralds on spawn, converting into plates without burning sums.",
    ],
    playbook: "Lee Sin · Viego · Wukong · Sejuani",
    peak: {
      tier: "challenger",
      text: "CHALLENGER · 1130 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Simpli-000",
    },
  },
  {
    slug: "dibu",
    name: "Dibu",
    role: "Mid Laner",
    origin: "Finland",
    style: "Wave control + roam timing",
    shotcalling: "Mid-game skirmish setups",
    image: "/Dibu.png",
    headline: "Control-mage navigator.",
    subtitle:
      "Crashes waves on command, roams on vision, anchors mid-map prio.",
    bio: "Dibu keeps tempo with clean wave spacing, buying windows for jungle invades and side-lane dives. He holds summoners for objective fights, positioning to zone carries with precise spacing. On side lanes he stabilizes weakside until Baron calls are online.",
    tags: ["Lane parity", "Roam windows", "Fight spacing"],
    highlights: [
      "Crashes slow-push into bot to set up first dragon stack.",
      "Freezes defensive waves to deny enemy roams without losing XP.",
      "Maintains flash for 5v5s, giving backline consistent DPS uptime.",
    ],
    playbook: "Orianna · Azir · Ahri · Syndra",
    peak: {
      tier: "grandmaster",
      text: "GRANDMASTER · 870 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/dibu-EUW11",
    },
  },
  {
    slug: "kehvo",
    name: "Kehvo",
    role: "Bot Laner",
    origin: "Finland",
    style: "DPS carry + positioning focus",
    shotcalling: "Fight focus and target calls",
    image: "/Kehvo.png",
    headline: "Late-game damage guarantee.",
    subtitle:
      "Plays for plate leads, protects tempo, spikes hard on two items.",
    bio: "Kehvo tracks enemy jungler to absorb pressure, farming safely until item spikes. He uses concise comms for target focus, kiting back to terrain for peel. Once ahead he shadows jungle to secure river, turning every fight into a DPS check.",
    tags: ["Safe scaling", "Plate control", "Clean kiting"],
    highlights: [
      "Plays weakside on resets to protect CS curve toward two-item spikes.",
      "Stacks plates with support timers without exposing sums.",
      "Calls target focus early, translating micro leads into Baron setups.",
    ],
    playbook: "Zeri · Aphelios · Kai'Sa · Jinx",
    peak: {
      tier: "grandmaster",
      text: "GRANDMASTER · 990 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Kehvo-EUW",
    },
  },
  {
    slug: "boltox",
    name: "Boltox",
    role: "Support",
    origin: "Finland",
    style: "Vision control + engage picks",
    shotcalling: "Lane calls and vision layouts",
    image: "/Boltox.png",
    headline: "Engage-first vision architect.",
    subtitle:
      "Sets trap lines, pulls triggers with confidence, peels when needed.",
    bio: "Boltox maps vision for every objective window, escorting carries through fog. He starts fights when timers are aligned, otherwise peels and front-lines to stall. His resets are disciplined, ensuring river control before opponents can contest.",
    tags: ["Engage timing", "Vision nets", "Peel flexibility"],
    highlights: [
      "Establishes first river line two minutes before objectives.",
      "Flashes in on support timers; otherwise peels back to protect DPS.",
      "Creates pick angles with control wards and sweepers to force sums.",
    ],
    playbook: "Rakan · Nautilus · Rell · Braum",
    peak: {
      tier: "challenger",
      text: "CHALLENGER · 1099 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Boltox-EUW",
    },
  },
];

export const playersBySlug = players.reduce<Record<string, PlayerProfileData>>(
  (acc, player) => {
    acc[player.slug] = player;
    return acc;
  },
  {},
);
