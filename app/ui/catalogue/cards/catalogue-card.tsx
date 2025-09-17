"use client";

import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import type { Category } from "@/app/lib/schemas/categorySchema";
import type { Product } from "@/app/lib/schemas/productSchema";
import type { SubCategory } from "@/app/lib/schemas/subCategorySchema";
import { EditCategoryModal } from "@/app/ui/catalogue/category/edit-dialog";
import { EditProductModal } from "@/app/ui/catalogue/product/edit-dialog";
import { EditSubCategoryModal } from "@/app/ui/catalogue/sub-category/edit-dialog";
import { Card, CardContent } from "@/components/ui/card";

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
    return <Image src={entity.image_url} alt={entity.name} width={100} height={100} />;
  };

  const getTitle = () => {
    return <h3 className="p-2 text-center text-sm font-medium">{entity.name}</h3>;
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
    <Card className="group relative overflow-hidden">
      <Link href={getHref()}>
        <CardContent className="flex flex-col items-center p-4">
          <div className="flex h-[100px] w-[100px] items-center justify-center">{getImage()}</div>
          {getTitle()}
        </CardContent>
      </Link>
      {getEditor()}
    </Card>
  );
}
