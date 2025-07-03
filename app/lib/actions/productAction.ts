"use server"

import {
    Product,
    ProductPostSchema,
} from "@/app/lib/schemas/productSchema";
import {postProduct, delProduct, patchProduct} from "@/app/lib/apis/productApi";
import {revalidatePath} from "next/cache";
import {buildFormData} from "@/app/lib/utils/buildFormData";

export async function createProductAction(
    product: ProductPostSchema,
    file: File,
    category_slug: string,
    sub_category_slug: string,
    ): Promise<void> {
    const formData = buildFormData(product, file)
    await postProduct(formData)
    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}

export async function updateProductAction(
    product_id: string,
    product: Product,
    category_slug: string,
    sub_category_slug: string,
    file?: File): Promise<void> {

    const formData = buildFormData(product, file);
    await patchProduct(product_id, formData)

    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}

export async function deleteProductAction(product_id: string, category_slug: string,
                                          sub_category_slug: string): Promise<void> {
    await delProduct(product_id);

    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}