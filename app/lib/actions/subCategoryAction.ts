"use server"

import {delSubCategory, postSubCategory, putSubCategory} from "@/app/lib/apis/subCategoryApi";
import {revalidatePath} from "next/cache";

export async function createSubCategoryAction(sub_category: FormData, category_slug: string): Promise<void> {
    await postSubCategory(sub_category)
    revalidatePath(`/catalogue/${category_slug}`);
}

export async function updateSubCategoryAction(sub_category_id: string,
                                              sub_category: FormData,
                                              category_slug: string): Promise<void> {
    await putSubCategory(sub_category_id, sub_category)
    revalidatePath(`/catalogue/${category_slug}`);
}

export async function deleteSubCategoryAction(category_id: string, category_slug: string): Promise<void> {
    await delSubCategory(category_id)
    revalidatePath(`/catalogue/${category_slug}`);
}