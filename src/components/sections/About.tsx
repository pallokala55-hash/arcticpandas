import MemberCard from "../MemberCard";
import styles from "./About.module.css";
import { players } from "../../data/players";
import { management } from "../../data/management";
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
            <MemberCard
              key={player.slug}
              name={player.name}
              image={player.image}
              href={`/${player.slug}`}
            />
          ))}
        </div>

        <div className={styles.lede}>
          <p className={styles.kicker}>Management</p>
        </div>
        <div className={styles.management}>
          {management.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              maxWidth={280}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
