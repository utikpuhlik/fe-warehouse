import { fetchWaybills } from "@/app/lib/apis/waybillApi";

import type { WaybillPaginatedSchema } from "@/app/lib/schemas/waybillSchema";
import { CreateWaybillModal } from "@/app/ui/catalogue/waybill/create-dialog";
import type { UserSchema } from "@/app/lib/schemas/userSchema";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserByClerkId } from "@/app/lib/apis/userApi";
import { Metadata } from "next";
import WaybillDataTable from "@/app/(core)/waybills/data-table";

export const metadata: Metadata = {
  title: "Накладные | TCF",
};

export default async function WaybillsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    waybill_type: string;
    is_pending?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  const waybillType =
    params?.waybill_type === "all" ? undefined : params?.waybill_type;
  const is_pending =
    params?.is_pending === "all" ? undefined : params?.is_pending;

  const data: WaybillPaginatedSchema = await fetchWaybills(
    waybillType,
    is_pending,
    query,
    currentPage,
    5,
  );

  const clerk_user = await currentUser();
  if (!clerk_user) {
    notFound();
  }
  const user: UserSchema = await fetchUserByClerkId(clerk_user.id);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Накладные</h1>
        <CreateWaybillModal user_id={user.id} />
      </div>
      <WaybillDataTable data={data} />
    </>
  );
}
