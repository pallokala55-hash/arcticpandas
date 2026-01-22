import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  realName: z.string().optional(),
  nationality: z.string().length(2).optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  socials: z.record(z.string(), z.string()).optional(),
  esportsIds: z.record(z.string(), z.string()).optional(),
});

export type Player = z.infer<typeof PlayerSchema>;
