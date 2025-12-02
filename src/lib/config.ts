/**
 * Centralized configuration for Arctic Pandas
 * All external URLs, contact info, and site-wide settings
 */

export const siteConfig = {
  name: "Arctic Pandas",
  description: "Finnish League of Legends esports organization",
  url: "https://arcticpandas.gg",
  locale: "en",
} as const;

export const contactConfig = {
  email: "contact@arcticpandas.gg",
  emailHref: "mailto:contact@arcticpandas.gg",
} as const;

export const socialConfig = {
  twitch: {
    url: "https://twitch.tv/arcticpandas",
    handle: "arcticpandas",
  },
  // Add more social links as needed
  // twitter: { url: "https://twitter.com/arcticpandas", handle: "arcticpandas" },
  // discord: { url: "https://discord.gg/arcticpandas", handle: "Arctic Pandas" },
} as const;

export const externalLinks = {
  opggBase: "https://op.gg/lol/summoners",
} as const;

export const assets = {
  logo: "/MaskedPanda_IconWhite.jpg",
  ogImage: "/MaskedPanda_IconWhite.jpg",
  heroVideo: "/Hiivapromo.mp4",
} as const;
