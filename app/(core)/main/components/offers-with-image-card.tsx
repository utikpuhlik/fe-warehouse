import { fetchOffersCount } from "@/app/lib/apis/offerApi";
import {StatCard} from "@/app/ui/dashboard/stat-card";
import {getTranslations} from "next-intl/server";

export async function OffersWithImageCard() {
    const t = await getTranslations("PanelPage");

    const { count } = await fetchOffersCount(
        undefined,
        undefined,
        true
    );
    // const count_all = await fetchOffersCount()
    return <StatCard title={t('offers_with_photo_count')} value={count} />;
}
