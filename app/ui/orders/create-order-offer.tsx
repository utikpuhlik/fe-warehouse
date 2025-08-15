"use client";

import { useState, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import {
  createOrderOfferAction,
  updateOrderAction,
} from "@/app/lib/actions/orderAction";
import {
  type OrderOfferPostSchema,
  zOrderOfferPostSchema,
} from "@/app/lib/schemas/orderOfferSchema";
import { SelectOfferField } from "@/app/ui/shared/select-offer-field";
import { Package } from "lucide-react";
import { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { AddButton } from "@/app/ui/shared/buttons/add-button";
import { useTranslations } from "next-intl";

export function CreateOrderOfferForm({ order }: { order: OrderSchema }) {
  const t = useTranslations("CreateOrderOffer");
  const [isSubmittingOffer, startOfferTransition] = useTransition();
  const [isSavingNote, startNoteTransition] = useTransition();
  const [note, setNote] = useState(order.note ?? "");
  const { toast } = useToast();

  const form = useForm<OrderOfferPostSchema>({
    resolver: zodResolver(zOrderOfferPostSchema),
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
        await updateOrderAction(order.id, {
          ...order,
          note,
        });
        toast({ title: t("note_update_success") });
      } catch (error) {
        showToastError(error);
      }
    });
  };

  const onSubmit = (values: OrderOfferPostSchema) => {
    startOfferTransition(async () => {
      try {
        await createOrderOfferAction(values, order.id);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-md border p-4"
      >
        <div className="flex justify-between">
          <div>
            <SelectOfferField />
            <input type="hidden" {...form.register("offer_id")} />
            <input type="hidden" {...form.register("brand")} />
            <input type="hidden" {...form.register("manufacturer_number")} />

            <div className="flex items-end gap-4 mt-2">
              <div className="w-full max-w-[150px]">
                <Label htmlFor="price_rub">{t("price")}</Label>
                <Input
                  id="price_rub"
                  type="number"
                  {...form.register("price_rub", { valueAsNumber: true })}
                  disabled={true}
                />
                {form.formState.errors.price_rub && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.price_rub.message}
                  </p>
                )}
              </div>

              <div className="w-full max-w-[150px]">
                <div className="flex items-center gap-1 mb-1">
                  <Label htmlFor="quantity">{t("quantity")}</Label>
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
              <AddButton
                type="submit"
                disabled={isSubmittingOffer}
                loading={isSubmittingOffer}
              />
            </div>
          </div>
          <div className="w-[300px] space-y-2">
            <Label htmlFor="note">{t("note")}</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
