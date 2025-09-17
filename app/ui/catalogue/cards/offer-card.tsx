"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { formatCurrency } from "@/app/lib/utils/utils";
import { AddToCartButtonWithQuantity } from "@/app/ui/cart/cart-button";
import { EditOfferModal } from "@/app/ui/catalogue/offer/edit-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function OfferCard({ offer }: { offer: OfferSchema }) {
  const t = useTranslations("OfferCard");
  const inStock = offer.quantity > 0;
  return (
    <Card className="relative flex h-[175px] w-[800px] overflow-hidden rounded-xl border">
      <div className="relative h-full w-[175px] flex-shrink-0">
        <Image src={offer.product.image_url} alt={offer.product.name} fill className="object-cover" />
      </div>

      <div className="flex w-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              {offer.brand} — {offer.manufacturer_number}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {offer.internal_description ?? t("missing_description")}
            </p>
          </div>
          <Badge variant={inStock ? "default" : "destructive"}>{inStock ? t("in_stock") : t("out_of_stock")}</Badge>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm font-medium">
          <div>{`${t("quantity")}: ${offer.quantity} ${t("pcs")}`}</div>
          <div className="text-right">{`${t("retail")}: ${formatCurrency(offer.price_rub)}`}</div>
          <div>{`${t("wholesale")}: ${formatCurrency(offer.wholesale_price_rub)}`}</div>
          <div>{`${t("super_wholesale")}: ${formatCurrency(offer.super_wholesale_price_rub)}`}</div>
        </div>

        <div className="mt-1 text-xs text-muted-foreground">ID: {offer.id}</div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <EditOfferModal offer={offer} />
        <AddToCartButtonWithQuantity offer={offer} />
      </div>
    </Card>
  );
}
