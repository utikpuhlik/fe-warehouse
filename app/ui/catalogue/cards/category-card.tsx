"use client"

import type {CategoryPutSchema} from "@/app/lib/schemas/categorySchema";
import {updateCategoryAction} from "@/app/lib/actions/categoryAction";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {EditCategoryDialog} from "@/app/ui/catalogue/category/edit-category-dialog";

type CategoryCardProps = {
    name: string
    image_url: string
    category_slug: string
    category_id: string
}

export function CategoryCard({ name, image_url, category_slug, category_id }: CategoryCardProps) {
    const handleSubmit = async (data: CategoryPutSchema) => {
        try {
            await updateCategoryAction(category_id, data)
            console.log("Category updated successfully")
        } catch (error) {
            console.error("Update failed", error)
        }
    }

    return (
        <Card className="relative group">
            <Link href={`/catalogue/${category_slug}`}>
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
            <EditCategoryDialog
                initialData={{ name, image_url }}
                action={handleSubmit}
            />
        </Card>
    )
}