import { footerLinks } from "../data/navigation";
import { contactConfig } from "../lib/config";
import styles from "./Footer.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

const Footer = () => {
  const footerStyle: CSSVarStyles = {
    color: colors.frostGrey,
    "--divider-color": withAlpha(colors.frostGrey, 0.2),
    "--accent-color": colors.frostBlue,
    "--footer-bg": colors.background,
  };

  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} Arctic Pandas.</span>
        <div className={styles.links}>
          {footerLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={contactConfig.emailHref}>Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
