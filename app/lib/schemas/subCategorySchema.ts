import { z } from "zod";

import { zCategory } from "@/app/lib/schemas/categorySchema";

export const zSubCategoryBaseSchema = z.object({
  name: z.string().min(1, "Название не может быть пустым"),
  category_id: z.string(),
});
export const zSubCategorySchema = zSubCategoryBaseSchema.extend({
  id: z.string(),
  slug: z.string(),
  category: zCategory,
  image_url: z.string().url(),
});
export const zSubCategoryArraySchema = z.array(zSubCategorySchema);
export const zSubCategoryPostSchema = zSubCategoryBaseSchema.extend({});

export const zSubCategoryPutSchema = zSubCategoryBaseSchema.extend({});

/** TypeScript helper */
export type SubCategory = z.infer<typeof zSubCategorySchema>;
export type SubCategoryPostSchema = z.infer<typeof zSubCategoryPostSchema>;
export type SubCategoryPutSchema = z.infer<typeof zSubCategoryPutSchema>;
