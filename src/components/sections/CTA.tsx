import { contactConfig } from "../../lib/config";
import styles from "./CTA.module.css";

export default function CTA(): React.ReactElement {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Let's build something.</h2>
        <div className={styles.actions}>
          <a href="/for-partners" className={styles.deckLink}>
            View Partner Deck
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <span className={styles.divider}>or</span>
          <a href={contactConfig.emailHref} className={styles.email}>
            {contactConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
