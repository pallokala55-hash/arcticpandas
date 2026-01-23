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

function formatScheduleDate(date: string, time?: string): {
  weekday: string;
  day: string;
  month: string;
  timeStr: string;
} {
  const d = new Date(`${date}T${time ?? "18:00"}:00Z`);
  const opts = { timeZone: "Europe/Helsinki" } as const;
  return {
    weekday: d.toLocaleDateString("en-US", { ...opts, weekday: "long" }),
    day: d.toLocaleDateString("en-US", { ...opts, day: "numeric" }),
    month: d.toLocaleDateString("en-US", { ...opts, month: "short" }),
    timeStr: d.toLocaleTimeString("en-US", { ...opts, hour: "2-digit", minute: "2-digit", hour12: false }),
  };
}

function getFeaturedLabel(isUpcoming: boolean, perfect: boolean, stomp: boolean): { text: string; gold: boolean } {
  if (isUpcoming) return { text: "Next Match", gold: false };
  if (perfect) return { text: "Perfect Victory", gold: true };
  if (stomp) return { text: "Dominant Win", gold: false };
  return { text: "Latest Victory", gold: false };
}

export default function MatchCard({ game, variant }: MatchCardProps): React.ReactElement {
  const apTeam = getAPTeam(game);
  const oppTeam = getOpponentTeam(game);
  const apData = getTeam("ap");
  const oppData = getTeam(oppTeam.teamId);

  const slug = getGameSlug(game.id);
  const isUpcoming = !apTeam.result;
  const isWin = apTeam.result === "win";
  const perfect = isPerfectGame(game);
  const stomp = isWin && !perfect && (apTeam.kills ?? 0) - (oppTeam.kills ?? 0) >= 15;

  const oppCode = oppData?.code ?? oppTeam.teamId.toUpperCase();
  const oppName = oppData?.name ?? oppTeam.teamId;

  const { weekday, day, month, timeStr } = formatScheduleDate(game.date, game.time);
  const dateStr = new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (variant === "featured") {
    const label = getFeaturedLabel(isUpcoming, perfect, stomp);
    const apLogoClass = `${styles.featuredLogo} ${apData?.invertLogo ? styles.invertLogo : ""}`;
    const oppLogoClass = `${styles.featuredLogo} ${oppData?.invertLogo ? styles.invertLogo : ""}`;

    return (
      <Link
        href={`/matches/${slug}`}
        className={styles.featuredCard}
        data-type={isUpcoming ? "upcoming" : "win"}
        data-stomp={!isUpcoming && stomp}
        data-perfect={!isUpcoming && perfect}
      >
        <div className={styles.featuredGlow} />

        <span className={styles.featuredLabel} data-gold={label.gold || undefined}>
          {label.text}
        </span>

        <div className={styles.featuredMatchup}>
          <div className={styles.featuredTeam} data-winner={isUpcoming ? undefined : isWin}>
            {apData?.logo && (
              <Image src={apData.logo} alt="AP" width={72} height={72} className={apLogoClass} />
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
              <span className={styles.featuredScoreSep}>-</span>
              <span className={styles.featuredScoreNum} data-winner={!isWin}>{oppTeam.kills ?? 0}</span>
            </div>
          )}

          <div className={styles.featuredTeam} data-winner={isUpcoming ? undefined : !isWin}>
            {oppData?.logo && (
              <Image src={oppData.logo} alt={oppCode} width={72} height={72} className={oppLogoClass} />
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
  const apSmallLogoClass = `${styles.smallLogo} ${apData?.invertLogo ? styles.invertLogo : ""}`;
  const oppSmallLogoClass = `${styles.smallLogo} ${oppData?.invertLogo ? styles.invertLogo : ""}`;

  return (
    <Link
      href={`/matches/${slug}`}
      className={styles.smallCard}
      data-type={isUpcoming ? "upcoming" : undefined}
      data-result={isUpcoming ? undefined : apTeam.result}
    >
      <div className={styles.smallTeams}>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : isWin}>
          {apData?.logo && <Image src={apData.logo} alt="AP" width={24} height={24} className={apSmallLogoClass} />}
          <span>AP</span>
          {!isUpcoming && <span className={styles.smallScore}>{apTeam.kills}</span>}
        </div>
        <span className={isUpcoming ? styles.smallVs : styles.smallSep}>{isUpcoming ? "vs" : "-"}</span>
        <div className={styles.smallTeam} data-winner={isUpcoming ? undefined : !isWin}>
          {!isUpcoming && <span className={styles.smallScore}>{oppTeam.kills}</span>}
          <span>{oppCode}</span>
          {oppData?.logo && <Image src={oppData.logo} alt={oppCode} width={24} height={24} className={oppSmallLogoClass} />}
        </div>
      </div>
      <span className={styles.smallDate}>
        {isUpcoming ? `${month} ${day} · ${timeStr}` : dateStr}
      </span>
    </Link>
  );
}
