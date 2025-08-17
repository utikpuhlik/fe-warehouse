export type Locale = (typeof locales)[number];

export const locales = ["en", "ru", "tr"] as const;
export const defaultLocale: Locale = "ru";
