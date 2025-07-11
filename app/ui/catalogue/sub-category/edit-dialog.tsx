"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {type SubCategory, zSubCategorySchema
} from "@/app/lib/schemas/subCategorySchema";
import {useState, useTransition} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import {deleteSubCategoryAction, updateSubCategoryAction} from "@/app/lib/actions/subCategoryAction";
import { DeleteEntityButton } from "@/app/ui/catalogue/buttons/delete-entity-button";


export function EditSubCategoryModal(sub_category: SubCategory) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();

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
                    title: "Успешно",
                    description: `Категория "${sub_category.name}" обновлена.`,
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
                    <DialogTitle>Редактировать подкатегорию</DialogTitle>
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
                    <DeleteEntityButton
                        entityName={sub_category.name}
                        entityId={sub_category.id}
                        deleteAction={(id) => deleteSubCategoryAction(id, sub_category.category.slug)}
                        onDeleted={resetForm}
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Сохраняем.." : "Сохранить"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
