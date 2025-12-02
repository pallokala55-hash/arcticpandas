import Link from "next/link";
import Image from "next/image";
import { mainNavLinks, headerCta, type NavLink } from "../data/navigation";
import { assets } from "../lib/config";
import styles from "./Header.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

type HeaderProps = {
  navLinks?: NavLink[];
  cta?: NavLink;
};

const Header = ({ navLinks = mainNavLinks, cta = headerCta }: HeaderProps) => {
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
        <Link className={styles.brand} href="/" aria-label="Arctic Pandas logo">
          <Image
            className={styles.logoStandalone}
            src={assets.logo}
            alt="Arctic Pandas emblem"
            width={40}
            height={40}
          />
          <span>Arctic Pandas</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.id} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className={styles.cta}
          href={cta.href}
          style={{ borderColor: colors.foreground }}
        >
          {cta.label}
        </a>
      </div>
    </header>
  );
};

export default Header;
