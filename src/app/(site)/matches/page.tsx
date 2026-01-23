import { Metadata } from "next";
import Link from "next/link";
import SectionEyebrow from "../../../components/SectionEyebrow";
import {
  getAPGames,
  getAPTeam,
  getOpponentTeam,
  getSeasonTotals,
  isPerfectGame,
  getTeam,
  getGameSlug,
} from "../../../data";
import MatchTimeline from "./MatchTimeline";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Matches | Arctic Pandas",
  description: "Match history and stats for Arctic Pandas in NLC 2026 Winter",
};

export default function MatchesPage() {
  const games = getAPGames();
  const seasonStats = getSeasonTotals();
  const apData = getTeam("ap");

  // Prepare serializable game data for client component
  const timelineGames = games.map((game) => {
    const apTeam = getAPTeam(game);
    const oppTeam = getOpponentTeam(game);
    const oppData = getTeam(oppTeam.teamId);

    return {
      id: game.id,
      slug: getGameSlug(game.id),
      date: game.date,
      time: game.time,
      result: apTeam.result ?? null,
      apKills: apTeam.kills ?? null,
      oppKills: oppTeam.kills ?? null,
      oppCode: oppData?.code ?? oppTeam.teamId.toUpperCase(),
      oppName: oppData?.name ?? oppTeam.teamId,
      oppLogo: oppData?.logo ?? null,
      oppInvertLogo: oppData?.invertLogo ?? false,
      isPerfect: isPerfectGame(game),
    };
  });

  const apLogo = apData?.logo ?? null;
  const apInvertLogo = apData?.invertLogo ?? false;

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <SectionEyebrow>NLC 2026 Winter</SectionEyebrow>
        <h1 className={styles.title}>
          <span className={styles.titleRecord}>{seasonStats.wins}–{seasonStats.losses}</span>
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
            <span className={styles.statValue}>{seasonStats.kda.toFixed(1)}</span>
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
      <MatchTimeline games={timelineGames} apLogo={apLogo} apInvertLogo={apInvertLogo} initialVisiblePast={3} />
    </main>
  );
}
