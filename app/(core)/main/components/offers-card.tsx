import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/dashboard/stat-card";
import {getTranslations} from "next-intl/server";

export async function OffersCard() {
    const t = await getTranslations("PanelPage");
    const { count } = await fetchOffersCount();
    return <StatCard title={t('offers_count')} value={count} />;
}
