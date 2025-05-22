"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    zCategoryPutSchema,
    type CategoryPutSchema,
} from "@/app/lib/schemas/categorySchema";
import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/utils/toastError";
import { updateCategoryAction } from "@/app/lib/actions/categoryAction";

type Props = {
    category_id: string;
    category: { name: string };
};

export function EditCategoryModal({ category_id, category }: Props) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<CategoryPutSchema>({
        resolver: zodResolver(zCategoryPutSchema),
        defaultValues: category,
    });

    const resetForm = () => {
        form.reset();
        setFile(null);
        setOpen(false);
    };

    const onSubmit = (category: CategoryPutSchema) => {
        const formData = new FormData();
        formData.append("category", JSON.stringify(category));

        if (file) {
            formData.append("image_blob", file);
        }
        startTransition(async () => {
            try {
                await updateCategoryAction(category_id, formData);
                toast({
                    title: "Успешно",
                    description: `Категория "${category.name}" обновлена.`,
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
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать категорию</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...form.register("name")} />
                    </div>

                    <div>
                        <Label htmlFor="picture">Картинка</Label>
                        <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required={false}
                        />
                    </div>

                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Сохраняем..." : "Сохранить"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
