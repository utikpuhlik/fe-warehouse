"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createSubCategoryAction } from "@/app/lib/actions/subCategoryAction";
import {showToastError} from "@/app/lib/utils/toastError";

type Props = {
    category_id: string;
    category_slug: string;
};

export function CreateSubCategoryModal({ category_id, category_slug }: Props) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const { toast } = useToast();

    const resetForm = () => {
        setOpen(false);
        setName("");
        setFile(null);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !name) {
            toast({
                title: "Ошибка",
                description: "Пожалуйста, заполните все поля",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append(
            "sub_category",
            JSON.stringify({ name, category_id, category_slug })
        );
        formData.append("image_blob", file);

        try {
            await createSubCategoryAction(formData, category_slug);

            toast({
                title: "Успешно",
                description: `Подкатегория "${name}" добавлена.`,
            });

            resetForm();
        } catch (error) {
            showToastError(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Добавить подкатегорию</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Новая подкатегория в "{category_slug}"</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="picture">Картинка</Label>
                        <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Создать</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
