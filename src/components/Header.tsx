import styles from "./Header.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

const navLinks = [
  { label: "Explore", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#cta" },
];

const Header = () => {
  const headerStyle: CSSVarStyles = {
    backgroundColor: colors.background,
    color: colors.foreground,
    borderBottom: `1px solid ${withAlpha(colors.frostGrey, 0.2)}`,
    "--link-color": colors.frostGrey,
    "--accent-color": colors.frostBlue,
    "--divider-color": withAlpha(colors.frostGrey, 0.25),
    "--logo-bg": withAlpha(colors.foreground, 0.05),
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <div className={styles.container}>
        <a
          className={styles.brand}
          href="#hero"
          aria-label="Arctic Pandas logo"
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
            <a key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className={styles.cta}
          href="#cta"
          style={{ borderColor: colors.foreground }}
        >
          Sponsor deck
        </a>
      </div>
    </header>
  );
};

export default Header;
