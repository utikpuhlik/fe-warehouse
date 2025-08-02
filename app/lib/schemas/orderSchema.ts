import {z} from "zod";
import {zUserSchema} from "@/app/lib/schemas/userSchema";
import {zAddressSchema} from "@/app/lib/schemas/addressSchema";
import {zOrderOfferSchema} from "@/app/lib/schemas/orderOfferSchema";
import {zOrderStatusEnum} from "@/app/lib/schemas/commonSchema";
import {zOrderOfferPostSchema} from "@/app/lib/schemas/orderOfferSchema";

const zOrderBaseSchema = z.object({
    user_id: z.string().uuid(),
    address_id: z.string().uuid(),
    status: zOrderStatusEnum,
    note: z.string().nullable(),
})

export const zOrderSchema = zOrderBaseSchema.extend({
    id: z.string().uuid(),
    user: zUserSchema,
    address: zAddressSchema,
    order_offers: zOrderOfferSchema.array(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    total_sum: z.number().int().nonnegative(),
});

export const zOrderPaginatedSchema = z.object({
    items: z.array(zOrderSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    size: z.number().int().positive(),
    pages: z.number().int().nonnegative(),
});

export const zOrderPostSchema = zOrderBaseSchema.extend({});
export const zOrderWithOffersPostSchema = zOrderBaseSchema.extend({
    // workaround with optional to use default value
    order_offers: z.array(zOrderOfferPostSchema).default([]).optional()
})

export const zOrderPutSchema = zOrderBaseSchema.extend({});


/** TypeScript helpers */
export type OrderSchema = z.infer<typeof zOrderSchema>;
export type OrderPaginatedSchema = z.infer<typeof zOrderPaginatedSchema>;
export type OrderPostSchema = z.infer<typeof zOrderPostSchema>;
export type OrderWithOffersPostSchema = z.infer<typeof zOrderWithOffersPostSchema>;
export type OrderPutSchema = z.infer<typeof zOrderPutSchema>;
