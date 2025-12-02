import { timelineNodes } from "../../data/timeline";
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
            {/* Desktop SVG */}
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
                    r={1.4}
                    className={styles.timelineHalo}
                    fill="url(#timeline-halo)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={0.8}
                    className={styles.timelineNode}
                    fill="url(#timeline-node)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={0.35}
                    className={styles.timelineCore}
                  />
                  <text
                    x={point.x}
                    y={point.y + (point.textOffset ?? -5)}
                    className={styles.timelineText}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan x={point.x} dy="0">
                      {point.labelMobile[0]}
                    </tspan>
                    <tspan x={point.x} dy="1.4">
                      {point.labelMobile[1]}
                    </tspan>
                  </text>
                </g>
              ))}
            </svg>

            {/* Mobile SVG - larger elements */}
            <svg
              className={styles.timelineSvgMobile}
              viewBox="0 0 100 28"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="timeline-line-mobile"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255, 214, 146, 0.8)" />
                  <stop offset="100%" stopColor="rgba(110, 207, 255, 0.8)" />
                </linearGradient>
                <radialGradient
                  id="timeline-node-mobile"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.92)" />
                  <stop offset="70%" stopColor="rgba(137, 221, 255, 0.78)" />
                  <stop offset="100%" stopColor="rgba(78, 208, 255, 0.72)" />
                </radialGradient>
                <radialGradient
                  id="timeline-halo-mobile"
                  cx="50%"
                  cy="50%"
                  r="70%"
                >
                  <stop offset="0%" stopColor="rgba(110, 207, 255, 0.18)" />
                  <stop offset="100%" stopColor="rgba(110, 207, 255, 0)" />
                </radialGradient>
              </defs>

              <polyline
                className={styles.timelineLineMobile}
                points={timelineNodes.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
              />

              {timelineNodes.map((point) => (
                <g key={`${point.id}-mobile`} className={styles.timelineGroup}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={2.4}
                    className={styles.timelineHalo}
                    fill="url(#timeline-halo-mobile)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={1.4}
                    className={styles.timelineNodeMobile}
                    fill="url(#timeline-node-mobile)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={0.6}
                    className={styles.timelineCore}
                  />
                  <text
                    x={point.x}
                    y={point.y + (point.textOffsetMobile ?? -7)}
                    className={styles.timelineTextMobile}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan x={point.x} dy="0">
                      {point.labelMobile[0]}
                    </tspan>
                    <tspan x={point.x} dy="2.4">
                      {point.labelMobile[1]}
                    </tspan>
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
