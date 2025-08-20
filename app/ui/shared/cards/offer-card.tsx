"use client";

import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { EditOfferModal } from "@/app/ui/catalogue/offer/edit-dialog";
import { AddToCartButtonWithQuantity } from "@/app/ui/cart/cart-button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/app/lib/utils";
import { useTranslations } from "next-intl";

export function OfferCard({ offer }: { offer: OfferSchema }) {
  const t = useTranslations("OfferCard");
  const inStock = offer.quantity > 0;
  return (
    <Card className="relative flex h-[175px] w-[800px] overflow-hidden rounded-xl border">
      <div className="relative w-[175px] h-full flex-shrink-0">
        <Image
          src={offer.product.image_url}
          alt={offer.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4 w-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              {offer.brand} — {offer.manufacturer_number}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {offer.internal_description ?? t("missing_description")}
            </p>
          </div>
          <Badge variant={inStock ? "default" : "destructive"}>
            {inStock ? t("in_stock") : t("out_of_stock")}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm font-medium mt-3">
          <div>Кол-во: {offer.quantity} шт</div>
          <div>
            Супер-опт: {formatCurrency(offer.super_wholesale_price_rub)}
          </div>
          <div>Опт: {formatCurrency(offer.wholesale_price_rub)}</div>
          <div className="text-right">
            Розница: {formatCurrency(offer.price_rub)}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-1">ID: {offer.id}</div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <EditOfferModal offer={offer} />
        <AddToCartButtonWithQuantity offer={offer} />
      </div>
    </Card>
  );
}
