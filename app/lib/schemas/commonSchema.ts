import {z} from "zod";

export const zCountSchema = z.object({
    count: z.number().gte(0)
});

export const zQuantityFormSchema = z.object({
    quantity: z
        .number({ invalid_type_error: "Введите число" })
        .int("Только целые числа")
        .min(1, "Минимум 1 шт."),
})

export type QuantityFormSchema = z.infer<typeof zQuantityFormSchema>
export type CountSchema = z.infer<typeof zCountSchema>;