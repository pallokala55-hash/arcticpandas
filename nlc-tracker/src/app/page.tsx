import Hero from "@/components/home/Hero";
import EventsList from "@/components/home/EventsList";
import MatchesCarousel from "@/components/home/MatchesCarousel";
import NewsSection from "@/components/home/NewsSection";
import RecentActivity from "@/components/home/RecentActivity";
import PlayerOfMonth from "@/components/home/PlayerOfMonth";
import LeaderboardCard from "@/components/home/LeaderboardCard";
import { getUpcomingMatches, getRecentResults, getEventMatches } from "@/data/matches";
import { getEvent } from "@/data/events";
import { computeStandings } from "@/lib/standings";

export default function HomePage() {
  const upcoming = getUpcomingMatches().slice(0, 8);
  const results = getRecentResults().slice(0, 8);

  const summer = getEvent("nlc-summer-2026")!;
  const standings = computeStandings(getEventMatches(summer.id), summer.teamIds);

  return (
    <>
      <Hero />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <EventsList />
          <PlayerOfMonth />
        </div>

        {/* Center column */}
        <div className="flex flex-col gap-6">
          <MatchesCarousel upcoming={upcoming} results={results} />
          <NewsSection />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <RecentActivity />
        </div>
      </div>

      {/* Full-width leaderboard, DPM style */}
      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <LeaderboardCard standings={standings} />
      </div>
    </>
  );
}
