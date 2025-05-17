"use client"

import type {Product} from "@/app/lib/schemas/productSchema";
import Link from "next/link";
import Image from "next/image";
import {imageUrlPlaceholder} from "@/app/lib/config/config";

type ProductCardProps = Product & {
    category_slug: string
    sub_category_slug: string
}
export function ProductCard({
                                id,
                                name,
                                image_url,
                                category_slug,
                                sub_category_slug,
                            }: ProductCardProps) {
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${category_slug}/${sub_category_slug}/${id}`}>
                <div className="flex flex-col items-center p-4">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={id}
                        width={100}
                        height={100}
                        className="object-contain mb-2"
                    />
                    <h3 className="text-center text-sm font-medium mb-1">{name}</h3>
                </div>
            </Link>
        </div>
    );
}