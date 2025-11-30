import type { CSSProperties, ReactNode } from "react";
import styles from "./Button.module.css";
import { colors } from "../theme";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  block?: boolean;
  className?: string;
  style?: CSSProperties;
};

const Button = ({
  variant = "secondary",
  children,
  href,
  target,
  rel,
  onClick,
  block,
  className,
  style,
}: ButtonProps) => {
  const baseStyle = {
    "--btn-bg": variant === "primary" ? colors.foreground : "transparent",
    "--btn-text": variant === "primary" ? colors.background : colors.foreground,
    "--btn-border": colors.foreground,
    "--btn-hover": colors.frostBlue,
  } as CSSProperties;

  const commonStyle = style ? { ...baseStyle, ...style } : baseStyle;

  const baseClass = block ? `${styles.button} ${styles.block}` : styles.button;
  const computedClass = className ? `${baseClass} ${className}` : baseClass;

  if (href) {
    return (
      <a
        className={computedClass}
        href={href}
        style={commonStyle}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={computedClass} style={commonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
