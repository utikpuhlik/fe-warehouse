import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import {fetchSubCategoryBySlug} from "@/app/lib/apis/subCategoryApi";
import {fetchProducts} from "@/app/lib/apis/productApi";
import type {Product, Products} from "@/app/lib/schemas/productSchema";
import {CreateProductModal} from "@/app/ui/catalogue/product/create-dialog";
import {notFound} from "next/navigation";
import type {SubCategory} from "@/app/lib/schemas/subCategorySchema";
import type {Metadata} from "next";
import {CatalogueCard} from "@/app/ui/shared/cards/catalogue-card";

type Props = {
    params: Promise<{ sub_category_slug: string }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {sub_category_slug} = await params;
    const sub_category = await fetchSubCategoryBySlug(sub_category_slug);
    if (!sub_category) {
        return {
            title: "Подкатегория не найдена | TCF",
            description: "Запрошенная подкатегория не существует.",
            robots: {index: false, follow: false},
        };
    }

    return {
        title: `${sub_category.name} | TCF`,
        description: `Товары подкатегории ${sub_category.name} для категории ${sub_category.category.name}`,
    };
}

export default async function ProductsPage({params}: Props) {
    const {sub_category_slug} = await params;

    const sub_category: SubCategory | null = await fetchSubCategoryBySlug(sub_category_slug);
    if (!sub_category) notFound();

    const category_slug = sub_category.category.slug;
    const productsData: Products = await fetchProducts(sub_category.id);
    const products: Product[] = productsData.items ?? [];

    return (
        <main>
            <div className="mb-4 flex items-center justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        {label: "Каталог", href: "/catalogue"},
                        {
                            label: sub_category.category.name,
                            href: `/catalogue/${category_slug}`,
                            active: false,
                        },
                        {
                            label: sub_category.name,
                            href: `/catalogue/${category_slug}/${sub_category_slug}`,
                            active: true,
                        },
                    ]}
                />
                <CreateProductModal {...sub_category} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {products.map((product) => (
                    <CatalogueCard key={product.id} type="product" entity={product}/>
                ))}
            </div>
        </main>
    );
}
