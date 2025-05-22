import {
    type Product,
    type ProductPostSchema,
    type ProductPutSchema,
    type Products,
    zProduct,
} from "@/app/lib/schemas/productSchema";
import {BASE_URL} from "@/app/lib/config/config"
import {ConflictError, UnknownApiError, UnsupportedMediaTypeError} from "@/app/lib/errors/apiErrors";


export async function fetchProducts(
    subCategorySlug: string,
): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products?sub_category_slug=${subCategorySlug}`,
            {next: {revalidate: 60}},
        );

        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to products data.");
    }
}

export async function fetchProductById(id: string): Promise<Product> {
    try {
        const res = await fetch(`${BASE_URL}/product/${id}`);
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to products data.");
    }
}

// Wildcard Search
export async function fetchFilteredProductsWS(
    search_term: string,
    page: number,
    size = 10,
): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products/search?search_term=${search_term}&size=${size}&page=${page}`,
            {next: {revalidate: 60}},
        );
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to products data.");
    }
}

// Text Search
export async function fetchFilteredProductsTS(
    search_term: string,
    page: number,
    size = 10,
): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products/text_search?search_term=${search_term}&size=${size}&page=${page}`,
        );
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to products data.");
    }
}

// Vector Search
export async function fetchFilteredProductsVS(
    search_term: string,
    page: number,
    size = 10,
): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products/vector_search?search_term=${search_term}&size=${size}&page=${page}`,
            {next: {revalidate: 60}},
        );
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to products data.");
    }
}

export async function createProduct(
    product: ProductPostSchema,
): Promise<Product> {
    const res = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");

        if (res.status === 409) {
            throw new ConflictError("Продукт с таким именем уже существует.");
        }

        if (res.status === 415) {
            throw new UnsupportedMediaTypeError("Недопустимый формат файла.");
        }

        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zProduct.parse(json);
}

export async function putProduct(
    id: string,
    product: ProductPutSchema,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error(`Failed to update product: ${res.status}`);
    }

    return res.status;
}

export async function delProduct(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.status}`);
    }

    return res.status;
}
