import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/dashboard/stat-card";

export async function OffersWithImageCard() {
    const { count } = await fetchOffersCount(
        undefined,
        undefined,
        true
    );
    // const count_all = await fetchOffersCount()
    return <StatCard title="Кол-во позиций с фото" value={count} />;
}
