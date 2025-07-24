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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {FormProvider, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import {
  zWaybillPostSchema,
  type WaybillPostSchema,
} from "@/app/lib/schemas/waybillSchema";
import { createWaybillAction } from "@/app/lib/actions/waybillAction";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";
import {SelectUserField} from "@/app/ui/users/select-user-field";

export function CreateWaybillModal({ author_id }: { author_id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<WaybillPostSchema>({
    resolver: zodResolver(zWaybillPostSchema),
    defaultValues: {
      author_id: author_id,
      customer_id: null,
      counterparty_name: "",
      is_pending: true,
      waybill_type: "WAYBILL_IN",
      note: null,
    },
  });

  const onSubmit = (values: WaybillPostSchema) => {
    startTransition(async () => {
      try {
        await createWaybillAction(values);
        toast({
          title: "Накладная создана",
          description: `Контрагент: ${values.counterparty_name}`,
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
                  onValueChange={(
                      value: "WAYBILL_IN" | "WAYBILL_OUT" | "WAYBILL_RETURN"
                  ) => form.setValue("waybill_type", value)}
                  defaultValue={form.getValues("waybill_type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAYBILL_IN">Приход</SelectItem>
                  <SelectItem value="WAYBILL_OUT">Расход</SelectItem>
                  <SelectItem value="WAYBILL_RETURN">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SelectUserField />

            <div>
              <Label>Контрагент</Label>
              <Input
                  {...form.register("counterparty_name")}
                  placeholder="ООО Поставщик"
              />
              {form.formState.errors.counterparty_name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.counterparty_name.message}
                  </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Создаем..." : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
