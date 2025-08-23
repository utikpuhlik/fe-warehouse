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
import { createCategoryAction } from "@/app/lib/actions/categoryAction";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { showToastError } from "@/app/lib/errors/toastError";
import { useForm } from "react-hook-form";
import {
  type CategoryPostSchema,
  zCategoryPostSchema,
} from "@/app/lib/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateButton } from "@/app/ui/shared/buttons/create-entity-button";

export function CreateCategoryModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("CategoryDialog");
  const toastT = useTranslations("Toast");

  const form = useForm<CategoryPostSchema>({
    resolver: zodResolver(zCategoryPostSchema),
    defaultValues: {
      name: "",
    },
  });

  const resetForm = () => {
    form.reset();
    setOpen(false);
    setFile(null);
  };
  const onSubmit = (data: CategoryPostSchema) => {
    if (!file) {
      return;
    }
    startTransition(async () => {
      try {
        await createCategoryAction(data, file);
        toast({
          title: toastT("category_created"),
          description: `${toastT("category_created")} "${data.name}".`,
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
          <DialogTitle>{t("new")}</DialogTitle>
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
            <Label htmlFor="picture">{t("image")}</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
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
