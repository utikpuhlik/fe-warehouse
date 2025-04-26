import {fetchCategoryBySlug, fetchProducts, fetchSubCategoryBySlug} from "@/app/lib/data-tcf";
import { lusitana } from "@/app/ui/fonts";
import {ProductCard} from "@/app/ui/catalogue/cards";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
    category_slug: string;
    sub_category_slug: string;
}>


export default async function Page(props: {params: Params}) {
    const params = await props.params;
    const category_slug = params.category_slug;
    const sub_category_slug = params.sub_category_slug;

    const category = await fetchCategoryBySlug(category_slug);
    const sub_category = await fetchSubCategoryBySlug(sub_category_slug);

    const productsData = await fetchProducts(sub_category_slug);
    const products = productsData.items ?? [];

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Каталог', href: '/catalogue' },
                    {
                        label: category.name,
                        href: `/catalogue/${category_slug}`,
                        active: true,
                    },
                    {
                        label: sub_category.name,
                        href: `/catalogue/${category_slug}/${sub_category_slug}`,
                        active: true,
                    }
                ]}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} category_slug={category_slug} sub_category_slug={sub_category_slug} />
                ))}
            </div>
        </main>
    );
}
