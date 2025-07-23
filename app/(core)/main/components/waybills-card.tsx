import { fetchWaybillsCount } from "@/app/lib/apis/waybillApi";

import {StatCard} from "@/app/ui/dashboard/stat-card";

export async function WaybillsCard() {
    const { count } = await fetchWaybillsCount();
    return <StatCard title="Кол-во накладных" value={count} />;
}
