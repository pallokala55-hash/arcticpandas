import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { playersBySlug } from "./data/players";
import About from "./sections/About";
import CTA from "./sections/CTA";
import Hero from "./sections/Hero";
import PlayerProfile from "./sections/PlayerProfile";
import Team from "./sections/Team";
import { colors } from "./theme";

const normalizePath = (path: string) => {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const getPlayerSlug = (path: string) => {
  const normalized = normalizePath(path);
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  if (segments[0] === "player" || segments[0] === "players") {
    return segments[1] ?? null;
  }

  return segments[0];
};

function App() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const currentSlug = getPlayerSlug(path)?.toLowerCase() ?? null;
  const player = currentSlug ? playersBySlug[currentSlug] : null;

  const goHome = () => {
    window.history.pushState({}, "", "/");
    setPath("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (player) {
    return (
      <div
        className={styles.app}
        style={{ backgroundColor: colors.background, color: colors.foreground }}
      >
        <div className={styles.starfield} aria-hidden="true" />
        <PlayerProfile player={player} onBack={goHome} />
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={styles.app}
      style={{ backgroundColor: colors.background, color: colors.foreground }}
    >
      <div className={styles.starfield} aria-hidden="true" />
      <Header />
      <main className={styles.main}>
        <Hero />
        <About />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
