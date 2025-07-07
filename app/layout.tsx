import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryProvider } from "@/app/shared/api/queryProvider";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <NextTopLoader
          color="#2A2F3C"
          showSpinner={false}
          shadow-sm="none"
      />
        <QueryProvider>{children}</QueryProvider>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
