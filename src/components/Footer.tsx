import styles from "./Footer.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

const footerStyle: CSSVarStyles = {
  color: colors.frostGrey,
  "--divider-color": withAlpha(colors.frostGrey, 0.2),
  "--accent-color": colors.frostBlue,
  "--footer-bg": colors.background,
};

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.inner}>
        <span>© 2026 Arctic Pandas Oy</span>
      </div>
    </footer>
  );
}
