import type { MouseEvent } from "react";
import styles from "./Header.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

export type HeaderNavLink = {
  label: string;
  href: string;
  type?: "anchor" | "route";
};

type HeaderProps = {
  navLinks?: HeaderNavLink[];
  cta?: HeaderNavLink;
  onNavigate?: (path: string) => void;
  brandHref?: string;
};

const defaultNavLinks: HeaderNavLink[] = [
  { label: "Explore", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#cta" },
  { label: "Shop", href: "/shop", type: "route" },
];

const defaultCta: HeaderNavLink = {
  label: "Sponsor deck",
  href: "#cta",
};

const Header = ({
  navLinks = defaultNavLinks,
  cta = defaultCta,
  onNavigate,
  brandHref = "/",
}: HeaderProps) => {
  const headerStyle: CSSVarStyles = {
    backgroundColor: colors.background,
    color: colors.foreground,
    borderBottom: `1px solid ${withAlpha(colors.frostGrey, 0.2)}`,
    "--link-color": colors.frostGrey,
    "--accent-color": colors.frostBlue,
    "--divider-color": withAlpha(colors.frostGrey, 0.25),
    "--logo-bg": withAlpha(colors.foreground, 0.05),
  };

  const handleRoute = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    type: HeaderNavLink["type"],
  ) => {
    if (type === "route" && onNavigate) {
      event.preventDefault();
      onNavigate(href);
    }
  };

  const handleBrand = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(brandHref);
    }
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <div className={styles.container}>
        <a
          className={styles.brand}
          href={brandHref}
          aria-label="Arctic Pandas logo"
          onClick={handleBrand}
        >
          <img
            className={styles.logoStandalone}
            src="/MaskedPanda_IconWhite.jpg"
            alt="Arctic Pandas emblem"
          />
          <span>Arctic Pandas</span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              className={styles.navLink}
              href={link.href}
              onClick={(event) => handleRoute(event, link.href, link.type)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className={styles.cta}
          href={cta.href}
          onClick={(event) => handleRoute(event, cta.href, cta.type)}
          style={{ borderColor: colors.foreground }}
        >
          {cta.label}
        </a>
      </div>
    </header>
  );
};

export default Header;
