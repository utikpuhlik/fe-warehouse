import {z} from "zod";

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
    product_name: z.string(),
    address_id: z.string().optional().nullable(),
    image_url: z.string().url(),
    category_slug: z.string(),
    category_name: z.string(),
    sub_category_slug: z.string(),
    sub_category_name: z.string(),
    product_id: z.string().uuid(),
})

export const zOrderOfferPostSchema = zOrderOfferBaseSchema.extend({})

/** TypeScript helper */
export type OrderOfferSchema = z.infer<typeof zOrderOfferSchema>;
export type OrderOfferPostSchema = z.infer<typeof zOrderOfferPostSchema>;