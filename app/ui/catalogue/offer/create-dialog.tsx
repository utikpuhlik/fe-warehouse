"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { createOfferAction } from "@/app/lib/actions/offerAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { zOfferPostSchema, type OfferPostSchema } from "@/app/lib/schemas/offerSchema";
import type { Product } from "@/app/lib/schemas/productSchema";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function CreateOfferModal(product: Product) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("OfferDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<OfferPostSchema>({
    resolver: zodResolver(zOfferPostSchema),
    defaultValues: {
      address_id: "",
      brand: "",
      manufacturer_number: "",
      internal_description: "",
      price_rub: 0,
      super_wholesale_price_rub: 0,
      product_id: product.id,
    },
  });

  const resetForm = () => {
    form.reset();
    setOpen(false);
  };

  const onSubmit = (data: OfferPostSchema) => {
    startTransition(async () => {
      try {
        await createOfferAction(data, product.sub_category.category.slug, product.sub_category.slug, product.id);
        toast({
          title: toastT("success"),
          description: `Предложение "${data.brand}" для "${product.name}" добавлено.`,
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
        <CreateButton />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{`${t("new")} ${product.name}`} </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="address_id">{t("address_id")}</Label>
            <Input id="address_id" {...form.register("address_id")} />
          </div>
          <div>
            <Label htmlFor="brand">{t("manufacturer")}</Label>
            <Input id="brand" {...form.register("brand")} />
            {form.formState.errors.brand && (
              <p className="text-sm text-red-500">{form.formState.errors.brand.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="manufacturer_number">{t("manufacturer_number")}</Label>
            <Input id="manufacturer_number" {...form.register("manufacturer_number")} />
          </div>
          <div>
            <Label htmlFor="internal_description">{t("description")}</Label>
            <Input id="internal_description" {...form.register("internal_description")} />
          </div>
          <div>
            <Label htmlFor="price_rub">{t("price_retail")}</Label>
            <Input id="price_rub" type="number" step="1" {...form.register("price_rub", { valueAsNumber: true })} />
            {form.formState.errors.price_rub && (
              <p className="text-sm text-red-500">{form.formState.errors.price_rub.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="super_wholesale_price_rub">{t("price_super_wholesale")}</Label>
            <Input
              id="super_wholesale_price_rub"
              type="number"
              step="1"
              {...form.register("super_wholesale_price_rub", {
                valueAsNumber: true,
              })}
            />
            {form.formState.errors.super_wholesale_price_rub && (
              <p className="text-sm text-red-500">{form.formState.errors.super_wholesale_price_rub.message}</p>
            )}
          </div>
          <DialogFooter>
            <CreateButton type="submit" disabled={isPending} loading={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
