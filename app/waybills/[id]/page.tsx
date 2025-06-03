import type {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {fetchWaybillById} from "@/app/lib/apis/waybillApi";
import WaybillOffersTable from "@/app/ui/catalogue/waybill/waybill-offers-table";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Params = Promise<{
    id: string;
}>;

export default async function WaybillPage(props: { params: Params }) {
    const params = await props.params;
    const waybill: WaybillSchema = await fetchWaybillById(params.id);
    return (
        <div className="max-w-5xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold">Накладная #{waybill.id}</h1>

            {/* Тут можно добавить редактируемые поля (контрагент, тип) */}

            {/* Состав накладной */}
            <Suspense fallback={<Skeleton className="h-32" />}>
                <WaybillOffersTable {...waybill}/>
            </Suspense>
        </div>
    );
}
