import {type SubCategory, zSubCategorySchema, zSubCategoryArraySchema} from "@/app/lib/schemas/subCategorySchema";
import {BASE_URL} from "@/app/lib/config/config";
import {handleApiError} from "@/app/lib/apis/utils/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";

const ENTITY = "sub-categories";

export async function fetchSubCategories(category_id: string): Promise<SubCategory[]> {
    const url = `${BASE_URL}/${ENTITY}?category_id=${category_id}&order_by=name`;
    return fetchAndParse(url, zSubCategoryArraySchema, {next: {revalidate: 60}}, "sub-category");
}

export async function fetchSubCategoryBySlug(slug: string): Promise<SubCategory> {
    const url = `${BASE_URL}/${ENTITY}/${slug}`;
    return fetchAndParse(url, zSubCategorySchema, {next: {revalidate: 60}}, "sub-category");
}

export async function postSubCategory(subCategory: FormData): Promise<SubCategory> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {Accept: "application/json"},
        body: subCategory,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, {entity: "sub-category"});
    }

    return zSubCategorySchema.parse(JSON.parse(text));
}

export async function putSubCategory(id: string, subCategory: FormData): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "PUT",
        headers: {Accept: "application/json"},
        body: subCategory,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, {entity: "sub-category"});
    }

    return res.status;
}

export async function delSubCategory(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, {entity: "sub-category"});
    }

    return res.status;
}
