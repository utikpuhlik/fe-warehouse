"use client"

import type { OfferSchema } from "@/app/lib/schemas/offerSchema"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { EditOfferModal } from "@/app/ui/catalogue/offer/edit-dialog"
import { AddToCartButtonWithQuantity } from "@/app/ui/cart/cart-button"
import { Badge } from "@/components/ui/badge"

export function OfferCard({ offer }: { offer: OfferSchema }) {
    const inStock = offer.quantity > 0
    const super_wholesale_price_rub = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB"
    }).format(offer.super_wholesale_price_rub);
    const wholesale_price_rub = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB"
    }).format(offer.wholesale_price_rub);
    const price_rub = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB"
    }).format(offer.price_rub);

    return (
        <Card className="relative flex h-[175px] w-[800px] overflow-hidden rounded-xl border">
            {/* Изображение */}
            <div className="relative w-[175px] h-full flex-shrink-0">
                <Image
                    src={offer.product.image_url}
                    alt={offer.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Содержимое */}
            <div className="flex flex-col justify-between p-4 w-full">
                {/* Верхняя строка: название + наличие */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold leading-tight">
                            {offer.brand} — {offer.manufacturer_number}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {offer.internal_description ?? "Описание отсутствует"}
                        </p>
                    </div>
                    <Badge variant={inStock ? "default" : "destructive"}>
                        {inStock ? "На складе" : "Нет на складе"}
                    </Badge>
                </div>


                {/* Информация о ценах и количестве */}
                <div className="flex items-center justify-between text-sm font-medium mt-3">
                    <div>Кол-во: {offer.quantity} шт</div>
                    <div>Супер-опт: {super_wholesale_price_rub}</div>
                    <div>Опт: {wholesale_price_rub}</div>
                    <div className="text-right">Розница: {price_rub}</div>
                </div>

                {/* ID */}
                <div className="text-xs text-muted-foreground mt-1">
                    ID: {offer.id}
                </div>
            </div>

            {/* Управляющие кнопки */}
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <EditOfferModal offer={offer} />
                <AddToCartButtonWithQuantity offer={offer} />
            </div>
        </Card>
    )
}
