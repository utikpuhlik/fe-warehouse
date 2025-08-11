"use client"

import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { OrderOfferSchema } from "@/app/lib/schemas/orderOfferSchema"
import { updateOrderOfferAction } from "@/app/lib/actions/orderAction"
import { showToastError } from "@/app/lib/errors/toastError"
import { useToast } from "@/hooks/use-toast"
import {CheckButton} from "@/app/ui/shared/buttons/check-button";
import {CancelButton} from "@/app/ui/shared/buttons/cancel-button";
import {EditButton} from "@/app/ui/shared/buttons/edit-button";

type Props = {
    orderOffer: OrderOfferSchema
}

export function OrderOfferQuantityEditor({ orderOffer }: Props) {
    const [editing, setEditing] = useState(false)
    const [quantity, setQuantity] = useState(orderOffer.quantity)
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const handleSave = () => {
        startTransition(async () => {
            try {
                await updateOrderOfferAction(
                    orderOffer.id,
                    orderOffer.order_id,
                    {
                        ...orderOffer,
                        quantity: quantity,
                    }
                )
                toast({
                    title: "Обновлено",
                    description: `Количество обновлено до ${quantity}`,
                })
                setEditing(false)
            } catch (err) {
                showToastError(err)
            }
        })
    }

    return editing ? (
        <div className="flex items-center gap-1">
            <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 h-9"
            />
            <CheckButton variant="ghost" onClick={handleSave} disabled={isPending} loading={isPending} full={false}/>
            <CancelButton variant="ghost" size="icon" onClick={() => setEditing(false)} disabled={isPending} full={false}/>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            {orderOffer.quantity}
            <EditButton
                onClick={() => setEditing(true)}
                variant="ghost"
                size="icon"
            />
        </div>
    )
}
