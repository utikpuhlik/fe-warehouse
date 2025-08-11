import {z} from "zod";
import {zOfferSchema} from "@/app/lib/schemas/offerSchema";

export const zOrderOfferBaseSchema = z.object({
    offer_id: z.string().uuid(),
    brand: z.string().min(1, "Бренд не может быть пустым"),
    manufacturer_number: z.string({
        invalid_type_error: "Номер производителя не может быть пустым",
    }),
    quantity: z
        .number({invalid_type_error: "Поле должно быть целым числом"})
        .int().gt(0, {message: "Кол-во должно быть > 0"}),
    price_rub: z
        .number({invalid_type_error: "Поле должно быть числом"})
        .nonnegative({
            message: "Цена не может быть меньше нуля",
        })
})

export const zOrderOfferSchema = zOrderOfferBaseSchema.extend({
    id: z.string().uuid(),
    order_id: z.string().uuid(),
    offer: zOfferSchema
})

export const zOrderOfferPostSchema = zOrderOfferBaseSchema.extend({})

export const zOrderOfferPutSchema = zOrderOfferBaseSchema.extend({})

/** TypeScript helper */
export type OrderOfferSchema = z.infer<typeof zOrderOfferSchema>;
export type OrderOfferPostSchema = z.infer<typeof zOrderOfferPostSchema>;
export type OrderOfferPutSchema = z.infer<typeof zOrderOfferPutSchema>;