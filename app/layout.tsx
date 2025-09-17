import "@/app/ui/global.css";

import { ruRU } from "@clerk/localizations";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";
import { experimental__simple } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { CartStoreProvider } from "@/app/shared/api/cartStoreProvider";
import { QueryProvider } from "@/app/shared/api/queryProvider";
import { ThemedTopLoader } from "@/components/layout/top-loader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("login"),
    description: t("login"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <ClerkProvider
      localization={ruRU}
      appearance={{
        baseTheme: experimental__simple,
      }}
    >
      {/*https://ui.shadcn.com/docs/dark-mode/next*/}
      <html lang={locale} suppressHydrationWarning>
        <body className={`${GeistSans.className} antialiased`}>
          <SignedOut></SignedOut>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ThemedTopLoader />
            <QueryProvider>
              <CartStoreProvider>
                <NextIntlClientProvider>{children}</NextIntlClientProvider>
              </CartStoreProvider>
            </QueryProvider>
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
