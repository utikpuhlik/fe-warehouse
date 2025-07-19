import { WaybillCard } from "@/app/ui/catalogue/cards/waybill-card";
import { fetchWaybills } from "@/app/lib/apis/waybillApi";

import type {WaybillPaginatedSchema, WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import Search from "@/app/ui/catalogue/search";
import Pagination from "@/app/ui/catalogue/pagination";
import {CreateWaybillModal} from "@/app/ui/catalogue/waybill/create-dialog";
import {WaybillFilters} from "@/app/ui/catalogue/waybill/filters";
import type {UserSchema} from "@/app/lib/schemas/userSchema";
import {notFound} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {fetchUserByClerkId} from "@/app/lib/apis/userApi";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Накладные | TCF',
}

export default async function WaybillsPage({searchParams}: {
	searchParams?: Promise<{ query?: string; page?: string; waybill_type: string; is_pending?: string }>;
}) {
	const params = await searchParams
	const query = params?.query || "";
	const currentPage = Number(params?.page) || 1;

	const waybillType = params?.waybill_type === "all" ? undefined : params?.waybill_type;
	const is_pending = params?.is_pending === "all" ? undefined : params?.is_pending;

	const data: WaybillPaginatedSchema = await fetchWaybills(
		waybillType,
		is_pending,
		query,
		currentPage,
		4);
	const waybills: WaybillSchema[] = data.items;

	const clerk_user = await currentUser()
	if (!clerk_user) {
		notFound();
	}
	const user: UserSchema = await fetchUserByClerkId(clerk_user.id)

	return (
		<div className="p-4 space-y-4">
			<div className="flex justify-between items-center flex-wrap gap-2">
				<h1 className="text-2xl font-semibold">Накладные</h1>
				<WaybillFilters />
				<Search placeholder="Поиск..." />
				<CreateWaybillModal user_id={user.id}/>
			</div>

			<div className="grid gap-4">
				{waybills.map((waybill: WaybillSchema) => (
					<WaybillCard key={waybill.id} {...waybill} />
				))}
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={data.pages} />
			</div>
		</div>

	);
}
