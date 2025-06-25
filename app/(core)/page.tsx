import type {Metadata} from "next";
import { fetchLatestInvoices } from "@/app/lib/data";
import { Card } from "@/app/ui/dashboard/cards";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import {DownloadPriceBlock} from "@/app/ui/DownloadPriceBlock";
import {fetchOffersCount} from "@/app/lib/apis/offerApi";
import {fetchUsersCount} from "@/app/lib/apis/userApi";
import {fetchWaybillsCount} from "@/app/lib/apis/waybillApi";
// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
// import { lusitana } from "@/app/ui/fonts";
// import { RevenueChartSkeleton } from "@/app/ui/skeletons";
// import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Панель | TCF"
}

export default async function Page() {
	const [latestInvoices, offersData, waybillsData, usersData] = await Promise.all([
		fetchLatestInvoices(),
		fetchOffersCount(),
		fetchWaybillsCount(),
		fetchUsersCount()
	]);
	return (
		<main>
			{/*<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>*/}
			<h1 className="mb-4 text-xl md:text-2xl">
				Панель управления
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Card
					title="Кол-во Позиций"
					value={offersData.count}
					type="invoices"
				/>
				<Card
					title="Кол-во Активных Позиций (случайное число)"
					value={offersData.count - 4000}
					type="invoices"
				/>
				<Card
					title="Кол-во Накладных"
					value={waybillsData.count}
					type="invoices"
				/>
				<Card
					title="Кол-во Клиентов"
					value={usersData.count}
					type="customers"
				/>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				{/*<Suspense fallback={<RevenueChartSkeleton />}>*/}
				{/*	<RevenueChart />*/}
				{/*</Suspense>*/}
				<LatestInvoices latestInvoices={latestInvoices} />
				<DownloadPriceBlock/>
			</div>
		</main>
	);
}
