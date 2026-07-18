import BracketColumn from "./BracketColumn";
import type { Bracket as BracketData, BracketColumnDef } from "@/data/types";

/**
 * Renders a bracket purely from data. Supports single elimination (one row)
 * and double elimination (upper + lower rows). Column `order` controls
 * horizontal position so lower-bracket rounds align under the right
 * upper-bracket rounds — no layout is hardcoded per event.
 */
export default function Bracket({ bracket }: { bracket: BracketData }) {
  const upperRow = bracket.columns
    .filter((c) => c.grid === "upper" || c.grid === "final")
    .sort((a, b) => a.order - b.order);
  const lowerRow = bracket.columns
    .filter((c) => c.grid === "lower")
    .sort((a, b) => a.order - b.order);

  const maxOrder = Math.max(...bracket.columns.map((c) => c.order));

  function renderRow(row: BracketColumnDef[], label?: string) {
    // Place columns on a shared horizontal grid so rows line up
    const slots: (BracketColumnDef | null)[] = Array.from(
      { length: maxOrder + 1 },
      (_, i) => row.find((c) => c.order === i) ?? null,
    );

    return (
      <div>
        {label && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
            {label}
          </p>
        )}
        <div className="flex items-stretch gap-10">
          {slots.map((col, i) =>
            col ? (
              <BracketColumn
                key={col.id}
                column={col}
                hasPrev={i > 0 && slots[i - 1] !== null}
                hasNext={
                  i < slots.length - 1 &&
                  slots[i + 1] !== null &&
                  (slots[i + 1]?.matchIds.length ?? 0) > 0
                }
                pairsIntoNext={
                  slots[i + 1] !== null &&
                  col.matchIds.length === (slots[i + 1]?.matchIds.length ?? 0) * 2
                }
              />
            ) : (
              <div key={`spacer-${i}`} className="w-64 shrink-0" aria-hidden="true" />
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-thin overflow-x-auto pb-2">
      <div className="min-w-max space-y-10 py-2">
        {renderRow(upperRow, bracket.type === "double" ? "Upper Bracket" : undefined)}
        {lowerRow.length > 0 && renderRow(lowerRow, "Lower Bracket")}
      </div>
    </div>
  );
}
