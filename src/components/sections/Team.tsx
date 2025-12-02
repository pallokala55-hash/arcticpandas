import { timelineNodes, timelineStars } from "../../data/timeline";
import styles from "./Team.module.css";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const Team = () => {
  const sectionStyle: CSSVarStyles = {
    "--divider-color": withAlpha(colors.frostGrey, 0.12),
    "--muted": colors.frostGrey,
    "--accent": colors.frostBlue,
    "--card-bg": withAlpha(colors.foreground, 0.02),
    "--photo-bg": withAlpha(colors.foreground, 0.04),
  };

  return (
    <section id="about" className={styles.team} style={sectionStyle}>
      <div className={styles.container}>
        <div className={styles.timelineSection}>
          <p className={styles.timelineKicker}>Future timeline</p>
          <div className={styles.timeline}>
            <svg
              className={styles.timelineSvg}
              viewBox="0 0 100 28"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="timeline-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255, 214, 146, 0.8)" />
                  <stop offset="100%" stopColor="rgba(110, 207, 255, 0.8)" />
                </linearGradient>
                <radialGradient id="timeline-node" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.92)" />
                  <stop offset="70%" stopColor="rgba(137, 221, 255, 0.78)" />
                  <stop offset="100%" stopColor="rgba(78, 208, 255, 0.72)" />
                </radialGradient>
                <radialGradient id="timeline-halo" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="rgba(110, 207, 255, 0.18)" />
                  <stop offset="100%" stopColor="rgba(110, 207, 255, 0)" />
                </radialGradient>
              </defs>

              {timelineStars.map((star, idx) => (
                <circle
                  key={`timeline-star-${idx}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.r}
                  className={styles.timelineAmbient}
                  opacity={star.opacity}
                />
              ))}

              <polyline
                className={styles.timelineLine}
                points={timelineNodes.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
              />

              {timelineNodes.map((point) => (
                <g key={point.id} className={styles.timelineGroup}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="1.4"
                    className={styles.timelineHalo}
                    fill="url(#timeline-halo)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="0.8"
                    className={styles.timelineNode}
                    fill="url(#timeline-node)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="0.35"
                    className={styles.timelineCore}
                  />
                  <text
                    x={point.x}
                    y={point.y - 3.6}
                    className={styles.timelineText}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {point.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
