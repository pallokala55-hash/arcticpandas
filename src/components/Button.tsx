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

const Button = ({
  variant = "secondary",
  children,
  href,
  target,
  rel,
  onClick,
  className,
}: ButtonProps) => {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;
  const computedClass = className
    ? `${styles.button} ${variantClass} ${className}`
    : `${styles.button} ${variantClass}`;

  if (href) {
    return (
      <a
        className={computedClass}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={computedClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
