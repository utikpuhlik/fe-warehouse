import {StatCard} from "@/app/ui/catalogue/dashboard/stat-card";
import {fetchOrdersCount} from "@/app/lib/apis/orderApi";

export async function OrdersCard() {
    const { count } = await fetchOrdersCount();
    return <StatCard title="Кол-во заказов" value={count} />;
}
