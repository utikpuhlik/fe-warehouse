import {z} from "zod";


export const zSubCategoryBaseSchema = z.object({
    name: z.string(),
    image_url: z.string(),
})
export const zSubCategorySchema = zSubCategoryBaseSchema.extend({
    id: z.string(),
    slug: z.string(),
    category_id: z.string(),
    category_slug: z.string(),

});
export const zSubCategoryPostSchema = zSubCategoryBaseSchema.extend({
    id: z.string(),
    category_id: z.string(),
    category_slug: z.string(),
})

export const zSubCategoryPutSchema = zSubCategoryBaseSchema.extend({
    id: z.string(),
    category_id: z.string(),
    category_slug: z.string(),
})


/** TypeScript helper */
export type SubCategory = z.infer<typeof zSubCategorySchema>;
export type SubCategoryPostSchema = z.infer<typeof zSubCategoryPostSchema>;
export type SubCategoryPutSchema = z.infer<typeof zSubCategoryPutSchema>;

