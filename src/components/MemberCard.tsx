import Image from "next/image";
import styles from "./MemberCard.module.css";
import type { ReactNode } from "react";

type StatItem = {
  value: ReactNode;
  label: ReactNode;
};

type CreditItem = {
  org?: string;
  text: string;
};

type MemberCardProps = {
  name: string;
  image?: string | null;
  role?: string;
  href?: string;
  maxWidth?: number;
  variant?: "default" | "leader" | "compact" | "creator";
  size?: "default" | "small";
  subtitle?: string;
  credits?: CreditItem[];
  stats?: StatItem[];
  note?: string;
  creatorNote?: string;
};

function MemberCard({
  name,
  image,
  role,
  href,
  maxWidth,
  variant = "default",
  size = "default",
  subtitle,
  credits,
  stats,
  note,
  creatorNote,
}: MemberCardProps): React.ReactElement {
  const isVideo = image?.match(/\.(mp4|mov|webm)$/i);

  function renderMedia(): React.ReactElement {
    if (!image) {
      return <div className={styles.placeholder} />;
    }
    if (isVideo) {
      return (
        <video
          src={image}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label={`${name} video`}
        />
      );
    }
    return (
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 20vw"
        quality={90}
        style={{ objectFit: "cover" }}
      />
    );
  }

  // Leader variant - horizontal layout with credits
  if (variant === "leader") {
    return (
      <div className={styles.leader}>
        <div className={styles.avatar}>{renderMedia()}</div>
        <div className={styles.leaderInfo}>
          {role && <p className={styles.role}>{role}</p>}
          <h3 className={styles.name}>{name}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {credits && credits.length > 0 && (
            <ul className={styles.credits}>
              {credits.map((credit, i) => (
                <li key={i}>
                  {credit.org && <span className={styles.creditOrg}>{credit.org}</span>}{" "}
                  {credit.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Creator variant - stats-focused
  if (variant === "creator") {
    return (
      <div className={styles.creator}>
        <div className={styles.creatorInfo}>
          {role && <p className={styles.role}>{role}</p>}
          <h3 className={styles.name}>{name}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {stats && stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statNumber}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          {creatorNote && <p className={styles.creatorNote}>{creatorNote}</p>}
        </div>
      </div>
    );
  }

  // Compact variant - small cards for roster grids
  if (variant === "compact") {
    const isSmall = size === "small";
    const compactClass = isSmall
      ? `${styles.compact} ${styles.compactSmall}`
      : styles.compact;

    const compactContent = (
      <>
        <div className={styles.avatar}>{renderMedia()}</div>
        <div className={styles.compactInfo}>
          {role && <span className={styles.role}>{role}</span>}
          <span className={styles.name}>{name}</span>
          {note && <span className={styles.note}>{note}</span>}
        </div>
      </>
    );

    if (href) {
      return (
        <a
          className={`${compactClass} ${styles.compactClickable}`}
          href={href}
          aria-label={`Open ${name}'s profile`}
        >
          {compactContent}
        </a>
      );
    }

    return <div className={compactClass}>{compactContent}</div>;
  }

  // Default variant - vertical layout for homepage
  const content = (
    <>
      <div className={styles.avatar}>{renderMedia()}</div>
      <span className={styles.name}>{name}</span>
      {role && <span className={styles.role}>{role}</span>}
    </>
  );

  const style = maxWidth ? { maxWidth: `${maxWidth}px` } : undefined;
  const className = href ? `${styles.card} ${styles.clickable}` : styles.card;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        aria-label={`Open ${name}'s profile`}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}

export default MemberCard;
