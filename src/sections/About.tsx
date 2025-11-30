import styles from "./About.module.css";
import { players } from "../data/players";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

const About = () => {
  const sectionStyle: CSSVarStyles = {
    "--divider-color": withAlpha(colors.frostGrey, 0.16),
    "--muted": colors.frostGrey,
    "--about-bg": withAlpha(colors.foreground, 0.01),
  };

  return (
    <section id="team" className={styles.about} style={sectionStyle}>
      <div className={styles.container}>
        <div className={styles.lede}>
          <p className={styles.kicker}>Team composition</p>
        </div>
        <div className={styles.composition}>
          {players.map((player) => (
            <a
              key={player.slug}
              className={`${styles.compItem} ${styles.clickable}`}
              href={`/${player.slug}`}
              aria-label={`Open ${player.name}'s player profile`}
            >
              <div className={styles.compAvatar}>
                <img src={player.image} alt={player.name} />
              </div>
              <span className={styles.compName}>{player.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
