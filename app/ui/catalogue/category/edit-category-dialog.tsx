"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Pencil} from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input"
import {useState, useTransition} from "react"
import {
    type CategoryPutSchema,
    zCategoryPutSchema,
} from "@/app/lib/schemas/categorySchema"
import {Label} from "@/components/ui/label";

type Props = {
    initialData: CategoryPutSchema
    action: (data: CategoryPutSchema) => Promise<void>
}

export function EditCategoryDialog({initialData, action}: Props) {
    const form = useForm<CategoryPutSchema>({
        resolver: zodResolver(zCategoryPutSchema),
        defaultValues: initialData,
    })

    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    function onSubmit(values: CategoryPutSchema) {
        startTransition(async () => {
            await action(values)
            form.reset(values)
            setOpen(false)
        })
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

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Label htmlFor="name">Название</Label>
                    <Input id="name" {...form.register("name")} />

                    <Label htmlFor="image_url">URL изображения</Label>
                    <Input id="image_url" {...form.register("image_url")} />

                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving.." : "Сохранить"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
