import styles from "./SectionEyebrow.module.css";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

const SectionEyebrow = ({ children, className }: SectionEyebrowProps) => {
  return (
    <p className={`${styles.eyebrow} ${className || ""}`}>
      {children}
    </p>
  );
};

export default SectionEyebrow;
