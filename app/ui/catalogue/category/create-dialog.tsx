"use client";

import {useState} from "react";
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

export function CreateCategoryModal() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const {toast} = useToast()

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
        formData.append("category", JSON.stringify({name}));
        formData.append("image_blob", file);

        try {
            await createCategoryAction(formData);

            toast({
                title: "Категория создана",
                description: `Категория "${name}" добавлена`,
            });

            // Очистка полей и закрытие модалки
            setOpen(false);
            setName("");
            setFile(null);
        } catch (error) {
            toast({
                title: "Ошибка",
                description: (error as Error).message,
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Добавить категорию</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Новая категория</DialogTitle>
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
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            Создать
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
