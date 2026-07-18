"use client";

import { useState } from "react";
import MatchCard from "@/components/MatchCard";
import type { Match } from "@/data/types";

type MatchesCarouselProps = {
  upcoming: Match[];
  results: Match[];
};

export default function MatchesCarousel({ upcoming, results }: MatchesCarouselProps) {
  const [tab, setTab] = useState<"upcoming" | "results">("upcoming");
  const list = tab === "upcoming" ? upcoming : results;

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="text-xs font-bold tracking-[0.2em] text-accent-soft">MATCHES</h2>
        <div
          className="flex rounded-lg border border-white/10 bg-panel-2 p-0.5 text-xs font-semibold"
          role="tablist"
          aria-label="Match list"
        >
          {(["upcoming", "results"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 uppercase tracking-wide transition-colors ${
                tab === t ? "bg-white/10 text-white" : "text-muted hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-thin flex gap-3 overflow-x-auto p-4">
        {list.length === 0 && (
          <p className="py-6 text-sm text-muted">Nothing here yet.</p>
        )}
        {list.map((m) => (
          <MatchCard key={m.id} match={m} variant="carousel" />
        ))}
      </div>
    </section>
  );
}
