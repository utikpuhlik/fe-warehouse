"use client"

import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {EditCategoryModal} from "@/app/ui/catalogue/category/edit-dialog";
import type {Category} from "@/app/lib/schemas/categorySchema";
import {v4 as uuidv4} from "uuid";

export function CategoryCard(category: Category) {
    return (
        <Card className="relative group">
            <Link href={`/catalogue/${category.slug}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <div className="w-[100px] h-[100px] flex items-center justify-center">
                    <Image
                        src={category.image_url}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                    />
                    </div>
                    <h3 className="p-4 text-center text-sm font-medium">{category.name}</h3>
                </CardContent>
            </Link>

            <EditCategoryModal key={uuidv4()} {...category} />
        </Card>
    );
}
