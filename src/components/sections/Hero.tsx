import GridOverlay from "../GridOverlay";
import Button from "../Button";
import { assets } from "../../lib/config";
import styles from "./Hero.module.css";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const Hero = () => {
  const sectionStyle: CSSVarStyles = {
    "--divider-color": withAlpha(colors.frostGrey, 0.18),
    "--muted": colors.frostGrey,
    "--accent": colors.frostBlue,
    "--hero-glow-1": "rgba(12, 42, 88, 0.72)",
    "--hero-glow-2": "rgba(255, 120, 40, 0.28)",
    "--hero-glow-3": "rgba(6, 10, 18, 0.9)",
    "--hero-glow-base": withAlpha(colors.background, 0.95),
  };

  return (
    <section id="hero" className={styles.hero} style={sectionStyle}>
      <div className={styles.backdrop} />
      <div className={styles.heroStars} aria-hidden="true" />
      <GridOverlay color="rgba(90, 140, 255, 0.18)" />
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.label}>ALEKSI "HIIVA" KAIKKONEN LEAD</p>
          <h1 className={styles.title}>ARCTIC PANDAS</h1>
          <p className={styles.meta}>
            FINLAND · LEAGUE OF LEGENDS · Esports Command
          </p>
          <div className={styles.actions}>
            <Button variant="primary" href="#about">
              Explore the facility
            </Button>
            <Button variant="secondary" href="#team">
              Meet the roster
            </Button>
          </div>
        </div>
        <div className={styles.frameWrap} aria-hidden="true">
          <div className={styles.frame}>
            <div className={styles.frameInner}>
              <video
                className={styles.frameVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={assets.heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollHint}>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
