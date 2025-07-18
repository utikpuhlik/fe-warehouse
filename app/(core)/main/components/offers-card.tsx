import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/catalogue/dashboard/stat-card";

export async function OffersCard() {
    const { count } = await fetchOffersCount();
    return <StatCard title="Кол-во позиций" value={count} />;
}
