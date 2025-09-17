import { getTranslations } from "next-intl/server";

import { fetchUsersCount } from "@/app/lib/apis/userApi";
import { StatCard } from "@/app/ui/dashboard/stat-card";

export async function UsersCard() {
  const t = await getTranslations("PanelPage");

  const { count } = await fetchUsersCount();
  return <StatCard title={t("users_count")} value={count} />;
}
