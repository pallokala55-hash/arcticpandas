import { z } from "zod";

export const RoleSchema = z.enum(["top", "jungle", "mid", "bottom", "support"]);
export const SideSchema = z.enum(["blue", "red"]);
export const ResultSchema = z.enum(["win", "loss"]);
export const DragonTypeSchema = z.enum([
  "infernal",
  "mountain",
  "ocean",
  "cloud",
  "hextech",
  "chemtech",
]);

export const PerkMetadataSchema = z.object({
  styleId: z.number().int(),
  subStyleId: z.number().int(),
  perks: z.array(z.number().int()),
});

export const PlayerParticipationSchema = z.object({
  playerId: z.string().nullable(),
  name: z.string().min(1),
  role: RoleSchema,
  champion: z.string().min(1),
  kills: z.number().int().nonnegative().optional(),
  deaths: z.number().int().nonnegative().optional(),
  assists: z.number().int().nonnegative().optional(),
  cs: z.number().int().nonnegative().optional(),
  gold: z.number().int().nonnegative().optional(),
  level: z.number().int().positive().optional(),
  items: z.array(z.number().int()).optional(),
  kp: z.number().min(0).max(1).optional(),
  dmgShare: z.number().min(0).max(1).optional(),
  wardsPlaced: z.number().int().nonnegative().optional(),
  wardsDestroyed: z.number().int().nonnegative().optional(),
  perks: PerkMetadataSchema.optional(),
  abilities: z.array(z.string()).optional(),
});

export const TeamParticipationSchema = z.object({
  teamId: z.string().min(1),
  side: SideSchema.optional(),
  result: ResultSchema.optional(),
  kills: z.number().int().nonnegative().optional(),
  deaths: z.number().int().nonnegative().optional(),
  gold: z.number().int().nonnegative().optional(),
  towers: z.number().int().nonnegative().optional(),
  inhibitors: z.number().int().nonnegative().optional(),
  dragons: z.array(DragonTypeSchema).optional(),
  barons: z.number().int().nonnegative().optional(),
  players: z.array(PlayerParticipationSchema).optional(),
});

export const TournamentSchema = z.object({
  name: z.string().min(1),
  stage: z.string().optional(),
});

export const VodSchema = z.object({
  url: z.string().url(),
  label: z.string().min(1),
});

export const GameSchema = z.object({
  id: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(), // HH:MM in local time
  timeZone: z.string().optional(), // IANA time zone, e.g. Europe/Helsinki
  patch: z.string().optional(),
  duration: z.number().int().positive().optional(),
  durationRealtime: z.number().int().positive().optional(),
  tournament: TournamentSchema.optional(),
  vods: z.array(VodSchema).optional(),
  teams: z.tuple([TeamParticipationSchema, TeamParticipationSchema]),
  // URL slugs - array of valid permutations, simplest first
  slugs: z.array(z.string().min(1)),
});

export type PerkMetadata = z.infer<typeof PerkMetadataSchema>;
export type PlayerParticipation = z.infer<typeof PlayerParticipationSchema>;
export type TeamParticipation = z.infer<typeof TeamParticipationSchema>;
export type Game = z.infer<typeof GameSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type DragonType = z.infer<typeof DragonTypeSchema>;
