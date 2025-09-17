import { getTranslations } from "next-intl/server";

import { fetchWaybillsCount } from "@/app/lib/apis/waybillApi";
import { StatCard } from "@/app/ui/dashboard/stat-card";

export async function WaybillsCard() {
  const t = await getTranslations("PanelPage");

  const { count } = await fetchWaybillsCount();
  return <StatCard title={t("waybills_count")} value={count} />;
}
