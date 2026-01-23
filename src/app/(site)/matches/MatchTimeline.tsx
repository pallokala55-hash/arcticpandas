"use client";

import { useState } from "react";
import MatchCard, { type MatchCardGame } from "./MatchCard";
import styles from "./page.module.css";

type MatchTimelineProps = {
  games: MatchCardGame[];
  apLogo: string | null;
  apInvertLogo: boolean;
  initialVisiblePast: number;
};

export default function MatchTimeline({ games, apLogo, apInvertLogo, initialVisiblePast }: MatchTimelineProps) {
  const [showAll, setShowAll] = useState(false);

  const upcoming = games
    .filter((g) => !g.result)
    .sort((a, b) => a.date.localeCompare(b.date));

  const completed = games
    .filter((g) => g.result)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Featured items
  const nextUpcoming = upcoming[0];
  const latestWin = completed.find((g) => g.result === "win");

  // Remaining items (exclude featured)
  const otherUpcoming = upcoming.slice(1);
  const otherCompleted = completed.filter((g) => g.id !== latestWin?.id);

  const visibleOtherCompleted = showAll ? otherCompleted : otherCompleted.slice(0, initialVisiblePast - 1);
  const hiddenCount = otherCompleted.length - (initialVisiblePast - 1);

  return (
    <section className={styles.timelineSection}>
      {/* Featured Section */}
      {(nextUpcoming || latestWin) && (
        <div className={styles.featuredSection}>
          {latestWin && <MatchCard game={latestWin} apLogo={apLogo} apInvertLogo={apInvertLogo} variant="featured" />}
          {nextUpcoming && <MatchCard game={nextUpcoming} apLogo={apLogo} apInvertLogo={apInvertLogo} variant="featured" />}
        </div>
      )}

      {/* Match History */}
      {visibleOtherCompleted.length > 0 && (
        <div className={styles.historySection}>
          <span className={styles.sectionLabel}>Match History</span>
          <div className={styles.smallGrid}>
            {visibleOtherCompleted.map((game) => (
              <MatchCard key={game.id} game={game} apLogo={apLogo} apInvertLogo={apInvertLogo} variant="compact" />
            ))}
          </div>
          {!showAll && hiddenCount > 0 && (
            <button className={styles.showMoreBtn} onClick={() => setShowAll(true)}>
              Show {hiddenCount} more
            </button>
          )}
        </div>
      )}

      {/* Other Upcoming */}
      {otherUpcoming.length > 0 && (
        <div className={styles.historySection}>
          <span className={styles.sectionLabel}>Schedule</span>
          <div className={styles.smallGrid}>
            {otherUpcoming.map((game) => (
              <MatchCard key={game.id} game={game} apLogo={apLogo} apInvertLogo={apInvertLogo} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
