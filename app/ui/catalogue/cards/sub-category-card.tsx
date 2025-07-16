"use client"

import Link from "next/link";
import Image from "next/image";
import {EditSubCategoryModal} from "@/app/ui/catalogue/sub-category/edit-dialog";
import type {SubCategory} from "@/app/lib/schemas/subCategorySchema";
import {Card, CardContent} from "@/components/ui/card";
import {v4 as uuidv4} from "uuid";


export function SubCategoryCard(sub_category: SubCategory) {
    return (
        <Card className="relative group">
            <Link href={`/catalogue/${sub_category.category.slug}/${sub_category.slug}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <div className="w-[100px] h-[100px] flex items-center justify-center">
                    <Image
                        src={sub_category.image_url ?? undefined}
                        alt={sub_category.slug}
                        width={100}
                        height={100}
                        className="block"
                    />
                    </div>
                    <h3 className="p-4 text-center text-sm font-medium">{sub_category.name}</h3>
                </CardContent>
            </Link>
            <EditSubCategoryModal key={uuidv4()} {...sub_category}/>
        </Card>
    );
}