import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/dashboard/stat-card";

export async function ActiveOffersCard() {
    const { count } = await fetchOffersCount();
    return <StatCard title="Кол-во активных позиций" value={count - 1000} />;
}
