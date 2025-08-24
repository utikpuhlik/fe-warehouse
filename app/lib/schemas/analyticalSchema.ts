import { z } from "zod";

export const zProductAnalyticalSchema = z.object({
  name: z.string(),
  image_url: z.string().url(),
  sold: z.number().positive(),
  revenue: z.number().positive(),
});

/** TypeScript helpers */
export type ProductAnalyticalSchema = z.infer<typeof zProductAnalyticalSchema>;
