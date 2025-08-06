"use client"

import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema"
import { updateWaybillOfferAction } from "@/app/lib/actions/waybillAction"
import { showToastError } from "@/app/lib/errors/toastError"
import { useToast } from "@/hooks/use-toast"
import {CheckButton} from "@/app/ui/shared/buttons/check-button";
import {CancelButton} from "@/app/ui/shared/buttons/cancel-button";

type Props = {
    waybillOffer: WaybillOfferSchema
}

export function WaybillOfferQuantityEditor({ waybillOffer }: Props) {
    const [editing, setEditing] = useState(false)
    const [quantity, setQuantity] = useState(waybillOffer.quantity)
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const handleSave = () => {
        startTransition(async () => {
            try {
                await updateWaybillOfferAction(
                    waybillOffer.id,
                    waybillOffer.waybill_id,
                    {
                        ...waybillOffer,
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
            {waybillOffer.quantity}
            <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
                <Pencil className="w-4 h-4 text-muted-foreground" />
            </Button>
        </div>
    )
}
