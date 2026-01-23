"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

type TimelineGame = {
  id: string;
  slug: string;
  date: string;
  time?: string;
  result: "win" | "loss" | null;
  apKills: number | null;
  oppKills: number | null;
  oppCode: string;
  oppName: string;
  oppLogo: string | null;
  oppInvertLogo: boolean;
  duration: number | null;
  isPerfect: boolean;
  gold: number | null;
  towers: number | null;
  dragons: number | null;
};

type MatchTimelineProps = {
  games: TimelineGame[];
  apLogo: string | null;
  apInvertLogo: boolean;
  initialVisiblePast: number;
};

function formatScheduleDate(date: string, time?: string) {
  const d = new Date(`${date}T${time ?? "18:00"}:00Z`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: "Europe/Helsinki" }),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: "Europe/Helsinki" }),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: "Europe/Helsinki" }),
    timeStr: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Helsinki" }),
  };
}

// Check if a win is a "stomp" - dominant victory
function isStomp(game: TimelineGame): boolean {
  if (game.result !== "win") return false;
  if (game.isPerfect) return true;
  const killDiff = (game.apKills ?? 0) - (game.oppKills ?? 0);
  return killDiff >= 15;
}

/* ===========================================
   FEATURED: Next Upcoming Match
   =========================================== */
function FeaturedUpcoming({ game, apLogo, apInvertLogo }: { game: TimelineGame; apLogo: string | null; apInvertLogo: boolean }) {
  const { weekday, day, month, timeStr } = formatScheduleDate(game.date, game.time);

  return (
    <Link href={`/matches/${game.slug}`} className={styles.featuredCard} data-type="upcoming">
      <div className={styles.featuredGlow} />
      <span className={styles.featuredLabel}>Next Match</span>

      <div className={styles.featuredMatchup}>
        <div className={styles.featuredTeam}>
          {apLogo && (
            <Image src={apLogo} alt="AP" width={72} height={72} className={`${styles.featuredLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />
          )}
          <span className={styles.featuredTeamName}>Arctic Pandas</span>
        </div>

        <div className={styles.featuredVs}>
          <span className={styles.featuredVsText}>VS</span>
        </div>

        <div className={styles.featuredTeam}>
          {game.oppLogo && (
            <Image src={game.oppLogo} alt={game.oppCode} width={72} height={72} className={`${styles.featuredLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />
          )}
          <span className={styles.featuredTeamName}>{game.oppName}</span>
        </div>
      </div>

      <div className={styles.featuredMeta}>
        <span className={styles.featuredDate}>{weekday}, {month} {day}</span>
        <span className={styles.featuredTime}>{timeStr}</span>
      </div>
    </Link>
  );
}

/* ===========================================
   FEATURED: Latest Win / Stomp
   =========================================== */
function FeaturedWin({ game, apLogo, apInvertLogo }: { game: TimelineGame; apLogo: string | null; apInvertLogo: boolean }) {
  const dateObj = new Date(game.date);
  const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const stomp = isStomp(game);

  return (
    <Link
      href={`/matches/${game.slug}`}
      className={styles.featuredCard}
      data-type="win"
      data-stomp={stomp}
      data-perfect={game.isPerfect}
    >
      <div className={styles.featuredGlow} />
      {game.isPerfect ? (
        <span className={styles.featuredLabel} data-gold>Perfect Victory</span>
      ) : stomp ? (
        <span className={styles.featuredLabel}>Dominant Win</span>
      ) : (
        <span className={styles.featuredLabel}>Latest Victory</span>
      )}

      <div className={styles.featuredMatchup}>
        <div className={styles.featuredTeam} data-winner="true">
          {apLogo && (
            <Image src={apLogo} alt="AP" width={72} height={72} className={`${styles.featuredLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />
          )}
          <span className={styles.featuredTeamName}>Arctic Pandas</span>
        </div>

        <div className={styles.featuredScore}>
          <span className={styles.featuredScoreNum} data-winner="true">{game.apKills ?? 0}</span>
          <span className={styles.featuredScoreSep}>–</span>
          <span className={styles.featuredScoreNum}>{game.oppKills ?? 0}</span>
        </div>

        <div className={styles.featuredTeam}>
          {game.oppLogo && (
            <Image src={game.oppLogo} alt={game.oppCode} width={72} height={72} className={`${styles.featuredLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />
          )}
          <span className={styles.featuredTeamName}>{game.oppName}</span>
        </div>
      </div>

      <span className={styles.featuredMeta}>{dateStr}</span>
    </Link>
  );
}

/* ===========================================
   REGULAR: Small Card
   =========================================== */
function SmallCard({ game, apLogo, apInvertLogo }: { game: TimelineGame; apLogo: string | null; apInvertLogo: boolean }) {
  const dateObj = new Date(game.date);
  const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const isWin = game.result === "win";
  const isUpcoming = !game.result;

  if (isUpcoming) {
    const { weekday, day, month, timeStr } = formatScheduleDate(game.date, game.time);
    return (
      <Link href={`/matches/${game.slug}`} className={styles.smallCard} data-type="upcoming">
        <div className={styles.smallTeams}>
          <div className={styles.smallTeam}>
            {apLogo && <Image src={apLogo} alt="AP" width={24} height={24} className={`${styles.smallLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />}
            <span>AP</span>
          </div>
          <span className={styles.smallVs}>vs</span>
          <div className={styles.smallTeam}>
            <span>{game.oppCode}</span>
            {game.oppLogo && <Image src={game.oppLogo} alt={game.oppCode} width={24} height={24} className={`${styles.smallLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />}
          </div>
        </div>
        <span className={styles.smallDate}>{month} {day} · {timeStr}</span>
      </Link>
    );
  }

  return (
    <Link href={`/matches/${game.slug}`} className={styles.smallCard} data-result={game.result}>
      <div className={styles.smallTeams}>
        <div className={styles.smallTeam} data-winner={isWin}>
          {apLogo && <Image src={apLogo} alt="AP" width={24} height={24} className={`${styles.smallLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />}
          <span>AP</span>
          <span className={styles.smallScore}>{game.apKills}</span>
        </div>
        <span className={styles.smallSep}>–</span>
        <div className={styles.smallTeam} data-winner={!isWin}>
          <span className={styles.smallScore}>{game.oppKills}</span>
          <span>{game.oppCode}</span>
          {game.oppLogo && <Image src={game.oppLogo} alt={game.oppCode} width={24} height={24} className={`${styles.smallLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />}
        </div>
      </div>
      <span className={styles.smallDate}>{dateStr}</span>
    </Link>
  );
}

/* ===========================================
   MAIN COMPONENT
   =========================================== */
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
          {latestWin && <FeaturedWin game={latestWin} apLogo={apLogo} apInvertLogo={apInvertLogo} />}
          {nextUpcoming && <FeaturedUpcoming game={nextUpcoming} apLogo={apLogo} apInvertLogo={apInvertLogo} />}
        </div>
      )}

      {/* Match History */}
      {visibleOtherCompleted.length > 0 && (
        <div className={styles.historySection}>
          <span className={styles.sectionLabel}>Match History</span>
          <div className={styles.smallGrid}>
            {visibleOtherCompleted.map((game) => (
              <SmallCard key={game.id} game={game} apLogo={apLogo} apInvertLogo={apInvertLogo} />
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
              <SmallCard key={game.id} game={game} apLogo={apLogo} apInvertLogo={apInvertLogo} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
