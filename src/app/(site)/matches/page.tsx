import { Metadata } from "next";
import Link from "next/link";
import SectionEyebrow from "../../../components/SectionEyebrow";
import {
  getAPGames,
  getAPTeam,
  getOpponentTeam,
  getSeasonTotals,
  isPerfectGame,
  formatDuration,
  getTeam,
} from "../../../data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Matches | Arctic Pandas",
  description: "Match history and stats for Arctic Pandas in NLC 2026 Winter",
};

export default function MatchesPage() {
  const games = getAPGames();
  const seasonStats = getSeasonTotals();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <SectionEyebrow>NLC 2026 Winter</SectionEyebrow>
        <h1 className={styles.title}>Match History</h1>
        <p className={styles.subtitle}>
          {seasonStats.wins}-{seasonStats.losses} Record
        </p>
      </section>

      <section className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.kills}</span>
          <span className={styles.statLabel}>Kills</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.deaths}</span>
          <span className={styles.statLabel}>Deaths</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.assists}</span>
          <span className={styles.statLabel}>Assists</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.kda.toFixed(1)}</span>
          <span className={styles.statLabel}>KDA</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.barons}</span>
          <span className={styles.statLabel}>Barons</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{seasonStats.dragons}</span>
          <span className={styles.statLabel}>Dragons</span>
        </div>
      </section>

      <section className={styles.matchList}>
        {games.map((game) => {
          const apTeam = getAPTeam(game);
          const oppTeam = getOpponentTeam(game);
          const oppData = getTeam(oppTeam.teamId);
          const perfect = isPerfectGame(game);
          const duration = formatDuration(game.duration);

          return (
            <Link
              key={game.id}
              href={`/matches/${game.id}`}
              className={styles.matchCard}
              data-result={apTeam.result}
            >
              <div className={styles.matchHeader}>
                <span className={styles.matchDate}>{game.date}</span>
                {perfect && <span className={styles.perfectBadge}>Perfect Game</span>}
              </div>

              <div className={styles.matchTeams}>
                <div className={styles.team}>
                  <span className={styles.teamCode}>AP</span>
                  <span className={styles.teamScore}>{apTeam.kills}</span>
                </div>
                <span className={styles.vs}>vs</span>
                <div className={styles.team}>
                  <span className={styles.teamScore}>{oppTeam.kills}</span>
                  <span className={styles.teamCode}>{oppData?.code ?? oppTeam.teamId.toUpperCase()}</span>
                </div>
              </div>

              <div className={styles.matchMeta}>
                <span className={styles.resultBadge} data-result={apTeam.result}>
                  {apTeam.result === "win" ? "Victory" : "Defeat"}
                </span>
                {duration && <span className={styles.duration}>{duration}</span>}
              </div>

              <div className={styles.matchStats}>
                {apTeam.gold && <span>Gold: {(apTeam.gold / 1000).toFixed(1)}k</span>}
                {apTeam.towers !== undefined && <span>Towers: {apTeam.towers}</span>}
                {apTeam.dragons && <span>Dragons: {apTeam.dragons.length}</span>}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
