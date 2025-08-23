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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import type { SubCategory } from "@/app/lib/schemas/subCategorySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ProductPostSchema,
  zProductPostSchema,
} from "@/app/lib/schemas/productSchema";
import { createProductAction } from "@/app/lib/actions/productAction";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";
import { useTranslations } from "next-intl";

export function CreateProductModal(sub_category: SubCategory) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("ProductDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<ProductPostSchema>({
    resolver: zodResolver(zProductPostSchema),
    defaultValues: {
      name: "",
      cross_number: "",
      sub_category_id: sub_category.id,
    },
  });

  const resetForm = () => {
    form.reset();
    setFile(null);
    setOpen(false);
  };

  const onSubmit = (data: ProductPostSchema) => {
    if (!file) {
      return;
    }
    startTransition(async () => {
      try {
        await createProductAction(
          data,
          file,
          sub_category.category.slug,
          sub_category.slug,
        );
        toast({
          title: toastT("success"),
          description: `${t("product_created")} "${data.name}".`,
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
          <DialogTitle>{`${t("new")} "${sub_category.name}"`}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="cross_number">{t("cross_number")}</Label>
            <Input id="cross_number" {...form.register("cross_number")} />
          </div>
          <div>
            <Label htmlFor="picture">{t("image")}</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }}
            />
          </div>

          <DialogFooter>
            <CreateButton
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
