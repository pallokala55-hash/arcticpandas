import Link from "next/link";
import Image from "next/image";
import styles from "./About.module.css";
import { players } from "../../data/players";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

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
            <Link
              key={player.slug}
              className={`${styles.compItem} ${styles.clickable}`}
              href={`/${player.slug}`}
              scroll={false}
              aria-label={`Open ${player.name}'s player profile`}
            >
              <div className={styles.compAvatar}>
                <Image
                  src={player.image}
                  alt={player.name}
                  width={80}
                  height={80}
                />
              </div>
              <span className={styles.compName}>{player.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
