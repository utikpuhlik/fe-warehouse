import {Category, Product, Products, SubCategory} from "@/app/lib/schemas-tcf";

const BASE_URL = process.env.API_URL!;

export async function fetchCategories(): Promise<Category[]> {
    try {

        console.log('Fetching categories data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await fetch(`${BASE_URL}/categories`);

        // console.log('Data fetch completed after 3 seconds.');

        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to category data.');
    }
}

export async function fetchSubCategories(categorySlug: string): Promise<SubCategory[]> {
    try {

        const data = await fetch(`${BASE_URL}/sub-categories?category_slug=${categorySlug}`);

        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to sub-category data.');
    }
}

export async function fetchProducts(subCategorySlug: string): Promise<Products> {
    try {

        const data = await fetch(`${BASE_URL}/products?sub_category_slug=${subCategorySlug}`);

        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}

export async function fetchProductById(id: string): Promise<Product> {
    try {
        const data = await fetch(`${BASE_URL}/products/${id}`);
        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Wildcard Search
export async function fetchFilteredProductsWS(search_term: string): Promise<Products> {
    try {
        const data = await fetch(`${BASE_URL}/products/search?search_term=${search_term}`);
        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Text Search
export async function fetchFilteredProductsTS(search_term: string): Promise<Products> {
    try {
        const data = await fetch(`${BASE_URL}/products/test_search?search_term=${search_term}`);
        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}
// Vector Search
export async function fetchFilteredProductsVS(search_term: string): Promise<Products> {
    try {
        const data = await fetch(`${BASE_URL}/products/vector_search?search_term=${search_term}`);
        return data.json();

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to products data.');
    }
}