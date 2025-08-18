import {StatCard} from "@/app/ui/dashboard/stat-card";
import {fetchOrdersCount} from "@/app/lib/apis/orderApi";
import {getTranslations} from "next-intl/server";

export async function OrdersCard() {
    const t = await getTranslations("PanelPage");

    const { count } = await fetchOrdersCount();
    return <StatCard title={t('orders_count')} value={count} />;
}
