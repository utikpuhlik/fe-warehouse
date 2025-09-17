"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createWaybillAction } from "@/app/lib/actions/waybillAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { WaybillTypeEnum } from "@/app/lib/schemas/commonSchema";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { WaybillOfferPostSchema } from "@/app/lib/schemas/waybillOfferSchema";
import { zWaybillWithOffersPostSchema, type WaybillWithOffersPostSchema } from "@/app/lib/schemas/waybillSchema";
import { useCartStore } from "@/app/shared/api/cartStoreProvider";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";
import { SelectUserField } from "@/app/ui/users/select-user-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function CreateWaybillFromCartDialog({ items }: { items: OfferSchema[] }) {
  const t = useTranslations("CreateWaybillFromCartDialog");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const clearCart = useCartStore(state => state.clear);

  const defaultOffers: WaybillOfferPostSchema[] = items.map((item: OfferSchema) => ({
    offer_id: item.id,
    brand: item.brand,
    manufacturer_number: item.manufacturer_number,
    quantity: item.quantity,
    price_rub: item.price_rub,
  }));

  const form = useForm<WaybillWithOffersPostSchema>({
    resolver: zodResolver(zWaybillWithOffersPostSchema),
    defaultValues: {
      customer_id: null,
      waybill_type: "WAYBILL_IN",
      is_pending: true,
      note: null,
      waybill_offers: defaultOffers,
    },
  });

  const onSubmit = (values: WaybillWithOffersPostSchema) => {
    startTransition(async () => {
      try {
        await createWaybillAction(values);
        toast({
          title: t("waybill_created_title"),
          description: (
            <Link href={`/waybills`}>
              {values.waybill_offers!.length} {t("waybill_created_description")}
            </Link>
          ),
        });
        clearCart();
        setOpen(false);
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={items.length === 0}>
          {t("create_waybill")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("creation_of_waybill")}</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Тип</Label>
              <Select
                onValueChange={(value: WaybillTypeEnum) => form.setValue("waybill_type", value)}
                defaultValue={form.getValues("waybill_type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("choose_waybill_type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAYBILL_IN">Приход</SelectItem>
                  <SelectItem value="WAYBILL_RETURN">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SelectUserField />

            <DialogFooter>
              <CreateButton type="submit" disabled={isPending} loading={isPending} />
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
