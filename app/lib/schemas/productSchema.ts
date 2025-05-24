import { z } from "zod";

export const zProductBaseSchema = z.object({
    address_id: z.string().nullable(),
    name: z.string().min(1, "Название не может быть пустым"),
    cross_number: z.string().nullable(),
    description: z.string().nullable(),
    image_url: z.string().url().nullable(),
});

export const zProductPostSchema = zProductBaseSchema.extend({
    sub_category_id: z.string(),
});

export const zProductPutSchema = zProductBaseSchema.extend({
    name: z.string({
        invalid_type_error: "Название не может быть пустым",
    }),
});


export const zProduct = zProductBaseSchema.extend({
    id: z.string().uuid(),
    bitrix_id: z.string(),
    slug: z.string(),
    category_slug: z.string(),
    sub_category_slug: z.string()
});

export const zProducts = z.object({
    items: z.array(zProduct),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    size: z.number().int().positive(),
    pages: z.number().int().nonnegative(),
});

/** TypeScript helper */
export type ProductPutSchema = z.infer<typeof zProductPutSchema>;
export type ProductPostSchema = z.infer<typeof zProductPostSchema>;
export type Product = z.infer<typeof zProduct>;
export type Products = z.infer<typeof zProducts>;
