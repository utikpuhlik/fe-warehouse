"use client"

import { useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
    zOrderStatusEnum,
    type OrderStatusEnum,
} from "@/app/lib/schemas/commonSchema"

import type { OrderSchema } from "@/app/lib/schemas/orderSchema"
import { updateOrderAction } from "@/app/lib/actions/orderAction"
import {OrderBadge} from "@/app/ui/orders/order-badge";

interface OrderStatusSelectProps {
    order: OrderSchema
}

export function OrderStatusSelect({ order }: OrderStatusSelectProps) {
    const [selected, setSelected] = useState<OrderStatusEnum>(order.status)
    const [isPending, startTransition] = useTransition()

    const handleChange = (value: string) => {
        const casted = value as OrderStatusEnum
        setSelected(casted)

        startTransition(async () => {
            try {
                await updateOrderAction(order.id, { ...order, status: casted })
                toast({
                    title: "Успешно",
                    description: `Заказ ${order.id} обновлён`,
                })
            } catch (error) {
                console.error("Error updating order status:", error)
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить статус заказа",
                    variant: "destructive",
                })
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isPending}>
                    <OrderBadge orderStatus={selected} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {zOrderStatusEnum.options.map((status: OrderStatusEnum) => (
                        <DropdownMenuItem
                            key={status}
                            onSelect={() => handleChange(status)}
                            className="flex items-center gap-2"
                        >
                            <OrderBadge orderStatus={status} />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
