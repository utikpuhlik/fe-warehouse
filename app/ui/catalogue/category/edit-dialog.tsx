"use client";

import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type Category,
    zCategory,
} from "@/app/lib/schemas/categorySchema";
import {useState, useTransition} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { updateCategoryAction } from "@/app/lib/actions/categoryAction";
import {SaveButton} from "@/app/ui/shared/buttons/save-button";
import {EditButton} from "@/app/ui/shared/buttons/edit-button";

// type EditCategoryModalProps = {
//     category: Category
// }

export function EditCategoryModal(category: Category) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();

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
                <EditButton variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"/>
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
                    <DialogFooter className="flex items-center justify-between">
                        <SaveButton variant="default" type="submit" disabled={isPending} loading={isPending}/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
