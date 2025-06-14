import { type Category, zCategory, zCategories } from "@/app/lib/schemas/categorySchema";
import { BASE_URL } from "@/app/lib/config/config";
import { handleApiError } from "@/app/lib/apis/utils/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "categories";

export async function fetchCategories(): Promise<Category[]> {
    return fetchAndParse(`${BASE_URL}/${ENTITY}?order_by=name`, zCategories, {
        next: { revalidate: 60 },
    });
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
    return fetchAndParse(`${BASE_URL}/${ENTITY}/slug/${slug}`, zCategory, {
        next: { revalidate: 60 },
    });
}

export async function fetchCategoryById(id: string): Promise<Category> {
    return fetchAndParse(`${BASE_URL}/${ENTITY}/${id}`, zCategory, {
        next: { revalidate: 60 },
    });
}

export async function postCategory(category: FormData): Promise<Category> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: category,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, { entity: "category" });
    }

    return zCategory.parse(JSON.parse(text));
}

export async function patchCategory(id: string, category: FormData): Promise<Category> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "PATCH",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: category,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, { entity: "category" });
    }

    return zCategory.parse(JSON.parse(text));
}

export async function delCategory(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
    });

    if (!res.ok) {
        handleApiError(res, await res.text().catch(() => ""), { entity: "category" });
    }

    return res.status;
}
