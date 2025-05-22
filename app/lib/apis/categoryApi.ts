import {
    type Category,
    type CategoryPutSchema,
    zCategory,
} from "@/app/lib/schemas/categorySchema";
import {BASE_URL} from "@/app/lib/config/config";
import {ConflictError, UnknownApiError, UnsupportedMediaTypeError } from "../errors/apiErrors";

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
        const errorText = await res.text().catch(() => "");

        if (res.status === 409) {
            throw new ConflictError("Категория с таким именем уже существует.");
        }

        if (res.status === 415) {
            throw new UnsupportedMediaTypeError("Недопустимый формат файла.");
        }

        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zCategory.parse(json);
}

export async function putCategory(
    category_id: string,
    category: FormData,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/category/${category_id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json"
        },
        body: category,
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