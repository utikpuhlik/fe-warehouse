"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { deleteSubCategoryAction, updateSubCategoryAction } from "@/app/lib/actions/subCategoryAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { zSubCategorySchema, type SubCategory } from "@/app/lib/schemas/subCategorySchema";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function EditSubCategoryModal(sub_category: SubCategory) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("SubCategoryDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<SubCategory>({
    resolver: zodResolver(zSubCategorySchema),
    defaultValues: sub_category,
  });

  const resetForm = () => {
    form.reset();
    setFile(null);
    setOpen(false);
  };

  const onSubmit = (sub_category: SubCategory) => {
    startTransition(async () => {
      try {
        await updateSubCategoryAction(sub_category.id, sub_category, sub_category.category.slug, file ?? undefined);
        toast({
          title: toastT("success"),
          description: `${toastT("sub_category_updated")} "${sub_category.name}".`,
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
            <Label htmlFor="picture">Картинка</Label>
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
              entityName={sub_category.name}
              entityId={sub_category.id}
              deleteAction={id => deleteSubCategoryAction(id, sub_category.category.slug)}
              onDeleted={resetForm}
            />
            <SaveButton variant="default" type="submit" disabled={isPending} loading={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
