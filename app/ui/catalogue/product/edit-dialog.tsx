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
import {useState, useTransition} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import {type Product, zProduct} from "@/app/lib/schemas/productSchema";
import {deleteProductAction, updateProductAction} from "@/app/lib/actions/productAction";
import {SaveButton} from "@/app/ui/shared/buttons/save-button";


export function EditProductModal(product: Product) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();

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
                    file ?? undefined
                );
                toast({
                    title: "Успешно",
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
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать товар</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...form.register("name")} />
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
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required={false}
                        />
                    </div>
                <DialogFooter className="flex items-center justify-between">
                    <DeleteEntityButton
                        entityName={product.name}
                        entityId={product.id}
                        deleteAction={(id) => deleteProductAction(
                            id,
                            product.sub_category.category.slug,
                            product.sub_category.slug
                        )}
                        onDeleted={resetForm}
                    />
                    <SaveButton variant="default" type="submit" disabled={isPending} loading={isPending}/>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
