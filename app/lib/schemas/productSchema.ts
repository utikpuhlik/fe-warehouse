import { z } from "zod";

export const zProductBaseSchema = z.object({
    name: z.string().min(1, "Название не может быть пустым"),
    cross_number: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    sub_category_id: z.string(),
});

export const zProductPostSchema = zProductBaseSchema.extend({
    cross_number: z.string().min(1, "Кросс номер не может быть пустым"),
});

export const zProductPutSchema = zProductBaseSchema.extend({
    name: z.string({
        invalid_type_error: "Название не может быть пустым",
    }),
    cross_number: z.string().min(1, "Кросс номер не может быть пустым"),
});


export const zProduct = zProductBaseSchema.extend({
    id: z.string().uuid(),
    bitrix_id: z.string().optional().nullable(),
    slug: z.string().nullable(),
    image_url: z.string().url(),
    category_slug: z.string(),
    category_name: z.string(),
    sub_category_slug: z.string(),
    sub_category_name: z.string()
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
