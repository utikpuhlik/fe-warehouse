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
import { GeistSans } from "geist/font/sans";
import {ThemedTopLoader} from "@/app/shared/top-loader";

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
            <html lang="en" suppressHydrationWarning >
            <body className={`${GeistSans.className} antialiased`}>
            <SignedOut>
                {/*! I don't need it in my setup - all routes are private*/}
                {/*<SignInButton/>*/}
                {/*<SignUpButton>*/}
                {/*    <button*/}
                {/*        className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">*/}
                {/*        Sign Up*/}
                {/*    </button>*/}
                {/*</SignUpButton>*/}
            </SignedOut>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <ThemedTopLoader />
                <QueryProvider>
                    {children}
                </QueryProvider>
            </ThemeProvider>
            </body>
            <SpeedInsights/>
            <Analytics/>
            </html>
        </ClerkProvider>
    );
}
