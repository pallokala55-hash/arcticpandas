import Link from "next/link";
import SectionEyebrow from "../SectionEyebrow";
import MatchCard from "../../app/(site)/matches/MatchCard";
import { getAPGames, getAPTeam } from "../../data";
import styles from "./HomeMatches.module.css";

export default function HomeMatches() {
  const games = getAPGames();

  const upcoming = games
    .filter((g) => !getAPTeam(g).result)
    .sort((a, b) => a.date.localeCompare(b.date));

  const completed = games
    .filter((g) => getAPTeam(g).result)
    .sort((a, b) => b.date.localeCompare(a.date));

  const nextUpcoming = upcoming[0];
  const otherUpcoming = upcoming.slice(1, 4);
  const latestWin = completed.find((g) => getAPTeam(g).result === "win");

  if (!latestWin && !nextUpcoming) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionEyebrow>NLC 2026 Winter</SectionEyebrow>

        <div className={styles.featured}>
          {latestWin && <MatchCard game={latestWin} variant="featured" />}
          {nextUpcoming && <MatchCard game={nextUpcoming} variant="featured" />}
        </div>

        {otherUpcoming.length > 0 && (
          <div className={styles.upcoming}>
            <span className={styles.upcomingLabel}>Upcoming</span>
            <div className={styles.upcomingGrid}>
              {otherUpcoming.map((game) => (
                <MatchCard key={game.id} game={game} variant="compact" />
              ))}
            </div>
          </div>
        )}

        <Link href="/matches" className={styles.viewAll}>
          View all matches →
        </Link>
      </div>
    </section>
  );
}
