"use server";

import { createProduct, delProduct, putProduct } from "@/app/lib/data-tcf";
import { zProductPostSchema, zProductPutSchema } from "@/app/lib/schemas-tcf";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData): Promise<void> {
	const parsed = zProductPostSchema.parse({
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
		sub_category_id: String(formData.get("sub_category_id")),
		sub_category_slug: String(formData.get("sub_category_slug")),
	});

	await createProduct(parsed);

	revalidatePath("/catalogue/table");
	redirect("/catalogue/table");
}

export type State = {
	errors?: {
		address_id?: string[];
		name?: string[];
		brand?: string[];
		manufacturer_number?: string[];
		cross_number?: string[];
		image_url?: string[];
		price_rub?: number[];
		super_wholesale_price_rub?: number[];
		quantity?: number[];
	};
	message?: string | null;
};

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
