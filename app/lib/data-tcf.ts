import {
    Category,
    Product,
    ProductPostSchema,
    ProductPutSchema,
    Products,
    SubCategory,
    UserSchema, zProduct,
    zUsers
} from "@/app/lib/schemas-tcf";

const BASE_URL = process.env.API_URL!;
const ITEMS_PER_PAGE: number = 6

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${BASE_URL}/categories`, {next: {revalidate: 60}});
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to category data.');
    }
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
    try {
        const res = await fetch(`${BASE_URL}/category/${slug}`, {next: {revalidate: 60}});
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to category data.');
    }
}

export async function fetchSubCategories(categorySlug: string): Promise<SubCategory[]> {
    try {

        const data = await fetch(`${BASE_URL}/sub-categories?category_slug=${categorySlug}`,
            {next: {revalidate: 60}});

        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to sub-category data.');
    }
}

export async function fetchSubCategoryBySlug(slug: string): Promise<Category> {
    try {
        const res = await fetch(`${BASE_URL}/sub-category/${slug}`, {next: {revalidate: 60}});
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to sub-category data.');
    }
}

export async function fetchProducts(subCategorySlug: string): Promise<Products> {
    try {

        const res = await fetch(`${BASE_URL}/products?sub_category_slug=${subCategorySlug}`,
            {next: {revalidate: 60}});

        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}

export async function fetchProductById(id: string): Promise<Product> {
    try {
        const res = await fetch(`${BASE_URL}/product/${id}`);
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Wildcard Search
export async function fetchFilteredProductsWS(search_term: string, page: number, size: number = 10): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products/search?search_term=${search_term}&size=${size}&page=${page}`,
            {next: {revalidate: 60}}
        );
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Text Search
export async function fetchFilteredProductsTS(search_term: string, page: number, size: number = 10): Promise<Products> {
    try {
        const res = await fetch(`${BASE_URL}/products/test_search?search_term=${search_term}`);
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Vector Search
export async function fetchFilteredProductsVS(search_term: string, page: number, size: number = 10): Promise<Products> {
    try {
        const res = await fetch(
            `${BASE_URL}/products/vector_search?search_term=${search_term}&size=${size}&page=${page}`,
            {next: {revalidate: 60}}
        );
        return res.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}


export async function fetchUsers(role: string | null = null): Promise<UserSchema[]> {
    const url = role ? `${BASE_URL}/users?role=${role}` : `${BASE_URL}/users`;

    // ? Fetch Caching in NextJS for 60 sec:
    const res = await fetch(url, {next: {revalidate: 60}});
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    // 🔒 Runtime validation
    return zUsers.parse(json);
}

export async function createProduct(product: ProductPostSchema): Promise<Product> {
    const res = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) {
        throw new Error(`Failed to create product: ${res.status}`);
    }

    const json = await res.json();

    return zProduct.parse(json);
}

export async function putProduct(id: string, product: ProductPutSchema): Promise<number> {
    const res = await fetch(`${BASE_URL}/product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) {
        throw new Error(`Failed to update product: ${res.status}`);
    }

    return res.status;
}

export async function delProduct(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.status}`);
    }

    return res.status;
}