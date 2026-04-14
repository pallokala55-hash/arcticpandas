import { Metadata } from "next";
import SectionEyebrow from "../../../components/SectionEyebrow";
import { getAPGames, getSeasonTotals } from "../../../data";
import MatchTimeline from "./MatchTimeline";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Matches | Arctic Pandas",
  description:
    "Match history and stats for Arctic Pandas in NLC 2026 Winter, including playoffs",
};

export default function MatchesPage() {
  const games = getAPGames();
  const seasonStats = getSeasonTotals();

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <SectionEyebrow>NLC 2026 Winter + Playoffs</SectionEyebrow>
        <h1 className={styles.title}>
          <div className={styles.titleRecordWrap}>
            <div className={styles.heroGlow} />
            <span className={styles.titleRecord}>
              <span className={styles.recordNum}>{seasonStats.wins}</span>
              <span className={styles.recordDash}>–</span>
              <span className={styles.recordNum}>{seasonStats.losses}</span>
            </span>
          </div>
          <span className={styles.titleLabel}>Season Record</span>
        </h1>
      </section>

      {/* Season Stats */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{seasonStats.kills}</span>
            <span className={styles.statLabel}>Kills</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{seasonStats.deaths}</span>
            <span className={styles.statLabel}>Deaths</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{seasonStats.assists}</span>
            <span className={styles.statLabel}>Assists</span>
          </div>
          <div className={styles.statCard} data-highlight="true">
            <span className={styles.statValue}>
              {seasonStats.kda.toFixed(1)}
            </span>
            <span className={styles.statLabel}>KDA</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{seasonStats.barons}</span>
            <span className={styles.statLabel}>Barons</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{seasonStats.dragons}</span>
            <span className={styles.statLabel}>Dragons</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <MatchTimeline games={games} initialVisiblePast={3} />
    </main>
  );
}
