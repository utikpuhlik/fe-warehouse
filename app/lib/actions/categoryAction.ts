"use server"

import type {CategoryPutSchema} from "@/app/lib/schemas/categorySchema";
import {postCategory, putCategory} from "@/app/lib/apis/categoryApi";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function createCategoryAction(category: FormData): Promise<void> {
    await postCategory(category)

    revalidatePath("/catalogue");
    redirect("/catalogue");
}

export async function updateCategoryAction(category_id: string, category: CategoryPutSchema): Promise<void> {
    await putCategory(category_id, category)
    revalidatePath("/catalogue");

}