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

export type ThemeColors = typeof colors;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export type ThemeSpacing = typeof spacing;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "900px",
  xl: "1100px",
  "2xl": "1200px",
} as const;

export type ThemeBreakpoints = typeof breakpoints;

// Media query helpers (for use in CSS-in-JS or component logic)
export const media = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const layout = {
  maxWidth: "1200px",
  sectionPadding: "96px 24px",
} as const;

export type ThemeLayout = typeof layout;

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

// =============================================================================
// THEME OBJECT (for programmatic access)
// =============================================================================

export const theme = {
  colors,
  spacing,
  breakpoints,
  media,
  fontSize,
  fontWeight,
  lineHeight,
  layout,
} as const;

export type Theme = typeof theme;
