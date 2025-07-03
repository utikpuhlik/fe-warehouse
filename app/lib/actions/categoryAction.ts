"use server"

import {delCategory, postCategory, patchCategory} from "@/app/lib/apis/categoryApi";
import {revalidatePath} from "next/cache";
import {CategoryPostSchema, CategoryPutSchema} from "@/app/lib/schemas/categorySchema";
import {buildFormData} from "@/app/lib/utils/buildFormData"

export async function createCategoryAction(category: CategoryPostSchema, file: File): Promise<void> {
    const formData = buildFormData(category, file)
    await postCategory(formData)
    revalidatePath("/catalogue");
}

export async function updateCategoryAction(category_id: string, category: CategoryPutSchema, file?: File): Promise<void> {
    const formData = buildFormData(category, file)
    await patchCategory(category_id, formData)
    revalidatePath("/catalogue");
}

export async function deleteCategoryAction(category_id: string): Promise<void> {
    await delCategory(category_id)
    revalidatePath("/catalogue");
}