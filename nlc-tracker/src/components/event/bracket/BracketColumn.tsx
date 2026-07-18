import BracketMatchCard from "./BracketMatchCard";
import { getMatch } from "@/data/matches";
import type { BracketColumnDef } from "@/data/types";

type BracketColumnProps = {
  column: BracketColumnDef;
  /** Draw stubs toward the previous / next column */
  hasPrev: boolean;
  hasNext: boolean;
  /** True when this column's matches feed pairwise into a half-size column */
  pairsIntoNext: boolean;
};

/**
 * One round of the bracket. Connector lines are pure CSS:
 *  - every card gets a stub toward the neighbouring column
 *  - when two matches feed one match in the next round, a vertical elbow
 *    joins the pair's stubs at the column edge
 */
export default function BracketColumn({
  column,
  hasPrev,
  hasNext,
  pairsIntoNext,
}: BracketColumnProps) {
  const matches = column.matchIds
    .map((id) => getMatch(id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  const pairs: (typeof matches)[] = [];
  if (pairsIntoNext) {
    for (let i = 0; i < matches.length; i += 2) pairs.push(matches.slice(i, i + 2));
  } else {
    pairs.push(...matches.map((m) => [m]));
  }

  return (
    <div className="flex w-64 flex-col">
      <h4 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">
        {column.title}
      </h4>
      <div className="flex flex-1 flex-col justify-around gap-6">
        {pairs.map((group, gi) => (
          <div key={gi} className="relative flex flex-col justify-around gap-6">
            {/* Vertical elbow joining a pair toward the next round */}
            {group.length === 2 && hasNext && (
              <span
                className="absolute -right-5 top-1/4 bottom-1/4 w-px"
                style={{ background: "var(--bracket-line)" }}
                aria-hidden="true"
              />
            )}
            {group.map((match) => (
              <div key={match.id} className="relative">
                {hasPrev && (
                  <span
                    className="absolute -left-5 top-1/2 h-px w-5"
                    style={{ background: "var(--bracket-line)" }}
                    aria-hidden="true"
                  />
                )}
                {hasNext && (
                  <span
                    className="absolute -right-5 top-1/2 h-px w-5"
                    style={{ background: "var(--bracket-line)" }}
                    aria-hidden="true"
                  />
                )}
                <BracketMatchCard match={match} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
