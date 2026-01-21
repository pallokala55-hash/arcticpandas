import Image from "next/image";
import Button from "../Button";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>NLC 2026 Winter</p>
          <h1 className={styles.title}>
            ARCTIC<br />
            <span className={styles.titleAccent}>PANDAS</span>
          </h1>
          <p className={styles.tagline}>
            Finland's next esports story. Professional League of Legends.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" href="/#team">
              Meet the roster
            </Button>
          </div>
        </div>
        <div className={styles.frameWrap}>
          <div className={styles.imageContainer}>
            <Image
              src="/portraits/roster-transparent.webp"
              alt="Arctic Pandas roster"
              width={1200}
              height={675}
              className={styles.frameImage}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
