import type {Metadata} from "next";

import {DownloadPrice} from "@/app/modules/price/download-price";
import {Suspense} from "react";
import {CardSkeleton} from "@/app/ui/dashboard/card-skeleton";

import {
    ActiveOffersCard,
    EcommerceBestSellingProductsCard,
    EcommerceRecentOrdersCard,
    OffersCard, UsersCard, WaybillsCard, OrdersCard, OffersWithImageCard
} from "@/app/(core)/main/components";
import {OrderPaginatedSchema, OrderSchema} from "@/app/lib/schemas/orderSchema";
import {fetchOrders} from "@/app/lib/apis/orderApi";

export const metadata: Metadata = {
    title: "Панель | TCF",
};

export default async function Page() {
    const data: OrderPaginatedSchema = await fetchOrders();
    const orders: OrderSchema[] = data.items;
    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">Панель управления</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                <Suspense fallback={<CardSkeleton/>}>
                    <OffersCard/>
                </Suspense>
                <Suspense fallback={<CardSkeleton/>}>
                    <ActiveOffersCard/>
                </Suspense>
                <Suspense fallback={<CardSkeleton/>}>
                    <OffersWithImageCard/>
                </Suspense>
                <Suspense fallback={<CardSkeleton/>}>
                    <WaybillsCard/>
                </Suspense>
                <Suspense fallback={<CardSkeleton/>}>
                    <OrdersCard/>
                </Suspense>
                <Suspense fallback={<CardSkeleton/>}>
                    <UsersCard/>
                </Suspense>
            </div>
            <div className="space-y-4 xl:grid xl:grid-cols-12 xl:gap-4 xl:space-y-0 mt-4">
                <EcommerceRecentOrdersCard orders={orders}/>
                <EcommerceBestSellingProductsCard/>
            </div>
            <div className="mt-4">
                <DownloadPrice/>
            </div>
        </main>
    );
}
