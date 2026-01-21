export type PlayerProfileData = {
  slug: string;
  name: string;
  role: string;
  origin: string;
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
    image: "/nille.webp",
    headline: "Juho Janhunen",
    subtitle: "Seven-year veteran with 15+ teams and 200+ pro matches.",
    bio: "Nille is one of the most experienced top laners in the Nordic scene, having competed across Germany, Denmark, Turkey, Spain, Norway, France, and the Nordics since 2018. He won the Nordic Championship 2020 Spring with Team Singularity, claimed LFL Division 2 2025 Spring with Valiant, and reached the NLC 2023 Spring final with Verdant, earning 1st All-Pro honors that split.",
    tags: ["ERL veteran", "NLC All-Pro 2023", "Nordic Champion"],
    highlights: [
      "1st place Nordic Championship 2020 Spring (Team Singularity)",
      "1st place LFL Division 2 2025 Spring (Team Valiant)",
      "2nd place NLC Spring 2023 & EMEA Masters qualifier (Verdant)",
    ],
    playbook: "Ornn · Renekton · K'Sante · Camille",
    peak: {
      tier: "challenger",
      text: "CHALLENGER · 1394 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Frank%20Lundy-AGENT",
    },
  },
  {
    slug: "simpli",
    name: "Simpli",
    role: "Mid Laner",
    origin: "Finland",
    image: "/simpli.webp",
    headline: "Anselmi Rintanen",
    subtitle:
      "The 'Finnish Faker' — Prime League finalist, EMEA Masters veteran.",
    bio: "Simpli earned the 'Finnish Faker' nickname for his mechanical plays at FC Schalke 04 Esports. Starting at NYYRIKKI Academy in 2019, he joined ENCE's all-Finnish roster in 2020 alongside Nille and Kehvo. He reached the Prime League 2024 Summer final with Schalke, then competed at EMEA Masters 2025 Summer with UoL Sexy Edition.",
    tags: ["Finnish Faker", "Prime League finalist", "ENCE 2020"],
    highlights: [
      "2nd place Prime League Summer 2024 (FC Schalke 04 Esports)",
      "EMEA Masters 2025 Summer (UoL Sexy Edition)",
      "First Aurelion Sol pentakill in competitive play (March 2023)",
    ],
    playbook: "Orianna · Azir · Ahri · Aurelion Sol",
    peak: {
      tier: "challenger",
      text: "CHALLENGER · 1215 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Simpli-000",
    },
  },
  {
    slug: "dibu",
    name: "Dibu",
    role: "Jungler",
    origin: "Finland",
    image: "/dipu.webp",
    headline: "Janne Heikkonen",
    subtitle:
      "Belgian League triple crown winner, ERL veteran since 2019.",
    bio: "Dibu has competed professionally since 2019, with his peak coming in 2020 when he led Sector One to a dominant Belgian League season — winning Spring, Summer, and Country Finals. He earned MVP honors in Spring playoffs and has since played for LowLandLions, mYinsanity, and All For One Gaming across the Dutch League and Prime League.",
    tags: ["Belgian League MVP", "Triple crown 2020", "ERL veteran"],
    highlights: [
      "1st place Belgian League Spring, Summer & Country Finals 2020 (Sector One)",
      "MVP Belgian League Spring 2020 Playoffs Final",
      "MVP Dutch League Summer 2021 Week 5 (LowLandLions)",
    ],
    playbook: "Viego · Lee Sin · Rek'Sai · Sejuani",
    peak: {
      tier: "grandmaster",
      text: "GRANDMASTER · 465 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Jan%20Olejko-1234",
    },
  },
  {
    slug: "kehvo",
    name: "Kehvo",
    role: "ADC",
    origin: "Finland",
    image: "/Kehvo.webp",
    headline: "Aleksi Merta",
    subtitle:
      "Benelux Masters champion, international career across 5 regions.",
    bio: "Kehvo has built a reputation for consistency across the UK, Netherlands, Belgium, and MENA regions since 2018. He won the Elite Series Benelux Masters 2023 with Myth Esports and reached 2nd at the Arabian League 2025 Winter with Anubis Gaming. In 2020, he was part of ENCE's all-Finnish roster alongside Nille and Simpli — a reunion now happening at Arctic Pandas.",
    tags: ["Benelux champion", "ENCE 2020", "International career"],
    highlights: [
      "1st place Elite Series Benelux Masters 2023 (Myth Esports)",
      "2nd place Arabian League 2025 Winter (Anubis Gaming)",
      "2nd place NLC Spring 2023 Division 1 (Verdant)",
    ],
    playbook: "Ezreal · Kai'Sa · Smolder · Senna",
    peak: {
      tier: "grandmaster",
      text: "GRANDMASTER · 876 LP",
      opggUrl: "https://op.gg/lol/summoners/euw/Kehvo-EUW",
    },
  },
  {
    slug: "boltox",
    name: "Boltox",
    role: "Support",
    origin: "Estonia",
    image: "/boltox.webp",
    headline: "Arlet Semre",
    subtitle:
      "Rising Estonian talent climbing through the Nordic circuit.",
    bio: "Boltox started his competitive journey with VISU Gaming Snow in 2022, then moved through BlueWhites, Estonian Vipers, and Epic Avalanche. As one of the few Estonian players in the NLC, he brings a fresh perspective to Arctic Pandas. His solo queue peak of Challenger 1099 LP demonstrates the mechanical skill backing his climb through the regional scene.",
    tags: ["Estonian", "NLC rising", "Challenger peak"],
    highlights: [
      "Challenger peak at 1099 LP on EUW",
      "NLC 2nd Division experience with BlueWhites",
      "Ultraliga 2nd Division with Estonian Vipers",
    ],
    playbook: "Nautilus · Rell · Karma · Bard",
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
