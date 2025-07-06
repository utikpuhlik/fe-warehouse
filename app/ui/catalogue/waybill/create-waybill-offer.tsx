"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { createWaybillOfferAction } from "@/app/lib/actions/waybillAction";
import {
  type WaybillOfferPostSchema,
  zWaybillOfferPostSchema,
} from "@/app/lib/schemas/waybillOfferSchema";
import { SelectOfferField } from "@/app/ui/catalogue/waybill/select-offer-field";

export function CreateWaybillOfferModal({
  waybill_id,
  disabled,
}: {
  waybill_id: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<WaybillOfferPostSchema>({
    resolver: zodResolver(zWaybillOfferPostSchema),
    defaultValues: {
      offer_id: "",
      brand: "",
      manufacturer_number: "",
      quantity: 0,
      price_rub: 0,
    },
  });

  const onSubmit = (values: WaybillOfferPostSchema) => {
    startTransition(async () => {
      try {
        await createWaybillOfferAction(values, waybill_id);
        toast({
          title: "Позиция добавлена",
          description: `Позиция: ${values.brand}`,
        });
        setOpen(false);
        form.reset();
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Добавить позицию</Button>
      </DialogTrigger>

      {/*<DialogContent className="min-w-full">*/}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление позиции</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectOfferField />
            <input type="hidden" {...form.register("offer_id")} />
            <input type="hidden" {...form.register("brand")} />
            <input type="hidden" {...form.register("manufacturer_number")} />
            <div>
              <Label htmlFor="price_rub">Цена</Label>
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
              <Label htmlFor="quantity">Количество</Label>
              <Input
                id="quantity"
                type="number"
                step="1"
                {...form.register("quantity", { valueAsNumber: true })}
              />
              {form.formState.errors.quantity && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Добавляем.." : "Добавить"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
