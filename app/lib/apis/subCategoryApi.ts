import {type SubCategory, zSubCategorySchema, zSubCategoryArraySchema} from "@/app/lib/schemas/subCategorySchema";
import {BASE_URL} from "@/app/lib/config/config";
import {handleApiError} from "@/app/lib/errors/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "sub-categories";

export async function fetchSubCategories(category_id: string): Promise<SubCategory[]> {
    const url = `${BASE_URL}/${ENTITY}?category_id=${category_id}&order_by=name`;
    return fetchAndParse(url, zSubCategoryArraySchema, false, ENTITY);
}

export async function fetchSubCategoryBySlug(slug: string): Promise<SubCategory> {
    const url = `${BASE_URL}/${ENTITY}/slug/${slug}`;
    return fetchAndParse(url, zSubCategorySchema,  false, ENTITY);
}

export async function postSubCategory(subCategory: FormData): Promise<SubCategory> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: subCategory,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return zSubCategorySchema.parse(JSON.parse(text));
}

export async function patchSubCategory(id: string, subCategory: FormData): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "PATCH",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: subCategory,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return res.status;
}

export async function delSubCategory(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return res.status;
}
