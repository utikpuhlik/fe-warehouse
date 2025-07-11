import {z} from "zod";
import {zOfferSchema} from "@/app/lib/schemas/offerSchema";

export const zWaybillOfferBaseSchema = z.object({
    offer_id: z.string().uuid(),
    brand: z.string().min(1, "Бренд не может быть пустым"),
    manufacturer_number: z.string({
        invalid_type_error: "Номер производителя не может быть пустым",
    }),
    quantity: z
        .number({ invalid_type_error: "Поле должно быть целым числом" })
        .int().gt(0, { message: "Кол-во должно быть > 0" }),
    price_rub: z
        .number({invalid_type_error: "Поле должно быть числом"})
        .nonnegative({
            message: "Цена не может быть меньше нуля",
        })
})

export const zWaybillOfferSchema = zWaybillOfferBaseSchema.extend({
    id: z.string().uuid(),
    waybill_id: z.string().uuid(),
    offer: zOfferSchema
})

export const zWaybillOfferPostSchema = zWaybillOfferBaseSchema.extend({
})

/** TypeScript helper */
export type WaybillOfferSchema = z.infer<typeof zWaybillOfferSchema>;
export type WaybillOfferPostSchema = z.infer<typeof zWaybillOfferPostSchema>;