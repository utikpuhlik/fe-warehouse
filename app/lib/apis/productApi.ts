import {
    type Product,
    type Products,
    zProduct,
    zProducts,
} from "@/app/lib/schemas/productSchema";
import { BASE_URL } from "@/app/lib/config/config";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "products";

export async function fetchProducts(sub_category_id: string): Promise<Products> {
    const url = `${BASE_URL}/${ENTITY}?sub_category_id=${sub_category_id}`;
    return fetchAndParse(url, zProducts, true, ENTITY);
}

export async function fetchProductById(id: string): Promise<Product> {
    const url = `${BASE_URL}/${ENTITY}/${id}`;
    return fetchAndParse(url, zProduct, false, ENTITY);
}

export async function postProduct(product: FormData): Promise<Product> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: product,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return zProduct.parse(JSON.parse(text));
}

export async function putProduct(id: string, product: FormData): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "PUT",
        headers: {
            // no header because of multipart
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: product,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return res.status;
}

export async function delProduct(id: string): Promise<number> {
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
