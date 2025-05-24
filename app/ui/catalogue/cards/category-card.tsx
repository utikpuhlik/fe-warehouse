"use client"

import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {EditCategoryModal} from "@/app/ui/catalogue/category/edit-dialog";
import type {Category} from "@/app/lib/schemas/categorySchema";

export function CategoryCard(category: Category) {
    return (
        <Card className="relative group">
            <Link href={`/catalogue/${category.slug}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <Image
                        src={category.image_url}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{category.name}</h3>
                </CardContent>
            </Link>

            <EditCategoryModal {...category} />
        </Card>
    );
}
