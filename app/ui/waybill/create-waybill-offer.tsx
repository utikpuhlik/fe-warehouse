"use client";

import {useState, useTransition} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import {createWaybillOfferAction, updateWaybillAction} from "@/app/lib/actions/waybillAction";
import {
  type WaybillOfferPostSchema,
  zWaybillOfferPostSchema,
} from "@/app/lib/schemas/waybillOfferSchema";
import { SelectOfferField } from "@/app/ui/waybill/select-offer-field";
import { CirclePlus, Package } from "lucide-react";
import { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import {SaveButton} from "@/app/ui/shared/buttons/save-button";

export function CreateWaybillOfferForm({
  waybill,
}: {
  waybill: WaybillSchema;
}) {
  const [isSubmittingOffer, startOfferTransition] = useTransition();
  const [isSavingNote, startNoteTransition] = useTransition();
  const [note, setNote] = useState(waybill.note ?? "");
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

  const handleNoteUpdate = () => {
    startNoteTransition(async () => {
      try {
        await updateWaybillAction(waybill.id, {
          ...waybill,
          note,
        });
        toast({ title: "Заметка обновлена" });
      } catch (error) {
        showToastError(error);
      }
    });
  };

  const onSubmit = (values: WaybillOfferPostSchema) => {
    startOfferTransition(async () => {
      try {
        await createWaybillOfferAction(values, waybill.id);
        toast({
          title: "Позиция добавлена",
          description: `Позиция: ${values.brand}`,
        });
        form.reset();
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-md border p-4"
      >
        {/*<h2 className="text-lg font-semibold">Добавить позицию</h2>*/}
        <div className="flex justify-between">
          <div>
          <SelectOfferField />
        <input type="hidden" {...form.register("offer_id")} />
        <input type="hidden" {...form.register("brand")} />
        <input type="hidden" {...form.register("manufacturer_number")} />

        <div className="flex items-end gap-4 mt-2">
          <div className="w-full max-w-[150px]">
            <Label htmlFor="price_rub">Цена</Label>
            <Input
              id="price_rub"
              type="number"
              step="1"
              {...form.register("price_rub", { valueAsNumber: true })}
              disabled={waybill.waybill_type === "WAYBILL_IN"}
            />
            {form.formState.errors.price_rub && (
              <p className="text-sm text-red-500">
                {form.formState.errors.price_rub.message}
              </p>
            )}
          </div>

          <div className="w-full max-w-[150px]">
            <div className="flex items-center gap-1 mb-1">
              <Label htmlFor="quantity">Кол-во</Label>
              <Package size={15} />
            </div>

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

          <Button type="submit" disabled={isSubmittingOffer}>
            <CirclePlus />
            {isSubmittingOffer ? "Добавляем.." : "Добавить"}
          </Button>
        </div>
        </div>
          <div className="w-[300px] space-y-2">
            <Label htmlFor="note">Заметка</Label>
            <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Введите заметку..."
                className="max-h-[100px]"
            />
            <SaveButton
                onClick={handleNoteUpdate}
                disabled={isSavingNote}
                loading={isSavingNote}
                className={"w-full"}>
            </SaveButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
