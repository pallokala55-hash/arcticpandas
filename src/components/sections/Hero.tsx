import Button from "../Button";
import styles from "./Hero.module.css";

// Easy to adjust: [id, name, left%, bottom%, zIndex, scale]
const players: [string, string, number, number, number, number][] = [
  ["dibu", "Dibu", -10, 20, 3, 1.2],
  ["boltox", "Boltox", 13, 25, 2, 1.05],
  ["simple", "Simpli", 26, 20, 5, 1.25],
  ["kehvo", "Kehvo", 58, 25, 3, 1.2],
  ["nille", "Nille", 50, 20, 4, 1.2],
];

export default function Hero(): React.ReactElement {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backdrop} />

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>NLC 2026 Winter</p>
          <h1 className={styles.title}>
            <span className={styles.titleTop}>ARCTIC</span>
            <span className={styles.titleBottom}>PANDAS</span>
          </h1>
          <p className={styles.tagline}>Professional League of Legends</p>
          <div className={styles.actions}>
            <Button variant="primary" href="/#team">
              Meet the roster
            </Button>
          </div>
        </div>

        <div className={styles.roster}>
          {players.map(([id, name, left, bottom, z, scale], i) => (
            <div
              key={id}
              className={styles.player}
              style={{
                left: `${left}%`,
                bottom: `${bottom}%`,
                zIndex: z,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/portraits/${id}-cutout.webp`}
                alt={name}
                className={styles.playerImage}
                style={{ height: `${scale * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomFade} />
    </section>
  );
}
