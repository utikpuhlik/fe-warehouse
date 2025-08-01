
import { CreateWaybillModal } from "@/app/ui/waybill/create-dialog";
import type { UserSchema } from "@/app/lib/schemas/userSchema";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserByClerkId } from "@/app/lib/apis/userApi";
import { Metadata } from "next";
import WaybillDataTable from "@/app/(core)/waybills/data-table";

export const metadata: Metadata = {
  title: "Накладные | TCF",
};

export default async function WaybillsPage() {
  const clerk_user = await currentUser();
  if (!clerk_user) {
    notFound();
  }
  const user: UserSchema = await fetchUserByClerkId(clerk_user.id);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Накладные</h1>
        <CreateWaybillModal author_id={user.id} />
      </div>
      <WaybillDataTable/>
    </>
  );
}
