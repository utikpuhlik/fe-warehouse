import { ProductCard } from "@/app/ui/catalogue/cards/product-card";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchCategoryBySlug} from "@/app/lib/apis/categoryApi";
import {fetchSubCategoryBySlug} from "@/app/lib/apis/subCategoryApi";
import { fetchProducts } from "@/app/lib/apis/productApi";
import type {Product, Products} from "@/app/lib/schemas/productSchema";
import { CreateProductModal } from "@/app/ui/catalogue/product/create-dialog";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
	category_slug: string;
	sub_category_slug: string;
}>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const category_slug = params.category_slug;
	const sub_category_slug = params.sub_category_slug;

	const [category, sub_category] = await Promise.all([
		fetchCategoryBySlug(category_slug),
		fetchSubCategoryBySlug(sub_category_slug),
	]);

	const productsData: Products = await fetchProducts(sub_category.id);
	const products: Product[] = productsData.items ?? [];

	return (
		<main>
			<div className="mb-4 flex items-center justify-between">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: "/catalogue" },
					{
						label: category.name,
						href: `/catalogue/${category_slug}`,
						active: true,
					},
					{
						label: sub_category.name,
						href: `/catalogue/${category_slug}/${sub_category_slug}`,
						active: true,
					},
				]}
			/>
			<CreateProductModal {...sub_category}/>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						{...product}
					/>
				))}
			</div>
		</main>
	);
}
