"use server"

import {zProductPutSchema} from "@/app/lib/schemas/productSchema";
import {postProduct, delProduct, putProduct} from "@/app/lib/apis/productApi";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function createProductAction(formData: FormData, category_slug: string, sub_category_slug: string): Promise<void> {
    await postProduct(formData)
    revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}`);
}

export async function updateProductAction(
    id: string,
    formData: FormData,
): Promise<void> {
    const parsed = zProductPutSchema.parse({
        address_id: formData.get("address_id") || null,
        name: String(formData.get("name")),
        brand: String(formData.get("brand")),
        manufacturer_number: String(formData.get("manufacturer_number")),
        cross_number: formData.get("cross_number") || null,
        description: formData.get("description") || null,
        image_url: formData.get("image_url") || null,
        price_rub: Number(formData.get("price_rub")),
        super_wholesale_price_rub: Number(
            formData.get("super_wholesale_price_rub"),
        ),
        quantity: Number(formData.get("quantity")),
    });

    await putProduct(id, parsed);

    revalidatePath("/catalogue/table");
    redirect("/catalogue/table");
}

export async function deleteProductAction(id: string): Promise<void> {
    await delProduct(id);

    revalidatePath("/catalogue/table");
}