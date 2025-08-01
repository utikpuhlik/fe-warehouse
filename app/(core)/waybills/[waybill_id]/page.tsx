import type {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {fetchWaybillById} from "@/app/lib/apis/waybillApi";
import WaybillOffersTable from "@/app/ui/waybill/waybill-offers-table";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import {CreateWaybillOfferForm} from "@/app/ui/waybill/create-waybill-offer";
import {CommitWaybillButton} from "@/app/ui/waybill/commit-waybill-button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {DeleteEntityButton} from "@/app/ui/shared/buttons/delete-entity-button";
import {deleteWaybillAction} from "@/app/lib/actions/waybillAction";
import {notFound} from "next/navigation";
import {DownloadWaybillButton} from "@/app/ui/waybill/DownloadWaybillButton";
import {USER_TYPE_LABELS, WAYBILL_TYPE_LABELS} from "@/app/lib/schemas/commonSchema";
import type {Metadata} from "next";

type Props = {
    params: Promise<{ waybill_id: string }>
};

export async function generateMetadata(
    {params}: Props
): Promise<Metadata> {
    const {waybill_id} = await params;
    const waybill: WaybillSchema = await fetchWaybillById(waybill_id);
    if (!waybill) {
        return {
            title: "Накладная не найдена | TCF",
            robots: {index: false, follow: false},
        };
    }
    return {
        title: `Накладная - ${WAYBILL_TYPE_LABELS[waybill.waybill_type]} | TCF`,
    };
}

export default async function WaybillPage({params}: Props) {
    const {waybill_id} = await params;

    // TODO: обновить fetchJson для работы с null и 404
    const waybill: WaybillSchema = await fetchWaybillById(waybill_id);
    if (!waybill) notFound();

    const fullName = `${waybill.customer.first_name} ${waybill.customer.last_name}`;
    return (
        <main>
            <div className="mb-4 flex items-center justify-between">
                <Breadcrumbs
                    breadcrumbs={[
                        {label: WAYBILL_TYPE_LABELS[waybill.waybill_type], href: `/waybills?waybill_type=${waybill.waybill_type}`},
                        {label: USER_TYPE_LABELS[waybill.customer.customer_type], href: "/waybills"},
                        {
                            label: fullName,
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
            {waybill.is_pending && (
            <div className="mt-6 mb-4">
                <CreateWaybillOfferForm waybill={waybill}/>
            </div>
            )}

            <Suspense fallback={<Skeleton className="h-32"/>}>
                <WaybillOffersTable {...waybill} />
            </Suspense>
        </main>
    );
}
