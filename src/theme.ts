import type { CSSProperties } from "react";

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  // Base
  background: "#000000",
  foreground: "#FFFFFF",

  // Brand
  frostGrey: "#C8C8C8",
  frostBlue: "#4ED0FF",

  // Semantic
  success: "#34D399",
  error: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
} as const;

// Glow effects (used in Hero, CTA, etc.)
export const glows = {
  heroBlue: "rgba(12, 42, 88, 0.72)",
  heroOrange: "rgba(255, 120, 40, 0.28)",
  ctaBlue: "rgba(10, 28, 64, 0.65)",
  ctaOrange: "rgba(210, 120, 46, 0.24)",
  dark: "rgba(6, 10, 18, 0.9)",
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const layout = {
  maxWidth: "1200px",
  sectionPadding: "96px 24px",
} as const;

// =============================================================================
// UTILITIES
// =============================================================================

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
