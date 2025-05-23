import type {
    SubCategory
} from "@/app/lib/schemas/subCategorySchema";
import {zSubCategorySchema} from "@/app/lib/schemas/subCategorySchema";
import {BASE_URL} from "@/app/lib/config/config";
import {ConflictError, UnknownApiError, UnsupportedMediaTypeError} from "@/app/lib/errors/apiErrors";

export async function fetchSubCategories(
    category_id: string,
): Promise<SubCategory[]> {
    try {
        const data = await fetch(
            `${BASE_URL}/sub-categories?category_id=${category_id}&order_by=name`,
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
    sub_category: FormData,
): Promise<SubCategory> {
    const res = await fetch(`${BASE_URL}/sub-category`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: sub_category,
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");

        if (res.status === 409) {
            throw new ConflictError("Подкатегория с таким именем уже существует.");
        }

        if (res.status === 415) {
            throw new UnsupportedMediaTypeError("Недопустимый формат файла.");
        }

        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zSubCategorySchema.parse(json);
}

export async function putSubCategory(
    sub_category_id: string,
    sub_category: FormData,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/sub-category/${sub_category_id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json"
        },
        body: sub_category,
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");

        if (res.status === 409) {
            throw new ConflictError("Подкатегория с таким именем уже существует.");
        }

        if (res.status === 415) {
            throw new UnsupportedMediaTypeError("Недопустимый формат файла.");
        }

        throw new UnknownApiError(res.status, errorText);
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