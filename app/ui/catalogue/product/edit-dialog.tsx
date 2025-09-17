"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { deleteProductAction, updateProductAction } from "@/app/lib/actions/productAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { zProduct, type Product } from "@/app/lib/schemas/productSchema";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function EditProductModal(product: Product) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("ProductDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<Product>({
    resolver: zodResolver(zProduct),
    defaultValues: product,
  });

  const resetForm = () => {
    form.reset();
    setFile(null);
    setOpen(false);
  };

  const onSubmit = (product: Product) => {
    startTransition(async () => {
      try {
        await updateProductAction(
          product.id,
          product,
          product.sub_category.category.slug,
          product.sub_category.slug,
          file ?? undefined,
        );
        toast({
          title: toastT("success"),
          description: `Товар "${product.name}" обновлен.`,
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
        <EditButton
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" {...form.register("name")} />
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
              onChange={e => setFile(e.target.files?.[0] || null)}
              required={false}
            />
          </div>
          <DialogFooter className="flex items-center justify-between">
            <DeleteEntityButton
              entityName={product.name}
              entityId={product.id}
              deleteAction={id =>
                deleteProductAction(id, product.sub_category.category.slug, product.sub_category.slug)
              }
              onDeleted={resetForm}
            />
            <SaveButton variant="default" type="submit" disabled={isPending} loading={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
