import {z} from "zod";
import {zUserReadSchema} from "@/app/lib/schemas/userSchema";

export const zWaybillBaseSchema = z.object({
    user_id: z.string().uuid(),
    waybill_type: z.enum(["WAYBILL_IN", "WAYBILL_OUT", "WAYBILL_RETURN"]),
    is_pending: z.boolean(),
    counterparty_name: z.string().min(1, "Контрагент не может быть пустым")
})

export const zWaybillSchema = zWaybillBaseSchema.extend({
    id: z.string().uuid(),
    user: zUserReadSchema,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime()
})

export const zWaybillPaginatedSchema = z.object({
    items: z.array(zWaybillSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    size: z.number().int().positive(),
    pages: z.number().int().nonnegative(),
})

export const zWaybillPostSchema = zWaybillBaseSchema.extend({
})

export const zWaybillPutSchema = zWaybillBaseSchema.extend({
})

/** TypeScript helper */
export type WaybillSchema = z.infer<typeof zWaybillSchema>;
export type WaybillPostSchema = z.infer<typeof zWaybillPostSchema>;
export type WaybillPutSchema = z.infer<typeof zWaybillPutSchema>;
export type WaybillPaginatedSchema = z.infer<typeof zWaybillPaginatedSchema>;