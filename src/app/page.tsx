import Footer from "../components/Footer";
import Header from "../components/Header";
import About from "../components/sections/About";
import CTA from "../components/sections/CTA";
import Hero from "../components/sections/Hero";
import SponsorMarquee from "../components/sections/SponsorMarquee";
import Team from "../components/sections/Team";
import TwitchHighlight from "../components/sections/TwitchHighlight";
import styles from "./layout.module.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <SponsorMarquee />
        <TwitchHighlight />
        <About />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
