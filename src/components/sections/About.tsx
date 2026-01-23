import MemberCard from "../MemberCard";
import styles from "./About.module.css";
import { roster } from "../../data";
import { management } from "../../data/management";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const sectionStyle: CSSVarStyles = {
  "--divider-color": withAlpha(colors.frostGrey, 0.16),
  "--muted": colors.frostGrey,
  "--about-bg": withAlpha(colors.foreground, 0.01),
};

export default function About(): React.ReactElement {
  return (
    <section id="team" className={styles.about} style={sectionStyle}>
      <div className={styles.container}>
        <div className={styles.lede}>
          <h2 className={styles.kicker}>Team composition</h2>
        </div>
        <div className={styles.composition}>
          {roster.map((player) => (
            <MemberCard
              key={player.slug}
              variant="compact"
              name={player.name}
              role={player.role}
              image={player.image}
              note={player.note}
              href={`/${player.slug}`}
            />
          ))}
        </div>

        <div className={styles.lede}>
          <h2 className={styles.kicker}>Management</h2>
        </div>
        <div className={styles.management}>
          {management.map((member) => (
            <MemberCard
              key={member.id}
              variant="compact"
              name={member.name}
              image={member.image}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
