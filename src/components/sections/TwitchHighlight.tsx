import type { CSSProperties } from "react";
import Image from "next/image";
import Button from "../Button";
import { socialConfig } from "../../lib/config";
import styles from "./TwitchHighlight.module.css";
import { colors, layout, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const TwitchHighlight = () => {
  const twitchUrl = socialConfig.twitch.url;

  const sectionStyle: CSSVarStyles = {
    "--layout-maxWidth": layout.maxWidth,
    "--layout-sectionPadding": layout.sectionPadding,
    "--color-background": colors.background,
    "--color-foreground": colors.foreground,
    "--muted": withAlpha(colors.frostGrey, 0.78),
    "--divider-color": withAlpha(colors.frostGrey, 0.2),
    "--badge-bg": "rgba(6, 10, 18, 0.75)",
    "--card-border": withAlpha(colors.frostGrey, 0.22),
    "--card-glow": withAlpha(colors.frostBlue, 0.08),
  };

  return (
    <section className={styles.broadcast} style={sectionStyle}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.onAir} aria-live="polite">
          <span className={styles.liveDot} aria-hidden="true" />
          <span className={styles.onAirText}>ON-AIR • LIVE ON TWITCH</span>
        </div>
        <a
          className={styles.streamCard}
          href={twitchUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.cardMedia} aria-hidden="true">
            <Image
              src="/maxresdefault.jpg"
              alt="Twitch broadcast highlight"
              width={640}
              height={360}
            />
            <div className={styles.mediaOverlay} />
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardEyebrow}>
              Tonight's scrim broadcast — 19:00 EET
            </p>
            <p className={styles.cardTitle}>Click to watch live</p>
          </div>
        </a>
        <p className={styles.copy}>
          Daily scrims, analyst desk breakdowns, and match-prep coverage —
          streamed live from the Arctic Pandas facility.
        </p>
        <div className={styles.actions}>
          <Button
            variant="primary"
            href={twitchUrl}
            target="_blank"
            rel="noreferrer"
            style={
              {
                "--btn-bg": colors.frostBlue,
                "--btn-text": colors.background,
                "--btn-border": colors.frostBlue,
                "--btn-hover": colors.foreground,
              } as CSSProperties
            }
          >
            WATCH LIVE ON TWITCH
          </Button>
          <Button
            variant="secondary"
            href={twitchUrl}
            target="_blank"
            rel="noreferrer"
          >
            FOLLOW THE CHANNEL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TwitchHighlight;
