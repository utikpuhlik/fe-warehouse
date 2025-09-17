import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { deleteWaybillAction } from "@/app/lib/actions/waybillAction";
import { fetchWaybillById } from "@/app/lib/apis/waybillApi";
import { USER_TYPE_LABELS, WAYBILL_TYPE_LABELS, zWaybillTypeEnum } from "@/app/lib/schemas/commonSchema";
import type { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import { CommitWaybillButton } from "@/app/ui/waybill/commit-waybill-button";
import { CreateWaybillOfferForm } from "@/app/ui/waybill/create-waybill-offer";
import { DownloadWaybill } from "@/app/ui/waybill/download-waybill";
import WaybillOffersTable from "@/app/ui/waybill/waybill-offers-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  params: Promise<{ waybill_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { waybill_id } = await params;
  const waybill: WaybillSchema = await fetchWaybillById(waybill_id);
  if (!waybill) {
    const t = await getTranslations("PageTitles");
    return {
      title: t("waybill_not_found"),
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Накладная - ${WAYBILL_TYPE_LABELS[waybill.waybill_type]} | TCF`,
  };
}

export default async function WaybillPage({ params }: Props) {
  const t = await getTranslations("WaybillPage");
  const { waybill_id } = await params;

  // TODO: reinvent fetchJson to handle 404 and nulls
  const waybill: WaybillSchema = await fetchWaybillById(waybill_id);
  if (!waybill) notFound();

  const is_disabled: boolean = !waybill.is_pending || waybill.waybill_type === zWaybillTypeEnum.Enum.WAYBILL_OUT;

  const fullName = `${waybill.customer.first_name} ${waybill.customer.last_name}`;
  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: WAYBILL_TYPE_LABELS[waybill.waybill_type],
              href: `/waybills?waybill_type=${waybill.waybill_type}`,
            },
            {
              label: USER_TYPE_LABELS[waybill.customer.customer_type],
              href: "/waybills",
            },
            {
              label: fullName,
              href: `/waybills/${waybill_id}`,
              active: true,
            },
          ]}
        />
        <div className="flex space-x-2">
          <DownloadWaybill waybillId={waybill_id} format="docx" />
          <DownloadWaybill waybillId={waybill_id} format="xlsx" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <CommitWaybillButton waybill_id={waybill_id} disabled={!waybill.is_pending} />
                </div>
              </TooltipTrigger>
              {!waybill.is_pending && (
                <TooltipContent>
                  <p>{t("waybill_was_already_commited")}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <DeleteEntityButton
            entityName={t("waybill_delete")}
            entityId={waybill_id}
            deleteAction={deleteWaybillAction}
            disabled={!waybill.is_pending}
          />
        </div>
      </div>
      {!is_disabled && (
        <div className="mb-4 mt-6">
          <CreateWaybillOfferForm waybill={waybill} />
        </div>
      )}

      <Suspense fallback={<Skeleton className="h-32" />}>
        <WaybillOffersTable waybill={waybill} is_disabled={is_disabled} />
      </Suspense>
    </main>
  );
}
