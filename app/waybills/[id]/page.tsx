import type { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import { fetchWaybillById } from "@/app/lib/apis/waybillApi";
import WaybillOffersTable from "@/app/ui/catalogue/waybill/waybill-offers-table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { CreateWaybillOfferModal } from "@/app/ui/catalogue/waybill/create-waybill-offer";
import { DownloadButton } from "@/app/ui/catalogue/buttons/download-button";
import { CommitWaybillButton } from "@/app/ui/catalogue/waybill/commit-waybill-button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type Params = Promise<{
    id: string;
}>;

export default async function WaybillPage(props: { params: Params }) {
    const params = await props.params;
    const waybill_id: string = params.id;

    const waybill: WaybillSchema = await fetchWaybillById(waybill_id);

    const waybill_type =
        waybill.waybill_type === "WAYBILL_OUT"
            ? "Расход"
            : waybill.waybill_type === "WAYBILL_IN"
                ? "Приход"
                : "Возврат";

    return (
        <div className="max-w-5xl mx-auto py-10 space-y-6">
            <div className="mb-4 flex items-center justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: waybill_type, href: "/waybills" },
                        {
                            label: waybill.counterparty_name,
                            href: `/waybills/${waybill_id}`,
                            active: true,
                        },
                    ]}
                />
                <div className="flex space-x-2">
                    <DownloadButton full={false} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="inline-block">
                                    <CreateWaybillOfferModal waybill_id={waybill_id} disabled={!waybill.is_pending} />
                                </div>
                            </TooltipTrigger>
                            {!waybill.is_pending && (
                                <TooltipContent>
                                    <p>Накладная уже проведена</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <Suspense fallback={<Skeleton className="h-32" />}>
                <WaybillOffersTable {...waybill} />
            </Suspense>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="inline-block">
                            <CommitWaybillButton waybill_id={waybill_id} disabled={!waybill.is_pending} />
                        </div>
                    </TooltipTrigger>
                    {!waybill.is_pending && (
                        <TooltipContent>
                            <p>Накладная уже проведена</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
