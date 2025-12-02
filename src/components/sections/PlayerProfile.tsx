"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../Button";
import type { PlayerProfileData } from "../../data/players";
import { contactConfig } from "../../lib/config";
import styles from "./PlayerProfile.module.css";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

type PlayerProfileProps = {
  player: PlayerProfileData;
};

const peakBadgeByTier: Record<PlayerProfileData["peak"]["tier"], string> = {
  grandmaster: "/GRANDMASTER_SMALL.webp",
  challenger: "/CHALLENGER_SMALL.webp",
};

const PlayerProfile = ({ player }: PlayerProfileProps) => {
  const router = useRouter();

  const sectionStyle: CSSVarStyles = {
    "--divider-color": withAlpha(colors.frostGrey, 0.16),
    "--muted": withAlpha(colors.frostGrey, 0.82),
    "--accent": colors.frostBlue,
    "--glow-1": "rgba(22, 42, 96, 0.8)",
    "--glow-2": "rgba(255, 128, 64, 0.28)",
    "--glow-3": "rgba(16, 18, 28, 0.92)",
  };

  const handleBack = () => {
    router.push("/");
  };

  const stats = [
    { label: "Role", value: player.role },
    { label: "Origin", value: player.origin },
    { label: "Style", value: player.style },
    { label: "Shotcalling", value: player.shotcalling },
  ];

  const peakBadgeSrc = peakBadgeByTier[player.peak.tier];
  const opggUrl = player.peak.opggUrl;
  const peakButtonStyle = {
    "--btn-border": withAlpha(colors.frostGrey, 0.4),
    "--btn-bg": "rgba(255, 255, 255, 0.02)",
    "--btn-text": colors.foreground,
    "--btn-hover": colors.frostBlue,
  } as CSSProperties;

  return (
    <section className={styles.profile} style={sectionStyle}>
      <div className={styles.backdrop} />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.chrome}>
        <span className={styles.brand}>
          Arctic Pandas · Player dossier · {player.name}
        </span>
        <Button variant="secondary" onClick={handleBack}>
          Back to roster
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{player.name}</p>
          <h1 className={styles.title}>{player.headline}</h1>
          <p className={styles.subtitle}>{player.subtitle}</p>
          <div className={styles.tags}>
            {player.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className={styles.bio}>{player.bio}</p>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </div>
            ))}
            <div className={styles.peakCard}>
              <div className={styles.peakHeading}>
                <p className={styles.sectionLabel}>PEAK</p>
                <span className={styles.peakSeason}>Season 2025</span>
              </div>
              <div className={styles.peakContent}>
                <div className={styles.peakMeta}>
                  {peakBadgeSrc ? (
                    <Image
                      src={peakBadgeSrc}
                      alt={`${player.peak.text} crest`}
                      className={styles.peakBadge}
                      width={48}
                      height={48}
                    />
                  ) : null}
                  <span className={styles.peakValue}>{player.peak.text}</span>
                </div>
                {opggUrl ? (
                  <Button
                    variant="secondary"
                    href={opggUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.peakButton}
                    style={peakButtonStyle}
                  >
                    View on OP.GG
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.highlights}>
            <p className={styles.sectionLabel}>Highlights</p>
            <ul>
              {player.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.actions}>
            <Button variant="primary" href={contactConfig.emailHref}>
              Book a review with Staff
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              Return to facility
            </Button>
          </div>
        </div>
        <div className={styles.portraitWrap} aria-hidden="true">
          <div className={styles.portraitFrame}>
            <div className={styles.portraitGlow} />
            <Image
              className={styles.portrait}
              src={player.image}
              alt={player.name}
              width={400}
              height={500}
              priority
            />
            <div className={styles.badge}>{player.role}</div>
          </div>
          <div className={styles.note}>
            <span>Playbook</span>
            <p>{player.playbook}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfile;
