import type { Metadata } from "next";
import MatchCard from "@/components/MatchCard";
import { getUpcomingMatches, getRecentResults } from "@/data/matches";

export const metadata: Metadata = { title: "Matches" };

export default function MatchesPage() {
  const upcoming = getUpcomingMatches();
  const results = getRecentResults();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-black text-white">Matches</h1>

      <h2 className="mt-10 mb-4 text-xs font-bold tracking-[0.2em] text-accent-soft">
        UPCOMING
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((m) => (
          <MatchCard key={m.id} match={m} variant="row" />
        ))}
      </div>

      <h2 className="mt-12 mb-4 text-xs font-bold tracking-[0.2em] text-accent-soft">
        RESULTS
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((m) => (
          <MatchCard key={m.id} match={m} variant="row" />
        ))}
      </div>
    </div>
  );
}
