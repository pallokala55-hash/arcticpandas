import { sponsorLabels } from "../../data/sponsors";
import styles from "./SponsorMarquee.module.css";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const SponsorMarquee = () => {
  const sectionStyle: CSSVarStyles = {
    "--marquee-bg": "rgba(4, 8, 16, 0.94)",
    "--marquee-border": withAlpha(colors.frostGrey, 0.16),
    "--marquee-text": colors.foreground,
    "--marquee-muted": withAlpha(colors.frostGrey, 0.65),
  };

  const rollingLabels = [...sponsorLabels, ...sponsorLabels];

  return (
    <section className={styles.marquee} style={sectionStyle}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.container} aria-label="Sponsor banner">
        <div className={styles.track}>
          {rollingLabels.map((label, index) => (
            <span className={styles.item} key={`${label}-${index}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorMarquee;
