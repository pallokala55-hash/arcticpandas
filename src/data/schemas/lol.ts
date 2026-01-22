import { z } from "zod";

export const ChampionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export const DragonRefSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const ChampionsFileSchema = z.record(z.string(), ChampionSchema);
export const DragonsFileSchema = z.record(z.string(), DragonRefSchema);

export type Champion = z.infer<typeof ChampionSchema>;
export type DragonRef = z.infer<typeof DragonRefSchema>;
