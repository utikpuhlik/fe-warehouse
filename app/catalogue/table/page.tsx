import {
	fetchFilteredProductsVS,
	fetchFilteredProductsWS,
} from "@/app/lib/data-tcf";
import { type Products, zProducts } from "@/app/lib/schemas-tcf";
import { CreateProduct } from "@/app/ui/catalogue/buttons";
import Pagination from "@/app/ui/catalogue/pagination";
import Search from "@/app/ui/catalogue/search";
import Table from "@/app/ui/catalogue/table";
import { lusitana } from "@/app/ui/fonts";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const data: Products = zProducts.parse(
		query
			? await fetchFilteredProductsVS(query, currentPage)
			: await fetchFilteredProductsWS(query, currentPage),
	);

	const { pages: totalPages, items } = data;
	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Products</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search products..." />
				<CreateProduct />
			</div>
			<Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
				<Table products={items} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
