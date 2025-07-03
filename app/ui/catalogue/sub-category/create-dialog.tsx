"use client";

import {useState, useTransition} from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {createSubCategoryAction} from "@/app/lib/actions/subCategoryAction";
import {showToastError} from "@/app/lib/errors/toastError";
import type {Category} from "@/app/lib/schemas/categorySchema";
import {
    type SubCategoryPostSchema, zSubCategoryPostSchema,
} from "@/app/lib/schemas/subCategorySchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CirclePlus} from "lucide-react";

export function CreateSubCategoryModal(category: Category) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();

    const form = useForm<SubCategoryPostSchema>({
        resolver: zodResolver(zSubCategoryPostSchema),
        defaultValues: {
            name: "",
            category_id: category.id,
        },
    });

    const resetForm = () => {
        form.reset();
        setFile(null);
        setOpen(false);
    };

    const onSubmit = (data: SubCategoryPostSchema) => {
        if (!file) {
            return
        }
        startTransition(async () => {
            try {
                await createSubCategoryAction(data, file, category.slug);
                toast({
                    title: "Успешно",
                    description: `Подкатегория "${data.name}" добавлена.`,
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
                <Button> <CirclePlus /> Создать</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Новая подкатегория в {category.name}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...form.register("name")} />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="picture">Картинка</Label>
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
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Создаем.." : "Создать"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
