import Image from "next/image";
import styles from "./sections/About.module.css";

type MemberCardProps = {
  name: string;
  image?: string | null;
  role?: string;
  href?: string;
  maxWidth?: number;
};

const MemberCard = ({ name, image, role, href, maxWidth }: MemberCardProps) => {
  const isVideo = Boolean(image && image.match(/\.(mp4|mov|webm)$/i));

  const content = (
    <>
      <div className={styles.compAvatar}>
        {image ? (
          isVideo ? (
            <video
              src={image}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label={`${name} video`}
            />
          ) : (
            <Image src={image} alt={name} width={80} height={80} />
          )
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <span className={styles.compName}>{name}</span>
      {role && <span className={styles.compRole}>{role}</span>}
    </>
  );

  const style = maxWidth ? { maxWidth: `${maxWidth}px` } : undefined;

  if (href) {
    return (
      <a
        className={`${styles.compItem} ${styles.clickable}`}
        href={href}
        aria-label={`Open ${name}'s profile`}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={styles.compItem} style={style}>
      {content}
    </div>
  );
};

export default MemberCard;
