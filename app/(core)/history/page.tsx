import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("history"),
  };
}

export default async function Page() {
  const t = await getTranslations("HistoryPage");
  return (
    <main>
      <p>{t("warehouse_history")}</p>
      <p>{t("generated_from_waybills")}</p>
    </main>
  );
}
