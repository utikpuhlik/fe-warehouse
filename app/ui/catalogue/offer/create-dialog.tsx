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
    Product,
} from "@/app/lib/schemas/productSchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type OfferPostSchema, zOfferPostSchema} from "@/app/lib/schemas/offerSchema";
import {createOfferAction} from "@/app/lib/actions/offerAction";
import {CirclePlus} from "lucide-react";

export function CreateOfferModal(product: Product) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();

    const form = useForm<OfferPostSchema>({
        resolver: zodResolver(zOfferPostSchema),
        defaultValues: {
            address_id: "",
            brand: "",
            manufacturer_number: "",
            internal_description: "",
            price_rub: 0,
            super_wholesale_price_rub: 0,
            quantity: 0,
            product_id: product.id,
        },
    });


    const resetForm = () => {
        form.reset();
        setOpen(false);
    };

    const onSubmit = (data: OfferPostSchema) => {
        startTransition(async () => {
            try {
                await createOfferAction(
                    data,
                    product.sub_category.category.slug,
                    product.sub_category.slug,
                    product.id
                );
                toast({
                    title: "Успешно",
                    description: `Предложение "${data.brand}" для "${product.name}" добавлено.`,
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
                <Button> <CirclePlus/> Создать</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Новое предложение для {product.name}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="address_id">Адресный номер</Label>
                        <Input id="address_id" {...form.register("address_id")} />
                    </div>
                    <div>
                        <Label htmlFor="brand">Бренд</Label>
                        <Input id="brand" {...form.register("brand")} />
                        {form.formState.errors.brand && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.brand.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="manufacturer_number">Номер производителя</Label>
                        <Input id="manufacturer_number" {...form.register("manufacturer_number")} />
                    </div>
                    <div>
                        <Label htmlFor="internal_description">Описание</Label>
                        <Input id="internal_description" {...form.register("internal_description")} />
                    </div>
                    <div>
                        <Label htmlFor="price_rub">Цена розница</Label>
                        <Input id="price_rub" type="number"
                               step="1" {...form.register("price_rub", {valueAsNumber: true})} />
                        {form.formState.errors.price_rub && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.price_rub.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="super_wholesale_price_rub">Супер-опт</Label>
                        <Input id="super_wholesale_price_rub" type="number"
                               step="1" {...form.register("super_wholesale_price_rub", {valueAsNumber: true})} />
                        {form.formState.errors.super_wholesale_price_rub && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.super_wholesale_price_rub.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="quantity">Остаток</Label>
                        <Input id="quantity" type="number"
                               step="1" {...form.register("quantity", {valueAsNumber: true})} />
                        {form.formState.errors.quantity && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.quantity.message}
                            </p>
                        )}
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
