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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import {
  WaybillWithOffersPostSchema,
  zWaybillWithOffersPostSchema,
} from "@/app/lib/schemas/waybillSchema";
import { createWaybillAction } from "@/app/lib/actions/waybillAction";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";
import { SelectUserField } from "@/app/ui/users/select-user-field";

export function CreateWaybillModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<WaybillWithOffersPostSchema>({
    resolver: zodResolver(zWaybillWithOffersPostSchema),
    defaultValues: {
      customer_id: null,
      is_pending: true,
      waybill_type: "WAYBILL_IN",
      note: null,
      waybill_offers: [],
    },
  });

  const onSubmit = (values: WaybillWithOffersPostSchema) => {
    startTransition(async () => {
      try {
        await createWaybillAction(values);
        toast({
          title: "Накладная создана",
          // description: `Клиент: ${values.author_id}`,
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
        <CreateButton />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание накладной</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Тип</Label>
              <Select
                onValueChange={(value: "WAYBILL_IN" | "WAYBILL_RETURN") =>
                  form.setValue("waybill_type", value)
                }
                defaultValue={form.getValues("waybill_type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAYBILL_IN">Приход</SelectItem>
                  <SelectItem value="WAYBILL_RETURN">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SelectUserField />

            <DialogFooter>
              <CreateButton
                type="submit"
                disabled={isPending}
                loading={isPending}
              />
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
