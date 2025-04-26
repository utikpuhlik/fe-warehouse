// lib/schemas/user.ts
import { z } from 'zod';

export const imageUrlPlaceholder: string = 'https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp';


export const zProduct = z.object({
    id: z.string().uuid(),
    bitrix_id: z.string(),
    address_id: z.string().nullable(),
    name: z.string(),
    brand: z.string(),
    manufacturer_number: z.string(),
    cross_number: z.string().nullable(),
    description: z.string().nullable(),
    image_url: z.string().url().nullable(),
    price_rub: z.number().nonnegative(),
    super_wholesale_price_rub: z.coerce.string(),
    quantity: z.number().int(),
    sub_category_id: z.string(),
    sub_category_slug: z.string(),
});

export const zProducts = z.object({
    items: z.array(zProduct),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    size: z.number().int().positive(),
    pages: z.number().int().positive(),
});

export const zCategory = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string()
})

export const zSubCategory = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string(),
    category_id: z.string(),
    category_slug: z.string()
})

/** Single user */
export const zUser = z.object({
    id: z.string().uuid(),
    hashed_password: z.string(),          // TODO: you won’t expose this in UI but it exists
    first_name: z.string(),
    last_name: z.string().nullable(),
    avatar_url: z.string().url().nullable(),
    email: z.string().email(),
    is_active: z.boolean(),
    is_superuser: z.boolean(),
    is_verified: z.boolean(),
    role: z.string(),
    position: z.string().nullable(),
});

/** Array wrapper for list endpoints */
export const zUsers = z.array(zUser);

/** TypeScript helper */
export type Product = z.infer<typeof zProduct>;
export type Products = z.infer<typeof zProducts>;

export type Category = z.infer<typeof zCategory>;
export type SubCategory = z.infer<typeof zSubCategory>

export type UserSchema = z.infer<typeof zUser>;




