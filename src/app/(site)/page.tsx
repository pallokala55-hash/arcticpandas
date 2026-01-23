import CTA from "../../components/sections/CTA";
import Hero from "../../components/sections/Hero";
import Team from "../../components/sections/Team";
import HomeMatches from "../../components/sections/HomeMatches";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeMatches />
      <Team />
      <CTA />
    </>
  );
}
