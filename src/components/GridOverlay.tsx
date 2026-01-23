import styles from "./GridOverlay.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

type GridOverlayProps = {
  className?: string;
  color?: string;
};

export default function GridOverlay({ className, color }: GridOverlayProps): React.ReactElement {
  const overlayStyle: CSSVarStyles = {
    "--grid-line-color": color ?? withAlpha(colors.frostGrey, 0.12),
  };
  const classes = [styles.overlay, className].filter(Boolean).join(" ");

  return <div className={classes} style={overlayStyle} aria-hidden="true" />;
}
