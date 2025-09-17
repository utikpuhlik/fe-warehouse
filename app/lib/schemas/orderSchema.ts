import { z } from "zod";

import { zAddressSchema } from "@/app/lib/schemas/addressSchema";
import { zOrderStatusEnum, zPaginatedSchema } from "@/app/lib/schemas/commonSchema";
import { zOrderOfferPostSchema, zOrderOfferSchema } from "@/app/lib/schemas/orderOfferSchema";
import { zUserSchema } from "@/app/lib/schemas/userSchema";
import { zWaybillSchema } from "@/app/lib/schemas/waybillSchema";

const zOrderBaseSchema = z.object({
  address_id: z.string().uuid(),
  status: zOrderStatusEnum,
  note: z.string().nullable(),
});

export const zOrderSchema = zOrderBaseSchema.extend({
  id: z.string().uuid(),
  user: zUserSchema,
  address: zAddressSchema,
  waybill: zWaybillSchema.nullable(),
  order_offers: zOrderOfferSchema.array(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  total_sum: z.number().int().nonnegative(),
});

export const zOrderPaginatedSchema = zPaginatedSchema.extend({
  items: z.array(zOrderSchema),
});

export const zOrderPostSchema = zOrderBaseSchema.extend({});
export const zOrderWithOffersPostSchema = zOrderBaseSchema.extend({
  // workaround with optional to use default value
  order_offers: z.array(zOrderOfferPostSchema).default([]).optional(),
});

export const zOrderPutSchema = zOrderBaseSchema.extend({});

/** TypeScript helpers */
export type OrderSchema = z.infer<typeof zOrderSchema>;
export type OrderPaginatedSchema = z.infer<typeof zOrderPaginatedSchema>;
export type OrderPostSchema = z.infer<typeof zOrderPostSchema>;
export type OrderWithOffersPostSchema = z.infer<typeof zOrderWithOffersPostSchema>;
export type OrderPutSchema = z.infer<typeof zOrderPutSchema>;
