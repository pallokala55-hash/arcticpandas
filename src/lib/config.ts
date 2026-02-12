/**
 * Centralized configuration for Arctic Pandas
 * All external URLs, contact info, and site-wide settings
 */

export const siteConfig = {
  name: "Arctic Pandas",
  description: "Finnish League of Legends esports organization",
  url: "https://pandas.gg",
  locale: "en",
} as const;

export const contactConfig = {
  email: "tapio@pandas.gg",
  emailHref: "mailto:tapio@pandas.gg",
} as const;

export const socialConfig = {
  twitch: {
    url: "https://www.twitch.tv/arcticpandasGG",
    handle: "arcticpandass",
  },
  twitter: {
    url: "https://x.com/arcticpandasgg",
    handle: "ArcticPandasGG",
  },
  discord: {
    url: "https://discord.gg/mDqbUaqegV",
    handle: "Arctic Pandas",
  },
  youtube: {
    url: "https://www.youtube.com/@pandasgg",
    handle: "pandasgg",
  },
  instagram: {
    url: "https://www.instagram.com/arcticpandasgg/",
    handle: "arcticpandasgg",
  },
} as const;

export const externalLinks = {
  opggBase: "https://op.gg/lol/summoners",
} as const;

export const assets = {
  logo: "/logo.svg",
  ogImage: "/MaskedPanda_IconWhite.jpg",
  heroVideo: "/Hiivapromo.mp4",
} as const;
