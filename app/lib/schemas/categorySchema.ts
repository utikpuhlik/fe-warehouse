
import {z} from "zod";

export const zCategoryBaseSchema = z.object({
    name: z.string().min(1, "Название не может быть пустым"),
})

export const zCategory = zCategoryBaseSchema.extend({
    id: z.string().uuid(),
    slug: z.string(),
    image_url: z.string().url()
});

export const zCategoryPostSchema = zCategoryBaseSchema.extend({})

export const zCategoryPutSchema = zCategoryBaseSchema.extend({})
export const zCategories = z.array(zCategory);

/** TypeScript helper */
export type CategoryPostSchema = z.infer<typeof zCategoryPostSchema>;
export type CategoryPutSchema = z.infer<typeof zCategoryPutSchema>;
export type Category = z.infer<typeof zCategory>;



