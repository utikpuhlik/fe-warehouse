"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { OrderOfferSchema } from "@/app/lib/schemas/orderOfferSchema";
import { updateOrderOfferAction } from "@/app/lib/actions/orderAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { useToast } from "@/hooks/use-toast";
import { CheckButton } from "@/app/ui/shared/buttons/check-button";
import { CancelButton } from "@/app/ui/shared/buttons/cancel-button";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { useTranslations } from "next-intl";

type Props = {
  orderOffer: OrderOfferSchema;
  is_disabled?: boolean;
};

export function OrderOfferQuantityEditor({
  orderOffer,
  is_disabled = false,
}: Props) {
  const t = useTranslations("QuantityEditor");
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(orderOffer.quantity);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateOrderOfferAction(orderOffer.id, orderOffer.order_id, {
          ...orderOffer,
          quantity: quantity,
        });
        toast({
          title: t("updated_title"),
          description: `${t("quantity_updated_to_description")} ${quantity}`,
        });
        setEditing(false);
      } catch (err) {
        showToastError(err);
      }
    });
  };
  if (is_disabled) {
    return orderOffer.quantity;
  }

  return editing ? (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-12 h-9"
      />
      <CheckButton
        variant="ghost"
        onClick={handleSave}
        disabled={isPending}
        loading={isPending}
        full={false}
      />
      <CancelButton
        variant="ghost"
        size="icon"
        onClick={() => setEditing(false)}
        disabled={isPending}
        full={false}
      />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      {orderOffer.quantity}
      <EditButton
        onClick={() => setEditing(true)}
        variant="ghost"
        size="icon"
      />
    </div>
  );
}
