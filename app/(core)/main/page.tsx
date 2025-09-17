import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import {
  ActiveOffersCard,
  EcommerceBestSellingProductsCard,
  EcommerceRecentOrdersCard,
  OffersCard,
  OffersWithImageCard,
  OrdersCard,
  UsersCard,
  WaybillsCard,
} from "@/app/(core)/main/components";
import { fetchBestSellingProducts } from "@/app/lib/apis/analyticalApi";
import { fetchOrders } from "@/app/lib/apis/orderApi";
import { DownloadPrice } from "@/app/modules/price/download-price";
import { CardSkeleton } from "@/app/ui/dashboard/card-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("panel"),
  };
}

export default async function Page() {
  const t = await getTranslations("PanelPage");
  const [orders, best_selling_products] = await Promise.all([fetchOrders(), fetchBestSellingProducts()]);
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
      <div className="mt-4 space-y-4 xl:grid xl:grid-cols-12 xl:gap-4 xl:space-y-0">
        <EcommerceRecentOrdersCard orders={orders.items} />
        <EcommerceBestSellingProductsCard data={best_selling_products} />
      </div>
      <div className="mt-4">
        <DownloadPrice />
      </div>
    </main>
  );
}
