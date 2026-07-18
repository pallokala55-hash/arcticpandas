import type { Tier } from "@/data/types";

const TIER_STYLES: Record<Tier, { label: string; className: string }> = {
  challenger: { label: "CHALL", className: "bg-gold/15 text-gold border-gold/30" },
  grandmaster: { label: "GM", className: "bg-loss/15 text-loss border-loss/30" },
  master: { label: "MASTER", className: "bg-accent/15 text-accent-soft border-accent/30" },
  diamond: { label: "DIA", className: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30" },
  emerald: { label: "EME", className: "bg-win/15 text-win border-win/30" },
};

export default function TierBadge({ tier }: { tier: Tier }) {
  const s = TIER_STYLES[tier];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${s.className}`}
    >
      {s.label}
    </span>
  );
}
