import { z } from "zod";
import {zProduct} from "@/app/lib/schemas/productSchema";

export const zOfferBaseSchema = z.object({
  address_id: z.string().nullable(),
  brand: z.string().min(1, "Бренд не может быть пустым"),
  internal_description: z.string().nullable(),
  manufacturer_number: z.string({
    invalid_type_error: "Номер производителя не может быть пустым",
  }),
  price_rub: z
    .number({ invalid_type_error: "Поле должно быть числом" })
    .nonnegative({
      message: "Цена не может быть меньше нуля",
    }),
  super_wholesale_price_rub: z
    .number({ invalid_type_error: "Поле должно быть числом" })
    .nonnegative({
      message: "Цена не может быть меньше нуля",
    }),
  quantity: z
    .number({ invalid_type_error: "Поле должно быть целым числом" })
    .int(),
  product_id: z.string().uuid(),
});

export const zOfferSchema = zOfferBaseSchema.extend({
  id: z.string().uuid(),
  offer_bitrix_id: z.string().nullable().optional(),
  product: zProduct,
  wholesale_price_rub: z.number().nonnegative(),
});

export const zOfferPostSchema = zOfferBaseSchema.extend({});

export const zOfferPutSchema = zOfferBaseSchema.extend({});

export const zOffersSchema = z.object({
  items: z.array(zOfferSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  pages: z.number().int().nonnegative(),
});

/** TypeScript helper */
export type OfferSchema = z.infer<typeof zOfferSchema>;
export type OfferPostSchema = z.infer<typeof zOfferPostSchema>;
export type OfferPutSchema = z.infer<typeof zOfferPutSchema>;
export type OffersSchema = z.infer<typeof zOffersSchema>;
