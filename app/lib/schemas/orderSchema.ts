import {z} from "zod";

const zOrderBaseSchema = z.object({
    user_id: z.string().uuid(),
    address_id: z.string().uuid(),
    status: z.enum(["NEW", "IN_PROGRESS", "SHIPPING", "COMPLETED", "CANCELLED"]),
    note: z.string().nullable(),
})

export const zOrderSchema = zOrderBaseSchema.extend({
    id: z.string().uuid(),
    user_first_name: z.string(),
    user_last_name: z.string(),
    user_email: z.string().email(),
    user_phone: z.string().nullable(),
    total_sum: z.number().int().nonnegative(),
});

export const zOrderPostSchema = zOrderBaseSchema.extend({});

export const zOrderPutSchema = zOrderBaseSchema.extend({});

export const zOrdersSchema = z.array(zOrderSchema);

/** TypeScript helpers */
export type OrderSchema = z.infer<typeof zOrderSchema>;
export type OrderPostSchema = z.infer<typeof zOrderPostSchema>;
export type OrderPutSchema = z.infer<typeof zOrderPutSchema>;
