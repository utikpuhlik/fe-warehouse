import type {
    SubCategory
} from "@/app/lib/schemas/subCategorySchema";
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
        console.error("API Error:", error);
        throw new Error("Failed to sub-category data.");
    }
}

export async function fetchSubCategoryBySlug(slug: string): Promise<SubCategory> {
    try {
        const res = await fetch(`${BASE_URL}/sub-category/${slug}`, {
            next: {revalidate: 60},
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to sub-category data.");
    }
}