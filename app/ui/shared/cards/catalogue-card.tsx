"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { EditCategoryModal } from "@/app/ui/catalogue/category/edit-dialog";
import { EditProductModal } from "@/app/ui/catalogue/product/edit-dialog";
import { EditSubCategoryModal } from "@/app/ui/catalogue/sub-category/edit-dialog";

import type { Category } from "@/app/lib/schemas/categorySchema";
import type { SubCategory } from "@/app/lib/schemas/subCategorySchema";
import type { Product } from "@/app/lib/schemas/productSchema";

type CatalogueCardProps =
    | { type: "category"; entity: Category }
    | { type: "subcategory"; entity: SubCategory }
    | { type: "product"; entity: Product };

export function CatalogueCard({ type, entity }: CatalogueCardProps) {
    const getHref = () => {
        if (type === "category") {
            return `/catalogue/${entity.slug}`;
        }
        if (type === "subcategory") {
            return `/catalogue/${entity.category.slug}/${entity.slug}`;
        }
        if (type === "product") {
            return `/catalogue/${entity.sub_category.category.slug}/${entity.sub_category.slug}/${entity.id}`;
        }
        return "#";
    };

    const getImage = () => {
        return (
            <Image
                src={entity.image_url}
                alt={entity.name}
                width={100}
                height={100}
            />
        );
    };

    const getTitle = () => {
        return (
            <h3 className="text-center text-sm font-medium p-2">
                {entity.name}
            </h3>
        );
    };

    const getEditor = () => {
        switch (type) {
            case "category":
                return <EditCategoryModal key={uuidv4()} {...entity} />;
            case "subcategory":
                return <EditSubCategoryModal key={uuidv4()} {...entity} />;
            case "product":
                return <EditProductModal key={uuidv4()} {...entity} />;
        }
    };

    return (
        <Card className="relative group">
            <Link href={getHref()}>
                <CardContent className="flex flex-col items-center p-4">
                    <div className="w-[100px] h-[100px] flex items-center justify-center">
                        {getImage()}
                    </div>
                    {getTitle()}
                </CardContent>
            </Link>
            {getEditor()}
        </Card>
    );
}
