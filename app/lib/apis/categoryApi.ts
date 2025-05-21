import {
    type Category,
    type CategoryPutSchema,
    zCategory,
} from "@/app/lib/schemas/categorySchema";
import {BASE_URL} from "@/app/lib/config/config";

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${BASE_URL}/categories?order_by=name`, {
            next: {revalidate: 60},
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to category data.");
    }
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
    try {
        const res = await fetch(`${BASE_URL}/category/${slug}`, {
            next: {revalidate: 60},
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to category data.");
    }
}

export async function postCategory(
    category: FormData,
): Promise<Category> {
    const res = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: category,
    });

    if (!res.ok) {
        throw new Error(`Failed to create category: ${res.status}`);
    }

    const json = await res.json();

    return zCategory.parse(json);
}

export async function putCategory(
    category_id: string,
    category: CategoryPutSchema,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/category/${category_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });

    if (!res.ok) {
        throw new Error(`Failed to update category: ${res.status}`);
    }

    return res.status;
}

export async function delCategory(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/category/${id}`, {
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