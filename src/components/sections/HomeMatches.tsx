import Link from "next/link";
import SectionEyebrow from "../SectionEyebrow";
import MatchCard from "../../app/(site)/matches/MatchCard";
import { getAPGames, partitionAPGames } from "../../data";
import styles from "./HomeMatches.module.css";

export default function HomeMatches(): React.ReactElement | null {
  const games = getAPGames();
  const { upcoming, nextUpcoming, latestWin } = partitionAPGames(games);
  const otherUpcoming = upcoming.slice(1, 4);

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
