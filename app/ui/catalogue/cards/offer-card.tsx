"use client"

import type {OfferSchema} from "@/app/lib/schemas/offerSchema";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import { EditOfferModal } from "@/app/ui/catalogue/offer/edit-dialog";

export function OfferCard(offer: OfferSchema) {
    return (
      <Card className="group relative flex h-[150px] w-[700px] overflow-hidden rounded-xl border">
            <div className="relative w-[150px] h-full flex-shrink-0">
                <Image
                    src={offer.image_url ?? "https://storage.yandexcloud.net/tcf-images/default.svg"}
                    alt={offer.internal_description ?? offer.manufacturer_number}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col justify-between p-4 w-full">
                <div>
                    <h3 className="text-lg font-semibold">
                        {offer.brand} — {offer.manufacturer_number}
                    </h3>          
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {offer.internal_description ?? "No description"}
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mt-2">
                    <div>Qty: {offer.quantity}</div>
                    <div>Wholesale: {offer.super_wholesale_price_rub} ₽</div>
                    <div className="text-right">Retail: {offer.price_rub} ₽</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">ID: {offer.id}</div>
            </div>
            <EditOfferModal {...offer}/>
        </Card>
    )
}