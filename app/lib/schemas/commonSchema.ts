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


// ENUMs
export const zRoleEnum = z.enum(["ADMIN", "EMPLOYEE", "USER"]);
export const zWaybillTypeEnum = z.enum(["WAYBILL_IN", "WAYBILL_OUT", "WAYBILL_RETURN"]);
export const zOrderStatusEnum = z.enum(["NEW", "IN_PROGRESS", "SHIPPING", "COMPLETED", "CANCELED"]);




export type QuantityFormSchema = z.infer<typeof zQuantityFormSchema>
export type CountSchema = z.infer<typeof zCountSchema>;
export type RoleEnum = z.infer<typeof zRoleEnum>;
export type WaybillTypeEnum = z.infer<typeof zWaybillTypeEnum>;
export type OrderStatusEnum = z.infer<typeof zOrderStatusEnum>;


// Display Labels
export const USER_ROLE_LABELS: Record<RoleEnum, string> = {
    ADMIN: "Администратор",
    EMPLOYEE: "Сотрудник",
    USER: "Пользователь"
}

export const WAYBILL_TYPE_LABELS: Record<WaybillTypeEnum, string> = {
    WAYBILL_IN: "Приходная накладная",
    WAYBILL_OUT: "Расходная накладная",
    WAYBILL_RETURN: "Возвратная накладная"
}

export const ORDER_STATUS_LABELS: Record<OrderStatusEnum, string> = {
    NEW: "Новый",
    IN_PROGRESS: "В сборке",
    SHIPPING: "Отправлен",
    COMPLETED: "Завершен",
    CANCELED: "Отменен"
}
