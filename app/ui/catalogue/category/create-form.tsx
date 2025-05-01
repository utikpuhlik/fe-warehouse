"use client"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {createCategoryAction} from "@/app/lib/actions-tcf";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Название категории должно быть длиннее 2 символов",
    }),
    image_url: z.string().url({
        message: "Not valid URL format"
    })
})


export function CategoryForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image_url: ""
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createCategoryAction)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder="Название категории" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ссылка</FormLabel>
                            <FormControl>
                                <Input placeholder="Изображение" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display URL.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}