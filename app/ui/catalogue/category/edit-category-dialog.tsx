// components/edit-category-dialog.tsx
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {type CategoryPutSchema, zCategoryPutSchema} from "@/app/lib/schemas-tcf";
import {useState} from "react";

type EditCategoryDialogProps = {
    initialData: CategoryPutSchema
    action: (data: CategoryPutSchema) => void
}

export function EditCategoryDialog({ initialData, action }: EditCategoryDialogProps) {
    const form = useForm<CategoryPutSchema>({
        resolver: zodResolver(zCategoryPutSchema),
        defaultValues: initialData,
    })
    const [open, setOpen] = useState(false);
    const handleSubmit = async (data: CategoryPutSchema) => {
        try {
            action(data)
            setOpen(false) // ✅ закрытие модалки после успешного сохранения
        } catch (error) {
            console.error("Ошибка при обновлении категории:", error)
            // Можно добавить toast с ошибкой
        }
    }


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

                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" {...form.register("name")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image_url">URL изображения</Label>
                        <Input id="image_url" {...form.register("image_url")} />
                    </div>

                    <Button type="submit">Сохранить</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
