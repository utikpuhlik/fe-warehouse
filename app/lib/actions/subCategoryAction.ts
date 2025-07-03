"use server"

import {delSubCategory, postSubCategory, patchSubCategory} from "@/app/lib/apis/subCategoryApi";
import {revalidatePath} from "next/cache";
import {buildFormData} from "@/app/lib/utils/buildFormData";
import {SubCategoryPostSchema, SubCategoryPutSchema} from "@/app/lib/schemas/subCategorySchema";

export async function createSubCategoryAction(sub_category: SubCategoryPostSchema, file: File, category_slug: string): Promise<void> {
    const formData = buildFormData(sub_category, file)
    await postSubCategory(formData)
    revalidatePath(`/catalogue/${category_slug}`);
}

export async function updateSubCategoryAction(sub_category_id: string,
                                              sub_category: SubCategoryPutSchema,
                                              category_slug: string,
                                              file?: File,
                                              ): Promise<void> {
    const formData = buildFormData(sub_category, file);
    await patchSubCategory(sub_category_id, formData);
    revalidatePath(`/catalogue/${category_slug}`);
}

export async function deleteSubCategoryAction(category_id: string, category_slug: string): Promise<void> {
    await delSubCategory(category_id)
    revalidatePath(`/catalogue/${category_slug}`);
}