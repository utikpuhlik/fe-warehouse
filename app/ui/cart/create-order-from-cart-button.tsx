"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { createOrderAction } from "@/app/lib/actions/orderAction";
import {
  zOrderWithOffersPostSchema,
  type OrderWithOffersPostSchema,
} from "@/app/lib/schemas/orderSchema";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { useCartStore } from "@/app/shared/api/cartStoreProvider";
import { OrderOfferPostSchema } from "@/app/lib/schemas/orderOfferSchema";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CreateOrderFromCartButton({
  user_id,
  address_id,
  items,
}: {
  user_id: string;
  address_id: string;
  items: OfferSchema[];
}) {
  const t = useTranslations("CreateOrderFromCartButton");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const clearCart = useCartStore((state) => state.clear);

  const defaultOffers: OrderOfferPostSchema[] = items.map((item) => ({
    offer_id: item.id,
    brand: item.brand,
    manufacturer_number: item.manufacturer_number,
    quantity: item.quantity,
    price_rub: item.price_rub,
  }));

  const handleCreate = () => {
    const payload: OrderWithOffersPostSchema = {
      user_id,
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
              {payload_validated.order_offers!.length}{" "}
              {t("order_created_description")}
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
    <Button
      className="w-full"
      disabled={items.length === 0 || isPending}
      onClick={handleCreate}
    >
      {t("create_order")}
    </Button>
  );
}
