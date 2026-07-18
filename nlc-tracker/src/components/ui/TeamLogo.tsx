import type { Team } from "@/data/types";

type TeamLogoProps = {
  team?: Team;
  size?: number;
  className?: string;
};

/**
 * Placeholder team logo: gradient tile with the team code.
 * Swapped for uploaded images once real assets exist — keep the API stable.
 */
export default function TeamLogo({ team, size = 32, className = "" }: TeamLogoProps) {
  if (!team) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg border border-dashed border-white/20 text-muted ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.45 }}
        aria-hidden="true"
      >
        ?
      </div>
    );
  }
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg font-bold text-white/95 shadow-inner ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(9, size * 0.3),
        background: `linear-gradient(135deg, ${team.colors.from}, ${team.colors.to})`,
        letterSpacing: "0.02em",
      }}
      aria-label={team.name}
    >
      {team.code}
    </div>
  );
}
