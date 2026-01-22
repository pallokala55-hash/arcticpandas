import { z } from "zod";

export const PeakRankSchema = z.object({
  tier: z.enum(["grandmaster", "challenger"]),
  text: z.string().min(1),
  opggUrl: z.string().url(),
});

export const PlayerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  realName: z.string().optional(),
  nationality: z.string().length(2).optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  socials: z.record(z.string(), z.string()).optional(),
  esportsIds: z.record(z.string(), z.string()).optional(),
  // Profile fields for player pages
  role: z.string().optional(),
  origin: z.string().optional(),
  subtitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  playbook: z.string().optional(),
  peak: PeakRankSchema.optional(),
  // Roster card fields
  rosterNote: z.string().optional(),
});

export type Player = z.infer<typeof PlayerSchema>;
export type PeakRank = z.infer<typeof PeakRankSchema>;
