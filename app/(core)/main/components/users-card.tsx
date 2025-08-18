import {StatCard} from "@/app/ui/dashboard/stat-card";
import {fetchUsersCount} from "@/app/lib/apis/userApi";
import {getTranslations} from "next-intl/server";

export async function UsersCard() {
    const t = await getTranslations("PanelPage");

    const { count } = await fetchUsersCount();
    return <StatCard title={t('users_count')} value={count} />;
}
