import { z } from "zod";
import { zProduct } from "@/app/lib/schemas/productSchema";
import { zPaginatedSchema } from "@/app/lib/schemas/commonSchema";

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
  product_id: z.string().uuid(),
});

export const zOfferSchema = zOfferBaseSchema.extend({
  id: z.string().uuid(),
  offer_bitrix_id: z.string().nullable().optional(),
  quantity: z
    .number({ invalid_type_error: "Поле должно быть целым числом" })
    .int(),
  product: zProduct,
  wholesale_price_rub: z.number().nonnegative(),
});

export const zOfferPostSchema = zOfferBaseSchema.extend({});

export const zOfferPutSchema = zOfferBaseSchema.extend({});

export const zOfferPaginatedSchema = zPaginatedSchema.extend({
  items: z.array(zOfferSchema),
});

/** TypeScript helper */
export type OfferSchema = z.infer<typeof zOfferSchema>;
export type OfferPostSchema = z.infer<typeof zOfferPostSchema>;
export type OfferPutSchema = z.infer<typeof zOfferPutSchema>;
export type OfferPaginatedSchema = z.infer<typeof zOfferPaginatedSchema>;
