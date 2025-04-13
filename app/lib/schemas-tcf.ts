export type Category = {
    id: string;
    name: string;
    slug: string;
    image_url: string;
};

export type SubCategory = {
    id: string;
    name: string;
    slug: string;
    image_url: string;
    category_id: string;
    category_slug: string;
};

export type Product = {
    id: string;
    bitrix_id: string;
    address_id: string | null;
    name: string;
    brand: string;
    manufacturer_number: string;
    cross_number: string;
    description: string | null;
    image_url: string | null;
    price_rub: string;
    super_wholesale_price_rub: string;
    quantity: number;
    sub_category_id: string;
    sub_category_slug: string;
};

export type Products = {
    items: Product[];
    total: number;
    page: number;
    size: number;
    pages: number;
};




