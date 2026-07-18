import MemberCard from "../MemberCard";
import styles from "./Team.module.css";
import { roster } from "../../data";

export default function Team(): React.ReactElement {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Team</h2>
        </div>

        <div className={styles.rosterSection}>
          <h3 className={styles.sectionLabel}>Roster</h3>
          <div className={styles.rosterGrid}>
            {roster.map((player) => (
              <MemberCard
                key={player.slug}
                variant="compact"
                name={player.name}
                role={player.role}
                image={player.image}
                href={`/${player.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
