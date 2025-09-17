"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { updateCategoryAction } from "@/app/lib/actions/categoryAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { zCategory, type Category } from "@/app/lib/schemas/categorySchema";
import { EditButton } from "@/app/ui/shared/buttons/edit-button";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function EditCategoryModal(category: Category) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("CategoryDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<Category>({
    resolver: zodResolver(zCategory),
    defaultValues: category,
  });

  const resetForm = () => {
    form.reset();
    setFile(null);
    setOpen(false);
  };

  const onSubmit = (category: Category) => {
    startTransition(async () => {
      try {
        await updateCategoryAction(category.id, category, file ?? undefined);
        toast({
          title: toastT("success"),
          description: `${toastT("category_updated")} "${category.name}".`,
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
            <SaveButton variant="default" type="submit" disabled={isPending} loading={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
