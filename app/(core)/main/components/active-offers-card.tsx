import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/dashboard/stat-card";

export async function ActiveOffersCard() {
    const { count } = await fetchOffersCount(
        undefined,
        true,
    );
    return <StatCard title="Кол-во активных позиций (>0)" value={count} />;
}
