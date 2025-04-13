import { fetchProducts } from "@/app/lib/data-tcf";
import { lusitana } from "@/app/ui/fonts";
import {ProductCard} from "@/app/ui/catalogue/cards";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
    category_slug: string;
    subcategory_slug: string;
}>


export default async function Page(props: {params: Params}) {
    const params = await props.params;
    const subcategory_slug = params.subcategory_slug;
    const productsData = await fetchProducts(subcategory_slug);
    const products = productsData.items ?? [];

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Products in "{subcategory_slug}"
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </main>
    );
}
