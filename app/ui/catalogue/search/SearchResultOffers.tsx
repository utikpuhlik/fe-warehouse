"use client";

import { use } from "react";
import type { OfferPaginatedSchema } from "@/app/lib/schemas/offerSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
    offers: Promise<OfferPaginatedSchema>;
};

export default function SearchResultOffers({ offers }: Props) {
    const { items, total, page } = use(offers);

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                Найдено: <b>{total}</b> предложений (стр. {page})
            </p>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((offer) => (
                    <Card key={offer.id}>
                        <CardHeader>
                            <CardTitle>{offer.brand}</CardTitle>
                            <p className="text-sm text-muted-foreground">{offer.manufacturer_number}</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm">{offer.internal_description}</p>
                            <Badge variant="outline">Кол-во: {offer.quantity}</Badge>
                            <div className="text-right font-medium">
                                {offer.price_rub?.toLocaleString("ru-RU", {
                                    style: "currency",
                                    currency: "RUB",
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
