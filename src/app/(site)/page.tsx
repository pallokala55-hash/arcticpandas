import CTA from "../../components/sections/CTA";
import Hero from "../../components/sections/Hero";
import Team from "../../components/sections/Team";
import MatchHighlight from "../../components/sections/MatchHighlight";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MatchHighlight />
      <Team />
      <CTA />
    </>
  );
}
