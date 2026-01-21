"use client";

import Image from "next/image";
import Button from "../Button";
import SectionEyebrow from "../SectionEyebrow";
import { socialConfig } from "../../lib/config";
import {
  getLatestPlayedMatch,
  getUpcomingMatches,
  formatMatchDate,
  formatMatchTime,
} from "../../data/schedule";
import styles from "./TwitchHighlight.module.css";

const TwitchHighlight = () => {
  const twitchUrl = socialConfig.twitch.url;
  const latestMatch = getLatestPlayedMatch();
  const upcomingMatches = getUpcomingMatches();

  return (
    <section className={styles.section}>
      {latestMatch?.thumbnail && (
        <div className={styles.bgImage} aria-hidden="true">
          <Image
            src={latestMatch.thumbnail}
            alt=""
            fill
            className={styles.bgImg}
          />
        </div>
      )}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <SectionEyebrow>NLC 2026 Winter</SectionEyebrow>

        {latestMatch ? (
          <div className={styles.hero}>
            <h2 className={styles.matchup}>
              Arctic Pandas vs {latestMatch.opponent}
            </h2>
            <div className={styles.resultRow}>
              <span className={styles.resultBadge} data-result={latestMatch.result}>
                {latestMatch.result === "win" ? "Victory" : "Defeat"}
              </span>
              <span className={styles.matchMeta}>
                {formatMatchDate(latestMatch.datetime)}
              </span>
              {latestMatch.vodUrl && (
                <a href={latestMatch.vodUrl} target="_blank" rel="noreferrer" className={styles.vodLink}>
                  Watch VOD
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.hero}>
            <h2 className={styles.matchup}>Season begins soon.</h2>
          </div>
        )}

        {upcomingMatches.length > 0 && (
          <div className={styles.upcoming}>
            <p className={styles.upcomingLabel}>Next up</p>
            <div className={styles.upcomingList}>
              {upcomingMatches.slice(0, 3).map((match) => (
                <div key={match.datetime} className={styles.upcomingItem}>
                  <span className={styles.upcomingDate}>
                    {formatMatchDate(match.datetime)}
                  </span>
                  <span className={styles.upcomingOpponent}>
                    vs {match.opponentShort}
                  </span>
                  <span className={styles.upcomingTime}>
                    {formatMatchTime(match.datetime)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <Button variant="secondary" href={twitchUrl} target="_blank" rel="noreferrer">
            Watch on Twitch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TwitchHighlight;
