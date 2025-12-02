import About from "../components/sections/About";
import CTA from "../components/sections/CTA";
import Hero from "../components/sections/Hero";
import SponsorMarquee from "../components/sections/SponsorMarquee";
import Team from "../components/sections/Team";
import TwitchHighlight from "../components/sections/TwitchHighlight";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SponsorMarquee />
      <TwitchHighlight />
      <About />
      <Team />
      <CTA />
    </>
  );
}
