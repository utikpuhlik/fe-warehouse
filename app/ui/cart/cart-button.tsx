"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/app/shared/api/cartStoreProvider"
import type { OfferSchema } from "@/app/lib/schemas/offerSchema"
import { ShoppingCart } from "lucide-react"
import {useForm} from "react-hook-form";
import {QuantityFormSchema, zQuantityFormSchema} from "@/app/lib/schemas/commonSchema";
import {zodResolver} from "@hookform/resolvers/zod";

export function AddToCartButtonWithQuantity({ offer }: { offer: OfferSchema }) {
    const add = useCartStore((state) => state.add)
    const { toast } = useToast()

    const form = useForm<QuantityFormSchema>({
        resolver: zodResolver(zQuantityFormSchema),
        defaultValues: { quantity: 1 },
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    const onSubmit = ({ quantity }: QuantityFormSchema) => {
        for (let i = 0; i < quantity; i++) {
            add(offer)
        }

        toast({
            title: "Добавлено в корзину",
            description: `${offer.product.name} — ${offer.brand} (${quantity} шт)`,
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-1"
        >
            <Input
                type="number"
                min={1}
                step={1}
                {...register("quantity", { valueAsNumber: true })}
                className="h-9 w-12 text-sm"
            />
            {errors.quantity && (
                <p className="text-xs text-red-500">{errors.quantity.message}</p>
            )}
            <Button type="submit" size="default" variant="outline">
               <ShoppingCart className="w-3 h-3" /> Добавить в корзину
            </Button>
        </form>
    )
}
