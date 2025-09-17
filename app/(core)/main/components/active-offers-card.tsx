import { getTranslations } from "next-intl/server";

import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import { StatCard } from "@/app/ui/dashboard/stat-card";

export async function ActiveOffersCard() {
  const t = await getTranslations("PanelPage");
  const { count } = await fetchOffersCount(undefined, true);
  return <StatCard title={t("offers_active_count")} value={count} />;
}
