import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import WaybillDataTable from "@/app/(core)/waybills/data-table";
import { CreateWaybillModal } from "@/app/ui/waybill/create-dialog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("waybills"),
  };
}

export default async function WaybillsPage() {
  const t = await getTranslations("WaybillsPage");
  const clerk_user = await currentUser();
  if (!clerk_user) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t("waybills")}</h1>
        <CreateWaybillModal />
      </div>
      <WaybillDataTable />
    </>
  );
}
