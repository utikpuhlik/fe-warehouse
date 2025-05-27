import {z} from "zod";

export const zOfferBaseSchema = z.object({
    brand: z.string({
        invalid_type_error: "Бренд не может быть пустым",
    }),
    internal_description: z.string().nullable(),
    manufacturer_number: z.string({
        invalid_type_error: "Номер производителя не может быть пустым",
    }),
    price_rub: z.number().nonnegative({
        message: "Цена не может быть меньше нуля",
    }),
    super_wholesale_price_rub: z.number().nonnegative({
        message: "Цена не может быть меньше нуля",
    }),
    quantity: z.number().int(),
    product_id: z.string().uuid(),
})

export const zOfferSchema = zOfferBaseSchema.extend({
    id: z.string().uuid(),
    offer_bitrix_id: z.string().nullable().optional(),
    category_slug: z.string(),
    sub_category_slug: z.string(),
    image_url: z.string().url().nullable(),
    wholesale_price_rub: z.number().nonnegative()
})

export const zOfferPostSchema = zOfferBaseSchema.extend({
})

export const zOfferPutSchema = zOfferBaseSchema.extend({

})

export const zOffersSchema = z.object({
    items: z.array(zOfferSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    size: z.number().int().positive(),
    pages: z.number().int().nonnegative(),
})



/** TypeScript helper */
export type OfferSchema = z.infer<typeof zOfferSchema>
export type OfferPostSchema = z.infer<typeof zOfferPostSchema>
export type OfferPutSchema = z.infer<typeof zOfferPutSchema>
export type OffersSchema = z.infer<typeof zOffersSchema>