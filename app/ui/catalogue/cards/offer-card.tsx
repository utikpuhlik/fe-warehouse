"use client"

import type {OfferSchema} from "@/app/lib/schemas/offerSchema";
import {Card} from "@/components/ui/card";
import Image from "next/image";

export function OfferCard({
                              id,
                              internal_description,
                              brand,
                              manufacturer_number,
                              super_wholesale_price_rub,
                              price_rub,
                              quantity,
                              image_url
                          }: OfferSchema) {
    return (
        <Card className="flex h-[150px] w-[700px] overflow-hidden rounded-xl border">
            <div className="relative w-[150px] h-full flex-shrink-0">
                <Image
                    src={image_url ?? "https://storage.yandexcloud.net/tcf-images/default.svg"}
                    alt={internal_description ?? manufacturer_number}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col justify-between p-4 w-full">
                <div>
                    <h3 className="text-lg font-semibold">
                        {brand} — {manufacturer_number}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {internal_description ?? "No description"}
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mt-2">
                    <div>Qty: {quantity}</div>
                    <div>Wholesale: {super_wholesale_price_rub} ₽</div>
                    <div className="text-right">Retail: {price_rub} ₽</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">ID: {id}</div>
            </div>
        </Card>
    )
}