// lib/schemas/user.ts
import {z} from "zod";

export const zCategoryBaseSchema = z.object({
    name: z.string(),
})

export const zCategory = zCategoryBaseSchema.extend({
    id: z.string(),
    slug: z.string(),
    image_url: z.string().url()
});

export const zCategoryPostSchema = zCategoryBaseSchema.extend({})

export const zCategoryPutSchema = zCategoryBaseSchema.extend({})


/** TypeScript helper */
export type CategoryPostSchema = z.infer<typeof zCategoryPostSchema>;
export type CategoryPutSchema = z.infer<typeof zCategoryPutSchema>;
export type Category = z.infer<typeof zCategory>;


