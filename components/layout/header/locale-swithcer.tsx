import { useLocale, useTranslations } from "next-intl";

import LocaleSwitcherSelect from "@/components/layout/locale-switcher-select";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
        },
        {
          value: "ru",
          label: t("ru"),
        },
        // {
        //   value: "tr",
        //   label: t("tr"),
        // },
      ]}
      label={t("label")}
    />
  );
}
