import { fetchProductById } from "@/app/lib/data-tcf";
import { ProductDetailCard } from "@/app/ui/catalogue/cards";
import { lusitana } from "@/app/ui/fonts";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
	category_slug: string;
	sub_category_slug: string;
	product_id: string;
}>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const product_id = params.product_id;

	const productData = await fetchProductById(product_id);

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Product: {productData.name}
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				<ProductDetailCard key={product_id} {...productData} />
			</div>
		</main>
	);
}
