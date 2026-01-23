"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export type MatchCardGame = {
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
  isPerfect: boolean;
};

type MatchCardProps = {
  game: MatchCardGame;
  apLogo: string | null;
  apInvertLogo: boolean;
  variant: "featured" | "compact";
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

function isStomp(game: MatchCardGame): boolean {
  if (game.result !== "win") return false;
  if (game.isPerfect) return true;
  const killDiff = (game.apKills ?? 0) - (game.oppKills ?? 0);
  return killDiff >= 15;
}

export default function MatchCard({ game, apLogo, apInvertLogo, variant }: MatchCardProps) {
  const isUpcoming = !game.result;
  const isWin = game.result === "win";
  const stomp = isStomp(game);
  const { weekday, day, month, timeStr } = formatScheduleDate(game.date, game.time);
  const dateStr = new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (variant === "featured") {
    return (
      <Link
        href={`/matches/${game.slug}`}
        className={styles.featuredCard}
        data-type={isUpcoming ? "upcoming" : "win"}
        data-stomp={!isUpcoming && stomp}
        data-perfect={!isUpcoming && game.isPerfect}
      >
        <div className={styles.featuredGlow} />

        {isUpcoming ? (
          <span className={styles.featuredLabel}>Next Match</span>
        ) : game.isPerfect ? (
          <span className={styles.featuredLabel} data-gold>Perfect Victory</span>
        ) : stomp ? (
          <span className={styles.featuredLabel}>Dominant Win</span>
        ) : (
          <span className={styles.featuredLabel}>Latest Victory</span>
        )}

        <div className={styles.featuredMatchup}>
          <div className={styles.featuredTeam} data-winner={isUpcoming ? undefined : isWin}>
            {apLogo && (
              <Image src={apLogo} alt="AP" width={72} height={72} className={`${styles.featuredLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />
            )}
            <span className={styles.featuredTeamName}>Arctic Pandas</span>
          </div>

          {isUpcoming ? (
            <div className={styles.featuredVs}>
              <span className={styles.featuredVsText}>VS</span>
            </div>
          ) : (
            <div className={styles.featuredScore}>
              <span className={styles.featuredScoreNum} data-winner={isWin}>{game.apKills ?? 0}</span>
              <span className={styles.featuredScoreSep}>–</span>
              <span className={styles.featuredScoreNum} data-winner={!isWin}>{game.oppKills ?? 0}</span>
            </div>
          )}

          <div className={styles.featuredTeam} data-winner={isUpcoming ? undefined : !isWin}>
            {game.oppLogo && (
              <Image src={game.oppLogo} alt={game.oppCode} width={72} height={72} className={`${styles.featuredLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />
            )}
            <span className={styles.featuredTeamName}>{game.oppName}</span>
          </div>
        </div>

        {isUpcoming ? (
          <div className={styles.featuredMeta}>
            <span className={styles.featuredDate}>{weekday}, {month} {day}</span>
            <span className={styles.featuredTime}>{timeStr}</span>
          </div>
        ) : (
          <span className={styles.featuredMeta}>{dateStr}</span>
        )}
      </Link>
    );
  }

  // Compact variant
  return (
    <Link
      href={`/matches/${game.slug}`}
      className={styles.smallCard}
      data-type={isUpcoming ? "upcoming" : undefined}
      data-result={isUpcoming ? undefined : game.result}
    >
      <div className={styles.smallTeams}>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : isWin}>
          {apLogo && <Image src={apLogo} alt="AP" width={24} height={24} className={`${styles.smallLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />}
          <span>AP</span>
          {!isUpcoming && <span className={styles.smallScore}>{game.apKills}</span>}
        </div>
        <span className={isUpcoming ? styles.smallVs : styles.smallSep}>{isUpcoming ? "vs" : "–"}</span>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : !isWin}>
          {!isUpcoming && <span className={styles.smallScore}>{game.oppKills}</span>}
          <span>{game.oppCode}</span>
          {game.oppLogo && <Image src={game.oppLogo} alt={game.oppCode} width={24} height={24} className={`${styles.smallLogo} ${game.oppInvertLogo ? styles.invertLogo : ""}`} />}
        </div>
      </div>
      <span className={styles.smallDate}>
        {isUpcoming ? `${month} ${day} · ${timeStr}` : dateStr}
      </span>
    </Link>
  );
}
