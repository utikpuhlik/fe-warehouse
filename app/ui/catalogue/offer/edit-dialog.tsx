"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { DeleteEntityButton } from "@/app/ui/catalogue/buttons/delete-entity-button";
import { type OfferSchema, zOfferSchema } from "@/app/lib/schemas/offerSchema";
import {
  deleteOfferAction,
  updateOfferAction,
} from "@/app/lib/actions/offerAction";

export function EditOfferModal(offer: OfferSchema) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

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
          title: "Успешно",
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
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать предложение</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="brand">Бренд</Label>
            <Input id="brand" {...form.register("brand")} />
            {form.formState.errors.brand && (
              <p className="text-sm text-red-500">
                {form.formState.errors.brand.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="manufacturer_number">Номер производителя</Label>
            <Input
              id="manufacturer_number"
              {...form.register("manufacturer_number")}
            />
          </div>
          <div>
            <Label htmlFor="internal_description">Описание</Label>
            <Input
              id="internal_description"
              {...form.register("internal_description")}
            />
          </div>
          <div>
            <Label htmlFor="price_rub">Цена розница</Label>
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
            <Label htmlFor="super_wholesale_price_rub">Супер-опт</Label>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Сохраняем.." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
