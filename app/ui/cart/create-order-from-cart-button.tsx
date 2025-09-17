"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTransition } from "react";

import { createOrderAction } from "@/app/lib/actions/orderAction";
import { showToastError } from "@/app/lib/errors/toastError";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { OrderOfferPostSchema } from "@/app/lib/schemas/orderOfferSchema";
import { zOrderWithOffersPostSchema, type OrderWithOffersPostSchema } from "@/app/lib/schemas/orderSchema";
import { useCartStore } from "@/app/shared/api/cartStoreProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CreateOrderFromCartButton({ address_id, items }: { address_id: string; items: OfferSchema[] }) {
  const t = useTranslations("CreateOrderFromCartButton");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const clearCart = useCartStore(state => state.clear);

  const defaultOffers: OrderOfferPostSchema[] = items.map(item => ({
    offer_id: item.id,
    brand: item.brand,
    manufacturer_number: item.manufacturer_number,
    quantity: item.quantity,
    price_rub: item.price_rub,
  }));

  const handleCreate = () => {
    const payload: OrderWithOffersPostSchema = {
      address_id,
      status: "NEW",
      note: null,
      order_offers: defaultOffers,
    };

    const payload_validated = zOrderWithOffersPostSchema.parse(payload);

    startTransition(async () => {
      try {
        await createOrderAction(payload_validated);
        toast({
          title: t("order_created_title"),
          description: (
            <Link href="/orders">
              {payload_validated.order_offers!.length} {t("order_created_description")}
            </Link>
          ),
        });
        clearCart();
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <Button className="w-full" disabled={items.length === 0 || isPending} onClick={handleCreate}>
      {t("create_order")}
    </Button>
  );
}
