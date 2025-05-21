"use client"

import type {CategoryPutSchema} from "@/app/lib/schemas/categorySchema";
import {updateCategoryAction} from "@/app/lib/actions/categoryAction";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {EditDialog} from "@/app/ui/catalogue/category/edit-dialog";

type CategoryCardProps = {
    name: string
    image_url: string
    slug: string
    id: string
}

export function CategoryCard({ name, image_url, slug, id }: CategoryCardProps) {
    const handleSubmit = async (data: CategoryPutSchema) => {
        try {
            await updateCategoryAction(id, data)
            console.log("Category updated successfully")
        } catch (error) {
            console.error("Update failed", error)
        }
    }

    return (
        <Card className="relative group">
            <Link href={`/catalogue/${slug}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <Image
                        src={image_url}
                        alt={name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{name}</h3>
                </CardContent>
            </Link>

            {/* Модалка с редактированием */}
            <EditDialog
                initialData={{ name, image_url }}
                action={handleSubmit}
            />
        </Card>
    )
}