"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { QuantityFormSchema, zQuantityFormSchema } from "@/app/lib/schemas/commonSchema";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { useCartStore } from "@/app/shared/api/cartStoreProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function AddToCartButtonWithQuantity({ offer }: { offer: OfferSchema }) {
  const add = useCartStore(state => state.add);
  const { toast } = useToast();
  const t = useTranslations("Cart");
  const toastT = useTranslations("Toast");

  const form = useForm<QuantityFormSchema>({
    resolver: zodResolver(zQuantityFormSchema),
    defaultValues: { quantity: 1 },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = ({ quantity }: QuantityFormSchema) => {
    for (let i = 0; i < quantity; i++) {
      add(offer);
    }

    toast({
      title: toastT("added_to_cart"),
      description: `${offer.product.name} — ${offer.brand} (${quantity} шт)`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-1">
      <Input
        type="number"
        min={1}
        step={1}
        {...register("quantity", { valueAsNumber: true })}
        className="h-9 w-12 text-sm"
      />
      {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
      <Button type="submit" size="default" variant="outline">
        <ShoppingCart className="h-3 w-3" /> {t("add_to_cart")}
      </Button>
    </form>
  );
}
