"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createWaybillOfferAction, updateWaybillAction } from "@/app/lib/actions/waybillAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { zWaybillOfferPostSchema, type WaybillOfferPostSchema } from "@/app/lib/schemas/waybillOfferSchema";
import { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import { AddButton } from "@/app/ui/shared/buttons/add-button";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { SelectOfferField } from "@/app/ui/shared/select-offer-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function CreateWaybillOfferForm({ waybill }: { waybill: WaybillSchema }) {
  const t = useTranslations("CreateWaybillOffer");
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
        toast({ title: t("note_update_success") });
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
          title: t("offer_add_success"),
          description: `${t("item")} ${values.brand}`,
        });
        form.reset();
      } catch (error) {
        showToastError(error);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-md border p-4">
        <div className="flex justify-between">
          <div>
            <SelectOfferField />
            <input type="hidden" {...form.register("offer_id")} />
            <input type="hidden" {...form.register("brand")} />
            <input type="hidden" {...form.register("manufacturer_number")} />

            <div className="mt-2 flex items-end gap-4">
              <div className="w-full max-w-[150px]">
                <Label htmlFor="price_rub">{t("price")}</Label>
                <Input
                  id="price_rub"
                  type="number"
                  {...form.register("price_rub", { valueAsNumber: true })}
                  disabled={true}
                />
                {form.formState.errors.price_rub && (
                  <p className="text-sm text-red-500">{form.formState.errors.price_rub.message}</p>
                )}
              </div>

              <div className="w-full max-w-[150px]">
                <div className="mb-1 flex items-center gap-1">
                  <Label htmlFor="quantity">{t("quantity")}</Label>
                  <Package size={15} />
                </div>

                <Input id="quantity" type="number" step="1" {...form.register("quantity", { valueAsNumber: true })} />
                {form.formState.errors.quantity && (
                  <p className="text-sm text-red-500">{form.formState.errors.quantity.message}</p>
                )}
              </div>
              <AddButton type="submit" disabled={isSubmittingOffer} loading={isSubmittingOffer} />
            </div>
          </div>
          <div className="w-[300px] space-y-2">
            <Label htmlFor="note">{t("note")}</Label>
            <Textarea
              id="note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder={t("note_placeholder")}
              className="max-h-[100px]"
            />
            <SaveButton
              onClick={handleNoteUpdate}
              disabled={isSavingNote}
              loading={isSavingNote}
              text={t("save_note")}
              className={"w-full"}
            ></SaveButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
