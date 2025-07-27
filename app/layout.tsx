import "@/app/ui/global.css";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {QueryProvider} from "@/app/shared/api/queryProvider";
import {
    ClerkProvider,
    SignedOut,
} from "@clerk/nextjs";
import {Metadata} from "next";
import {ruRU} from "@clerk/localizations";
import {experimental__simple} from "@clerk/themes"
import {ThemeProvider} from "next-themes";
import {GeistSans} from "geist/font/sans";
import {ThemedTopLoader} from "@/components/layout/top-loader";
import { CartStoreProvider } from "@/app/shared/api/cartStoreProvider";

export const metadata: Metadata = {
    title: "TCF | Login",
    description: "TCF | Login",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            localization={ruRU}
            appearance={{
                baseTheme: experimental__simple
            }}
        >
            {/*https://ui.shadcn.com/docs/dark-mode/next*/}
            <html lang="en" suppressHydrationWarning>
            <body className={`${GeistSans.className} antialiased`}>
            <SignedOut>
            </SignedOut>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <ThemedTopLoader/>
                <QueryProvider>
                    <CartStoreProvider>
                    {children}
                    </CartStoreProvider>
                </QueryProvider>
            </ThemeProvider>
            <SpeedInsights/>
            <Analytics/>
            </body>
            </html>
        </ClerkProvider>
    );
}
