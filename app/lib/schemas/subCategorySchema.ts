import {z} from "zod";

export const zSubCategory = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string(),
    category_id: z.string(),
    category_slug: z.string(),
});


/** TypeScript helper */
export type SubCategory = z.infer<typeof zSubCategory>;