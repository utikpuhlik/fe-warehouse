"use server"

import {delCategory, postCategory, patchCategory} from "@/app/lib/apis/categoryApi";
import {revalidatePath} from "next/cache";

export async function createCategoryAction(category: FormData): Promise<void> {
    await postCategory(category)
    revalidatePath("/catalogue");
}

export async function updateCategoryAction(category_id: string, category: FormData): Promise<void> {
    await patchCategory(category_id, category)
    revalidatePath("/catalogue");
}

export async function deleteCategoryAction(category_id: string): Promise<void> {
    await delCategory(category_id)
    revalidatePath("/catalogue");
}