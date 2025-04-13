import { fetchProducts } from "@/app/lib/data-tcf";
import { lusitana } from "@/app/ui/fonts";
import {ProductCard} from "@/app/ui/catalogue/cards";

type Props = {
    params: { category_slug: string; subcategory_slug: string };
};

export default async function ProductsPage({ params }: Props) {
    const products = await fetchProducts(params.subcategory_slug);
    const items = products.items

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Products in "{params.subcategory_slug}"
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {items.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}
