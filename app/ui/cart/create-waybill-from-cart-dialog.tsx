"use client"

import {useState, useTransition} from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select"
import {Label} from "@/components/ui/label"
import {FormProvider, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useToast} from "@/hooks/use-toast"
import {showToastError} from "@/app/lib/errors/toastError"
import {createWaybillAction} from "@/app/lib/actions/waybillAction"
import {
    zWaybillWithOffersPostSchema,
    type WaybillWithOffersPostSchema,
} from "@/app/lib/schemas/waybillSchema"
import type {OfferSchema} from "@/app/lib/schemas/offerSchema"
import {SelectUserField} from "@/app/ui/users/select-user-field"
import {useCartStore} from "@/app/shared/api/cartStoreProvider"
import {WaybillOfferPostSchema} from "@/app/lib/schemas/waybillOfferSchema";

export function CreateWaybillFromCartDialog(
    {
        author_id,
        items,
    }: {
        author_id: string
        items: OfferSchema[]
    }) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const {toast} = useToast()
    const clearCart = useCartStore((state) => state.clear)

    const defaultOffers: WaybillOfferPostSchema[] = items.map((item: OfferSchema) => ({
        offer_id: item.id,
        brand: item.brand,
        manufacturer_number: item.manufacturer_number,
        quantity: item.quantity,
        price_rub: item.price_rub, // ! TODO: price would be reset on server side
    }))

    const form = useForm<WaybillWithOffersPostSchema>({
        resolver: zodResolver(zWaybillWithOffersPostSchema),
        defaultValues: {
            author_id,
            customer_id: null,
            waybill_type: "WAYBILL_OUT",
            is_pending: true,
            note: null,
            waybill_offers: defaultOffers,
        },
    })

    const onSubmit = (values: WaybillWithOffersPostSchema) => {
        startTransition(async () => {
            try {
                await createWaybillAction(values)
                toast({
                    title: "Накладная создана",
                    description: `${values.waybill_offers!.length} позиций`,
                })
                clearCart()
                setOpen(false)
            } catch (error) {
                showToastError(error)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={items.length === 0}>Создать накладную</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Создание накладной</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className="space-y-4"
                    >
                        <div>
                            <Label>Тип</Label>
                            <Select
                                onValueChange={(
                                    value: "WAYBILL_IN" | "WAYBILL_OUT" | "WAYBILL_RETURN"
                                ) => form.setValue("waybill_type", value)}
                                defaultValue={form.getValues("waybill_type")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="WAYBILL_IN">Приход</SelectItem>
                                    <SelectItem value="WAYBILL_OUT">Расход</SelectItem>
                                    <SelectItem value="WAYBILL_RETURN">Возврат</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <SelectUserField/>

                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Создаем..." : "Создать"}
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}
