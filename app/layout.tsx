import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts'
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
      <SpeedInsights/>
      <Analytics/>
    </html>
  );
}
