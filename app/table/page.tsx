import Pagination from "@/app/ui/catalogue/pagination";
import Search from "@/app/ui/catalogue/search";
import Table from "@/app/ui/catalogue/table";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import type {OffersSchema} from "@/app/lib/schemas/offerSchema";
import {fetchFilteredOffersTS} from "@/app/lib/apis/public/offerApi";

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "6000180";
	const currentPage = Number(searchParams?.page) || 1;

	const data: OffersSchema = await fetchFilteredOffersTS(query, 10, currentPage);

	const { pages: totalPages, items } = data;
	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className="text-2xl">Таблица предложений</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Поиск.." />
			</div>
			<Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
				<Table offers={items}/>
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
