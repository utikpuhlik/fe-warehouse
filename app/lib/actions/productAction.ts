"use server"

import {zProductPostSchema, zProductPutSchema} from "@/app/lib/schemas/productSchema";
import {postProduct, delProduct, putProduct} from "@/app/lib/apis/productApi";
import {revalidatePath} from "next/cache";

export async function createProductAction(product: FormData, category_slug: string, sub_category_slug: string): Promise<void> {
    const raw = product.get("product");
    if (typeof raw !== "string") {
        throw new Error("No data in FormData object");
    }
    const valid = zProductPostSchema.parse(JSON.parse(raw));
    if (!valid) {
        throw new Error("Zod server validation failed")
    }
    await postProduct(product)

    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}

export async function updateProductAction(
    product_id: string,
    product: FormData,
    category_slug: string,
    sub_category_slug: string): Promise<void> {

    // TODO: maybe pass Entity and image_blob in separate parameters to make easy server zod validation
    const raw = product.get("product");
    if (typeof raw !== "string") {
        throw new Error("No data in FormData object");
    }
    const valid = zProductPutSchema.parse(JSON.parse(raw));
    if (!valid) {
        throw new Error("Zod server validation failed")
    }

    await putProduct(product_id, product)

    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}

export async function deleteProductAction(product_id: string, category_slug: string,
                                          sub_category_slug: string): Promise<void> {
    await delProduct(product_id);

    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}