import type { Metadata } from "next";

import { DownloadPrice } from "@/app/modules/price/download-price";
import {Suspense} from "react";
import {CardSkeleton} from "@/app/ui/dashboard/card-skeleton";

import {
    ActiveOffersCard,
    EcommerceBestSellingProductsCard,
    EcommerceRecentOrdersCard,
    OffersCard, UsersCard, WaybillsCard, OrdersCard
} from "@/app/(core)/main/components";

export const metadata: Metadata = {
    title: "Панель | TCF",
};

export default function Page() {
    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">Панель управления</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <Suspense fallback={<CardSkeleton />}>
                    <OffersCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <ActiveOffersCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <WaybillsCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <OrdersCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                    <UsersCard />
                </Suspense>
            </div>
            <div className="space-y-4 xl:grid xl:grid-cols-12 xl:gap-4 xl:space-y-0 mt-4">
                <EcommerceRecentOrdersCard />
                <EcommerceBestSellingProductsCard />
            </div>
            <div className="mt-4">
                <DownloadPrice />
            </div>
        </main>
    );
}
