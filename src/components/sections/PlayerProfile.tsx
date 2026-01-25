import Image from "next/image";
import { type PlayerProfileData } from "../../data";
import styles from "./PlayerProfile.module.css";

type PlayerProfileProps = {
  player: PlayerProfileData;
};

// Players who were on ENCE 2020 together
const enceReunionSlugs = ["nille", "simpli", "kehvo"];

export default function PlayerProfile({ player }: PlayerProfileProps): React.ReactElement {
  const isEnceReunion = enceReunionSlugs.includes(player.slug);

  return (
    <section className={styles.profile}>
      {/* Background layers */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.noiseOverlay} aria-hidden="true" />
      <div className={styles.glowOrb} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left column - Portrait */}
        <div className={styles.portraitColumn}>
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src={player.image}
              alt={player.name}
              width={480}
              height={600}
              priority
            />
            <div className={styles.portraitOverlay} aria-hidden="true" />
            <div className={styles.roleBadge}>{player.role}</div>
          </div>

          {/* Champion pool card */}
          <div className={styles.playbookCard}>
            <span className={styles.playbookLabel}>CHAMPION POOL</span>
            <p className={styles.playbookValue}>{player.playbook}</p>
          </div>
        </div>

        {/* Right column - Content */}
        <div className={styles.contentColumn}>
          {/* Header section */}
          <div className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.ign}>{player.name}</span>
              <span className={styles.metaDivider}>·</span>
              <span className={styles.origin}>{player.origin}</span>
            </div>
            <h1 className={styles.realName}>{player.headline}</h1>
            <p className={styles.tagline}>{player.subtitle}</p>

            {/* Tags */}
            <div className={styles.tags}>
              {player.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
              {isEnceReunion && (
                <span className={styles.tagHighlight}>ENCE Reunion</span>
              )}
            </div>
          </div>

          {/* Bio section */}
          <div className={styles.bioSection}>
            <p className={styles.bio}>{player.bio}</p>
          </div>

          {/* Highlights section */}
          <div className={styles.highlightsSection}>
            <h2 className={styles.sectionTitle}>Career Highlights</h2>
            <ul className={styles.highlightsList}>
              {player.highlights.map((item, index) => (
                <li key={item} className={styles.highlightItem} style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <span className={styles.highlightText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
