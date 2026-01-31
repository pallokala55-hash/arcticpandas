"use client";

import Link from "next/link";
import Image from "next/image";
import {
  getAPTeam,
  getOpponentTeam,
  getTeam,
  getGameSlug,
  isPerfectGame,
  formatDuration,
  type Game,
} from "../../../data";
import { socialConfig } from "../../../lib/config";
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
    const apLogoClass = [styles.featuredLogo, apData?.invertLogo && styles.invertLogo].filter(Boolean).join(" ");
    const oppLogoClass = [styles.featuredLogo, oppData?.invertLogo && styles.invertLogo].filter(Boolean).join(" ");

    const CardWrapper = isUpcoming ? "a" : Link;
    const cardProps = isUpcoming
      ? { href: socialConfig.twitch.url, target: "_blank", rel: "noopener noreferrer" }
      : { href: `/matches/${slug}` };

    return (
      <CardWrapper
        {...cardProps}
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

        <div className={styles.featuredMeta}>
          <span className={styles.featuredDate}>{weekday}, {month} {day} · {timeStr}</span>
          {isUpcoming ? (
            <span className={styles.watchCta}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
              </svg>
              Watch on Twitch
            </span>
          ) : game.duration ? (
            <span className={styles.featuredTime}>{Math.floor(game.duration / 60)}m {game.duration % 60}s</span>
          ) : null}
        </div>
      </CardWrapper>
    );
  }

  // Compact variant
  const apSmallLogoClass = [styles.smallLogo, apData?.invertLogo && styles.invertLogo].filter(Boolean).join(" ");
  const oppSmallLogoClass = [styles.smallLogo, oppData?.invertLogo && styles.invertLogo].filter(Boolean).join(" ");

  const SmallCardWrapper = isUpcoming ? "a" : Link;
  const smallCardProps = isUpcoming
    ? { href: socialConfig.twitch.url, target: "_blank", rel: "noopener noreferrer" }
    : { href: `/matches/${slug}` };

  return (
    <SmallCardWrapper
      {...smallCardProps}
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
    </SmallCardWrapper>
  );
}
