"use client";

import { useState } from "react";
import MatchCard from "./MatchCard";
import { partitionAPGames, type Game } from "../../../data";
import styles from "./page.module.css";

type MatchTimelineProps = {
  games: Game[];
  initialVisiblePast: number;
};

export default function MatchTimeline({ games, initialVisiblePast }: MatchTimelineProps): React.ReactElement {
  const [showAll, setShowAll] = useState(false);

  const { upcoming, completed, nextUpcoming, latestWin } = partitionAPGames(games);

  const otherUpcoming = upcoming.slice(1);
  const otherCompleted = completed.filter((g) => g.id !== latestWin?.id);

  const visibleOtherCompleted = showAll ? otherCompleted : otherCompleted.slice(0, initialVisiblePast - 1);
  const hiddenCount = otherCompleted.length - (initialVisiblePast - 1);

  return (
    <section className={styles.timelineSection}>
      {/* Featured Section */}
      {(nextUpcoming || latestWin) && (
        <div className={styles.featuredSection}>
          {latestWin && <MatchCard game={latestWin} variant="featured" />}
          {nextUpcoming && <MatchCard game={nextUpcoming} variant="featured" />}
        </div>
      )}

      {/* Match History */}
      {visibleOtherCompleted.length > 0 && (
        <div className={styles.historySection}>
          <span className={styles.sectionLabel}>Match History</span>
          <div className={styles.smallGrid}>
            {visibleOtherCompleted.map((game) => (
              <MatchCard key={game.id} game={game} variant="compact" />
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
              <MatchCard key={game.id} game={game} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
