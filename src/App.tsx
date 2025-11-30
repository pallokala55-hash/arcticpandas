import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Footer from "./components/Footer";
import Header, { type HeaderNavLink } from "./components/Header";
import { playersBySlug } from "./data/players";
import About from "./sections/About";
import CTA from "./sections/CTA";
import Hero from "./sections/Hero";
import PlayerProfile from "./sections/PlayerProfile";
import Shop from "./sections/Shop";
import SponsorMarquee from "./sections/SponsorMarquee";
import Team from "./sections/Team";
import TwitchHighlight from "./sections/TwitchHighlight";
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

  const navigateTo = (target: string) => {
    const normalizedTarget = normalizePath(target);

    if (normalizedTarget === path) {
      if (normalizedTarget === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    window.history.pushState({}, "", normalizedTarget);
    setPath(normalizedTarget);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => navigateTo("/");

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

  const isShop = path === "/shop";
  const shopNavLinks: HeaderNavLink[] = [
    { label: "Collections", href: "#shop-collections" },
    { label: "Care", href: "#shop-care" },
    { label: "FAQ", href: "#shop-faq" },
    { label: "Home", href: "/", type: "route" },
  ];
  const shopCta: HeaderNavLink = {
    label: "Back to HQ",
    href: "/",
    type: "route",
  };

  if (isShop) {
    return (
      <div
        className={styles.app}
        style={{ backgroundColor: colors.background, color: colors.foreground }}
      >
        <div className={styles.starfield} aria-hidden="true" />
        <Header
          onNavigate={navigateTo}
          navLinks={shopNavLinks}
          cta={shopCta}
        />
        <main className={styles.main}>
          <Shop />
        </main>
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
      <Header onNavigate={navigateTo} />
      <main className={styles.main}>
        <Hero />
        <SponsorMarquee />
        <TwitchHighlight />
        <About />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
