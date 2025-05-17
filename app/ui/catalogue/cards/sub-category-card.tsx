"use client"

import Link from "next/link";
import Image from "next/image";
import {imageUrlPlaceholder} from "@/app/lib/config/config";

export function SubCategoryCard({
                                    title,
                                    image_url,
                                    category_slug,
                                    sub_category_slug,
                                }: {
    title: string;
    image_url: string;
    category_slug: string;
    sub_category_slug: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
            <Link href={`/catalogue/${category_slug}/${sub_category_slug}`}>
                <div className="flex flex-col items-center p-7">
                    <Image
                        src={image_url ?? imageUrlPlaceholder}
                        alt={sub_category_slug}
                        width={100}
                        height={100}
                        className="block"
                    />
                    <h3 className="p-4 text-center text-sm font-medium">{title}</h3>
                </div>
            </Link>
        </div>
    );
}