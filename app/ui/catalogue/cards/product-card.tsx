"use client"

import type {Product} from "@/app/lib/schemas/productSchema";
import Link from "next/link";
import Image from "next/image";

import {Card, CardContent} from "@/components/ui/card";
import {EditProductModal} from "@/app/ui/catalogue/product/edit-dialog";
import {v4 as uuidv4} from "uuid";

export function ProductCard(product: Product) {
    return (
        <Card className="relative group">
            <Link href={`/catalogue/${product.sub_category.category.slug}/${product.sub_category.slug}/${product.id}`}>
                <CardContent className="flex flex-col items-center p-4">
                    <Image
                        src={product.image_url ?? undefined}
                        alt={product.id}
                        width={100}
                        height={100}
                        className="object-contain mb-2"
                    />
                    <h3 className="text-center text-sm font-medium mb-1">{product.name}</h3>
                </CardContent>
            </Link>
            <EditProductModal key={uuidv4()} {...product} />
        </Card>
    );
}