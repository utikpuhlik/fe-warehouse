import type {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {fetchWaybillById} from "@/app/lib/apis/waybillApi";
import WaybillOffersTable from "@/app/ui/catalogue/waybill/waybill-offers-table";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {CreateWaybillOfferForm} from "@/app/ui/catalogue/waybill/create-waybill-offer";
import {CommitWaybillButton} from "@/app/ui/catalogue/waybill/commit-waybill-button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {DeleteEntityButton} from "@/app/ui/catalogue/buttons/delete-entity-button";
import {deleteWaybillAction} from "@/app/lib/actions/waybillAction";
import {notFound} from "next/navigation";
import {DownloadWaybillButton} from "@/app/ui/catalogue/waybill/DownloadWaybillButton";

type Params = Promise<{
    id: string;
}>;

export default async function WaybillPage(props: { params: Params }) {
    const params = await props.params;
    const waybill_id: string = params.id;

    // TODO: обновить fetchJson для работы с null и 404
    const waybill: WaybillSchema = await fetchWaybillById(waybill_id);
    if (!waybill) notFound();

    const waybill_type =
        waybill.waybill_type === "WAYBILL_OUT"
            ? "Расход"
            : waybill.waybill_type === "WAYBILL_IN"
                ? "Приход"
                : "Возврат";

    return (
        <main>
            <div className="mb-4 flex items-center justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        {label: waybill_type, href: "/waybills"},
                        {
                            label: waybill.counterparty_name,
                            href: `/waybills/${waybill_id}`,
                            active: true,
                        },
                    ]}
                />
                <div className="flex space-x-2">
                    <DownloadWaybillButton waybillId={waybill_id} full={false}/>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="inline-block">
                                    <CommitWaybillButton waybill_id={waybill_id} disabled={!waybill.is_pending}/>
                                </div>
                            </TooltipTrigger>
                            {!waybill.is_pending && (
                                <TooltipContent>
                                    <p>Накладная уже проведена</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                    <DeleteEntityButton
                        entityName="накладную"
                        entityId={waybill_id}
                        deleteAction={deleteWaybillAction}
                        disabled={!waybill.is_pending}
                    />
                </div>
            </div>

            <div className="mt-6 mb-4">
                <CreateWaybillOfferForm waybill={waybill}/>
            </div>

            <Suspense fallback={<Skeleton className="h-32"/>}>
                <WaybillOffersTable {...waybill} />
            </Suspense>
        </main>
    );
}
