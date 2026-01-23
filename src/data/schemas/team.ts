import { z } from "zod";

export const TeamColorsSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
});

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().min(1).max(5),
  altCodes: z.array(z.string()).optional(),
  region: z.string().optional(),
  league: z.string().optional(),
  logo: z.string().optional(),
  invertLogo: z.boolean().optional(),
  colors: TeamColorsSchema.optional(),
  socials: z.record(z.string(), z.string()).optional(),
  website: z.string().url().optional(),
  esportsIds: z.record(z.string(), z.string()).optional(),
});

export type Team = z.infer<typeof TeamSchema>;
