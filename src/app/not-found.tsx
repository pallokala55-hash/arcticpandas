import Link from "next/link";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

export default function NotFound() {
  const containerStyle: CSSVarStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  };

  const titleStyle: CSSVarStyles = {
    fontSize: "clamp(4rem, 15vw, 10rem)",
    fontWeight: 700,
    color: colors.frostBlue,
    margin: 0,
    lineHeight: 1,
  };

  const subtitleStyle: CSSVarStyles = {
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    color: colors.frostGrey,
    margin: "16px 0 32px",
  };

  const linkStyle: CSSVarStyles = {
    display: "inline-block",
    padding: "12px 32px",
    backgroundColor: "transparent",
    color: colors.foreground,
    border: `1px solid ${withAlpha(colors.frostGrey, 0.4)}`,
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    transition: "all 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={subtitleStyle}>This page doesn't exist in the facility.</p>
      <Link href="/" style={linkStyle}>
        Return to base
      </Link>
    </div>
  );
}
