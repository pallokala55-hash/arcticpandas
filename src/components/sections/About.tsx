import Image from "next/image";
import styles from "./About.module.css";
import { players } from "../../data/players";
import { colors, withAlpha } from "../../theme";
import type { CSSVarStyles } from "../../theme";

const management = [
  {
    id: "tapio",
    name: "Tapio Salomaa",
    role: "CEO",
  },
  {
    id: "aleksi",
    name: "Aleksi Kaikkonen",
    role: "Head Coach",
  },
];

type MemberCardProps = {
  name: string;
  image?: string | null;
  role?: string;
  href?: string;
  maxWidth?: number;
};

const MemberCard = ({ name, image, role, href, maxWidth }: MemberCardProps) => {
  const content = (
    <>
      <div className={styles.compAvatar}>
        {image ? (
          <Image src={image} alt={name} width={80} height={80} />
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

const About = () => {
  const sectionStyle: CSSVarStyles = {
    "--divider-color": withAlpha(colors.frostGrey, 0.16),
    "--muted": colors.frostGrey,
    "--about-bg": withAlpha(colors.foreground, 0.01),
  };

  return (
    <section id="team" className={styles.about} style={sectionStyle}>
      <div className={styles.container}>
        <div className={styles.lede}>
          <p className={styles.kicker}>Team composition</p>
        </div>
        <div className={styles.composition}>
          {players.map((player) => (
            <MemberCard
              key={player.slug}
              name={player.name}
              image={player.image}
              href={`/${player.slug}`}
            />
          ))}
        </div>

        <div className={styles.lede}>
          <p className={styles.kicker}>Management</p>
        </div>
        <div className={styles.management}>
          {management.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              maxWidth={280}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
