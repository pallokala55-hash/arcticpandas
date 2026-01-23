import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant = "secondary",
  children,
  href,
  target,
  rel,
  onClick,
  className,
}: ButtonProps): React.ReactElement {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;
  const computedClass = [styles.button, variantClass, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={computedClass} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={computedClass} onClick={onClick}>
      {children}
    </button>
  );
}
