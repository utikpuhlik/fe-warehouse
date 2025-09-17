"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { updateWaybillOfferAction } from "@/app/lib/actions/waybillAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema";
import { CancelButton } from "@/app/ui/shared/buttons/cancel-button";
import { CheckButton } from "@/app/ui/shared/buttons/check-button";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Props = {
  waybillOffer: WaybillOfferSchema;
  is_disabled: boolean;
};

export function WaybillOfferQuantityEditor({ waybillOffer, is_disabled }: Props) {
  const t = useTranslations("QuantityEditor");
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(waybillOffer.quantity);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateWaybillOfferAction(waybillOffer.id, waybillOffer.waybill_id, {
          ...waybillOffer,
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
    return waybillOffer.quantity;
  }

  return editing ? (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        className="h-9 w-12"
      />
      <CheckButton variant="ghost" onClick={handleSave} disabled={isPending} loading={isPending} full={false} />
      <CancelButton variant="ghost" size="icon" onClick={() => setEditing(false)} disabled={isPending} full={false} />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      {waybillOffer.quantity}
      <EditButton onClick={() => setEditing(true)} variant="ghost" size="icon" />
    </div>
  );
}
