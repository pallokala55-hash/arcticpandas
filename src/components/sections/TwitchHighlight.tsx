"use client";

import Button from "../Button";
import { socialConfig } from "../../lib/config";
import {
  getLatestPlayedMatch,
  getUpcomingMatches,
  formatMatchDate,
  formatMatchTime,
} from "../../data/schedule";
import styles from "./TwitchHighlight.module.css";
import { colors, layout, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const TwitchHighlight = () => {
  const twitchUrl = socialConfig.twitch.url;
  const youtubeUrl = socialConfig.youtube.url;
  const latestMatch = getLatestPlayedMatch();
  const upcomingMatches = getUpcomingMatches();

  const sectionStyle: CSSVarStyles = {
    "--layout-maxWidth": layout.maxWidth,
    "--layout-sectionPadding": layout.sectionPadding,
    "--color-background": colors.background,
    "--color-foreground": colors.foreground,
    "--frost-blue": colors.frostBlue,
    "--muted": withAlpha(colors.frostGrey, 0.78),
    "--divider-color": withAlpha(colors.frostGrey, 0.18),
    "--card-border": withAlpha(colors.frostGrey, 0.18),
    "--card-glow": withAlpha(colors.frostBlue, 0.12),
  };

  return (
    <section className={styles.broadcast} style={sectionStyle}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.container}>
        <h2 className={styles.heading}>NLC 2026 Winter</h2>
        <div className={styles.scheduleGrid}>
          {latestMatch ? (
            <div
              className={styles.resultCard}
              style={latestMatch.thumbnail ? { backgroundImage: `url(${latestMatch.thumbnail})` } : undefined}
            >
              <div className={styles.resultOverlay} />
              <div className={styles.resultContent}>
                <p className={styles.cardLabel}>Latest Match</p>
                <p className={styles.matchup}>
                  AP vs {latestMatch.opponentShort}
                </p>
                <p className={styles.resultBadge} data-result={latestMatch.result}>
                  {latestMatch.result === "win" ? "Victory" : "Defeat"}
                </p>
                <p className={styles.matchMeta}>
                  {formatMatchDate(latestMatch.datetime)}
                </p>
                {latestMatch.vodUrl && (
                  <Button variant="secondary" href={latestMatch.vodUrl} target="_blank" rel="noreferrer">
                    Watch VOD
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.resultCard}>
              <p className={styles.cardLabel}>Latest Match</p>
              <p className={styles.noResult}>No results yet</p>
            </div>
          )}
          <div className={styles.upcomingCard}>
            <p className={styles.cardLabel}>Upcoming</p>
            <ul className={styles.matchList}>
              {upcomingMatches.slice(0, 4).map((match) => (
                <li key={match.datetime} className={styles.matchItem}>
                  <span className={styles.matchDate}>
                    {formatMatchDate(match.datetime)}
                  </span>
                  <span className={styles.matchTime}>
                    {formatMatchTime(match.datetime)}
                  </span>
                  <span className={styles.matchOpponent}>
                    vs {match.opponentShort}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" href={twitchUrl} target="_blank" rel="noreferrer">
            Watch on Twitch
          </Button>
          <Button variant="secondary" href={youtubeUrl} target="_blank" rel="noreferrer">
            Subscribe on YouTube
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TwitchHighlight;
