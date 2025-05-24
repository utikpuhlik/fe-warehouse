"use client"

import Link from "next/link";
import Image from "next/image";
import {imageUrlPlaceholder} from "@/app/lib/config/config";
import {EditSubCategoryModal} from "@/app/ui/catalogue/sub-category/edit-dialog";
import type {SubCategory} from "@/app/lib/schemas/subCategorySchema";
import {Card, CardContent} from "@/components/ui/card";


export function SubCategoryCard(sub_category: SubCategory) {
    return (
        <Card className="relative group">
            <Link href={`/catalogue/${sub_category.category_slug}/${sub_category.slug}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <Image
                        src={sub_category.image_url ?? imageUrlPlaceholder}
                        alt={sub_category.slug}
                        width={100}
                        height={100}
                        className="block"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{sub_category.name}</h3>
                </CardContent>
            </Link>
            <EditSubCategoryModal
                {...sub_category}
                />
        </Card>
    );
}