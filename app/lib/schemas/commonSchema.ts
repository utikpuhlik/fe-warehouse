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
export const zUserTypeEnum = z.enum(["USER_RETAIL", "USER_WHOLESALE", "USER_SUPER_WHOLESALE"]);
export const zShippingMethodEnum = z.enum(["SELF_PICKUP", "CARGO", "OTHER"]);


export type QuantityFormSchema = z.infer<typeof zQuantityFormSchema>
export type CountSchema = z.infer<typeof zCountSchema>;
export type RoleEnum = z.infer<typeof zRoleEnum>;
export type UserTypeEnum = z.infer<typeof zUserTypeEnum>;
export type WaybillTypeEnum = z.infer<typeof zWaybillTypeEnum>;
export type OrderStatusEnum = z.infer<typeof zOrderStatusEnum>;
export type ShippingMethodEnum = z.infer<typeof zShippingMethodEnum>;


// Display Labels
export const USER_ROLE_LABELS: Record<RoleEnum, string> = {
    ADMIN: "Администратор",
    EMPLOYEE: "Сотрудник",
    USER: "Пользователь"
}

export const USER_TYPE_LABELS: Record<UserTypeEnum, string> = {
    USER_RETAIL: "Розница",
    USER_WHOLESALE: "Опт",
    USER_SUPER_WHOLESALE: "Супер-Опт"
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

export const SHIPPING_METHOD_LABELS: Record<ShippingMethodEnum, string> = {
    SELF_PICKUP: "Самовывоз",
    CARGO: "Курьерская доставка",
    OTHER: "Другое"
}
