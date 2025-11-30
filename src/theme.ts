import type { CSSProperties } from "react";

export const colors = {
  background: "#000000",
  foreground: "#FFFFFF",
  frostGrey: "#C8C8C8",
  frostBlue: "#4ED0FF",
} as const;

export const layout = {
  maxWidth: "1200px",
  sectionPadding: "96px 24px",
} as const;

export type ThemeColors = typeof colors;
export type CSSVarStyles = CSSProperties & Record<string, string | number>;

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return { r, g, b };
};

export const withAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
