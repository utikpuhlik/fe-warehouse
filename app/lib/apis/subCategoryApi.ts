import type {
    SubCategory, SubCategoryPutSchema
} from "@/app/lib/schemas/subCategorySchema";
import {zSubCategorySchema} from "@/app/lib/schemas/subCategorySchema";
import {BASE_URL} from "@/app/lib/config/config";

export async function fetchSubCategories(
    categorySlug: string,
): Promise<SubCategory[]> {
    try {
        const data = await fetch(
            `${BASE_URL}/sub-categories?category_slug=${categorySlug}&order_by=name`,
            {next: {revalidate: 60}},
        );

        return data.json();
    } catch (error) {
        throw new Error(`Failed to fetch sub-category data. Detail: ${error}`);
    }
}

export async function fetchSubCategoryBySlug(slug: string): Promise<SubCategory> {
    try {
        const res = await fetch(`${BASE_URL}/sub-category/${slug}`, {
            next: {revalidate: 60},
        });
        return res.json();
    } catch (error) {
        throw new Error(`Failed to sub-category data. Detail: ${error}`);
    }
}

export async function postSubCategory(
    category: FormData,
): Promise<SubCategory> {
    const res = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: category,
    });

    if (!res.ok) {
        throw new Error(`Failed to create sub-category: ${res.status}`);
    }

    const json = await res.json();

    return zSubCategorySchema.parse(json);
}

export async function putSubCategory(
    category_id: string,
    category: SubCategoryPutSchema,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/sub-category/${category_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });

    if (!res.ok) {
        throw new Error(`Failed to update sub-category: ${res.status}`);
    }

    return res.status;
}

export async function delSubCategory(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/sub-category/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete category: ${res.status}`);
    }

    return res.status;
}