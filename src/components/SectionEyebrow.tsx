import styles from "./SectionEyebrow.module.css";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionEyebrow({ children, className }: SectionEyebrowProps): React.ReactElement {
  const classes = [styles.eyebrow, className].filter(Boolean).join(" ");
  return <p className={classes}>{children}</p>;
}
