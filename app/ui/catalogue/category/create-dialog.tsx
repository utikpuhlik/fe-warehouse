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
import {createCategoryAction} from "@/app/lib/actions/categoryAction";
import {useToast} from "@/hooks/use-toast";
import {showToastError} from "@/app/lib/errors/toastError";
import {useForm} from "react-hook-form";
import {type CategoryPostSchema, zCategoryPostSchema} from "@/app/lib/schemas/categorySchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {CirclePlus} from "lucide-react";

export function CreateCategoryModal() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();

    const form = useForm<CategoryPostSchema>({
        resolver: zodResolver(zCategoryPostSchema),
        defaultValues: {
            name: ""
        }
    })

    const resetForm = () => {
        form.reset();
        setOpen(false);
        setFile(null);
    };
    const onSubmit = (data: CategoryPostSchema) => {
        if (!file) {
            return
        }
        startTransition(async () => {
                try {
                    await createCategoryAction(data, file);
                    toast({
                        title: "Категория создана",
                        description: `Категория "${data.name}" добавлена.`,
                    });
                    resetForm();
                } catch (error) {
                    showToastError(error);
                }
            }
        )
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button> <CirclePlus /> Создать</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Новая категория</DialogTitle>
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
                        <Label htmlFor="picture">Картинка</Label>
                        <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
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