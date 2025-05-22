"use client"

import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {EditCategoryModal} from "@/app/ui/catalogue/category/edit-dialog";

type CategoryCardProps = {
    name: string
    image_url: string
    slug: string
    id: string
}

export function CategoryCard({ name, image_url, slug, id }: CategoryCardProps) {
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

            <EditCategoryModal
                category_id={id}
                category={{ name }}
            />
        </Card>
    )
}