import Button from "../components/Button";
import styles from "./CTA.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

const CTA = () => {
  const sectionStyle: CSSVarStyles = {
    "--cta-bg": "transparent",
    "--cta-text": colors.foreground,
    "--muted": withAlpha(colors.frostGrey, 0.82),
    "--divider-color": withAlpha(colors.frostGrey, 0.18),
  };

  return (
    <section id="cta" className={styles.cta} style={sectionStyle}>
      <div className={styles.container}>
        <div>
          <p className={styles.kicker}>Engage</p>
          <h2 className={styles.title}>Want to talk partnerships?</h2>
          <p className={styles.copy}>
            We offer stable, camera-ready players, consistent on-brand
            production and clear deliverables for partners.
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" href="mailto:contact@arcticpandas.gg">
            Contact Ops
          </Button>
          <Button variant="secondary" href="#hero">
            Back to Top
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
