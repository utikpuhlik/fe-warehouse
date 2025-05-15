import {z} from "zod";
import {zProduct} from "@/app/lib/schemas/productSchema";

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
})

export const zOfferSchema = zOfferBaseSchema.extend({
    id: z.string().uuid(),
    product_id: z.string().uuid()
})

export const zOfferPostSchema = zOfferBaseSchema.extend({
    product_id: z.string().uuid()
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