import styles from "./GridOverlay.module.css";
import { colors, withAlpha } from "../theme";
import type { CSSVarStyles } from "../theme";

type GridOverlayProps = {
  className?: string;
  color?: string;
};

const GridOverlay = ({ className, color }: GridOverlayProps) => {
  const overlayStyle: CSSVarStyles = {
    "--grid-line-color": color ?? withAlpha(colors.frostGrey, 0.12),
  };

  return (
    <div
      className={`${styles.overlay} ${className ?? ""}`}
      style={overlayStyle}
      aria-hidden="true"
    />
  );
};

export default GridOverlay;
