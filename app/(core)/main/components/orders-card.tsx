import { getTranslations } from "next-intl/server";

import { fetchOrdersCount } from "@/app/lib/apis/orderApi";
import { StatCard } from "@/app/ui/dashboard/stat-card";

export async function OrdersCard() {
  const t = await getTranslations("PanelPage");

  const { count } = await fetchOrdersCount();
  return <StatCard title={t("orders_count")} value={count} />;
}
