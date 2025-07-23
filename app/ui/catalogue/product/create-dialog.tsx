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
import {showToastError} from "@/app/lib/errors/toastError";
import type {
    SubCategory,
} from "@/app/lib/schemas/subCategorySchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type ProductPostSchema, zProductPostSchema} from "@/app/lib/schemas/productSchema";
import {createProductAction} from "@/app/lib/actions/productAction";
import {CreateButton} from "@/app/ui/shared/buttons/create-entity-button";

export function CreateProductModal(sub_category: SubCategory) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();

    const form = useForm<ProductPostSchema>({
        resolver: zodResolver(zProductPostSchema),
        defaultValues: {
            name: "",
            cross_number: "",
            description: "",
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
            return
        }
        startTransition(async () => {
            try {
                await createProductAction(data, file, sub_category.category.slug, sub_category.slug);
                toast({
                    title: "Успешно",
                    description: `Товар "${data.name}" добавлен.`,
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
                    <DialogTitle>Новый товар в {sub_category.name}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...form.register("name")} />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="cross_number">Кросс-номер</Label>
                        <Input id="cross_number" {...form.register("cross_number")} />
                    </div>
                    <div>
                        <Label htmlFor="description">Описание</Label>
                        <Input id="description" {...form.register("description")} />
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
