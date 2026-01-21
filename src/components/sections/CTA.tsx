import Image from "next/image";
import Button from "../Button";
import { contactConfig } from "../../lib/config";
import styles from "./CTA.module.css";

const CTA = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <Image
          src="/logo.svg"
          alt="Arctic Pandas"
          width={72}
          height={72}
          className={styles.logo}
        />
        <h2 className={styles.title}>Partner with us.</h2>
        <p className={styles.copy}>
          Camera-ready players, consistent production, clear deliverables.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" href="/for-partners">
            View Partner Deck
          </Button>
          <a href={contactConfig.emailHref} className={styles.email}>
            {contactConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
