"use client";

import Link from "next/link";
import Image from "next/image";
import {
  getAPTeam,
  getOpponentTeam,
  getTeam,
  getGameSlug,
  isPerfectGame,
  type Game,
} from "../../../data";
import styles from "./page.module.css";

type MatchCardProps = {
  game: Game;
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

export default function MatchCard({ game, variant }: MatchCardProps) {
  const apTeam = getAPTeam(game);
  const oppTeam = getOpponentTeam(game);
  const apData = getTeam("ap");
  const oppData = getTeam(oppTeam.teamId);

  const slug = getGameSlug(game.id);
  const isUpcoming = !apTeam.result;
  const isWin = apTeam.result === "win";
  const perfect = isPerfectGame(game);
  const stomp = isWin && !perfect && ((apTeam.kills ?? 0) - (oppTeam.kills ?? 0) >= 15);

  const apLogo = apData?.logo ?? null;
  const apInvertLogo = apData?.invertLogo ?? false;
  const oppLogo = oppData?.logo ?? null;
  const oppInvertLogo = oppData?.invertLogo ?? false;
  const oppCode = oppData?.code ?? oppTeam.teamId.toUpperCase();
  const oppName = oppData?.name ?? oppTeam.teamId;

  const { weekday, day, month, timeStr } = formatScheduleDate(game.date, game.time);
  const dateStr = new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (variant === "featured") {
    return (
      <Link
        href={`/matches/${slug}`}
        className={styles.featuredCard}
        data-type={isUpcoming ? "upcoming" : "win"}
        data-stomp={!isUpcoming && stomp}
        data-perfect={!isUpcoming && perfect}
      >
        <div className={styles.featuredGlow} />

        {isUpcoming ? (
          <span className={styles.featuredLabel}>Next Match</span>
        ) : perfect ? (
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
              <span className={styles.featuredScoreNum} data-winner={isWin}>{apTeam.kills ?? 0}</span>
              <span className={styles.featuredScoreSep}>–</span>
              <span className={styles.featuredScoreNum} data-winner={!isWin}>{oppTeam.kills ?? 0}</span>
            </div>
          )}

          <div className={styles.featuredTeam} data-winner={isUpcoming ? undefined : !isWin}>
            {oppLogo && (
              <Image src={oppLogo} alt={oppCode} width={72} height={72} className={`${styles.featuredLogo} ${oppInvertLogo ? styles.invertLogo : ""}`} />
            )}
            <span className={styles.featuredTeamName}>{oppName}</span>
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
      href={`/matches/${slug}`}
      className={styles.smallCard}
      data-type={isUpcoming ? "upcoming" : undefined}
      data-result={isUpcoming ? undefined : apTeam.result}
    >
      <div className={styles.smallTeams}>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : isWin}>
          {apLogo && <Image src={apLogo} alt="AP" width={24} height={24} className={`${styles.smallLogo} ${apInvertLogo ? styles.invertLogo : ""}`} />}
          <span>AP</span>
          {!isUpcoming && <span className={styles.smallScore}>{apTeam.kills}</span>}
        </div>
        <span className={isUpcoming ? styles.smallVs : styles.smallSep}>{isUpcoming ? "vs" : "–"}</span>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : !isWin}>
          {!isUpcoming && <span className={styles.smallScore}>{oppTeam.kills}</span>}
          <span>{oppCode}</span>
          {oppLogo && <Image src={oppLogo} alt={oppCode} width={24} height={24} className={`${styles.smallLogo} ${oppInvertLogo ? styles.invertLogo : ""}`} />}
        </div>
      </div>
      <span className={styles.smallDate}>
        {isUpcoming ? `${month} ${day} · ${timeStr}` : dateStr}
      </span>
    </Link>
  );
}
