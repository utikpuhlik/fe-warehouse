import type { Metadata } from "next";

import { DownloadPrice } from "@/app/modules/price/download-price";
import { Suspense } from "react";
import { CardSkeleton } from "@/app/ui/dashboard/card-skeleton";

import {
  ActiveOffersCard,
  EcommerceBestSellingProductsCard,
  EcommerceRecentOrdersCard,
  OffersCard,
  UsersCard,
  WaybillsCard,
  OrdersCard,
  OffersWithImageCard,
} from "@/app/(core)/main/components";
import { fetchOrders } from "@/app/lib/apis/orderApi";
import { getTranslations } from "next-intl/server";
import { fetchBestSellingProducts } from "@/app/lib/apis/analyticalApi";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("panel"),
  };
}

export default async function Page() {
  const t = await getTranslations("PanelPage");
  const [orders, best_selling_products] = await Promise.all([
    fetchOrders(),
    fetchBestSellingProducts(),
  ]);
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">{t("title")}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <Suspense fallback={<CardSkeleton />}>
          <OffersCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <ActiveOffersCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <OffersWithImageCard />
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
        <EcommerceRecentOrdersCard orders={orders.items} />
        <EcommerceBestSellingProductsCard data={best_selling_products} />
      </div>
      <div className="mt-4">
        <DownloadPrice />
      </div>
    </main>
  );
}
