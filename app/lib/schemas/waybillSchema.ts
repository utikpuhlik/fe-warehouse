import { z } from "zod";
import { zUserSchema } from "@/app/lib/schemas/userSchema";
import { zWaybillOfferPostSchema } from "@/app/lib/schemas/waybillOfferSchema";
import {
  zPaginatedSchema,
  zWaybillTypeEnum,
} from "@/app/lib/schemas/commonSchema";

const zWaybillBaseSchema = z.object({
  customer_id: z.string().uuid().nullable(),
  waybill_type: zWaybillTypeEnum,
  is_pending: z.boolean(),
  note: z.string().nullable(),
});

export const zWaybillSchema = zWaybillBaseSchema.extend({
  id: z.string().uuid(),
  order_id: z.string().uuid().nullable(),
  author: zUserSchema,
  customer: zUserSchema,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const zWaybillPaginatedSchema = zPaginatedSchema.extend({
  items: z.array(zWaybillSchema),
});

export const zWaybillPostSchema = zWaybillBaseSchema.extend({});

export const zWaybillWithOffersPostSchema = zWaybillBaseSchema.extend({
  // workaround with optional to use default value
  waybill_offers: z.array(zWaybillOfferPostSchema).default([]).optional(),
});

export const zWaybillPutSchema = zWaybillBaseSchema.extend({});

/** TypeScript helper */
export type WaybillSchema = z.infer<typeof zWaybillSchema>;
export type WaybillPostSchema = z.infer<typeof zWaybillPostSchema>;
export type WaybillWithOffersPostSchema = z.infer<
  typeof zWaybillWithOffersPostSchema
>;
export type WaybillPutSchema = z.infer<typeof zWaybillPutSchema>;
export type WaybillPaginatedSchema = z.infer<typeof zWaybillPaginatedSchema>;
