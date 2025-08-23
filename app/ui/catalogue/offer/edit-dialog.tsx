"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import { type OfferSchema, zOfferSchema } from "@/app/lib/schemas/offerSchema";
import {
  deleteOfferAction,
  updateOfferAction,
} from "@/app/lib/actions/offerAction";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { useTranslations } from "next-intl";

export function EditOfferModal({ offer }: { offer: OfferSchema }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("OfferDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<OfferSchema>({
    resolver: zodResolver(zOfferSchema),
    defaultValues: offer,
  });

  const resetForm = () => {
    form.reset();
    setOpen(false);
  };

  const onSubmit = (offer: OfferSchema) => {
    startTransition(async () => {
      try {
        await updateOfferAction(
          offer.id,
          offer,
          offer.product.sub_category.category.slug,
          offer.product.sub_category.slug,
          offer.product_id,
        );
        toast({
          title: toastT("success"),
          description: `Предложение "${offer.brand}" обновлено.`,
        });
        resetForm();
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton variant="outline" size="icon" className="shadow-sm" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="brand">{t("manufacturer")}</Label>
            <Input id="brand" {...form.register("brand")} />
            {form.formState.errors.brand && (
              <p className="text-sm text-red-500">
                {form.formState.errors.brand.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="manufacturer_number">
              {t("manufacturer_number")}
            </Label>
            <Input
              id="manufacturer_number"
              {...form.register("manufacturer_number")}
            />
          </div>
          <div>
            <Label htmlFor="internal_description">{t("description")}</Label>
            <Input
              id="internal_description"
              {...form.register("internal_description")}
            />
          </div>
          <div>
            <Label htmlFor="price_rub">{t("price_retail")}</Label>
            <Input
              id="price_rub"
              type="number"
              step="1"
              {...form.register("price_rub", { valueAsNumber: true })}
            />
            {form.formState.errors.price_rub && (
              <p className="text-sm text-red-500">
                {form.formState.errors.price_rub.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="super_wholesale_price_rub">
              {t("price_super_wholesale")}
            </Label>
            <Input
              id="super_wholesale_price_rub"
              type="number"
              step="1"
              {...form.register("super_wholesale_price_rub", {
                valueAsNumber: true,
              })}
            />
            {form.formState.errors.super_wholesale_price_rub && (
              <p className="text-sm text-red-500">
                {form.formState.errors.super_wholesale_price_rub.message}
              </p>
            )}
          </div>
          <DialogFooter className="flex items-center justify-between">
            <DeleteEntityButton
              entityName={offer.brand}
              entityId={offer.id}
              deleteAction={(id) =>
                deleteOfferAction(
                  id,
                  offer.product.sub_category.category.slug,
                  offer.product.sub_category.slug,
                  offer.product_id,
                )
              }
              onDeleted={resetForm}
            />
            <SaveButton
              variant="default"
              type="submit"
              disabled={isPending}
              loading={isPending}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
